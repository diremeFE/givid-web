#!/usr/bin/env node
// Runs the automated checks from the monthly maintenance review and reports
// the results to /api/admin/maintenance-check. Invoked by
// .github/workflows/maintenance-check.yml — not meant to be run by hand
// against production without knowing what it does (it calls npm audit and
// makes real HTTP requests to the live site).

import tls from "node:tls";
import { execSync } from "node:child_process";

const SITE_URL = process.env.SITE_URL || "https://gisvalida.com";
const CHECK_ENDPOINT =
  process.env.MAINTENANCE_CHECK_ENDPOINT || `${SITE_URL}/api/admin/maintenance-check`;
const SECRET = process.env.MAINTENANCE_CHECK_SECRET;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPOSITORY = process.env.GITHUB_REPOSITORY;

if (!SECRET) {
  console.error("Missing MAINTENANCE_CHECK_SECRET");
  process.exit(1);
}

const notes = [];

async function checkContactForm() {
  try {
    const res = await fetch(`${SITE_URL}/es/contacto`);
    const html = await res.text();
    const ok = res.ok && html.includes('name="email"') && html.includes('name="message"');
    if (!ok) notes.push(`Formulario de contacto: respuesta inesperada (status ${res.status})`);
    return ok;
  } catch (err) {
    notes.push(`Formulario de contacto: error al comprobar (${err.message})`);
    return false;
  }
}

async function checkBrokenLinks() {
  try {
    const res = await fetch(`${SITE_URL}/sitemap.xml`);
    const xml = await res.text();
    const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
    if (urls.length === 0) {
      notes.push("Enlaces: no se encontraron URLs en el sitemap");
      return false;
    }
    const broken = [];
    for (const url of urls) {
      try {
        const r = await fetch(url, { redirect: "follow" });
        if (!r.ok) broken.push(`${url} (${r.status})`);
      } catch {
        broken.push(`${url} (sin respuesta)`);
      }
    }
    if (broken.length > 0) {
      notes.push(`Enlaces rotos (${broken.length}/${urls.length}): ${broken.slice(0, 10).join(", ")}`);
      return false;
    }
    notes.push(`Enlaces: ${urls.length} URLs comprobadas, todas correctas`);
    return true;
  } catch (err) {
    notes.push(`Enlaces: error al comprobar el sitemap (${err.message})`);
    return false;
  }
}

async function checkLanguages() {
  const locales = ["es", "en", "fr", "pt"];
  const failed = [];
  for (const locale of locales) {
    try {
      const res = await fetch(`${SITE_URL}/${locale}`);
      const html = await res.text();
      if (!res.ok || html.length < 500) failed.push(locale);
    } catch {
      failed.push(locale);
    }
  }
  if (failed.length > 0) {
    notes.push(`Idiomas con problemas: ${failed.join(", ")}`);
    return false;
  }
  return true;
}

function checkSsl() {
  return new Promise((resolve) => {
    const host = new URL(SITE_URL).hostname;
    const socket = tls.connect(443, host, { servername: host }, () => {
      const cert = socket.getPeerCertificate();
      socket.end();
      if (!cert || !cert.valid_to) {
        notes.push("SSL: no se pudo leer el certificado");
        resolve(false);
        return;
      }
      const validTo = new Date(cert.valid_to);
      const daysLeft = Math.floor((validTo.getTime() - Date.now()) / 86400000);
      if (daysLeft < 14) {
        notes.push(`SSL: caduca en ${daysLeft} días (${cert.valid_to})`);
        resolve(false);
      } else {
        resolve(true);
      }
    });
    socket.on("error", (err) => {
      notes.push(`SSL: error de conexión (${err.message})`);
      resolve(false);
    });
    socket.setTimeout(10000, () => {
      notes.push("SSL: tiempo de espera agotado");
      socket.destroy();
      resolve(false);
    });
  });
}

async function checkSpeed() {
  try {
    const start = Date.now();
    const res = await fetch(`${SITE_URL}/es`);
    await res.text();
    const ms = Date.now() - start;
    if (!res.ok) {
      notes.push(`Velocidad: la home respondió con error (${res.status})`);
      return false;
    }
    if (ms > 4000) {
      notes.push(`Velocidad: la home tardó ${ms} ms en cargar (umbral 4000 ms)`);
      return false;
    }
    notes.push(`Velocidad: home cargada en ${ms} ms`);
    return true;
  } catch (err) {
    notes.push(`Velocidad: error al medir (${err.message})`);
    return false;
  }
}

function checkDependencies() {
  const parseReport = (raw) => {
    const report = JSON.parse(raw);
    const high = report.metadata?.vulnerabilities?.high ?? 0;
    const critical = report.metadata?.vulnerabilities?.critical ?? 0;
    return { high, critical };
  };

  try {
    const output = execSync("npm audit --omit=dev --json", { encoding: "utf8" });
    const { high, critical } = parseReport(output);
    if (high + critical > 0) {
      notes.push(`Dependencias: ${critical} vulnerabilidades críticas, ${high} altas`);
      return false;
    }
    return true;
  } catch (err) {
    try {
      const { high, critical } = parseReport(err.stdout || "{}");
      if (high + critical > 0) {
        notes.push(`Dependencias: ${critical} vulnerabilidades críticas, ${high} altas`);
        return false;
      }
      return true;
    } catch {
      notes.push("Dependencias: no se pudo ejecutar npm audit");
      return false;
    }
  }
}

async function checkBackups() {
  if (!GITHUB_TOKEN || !GITHUB_REPOSITORY) {
    notes.push("Backups: no se pudo comprobar (sin token de GitHub)");
    return false;
  }
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_REPOSITORY}/actions/workflows/db-backup.yml/runs?per_page=1&status=success`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
      },
    );
    const data = await res.json();
    const lastRun = data.workflow_runs?.[0];
    if (!lastRun) {
      notes.push("Backups: no se encontró ninguna ejecución correcta");
      return false;
    }
    const daysSince = Math.floor(
      (Date.now() - new Date(lastRun.created_at).getTime()) / 86400000,
    );
    if (daysSince > 10) {
      notes.push(`Backups: la última copia correcta tiene ${daysSince} días`);
      return false;
    }
    notes.push(`Backups: última copia correcta hace ${daysSince} día(s)`);
    return true;
  } catch (err) {
    notes.push(`Backups: error al comprobar (${err.message})`);
    return false;
  }
}

const results = {
  contactFormOk: await checkContactForm(),
  brokenLinksOk: await checkBrokenLinks(),
  languagesOk: await checkLanguages(),
  sslOk: await checkSsl(),
  speedOk: await checkSpeed(),
  securityUpdatesOk: checkDependencies(),
  backupsOk: await checkBackups(),
};

console.log("Resultados:", results);
console.log("Notas:", notes.join(" | "));

const reportRes = await fetch(CHECK_ENDPOINT, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${SECRET}`,
  },
  body: JSON.stringify({ ...results, notes: notes.join(" | ") }),
});

if (!reportRes.ok) {
  console.error("Error al reportar resultados:", reportRes.status, await reportRes.text());
  process.exit(1);
}

console.log("Reportado correctamente.");

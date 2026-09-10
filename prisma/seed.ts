import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminEmail = (process.env.ADMIN_EMAIL ?? "admin@givid-ge.com").toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD ?? "CambiaEstaPassword123!";

  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      passwordHash,
      name: "Administrador GIVID",
    },
  });
  console.log(`Admin user ready: ${adminEmail}`);

  const alimentacion = await prisma.category.upsert({
    where: { slug: "alimentacion" },
    update: {},
    create: {
      slug: "alimentacion",
      nameEs: "Alimentación",
      nameEn: "Food",
      nameFr: "Alimentation",
    },
  });

  const higiene = await prisma.category.upsert({
    where: { slug: "higiene" },
    update: {},
    create: {
      slug: "higiene",
      nameEs: "Higiene",
      nameEn: "Hygiene",
      nameFr: "Hygiène",
    },
  });

  const products = [
    {
      slug: "arroz-saco-25kg",
      nameEs: "Arroz",
      nameEn: "Rice",
      nameFr: "Riz",
      descriptionEs: "Arroz de grano largo, saco de 25kg.",
      descriptionEn: "Long grain rice, 25kg sack.",
      descriptionFr: "Riz à grain long, sac de 25kg.",
      price: 15000,
      unit: "saco 25kg",
      categoryId: alimentacion.id,
    },
    {
      slug: "aceite-vegetal-caja",
      nameEs: "Aceite vegetal",
      nameEn: "Vegetable oil",
      nameFr: "Huile végétale",
      descriptionEs: "Caja de 12 botellas de 1L.",
      descriptionEn: "Box of 12 x 1L bottles.",
      descriptionFr: "Carton de 12 bouteilles de 1L.",
      price: 18000,
      unit: "caja (12x1L)",
      categoryId: alimentacion.id,
    },
    {
      slug: "harina-de-trigo-saco",
      nameEs: "Harina de trigo",
      nameEn: "Wheat flour",
      nameFr: "Farine de blé",
      descriptionEs: "Saco de 50kg.",
      descriptionEn: "50kg sack.",
      descriptionFr: "Sac de 50kg.",
      price: 22000,
      unit: "saco 50kg",
      categoryId: alimentacion.id,
    },
    {
      slug: "jabon-de-lavar-caja",
      nameEs: "Jabón de lavar",
      nameEn: "Laundry soap",
      nameFr: "Savon à lessive",
      descriptionEs: "Caja de 24 unidades.",
      descriptionEn: "Box of 24 units.",
      descriptionFr: "Carton de 24 unités.",
      price: 9000,
      unit: "caja (24 uds)",
      categoryId: higiene.id,
    },
    {
      slug: "papel-higienico-paquete",
      nameEs: "Papel higiénico",
      nameEn: "Toilet paper",
      nameFr: "Papier toilette",
      descriptionEs: "Paquete de 12 rollos.",
      descriptionEn: "Pack of 12 rolls.",
      descriptionFr: "Paquet de 12 rouleaux.",
      price: 6000,
      unit: "paquete (12 rollos)",
      categoryId: higiene.id,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
  }
  console.log(`Seeded ${products.length} products`);

  await prisma.blogPost.upsert({
    where: { slug: "bienvenida-givid" },
    update: {},
    create: {
      slug: "bienvenida-givid",
      titleEs: "Bienvenidos a GIVID",
      titleEn: "Welcome to GIVID",
      titleFr: "Bienvenue chez GIVID",
      excerptEs: "Presentamos nuestra nueva web y catálogo mayorista.",
      excerptEn: "Introducing our new website and wholesale catalog.",
      excerptFr: "Présentation de notre nouveau site et catalogue de gros.",
      contentEs:
        "Estamos encantados de presentar la nueva web de GIVID (Preser Gisvalida SL). Aquí encontrarás nuestro catálogo mayorista de alimentación e higiene, información sobre nuestros servicios de mantenimiento y gestión de importación, y una forma sencilla de contactarnos.",
      contentEn:
        "We are excited to introduce the new GIVID (Preser Gisvalida SL) website. Here you'll find our wholesale catalog of food and hygiene products, information about our maintenance and import management services, and an easy way to reach us.",
      contentFr:
        "Nous sommes ravis de présenter le nouveau site de GIVID (Preser Gisvalida SL). Vous y trouverez notre catalogue de gros de produits alimentaires et d'hygiène, des informations sur nos services d'entretien et de gestion d'importation, ainsi qu'un moyen simple de nous contacter.",
      published: true,
      publishedAt: new Date(),
    },
  });
  console.log("Seeded welcome blog post");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

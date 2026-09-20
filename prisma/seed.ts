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

  // Old demo catalog (hygiene category) doesn't match GIVID's real product
  // list — remove it so the live catalog only shows real GIVID products.
  await prisma.product.deleteMany({
    where: { slug: { in: ["jabon-de-lavar-caja", "papel-higienico-paquete"] } },
  });
  await prisma.category.deleteMany({ where: { slug: "higiene" } });

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

  const cuidadoInfantil = await prisma.category.upsert({
    where: { slug: "cuidado-infantil" },
    update: {},
    create: {
      slug: "cuidado-infantil",
      nameEs: "Cuidado infantil",
      nameEn: "Childcare",
      nameFr: "Puériculture",
    },
  });

  const agua = await prisma.category.upsert({
    where: { slug: "agua" },
    update: {},
    create: {
      slug: "agua",
      nameEs: "Agua",
      nameEn: "Water",
      nameFr: "Eau",
    },
  });

  const limpiezaHogar = await prisma.category.upsert({
    where: { slug: "limpieza-hogar" },
    update: {},
    create: {
      slug: "limpieza-hogar",
      nameEs: "Limpieza del hogar",
      nameEn: "Household cleaning",
      nameFr: "Entretien du foyer",
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
      nameEs: "Aceite",
      nameEn: "Oil",
      nameFr: "Huile",
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
      slug: "panales-paquete",
      nameEs: "Pañales",
      nameEn: "Diapers",
      nameFr: "Couches",
      descriptionEs: "Pañales para bebé, varias tallas.",
      descriptionEn: "Baby diapers, several sizes.",
      descriptionFr: "Couches pour bébé, plusieurs tailles.",
      price: 8000,
      unit: "paquete",
      categoryId: cuidadoInfantil.id,
    },
    {
      slug: "toallitas-humedas-paquete",
      nameEs: "Toallitas húmedas",
      nameEn: "Baby wipes",
      nameFr: "Lingettes",
      descriptionEs: "Paquete de 80 toallitas húmedas para bebé.",
      descriptionEn: "Pack of 80 baby wipes.",
      descriptionFr: "Paquet de 80 lingettes pour bébé.",
      price: 3000,
      unit: "paquete 80 uds",
      categoryId: cuidadoInfantil.id,
    },
    {
      slug: "agua-bezoya-caja",
      nameEs: "Agua Bezoya",
      nameEn: "Bezoya water",
      nameFr: "Eau Bezoya",
      descriptionEs: "Caja de 24 botellas de 500ml.",
      descriptionEn: "Box of 24 x 500ml bottles.",
      descriptionFr: "Carton de 24 bouteilles de 500ml.",
      price: 5000,
      unit: "caja (24x500ml)",
      categoryId: agua.id,
    },
    {
      slug: "detergente-ropa",
      nameEs: "Detergente para ropa",
      nameEn: "Laundry detergent",
      nameFr: "Lessive pour le linge",
      descriptionEs: "Saco de 10+1kg.",
      descriptionEn: "10+1kg sack.",
      descriptionFr: "Sac de 10+1kg.",
      price: 12000,
      unit: "saco 10+1kg",
      categoryId: limpiezaHogar.id,
    },
    {
      slug: "lejia",
      nameEs: "Lejía",
      nameEn: "Bleach",
      nameFr: "Eau de javel",
      descriptionEs: "Garrafa de 2L.",
      descriptionEn: "2L bottle.",
      descriptionFr: "Bidon de 2L.",
      price: 2500,
      unit: "garrafa 2L",
      categoryId: limpiezaHogar.id,
    },
    {
      slug: "fregasuelos",
      nameEs: "Fregasuelos",
      nameEn: "Floor cleaner",
      nameFr: "Nettoyant pour sols",
      descriptionEs: "Botella de 1,5L.",
      descriptionEn: "1.5L bottle.",
      descriptionFr: "Bouteille de 1,5L.",
      price: 3000,
      unit: "botella 1,5L",
      categoryId: limpiezaHogar.id,
    },
    {
      slug: "ambientador",
      nameEs: "Ambientador",
      nameEn: "Air freshener",
      nameFr: "Désodorisant",
      descriptionEs: "Botella de 750ml.",
      descriptionEn: "750ml bottle.",
      descriptionFr: "Bouteille de 750ml.",
      price: 2500,
      unit: "botella 750ml",
      categoryId: limpiezaHogar.id,
    },
    {
      slug: "lavavajillas",
      nameEs: "Lavavajillas",
      nameEn: "Dish soap",
      nameFr: "Liquide vaisselle",
      descriptionEs: "Botella concentrada de 750ml.",
      descriptionEn: "750ml concentrated bottle.",
      descriptionFr: "Bouteille concentrée de 750ml.",
      price: 3000,
      unit: "botella 750ml",
      categoryId: limpiezaHogar.id,
    },
    {
      slug: "bolsas-basura",
      nameEs: "Bolsas de basura",
      nameEn: "Garbage bags",
      nameFr: "Sacs poubelle",
      descriptionEs: "Rollo de bolsas 70x70cm.",
      descriptionEn: "Roll of 70x70cm bags.",
      descriptionFr: "Rouleau de sacs 70x70cm.",
      price: 2000,
      unit: "rollo 70x70cm",
      categoryId: limpiezaHogar.id,
    },
    {
      slug: "rollos-cocina",
      nameEs: "Rollos de cocina",
      nameEn: "Kitchen roll",
      nameFr: "Essuie-tout",
      descriptionEs: "Paquete de 2 rollos.",
      descriptionEn: "Pack of 2 rolls.",
      descriptionFr: "Paquet de 2 rouleaux.",
      price: 1500,
      unit: "paquete 2 rollos",
      categoryId: limpiezaHogar.id,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
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

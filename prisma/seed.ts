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
      imageUrl: "/images/product-harina.webp",
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

  const now = new Date();

  const posts = [
    {
      slug: "bienvenida-givid",
      titleEs: "Bienvenidos a GIVID: limpieza, eventos y distribución mayorista en Malabo",
      titleEn: "Welcome to GIVID: cleaning, events and wholesale distribution in Malabo",
      titleFr: "Bienvenue chez GIVID : nettoyage, événements et distribution en gros à Malabo",
      excerptEs: "Presentamos GIVID (Preser Gisvalida SL): una empresa multiservicios en Malabo con tres líneas de negocio y presencia online.",
      excerptEn: "Introducing GIVID (Preser Gisvalida SL): a multi-service company in Malabo with three business lines, now online.",
      excerptFr: "Présentation de GIVID (Preser Gisvalida SL) : une entreprise multiservices à Malabo, désormais en ligne.",
      contentEs:
        "Estamos encantados de presentar la nueva web de GIVID (Preser Gisvalida SL), empresa multiservicios con sede en Malabo, Guinea Ecuatorial.\n\n## Tres líneas de negocio, una misma empresa\n\nGIVID Facility Services se ocupa de la limpieza y el mantenimiento de edificios, instalaciones y espacios verdes para empresas, comunidades e instituciones.\n\nGIVID Events ofrece azafatas, protocolo y alquiler de mesas y sillas elegantes para todo tipo de eventos corporativos, institucionales y sociales en Malabo.\n\nGIVID Distribution comercializa al por mayor alimentación, cuidado infantil, agua y productos de limpieza del hogar, incluida nuestra propia marca GIVID (arroz, harina, pañales y toallitas).\n\n## Cómo contactarnos\n\nEn esta web encontrarás información detallada de cada servicio y nuestro catálogo mayorista con precios orientativos. Para pedidos o presupuestos, escríbenos por WhatsApp, correo electrónico o visita nuestra tienda física en Timbabe, Malabo.",
      contentEn:
        "We are excited to introduce the new GIVID (Preser Gisvalida SL) website, a multi-service company based in Malabo, Equatorial Guinea.\n\n## Three business lines, one company\n\nGIVID Facility Services handles cleaning and maintenance of buildings, facilities and green spaces for businesses, communities and institutions.\n\nGIVID Events provides hostesses, protocol and rental of elegant tables and chairs for corporate, institutional and social events in Malabo.\n\nGIVID Distribution sells food, childcare, water and household cleaning products at wholesale prices, including our own GIVID brand (rice, flour, diapers and wipes).\n\n## How to reach us\n\nOn this site you'll find detailed information about each service and our wholesale catalog with indicative prices. For orders or quotes, message us on WhatsApp, by email, or visit our physical store in Timbabe, Malabo.",
      contentFr:
        "Nous sommes ravis de présenter le nouveau site de GIVID (Preser Gisvalida SL), entreprise multiservices basée à Malabo, en Guinée Équatoriale.\n\n## Trois activités, une seule entreprise\n\nGIVID Facility Services assure le nettoyage et l'entretien des bâtiments, installations et espaces verts pour entreprises, copropriétés et institutions.\n\nGIVID Events propose des hôtesses, du protocole et la location de tables et chaises élégantes pour tout type d'événement à Malabo.\n\nGIVID Distribution commercialise en gros des produits alimentaires, de puériculture, d'eau et d'entretien du foyer, y compris notre propre marque GIVID (riz, farine, couches et lingettes).\n\n## Nous contacter\n\nSur ce site, vous trouverez des informations détaillées sur chaque service et notre catalogue de gros avec des prix indicatifs. Pour toute commande ou devis, écrivez-nous sur WhatsApp, par e-mail, ou rendez-nous visite dans notre magasin de Timbabe, Malabo.",
      published: true,
      publishedAt: now,
    },
    {
      slug: "limpieza-mantenimiento-edificios-malabo",
      titleEs: "Limpieza y mantenimiento de edificios en Malabo: guía para empresas",
      titleEn: "Building cleaning and maintenance in Malabo: a guide for businesses",
      titleFr: "Nettoyage et entretien de bâtiments à Malabo : guide pour les entreprises",
      excerptEs: "Qué debe incluir un buen servicio de limpieza y mantenimiento de edificios en Malabo, y cómo elegir la empresa adecuada.",
      excerptEn: "What a good building cleaning and maintenance service in Malabo should include, and how to choose the right company.",
      excerptFr: "Ce que doit inclure un bon service de nettoyage et d'entretien de bâtiments à Malabo, et comment choisir la bonne entreprise.",
      contentEs:
        "## Por qué la limpieza profesional importa\n\nUn edificio bien mantenido transmite confianza: a tus clientes, a tus empleados y a cualquier visita. En Malabo, cada vez más empresas, comunidades de vecinos e instituciones optan por contratar un servicio profesional de limpieza y mantenimiento en lugar de gestionarlo de forma interna, ya que reduce costes de personal, garantiza resultados constantes y libera tiempo para centrarse en el negocio.\n\n## Qué debe incluir un buen servicio de limpieza y mantenimiento\n\nUn servicio completo de limpieza y mantenimiento de edificios en Guinea Ecuatorial debería cubrir, como mínimo:\n\n- Limpieza de oficinas y zonas comunes\n- Limpieza de establecimientos comerciales\n- Mantenimiento general de instalaciones\n- Cuidado y mantenimiento de espacios verdes y jardines\n- Servicios de limpieza especializados\n\nLo ideal es contar con un único proveedor que se ocupe de todo, en vez de coordinar varias empresas distintas para cada tarea.\n\n## Cómo elegir la empresa de limpieza adecuada en Malabo\n\nA la hora de elegir un servicio de mantenimiento de edificios en Malabo, conviene fijarse en la experiencia y referencias reales en la zona, la flexibilidad de horarios, la calidad de los materiales y productos utilizados, y la atención cercana con capacidad de respuesta rápida.\n\n## GIVID Facility Services en Malabo\n\nEn GIVID ofrecemos servicios profesionales de limpieza y mantenimiento de edificios, instalaciones y espacios verdes en Malabo, adaptados a empresas, comunidades e instituciones. Nos ocupamos de sus espacios para que usted pueda ocuparse de su negocio.\n\n¿Necesitas un plan de mantenimiento a medida? Escríbenos por WhatsApp y te lo preparamos sin compromiso.",
      contentEn:
        "## Why professional cleaning matters\n\nA well-maintained building builds trust with your clients, your staff and any visitor. In Malabo, more and more businesses, residential communities and institutions choose a professional cleaning and maintenance service instead of managing it in-house, since it lowers staffing costs, guarantees consistent results and frees up time to focus on the business.\n\n## What a good cleaning and maintenance service should include\n\nA complete building cleaning and maintenance service in Equatorial Guinea should cover, at minimum:\n\n- Cleaning of offices and common areas\n- Cleaning of commercial premises\n- General maintenance of facilities\n- Care and maintenance of green spaces and gardens\n- Specialized cleaning services\n\nIt's best to have a single provider handle everything, instead of coordinating several different companies for each task.\n\n## How to choose the right cleaning company in Malabo\n\nWhen choosing a building maintenance service in Malabo, look at real local experience and references, flexible scheduling, the quality of materials and products used, and close, responsive attention.\n\n## GIVID Facility Services in Malabo\n\nAt GIVID we offer professional cleaning and maintenance services for buildings, facilities and green spaces in Malabo, tailored to businesses, communities and institutions. We take care of your spaces so you can take care of your business.\n\nNeed a custom maintenance plan? Message us on WhatsApp and we'll put one together, no strings attached.",
      contentFr:
        "## Pourquoi le nettoyage professionnel compte\n\nUn bâtiment bien entretenu inspire confiance à vos clients, vos employés et tout visiteur. À Malabo, de plus en plus d'entreprises, de copropriétés et d'institutions choisissent un service professionnel de nettoyage et d'entretien plutôt que de le gérer en interne, car cela réduit les coûts de personnel, garantit des résultats constants et libère du temps pour se concentrer sur l'activité.\n\n## Ce que doit inclure un bon service de nettoyage et d'entretien\n\nUn service complet de nettoyage et d'entretien de bâtiments en Guinée Équatoriale doit couvrir, au minimum :\n\n- Nettoyage de bureaux et parties communes\n- Nettoyage d'établissements commerciaux\n- Entretien général des installations\n- Entretien des espaces verts et jardins\n- Services de nettoyage spécialisés\n\nL'idéal est de faire appel à un seul prestataire pour tout, plutôt que de coordonner plusieurs entreprises pour chaque tâche.\n\n## Comment choisir la bonne entreprise de nettoyage à Malabo\n\nPour choisir un service d'entretien de bâtiments à Malabo, vérifiez l'expérience et les références locales réelles, la flexibilité des horaires, la qualité des produits utilisés, et la proximité avec une capacité de réponse rapide.\n\n## GIVID Facility Services à Malabo\n\nChez GIVID, nous proposons des services professionnels de nettoyage et d'entretien de bâtiments, installations et espaces verts à Malabo, adaptés aux entreprises, copropriétés et institutions. Nous nous occupons de vos espaces pour que vous puissiez vous occuper de votre activité.\n\nBesoin d'un plan d'entretien sur mesure ? Écrivez-nous sur WhatsApp, sans engagement.",
      published: true,
      publishedAt: now,
    },
    {
      slug: "azafatas-alquiler-mobiliario-eventos-malabo",
      titleEs: "Azafatas y alquiler de mobiliario para eventos en Malabo",
      titleEn: "Hostesses and furniture rental for events in Malabo",
      titleFr: "Hôtesses et location de mobilier pour événements à Malabo",
      excerptEs: "Todo lo que necesitas para que tu evento en Malabo salga perfecto: azafatas profesionales, protocolo y alquiler de mesas y sillas elegantes.",
      excerptEn: "Everything you need for your event in Malabo to go perfectly: professional hostesses, protocol and elegant table and chair rental.",
      excerptFr: "Tout ce qu'il faut pour réussir votre événement à Malabo : hôtesses professionnelles, protocole et location de mobilier élégant.",
      contentEs:
        "## La importancia de un buen equipo de azafatas\n\nEl éxito de un evento no depende solo de la decoración o el catering: la primera impresión la marca quién recibe a los invitados. Un equipo de azafatas profesional en Malabo gestiona la acreditación, orienta a los asistentes y representa la imagen de la marca o institución que organiza el evento, con elegancia y cercanía.\n\n## Para qué tipo de eventos se contratan azafatas en Guinea Ecuatorial\n\nLos servicios de azafatas y personal de apoyo son habituales en congresos, conferencias y ferias, presentaciones de producto, inauguraciones y recepciones institucionales, bodas y celebraciones privadas, y cenas de empresa y eventos corporativos.\n\n## Alquiler de mesas y sillas elegantes para eventos en Malabo\n\nAdemás del personal, muchos eventos necesitan mobiliario adecuado. Contar con un único proveedor que ofrezca azafatas y alquiler de mesas y sillas elegantes simplifica mucho la organización: un solo contacto, un solo presupuesto y una coordinación mucho más sencilla.\n\n## GIVID Events, tu proveedor de azafatas en Malabo\n\nGIVID Events ofrece azafatas, protocolo y alquiler de mobiliario para todo tipo de eventos corporativos, institucionales y sociales en Guinea Ecuatorial. Cuéntanos tu evento y te ayudamos a que todo salga perfecto.",
      contentEn:
        "## Why a good hostess team matters\n\nA successful event doesn't just depend on decor or catering: the first impression comes from who welcomes your guests. A professional hostess team in Malabo manages accreditation, guides attendees and represents the image of the brand or institution hosting the event, with elegance and warmth.\n\n## What kind of events need hostesses in Equatorial Guinea\n\nHostess and support staff services are common at congresses, conferences and trade fairs, product launches, institutional openings and receptions, weddings and private celebrations, and corporate dinners and business events.\n\n## Renting elegant tables and chairs for events in Malabo\n\nBeyond staff, many events also need the right furniture. Having a single provider for both hostesses and elegant table and chair rental makes organization much easier: one contact, one quote, much simpler coordination.\n\n## GIVID Events, your hostess provider in Malabo\n\nGIVID Events offers hostesses, protocol and furniture rental for all kinds of corporate, institutional and social events in Equatorial Guinea. Tell us about your event and we'll help make it perfect.",
      contentFr:
        "## L'importance d'une bonne équipe d'hôtesses\n\nLa réussite d'un événement ne dépend pas seulement de la décoration ou du traiteur : la première impression vient de l'accueil réservé aux invités. Une équipe d'hôtesses professionnelle à Malabo gère les accréditations, oriente les participants et représente l'image de la marque ou de l'institution organisatrice, avec élégance et proximité.\n\n## Pour quels types d'événements engage-t-on des hôtesses en Guinée Équatoriale\n\nLes services d'hôtesses et de personnel d'accueil sont fréquents lors de congrès, conférences et salons, lancements de produits, inaugurations et réceptions institutionnelles, mariages et célébrations privées, ainsi que dîners d'entreprise et événements corporatifs.\n\n## Location de tables et chaises élégantes pour événements à Malabo\n\nAu-delà du personnel, de nombreux événements ont aussi besoin d'un mobilier adapté. Faire appel à un seul prestataire pour les hôtesses et la location de mobilier élégant simplifie grandement l'organisation : un seul contact, un seul devis, une coordination bien plus simple.\n\n## GIVID Events, votre prestataire d'hôtesses à Malabo\n\nGIVID Events propose des hôtesses, du protocole et la location de mobilier pour tout type d'événement corporatif, institutionnel ou social en Guinée Équatoriale. Parlez-nous de votre événement, nous vous aidons à ce que tout soit parfait.",
      published: true,
      publishedAt: now,
    },
    {
      slug: "distribucion-mayorista-guinea-ecuatorial",
      titleEs: "Distribución mayorista en Guinea Ecuatorial: cómo abastecer tu negocio",
      titleEn: "Wholesale distribution in Equatorial Guinea: how to stock your business",
      titleFr: "Distribution en gros en Guinée Équatoriale : comment approvisionner votre commerce",
      excerptEs: "Alimentación, agua, cuidado infantil y productos de limpieza al por mayor en Malabo, incluida la marca propia GIVID.",
      excerptEn: "Food, water, childcare and cleaning products at wholesale prices in Malabo, including the GIVID own brand.",
      excerptFr: "Produits alimentaires, eau, puériculture et entretien en gros à Malabo, y compris la marque propre GIVID.",
      contentEs:
        "## Qué es la distribución mayorista y por qué importa en Guinea Ecuatorial\n\nComercios, restaurantes, hoteles y otros distribuidores necesitan un suministro constante de productos de primera necesidad a precios competitivos. La distribución mayorista permite comprar en grandes cantidades (sacos, cajas, palés) a un precio por unidad más bajo que en el comercio minorista.\n\n## Categorías de productos al por mayor en Malabo\n\nEn GIVID Distribution trabajamos cuatro grandes categorías: alimentación (arroz, harina de trigo y aceite), cuidado infantil (pañales y toallitas húmedas), agua (Agua Bezoya) y limpieza del hogar (detergentes, lejías, fregasuelos, ambientadores, lavavajillas, bolsas de basura y rollos de cocina).\n\n## La marca propia GIVID\n\nAdemás de distribuir producto de terceros, desarrollamos nuestra propia marca: GIVID Arroz, GIVID Harina, GIVID Pants (pañales) y GIVID Toallitas. Productos con calidad controlada, pensados para las necesidades reales de comercios y familias en Guinea Ecuatorial.\n\n## Cómo hacer un pedido al por mayor a GIVID\n\nNo vendemos online: consulta nuestro catálogo con precios orientativos y haz tu pedido por WhatsApp, correo electrónico o visitando nuestra tienda física en Timbabe, Malabo. Trabajamos con comercios, distribuidores y particulares.",
      contentEn:
        "## What wholesale distribution is and why it matters in Equatorial Guinea\n\nShops, restaurants, hotels and other distributors need a steady supply of essential goods at competitive prices. Wholesale distribution allows buying in large quantities (sacks, boxes, pallets) at a lower per-unit price than retail.\n\n## Wholesale product categories in Malabo\n\nAt GIVID Distribution we work across four main categories: food (rice, wheat flour and oil), childcare (diapers and baby wipes), water (Bezoya), and household cleaning (detergents, bleach, floor cleaners, air fresheners, dish soap, garbage bags and kitchen roll).\n\n## The GIVID own brand\n\nBeyond distributing third-party products, we're developing our own brand: GIVID Rice, GIVID Flour, GIVID Pants (diapers) and GIVID Wipes. Quality-controlled products designed for the real needs of shops and families in Equatorial Guinea.\n\n## How to place a wholesale order with GIVID\n\nWe don't sell online: check our catalog for indicative prices and place your order via WhatsApp, email, or by visiting our physical store in Timbabe, Malabo. We work with shops, distributors and individuals.",
      contentFr:
        "## Qu'est-ce que la distribution en gros et pourquoi est-ce important en Guinée Équatoriale\n\nCommerces, restaurants, hôtels et autres distributeurs ont besoin d'un approvisionnement constant en produits de première nécessité à des prix compétitifs. La distribution en gros permet d'acheter en grandes quantités (sacs, cartons, palettes) à un prix unitaire inférieur à celui du commerce de détail.\n\n## Catégories de produits en gros à Malabo\n\nChez GIVID Distribution, nous travaillons sur quatre grandes catégories : alimentation (riz, farine de blé et huile), puériculture (couches et lingettes), eau (Eau Bezoya) et entretien du foyer (lessive, eau de javel, nettoyants pour sols, désodorisants, liquide vaisselle, sacs poubelle et essuie-tout).\n\n## La marque propre GIVID\n\nAu-delà de la distribution de produits tiers, nous développons notre propre marque : GIVID Riz, GIVID Farine, GIVID Pants (couches) et GIVID Lingettes. Des produits à qualité contrôlée, pensés pour les besoins réels des commerces et des familles en Guinée Équatoriale.\n\n## Comment passer une commande en gros chez GIVID\n\nNous ne vendons pas en ligne : consultez notre catalogue avec des prix indicatifs et passez commande par WhatsApp, e-mail, ou en visitant notre magasin de Timbabe, Malabo. Nous travaillons avec des commerces, des distributeurs et des particuliers.",
      published: true,
      publishedAt: now,
    },
  ];

  for (const post of posts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }
  console.log(`Seeded ${posts.length} blog posts`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

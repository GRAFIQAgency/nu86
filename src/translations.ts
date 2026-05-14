/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'cs' | 'en';

export const translations = {
  cs: {
    nav: {
      menu: 'Menu',
      philosophy: 'Filozofie',
      delivery: 'Rozvoz',
      contact: 'Kontakt',
      cta: 'Objednat rozvoz',
    },
    hero: {
      title1: 'Ochutnejte',
      title2: 'Budoucnost',
      explore: 'Prozkoumat Menu',
      order: 'Objednat nyní',
      est: 'EST 2026 // NEO TOKIO',
    },
    menu: {
      badge: 'Digitální Trezor',
      title: 'Syntaxe',
      order: 'Objednat nyní',
      categories: {
        all: 'Vše',
        small: 'Malá jídla',
        main: 'Hlavní chody',
        desserts: 'Dezerty',
        drinks: 'Nápoje',
      },
      items: [
        {
          id: 1,
          name: "Elektrické Edamame",
          description: "Zapařené sójové boby s yuzu solí a olejem ze sečuánského pepře.",
          category: "Malá jídla",
        },
        {
          id: 2,
          name: "Neonová Gyoza",
          description: "Hovězí knedlíčky s černým česnekem, zázvorem a redukcí ze žlutého chilli.",
          category: "Malá jídla",
        },
        {
          id: 3,
          name: "Tokyo Drift Ramen",
          description: "Pálivý miso vývar, nudle s aktivním uhlím a planoucí bůček.",
          category: "Hlavní chody",
        },
        {
          id: 4,
          name: "Acid Salmon Roll",
          description: "Losos naložený v citrusech s neonovou ředkví a explodujícími perlami.",
          category: "Hlavní chody",
        },
        {
          id: 5,
          name: "Mražená Matcha 2.0",
          description: "Dusíkem chlazená matcha koule, tekutá čokoládová hlína a neonový med.",
          category: "Dezerty",
        },
        {
          id: 6,
          name: "Cyber Lychee",
          description: "Elektrický gin, neonové bittery a plovoucí koule z květu klitorie.",
          category: "Nápoje",
        }
      ]
    },
    experience: {
      badge: 'Systémová Architektura',
      title: 'Hyper-fúzní Gastronomie',
      description: 'Nubi není jen bistro; je to smyslové přetížení. Vezmeme staleté techniky a srazíme je s futuristickými chutěmi. Surová preciznost se setkává s elektrickou atmosférou.',
      intensity: 'Intenzita',
      features: [
        {
          title: 'Zero Drift',
          description: 'Technika tak precizní, že popírá realitu. Každý řez, každé koření, vypočítané.',
        },
        {
          title: 'Elektrický Puls',
          description: 'Atmosféra nabitá vysokofrekvenční energií a hlubokými basy.',
        }
      ]
    },
    footer: {
      description: 'Další generace asijského stravování. Precizně navržené talíře. Vysokofrekvenční atmosféra. Duše Tokia, globální energie.',
      coordinatesTitle: 'Souřadnice',
      address: 'Unit 404, Cyber Heights, Imperial District, LDN',
      availabilityTitle: 'Dostupnost',
      days: ['Všední dny', 'Víkendy', 'Neděle'],
      rights: '© 2026 NUBI SYSTEMS INC. // DATA CHRÁNĚNA',
      links: ['Neurální Pravidla', 'Obchodní Podmínky', 'Cookies_v2'],
    }
  },
  en: {
    nav: {
      menu: 'Menu',
      philosophy: 'Philosophy',
      delivery: 'Delivery',
      contact: 'Contact',
      cta: 'Order Delivery',
    },
    hero: {
      title1: 'Taste the',
      title2: 'Future',
      explore: 'Explore Menu',
      order: 'Order Now',
      est: 'EST 2026 // NEO TOKIO',
    },
    menu: {
      badge: 'Digital Vault',
      title: 'The Syntax',
      order: 'Order Now',
      categories: {
        all: 'All',
        small: 'Small Plates',
        main: 'Main Courses',
        desserts: 'Desserts',
        drinks: 'Drinks',
      },
      items: [
        {
          id: 1,
          name: "Electric Edamame",
          description: "Steam-blasted soybeans with yuzu salt and szechuan peppercorn oil.",
          category: "Small Plates",
        },
        {
          id: 2,
          name: "Neon Gyoza",
          description: "Beef dumplings with black garlic, ginger, and yellow chili reduction.",
          category: "Small Plates",
        },
        {
          id: 3,
          name: "Tokyo Drift Ramen",
          description: "Spicy miso broth, activated charcoal noodles, and flaming pork belly.",
          category: "Main Courses",
        },
        {
          id: 4,
          name: "Acid Salmon Roll",
          description: "Citrus-cured salmon with neon radish and explosive pop-pearls.",
          category: "Main Courses",
        },
        {
          id: 5,
          name: "Frozen Matcha 2.0",
          description: "Nitrogen-chilled matcha sphere, liquid chocolate soil, and neon honey.",
          category: "Desserts",
        },
        {
          id: 6,
          name: "Cyber Lychee",
          description: "Electric gin, neon bitters, and butterfly pea flower floating sphere.",
          category: "Drinks",
        }
      ]
    },
    experience: {
      badge: 'System Architecture',
      title: 'Hyper-Fusion Gastronomy',
      description: "Nubi isn't just a bistro; it's a sensory overload. We take century-old techniques and collide them with futuristic flavors. Raw precision meets electric atmosphere.",
      intensity: 'Intensity',
      features: [
        {
          title: 'Zero Drift',
          description: 'Technique so precise it defies reality. Every cut, every seasoning, calculated.',
        },
        {
          title: 'Electric Pulse',
          description: 'An atmosphere charged with high-frequency energy and deep bass.',
        }
      ]
    },
    footer: {
      description: 'The next generation of Asian dining. Precision engineered plates. High frequency atmosphere. Tokyo soul, global energy.',
      coordinatesTitle: 'Coordinates',
      address: 'Unit 404, Cyber Heights, Imperial District, LDN',
      availabilityTitle: 'Availability',
      days: ['Weekdays', 'Weekends', 'Sundays'],
      rights: '© 2026 NUBI SYSTEMS INC. // DATA PROTECTED',
      links: ['Neural Policy', 'Service Terms', 'Cookies_v2'],
    }
  }
};

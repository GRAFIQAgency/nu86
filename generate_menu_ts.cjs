const fs = require("fs");
const html = fs.readFileSync("ikelp_goods.html", "utf8");

function decodeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&#237;/g, "í")
    .replace(/&#233;/g, "é")
    .replace(/&#225;/g, "á")
    .replace(/&#253;/g, "ý")
    .replace(/&#269;/g, "č")
    .replace(/&#271;/g, "ď")
    .replace(/&#283;/g, "ě")
    .replace(/&#328;/g, "ň")
    .replace(/&#345;/g, "ř")
    .replace(/&#353;/g, "š")
    .replace(/&#357;/g, "ť")
    .replace(/&#250;/g, "ú")
    .replace(/&#367;/g, "ů")
    .replace(/&#382;/g, "ž")
    .replace(/&#205;/g, "Í")
    .replace(/&#201;/g, "É")
    .replace(/&#193;/g, "Á")
    .replace(/&#221;/g, "Ý")
    .replace(/&#268;/g, "Č")
    .replace(/&#270;/g, "Ď")
    .replace(/&#282;/g, "Ě")
    .replace(/&#327;/g, "Ň")
    .replace(/&#344;/g, "Ř")
    .replace(/&#352;/g, "Š")
    .replace(/&#356;/g, "Ť")
    .replace(/&#218;/g, "Ú")
    .replace(/&#366;/g, "Ů")
    .replace(/&#381;/g, "Ž")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'");
}

const categoriesRaw = html.split(/<div class="goods-category/i);

const catMap = {
  "Předkrmy": { id: "starters", nameCs: "Předkrmy", nameEn: "Starters & Appetizers", descCs: "Tradiční asijské předkrmy a čerstvé/křupavé závitky", descEn: "Traditional Asian starters and rolls" },
  "Polévky": { id: "soups", nameCs: "Polévky", nameEn: "Soups", descCs: "Tradiční asijské polévky a vývary", descEn: "Traditional Asian soups and broths" },
  "Hlavní Jídla": { id: "mains", nameCs: "Hlavní jídla", nameEn: "Main Dishes", descCs: "Autentická asijská jídla – kung pao, pho, pad thai, bun bo, udon a rýže", descEn: "Authentic Asian main courses – wok, pho, pad thai, noodles and rice" },
  "Bistro retro": { id: "retro", nameCs: "Bistro retro", nameEn: "Bistro Retro", descCs: "Oblíbené bistro stálice v retro nabídce", descEn: "Classic bistro favorites" },
  "Nápoje": { id: "drinks", nameCs: "Nápoje", nameEn: "Drinks & Beverages", descCs: "Nealko nápoje, vietnamská káva a pivo", descEn: "Soft drinks, Vietnamese coffee and beer" },
  "Přílohy": { id: "sides", nameCs: "Přílohy", nameEn: "Sides & Extras", descCs: "Samostatné přílohy k jídlům", descEn: "Side dishes and extras" },
  "Nubistro Shop": { id: "shop", nameCs: "Nubistro Shop", nameEn: "Nu Bistro Shop", descCs: "Dárkové poukazy a balení", descEn: "Vouchers and packaging" }
};

// Map of english friendly translations for each item
const enTranslations = {
  "58 Nem cuon song kuřecí": "58 Fresh Spring Rolls with Chicken",
  "59 Nem cuon song krevety": "59 Fresh Spring Rolls with Prawns",
  "Mini závitky": "Mini Crispy Spring Rolls",
  "Salat": "Asian Fresh Salad",
  "Tom chien xu 6ks": "Crispy Panko Prawns (6 pcs)",
  "Vietnamské závitky 3ks": "Fried Vietnamese Spring Rolls (3 pcs)",
  
  "Kuřecí polévka 300ml": "Chicken Soup (300ml)",
  "Pekingská polévka 300ml": "Hot & Sour Beijing Soup (300ml)",
  "Thajská polévka krevety": "Tom Yum Thai Soup with Prawns",
  "Thajská polévka kuřecí": "Tom Kha Thai Soup with Chicken",
  "Thajská polévka mix": "Tom Yum Thai Soup Mix",
  
  "01 Kuřecí kung-pao": "01 Chicken Kung Pao",
  "02 Vepřové kung – pao": "02 Pork Kung Pao",
  "03 kung pao hovězí": "03 Beef Kung Pao",
  "04 Krevety kung – pao": "04 Prawn Kung Pao",
  "05 Tofu kung – pao": "05 Tofu Kung Pao",
  "06 Kuřecí pikantní": "06 Spicy Chicken with Vegetables",
  "07 Vepřové pikantní": "07 Spicy Pork with Vegetables",
  "08 Hovězí pikantní": "08 Spicy Beef with Vegetables",
  "09 Krevety pikantní": "09 Spicy Prawns with Vegetables",
  "10 Tofu pikantní": "10 Spicy Tofu with Vegetables",
  "11. Kuřecí se zeleninou": "11 Chicken with Fresh Vegetables",
  "12 Vepřové se zeleninou": "12 Pork with Fresh Vegetables",
  "13 Hovězí se zeleninou": "13 Beef with Fresh Vegetables",
  "14 Krevety se zeleninou": "14 Prawns with Fresh Vegetables",
  "15 Tofu se zeleninou": "15 Tofu with Fresh Vegetables",
  "16 Kachna voňavá omáčka": "16 Crispy Duck with Aromatic Sauce",
  "17 Kachna zelenina": "17 Crispy Duck with Vegetables",
  "18 Kachna pikantní": "18 Spicy Crispy Duck",
  "19 Kuřecí pekingské": "19 Beijing Crispy Chicken",
  "20 Vepřové pekingské": "20 Beijing Pork",
  "21 PHO kuřecí": "21 Pho Ga (Chicken Pho)",
  "22 PHO hovězí": "22 Pho Bo (Beef Pho)",
  "23 PHO mix": "23 Pho Mix (Beef & Chicken Pho)",
  "24 Bun nam bo hovězí": "24 Bun Bo Nam Bo (Beef Rice Noodles)",
  "25 Bun nam bo tofu": "25 Bun Chay Tofu (Tofu Rice Noodles)",
  "26 Bun bo hue": "26 Bun Bo Hue (Spicy Beef Noodle Soup)",
  "27 gyros nudlemi": "27 Gyros with Fried Noodles",
  "28 Gyros rýže": "28 Gyros with Jasmine Rice",
  "29 Gyros hranolky": "29 Gyros with Crispy Fries",
  "30.gyros nudle syrovou omacka": "30 Gyros with Noodles & Cheese Sauce",
  "31:ga thajska cervena": "31 Thai Red Curry with Chicken (Ga)",
  "32 Thajská červená vepřová": "32 Thai Red Curry with Pork",
  "33 Thajská červená hovězí": "33 Thai Red Curry with Beef",
  "34 Thajská červená krevety": "34 Thai Red Curry with Prawns",
  "35 Thajská červená tofu": "35 Thai Red Curry with Tofu",
  "37 Nudle/rizoto kuřecí": "37 Fried Noodles / Fried Rice with Chicken",
  "38 Nudel/rizoto vepřové": "38 Fried Noodles / Fried Rice with Pork",
  "39 Nudel/rizoto hovězí": "39 Fried Noodles / Fried Rice with Beef",
  "40 Nudel/rizoto krevety": "40 Fried Noodles / Fried Rice with Prawns",
  "41 Nudel/rizoto tofu": "41 Fried Noodles / Fried Rice with Tofu",
  "42 Ryžové nudle zelenina": "42 Fried Rice Noodles with Vegetables",
  "43 Rýžové nudle kuřecí": "43 Fried Rice Noodles with Chicken",
  "44 Ryžové nudle vepřové": "44 Fried Rice Noodles with Pork",
  "45 Ryžové nudle hovězí": "45 Fried Rice Noodles with Beef",
  "46 Ryžové nudle krevety": "46 Fried Rice Noodles with Prawns",
  "47 Ryžové nudle tofu": "47 Fried Rice Noodles with Tofu",
  "48 Udon zelenina": "48 Fried Udon Noodles with Vegetables",
  "49 Udon kuřecí": "49 Fried Udon Noodles with Chicken",
  "50 Udon vepřové": "50 Fried Udon Noodles with Pork",
  "51 Udon hovězí": "51 Fried Udon Noodles with Beef",
  "52 Udon krevety": "52 Fried Udon Noodles with Prawns",
  "53 Udon tofu": "53 Fried Udon Noodles with Tofu",
  "54 Pad thaj kuřecí": "54 Pad Thai with Chicken",
  "55 Pad thaj hovězí": "55 Pad Thai with Beef",
  "56 Pad thaj tofu": "56 Pad Thai with Tofu",
  "57. Bún nem": "57 Bun Nem (Rice Noodles with Fried Spring Rolls)",
  "60 kuřecí na kari": "60 Chicken Yellow Curry",
  "61 kure pětivůní .": "61 Five-Spice Crispy Chicken",
  "62 Kůřecí steak .": "62 Chicken Steak",
  "63 Sýr hranolky": "63 Fried Cheese with Fries",
  "64 kousky hranolky": "64 Crispy Chicken Bites with Fries",
  "65 bun cha nuong": "65 Bun Cha Nuong (Grilled Pork Rice Noodles)",
  "66 Kuřecí se žampiony": "66 Chicken with Mushrooms",
  "67 Thaijská kachna": "67 Crispy Duck with Thai Red Sauce",
  
  "Gyros": "Gyros Bistro Retro Special",
  "Phó bo (hovězí  polévka)": "Pho Bo (Classic Beef Noodle Soup)",
  
  "Ca fe": "Vietnamese Drip Coffee (Cà Phê)",
  "Coca Cola 0,5l": "Coca-Cola (0.5l)",
  "Crista 0,5ml": "Cristal Spring Water (0.5l)",
  "Kofola 0,3l": "Kofola (0.33l)",
  "Kofola 0,5ml": "Kofola (0.5l)",
  "Pepsi 0,3 ml": "Pepsi Cola (0.33l)",
  "Pivo Krušovice 0,5l": "Krušovice Beer 10° (0.5l)",
  "Pivo nealkoho": "Non-alcoholic Beer (0.5l)",
  "Relak": "Relax Exotic Fruit Juice",
  "Vinut mango": "Vinut Mango Sparkling Fruit Drink",
  "Zon limetka 0,5l": "Zon Lime Lemonade (0.5l)",
  
  "Hranolky samostatně": "French Fries (Side)",
  "Nudle samostatně": "Fried Noodles (Side)",
  "Rýže samostatně": "Jasmine Rice (Side)",
  
  "Fodora": "Delivery Voucher / Packaging"
};

const czechDescriptions = {
  "58 Nem cuon song kuřecí": "Čerstvé letní rýžové závitky s kuřecím masem, rýžovými nudlemi, čerstvými bylinkami a omáčkou.",
  "59 Nem cuon song krevety": "Čerstvé letní rýžové závitky s krevetami, salátem, bylinkami a tradiční omáčkou.",
  "Mini závitky": "Křupavé mini jarní závitky se zeleninovou náplní a sladkokyselou omáčkou.",
  "Salat": "Svěží míchaný zeleninový salát se zálivkou.",
  "Tom chien xu 6ks": "Křupavé smažené tygří krevety v japonské strouhance Panko se sladkou chilli omáčkou.",
  "Vietnamské závitky 3ks": "Tradiční křupavé vietnamské smažené závitky s masem a zeleninou.",
  
  "Kuřecí polévka 300ml": "Poctivý horký kuřecí vývar se zeleninou a nudlemi.",
  "Pekingská polévka 300ml": "Tradiční pikantní a kyselá pekingská polévka se zeleninou, vejcem a houbami.",
  "Thajská polévka krevety": "Pikantní thajská polévka Tom Yum s krevetami, citronovou trávou, galangalem a koriandrem.",
  "Thajská polévka kuřecí": "Aromatická thajská polévka Tom Kha s kuřecím masem a kokosovým mlékem.",
  "Thajská polévka mix": "Pikantní thajská polévka s krevetami, kuřecím masem a čerstvými bylinkami.",
  
  "01 Kuřecí kung-pao": "Oblíbené kuřecí kung-pao s arašídy, křupavou zeleninou a jemně pikantní omáčkou.",
  "02 Vepřové kung – pao": "Vepřové kousky na pánvi wok s arašídy, zeleninou a tradiční kung-pao omáčkou.",
  "03 kung pao hovězí": "Šťavnaté hovězí maso s arašídy, restovanou zeleninou a kung-pao omáčkou.",
  "04 Krevety kung – pao": "Křehké krevety na woku s arašídy, pórkem, paprikou a kung-pao omáčkou.",
  "05 Tofu kung – pao": "Smažené sójové tofu s restovanou zeleninou a křupavými arašídy.",
  
  "06 Kuřecí pikantní": "Pikantní kuřecí kousky restované s chilli, paprikou a česnekem.",
  "07 Vepřové pikantní": "Pikantní vepřové nudličky na woku s pálivou omáčkou a zeleninou.",
  "08 Hovězí pikantní": "Pikantní hovězí plátky s chilli, cibulí a čerstvou zeleninou.",
  "09 Krevety pikantní": "Krevety na pikantní omáčce s čerstvou zeleninou a chilli.",
  "10 Tofu pikantní": "Zlatavé tofu s pálivou chilli omáčkou a asijskou zeleninou.",
  
  "11. Kuřecí se zeleninou": "Jemné kuřecí plátky restované na woku s bohatou směsí čerstvé zeleniny.",
  "12 Vepřové se zeleninou": "Vepřové nudličky se sezónní křupavou zeleninou na woku.",
  "13 Hovězí se zeleninou": "Hovězí plátky restované s brokolicí, mrkví, pórkem a cibulí.",
  "14 Krevety se zeleninou": "Restované krevety s čerstvou zeleninou a jemnou omáčkou.",
  "15 Tofu se zeleninou": "Tofu restované s čerstvou zeleninou ve woku.",
  
  "16 Kachna voňavá omáčka": "Křupavá pečená kachna podávaná s voňavou asijskou omáčkou a zeleninou.",
  "17 Kachna zelenina": "Šťavnatá kachna s křupavou kůrčičkou na lůžku z restované zeleniny.",
  "18 Kachna pikantní": "Křupavá pečená kachna s pikantní chilli omáčkou a zeleninou.",
  
  "19 Kuřecí pekingské": "Křupavé kuřecí kousky v pekingském stylu se sladkokyselou pikantní omáčkou.",
  "20 Vepřové pekingské": "Vepřové maso na pekingský způsob se zeleninou a sladko-pikantní omáčkou.",
  
  "21 PHO kuřecí": "Silný vietnamský hovězí a kuřecí vývar se širokými rýžovými nudlemi, kuřecím masem, jarní cibulkou a koriandrem.",
  "22 PHO hovězí": "Ikonická vietnamská hovězí polévka tažená hodiny z kostí se širokými nudlemi Pho, hovězími plátky a bylinkami.",
  "23 PHO mix": "Velká miska Pho s kombinací hovězího a kuřecího masa, nudlemi a čerstvými bylinkami.",
  
  "24 Bun nam bo hovězí": "Populární vietnamský salát s teplým restovaným hovězím, rýžovými nudlemi, salátem, bylinkami, arašídy a zálivkou Nuoc Cham.",
  "25 Bun nam bo tofu": "Lehký nudlový salát se smaženým tofu, bylinkami, praženou cibulkou a arašídy.",
  "26 Bun bo hue": "Středovietnamská pikantní polévka s kulatými rýžovými nudlemi, hovězím masem a citronovou trávou.",
  
  "27 gyros nudlemi": "Šťavnaté gyros maso podávané se smaženými nudlemi.",
  "28 Gyros rýže": "Šťavnaté gyros maso podávané s dušenou jasmínovou rýží.",
  "29 Gyros hranolky": "Šťavnaté gyros maso podávané s křupavými hranolkami a dresinkem.",
  "30.gyros nudle syrovou omacka": "Gyros maso na smažených nudlích přelité lahodnou sýrovou omáčkou.",
  
  "31:ga thajska cervena": "Pikantní červené thajské kari s kuřecím masem, kokosovým mlékem a zeleninou.",
  "32 Thajská červená vepřová": "Červené thajské kari s vepřovým masem, kokosovým mlékem, bambusem a zeleninou.",
  "33 Thajská červená hovězí": "Aromatické červené thajské kari s plátky hovězího masa a zeleninou.",
  "34 Thajská červená krevety": "Červené thajské kari s krevetami, kokosovým mlékem a bylinkami.",
  "35 Thajská červená tofu": "Červené kari s kokosovým mlékem, křehkým tofu a čerstvou zeleninou.",
  
  "37 Nudle/rizoto kuřecí": "Smažené asijské nudle nebo smažená rýže s kuřecím masem, vejcem a zeleninou.",
  "38 Nudel/rizoto vepřové": "Smažené nudle nebo rýže s vepřovým masem a křupavou zeleninou.",
  "39 Nudel/rizoto hovězí": "Smažené nudle nebo rýže s hovězím masem, vejcem a pórkem.",
  "40 Nudel/rizoto krevety": "Smažené nudle nebo rýže s krevetami a sezónní zeleninou.",
  "41 Nudel/rizoto tofu": "Smažené nudle nebo rýže s tofu a čerstvou zeleninou.",
  
  "42 Ryžové nudle zelenina": "Restované tenké rýžové nudle s křupavou zeleninou a vejcem.",
  "43 Rýžové nudle kuřecí": "Restované rýžové nudle s kuřecím masem, vejcem a zeleninou.",
  "44 Ryžové nudle vepřové": "Restované rýžové nudle s vepřovým masem a zeleninou.",
  "45 Ryžové nudle hovězí": "Restované rýžové nudle s hovězím masem, vejcem a bylinkami.",
  "46 Ryžové nudle krevety": "Restované rýžové nudle s restovanými krevetami a zeleninou.",
  "47 Ryžové nudle tofu": "Restované rýžové nudle s tofu a směsí zeleniny.",
  
  "48 Udon zelenina": "Široké japonské pšeničné udon nudle restované na woku se zeleninou a sojovou omáčkou.",
  "49 Udon kuřecí": "Restované udon nudle s jemným kuřecím masem, pórkem a sezamem.",
  "50 Udon vepřové": "Restované udon nudle s vepřovým masem a křupavou zeleninou.",
  "51 Udon hovězí": "Restované udon nudle s hovězími plátky, cibulí a zeleninou.",
  "52 Udon krevety": "Restované udon nudle s křupavými krevetami a teriyaki omáčkou.",
  "53 Udon tofu": "Restované udon nudle se smaženým tofu a asijskou zeleninou.",
  
  "54 Pad thaj kuřecí": "Slavné thajské smažené rýžové nudle Pad Thai s kuřecím masem, tamarindem, vejcem, klíčky a drcenými arašídy.",
  "55 Pad thaj hovězí": "Tradiční Pad Thai s hovězím masem, tamarindovou omáčkou, arašídy a limetkou.",
  "56 Pad thaj tofu": "Vegetariánské Pad Thai s tofu, klíčky, tamarindem a praženými oříšky.",
  
  "57. Bún nem": "Rýžové nudle s křupavými smaženými vietnamskými závitky, salátem, bylinkami a zálivkou.",
  "60 kuřecí na kari": "Jemné žluté kari s kuřecím masem a restovanou zeleninou.",
  "61 kure pětivůní .": "Křupavé smažené kuře marinované ve směsi pěti asijských vůní.",
  "62 Kůřecí steak .": "Přírodní kuřecí steak se zeleninou a jemnou omáčkou.",
  "63 Sýr hranolky": "Smažený sýr podávaný s hranolkami a tatarskou omáčkou.",
  "64 kousky hranolky": "Křupavé kuřecí kousky/nugetky s hranolkami.",
  "65 bun cha nuong": "Tradiční hanojský pokrm s grilovaným vepřovým masem, rýžovými nudlemi, bylinkami a teplou sladkokyselou zálivkou.",
  "66 Kuřecí se žampiony": "Restované kuřecí plátky se žampiony, pórkem a jemnou omáčkou.",
  "67 Thaijská kachna": "Křupavá pečená kachna v thajské aromatické omáčce se zeleninou.",
  
  "Gyros": "Klasická porce šťavnatého gyros masa připravená v bistru.",
  "Phó bo (hovězí  polévka)": "Tradiční silná hovězí polévka Phở Bò s plochými rýžovými nudlemi a hovězím masem.",
  
  "Ca fe": "Pravá vietnamská překapávaná káva.",
  "Coca Cola 0,5l": "Osvěžující Coca-Cola v PET lahvi 0,5l.",
  "Crista 0,5ml": "Pramenitá voda Cristal 0,5l.",
  "Kofola 0,3l": "Originální točená nebo plech Kofola 0,33l.",
  "Kofola 0,5ml": "Originální Kofola v lahvi 0,5l.",
  "Pepsi 0,3 ml": "Pepsi Cola v plechu 0,33l.",
  "Pivo Krušovice 0,5l": "Krušovice Světlé pivo 10° (0,5l lahev).",
  "Pivo nealkoho": "Osvěžující nealkoholické pivo (0,5l lahev).",
  "Relak": "Ovocný džus Relax.",
  "Vinut mango": "Vietnamský ovocný nápoj Vinut s pravou mangovou šťávou.",
  "Zon limetka 0,5l": "Tradiční česká limonáda ZON s příchutí limetky 0,5l.",
  
  "Hranolky samostatně": "Porce křupavých smažených bramborových hranolek.",
  "Nudle samostatně": "Porce smažených asijských nudlí se zeleninou.",
  "Rýže samostatně": "Porce voňavé jasmínové rýže.",
  
  "Fodora": "Dárkový poukaz / odnosný obal"
};

const allCategories = [];
const allDishes = [];

for (let i = 1; i < categoriesRaw.length; i++) {
  const catBlock = categoriesRaw[i];
  const titleMatch = catBlock.match(/<span class="title">([^<]+)<\/span>/i);
  const catTitle = titleMatch ? decodeHtml(titleMatch[1].trim()) : "Unknown";
  const catConfig = catMap[catTitle] || { id: "other", nameCs: catTitle, nameEn: catTitle, descCs: "", descEn: "" };
  
  allCategories.push(catConfig);
  
  const itemBlocks = catBlock.split(/<div class="sm-detail-record/i);
  for (let j = 1; j < itemBlocks.length; j++) {
    const itm = itemBlocks[j];
    const nameMatch = itm.match(/<span class="sm-det-name-in gds-nme">([^<]+)<\/span>/i);
    const rawName = nameMatch ? decodeHtml(nameMatch[1].trim()) : "";
    
    // Price
    const priceMatch = itm.match(/data-price="([^"]+)"/i) || itm.match(/<span class="price[^"]*">([\d\s,]+)/i);
    const price = priceMatch ? parseInt(priceMatch[1].replace(",", "").replace(/\s/g, "")) : 0;
    
    // Check code in name
    let code = undefined;
    const codeMatch = rawName.match(/^(\d{1,2})[\.:\s]+(.*)$/);
    if (codeMatch) {
      code = codeMatch[1].padStart(2, "0");
    }
    
    const enName = enTranslations[rawName] || rawName;
    const csDesc = czechDescriptions[rawName] || "";
    const enDesc = csDesc ? csDesc : "";
    
    // Determine flags
    const isSpicy = /pikant|thajsk|chilli|kung|hue/i.test(rawName);
    const isVeggie = /tofu|salat|zelenin/i.test(rawName);
    const isPopular = ["01", "21", "22", "24", "27", "54", "58"].includes(code || "") || rawName.includes("Gyros") || rawName.includes("Phó bo");

    allDishes.push({
      id: `dish-${catConfig.id}-${j}`,
      category: catConfig.id,
      code: code,
      nameCs: rawName,
      nameEn: enName,
      descriptionCs: csDesc,
      descriptionEn: enDesc,
      price: price,
      spicy: isSpicy,
      vegetarian: isVeggie,
      popular: isPopular,
      orderUrl: "https://czxoxjz.ikelp.com/rozvoz"
    });
  }
}

// Generate the TypeScript file
const tsContent = `// Exact live menu data directly synchronized from iKelp Rozvoz (https://czxoxjz.ikelp.com/rozvoz)
export interface Dish {
  id: string;
  category: "starters" | "soups" | "mains" | "retro" | "drinks" | "sides" | "shop";
  code?: string;
  nameCs: string;
  nameEn: string;
  descriptionCs: string;
  descriptionEn: string;
  price: number;
  spicy?: boolean;
  vegetarian?: boolean;
  popular?: boolean;
  orderUrl?: string;
}

export interface Category {
  id: "all" | "starters" | "soups" | "mains" | "retro" | "drinks" | "sides" | "shop";
  nameCs: string;
  nameEn: string;
  descCs: string;
  descEn: string;
}

export const MENU_CATEGORIES: Category[] = [
  { id: "all", nameCs: "Celé menu", nameEn: "Full Menu", descCs: "Kompletní nabídka rozvozu a bistra", descEn: "Complete delivery & bistro menu" },
  { id: "starters", nameCs: "Předkrmy", nameEn: "Starters & Appetizers", descCs: "Tradiční asijské předkrmy a čerstvé/křupavé závitky (6 položek)", descEn: "Traditional Asian starters and rolls (6 items)" },
  { id: "soups", nameCs: "Polévky", nameEn: "Soups", descCs: "Tradiční asijské polévky a vývary (5 položek)", descEn: "Traditional Asian soups and broths (5 items)" },
  { id: "mains", nameCs: "Hlavní jídla", nameEn: "Main Dishes", descCs: "Autentická asijská jídla – kung pao, pho, pad thai, bun bo, udon a rýže (64 položek)", descEn: "Authentic Asian main courses – wok, pho, pad thai, noodles and rice (64 items)" },
  { id: "retro", nameCs: "Bistro retro", nameEn: "Bistro Retro", descCs: "Oblíbené bistro stálice v retro nabídce (2 položky: Gyros a Phó bo)", descEn: "Classic bistro favorites (2 items: Gyros & Pho bo)" },
  { id: "drinks", nameCs: "Nápoje", nameEn: "Drinks & Beverages", descCs: "Nealko nápoje, vietnamská káva a pivo (11 položek)", descEn: "Soft drinks, Vietnamese coffee and beer (11 items)" },
  { id: "sides", nameCs: "Přílohy", nameEn: "Sides & Extras", descCs: "Samostatné přílohy k jídlům (3 položky)", descEn: "Side dishes and extras (3 items)" },
  { id: "shop", nameCs: "Nubistro Shop", nameEn: "Nu Bistro Shop", descCs: "Dárkové poukazy a balení (5 položek)", descEn: "Vouchers and packaging (5 items)" }
];

export const DISHES: Dish[] = ${JSON.stringify(allDishes, null, 2)};
`;

fs.writeFileSync("src/data/menuData.ts", tsContent);
console.log("Successfully generated src/data/menuData.ts with", allDishes.length, "dishes across", allCategories.length, "categories!");

function getCardCategory(name) {
  if (!name) return "Other";
  const upperName = name.toUpperCase();

  if (upperName.includes("COIN")) return "Coin";
  if (upperName.includes("VMAX")) return "VMAX";
  if (upperName.includes("VSTAR")) return "VSTAR";
  if (upperName.includes("EX")) return "EX";
  if (upperName.includes("GX")) return "GX";
  if (upperName.includes("BREAK")) return "BREAK";
  if (upperName.includes("-V") || upperName.endsWith(" V") || upperName.includes(" V ")) return "V";

  return "Other";
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const rawPokemons = [
  // Scarlet & Violet: 151
  { Name: "Bulbasaur", SerialNumber: "166/165", Set: "Scarlet & Violet: 151", Textured: "No", Price1: "R$ 480.00", Price2: "R$ 900.00", Price3: "-", Image: "Assets/imgs/Bulbasaur.jpg" },
  { Name: "Ivysaur", SerialNumber: "167/165", Set: "Scarlet & Violet: 151", Textured: "No", Price1: "R$ 374.39", Price2: "R$ 2199.00", Price3: "-", Image: "Assets/imgs/Ivysaur.jpg" },
  { Name: "Venusaur Ex", SerialNumber: "198/165", Set: "Scarlet & Violet: 151", Textured: "No", Price1: "R$ 700.00", Price2: "R$ 1200.21", Price3: "R$ 1850.00", Image: "Assets/imgs/VenusaurEx.jpg" },
  { Name: "Charmander", SerialNumber: "168/165", Set: "Scarlet & Violet: 151", Textured: "No", Price1: "R$ 319.90", Price2: "R$ 559.45", Price3: "R$ 1499.00", Image: "Assets/imgs/Charmander.jpg" },
  { Name: "Charmeleon", SerialNumber: "169/165", Set: "Scarlet & Violet: 151", Textured: "No", Price1: "R$ 240.00", Price2: "R$ 646.53", Price3: "R$ 1500.00", Image: "Assets/imgs/Charmeleon.jpg" },
  { Name: "Charizard Ex", SerialNumber: "199/165", Set: "Scarlet & Violet: 151", Textured: "No", Price1: "R$ 1400.00", Price2: "R$ 3130.76", Price3: "R$ 8999.90", Image: "Assets/imgs/CharizardEx.jpg" },
  { Name: "Squirtle", SerialNumber: "170/165", Set: "Scarlet & Violet: 151", Textured: "No", Price1: "R$ 140.00", Price2: "R$ 417.38", Price3: "R$ 799.00", Image: "Assets/imgs/Squirtle.jpg" },
  { Name: "Wartortle", SerialNumber: "171/165", Set: "Scarlet & Violet: 151", Textured: "No", Price1: "R$ 324.90", Price2: "R$ 570.56", Price3: "R$ 699.90", Image: "Assets/imgs/Wartortle.jpg" },
  { Name: "Blastoise Ex", SerialNumber: "200/165", Set: "Scarlet & Violet: 151", Textured: "No", Price1: "R$ 699.80", Price2: "R$ 1102.14", Price3: "R$ 1999.00", Image: "Assets/imgs/BlastoiseEx.jpg" },

  // Prismatic Evolutions
  { Name: "Eevee Ex", SerialNumber: "167/131", Set: "Prismatic Evolutions", Textured: "No", Price1: "R$ 339.99", Price2: "R$ 622.31", Price3: "R$ 899.90", Image: "Assets/imgs/EeveeEx.jpg" },
  { Name: "Vaporeon Ex", SerialNumber: "149/131", Set: "Prismatic Evolutions", Textured: "No", Price1: "R$ 1299.90", Price2: "R$ 1899.90", Price3: "-", Image: "Assets/imgs/VaporeonEx.jpg" },
  { Name: "Jolteon Ex", SerialNumber: "153/131", Set: "Prismatic Evolutions", Textured: "No", Price1: "R$ 752.15", Price2: "R$ 2000.00", Price3: "-", Image: "Assets/imgs/JolteonEx.jpg" },
  { Name: "Flareon Ex", SerialNumber: "146/131", Set: "Prismatic Evolutions", Textured: "No", Price1: "R$ 1399.90", Price2: "R$ 1800.00", Price3: "-", Image: "Assets/imgs/FlareonEx.jpg" },
  { Name: "Espeon Ex", SerialNumber: "155/131", Set: "Prismatic Evolutions", Textured: "No", Price1: "R$ 875.00", Price2: "R$ 1143.26", Price3: "R$ 1999.90", Image: "Assets/imgs/EspeonEx.jpg" },
  { Name: "Umbreon Ex", SerialNumber: "161/131", Set: "Prismatic Evolutions", Textured: "No", Price1: "R$ 2400.00", Price2: "R$ 4575.35", Price3: "R$ 7999.99", Image: "Assets/imgs/UmbreonEx.jpg" },
  { Name: "Leafeon Ex", SerialNumber: "144/131", Set: "Prismatic Evolutions", Textured: "No", Price1: "R$ 849.00", Price2: "R$ 1235.89", Price3: "R$ 2300.00", Image: "Assets/imgs/LeafeonEx.jpg" },
  { Name: "Glaceon Ex", SerialNumber: "150/131", Set: "Prismatic Evolutions", Textured: "No", Price1: "R$ 595.00", Price2: "R$ 1231.98", Price3: "R$ 5000.00", Image: "Assets/imgs/GlaceonEx.jpg" },
  { Name: "Sylveon Ex", SerialNumber: "156/131", Set: "Prismatic Evolutions", Textured: "No", Price1: "R$ 1995.00", Price2: "R$ 2465.69", Price3: "R$ 3999.90", Image: "Assets/imgs/SylveonEx.jpg" },

  // Crown Zenith
  { Name: "Turtwig", SerialNumber: "GG31/GG70", Set: "Crown Zenith", Textured: "No", Price1: "R$ 65.00", Price2: "R$ 104.46", Price3: "R$ 129.99", Image: "Assets/imgs/Turtwig.jpg" },
  { Name: "Darkrai Vstar", SerialNumber: "GG50/GG70", Set: "Crown Zenith", Textured: "No", Price1: "R$ 434.90", Price2: "R$ 564.24", Price3: "R$ 650.00", Image: "Assets/imgs/DarkraiVstar.jpg" },

  // White Flare
  { Name: "Reshiram Ex", SerialNumber: "173/086", Set: "White Flare", Textured: "Yes", Price1: "R$ 1150.00", Price2: "R$ 1384.97", Price3: "R$ 1800.00", Image: "Assets/imgs/ReshiramEx.jpg" },
  { Name: "Meloetta Ex", SerialNumber: "167/086", Set: "White Flare", Textured: "No", Price1: "R$ 244.68", Price2: "R$ 399.90", Price3: "-", Image: "Assets/imgs/MeloettaEx.jpg" },
  { Name: "Kyurem Ex", SerialNumber: "157/086", Set: "White Flare", Textured: "Yes", Price1: "R$ 142.90", Price2: "-", Price3: "-", Image: "Assets/imgs/KyuremEx.jpg" },
  { Name: "Emboar", SerialNumber: "98/086", Set: "White Flare", Textured: "No", Price1: "R$ 120.00", Price2: "R$ 249.00", Price3: "-", Image: "Assets/imgs/Emboar.jpg" },
  { Name: "Samurott", SerialNumber: "107/086", Set: "White Flare", Textured: "No", Price1: "R$ 229.90", Price2: "-", Price3: "-", Image: "Assets/imgs/Samurott.jpg" },

  // Black Flare
  { Name: "Victini", SerialNumber: "172a/086", Set: "Black Flare", Textured: "Yes", Price1: "R$ 1450.00", Price2: "R$ 1769.62", Price3: "R$ 3499.90", Image: "Assets/imgs/Victini.jpg" },
  { Name: "Zekrom Ex", SerialNumber: "172b/086", Set: "Black Flare", Textured: "Yes", Price1: "R$ 1343.00", Price2: "R$ 1893.93", Price3: "R$ 5000.00", Image: "Assets/imgs/ZekromEx.jpg" },
  { Name: "Serperior Ex", SerialNumber: "164/086", Set: "Black Flare", Textured: "No", Price1: "R$ 293.14", Price2: "R$ 499.99", Price3: "-", Image: "Assets/imgs/SerperiorEx.jpg" },

  // Mega Evolution
  { Name: "Shuckle", SerialNumber: "136/132", Set: "Mega Evolution", Textured: "No", Price1: "R$ 124.90", Price2: "-", Price3: "-", Image: "Assets/imgs/Shuckle.jpg" },
  { Name: "Vulpix", SerialNumber: "138/132", Set: "Mega Evolution", Textured: "No", Price1: "R$ 147.40", Price2: "R$ 154.90", Price3: "R$ 155.00", Image: "Assets/imgs/Vulpix.jpg" },
  { Name: "Mega Clefable Ex", SerialNumber: "031/088", Set: "Mega Evolution", Textured: "Yes", Price1: "R$ 20.00", Price2: "R$ 48.00", Price3: "-", Image: "Assets/imgs/MegaClefableEx.jpg" },
  { Name: "Dedenne", SerialNumber: "093/088", Set: "Mega Evolution", Textured: "No", Price1: "R$ 38.11", Price2: "R$ 90.00", Price3: "-", Image: "Assets/imgs/Dedenne.jpg" },
  { Name: "Mega Charizard X Ex", SerialNumber: "29/∞", Set: "Mega Evolution", Textured: "Yes", Price1: "R$ 44.17", Price2: "R$ 100.00", Price3: "-", Image: "Assets/imgs/MegaCharizardXEx.jpg" },

  // Evolving Skies
  { Name: "Rayquaza V", SerialNumber: "110/203", Set: "Evolving Skies", Textured: "No", Price1: "R$ 20.00", Price2: "-", Price3: "-", Image: "Assets/imgs/RayquazaV.jpg" },
  { Name: "Umbreon V", SerialNumber: "094/203", Set: "Evolving Skies", Textured: "No", Price1: "R$ 33.90", Price2: "R$ 99.90", Price3: "-", Image: "Assets/imgs/UmbreonV.jpg" },
  { Name: "Rayquaza Vmax", SerialNumber: "111/203", Set: "Evolving Skies", Textured: "Yes", Price1: "R$ 51.95", Price2: "R$ 93.74", Price3: "R$ 500.00", Image: "Assets/imgs/RayquazaVmax.jpg" },
  { Name: "Umbreon Vmax", SerialNumber: "095/203", Set: "Evolving Skies", Textured: "Yes", Price1: "R$ 179.72", Price2: "R$ 329.90", Price3: "-", Image: "Assets/imgs/UmbreonVmax.jpg" },
  { Name: "Leafeon Vmax", SerialNumber: "205/203", Set: "Evolving Skies", Textured: "No", Price1: "R$ 1899.90", Price2: "R$ 3133.16", Price3: "R$ 8900.00", Image: "Assets/imgs/LeafeonVmax.jpg" },
  { Name: "Umbreon VMAX Alt Art", SerialNumber: "215/203", Set: "Evolving Skies", Textured: "Yes", Price1: "R$ 11640.00", Price2: "R$ 17999.95", Price3: "-", Image: "Assets/imgs/Moonbreon.jpg" },

  // Fusion Strike
  { Name: "Mew V", SerialNumber: "113/264", Set: "Fusion Strike", Textured: "No", Price1: "R$ 75.00", Price2: "-", Price3: "-", Image: "Assets/imgs/MewV.jpg" },
  { Name: "Gengar V", SerialNumber: "156/264", Set: "Fusion Strike", Textured: "No", Price1: "R$ 120.00", Price2: "-", Price3: "-", Image: "Assets/imgs/GengarV.jpg" },
  { Name: "Mew Vmax", SerialNumber: "114/264", Set: "Fusion Strike", Textured: "Yes", Price1: "R$ 67.84", Price2: "R$ 189.50", Price3: "-", Image: "Assets/imgs/MewVmax.jpg" },

  // Brilliant Stars
  { Name: "Shaymin Vstar", SerialNumber: "14/172", Set: "Brilliant Stars", Textured: "No", Price1: "R$ 17.35", Price2: "R$ 25.00", Price3: "-", Image: "Assets/imgs/ShayminVstar.jpg" },
  { Name: "Shaymin Vstar Rainbow", SerialNumber: "173/172", Set: "Brilliant Stars", Textured: "No", Price1: "R$ 30.97", Price2: "R$ 35.00", Price3: "-", Image: "Assets/imgs/ShayminVstarRWB.jpg" },
  { Name: "Arceus Vstar", SerialNumber: "123/172", Set: "Brilliant Stars", Textured: "No", Price1: "R$ 46.20", Price2: "R$ 118.89", Price3: "-", Image: "Assets/imgs/ArceusVstar.jpg" },
  { Name: "Arceus Vstar Golden", SerialNumber: "184/172", Set: "Brilliant Stars", Textured: "Yes", Price1: "R$ 118.63", Price2: "R$ 177.65", Price3: "-", Image: "Assets/imgs/ArceusVstarGolden.jpg" },
  { Name: "Arceus Vstar Rainbow", SerialNumber: "176/172", Set: "Brilliant Stars", Textured: "No", Price1: "R$ 99.90", Price2: "R$ 117.18", Price3: "R$ 151.41", Image: "Assets/imgs/ArceusVstarRWB.jpg" },
  { Name: "Mimikyu V", SerialNumber: "068/172", Set: "Brilliant Stars", Textured: "No", Price1: "R$ 103.18", Price2: "R$ 119.50", Price3: "-", Image: "Assets/imgs/MimikyuV.jpg" },
  { Name: "Aggron Vmax", SerialNumber: "97/172", Set: "Brilliant Stars", Textured: "Yes", Price1: "R$ 22.48", Price2: "R$ 24.99", Price3: "-", Image: "Assets/imgs/AggronVmax.jpg" },

  // Lost Origin
  { Name: "Giratina Vstar", SerialNumber: "131/196", Set: "Lost Origin", Textured: "No", Price1: "R$ 74.85", Price2: "-", Price3: "-", Image: "Assets/imgs/GiratinaVstar.jpg" },
  { Name: "Aerodactyl Vstar", SerialNumber: "093/196", Set: "Lost Origin", Textured: "No", Price1: "R$ 29.50", Price2: "-", Price3: "-", Image: "Assets/imgs/AerodactyVstar.jpg" },
  { Name: "Aerodactyl Vstar Rainbow", SerialNumber: "199/196", Set: "Lost Origin", Textured: "No", Price1: "R$ 61.90", Price2: "R$ 99.99", Price3: "-", Image: "Assets/imgs/AerodactyVstarRWB.jpg" },
  { Name: "Giratina V Alt Art", SerialNumber: "186/196", Set: "Lost Origin", Textured: "Yes", Price1: "R$ 850.00", Price2: "R$ 2189.29", Price3: "R$ 4999.90", Image: "Assets/imgs/GiratinaVAlt.jpg" },

  // Chilling Reign
  { Name: "Celebi V", SerialNumber: "007/198", Set: "Chilling Reign", Textured: "No", Price1: "R$ 19.99", Price2: "-", Price3: "-", Image: "Assets/imgs/CelebiV.jpg" },
  { Name: "Galarian Moltres V", SerialNumber: "097/198", Set: "Chilling Reign", Textured: "No", Price1: "R$ 25.64", Price2: "R$ 55.00", Price3: "-", Image: "Assets/imgs/GalarianMoltresV.jpg" },

  // Vivid Voltage
  { Name: "Pikachu Vmax", SerialNumber: "44/185", Set: "Vivid Voltage", Textured: "Yes", Price1: "R$ 499.00", Price2: "-", Price3: "-", Image: "Assets/imgs/PikachuVmax.jpg" },
  { Name: "Pikachu Vmax Rainbow", SerialNumber: "188/185", Set: "Vivid Voltage", Textured: "Yes", Price1: "R$ 1166.22", Price2: "R$ 1600.00", Price3: "-", Image: "Assets/imgs/PikachuVmaxRWB.jpg" },
  { Name: "Aegislash Vmax", SerialNumber: "127/185", Set: "Vivid Voltage", Textured: "Yes", Price1: "R$ 30.00", Price2: "-", Price3: "-", Image: "Assets/imgs/AegislashVmax.jpg" },
  { Name: "Aegislash Vmax Rainbow", SerialNumber: "190/185", Set: "Vivid Voltage", Textured: "Yes", Price1: "R$ 59.99", Price2: "-", Price3: "-", Image: "Assets/imgs/AegislashVmaxRWB.jpg" },

  // Astral Radiance
  { Name: "Origin-Forme Palkia Vstar", SerialNumber: "040/189", Set: "Astral Radiance", Textured: "No", Price1: "R$ 40.00", Price2: "-", Price3: "-", Image: "Assets/imgs/OriginFormePalkiaVstar.jpg" },
  { Name: "Hisuian Typhlosion Vstar", SerialNumber: "054/189", Set: "Astral Radiance", Textured: "No", Price1: "R$ 20.98", Price2: "R$ 25.90", Price3: "-", Image: "Assets/imgs/HisuianTyphlosionVstar.jpg" },

  // Darkness Ablaze
  { Name: "Salamence Vmax", SerialNumber: "144/189", Set: "Darkness Ablaze", Textured: "Yes", Price1: "R$ 45.00", Price2: "-", Price3: "-", Image: "Assets/imgs/SalamenceVmax.jpg" },
  { Name: "Crobat V", SerialNumber: "104/189", Set: "Darkness Ablaze", Textured: "No", Price1: "R$ 15.00", Price2: "-", Price3: "-", Image: "Assets/imgs/CrobatV.jpg" },
  { Name: "Charizard Vmax", SerialNumber: "20/189", Set: "Darkness Ablaze", Textured: "Yes", Price1: "R$ 221.02", Price2: "R$ 349.50", Price3: "-", Image: "Assets/imgs/CharizardVmax.jpg" },
  { Name: "Eternatus Vmax", SerialNumber: "117/189", Set: "Darkness Ablaze", Textured: "Yes", Price1: "R$ 49.99", Price2: "R$ 51.26", Price3: "-", Image: "Assets/imgs/EternatusVmax.jpg" },

  // Rebel Clash
  { Name: "Malamar Vmax", SerialNumber: "198/192", Set: "Rebel Clash", Textured: "Yes", Price1: "R$ 59.89", Price2: "R$ 149.90", Price3: "-", Image: "Assets/imgs/MalamarVmax.jpg" },
  { Name: "Milotic V", SerialNumber: "043/192", Set: "Rebel Clash", Textured: "No", Price1: "R$ 29.99", Price2: "-", Price3: "-", Image: "Assets/imgs/MiloticV.jpg" },
  { Name: "Rillaboom VMAX", SerialNumber: "018/192", Set: "Rebel Clash", Textured: "No", Price1: "R$ 0.00", Price2: "-", Price3: "-", Image: "Assets/imgs/RillaboomVmax.jpg" },
  { Name: "Inteleon VMAX", SerialNumber: "050/192", Set: "Rebel Clash", Textured: "No", Price1: "R$ 0.00", Price2: "-", Price3: "-", Image: "Assets/imgs/InteleonVmax.jpg" },

  // Champions Path
  { Name: "Charizard Vmax Rainbow", SerialNumber: "74/73", Set: "Champions Path", Textured: "Yes", Price1: "R$ 1999.90", Price2: "R$ 3549.98", Price3: "R$ 9500.00", Image: "Assets/imgs/CharizardVmaxRWB.jpg" },
  { Name: "Lucario V", SerialNumber: "027/073", Set: "Champions Path", Textured: "No", Price1: "R$ 29.90", Price2: "-", Price3: "-", Image: "Assets/imgs/LucarioV.jpg" },
  { Name: "Alcremie V", SerialNumber: "022/073", Set: "Champions Path", Textured: "No", Price1: "R$ 9.90", Price2: "-", Price3: "-", Image: "Assets/imgs/AlcremieV.jpg" },
  { Name: "Alcremie Vmax", SerialNumber: "023/073", Set: "Champions Path", Textured: "Yes", Price1: "R$ 79.99", Price2: "-", Price3: "-", Image: "Assets/imgs/AlcremieVmax.jpg" },
  { Name: "Charizard V", SerialNumber: "079/073", Set: "Champions Path", Textured: "Yes", Price1: "R$ 1386.91", Price2: "R$ 2500.00", Price3: "-", Image: "Assets/imgs/CharizardV.jpg" },
  { Name: "Cursola V", SerialNumber: "071/073", Set: "Champions Path", Textured: "No", Price1: "R$ 42.31", Price2: "-", Price3: "-", Image: "Assets/imgs/CursolaV.jpg" },
  { Name: "Drednaw V", SerialNumber: "069/073", Set: "Champions Path", Textured: "No", Price1: "R$ 29.90", Price2: "-", Price3: "-", Image: "Assets/imgs/DrednawV.jpg" },
  { Name: "Drednaw Vmax Rainbow", SerialNumber: "075/073", Set: "Champions Path", Textured: "No", Price1: "R$ 89.50", Price2: "-", Price3: "-", Image: "Assets/imgs/DrednawVmaxRWB.jpg" },
  { Name: "Drednaw Vmax", SerialNumber: "015/073", Set: "Champions Path", Textured: "No", Price1: "R$ 29.99", Price2: "-", Price3: "-", Image: "Assets/imgs/DrednawVmax.jpg" },
  { Name: "Incineroar V", SerialNumber: "08/073", Set: "Champions Path", Textured: "No", Price1: "R$ 35.00", Price2: "-", Price3: "-", Image: "Assets/imgs/InceneroarV.jpg" },

  // Shining Fates
  { Name: "Cinderace VMAX", SerialNumber: "019/072", Set: "Shining Fates", Textured: "No", Price1: "R$ 75.89", Price2: "-", Price3: "-", Image: "Assets/imgs/CinderaceVmax.jpg" },
  { Name: "Centiskorch V", SerialNumber: "SV108/SV122", Set: "Shining Fates", Textured: "No", Price1: "R$ 60.00", Price2: "-", Price3: "-", Image: "Assets/imgs/CentiskorchV.jpg" },
  { Name: "Centiskorch Vmax", SerialNumber: "SV109/SV122", Set: "Shining Fates", Textured: "No", Price1: "R$ 134.90", Price2: "-", Price3: "-", Image: "Assets/imgs/CentiskorchVmax.jpg" },
  { Name: "Cramorant VMAX", SerialNumber: "055/072", Set: "Shining Fates", Textured: "No", Price1: "R$ 24.25", Price2: "-", Price3: "-", Image: "Assets/imgs/CramorantVmax.jpg" },
  { Name: "Ditto VMAX", SerialNumber: "051/072", Set: "Shining Fates", Textured: "No", Price1: "R$ 37.00", Price2: "-", Price3: "-", Image: "Assets/imgs/DittoVmax.jpg" },

  // Celebrations
  { Name: "Zacian V", SerialNumber: "016/025", Set: "Celebrations", Textured: "No", Price1: "R$ 44.90", Price2: "-", Price3: "-", Image: "Assets/imgs/ZacianV.jpg" },

  // Pokémon GO
  { Name: "Dragonite V", SerialNumber: "049/078", Set: "Pokémon GO", Textured: "No", Price1: "R$ 77.48", Price2: "R$ 120.00", Price3: "-", Image: "Assets/imgs/DragoniteV.jpg" },

  // Sword & Shield Base Set
  { Name: "Morpeko V", SerialNumber: "079/202", Set: "Sword & Shield Base Set", Textured: "No", Price1: "R$ 9.50", Price2: "-", Price3: "-", Image: "Assets/imgs/MorpekoV.jpg" },

  // SWSH Promos
  { Name: "Vaporeon V", SerialNumber: "SWSH181/71", Set: "SWSH Promos", Textured: "Yes", Price1: "R$ 226.17", Price2: "R$ 800.00", Price3: "-", Image: "Assets/imgs/VaporeonV.jpg" },

  // Sun & Moon Base Set
  { Name: "Lunala Gx", SerialNumber: "141/149", Set: "Sun & Moon Base Set", Textured: "Yes", Price1: "R$ 59.99", Price2: "-", Price3: "-", Image: "Assets/imgs/LunalaGx.jpg" },
  { Name: "Solgaleo Gx", SerialNumber: "143/149", Set: "Sun & Moon Base Set", Textured: "Yes", Price1: "R$ 34.60", Price2: "R$ 49.99", Price3: "-", Image: "Assets/imgs/SolgaleoGx.jpg" },
  { Name: "Espeon Gx", SerialNumber: "61/149", Set: "Sun & Moon Base Set", Textured: "No", Price1: "R$ 74.90", Price2: "-", Price3: "-", Image: "Assets/imgs/EspeonGx.jpg" },
  { Name: "Umbreon Gx", SerialNumber: "80/149", Set: "Sun & Moon Base Set", Textured: "No", Price1: "R$ 20.00", Price2: "R$ 53.57", Price3: "R$ 80.00", Image: "Assets/imgs/UmbreonGx.jpg" },

  // Burning Shadows
  { Name: "Charizard Gx", SerialNumber: "20/147", Set: "Burning Shadows", Textured: "No", Price1: "R$ 39.90", Price2: "R$ 68.72", Price3: "R$ 109.50", Image: "Assets/imgs/CharizardGx.jpg" },
  { Name: "Gardevoir Gx", SerialNumber: "93/147", Set: "Burning Shadows", Textured: "No", Price1: "R$ 45.24", Price2: "R$ 151.91", Price3: "-", Image: "Assets/imgs/GardevoirGx.jpg" },

  // Guardians Rising
  { Name: "Sylveon Gx", SerialNumber: "92/145", Set: "Guardians Rising", Textured: "No", Price1: "R$ 86.29", Price2: "R$ 88.00", Price3: "R$ 284.91", Image: "Assets/imgs/SylveonGx.jpg" },
  { Name: "Decidueye Gx Rainbow", SerialNumber: "146/145", Set: "Guardians Rising", Textured: "Yes", Price1: "R$ 95.05", Price2: "R$ 199.95", Price3: "-", Image: "Assets/imgs/DecidueyeGx.jpg" },
  { Name: "Drampa Gx Rainbow", SerialNumber: "160/145", Set: "Guardians Rising", Textured: "Yes", Price1: "R$ 39.00", Price2: "-", Price3: "-", Image: "Assets/imgs/DrampaGxRWB.jpg" },
  { Name: "Drampa Gx", SerialNumber: "142/145", Set: "Guardians Rising", Textured: "Yes", Price1: "R$ 15.37", Price2: "R$ 22.99", Price3: "-", Image: "Assets/imgs/DrampaGx.jpg" },
  { Name: "Hau", SerialNumber: "144/145", Set: "Guardians Rising", Textured: "No", Price1: "R$ 68.47", Price2: "R$ 99.99", Price3: "-", Image: "Assets/imgs/Hau.jpg" },
  { Name: "Inceneroar Gx Rainbow", SerialNumber: "147/145", Set: "Guardians Rising", Textured: "Yes", Price1: "R$ 149.95", Price2: "-", Price3: "-", Image: "Assets/imgs/InceneroarGx.jpg" },
  { Name: "Kommo-o Gx Rainbow", SerialNumber: "159/145", Set: "Guardians Rising", Textured: "Yes", Price1: "R$ 99.95", Price2: "-", Price3: "-", Image: "Assets/imgs/Kommo-oGxRWB.jpg" },
  { Name: "Kommo-o Gx", SerialNumber: "141/145", Set: "Guardians Rising", Textured: "Yes", Price1: "R$ 22.99", Price2: "-", Price3: "-", Image: "Assets/imgs/Kommo-oGx.jpg" },
  { Name: "Kommo-o Gx", SerialNumber: "100/145", Set: "Guardians Rising", Textured: "No", Price1: "R$ 10.90", Price2: "R$ 19.50", Price3: "-", Image: "Assets/imgs/Kommo-oGx2.jpg" },

  // Ultra Prism
  { Name: "Glaceon Gx", SerialNumber: "39/156", Set: "Ultra Prism", Textured: "No", Price1: "R$ 58.77", Price2: "R$ 101.00", Price3: "-", Image: "Assets/imgs/GlaceonGx.jpg" },
  { Name: "Celesteela Gx", SerialNumber: "144/156", Set: "Ultra Prism", Textured: "Yes", Price1: "R$ 69.99", Price2: "-", Price3: "-", Image: "Assets/imgs/CelesteelaGx.jpg" },
  { Name: "Celesteela Gx Rainbow", SerialNumber: "162/156", Set: "Ultra Prism", Textured: "Yes", Price1: "R$ 94.32", Price2: "R$ 159.90", Price3: "-", Image: "Assets/imgs/CelesteelaGxRWB.jpg" },
  { Name: "Dialga Gx", SerialNumber: "146/156", Set: "Ultra Prism", Textured: "Yes", Price1: "R$ 129.00", Price2: "-", Price3: "-", Image: "Assets/imgs/DialgaGx.jpg" },
  { Name: "Dialga Gx Rainbow", SerialNumber: "164/156", Set: "Ultra Prism", Textured: "Yes", Price1: "R$ 269.50", Price2: "-", Price3: "-", Image: "Assets/imgs/DialgaGxRWB.jpg" },
  { Name: "Leafeon Gx", SerialNumber: "139/156", Set: "Ultra Prism", Textured: "Yes", Price1: "R$ 133.98", Price2: "R$ 199.00", Price3: "-", Image: "Assets/imgs/LeafeonGx.jpg" },
  { Name: "Leafeon Gx Rainbow", SerialNumber: "157/156", Set: "Ultra Prism", Textured: "Yes", Price1: "R$ 109.90", Price2: "R$ 126.29", Price3: "R$ 369.95", Image: "Assets/imgs/LeafeonGxRWB.jpg" },
  { Name: "Leafeon Gx", SerialNumber: "13/156", Set: "Ultra Prism", Textured: "No", Price1: "R$ 49.95", Price2: "-", Price3: "-", Image: "Assets/imgs/LeafeonGx2.jpg" },
  { Name: "Necrozma Gx", SerialNumber: "39/156", Set: "Ultra Prism", Textured: "No", Price1: "R$ 81.21", Price2: "R$ 159.90", Price3: "-", Image: "Assets/imgs/NecrozmaGx.jpg" },
  { Name: "Pheromosa Gx", SerialNumber: "143/156", Set: "Ultra Prism", Textured: "Yes", Price1: "R$ 188.31", Price2: "R$ 269.00", Price3: "-", Image: "Assets/imgs/PheromosaGx.jpg" },

  // Celestial Storm
  { Name: "Rayquaza Gx", SerialNumber: "177/168", Set: "Celestial Storm", Textured: "Yes", Price1: "R$ 280.00", Price2: "R$ 758.90", Price3: "R$ 1999.95", Image: "Assets/imgs/RayquazaGX.jpg" },
  { Name: "Blaziken Gx", SerialNumber: "153/168", Set: "Celestial Storm", Textured: "No", Price1: "R$ 199.95", Price2: "-", Price3: "-", Image: "Assets/imgs/BlazikenGX.jpg" },
  { Name: "Blaziken Gx Rainbow", SerialNumber: "170/168", Set: "Celestial Storm", Textured: "No", Price1: "R$ 121.59", Price2: "R$ 349.50", Price3: "-", Image: "Assets/imgs/BlazikenGXRWB.jpg" },
  { Name: "Electroide Gx", SerialNumber: "155/168", Set: "Celestial Storm", Textured: "No", Price1: "R$ 111.00", Price2: "-", Price3: "-", Image: "Assets/imgs/ElectrodeGx.jpg" },
  { Name: "Electroide Gx Rainbow", SerialNumber: "172/168", Set: "Celestial Storm", Textured: "No", Price1: "R$ 89.50", Price2: "-", Price3: "R$ -", Image: "Assets/imgs/ElectrodeGxRWB.jpg" },

  // Team Up
  { Name: "Pikachu & Zekrom Gx", SerialNumber: "33/181", Set: "Team Up", Textured: "No", Price1: "R$ 236.55", Price2: "R$ 263.90", Price3: "R$ 599.99", Image: "Assets/imgs/PikachuZekromGX.jpg" },

  // Unbroken Bonds
  { Name: "Dedenne Gx", SerialNumber: "57/214", Set: "Unbroken Bonds", Textured: "No", Price1: "R$ 35.00", Price2: "-", Price3: "-", Image: "Assets/imgs/DedenneGX.jpg" },

  // Unified Minds
  { Name: "Mewtwo & Mew Gx", SerialNumber: "71/236", Set: "Unified Minds", Textured: "No", Price1: "R$ 119.90", Price2: "R$ 239.94", Price3: "R$ 850.00", Image: "Assets/imgs/MewtwoMewGX.jpg" },
  { Name: "Mewtwo & Mew Gx Full Art", SerialNumber: "222/236", Set: "Unified Minds", Textured: "Yes", Price1: "R$ 636.51", Price2: "R$ 2900.00", Price3: "-", Image: "Assets/imgs/MewtwoMewGXFull.jpg" },

  // Shining Legends
  { Name: "Mewtwo Gx", SerialNumber: "78/73", Set: "Shining Legends", Textured: "Yes", Price1: "R$ 849.90", Price2: "R$ 2364.40", Price3: "R$ 4000.00", Image: "Assets/imgs/MewtwoGx.jpg" },

  // SM Promos
  { Name: "Tapu Bulu Gx", SerialNumber: "SM32/250", Set: "SM Promos", Textured: "No", Price1: "R$ 8.52", Price2: "R$ 18.00", Price3: "R$ 20.00", Image: "Assets/imgs/TabuBuluGX.jpg" },

  // Fates Collide
  { Name: "Lugia Break", SerialNumber: "79/124", Set: "Fates Collide", Textured: "No", Price1: "R$ 69.50", Price2: "-", Price3: "-", Image: "Assets/imgs/LugiaBreak.jpg" },

  // BREAKpoint
  { Name: "Luxray Break", SerialNumber: "47/122", Set: "BREAKpoint", Textured: "No", Price1: "R$ 40.00", Price2: "-", Price3: "-", Image: "Assets/imgs/LuxrayBreak.jpg" },

  // Evolutions
  { Name: "Starmie Break", SerialNumber: "32/108", Set: "Evolutions", Textured: "No", Price1: "R$ 59.99", Price2: "-", Price3: "-", Image: "Assets/imgs/StarmieBreak.jpg" },

  // XY Promos
  { Name: "Black Kyurem Ex", SerialNumber: "048/191", Set: "XY Promos", Textured: "No", Price1: "R$ 12.90", Price2: "R$ 16.80", Price3: "-", Image: "Assets/imgs/KyuremPretoEx.jpg" },
  { Name: "Greninja Break", SerialNumber: "01/24", Set: "XY Promos", Textured: "No", Price1: "R$ 94.90", Price2: "-", Price3: "-", Image: "Assets/imgs/GreninjaBreak.jpg" },
  { Name: "Ho-Oh Break", SerialNumber: "XY154/∞", Set: "XY Promos", Textured: "No", Price1: "R$ 199.50", Price2: "-", Price3: "-", Image: "Assets/imgs/HoohBreak.jpg" },
  { Name: "Crobat Break", SerialNumber: "XY181/∞", Set: "XY Promos", Textured: "No", Price1: "R$ 29.99", Price2: "-", Price3: "-", Image: "Assets/imgs/GreninjaBreak.jpg" },
  { Name: "Arcanine Break", SerialNumber: "XY180/∞", Set: "XY Promos", Textured: "No", Price1: "R$ 35.00", Price2: "-", Price3: "-", Image: "Assets/imgs/ArcanineBreak.jpg" },
  { Name: "Beheeyem Break", SerialNumber: "XY135/∞", Set: "XY Promos", Textured: "No", Price1: "R$ 29.99", Price2: "-", Price3: "-", Image: "Assets/imgs/BeheeyemBreak.jpg" },

  // Flashfire
  { Name: "M Charizard Ex Full Art", SerialNumber: "108/106", Set: "Flashfire", Textured: "Yes", Price1: "R$ 2290.00", Price2: "R$ 2890.00", Price3: "-", Image: "Assets/imgs/MCharizardEXFlashfire.png" },

  // SV Promos
  { Name: "Iono's Bellibolt Ex", SerialNumber: "194/∞", Set: "SV Promos", Textured: "Yes", Price1: "R$ 23.74", Price2: "R$ 39.50", Price3: "-", Image: "Assets/imgs/BelliboltEXdaKissera.jpg" },

  // Coins / Moedas
  { Name: "Silver Cetoddle Coin", SerialNumber: "-", Set: "Scarlet & Violet", Textured: "No", Price1: "R$ 27.27", Price2: "R$ 30.00", Price3: "-", Image: "Assets/cimgs/CetoddleCoin.jpg" },
  { Name: "Purple Rainbow Mewtwo Coin", SerialNumber: "-", Set: "Sword & Shield", Textured: "Yes", Price1: "R$ 29.75", Price2: "R$ 31.50", Price3: "-", Image: "Assets/cimgs/MewtwoCoin.jpg" },
  { Name: "Silver Rainbow Arceus Coin", SerialNumber: "-", Set: "Brilliant Stars", Textured: "Yes", Price1: "R$ 29.99", Price2: "-", Price3: "-", Image: "Assets/cimgs/ArceusCoin.jpg" },
  { Name: "Blue Blastoise Coin", SerialNumber: "-", Set: "Classic Collection", Textured: "No", Price1: "R$ 23.72", Price2: "R$ 30.00", Price3: "-", Image: "Assets/cimgs/BlueBlastoiseCoin.jpg" },
  { Name: "Silver Rainbow Dialga Coin", SerialNumber: "-", Set: "Astral Radiance", Textured: "Yes", Price1: "R$ 30.00", Price2: "-", Price3: "-", Image: "Assets/cimgs/DialgaCoin.jpg" },
  { Name: "Bronze Rainbow Kleavor Coin", SerialNumber: "-", Set: "Astral Radiance", Textured: "Yes", Price1: "R$ 29.99", Price2: "-", Price3: "-", Image: "Assets/cimgs/KleavorCoin.jpg" },
  { Name: "Pink Glitter Mew Coin", SerialNumber: "-", Set: "Fusion Strike", Textured: "Yes", Price1: "R$ 169.99", Price2: "-", Price3: "-", Image: "Assets/cimgs/MewCoin.jpg" },
  { Name: "Gold Venusaur Coin", SerialNumber: "-", Set: "Classic Collection", Textured: "No", Price1: "R$ 30.00", Price2: "-", Price3: "-", Image: "Assets/cimgs/VenusaurCoin1.jpg" },
  { Name: "Green Venusaur Coin", SerialNumber: "-", Set: "Classic Collection", Textured: "Yes", Price1: "R$ 27.38", Price2: "R$ 40.00", Price3: "-", Image: "Assets/cimgs/VenusaurCoin2.jpg" },
  { Name: "Silver Rainbow Palkia Coin", SerialNumber: "-", Set: "Astral Radiance", Textured: "No", Price1: "R$ 49.99", Price2: "-", Price3: "-", Image: "Assets/cimgs/PalkiaCoin.jpg" },
  { Name: "Golden Glitter Lycanroc Coin", SerialNumber: "-", Set: "Sun & Moon", Textured: "Yes", Price1: "R$ 19.99", Price2: "-", Price3: "-", Image: "Assets/cimgs/LycanrocCoin.jpg" },
  { Name: "Silver Smoking Mega Charizard Y Coin", SerialNumber: "-", Set: "XY Series", Textured: "Yes", Price1: "R$ 43.12", Price2: "R$ 59.99", Price3: "-", Image: "Assets/cimgs/MegaCharizardYCoin.jpg" },
  { Name: "Silver Confetti Mega Lucario Coin", SerialNumber: "-", Set: "XY Series", Textured: "Yes", Price1: "R$ 40.00", Price2: "R$ 42.50", Price3: "R$ 45.00", Image: "Assets/cimgs/MegaLucarioCoin.jpg" }
];

const pokemons = rawPokemons.map((item) => ({
  ...item,
  Category: getCardCategory(item.Name)
}));

shuffleArray(pokemons);

// { Name: "", SerialNumber: "0/0", Textured: "", Price1: "R$", Price2: "R$", Price3: "-", Image: "Assets/imgs/", Category: getCardCategory("") },
// { Name: "", SerialNumber: "-", Textured: "", Price1: "R$", Price2: "R$", Price3: "-", Image: "Assets/cimgs/", Category: getCardCategory("Coin") },
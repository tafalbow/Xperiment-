/**
 * ============================================================
 * GLOBAL TRADE TYCOON - BASIS DATA MULTI-SKALA & ILMU EKONOMI
 * Memuat node geografi bertingkat (Kota -> Antar-Kota -> Nasional ->
 * Regional ASEAN -> Global Dunia) dan parameter Teori Perdagangan Internasional.
 * ============================================================
 */

// Definisi Komoditas Rantai Pasok Global (Bahan Mentah -> Komponen -> Barang Jadi)
const TRADE_COMMODITIES = {
    // 1. Bahan Mentah & Energi (Raw Materials & Energy)
    NICKEL_ORE: {
        id: 'NICKEL_ORE',
        name: 'Bijih Nikel',
        icon: '🪨',
        category: 'raw',
        basePrice: 120,
        unit: 'Ton',
        desc: 'Mineral esensial untuk produksi baterai kendaraan listrik dan baja tahan karat.'
    },
    PALM_OIL_RAW: {
        id: 'PALM_OIL_RAW',
        name: 'Kelapa Sawit Mentah (CPO)',
        icon: '🌴',
        category: 'raw',
        basePrice: 85,
        unit: 'Ton',
        desc: 'Minyak nabati dengan produktivitas tertinggi untuk pangan dan biofuel.'
    },
    CRUDE_OIL: {
        id: 'CRUDE_OIL',
        name: 'Minyak Mentah',
        icon: '🛢️',
        category: 'raw',
        basePrice: 160,
        unit: 'Barel',
        desc: 'Emas hitam sumber energi global dan bahan baku petrokimia.'
    },
    IRON_ORE: {
        id: 'IRON_ORE',
        name: 'Bijih Besi',
        icon: '⛏️',
        category: 'raw',
        basePrice: 95,
        unit: 'Ton',
        desc: 'Bahan baku utama peleburan baja industri dan infrastruktur.'
    },
    SOYBEAN: {
        id: 'SOYBEAN',
        name: 'Kedelai & Pangan',
        icon: '🌱',
        category: 'raw',
        basePrice: 65,
        unit: 'Ton',
        desc: 'Komoditas pangan pokok untuk protein dan pakan ternak global.'
    },
    LITHIUM_RAW: {
        id: 'LITHIUM_RAW',
        name: 'Lithium Mentah',
        icon: '⚡',
        category: 'raw',
        basePrice: 280,
        unit: 'Ton',
        desc: 'Mineral putih langka pilar revolusi energi hijau dunia.'
    },

    // 2. Bahan Olahan & Komponen Antara (Intermediate Components)
    BATTERY_CELLS: {
        id: 'BATTERY_CELLS',
        name: 'Sel Baterai EV',
        icon: '🔋',
        category: 'intermediate',
        basePrice: 580,
        unit: 'Pack',
        recipe: { NICKEL_ORE: 2, LITHIUM_RAW: 1 },
        desc: 'Sel baterai lithium-ion nikel berdaya simpan tinggi.'
    },
    PETROCHEMICALS: {
        id: 'PETROCHEMICALS',
        name: 'Petrokimia & Polimer',
        icon: '🧪',
        category: 'intermediate',
        basePrice: 380,
        unit: 'Drum',
        recipe: { CRUDE_OIL: 2 },
        desc: 'Bahan plastik sintetis, serat tekstil, dan kimia industri.'
    },
    REFINED_STEEL: {
        id: 'REFINED_STEEL',
        name: 'Baja Berkualitas Tinggi',
        icon: '🏗️',
        category: 'intermediate',
        basePrice: 420,
        unit: 'Ton',
        recipe: { IRON_ORE: 3 },
        desc: 'Baja struktural untuk manufaktur otomotif dan gedung.'
    },
    MICROCHIPS: {
        id: 'MICROCHIPS',
        name: 'Mikrochip & Semikonduktor',
        icon: '💾',
        category: 'intermediate',
        basePrice: 950,
        unit: 'Wafer',
        desc: 'Otak komputasi untuk semua perangkat elektronik dan kecerdasan buatan.'
    },
    PRECISION_MOTORS: {
        id: 'PRECISION_MOTORS',
        name: 'Mesin Industri Presisi',
        icon: '⚙️',
        category: 'intermediate',
        basePrice: 820,
        unit: 'Unit',
        recipe: { REFINED_STEEL: 1, MICROCHIPS: 1 },
        desc: 'Penggerak mesin robotik dan otomotif canggih.'
    },

    // 3. Barang Jadi Bernilai Tinggi (Finished Goods)
    ELECTRIC_VEHICLES: {
        id: 'ELECTRIC_VEHICLES',
        name: 'Mobil Listrik (EV)',
        icon: '🚗',
        category: 'finished',
        basePrice: 2400,
        unit: 'Unit',
        recipe: { BATTERY_CELLS: 2, REFINED_STEEL: 1, PRECISION_MOTORS: 1 },
        desc: 'Kendaraan masa depan ramah lingkungan dengan permintaan global masif.'
    },
    SMARTPHONES: {
        id: 'SMARTPHONES',
        name: 'Ponsel Pintar & Gadget',
        icon: '📱',
        category: 'finished',
        basePrice: 1650,
        unit: 'Koli',
        recipe: { MICROCHIPS: 1, BATTERY_CELLS: 1, PETROCHEMICALS: 1 },
        desc: 'Perangkat telekomunikasi dan komputasi konsumen dunia.'
    },
    MEDICAL_INSTRUMENTS: {
        id: 'MEDICAL_INSTRUMENTS',
        name: 'Instrumen Medis & Farmasi',
        icon: '🏥',
        category: 'finished',
        basePrice: 3200,
        unit: 'Kit',
        recipe: { PETROCHEMICALS: 1, MICROCHIPS: 1 },
        desc: 'Peralatan kesehatan presisi berteknologi tinggi dengan margin tertinggi.'
    },
    AEROSPACE_PARTS: {
        id: 'AEROSPACE_PARTS',
        name: 'Komponen Pesawat Terbang',
        icon: '✈️',
        category: 'finished',
        basePrice: 4800,
        unit: 'Set',
        recipe: { REFINED_STEEL: 2, PRECISION_MOTORS: 2, MICROCHIPS: 2 },
        desc: 'Teknologi penerbangan bernilai tambah super tinggi.'
    }
};

// ============================================================
// HIERARKI PETA GEOGRAFI 5 SKALA BERDASARKAN LEVEL PERMAINAN
// ============================================================

const MULTI_SCALE_MAPS = {
    // 🏙️ SKALA 1: LEVEL 1 (Peta Kota Metropolis Sendiri)
    CITY: {
        id: 'CITY',
        title: 'Peta Kota Metropolis (Tingkat Lokal)',
        bgType: 'city_grid',
        nodes: {
            CITY_MARKET: {
                id: 'CITY_MARKET',
                name: 'Pasar Induk Kota Pusat',
                flag: '🏬',
                hubPort: 'Distrik Perdagangan Komersial',
                coords: { x: 500, y: 270 },
                advantages: [],
                deficits: ['PALM_OIL_RAW', 'SOYBEAN'],
                laborCostIndex: 0.60,
                tariffRate: 0.00,
                impact: { gdpContribution: 0, jobsCreated: 0, tradeSurplus: 0, localInflation: 0, taxPaid: 0, esgScore: 90 }
            },
            CITY_WAREHOUSE: {
                id: 'CITY_WAREHOUSE',
                name: 'Hub Pergudangan Barat',
                flag: '🏢',
                hubPort: 'Kompleks Silo & Logistik Barat',
                coords: { x: 250, y: 220 },
                advantages: ['PALM_OIL_RAW'],
                deficits: [],
                laborCostIndex: 0.55,
                tariffRate: 0.00,
                impact: { gdpContribution: 0, jobsCreated: 0, tradeSurplus: 0, localInflation: 0, taxPaid: 0, esgScore: 88 }
            },
            CITY_FARMS: {
                id: 'CITY_FARMS',
                name: 'Sentra Perkebunan Timur',
                flag: '🌾',
                hubPort: 'Pusat Pemasok Pertanian Timur',
                coords: { x: 760, y: 290 },
                advantages: ['PALM_OIL_RAW', 'SOYBEAN'],
                deficits: ['REFINED_STEEL'],
                laborCostIndex: 0.50,
                tariffRate: 0.00,
                impact: { gdpContribution: 0, jobsCreated: 0, tradeSurplus: 0, localInflation: 0, taxPaid: 0, esgScore: 95 }
            },
            CITY_PORT: {
                id: 'CITY_PORT',
                name: 'Dermaga Pesisir Utara',
                flag: '⚓',
                hubPort: 'Dermaga Kargo Pesisir',
                coords: { x: 520, y: 100 },
                advantages: ['NICKEL_ORE'],
                deficits: ['PETROCHEMICALS'],
                laborCostIndex: 0.65,
                tariffRate: 0.00,
                impact: { gdpContribution: 0, jobsCreated: 0, tradeSurplus: 0, localInflation: 0, taxPaid: 0, esgScore: 85 }
            },
            CITY_PLANT: {
                id: 'CITY_PLANT',
                name: 'Kawasan Industri Selatan',
                flag: '🏭',
                hubPort: 'Pusat Fabrikasi Industri',
                coords: { x: 480, y: 440 },
                advantages: ['REFINED_STEEL'],
                deficits: ['IRON_ORE', 'CRUDE_OIL'],
                laborCostIndex: 0.70,
                tariffRate: 0.00,
                impact: { gdpContribution: 0, jobsCreated: 0, tradeSurplus: 0, localInflation: 0, taxPaid: 0, esgScore: 82 }
            }
        }
    },

    // 🚚 SKALA 2: LEVEL 2 (Peta Koridor Darat Antar-Kota)
    INTERCITY: {
        id: 'INTERCITY',
        title: 'Peta Koridor Jalur Pantura (Antar-Kota)',
        bgType: 'island_corridor',
        nodes: {
            CITY_JAKARTA: {
                id: 'CITY_JAKARTA',
                name: 'Jakarta (Pusat Konsumen)',
                flag: '🏙️',
                hubPort: 'Tanjung Priok Logistics',
                coords: { x: 220, y: 260 },
                advantages: ['SMARTPHONES'],
                deficits: ['PALM_OIL_RAW', 'SOYBEAN', 'NICKEL_ORE'],
                laborCostIndex: 0.85,
                tariffRate: 0.00,
                impact: { gdpContribution: 0, jobsCreated: 0, tradeSurplus: 0, localInflation: 0, taxPaid: 0, esgScore: 82 }
            },
            CITY_BANDUNG: {
                id: 'CITY_BANDUNG',
                name: 'Bandung (Sentra Tekstil & Olahan)',
                flag: '🏭',
                hubPort: 'Gedebage Dry Port',
                coords: { x: 290, y: 350 },
                advantages: ['PETROCHEMICALS'],
                deficits: ['PALM_OIL_RAW'],
                laborCostIndex: 0.65,
                tariffRate: 0.00,
                impact: { gdpContribution: 0, jobsCreated: 0, tradeSurplus: 0, localInflation: 0, taxPaid: 0, esgScore: 88 }
            },
            CITY_SEMARANG: {
                id: 'CITY_SEMARANG',
                name: 'Semarang (Hub Jawa Tengah)',
                flag: '📦',
                hubPort: 'Tanjung Emas Port',
                coords: { x: 520, y: 270 },
                advantages: ['SOYBEAN', 'PALM_OIL_RAW'],
                deficits: ['REFINED_STEEL'],
                laborCostIndex: 0.60,
                tariffRate: 0.00,
                impact: { gdpContribution: 0, jobsCreated: 0, tradeSurplus: 0, localInflation: 0, taxPaid: 0, esgScore: 90 }
            },
            CITY_SURABAYA: {
                id: 'CITY_SURABAYA',
                name: 'Surabaya (Hub Industri Timur)',
                flag: '⚓',
                hubPort: 'Tanjung Perak Port',
                coords: { x: 780, y: 280 },
                advantages: ['NICKEL_ORE', 'REFINED_STEEL'],
                deficits: ['SOYBEAN', 'CRUDE_OIL'],
                laborCostIndex: 0.70,
                tariffRate: 0.00,
                impact: { gdpContribution: 0, jobsCreated: 0, tradeSurplus: 0, localInflation: 0, taxPaid: 0, esgScore: 86 }
            },
            CITY_YOGYA: {
                id: 'CITY_YOGYA',
                name: 'Yogyakarta (Sentra Agrikultur)',
                flag: '🌾',
                hubPort: 'Hub Agrobisnis Selatan',
                coords: { x: 500, y: 380 },
                advantages: ['SOYBEAN'],
                deficits: ['PETROCHEMICALS', 'SMARTPHONES'],
                laborCostIndex: 0.55,
                tariffRate: 0.00,
                impact: { gdpContribution: 0, jobsCreated: 0, tradeSurplus: 0, localInflation: 0, taxPaid: 0, esgScore: 92 }
            }
        }
    },

    // ⛴️ SKALA 3: LEVEL 3–4 (Peta Logistik Maritim Nusantara Kepulauan)
    NATIONAL: {
        id: 'NATIONAL',
        title: 'Peta Maritim Kepulauan Nusantara (Tingkat Nasional)',
        bgType: 'archipelago',
        nodes: {
            NAT_BELAWAN: {
                id: 'NAT_BELAWAN',
                name: 'Medan / Belawan (Sumatera)',
                flag: '🌴',
                hubPort: 'Pelabuhan Belawan',
                coords: { x: 190, y: 170 },
                advantages: ['PALM_OIL_RAW'],
                deficits: ['REFINED_STEEL', 'MICROCHIPS'],
                laborCostIndex: 0.65,
                tariffRate: 0.00,
                impact: { gdpContribution: 0, jobsCreated: 0, tradeSurplus: 0, localInflation: 0, taxPaid: 0, esgScore: 88 }
            },
            NAT_PRIOK: {
                id: 'NAT_PRIOK',
                name: 'Jakarta (Tanjung Priok Hub)',
                flag: '🏢',
                hubPort: 'Tanjung Priok Mega Port',
                coords: { x: 310, y: 340 },
                advantages: ['SMARTPHONES', 'PETROCHEMICALS'],
                deficits: ['NICKEL_ORE', 'PALM_OIL_RAW', 'SOYBEAN'],
                laborCostIndex: 0.85,
                tariffRate: 0.00,
                impact: { gdpContribution: 0, jobsCreated: 0, tradeSurplus: 0, localInflation: 0, taxPaid: 0, esgScore: 84 }
            },
            NAT_PERAK: {
                id: 'NAT_PERAK',
                name: 'Surabaya (Tanjung Perak)',
                flag: '⚓',
                hubPort: 'Tanjung Perak International',
                coords: { x: 450, y: 370 },
                advantages: ['REFINED_STEEL', 'SOYBEAN'],
                deficits: ['NICKEL_ORE', 'CRUDE_OIL'],
                laborCostIndex: 0.70,
                tariffRate: 0.00,
                impact: { gdpContribution: 0, jobsCreated: 0, tradeSurplus: 0, localInflation: 0, taxPaid: 0, esgScore: 86 }
            },
            NAT_PONTIANAK: {
                id: 'NAT_PONTIANAK',
                name: 'Pontianak (Kalimantan Barat)',
                flag: '🌾',
                hubPort: 'Kijing Deep Sea Port',
                coords: { x: 360, y: 230 },
                advantages: ['PALM_OIL_RAW', 'IRON_ORE'],
                deficits: ['PETROCHEMICALS'],
                laborCostIndex: 0.60,
                tariffRate: 0.00,
                impact: { gdpContribution: 0, jobsCreated: 0, tradeSurplus: 0, localInflation: 0, taxPaid: 0, esgScore: 90 }
            },
            NAT_MOROWALI: {
                id: 'NAT_MOROWALI',
                name: 'Morowali (Pusat Hilirisasi Nikel)',
                flag: '🪨',
                hubPort: 'Morowali Industrial Jetty',
                coords: { x: 640, y: 240 },
                advantages: ['NICKEL_ORE', 'BATTERY_CELLS'],
                deficits: ['SOYBEAN', 'SMARTPHONES'],
                laborCostIndex: 0.68,
                tariffRate: 0.00,
                impact: { gdpContribution: 0, jobsCreated: 0, tradeSurplus: 0, localInflation: 0, taxPaid: 0, esgScore: 82 }
            },
            NAT_MAKASSAR: {
                id: 'NAT_MAKASSAR',
                name: 'Makassar (Hub Indonesia Timur)',
                flag: '📦',
                hubPort: 'Makassar New Port (MNP)',
                coords: { x: 590, y: 320 },
                advantages: ['SOYBEAN'],
                deficits: ['BATTERY_CELLS', 'REFINED_STEEL'],
                laborCostIndex: 0.62,
                tariffRate: 0.00,
                impact: { gdpContribution: 0, jobsCreated: 0, tradeSurplus: 0, localInflation: 0, taxPaid: 0, esgScore: 89 }
            }
        }
    },

    // 🌏 SKALA 4: LEVEL 5–8 (Peta Regional ASEAN & Selat Malaka)
    REGIONAL_ASEAN: {
        id: 'REGIONAL_ASEAN',
        title: 'Peta Koridor Selat Malaka & ASEAN',
        bgType: 'asean_region',
        nodes: {
            ASEAN_ID: {
                id: 'ASEAN_ID',
                name: 'Indonesia (Priok / Morowali)',
                flag: '🇮🇩',
                hubPort: 'Tanjung Priok Hub',
                coords: { x: 490, y: 410 },
                advantages: ['NICKEL_ORE', 'PALM_OIL_RAW', 'BATTERY_CELLS'],
                deficits: ['MICROCHIPS', 'PRECISION_MOTORS'],
                laborCostIndex: 0.65,
                tariffRate: 0.00, // ASEAN Free Trade Area (AFTA 0%)
                impact: { gdpContribution: 0, jobsCreated: 0, tradeSurplus: 0, localInflation: 0, taxPaid: 0, esgScore: 85 }
            },
            ASEAN_SG: {
                id: 'ASEAN_SG',
                name: 'Singapura (Free Trade Hub)',
                flag: '🇸🇬',
                hubPort: 'Port of Singapore',
                coords: { x: 450, y: 290 },
                advantages: ['PETROCHEMICALS'],
                deficits: ['PALM_OIL_RAW', 'NICKEL_ORE', 'SOYBEAN'],
                laborCostIndex: 1.7,
                tariffRate: 0.00,
                impact: { gdpContribution: 0, jobsCreated: 0, tradeSurplus: 0, localInflation: 0, taxPaid: 0, esgScore: 96 }
            },
            ASEAN_MY: {
                id: 'ASEAN_MY',
                name: 'Malaysia (Kuala Lumpur)',
                flag: '🇲🇾',
                hubPort: 'Port Klang',
                coords: { x: 410, y: 260 },
                advantages: ['PALM_OIL_RAW', 'PETROCHEMICALS'],
                deficits: ['NICKEL_ORE', 'IRON_ORE'],
                laborCostIndex: 0.90,
                tariffRate: 0.00,
                impact: { gdpContribution: 0, jobsCreated: 0, tradeSurplus: 0, localInflation: 0, taxPaid: 0, esgScore: 88 }
            },
            ASEAN_TH: {
                id: 'ASEAN_TH',
                name: 'Thailand (Bangkok)',
                flag: '🇹🇭',
                hubPort: 'Laem Chabang Auto Hub',
                coords: { x: 400, y: 140 },
                advantages: ['PRECISION_MOTORS', 'SOYBEAN'],
                deficits: ['BATTERY_CELLS', 'CRUDE_OIL'],
                laborCostIndex: 0.78,
                tariffRate: 0.00,
                impact: { gdpContribution: 0, jobsCreated: 0, tradeSurplus: 0, localInflation: 0, taxPaid: 0, esgScore: 87 }
            },
            ASEAN_VN: {
                id: 'ASEAN_VN',
                name: 'Vietnam (Ho Chi Minh)',
                flag: '🇻🇳',
                hubPort: 'Cat Lai Container Terminal',
                coords: { x: 530, y: 160 },
                advantages: ['SMARTPHONES'],
                deficits: ['BATTERY_CELLS', 'REFINED_STEEL'],
                laborCostIndex: 0.68,
                tariffRate: 0.00,
                impact: { gdpContribution: 0, jobsCreated: 0, tradeSurplus: 0, localInflation: 0, taxPaid: 0, esgScore: 84 }
            }
        }
    },

    // 🪐 SKALA 5: LEVEL 9–17 (Peta Global Dunia Penuh)
    GLOBAL: {
        id: 'GLOBAL',
        title: 'Peta Rantai Pasok Global (Seluruh Dunia)',
        bgType: 'world_continents',
        nodes: {
            ID: {
                id: 'ID',
                name: 'Indonesia',
                flag: '🇮🇩',
                hubPort: 'Tanjung Priok / Morowali',
                coords: { x: 740, y: 315 },
                advantages: ['NICKEL_ORE', 'PALM_OIL_RAW', 'BATTERY_CELLS'],
                deficits: ['MICROCHIPS', 'PRECISION_MOTORS', 'AEROSPACE_PARTS'],
                laborCostIndex: 0.65,
                tariffRate: 0.08,
                carbonFactor: 1.1,
                impact: { gdpContribution: 0, jobsCreated: 0, tradeSurplus: 0, localInflation: 0, taxPaid: 0, esgScore: 85 }
            },
            CN: {
                id: 'CN',
                name: 'China',
                flag: '🇨🇳',
                hubPort: 'Shanghai Mega Port',
                coords: { x: 730, y: 190 },
                advantages: ['BATTERY_CELLS', 'SMARTPHONES', 'REFINED_STEEL'],
                deficits: ['CRUDE_OIL', 'NICKEL_ORE', 'SOYBEAN', 'IRON_ORE'],
                laborCostIndex: 0.85,
                tariffRate: 0.07,
                carbonFactor: 1.25,
                impact: { gdpContribution: 0, jobsCreated: 0, tradeSurplus: 0, localInflation: 0, taxPaid: 0, esgScore: 78 }
            },
            DE: {
                id: 'DE',
                name: 'Jerman',
                flag: '🇩🇪',
                hubPort: 'Hamburg Port',
                coords: { x: 485, y: 135 },
                advantages: ['PRECISION_MOTORS', 'ELECTRIC_VEHICLES'],
                deficits: ['CRUDE_OIL', 'BATTERY_CELLS', 'PALM_OIL_RAW'],
                laborCostIndex: 1.6,
                tariffRate: 0.04,
                carbonFactor: 0.65,
                impact: { gdpContribution: 0, jobsCreated: 0, tradeSurplus: 0, localInflation: 0, taxPaid: 0, esgScore: 94 }
            },
            US: {
                id: 'US',
                name: 'Amerika Serikat',
                flag: '🇺🇸',
                hubPort: 'Port of Los Angeles',
                coords: { x: 210, y: 170 },
                advantages: ['MICROCHIPS', 'AEROSPACE_PARTS', 'SOYBEAN'],
                deficits: ['BATTERY_CELLS', 'REFINED_STEEL', 'PETROCHEMICALS'],
                laborCostIndex: 1.75,
                tariffRate: 0.05,
                carbonFactor: 0.85,
                impact: { gdpContribution: 0, jobsCreated: 0, tradeSurplus: 0, localInflation: 0, taxPaid: 0, esgScore: 88 }
            },
            SA: {
                id: 'SA',
                name: 'Arab Saudi',
                flag: '🇸🇦',
                hubPort: 'Jeddah Islamic Port',
                coords: { x: 575, y: 215 },
                advantages: ['CRUDE_OIL', 'PETROCHEMICALS'],
                deficits: ['SOYBEAN', 'ELECTRIC_VEHICLES', 'SMARTPHONES'],
                laborCostIndex: 0.95,
                tariffRate: 0.05,
                carbonFactor: 1.4,
                impact: { gdpContribution: 0, jobsCreated: 0, tradeSurplus: 0, localInflation: 0, taxPaid: 0, esgScore: 72 }
            },
            JP: {
                id: 'JP',
                name: 'Jepang',
                flag: '🇯🇵',
                hubPort: 'Yokohama Port',
                coords: { x: 805, y: 180 },
                advantages: ['PRECISION_MOTORS', 'MICROCHIPS'],
                deficits: ['IRON_ORE', 'CRUDE_OIL', 'SOYBEAN', 'NICKEL_ORE'],
                laborCostIndex: 1.5,
                tariffRate: 0.03,
                carbonFactor: 0.70,
                impact: { gdpContribution: 0, jobsCreated: 0, tradeSurplus: 0, localInflation: 0, taxPaid: 0, esgScore: 92 }
            },
            BR: {
                id: 'BR',
                name: 'Brazil',
                flag: '🇧🇷',
                hubPort: 'Santos Port',
                coords: { x: 335, y: 340 },
                advantages: ['SOYBEAN', 'IRON_ORE'],
                deficits: ['MICROCHIPS', 'PRECISION_MOTORS', 'PETROCHEMICALS'],
                laborCostIndex: 0.75,
                tariffRate: 0.10,
                carbonFactor: 0.90,
                impact: { gdpContribution: 0, jobsCreated: 0, tradeSurplus: 0, localInflation: 0, taxPaid: 0, esgScore: 80 }
            },
            AU: {
                id: 'AU',
                name: 'Australia',
                flag: '🇦🇺',
                hubPort: 'Port Hedland / Sydney',
                coords: { x: 795, y: 375 },
                advantages: ['LITHIUM_RAW', 'IRON_ORE'],
                deficits: ['SMARTPHONES', 'ELECTRIC_VEHICLES', 'PETROCHEMICALS'],
                laborCostIndex: 1.65,
                tariffRate: 0.04,
                carbonFactor: 0.88,
                impact: { gdpContribution: 0, jobsCreated: 0, tradeSurplus: 0, localInflation: 0, taxPaid: 0, esgScore: 86 }
            },
            SG: {
                id: 'SG',
                name: 'Singapura',
                flag: '🇸🇬',
                hubPort: 'Port of Singapore Free Hub',
                coords: { x: 715, y: 285 },
                advantages: ['PETROCHEMICALS'],
                deficits: ['SOYBEAN', 'NICKEL_ORE', 'CRUDE_OIL'],
                laborCostIndex: 1.7,
                tariffRate: 0.00,
                carbonFactor: 0.60,
                impact: { gdpContribution: 0, jobsCreated: 0, tradeSurplus: 0, localInflation: 0, taxPaid: 0, esgScore: 96 }
            },
            CH: {
                id: 'CH',
                name: 'Swiss',
                flag: '🇨🇭',
                hubPort: 'Basel Rhine Logistics',
                coords: { x: 480, y: 150 },
                advantages: ['MEDICAL_INSTRUMENTS'],
                deficits: ['NICKEL_ORE', 'PALM_OIL_RAW', 'REFINED_STEEL'],
                laborCostIndex: 2.1,
                tariffRate: 0.02,
                carbonFactor: 0.50,
                impact: { gdpContribution: 0, jobsCreated: 0, tradeSurplus: 0, localInflation: 0, taxPaid: 0, esgScore: 98 }
            }
        }
    }
};

// ============================================================
// MODUL ILMU EKONOMI PERDAGANGAN INTERNASIONAL (GLOBAL TRADE THEORY)
// ============================================================

const GLOBAL_TRADE_ECONOMICS = {
    // 1. Model Gravitasi Jan Tinbergen (Biaya Transportasi = Jarak / Skala / FTA)
    calcGravityTransportCost(fromNode, toNode, amountTon, hasFTA = false) {
        const dist = Math.hypot(toNode.coords.x - fromNode.coords.x, toNode.coords.y - fromNode.coords.y);
        // Skala Ekonomis Paul Krugman: Makin besar muatan, makin murah biaya per ton
        const scaleFactor = Math.max(0.65, 1 - (Math.log10(Math.max(1, amountTon)) * 0.12));
        const ftaDiscount = hasFTA ? 0.75 : 1.0; // Diskon perjanjian dagang bebas 25%

        const baseUnitRate = 9;
        return Math.round((dist * 3 + amountTon * baseUnitRate) * scaleFactor * ftaDiscount);
    },

    // 2. Teori Keunggulan Komparatif David Ricardo (Diskon Biaya Produksi Negara Spesialis)
    calcComparativePrice(basePrice, node, commodityId) {
        if (node.advantages && node.advantages.includes(commodityId)) {
            return Math.round(basePrice * 0.70); // Diskon keunggulan komparatif 30%
        }
        if (node.deficits && node.deficits.includes(commodityId)) {
            return Math.round(basePrice * 1.25); // Premi pembeli defisit +25%
        }
        return basePrice;
    },

    // 3. Terms of Trade (ToT) Index (Rasio Harga Ekspor terhadap Impor)
    calcTermsOfTrade(exportValue, importValue) {
        if (!importValue || importValue === 0) return 120;
        return Math.min(250, Math.round((exportValue / importValue) * 100));
    },

    // 4. Domestic Market Obligation (DMO) Penalty & Inflation Pressure
    calcDomesticMarketImpact(domesticSharePct) {
        // Jika menjual < 25% ke pasar domestik -> inflasi naik dan ada denda ekspor
        if (domesticSharePct < 0.25) {
            return {
                inflationRisk: true,
                inflationDelta: +0.6,
                dmoPenaltyRate: 0.05, // Denda 5%
                warning: 'Peringatan DMO: Pasokan domestik <25%! Inflasi lokal naik & dikenakan denda ekspor.'
            };
        }
        return {
            inflationRisk: false,
            inflationDelta: -0.2,
            dmoPenaltyRate: 0.00,
            warning: 'Pasokan domestik aman. Diberikan insentif subsidi ekspor 2%.'
        };
    }
};

// Alias default untuk kompatibilitas
const COUNTRIES_DATABASE = MULTI_SCALE_MAPS.GLOBAL.nodes;

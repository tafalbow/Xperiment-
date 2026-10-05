/**
 * ==============================================================================
 * PORTAL BASIS DATA & INTELIJEN INDUSTRI SEPEDA MOTOR INDONESIA (1990 - 2026)
 * INDONESIA 2-WHEELER INDUSTRY DATA & INTELLIGENCE SYSTEM (I2W-DIS)
 * 
 * Master Secondary Dataset: Multi-source reconciled from AISI, Kemenperin,
 * Kemenhub, ESDM, Kemenkeu/BKF, Korlantas Polri, BPS, LPEM UI, PwC, & Reputable Media.
 * ==============================================================================
 */

const I2W_DATA = {
  systemMetadata: {
    systemName: "Indonesia 2-Wheeler Industry Intelligence & Secondary Data Platform (I2W-DIS)",
    shortName: "I2W-DIS",
    version: "2.6.0",
    lastUpdated: "2026-09-25",
    author: "Tim Ahli Sistem Data & Analis Industri Otomotif Nasional",
    disclaimer: "Data sekunder dihimpun dari publikasi resmi kementerian, lembaga pemerintah, asosiasi industri resmi, dan arsip media ekonomi/otomotif terverifikasi.",
    legalCoverage: "Undang-Undang, Peraturan Pemerintah, Peraturan Presiden, Instruksi Presiden, Peraturan Menteri (Perindustrian, Perhubungan, ESDM, Keuangan), Kepolisian RI, dan Pemerintah Daerah."
  },

  // 1. DATA DERET WAKTU STATISTIK HISTORIS (1990 - 2026)
  // Reconciled sources: AISI (Asosiasi Industri Sepedamotor Indonesia), Kemenperin, BPS, Korlantas Polri
  timeSeries: [
    {
      year: 1990,
      domesticSales: 282500,
      exportSales: 4200,
      totalProduction: 286700,
      totalNationalPopulation: 8920000,
      growthYoY: 12.8,
      shareCub: 86.5,
      shareScooter: 0.0,
      shareSport: 13.5,
      shareEV: 0.0,
      evSalesVolume: 0,
      macroContext: "Era deregulasi otomotif awal; penerapan Deletion Program (program lokalisasi komponen bertahap) oleh Kementerian Perindustrian.",
      primarySource: "AISI & BPS Statistik Transportasi Darat 1990",
      status: "Observed"
    },
    {
      year: 1991,
      domesticSales: 338100,
      exportSales: 5600,
      totalProduction: 343700,
      totalNationalPopulation: 9450000,
      growthYoY: 19.7,
      shareCub: 87.1,
      shareScooter: 0.0,
      shareSport: 12.9,
      shareEV: 0.0,
      evSalesVolume: 0,
      macroContext: "Ekspansi jaringan dealer di Jawa dan Sumatera; penguatan perakitan lokal Astra Honda (Federal Motor) dan Yamaha Indonesia.",
      primarySource: "AISI Historical Archive",
      status: "Observed"
    },
    {
      year: 1992,
      domesticSales: 461200,
      exportSales: 8100,
      totalProduction: 469300,
      totalNationalPopulation: 10280000,
      growthYoY: 36.4,
      shareCub: 88.0,
      shareScooter: 0.0,
      shareSport: 12.0,
      shareEV: 0.0,
      evSalesVolume: 0,
      macroContext: "Pertumbuhan ekonomi nasional tinggi (>7%); peningkatan daya beli kelas pekerja pabrik dan perkebunan.",
      primarySource: "AISI & Kemenperin",
      status: "Observed"
    },
    {
      year: 1993,
      domesticSales: 603400,
      exportSales: 11500,
      totalProduction: 614900,
      totalNationalPopulation: 11190000,
      growthYoY: 30.8,
      shareCub: 89.2,
      shareScooter: 0.0,
      shareSport: 10.8,
      shareEV: 0.0,
      evSalesVolume: 0,
      macroContext: "Paket Kebijakan Otomotif Juni 1993: Insentif tarif bea masuk bagi prinsipal yang mencapai target lokalisasi komponen lokal (TKDN era Orba).",
      primarySource: "Kemenperin & Warta Ekonomi",
      status: "Observed"
    },
    {
      year: 1994,
      domesticSales: 784000,
      exportSales: 15200,
      totalProduction: 799200,
      totalNationalPopulation: 12280000,
      growthYoY: 29.9,
      shareCub: 89.8,
      shareScooter: 0.0,
      shareSport: 10.2,
      shareEV: 0.0,
      evSalesVolume: 0,
      macroContext: "Honda Astrea Grand menjadi sepeda motor paling populer di Indonesia; motor cub mendominasi mobilitas komuter dan keluarga.",
      primarySource: "AISI & Kompas Otomotif",
      status: "Observed"
    },
    {
      year: 1995,
      domesticSales: 1037400,
      exportSales: 22100,
      totalProduction: 1059500,
      totalNationalPopulation: 13670000,
      growthYoY: 32.3,
      shareCub: 90.2,
      shareScooter: 0.0,
      shareSport: 9.8,
      shareEV: 0.0,
      evSalesVolume: 0,
      macroContext: "Tonggak bersejarah: Pertama kali dalam sejarah penjualan sepeda motor di Indonesia menembus angka 1 juta unit per tahun.",
      primarySource: "AISI & Bisnis Indonesia",
      status: "Observed"
    },
    {
      year: 1996,
      domesticSales: 1382600,
      exportSales: 31400,
      totalProduction: 1414000,
      totalNationalPopulation: 15210000,
      growthYoY: 33.3,
      shareCub: 91.0,
      shareScooter: 0.0,
      shareSport: 9.0,
      shareEV: 0.0,
      evSalesVolume: 0,
      macroContext: "Inpres No. 2/1996 tentang Pengembangan Industri Mobil dan Kendaraan Bermotor Nasional; Suzuki meluncurkan Shogun 110 cc.",
      primarySource: "Kemenperin & AISI",
      status: "Observed"
    },
    {
      year: 1997,
      domesticSales: 1800200,
      exportSales: 38900,
      totalProduction: 1839100,
      totalNationalPopulation: 16820000,
      growthYoY: 30.2,
      shareCub: 91.4,
      shareScooter: 0.0,
      shareSport: 8.6,
      shareEV: 0.0,
      evSalesVolume: 0,
      macroContext: "Puncak rekor penjualan pra-krisis ekonomi; kredit konsumen berkembang pesat sebelum krisis moneter Asia melanda pada kuartal IV.",
      primarySource: "AISI & BPS",
      status: "Observed"
    },
    {
      year: 1998,
      domesticSales: 432000,
      exportSales: 46200,
      totalProduction: 478200,
      totalNationalPopulation: 16950000,
      growthYoY: -76.0,
      shareCub: 92.5,
      shareScooter: 0.0,
      shareSport: 7.5,
      shareEV: 0.0,
      evSalesVolume: 0,
      macroContext: "Pukulan telak Krisis Moneter 1998: Nilai tukar rupiah jatuh ke Rp 16.000/USD, suku bunga kredit melonjak, pabrik otomotif merumahkan ribuan pekerja.",
      primarySource: "AISI, LPEM UI, & Kompas",
      status: "Observed"
    },
    {
      year: 1999,
      domesticSales: 490500,
      exportSales: 51800,
      totalProduction: 542300,
      totalNationalPopulation: 17240000,
      growthYoY: 13.5,
      shareCub: 92.1,
      shareScooter: 0.0,
      shareSport: 7.9,
      shareEV: 0.0,
      evSalesVolume: 0,
      macroContext: "Stabilisasi politik pasca-Pemilu 1999; perbankan dan lembaga pembiayaan mulai merestrukturisasi skema kredit kendaraan roda dua.",
      primarySource: "AISI & Bank Indonesia",
      status: "Observed"
    },
    {
      year: 2000,
      domesticSales: 979000,
      exportSales: 58400,
      totalProduction: 1037400,
      totalNationalPopulation: 18380000,
      growthYoY: 99.6,
      shareCub: 93.0,
      shareScooter: 0.5,
      shareSport: 6.5,
      shareEV: 0.0,
      evSalesVolume: 0,
      macroContext: "Fenomena Serbuan 'Mocin' (Sepeda Motor Asal Tiongkok: Jincheng, Sanex, Loncin, Beijing) dengan harga 50% lebih murah mendisrupsi pasar dan memaksa pabrikan Jepang merilis motor hemat (Supra Fit, Vega, Smash).",
      primarySource: "AISI, Warta Ekonomi, & Kontan",
      status: "Observed"
    },
    {
      year: 2001,
      domesticSales: 1583000,
      exportSales: 64100,
      totalProduction: 1647100,
      totalNationalPopulation: 19840000,
      growthYoY: 61.7,
      shareCub: 91.8,
      shareScooter: 1.0,
      shareSport: 7.2,
      shareEV: 0.0,
      evSalesVolume: 0,
      macroContext: "Pendirian PT Astra Honda Motor (AHM) sebagai restrukturisasi penggabungan PT Federal Motor dan anak perusahaan; perlawanan pabrikan Jepang mengikis pangsa pasar Mocin.",
      primarySource: "AISI & Laporan Tahunan Astra 2001",
      status: "Observed"
    },
    {
      year: 2002,
      domesticSales: 2298000,
      exportSales: 71200,
      totalProduction: 2369200,
      totalNationalPopulation: 21720000,
      growthYoY: 45.2,
      shareCub: 90.1,
      shareScooter: 2.1,
      shareSport: 7.8,
      shareEV: 0.0,
      evSalesVolume: 0,
      macroContext: "Yamaha meluncurkan Nouvo, memperkenalkan konsep sepeda motor otomatis (skutik) pertama berskala nasional di Indonesia.",
      primarySource: "AISI & Otomotif Group",
      status: "Observed"
    },
    {
      year: 2003,
      domesticSales: 2818000,
      exportSales: 83000,
      totalProduction: 2901000,
      totalNationalPopulation: 24150000,
      growthYoY: 22.6,
      shareCub: 88.4,
      shareScooter: 3.2,
      shareSport: 8.4,
      shareEV: 0.0,
      evSalesVolume: 0,
      macroContext: "Kepmen LH No. 141/2003: Indonesia menetapkan regulasi standar emisi Euro 2 untuk sepeda motor yang berlaku efektif mulai 2006.",
      primarySource: "Kementerian Lingkungan Hidup & AISI",
      status: "Observed"
    },
    {
      year: 2004,
      domesticSales: 3900500,
      exportSales: 98300,
      totalProduction: 3998800,
      totalNationalPopulation: 27240000,
      growthYoY: 38.4,
      shareCub: 84.2,
      shareScooter: 7.8,
      shareSport: 8.0,
      shareEV: 0.0,
      evSalesVolume: 0,
      macroContext: "Revolusi Skutik Dimulai: Yamaha merilis Mio dengan kampanye 'Wanita Jangan Mau Ketinggalan'. Pasar roda dua meledak seiring keterlibatan pengendara wanita.",
      primarySource: "AISI & SWA Magazine",
      status: "Observed"
    },
    {
      year: 2005,
      domesticSales: 5089000,
      exportSales: 112000,
      totalProduction: 5201000,
      totalNationalPopulation: 31180000,
      growthYoY: 30.5,
      shareCub: 78.5,
      shareScooter: 13.5,
      shareSport: 8.0,
      shareEV: 0.0,
      evSalesVolume: 0,
      macroContext: "Penjualan nasional menembus rekor 5 juta unit. Skutik mulai menggerus pangsa pasar motor bebek di area perkotaan.",
      primarySource: "AISI & BPS",
      status: "Observed"
    },
    {
      year: 2006,
      domesticSales: 4435000,
      exportSales: 128400,
      totalProduction: 4563400,
      totalNationalPopulation: 34820000,
      growthYoY: -12.8,
      shareCub: 71.0,
      shareScooter: 20.8,
      shareSport: 8.2,
      shareEV: 0.0,
      evSalesVolume: 0,
      macroContext: "Penetapan efektif standar emisi gas buang Euro 2; kenaikan harga BBM subsidi (Bensin Premium) menekan daya beli sementara waktu.",
      primarySource: "AISI & Bisnis Indonesia",
      status: "Observed"
    },
    {
      year: 2007,
      domesticSales: 4688000,
      exportSales: 142500,
      totalProduction: 4830500,
      totalNationalPopulation: 39250000,
      growthYoY: 5.7,
      shareCub: 63.8,
      shareScooter: 28.2,
      shareSport: 8.0,
      shareEV: 0.0,
      evSalesVolume: 0,
      macroContext: "Pertumbuhan pesat perusahaan pembiayaan (leasing: FIFGroup, Adira Finance, BAF, OTO Kredit Motor) mempermudah akses kredit dengan DP rendah.",
      primarySource: "AISI & APPI (Asosiasi Perusahaan Pembiayaan)",
      status: "Observed"
    },
    {
      year: 2008,
      domesticSales: 6215800,
      exportSales: 165100,
      totalProduction: 6380900,
      totalNationalPopulation: 44520000,
      growthYoY: 32.6,
      shareCub: 52.4,
      shareScooter: 39.6,
      shareSport: 8.0,
      shareEV: 0.0,
      evSalesVolume: 0,
      macroContext: "Astra Honda Motor meluncurkan Honda BeAT untuk melawan dominasi Yamaha Mio; memicu persaingan perang fitur dan harga di segmen matik entry-level.",
      primarySource: "AISI & Kompas Otomotif",
      status: "Observed"
    },
    {
      year: 2009,
      domesticSales: 5881700,
      exportSales: 178300,
      totalProduction: 6060000,
      totalNationalPopulation: 50220000,
      growthYoY: -5.4,
      shareCub: 46.2,
      shareScooter: 45.8,
      shareSport: 8.0,
      shareEV: 0.0,
      evSalesVolume: 0,
      macroContext: "Krisis Finansial Global (GFC 2008/2009) berdampak ringan pada penjualan domestik; disahkannya UU No. 22 Tahun 2009 tentang Lalu Lintas dan Angkutan Jalan (LLAJ).",
      primarySource: "AISI, Bank Indonesia, & Lembaran Negara RI",
      status: "Observed"
    },
    {
      year: 2010,
      domesticSales: 7369200,
      exportSales: 192800,
      totalProduction: 7562000,
      totalNationalPopulation: 56830000,
      growthYoY: 25.3,
      shareCub: 38.0,
      shareScooter: 53.6,
      shareSport: 8.4,
      shareEV: 0.0,
      evSalesVolume: 0,
      macroContext: "Titik Balik Sejarah (Inflection Point): Untuk pertama kalinya, pangsa pasar skutik resmi melampaui motor bebek (>50%) di Indonesia.",
      primarySource: "AISI & BPS Statistik Transportasi",
      status: "Observed"
    },
    {
      year: 2011,
      domesticSales: 8042600,
      exportSales: 215400,
      totalProduction: 8258000,
      totalNationalPopulation: 63840000,
      growthYoY: 9.1,
      shareCub: 32.1,
      shareScooter: 59.8,
      shareSport: 8.1,
      shareEV: 0.0,
      evSalesVolume: 0,
      macroContext: "PUNCAK REKOR TERTINGGI SEPANJANG SEJARAH (All-Time Historical Peak): Penjualan tembus 8,04 juta unit didorong ledakan harga komoditas sawit/batubara dan kemudahan kredit DP Rp 0 - Rp 500.000.",
      primarySource: "AISI, BPS, & CNBC Indonesia Archive",
      status: "Observed"
    },
    {
      year: 2012,
      domesticSales: 7147100,
      exportSales: 238900,
      totalProduction: 7386000,
      totalNationalPopulation: 70520000,
      growthYoY: -11.1,
      shareCub: 25.8,
      shareScooter: 65.4,
      shareSport: 8.8,
      shareEV: 0.0,
      evSalesVolume: 0,
      macroContext: "Regulasi Pengetatan Kredit: Surat Edaran Bank Indonesia dan Peraturan Menkeu menetapkan uang muka (DP) minimal 20-25% untuk kredit multifinance guna mengerem NPL.",
      primarySource: "Bank Indonesia, Bapepam-LK, & AISI",
      status: "Observed"
    },
    {
      year: 2013,
      domesticSales: 7743800,
      exportSales: 265000,
      totalProduction: 8008800,
      totalNationalPopulation: 77800000,
      growthYoY: 8.3,
      shareCub: 21.2,
      shareScooter: 69.8,
      shareSport: 9.0,
      shareEV: 0.0,
      evSalesVolume: 0,
      macroContext: "Penerapan bertahap Permen LH No. 23/2012 tentang Baku Mutu Emisi Gas Buang Euro 3; migrasi massal sistem karburator ke injeksi elektronik (PGM-FI & YMJET-FI/Blue Core).",
      primarySource: "Kementerian Lingkungan Hidup & AISI",
      status: "Observed"
    },
    {
      year: 2014,
      domesticSales: 7867100,
      exportSales: 291200,
      totalProduction: 8158300,
      totalNationalPopulation: 85300000,
      growthYoY: 1.6,
      shareCub: 16.5,
      shareScooter: 73.5,
      shareSport: 10.0,
      shareEV: 0.0,
      evSalesVolume: 0,
      macroContext: "Honda BeAT mengukuhkan diri sebagai sepeda motor terlaris di dunia dalam penjualan tahunan; motor matik menguasai hampir tiga perempat penjualan nasional.",
      primarySource: "AISI & DetikOto",
      status: "Observed"
    },
    {
      year: 2015,
      domesticSales: 6480100,
      exportSales: 362000,
      totalProduction: 6842100,
      totalNationalPopulation: 92400000,
      growthYoY: -17.6,
      shareCub: 13.8,
      shareScooter: 76.2,
      shareSport: 10.0,
      shareEV: 0.0,
      evSalesVolume: 0,
      macroContext: "Pelemahan ekonomi akibat kejatuhan harga komoditas global; lahirnya segmen Maxi Scooter melalui peluncuran Yamaha NMAX yang mengubah lanskap preferensi kelas menengah.",
      primarySource: "AISI, LPEM UI, & Bisnis Indonesia",
      status: "Observed"
    },
    {
      year: 2016,
      domesticSales: 5931200,
      exportSales: 435200,
      totalProduction: 6366400,
      totalNationalPopulation: 99100000,
      growthYoY: -8.5,
      shareCub: 10.5,
      shareScooter: 79.5,
      shareSport: 10.0,
      shareEV: 0.0,
      evSalesVolume: 0,
      macroContext: "Penerapan penuh standar Euro 3 untuk seluruh tipe motor baru di Indonesia; ekspor CBU Indonesia terus melonjak ke pasar ASEAN dan Eropa.",
      primarySource: "AISI & Kemenperin",
      status: "Observed"
    },
    {
      year: 2017,
      domesticSales: 5886100,
      exportSales: 511800,
      totalProduction: 6397900,
      totalNationalPopulation: 105800000,
      growthYoY: -0.8,
      shareCub: 8.8,
      shareScooter: 82.1,
      shareSport: 9.1,
      shareEV: 0.0,
      evSalesVolume: 0,
      macroContext: "AHM merespons tren Maxi dengan meluncurkan All New PCX 150 produksi lokal di pabrik Sunter; segmen skutik bongsor 150cc tumbuh pesat.",
      primarySource: "AISI & Kontan",
      status: "Observed"
    },
    {
      year: 2018,
      domesticSales: 6383100,
      exportSales: 627400,
      totalProduction: 7010500,
      totalNationalPopulation: 112500000,
      growthYoY: 8.4,
      shareCub: 7.9,
      shareScooter: 84.6,
      shareSport: 7.5,
      shareEV: 0.0,
      evSalesVolume: 0,
      macroContext: "Ekspor CBU melampaui rekor 600 ribu unit; Indonesia memperkuat posisinya sebagai basis manufaktur global sepeda motor Honda dan Yamaha.",
      primarySource: "AISI & Kementerian Perdagangan",
      status: "Observed"
    },
    {
      year: 2019,
      domesticSales: 6487400,
      exportSales: 810400,
      totalProduction: 7297800,
      totalNationalPopulation: 118600000,
      growthYoY: 1.6,
      shareCub: 6.5,
      shareScooter: 86.8,
      shareSport: 6.6,
      shareEV: 0.1,
      evSalesVolume: 2300,
      macroContext: "Lahirnya Regulasi Kendaraan Listrik: Presiden Joko Widodo menerbitkan Perpres No. 55/2019; Gesits resmi diperkenalkan sebagai pelopor motor listrik buatan anak bangsa.",
      primarySource: "Sekretariat Negara, AISI, & Kompas",
      status: "Observed"
    },
    {
      year: 2020,
      domesticSales: 3660600,
      exportSales: 700400,
      totalProduction: 4361000,
      totalNationalPopulation: 121200000,
      growthYoY: -43.6,
      shareCub: 6.2,
      shareScooter: 87.9,
      shareSport: 5.7,
      shareEV: 0.2,
      evSalesVolume: 4200,
      macroContext: "Pukulan Pandemi COVID-19: Penjualan anjlok drastis (-43,6%) akibat pembatasan mobilitas (PSBB) dan gangguan rantai pasok pabrik. Penerbitan Permenhub No. PM 44/2020 (Uji Tipe Kendaraan Listrik).",
      primarySource: "AISI, Kemenhub, & LPEM UI",
      status: "Observed"
    },
    {
      year: 2021,
      domesticSales: 5057500,
      exportSales: 803900,
      totalProduction: 5861400,
      totalNationalPopulation: 124500000,
      growthYoY: 38.2,
      shareCub: 6.1,
      shareScooter: 87.6,
      shareSport: 5.8,
      shareEV: 0.5,
      evSalesVolume: 12400,
      macroContext: "Pemulihan pasca-pandemi; pembentukan konsorsium baterai BUMN PT Industri Baterai Indonesia (IBC); Perkap Polri No. 7/2021 memperkenalkan plat nomor lis biru untuk kendaraan listrik.",
      primarySource: "AISI, Korlantas Polri, & BKPM",
      status: "Observed"
    },
    {
      year: 2022,
      domesticSales: 5221400,
      exportSales: 743500,
      totalProduction: 5964900,
      totalNationalPopulation: 128300000,
      growthYoY: 3.2,
      shareCub: 5.4,
      shareScooter: 88.5,
      shareSport: 5.3,
      shareEV: 0.8,
      evSalesVolume: 25800,
      macroContext: "Krisis pasokan global chip semikonduktor membatasi kapasitas produksi pabrikan; Inpres No. 7/2022 mewajibkan kendaraan listrik sebagai kendaraan dinas instansi pemerintah.",
      primarySource: "AISI & Kemenperin",
      status: "Observed"
    },
    {
      year: 2023,
      domesticSales: 6236900,
      exportSales: 570000,
      totalProduction: 6806900,
      totalNationalPopulation: 132800000,
      growthYoY: 19.4,
      shareCub: 4.8,
      shareScooter: 89.8,
      shareSport: 4.4,
      shareEV: 1.0,
      evSalesVolume: 62000,
      macroContext: "Revolusi Kebijakan Subsidi Motor Listrik: Permenperin No. 21/2023 memberikan potongan harga Rp 7 juta berbasis 1 NIK KTP melalui platform SISAPIRa dengan syarat TKDN minimal 40%.",
      primarySource: "Kemenperin, AISI, AISMOLI, & CNBC Indonesia",
      status: "Observed"
    },
    {
      year: 2024,
      domesticSales: 6528400,
      exportSales: 535000,
      totalProduction: 7063400,
      totalNationalPopulation: 137500000,
      growthYoY: 4.7,
      shareCub: 4.4,
      shareScooter: 90.1,
      shareSport: 4.2,
      shareEV: 1.3,
      evSalesVolume: 85000,
      macroContext: "Perpres No. 79/2023 memberikan relaksasi insentif bea masuk dan PPnBM untuk impor CBU/CKD berbasis komitmen investasi pabrik lokal; Polytron dan ALVA mendominasi pasar E2W bersubsidi.",
      primarySource: "AISI, Kemenperin, AISMOLI, & Bisnis Indonesia",
      status: "Observed"
    },
    {
      year: 2025,
      domesticSales: 6680000,
      exportSales: 560000,
      totalProduction: 7240000,
      totalNationalPopulation: 142100000,
      growthYoY: 2.3,
      shareCub: 4.1,
      shareScooter: 90.2,
      shareSport: 3.9,
      shareEV: 1.8,
      evSalesVolume: 120000,
      macroContext: "Pabrik sel baterai konsorsium IBC-LG Energy Solution (PT HLI Green Power) beroperasi penuh; memperdalam integrasi rantai pasok lokal dan meningkatkan kepatuhan TKDN >60%.",
      primarySource: "Kemenperin, Kemenves/BKPM, & AISI",
      status: "Estimated"
    },
    {
      year: 2026,
      domesticSales: 6850000,
      exportSales: 585000,
      totalProduction: 7435000,
      totalNationalPopulation: 146800000,
      growthYoY: 2.5,
      shareCub: 3.8,
      shareScooter: 90.3,
      shareSport: 3.7,
      shareEV: 2.2,
      evSalesVolume: 155000,
      macroContext: "Proyeksi konsensus industri dan target transisi energi nasional: Ekspansi jaringan stasiun penukaran baterai (SPBKLU) terstandardisasi di 5 kota metropolitan utama dan percepatan program konversi ESDM.",
      primarySource: "Proyeksi Konsensus AISI, Kemenperin, & Dewan Energi Nasional",
      status: "Forecast"
    }
  ],

  // 2. DATA PANGSA PASAR PABRIKAN & MEREK (BRAND MARKET SHARE)
  // Menampilkan dominasi ICE dan peta penetrasi merek EV/KBLBB terkini
  brandMarketShare: {
    iceShare: [
      {
        brand: "Honda (PT Astra Honda Motor)",
        sharePercent: 77.2,
        annualVolumeUnits: 5040000,
        flagshipModels: "BeAT, Vario 125/160, Scoopy, PCX 160, ADV 160, Revo, CB150R",
        dominantSegment: "Skutik (Entry, Medium, Maxi)",
        assemblyPlants: "5 Pabrik: Sunter, Pegangsaan Dua, Cikarang (2 Plant), Karawang",
        countryOrigin: "Jepang / Indonesia (Astra Group 50%, Honda Motor 50%)"
      },
      {
        brand: "Yamaha (PT Yamaha Indonesia Motor Mfg)",
        sharePercent: 20.8,
        annualVolumeUnits: 1358000,
        flagshipModels: "NMAX 155 Turbo, Aerox 155, Fazzio, Grand Filano, Mio M3, XMAX 250, WR 155 R",
        dominantSegment: "Skutik Maxi & Retro Klasik",
        assemblyPlants: "2 Pabrik: Pulo Gadung (Jakarta) & KIIC Karawang",
        countryOrigin: "Jepang (Yamaha Motor Co., Ltd.)"
      },
      {
        brand: "Kawasaki (PT Kawasaki Motor Indonesia)",
        sharePercent: 0.9,
        annualVolumeUnits: 58800,
        flagshipModels: "Ninja ZX-25R, Ninja 250, KLX 150/230, D-Tracker, W175, Eliminator",
        dominantSegment: "Sport Premium, Dual-Purpose / Trail, & Retro Klasik",
        assemblyPlants: "Pabrik Cibitung, MM2100 Bekasi",
        countryOrigin: "Jepang (Kawasaki Heavy Industries)"
      },
      {
        brand: "Suzuki (PT Suzuki Indomobil Motor)",
        sharePercent: 0.7,
        annualVolumeUnits: 45700,
        flagshipModels: "Burgman Street 125 EX, Satria F150 Fi, Nex II, Address, V-Strom 250SX",
        dominantSegment: "Underbone Hyper, Entry Skutik, Adventure Tourer",
        assemblyPlants: "Pabrik Tambun I & II, Bekasi",
        countryOrigin: "Jepang / Indonesia (Indomobil Group)"
      },
      {
        brand: "TVS (PT TVS Motor Company Indonesia)",
        sharePercent: 0.4,
        annualVolumeUnits: 26100,
        flagshipModels: "Callisto 110/125, Ronin 225, Ntorq 125, Apache RTR Series, Roda Tiga King",
        dominantSegment: "Retro Skutik, Modern Cruiser, Roda Tiga Komersial",
        assemblyPlants: "Pabrik Karawang Industrial Estate, Karawang Barat",
        countryOrigin: "India (TVS Motor Company)"
      }
    ],

    // Merek Motor Listrik (Electric Two Wheeler - E2W) di Indonesia
    evShare: [
      {
        brand: "Polytron EV (PT Hartono Istana Teknologi)",
        sharePercent: 34.2,
        annualVolumeUnits: 29070,
        flagshipModels: "Fox-R, Fox-S",
        businessModel: "Sewa Baterai (Battery-as-a-Service / BaaS) + Pembelian Unit Mandiri",
        tkdnPercent: 45.31,
        conglomerate: "Djarum Group",
        productionBase: "Kudus, Jawa Tengah"
      },
      {
        brand: "ALVA (PT Ilectra Motor Group)",
        sharePercent: 18.5,
        annualVolumeUnits: 15725,
        flagshipModels: "Alva One, Alva Cervo, Alva N3",
        businessModel: "High Performance Direct Charging + Fast Charging Station",
        tkdnPercent: 44.00,
        conglomerate: "Indika Energy Group",
        productionBase: "Cikarang, Jawa Barat"
      },
      {
        brand: "Gesits (PT Gesits Motor Nusantara)",
        sharePercent: 12.8,
        annualVolumeUnits: 10880,
        flagshipModels: "Gesits Raya G/E, Gesits G1",
        businessModel: "Dual Battery Swap & Direct Charging",
        tkdnPercent: 46.73,
        conglomerate: "BUMN Konsorsium (WIKA Industri Manufaktur & IBC)",
        productionBase: "Cileungsi, Bogor, Jawa Barat"
      },
      {
        brand: "Smoot (PT Swap Energi Indonesia)",
        sharePercent: 11.4,
        annualVolumeUnits: 9690,
        flagshipModels: "Smoot Tempur, Smoot Zuzu",
        businessModel: "Pure Battery Swap (Swap Poin terluas di Alfamart/Indomaret/Shell)",
        tkdnPercent: 41.80,
        conglomerate: "Swap Energi & Kejora-SBX",
        productionBase: "Tangerang, Banten"
      },
      {
        brand: "United E-Motor (PT Terang Dunia Internusa Tbk)",
        sharePercent: 8.7,
        annualVolumeUnits: 7395,
        flagshipModels: "TX3000, TX1800, T1800, MX1200",
        businessModel: "Dual Battery Direct Cable Charging",
        tkdnPercent: 57.30,
        conglomerate: "PT Terang Dunia Internusa Tbk (UNTD)",
        productionBase: "Citeureup & Curug, Jawa Barat"
      },
      {
        brand: "Yadea (PT Indomobil Emotor Internasional)",
        sharePercent: 6.2,
        annualVolumeUnits: 5270,
        flagshipModels: "Yadea T9, G5, E8S Pro",
        businessModel: "Graphene Battery & Direct Charging",
        tkdnPercent: 40.00,
        conglomerate: "Indomobil Group & Yadea Global",
        productionBase: "Pabrik Indomobil, Cikarang"
      },
      {
        brand: "Volta (PT Volta Indonesia Semesta)",
        sharePercent: 5.1,
        annualVolumeUnits: 4335,
        flagshipModels: "Volta 401, Mandala, Virgo",
        businessModel: "SGB (Sistem Ganti Baterai) + Integrasi IoT",
        tkdnPercent: 47.60,
        conglomerate: "NFC Indonesia (M Cash Group)",
        productionBase: "Kawasan Industri Candi, Semarang"
      },
      {
        brand: "Lainnya (Selis, Honda EM1/ICON, Maka Motors, TVS iQube)",
        sharePercent: 3.1,
        annualVolumeUnits: 2635,
        flagshipModels: "Honda EM1 e:, Honda CUV e:, Selis Agats, Maka Motors Prototype",
        businessModel: "Direct & Swap Hybrid",
        tkdnPercent: 40.00,
        conglomerate: "Beragam",
        productionBase: "Beragam"
      }
    ]
  },

  // 3. OBSERVATORIUM REGULASI & KEBIJAKAN LINTAS KEMENTERIAN/LEMBAGA (1990 - 2026)
  // Menghimpun 30+ regulasi resmi: Kemenperin, Kemenhub, ESDM, Kemenkeu, Bappenas, Setneg, Korlantas Polri
  regulations: [
    {
      id: "REG-001",
      number: "Permenperin No. 21 Tahun 2023",
      institution: "Kementerian Perindustrian",
      legalLevel: "Peraturan Menteri",
      year: 2023,
      dateEnacted: "2023-08-28",
      title: "Perubahan atas Permenperin No. 6/2023 tentang Pedoman Pemberian Bantuan Pemerintah untuk Pembelian Kendaraan Bermotor Listrik Berbasis Baterai Roda Dua",
      category: "Subsidi & Insentif Fiskal",
      targetScope: "Motor Listrik Baru (KBLBB R2)",
      status: "Berlaku Penuh",
      keyPoints: [
        "Pemberian subsidi potongan harga sebesar Rp 7.000.000 per unit langsung di faktur pembelian.",
        "Penyederhanaan syarat penerima: Berlaku untuk seluruh Warga Negara Indonesia pemilik 1 NIK KTP (1 KTP untuk 1 motor listrik), mencabut 4 syarat bansos pembatasan sebelumnya.",
        "Verifikasi penyaluran bantuan dilakukan secara terpusat melalui sistem digital SISAPIRa (Sistem Informasi Pemberian Bantuan Pembelian Kendaraan Bermotor Listrik Berbasis Baterai).",
        "Wajib memenuhi tingkat komponen dalam negeri (TKDN) minimal 40% bersertifikat resmi Kemenperin."
      ],
      impactOnIndustry: "Memicu lonjakan pendaftaran verifikasi unit motor listrik hingga ribuan per minggu; mengakselerasi pembukaan jalur perakitan lokal merek seperti Polytron, Smoot, ALVA, dan United.",
      sourceCitation: "Berita Negara Republik Indonesia Tahun 2023 No. 675 / tkdn.kemenperin.go.id"
    },
    {
      id: "REG-002",
      number: "Perpres No. 79 Tahun 2023",
      institution: "Presiden Republik Indonesia / Kementerian Koordinator Bidang Marves",
      legalLevel: "Peraturan Presiden",
      year: 2023,
      dateEnacted: "2023-12-08",
      title: "Perubahan atas Peraturan Presiden Nomor 55 Tahun 2019 tentang Percepatan Program Kendaraan Bermotor Listrik Berbasis Baterai (Battery Electric Vehicle) untuk Transportasi Jalan",
      category: "Peta Jalan Nasional & Investasi",
      targetScope: "Seluruh Ekosistem KBLBB (R2 & R4)",
      status: "Berlaku Penuh",
      keyPoints: [
        "Pemberian insentif fiskal pembebasan Bea Masuk (BM 0%) dan Pajak Penjualan atas Barang Mewah (PPnBM 0%) untuk impor kendaraan listrik dalam bentuk CBU dan CKD bagi investor yang berkomitmen membangun pabrik manufaktur di Indonesia.",
        "Penyesuaian batas waktu pemenuhan target capaian TKDN 40% diundur dari tahun 2024 menjadi 2026.",
        "Kewajiban perakitan lokal berkapasitas sepadan (1:1 komitmen) dengan jaminan bank (bank guarantee)."
      ],
      impactOnIndustry: "Mendorong investor global dan prinsipal kendaraan listrik untuk segera merealisasikan pabrik perakitan fisik di dalam negeri sebelum batas jendela insentif berakhir.",
      sourceCitation: "Lembaran Negara Republik Indonesia Tahun 2023 No. 157"
    },
    {
      id: "REG-003",
      number: "Perpres No. 55 Tahun 2019",
      institution: "Presiden Republik Indonesia",
      legalLevel: "Peraturan Presiden",
      year: 2019,
      dateEnacted: "2019-08-08",
      title: "Percepatan Program Kendaraan Bermotor Listrik Berbasis Baterai (Battery Electric Vehicle) untuk Transportasi Jalan",
      category: "Peta Jalan Nasional & Payung Hukum Utama",
      targetScope: "Ekosistem Kendaraan Listrik Nasional",
      status: "Telah Diubah sebagian oleh Perpres 79/2023",
      keyPoints: [
        "Landasan hukum payung (omnibus presidential decree) pengembangan ekosistem mobil dan motor listrik nasional.",
        "Mandat penyusunan insentif fiskal dan non-fiskal oleh kementerian terkait.",
        "Pemberian penugasan kepada BUMN (PLN, Pertamina, Inalum/MIND ID) untuk membangun infrastruktur pengisian dan baterai.",
        "Penetapan timeline bertahap kewajiban TKDN KBLBB."
      ],
      impactOnIndustry: "Menjadi katalisator awal transformasi industri otomotif Indonesia menuju elektrifikasi; memicu lahirnya inisiatif Gesits, ALVA, dan Swap Energi.",
      sourceCitation: "Lembaran Negara Republik Indonesia Tahun 2019 No. 146"
    },
    {
      id: "REG-004",
      number: "Permenhub No. PM 39 Tahun 2023",
      institution: "Kementerian Perhubungan",
      legalLevel: "Peraturan Menteri",
      year: 2023,
      dateEnacted: "2023-09-01",
      title: "Konversi Sepeda Motor dengan Penggerak Motor Bakar Menjadi Sepeda Motor Listrik Berbasis Baterai (Penyempurnaan PM 65/2020)",
      category: "Uji Tipe, Keselamatan & Konversi",
      targetScope: "Bengkel Konversi & Motor Bensin Eksisting",
      status: "Berlaku Penuh",
      keyPoints: [
        "Mengatur standar teknis dan sertifikasi bengkel konversi motor bakar (ICE) menjadi motor listrik.",
        "Sertifikasi bengkel dibagi ke dalam kategori Tipe A (bengkel mandiri bersertifikat teknisi lengkap) dan Tipe B.",
        "Penyederhanaan alur pengujian fisik dan penerbitan Sertifikat Uji Tipe (SUT) serta Sertifikat Registrasi Uji Tipe (SRUT) konversi.",
        "Kewajiban pengujian komponen keselamatan kelistrikan: isolasi tegangan, pengereman, dan ketahanan air (IP rating)."
      ],
      impactOnIndustry: "Memangkas birokrasi uji tipe konversi dari berbulan-bulan menjadi 3-7 hari kerja; memungkinkan ribuan unit motor dinas dan ojol dikonversi.",
      sourceCitation: "Berita Negara Republik Indonesia Tahun 2023 No. 690"
    },
    {
      id: "REG-005",
      number: "Permen ESDM No. 13 Tahun 2020",
      institution: "Kementerian Energi dan Sumber Daya Mineral",
      legalLevel: "Peraturan Menteri",
      year: 2020,
      dateEnacted: "2020-08-04",
      title: "Penyediaan Infrastruktur Pengisian Listrik untuk Kendaraan Bermotor Listrik Berbasis Baterai",
      category: "Infrastruktur SPKLU & SPBKLU",
      targetScope: "Stasiun Pengisian & Penukaran Baterai",
      status: "Berlaku Penuh",
      keyPoints: [
        "Mengatur skema izin usaha penyediaan tenaga listrik (IUPTL) dan tarif curah listrik untuk SPKLU (Stasiun Pengisian) dan SPBKLU (Stasiun Penukaran Baterai R2).",
        "Pemberian diskon tarif tenaga listrik khusus bagi penyedia SPBKLU dan pemilik rumah tangga yang mengecas di jam 22.00 - 05.00 (Diskon tarif 30% PLN).",
        "Standardisasi interoperabilitas keselamatan soket listrik dan konektor baterai swap."
      ],
      impactOnIndustry: "Mendorong jaringan retail modern (Indomaret, Alfamart, SPBU Shell/Pertamina) berkolaborasi dengan operator swap seperti Swap Energi dan Oyika.",
      sourceCitation: "Berita Negara Republik Indonesia Tahun 2020 No. 876"
    },
    {
      id: "REG-006",
      number: "Permen ESDM No. 1 Tahun 2023 jo. No. 3/2024",
      institution: "Kementerian Energi dan Sumber Daya Mineral",
      legalLevel: "Peraturan Menteri",
      year: 2023,
      dateEnacted: "2023-03-10",
      title: "Pedoman Bantuan Pemerintah dalam Program Konversi Sepeda Motor dengan Penggerak Motor Bakar Menjadi Sepeda Motor Listrik Berbasis Baterai",
      category: "Subsidi Konversi",
      targetScope: "Pemilik Motor Bensin Lama (110 - 150cc)",
      status: "Berlaku Penuh (Subsidi dinaikkan menjadi Rp 10 Juta)",
      keyPoints: [
        "Pemberian bantuan pembiayaan konversi motor bensin menjadi motor listrik sebesar Rp 7.000.000 (dinaikkan menjadi Rp 10.000.000 per unit pada revisi 2024).",
        "Disalurkan langsung kepada bengkel konversi resmi yang telah tersertifikasi Ditjen EBTKE dan Ditjen Hubdat.",
        "Syarat kepemilikan: STNK dan BPKB aktif, kapasitas mesin motor 110 cc hingga 150 cc.",
        "Target nasional: Mendorong konversi 50.000 unit motor pada tahap awal hingga 150.000 unit per tahun."
      ],
      impactOnIndustry: "Menurunkan biaya bersih yang harus dibayar konsumen untuk mengonversi motor bebek/matik lama menjadi motor listrik ke kisaran Rp 4 - 6 juta.",
      sourceCitation: "Berita Negara Republik Indonesia Tahun 2023 No. 248"
    },
    {
      id: "REG-007",
      number: "Permenperin No. 6 Tahun 2022",
      institution: "Kementerian Perindustrian",
      legalLevel: "Peraturan Menteri",
      year: 2022,
      dateEnacted: "2022-03-16",
      title: "Spesifikasi, Peta Jalan Pengembangan, dan Ketentuan Penghitungan Nilai Tingkat Komponen Dalam Negeri Kendaraan Bermotor Listrik Berbasis Baterai",
      category: "TKDN & Rantai Pasok",
      targetScope: "Pabrikan Perakitan KBLBB",
      status: "Berlaku Penuh",
      keyPoints: [
        "Metodologi baku penghitungan TKDN KBLBB R2: Pembobotan Komponen Utama (Baterai 35%, Motor Listrik/Inverter 20%, Rangka/Bodi 15%, Perakitan 10%, R&D Lokal 10%).",
        "Peta jalan target TKDN: Minimal 40% (2022-2026), minimal 60% (2027-2029), dan minimal 80% (2030 ke atas).",
        "Syarat mutlak produk untuk mendapatkan fasilitas lelang pengadaan pemerintah dan subsidi ritel."
      ],
      impactOnIndustry: "Memaksa prinsipal beralih dari perakitan semi-knocked down (SKD) menjadi completely knocked down (CKD) dan bermitra dengan vendor komponen lokal Jawa Barat, Banten, dan Jawa Tengah.",
      sourceCitation: "Berita Negara Republik Indonesia Tahun 2022 No. 312"
    },
    {
      id: "REG-008",
      number: "PP No. 73/2019 jo. PP No. 74/2021",
      institution: "Kementerian Keuangan / Pemerintah RI",
      legalLevel: "Peraturan Pemerintah",
      year: 2021,
      dateEnacted: "2021-07-02",
      title: "Perubahan atas Peraturan Pemerintah Nomor 73 Tahun 2019 tentang Barang Kena Pajak yang Tergolong Mewah Berupa Kendaraan Bermotor yang Dikenai PPnBM",
      category: "Perpajakan Berbasis Emisi",
      targetScope: "Seluruh Kendaraan Roda Dua & Empat",
      status: "Berlaku Penuh",
      keyPoints: [
        "Pengubahan paradigma tarif PPnBM: Tidak lagi semata-mata berdasarkan bentuk bodi dan kapasitas mesin (cc), melainkan berbasis tingkat emisi karbon (CO2) dan efisiensi bahan bakar.",
        "Pengenaan tarif PPnBM 0% untuk kendaraan bermotor roda dua berbasis listrik murni baterai (BEV).",
        "Pengenaan tarif PPnBM progresif (mulai 20% hingga 95%) untuk motor bensin berkapasitas silinder di atas 250cc hingga 500cc ke atas."
      ],
      impactOnIndustry: "Mencegah peredaran motor bensin boros emisi dan memberikan insentif harga kompetitif bagi kendaraan listrik di showroom.",
      sourceCitation: "Lembaran Negara Republik Indonesia Tahun 2021 No. 153"
    },
    {
      id: "REG-009",
      number: "Inpres No. 7 Tahun 2022",
      institution: "Presiden Republik Indonesia",
      legalLevel: "Instruksi Presiden",
      year: 2022,
      dateEnacted: "2022-09-13",
      title: "Penggunaan Kendaraan Bermotor Listrik Berbasis Baterai sebagai Kendaraan Dinas Operasional dan/atau Kendaraan Perorangan Dinas Instansi Pemerintah Pusat dan Pemerintahan Daerah",
      category: "Mandat Pengadaan Pemerintah",
      targetScope: "Kementerian, Lembaga, Pemda, BUMN, BUMD",
      status: "Berlaku Penuh",
      keyPoints: [
        "Mewajibkan pejabat pembina kepegawaian dan kuasa pengguna anggaran mengalihkan pengadaan kendaraan dinas baru ke kendaraan listrik murni.",
        "Alokasi anggaran APBN dan APBD untuk sewa atau beli motor listrik dinas operasional babinsa, bhabinkamtibmas, kurir dinas, dan patroli dishub.",
        "Mendorong platform e-Katalog LKPP memprioritaskan etalase produk KBLBB dengan TKDN >40%."
      ],
      impactOnIndustry: "Membuka pasar institusional (*B2G market*) sebesar puluhan ribu unit per tahun bagi produsen lokal seperti Gesits, Alva, dan Polytron.",
      sourceCitation: "Instruksi Presiden RI No. 7 Tahun 2022"
    },
    {
      id: "REG-010",
      number: "UU No. 22 Tahun 2009",
      institution: "DPR RI & Presiden Republik Indonesia",
      legalLevel: "Undang-Undang",
      year: 2009,
      dateEnacted: "2009-06-22",
      title: "Lalu Lintas dan Angkutan Jalan (LLAJ)",
      category: "Hukum Pokok Transportasi Darat",
      targetScope: "Pengemudi, Kendaraan, dan Prasarana Jalan",
      status: "Berlaku Penuh",
      keyPoints: [
        "Definisi yuridis Sepeda Motor: Kendaraan bermotor beroda dua dengan atau tanpa rumah-rumah dan dengan atau tanpa kereta samping atau kendaraan bermotor beroda tiga tanpa rumah-rumah.",
        "Kewajiban penggunaan helm Standar Nasional Indonesia (SNI) Pasal 106 ayat 8.",
        "Kewajiban menyalakan lampu utama pada siang hari (*Daytime Running Light / DRL*) Pasal 107 ayat 2.",
        "Persyaratan kelaikan jalan, uji tipe, dan registrasi identifikasi kendaraan di Korlantas Polri."
      ],
      impactOnIndustry: "Pabrikan mengadopsi fitur *Automatic Headlight On (AHO)* permanen pada seluruh motor produksi 2010 ke atas tanpa saklar manual.",
      sourceCitation: "Lembaran Negara Republik Indonesia Tahun 2009 No. 96"
    },
    {
      id: "REG-011",
      number: "Surat Edaran BI No. 14/10/DPNP & Permenkeu 84/2012",
      institution: "Bank Indonesia & Kementerian Keuangan",
      legalLevel: "Regulasi Moneter & Multifinance",
      year: 2012,
      dateEnacted: "2012-03-15",
      title: "Penerapan Manajemen Risiko pada Bank dan Perusahaan Pembiayaan yang Melakukan Penyaluran Kredit Kepemilikan Kendaraan Bermotor (DP Minimal)",
      category: "Regulasi Pembiayaan Kredit",
      targetScope: "Perbankan & Multifinance Leasing",
      status: "Disesuaikan berkala oleh OJK (Relaksasi 0% pada era pandemi untuk EV)",
      keyPoints: [
        "Menetapkan batas uang muka (Down Payment / DP) minimum 20% bagi multifinance dan 25% bagi bank umum syariah/konvensional untuk pembiayaan roda dua.",
        "Menghapuskan skema promosi kredit 'DP Nol Rupiah' atau 'DP Rp 200.000' yang dinilai membahayakan stabilitas sistem keuangan.",
        "Penilaian rasio kesehatan keuangan (NPL) perusahaan leasing sebelum diizinkan menyalurkan kredit."
      ],
      impactOnIndustry: "Penjualan motor nasional terkoreksi 11,1% pada 2012 setelah mencapai rekor 8 juta unit di 2011; menyehatkan portofolio kredit multifinance.",
      sourceCitation: "Surat Edaran Bank Indonesia 2012 & Arsip OJK"
    },
    {
      id: "REG-012",
      number: "Permen LH No. 23 Tahun 2012",
      institution: "Kementerian Lingkungan Hidup",
      legalLevel: "Peraturan Menteri",
      year: 2012,
      dateEnacted: "2012-09-04",
      title: "Perubahan atas Peraturan Menteri Negara Lingkungan Hidup Nomor 10 Tahun 2012 tentang Baku Mutu Emisi Gas Buang Kendaraan Bermotor Tipe Baru Kategori L (Euro 3)",
      category: "Standar Emisi & Lingkungan",
      targetScope: "Kendaraan Bermotor Kategori L (Roda 2 & 3)",
      status: "Berlaku Penuh (Transisi Euro 4 sedang disiapkan)",
      keyPoints: [
        "Menetapkan standar baku mutu emisi Euro 3 untuk sepeda motor tipe baru sejak 2013 dan seluruh tipe produksi massal sejak 1 Agustus 2015.",
        "Batas emisi maksimal: Karbon Monoksida (CO) 2,0 g/km, Hidrokarbon (HC) 0,8 g/km, dan Nitrogen Oksida (NOx) 0,15 g/km.",
        "Kewajiban pengujian metode siklus pengujian emisi WMTC (World Harmonized Motorcycle Test Cycle)."
      ],
      impactOnIndustry: "Pabrikan menghentikan total teknologi karburator 2-tak dan karburator konvensional; beralih 100% ke teknologi Fuel Injection (Injeksi) dan knalpot dengan catalytic converter.",
      sourceCitation: "Berita Negara Republik Indonesia Tahun 2012 No. 892"
    },
    {
      id: "REG-013",
      number: "Perkap Polri No. 7 Tahun 2021",
      institution: "Kepolisian Negara Republik Indonesia (Korlantas)",
      legalLevel: "Peraturan Kepolisian",
      year: 2021,
      dateEnacted: "2021-05-05",
      title: "Registrasi dan Identifikasi Kendaraan Bermotor (Penerbitan Tanda Nomor Kendaraan Bermotor Listrik)",
      category: "Identifikasi & Lalu Lintas",
      targetScope: "Pelat Nomor (TNKB) Kendaraan Listrik",
      status: "Berlaku Penuh",
      keyPoints: [
        "Penetapan tanda khusus pada Tanda Nomor Kendaraan Bermotor (TNKB) berupa lis berwarna biru di bagian bawah pelat nomor kendaraan listrik berbasis baterai.",
        "Integrasi pencatatan nomor rangka dan nomor motor listrik (bukan nomor mesin) pada basis data Electronic Registration and Identification (ERI) Korlantas.",
        "Mempermudah identifikasi di lapangan untuk mendapatkan hak istimewa (bebas ganjil genap, prioritas parkir, dan diskon tol/fiskal)."
      ],
      impactOnIndustry: "Memberikan kebanggaan identitas visual bagi pengguna awal motor listrik di jalan raya serta kemudahan kepatuhan lalu lintas.",
      sourceCitation: "Berita Negara Republik Indonesia Tahun 2021 No. 471"
    },
    {
      id: "REG-014",
      number: "Pergub DKI Jakarta No. 3 Tahun 2020",
      institution: "Pemerintah Provinsi DKI Jakarta",
      legalLevel: "Peraturan Daerah / Gubernur",
      year: 2020,
      dateEnacted: "2020-01-15",
      title: "Insentif Pajak Bea Balik Nama Kendaraan Bermotor atas Kendaraan Bermotor Listrik Berbasis Baterai (Battery Electric Vehicle) untuk Transportasi Jalan",
      category: "Insentif Pajak Daerah",
      targetScope: "Wilayah Hukum Provinsi DKI Jakarta",
      status: "Berlaku Penuh (Diadopsi pula oleh Jabar, Bali, dan Jateng)",
      keyPoints: [
        "Pengenaan tarif 0% (pembebasan 100%) untuk Bea Balik Nama Kendaraan Bermotor (BBNKB) penyerahan pertama dan kedua bagi KBLBB roda dua dan roda empat.",
        "Pengurangan Pajak Kendaraan Bermotor (PKB) tahunan hingga ke tingkat paling minimal (hanya bayar SWDKLLJ Jasa Raharja).",
        "Pembebasan dari pembatasan kawasan ganjil-genap lalu lintas ibu kota."
      ],
      impactOnIndustry: "Menghemat biaya administrasi legalitas motor listrik baru hingga Rp 1,5 - 2,5 juta per unit dibandingkan motor konvensional bensin di Jakarta.",
      sourceCitation: "Berita Daerah Provinsi DKI Jakarta Tahun 2020 No. 61003"
    },
    {
      id: "REG-015",
      number: "Kepmen LH No. 141 Tahun 2003",
      institution: "Kementerian Lingkungan Hidup",
      legalLevel: "Keputusan Menteri",
      year: 2003,
      dateEnacted: "2003-10-23",
      title: "Ambang Batas Emisi Gas Buang Kendaraan Bermotor Tipe Baru dan Kendaraan Bermotor yang Sedang Diproduksi (Euro 2)",
      category: "Standar Emisi Historis",
      targetScope: "Kendaraan Roda Dua Baru",
      status: "Telah Digantikan oleh Permen LH 23/2012 (Euro 3)",
      keyPoints: [
        "Pemberlakuan standar emisi gas buang Euro 2 secara wajib terhitung sejak 1 Januari 2006 untuk motor tipe baru dan 1 Januari 2007 untuk semua tipe produksi.",
        "Mengakhiri era motor bermesin 2-tak berpolusi tinggi (seperti Yamaha RX-King, F1ZR, Suzuki Satria 2-tak) secara bertahap.",
        "Pemberian sertifikasi Type Approval Emisi oleh Balai Pengujian Laik Jalan dan Sertifikasi Kendaraan Bermotor (BPLJSKB)."
      ],
      impactOnIndustry: "Peralihan drastis industri ke mesin 4-tak yang lebih ramah lingkungan dan hemat bahan bakar.",
      sourceCitation: "Arsip Kementerian Lingkungan Hidup RI"
    }
  ],

  // 4. DIREKTORI INVESTOR, PRINSIPAL MANUFAKTUR & EKOSISTEM BATERAI
  // Pemetaan menyeluruh pabrikan ICE, produsen EV, serta ekosistem sel & baterai (IBC/LG/CATL)
  manufacturers: [
    {
      id: "MFG-001",
      companyName: "PT Astra Honda Motor (AHM)",
      brandName: "Honda",
      segmentFocus: "ICE (Skutik, Bebek, Sport, Big Bike) & EV (EM1 e:, ICON e:, CUV e:)",
      statusInvestasi: "PMA (Joint Venture 50:50)",
      investors: [
        { name: "PT Astra International Tbk (Indonesia)", share: "50.0%" },
        { name: "Honda Motor Co., Ltd. (Jepang)", share: "50.0%" }
      ],
      totalAnnualCapacity: 5800000,
      headquarters: "Sunter, Jakarta Utara",
      plantLocations: [
        "Plant 1: Sunter, Jakarta Utara (Kapasitas ~1.1 Juta Unit - Cub & Sport)",
        "Plant 2: Pegangsaan Dua, Kelapa Gading (Kapasitas ~850 Ribu Unit)",
        "Plant 3 & 3A: Kawasan MM2100, Cikarang Barat (Kapasitas ~2.1 Juta Unit - Skutik)",
        "Plant 4 & 5: Kawasan Industri Indotaisei & KNIC, Karawang (Kapasitas ~1.8 Juta Unit - Skutik Maxi & EV)"
      ],
      manpower: 24000,
      tkdnStatus: "90% - 98% pada lini ICE; 40.2% pada lini EV (EM1 e:)",
      supplyChainTier1: "PT Showa Indonesia, PT Denso Indonesia, PT Astra Otoparts Tbk, PT Musashi Auto Parts",
      historicalNote: "Awalnya didirikan tahun 1971 sebagai PT Federal Motor; diubah menjadi PT Astra Honda Motor pada 2001. Menguasai lebih dari tiga perempat pasar roda dua Indonesia."
    },
    {
      id: "MFG-002",
      companyName: "PT Yamaha Indonesia Motor Manufacturing (YIMM)",
      brandName: "Yamaha",
      segmentFocus: "ICE (Skutik Maxi, Skutik Classy, Sport, Moped) & EV (E-Vino, Neo's)",
      statusInvestasi: "PMA",
      investors: [
        { name: "Yamaha Motor Co., Ltd. (Jepang)", share: "85.4%" },
        { name: "Mitra Lokal Terpilih / Manajemen", share: "14.6%" }
      ],
      totalAnnualCapacity: 3400000,
      headquarters: "Pulo Gadung, Jakarta Timur",
      plantLocations: [
        "Pabrik Pulo Gadung, Jakarta Timur (Perakitan mesin, rangka, dan kantor pusat)",
        "Pabrik KIIC Karawang, Jawa Barat (Fasilitas manufaktur canggih berstandar ekspor global)"
      ],
      manpower: 16500,
      tkdnStatus: "88% - 96% pada lini ICE (NMAX, Aerox, Fazzio); Eksportir CBU R2 terbesar RI",
      supplyChainTier1: "PT Kayaba Indonesia, PT Yamaha Electronics, PT Toyo Denso, PT IRC Gajah Tunggal",
      historicalNote: "Berdiri sejak 1974. Pelopor revolusi skutik di Indonesia melalui Yamaha Nouvo (2002) dan Yamaha Mio (2004) serta pencipta kategori Maxi Scooter lewat NMAX (2015)."
    },
    {
      id: "MFG-003",
      companyName: "PT Kawasaki Motor Indonesia (KMI)",
      brandName: "Kawasaki",
      segmentFocus: "ICE Sport Premium (Ninja Series, Z Series), Dual Purpose/Trail (KLX, D-Tracker), Retro (W-Series), & EV (Ninja e-1, Z e-1)",
      statusInvestasi: "PMA",
      investors: [
        { name: "Kawasaki Heavy Industries, Ltd. (Jepang)", share: "90.0%" },
        { name: "PT Sumber Sejahtera Berlian Motor", share: "10.0%" }
      ],
      totalAnnualCapacity: 200000,
      headquarters: "Jl. Abdul Muis, Gambir, Jakarta Pusat",
      plantLocations: [
        "Pabrik Kawasan Industri MM2100, Cikarang Barat, Bekasi, Jawa Barat"
      ],
      manpower: 2100,
      tkdnStatus: "45% - 65% pada lini KLX 150 & W175; CBU impor pada kelas 650cc ke atas",
      supplyChainTier1: "Enkei Wheels, Nissin Kogyo, PT Showa, IRC Tires",
      historicalNote: "Berdiri tahun 1994. Sejak 2014, KMI mengambil langkah strategis berani: keluar total dari segmen bebek/skutik harian dan fokus 100% pada pasar sport hobi dan off-road premium."
    },
    {
      id: "MFG-004",
      companyName: "PT Suzuki Indomobil Motor (SIM) / PT SIS",
      brandName: "Suzuki",
      segmentFocus: "ICE (Underbone Satria F150, Skutik Nex II, Burgman Street 125 EX, V-Strom 250SX)",
      statusInvestasi: "PMA Joint Venture",
      investors: [
        { name: "Suzuki Motor Corporation (Jepang)", share: "90.0%" },
        { name: "PT Indomobil Sukses Internasional Tbk (Salim Group)", share: "10.0%" }
      ],
      totalAnnualCapacity: 1200000,
      headquarters: "Kawasan Industri Pulo Gadung, Jakarta Timur",
      plantLocations: [
        "Pabrik Tambun I, Bekasi (Manufaktur komponen mesin & transmisi)",
        "Pabrik Tambun II, Bekasi (Perakitan akhir unit roda dua & pengecatan)"
      ],
      manpower: 4500,
      tkdnStatus: "75% - 90% pada lini Satria F150 & Nex II; Burgman Street diimpor CBU India",
      supplyChainTier1: "PT Indokarlo Perkasa, PT Mikuni Indonesia, PT NGK Busi Indonesia",
      historicalNote: "Pemain legendaris era 1990-2000an lewat Suzuki RC100, Crystal, Tornado, Shogun, dan Smash. Memegang ceruk komunitas setia di segmen motor underbone performa tinggi."
    },
    {
      id: "MFG-005",
      companyName: "PT TVS Motor Company Indonesia (TMCI)",
      brandName: "TVS",
      segmentFocus: "ICE Roda Dua (Callisto, Ronin, Ntorq, Apache) & Roda Tiga Komersial (TVS King)",
      statusInvestasi: "PMA",
      investors: [
        { name: "TVS Motor Company Limited (India)", share: "100.0%" }
      ],
      totalAnnualCapacity: 300000,
      headquarters: "Kawasan Industri Suryacipta, Karawang Timur, Jawa Barat",
      plantLocations: [
        "Pabrik Terpadu Suryacipta Karawang, Jawa Barat"
      ],
      manpower: 1200,
      tkdnStatus: "50% - 70% pada varian Callisto dan Roda Tiga; basis ekspor ke Filipina dan Afrika",
      supplyChainTier1: "Bosch, TVS Sundaram Fasteners, Vendor Lokal Logam Jawa Barat",
      historicalNote: "Berinvestasi di Indonesia sejak 2007 dengan total modal lebih dari USD 100 juta. Menjadikan fasilitas Karawang sebagai hub manufaktur TVS untuk kawasan Asia Tenggara."
    },
    {
      id: "MFG-006",
      companyName: "PT Hartono Istana Teknologi (Polytron EV)",
      brandName: "Polytron",
      segmentFocus: "Electric Two-Wheeler (Fox-R, Fox-S)",
      statusInvestasi: "PMDN Murni (Konglomerasi Nasional)",
      investors: [
        { name: "Grup Djarum / PT Sarana Menara Nusantara / Keluarga Hartono", share: "100.0%" }
      ],
      totalAnnualCapacity: 120000,
      headquarters: "Kudus, Jawa Tengah",
      plantLocations: [
        "Pabrik Elektronik & Manufaktur EV Polytron, Krapyak, Kudus, Jawa Tengah"
      ],
      manpower: 3200,
      tkdnStatus: "45.31% (Memenuhi syarat subsidi Permenperin No. 21/2023)",
      supplyChainTier1: "In-house electronic control unit (ECU), baterai LFP grade otomotif, PT Mega Auto Central",
      historicalNote: "Raksasa elektronik rumah tangga Indonesia yang berekspansi ke industri motor listrik. Merajai pasar motor listrik bersubsidi 2023-2025 berkat program sewa baterai Rp 125-200 ribu/bulan yang memangkas harga beli unit."
    },
    {
      id: "MFG-007",
      companyName: "PT Ilectra Motor Group (IMG / ALVA)",
      brandName: "ALVA",
      segmentFocus: "Premium Smart Electric Two-Wheeler (Alva One, Alva Cervo, Alva N3)",
      statusInvestasi: "Joint Venture PMDN & Modal Ventura Global",
      investors: [
        { name: "PT Indika Energy Tbk (INDY)", share: "Mayoritas (51.2%)" },
        { name: "Alpha JWC Ventures & Horizons Ventures (Li Ka-shing)", share: "Minoritas (48.8%)" }
      ],
      totalAnnualCapacity: 100000,
      headquarters: "Kawasan SCBD, Jakarta Selatan",
      plantLocations: [
        "Pabrik Perakitan Cikarang, Delta Silicon Industrial Estate, Jawa Barat"
      ],
      manpower: 850,
      tkdnStatus: "44.00% pada Alva One dan Cervo (Terverifikasi P3DN Kemenperin)",
      supplyChainTier1: "In-house ALVA App Connectivity, Inovasi Powertrain Mid-Drive, Sel Baterai Bersertifikasi Internasional",
      historicalNote: "Didirikan 2022 sebagai pilar diversifikasi energi hijau emiten batu bara terkemuka Indika Energy. Mengadopsi teknologi IoT pintar terintegrasi smartphone dan layanan customer roadside assistance 24/7."
    },
    {
      id: "MFG-008",
      companyName: "PT Gesits Motor Nusantara (GMN)",
      brandName: "Gesits",
      segmentFocus: "Electric Two-Wheeler (Gesits Raya G, Gesits Raya E, Gesits G1)",
      statusInvestasi: "Konsorsium BUMN & Nasional",
      investors: [
        { name: "PT Industri Baterai Indonesia (IBC)", share: "53.9%" },
        { name: "PT Wijaya Karya Industri & Konstruksi (WIKA Group)", share: "46.1%" }
      ],
      totalAnnualCapacity: 50000,
      headquarters: "Cileungsi, Bogor, Jawa Barat",
      plantLocations: [
        "Kawasan Industri WIKA Cileungsi, Bogor, Jawa Barat"
      ],
      manpower: 650,
      tkdnStatus: "46.73% (Pelopor motor listrik lokal perdana ber-TKDN resmi)",
      supplyChainTier1: "Riset Institut Teknologi Sepuluh Nopember (ITS), WIKA Rekayasa Konstruksi, Baterai Konsorsium BUMN",
      historicalNote: "Berawal dari riset prototipe Garansindo & ITS Surabaya tahun 2015. Resmi diuji jalan keliling Indonesia dan diluncurkan di Istana Merdeka oleh Presiden RI pada 2019."
    },
    {
      id: "MFG-009",
      companyName: "PT Swap Energi Indonesia & PT Smoot Motor Indonesia",
      brandName: "Smoot",
      segmentFocus: "Electric Two-Wheeler Battery Swap (Smoot Tempur, Smoot Zuzu)",
      statusInvestasi: "PMDN / Venture Backed",
      investors: [
        { name: "Pendiri Swap Energi & Konsorsium Angel Investor", share: "55.0%" },
        { name: "Kejora Capital, SBI Investment, & TNB Aura", share: "45.0%" }
      ],
      totalAnnualCapacity: 60000,
      headquarters: "Kebayoran Baru, Jakarta Selatan",
      plantLocations: [
        "Pabrik Perakitan Cikupa, Tangerang, Banten"
      ],
      manpower: 700,
      tkdnStatus: "41.80% (Memenuhi syarat subsidi Rp 7 juta)",
      supplyChainTier1: "SWAP Battery Network (>1.500 titik di minimarket), Smart BMS, Aplikasi Swap",
      historicalNote: "Pionir model murni tukar baterai (battery swap 9 detik tanpa cas kabel di rumah). Konsumen tidak membeli baterai, melainkan sistem kuota kilometer di aplikasi."
    },
    {
      id: "MFG-010",
      companyName: "PT Terang Dunia Internusa Tbk (United E-Motor)",
      brandName: "United E-Motor",
      segmentFocus: "Electric Two-Wheeler (TX3000, TX1800, T1800, MX1200)",
      statusInvestasi: "PMDN Terbuka (IDX: UNTD)",
      investors: [
        { name: "Keluarga Tan & Direksi Pendiri", share: "70.5%" },
        { name: "Publik / Investor Pasar Modal (BEI)", share: "29.5%" }
      ],
      totalAnnualCapacity: 120000,
      headquarters: "Citeureup, Bogor, Jawa Barat",
      plantLocations: [
        "Pabrik 1: Kawasan Industri Citeureup, Bogor (Pabrik Sepeda & E-Motor)",
        "Pabrik 2: Curug, Tangerang, Banten"
      ],
      manpower: 1800,
      tkdnStatus: "57.30% (Salah satu capaian TKDN motor listrik tertinggi di Indonesia)",
      supplyChainTier1: "Rangka baja lokal, vendor stamping dalam negeri, sistem kontroler terintegrasi",
      historicalNote: "Berakar dari merek sepeda legendaris United Bike sejak dekade 1990-an. Berhasil melakukan IPO di Bursa Efek Indonesia pada awal 2024 guna mendanai ekspansi pabrik motor listrik."
    },
    {
      id: "MFG-011",
      companyName: "PT Industri Baterai Indonesia (Indonesia Battery Corporation / IBC)",
      brandName: "IBC (BUMN Ekosistem Baterai)",
      segmentFocus: "Hulu ke Hilir Ekosistem Baterai EV: Penambangan Nikel, Smelter HPAL, Prekursor, Katoda, Sel Baterai, Pack, & Daur Ulang",
      statusInvestasi: "BUMN Konsorsium 4 Pilar (Holding Tambang, Minyak, Listrik)",
      investors: [
        { name: "PT Mineral Industri Indonesia (MIND ID)", share: "25.0%" },
        { name: "PT Aneka Tambang Tbk (ANTAM)", share: "25.0%" },
        { name: "PT Pertamina (Persero) melalui Pertamina NRE", share: "25.0%" },
        { name: "PT PLN (Persero)", share: "25.0%" }
      ],
      totalAnnualCapacity: "Fase 1: 10 GWh (~200.000 EV R4 / 2.000.000 EV R2) menuju 30 GWh",
      headquarters: "Gedung Energy, SCBD, Jakarta",
      plantLocations: [
        "Smelter & Refinery: Halmahera Timur & Konawe Utara",
        "Pabrik Sel Baterai (PT HLI Green Power): Karawang New Industry City (KNIC), Jawa Barat"
      ],
      manpower: 5000,
      tkdnStatus: "Kunci strategis peningkatan TKDN KBLBB nasional dari 40% menuju >80%",
      supplyChainTier1: "Kolaborasi dengan Konsorsium LG Energy Solution (Korea Selatan) dan Konsorsium CBL/CATL (Tiongkok)",
      historicalNote: "Didirikan Maret 2021 atas instruksi Presiden RI guna mengamankan nilai tambah hilirisasi nikel Indonesia agar Indonesia menjadi raja rantai pasok baterai global."
    }
  ],

  // 5. PROFILING KONSUMEN & MATRIKS PERILAKU PENGGUNA R2 INDONESIA
  // Reconciled from: LPEM FEB UI Survey, PwC Indonesia Automotive Study, BPS Sensus, OJK Multifinance Report
  consumerProfiles: [
    {
      personaId: "PER-001",
      personaName: "The Urban Commuter (Pekerja Harian Perkotaan)",
      targetShareOfMarket: "42.5%",
      primaryDemographics: "Pria & Wanita, 23-45 Tahun, SES B-C1 (Pengeluaran Rp 3.5jt - 8.5jt/bulan)",
      geography: "Jabodetabek, Surabaya Raya, Bandung Raya, Medan, Semarang",
      dailyMileageKm: "30 - 55 km/hari",
      currentVehicleChoice: "Skutik 110cc - 125cc (Honda BeAT, Vario 125, Scoopy, Yamaha Fazzio)",
      primaryUsage: "Perjalanan pulang-pergi kantor, antar anak sekolah, belanja harian",
      financingBehavior: "78% mengajukan kredit multifinance tenor 24-35 bulan; cicilan ideal Rp 700rb - 1.2jt/bulan",
      keyPurchaseDrivers: [
        "Efisiensi konsumsi BBM (target >50 km/liter)",
        "Kepraktisan transmisi matik di tengah kemacetan stop-and-go",
        "Ketersediaan bagasi bawah jok (helm-in) dan soket charger HP",
        "Jaminan harga jual kembali (resale value) tinggi saat butuh dana cepat"
      ],
      evAdoptionAttitude: "Tertarik karena biaya pengisian listrik jauh lebih hemat dibanding Pertalite (hemat Rp 150rb-300rb/bulan), namun masih menunda karena khawatir baterai cepat rusak dan belum ada fasilitas cas di parkiran apartemen/kost."
    },
    {
      personaId: "PER-002",
      personaName: "The Gig Economy Warrior (Driver Ojol & Kurir Logistik)",
      targetShareOfMarket: "18.0%",
      primaryDemographics: "Pria (dominant 92%), 21-50 Tahun, SES C2-D (Pendapatan harian berbasis trip)",
      geography: "Kota-kota tier 1 dan tier 2 di seluruh Indonesia",
      dailyMileageKm: "85 - 140 km/hari (Penggunaan sangat intensif)",
      currentVehicleChoice: "Skutik bandel hemat (Honda BeAT Fi, Vario 125 lama, Yamaha Mio M3)",
      primaryUsage: "Mengangkut penumpang ojek online (Grab/Gojek/Maxim) & kurir e-commerce kilat",
      financingBehavior: "Kredit harian/mingguan via kemitraan aplikasi atau leasing bekas, sangat sensitif terhadap nilai DP",
      keyPurchaseDrivers: [
        "Durabilitas mesin & sasis terhadap jalan rusak dan beban muatan",
        "Biaya perawatan berkala murah dan suku cadang melimpah di bengkel pinggir jalan manapun",
        "Waktu perbaikan cepat (motor mogok = hilang pendapatan hari itu)"
      ],
      evAdoptionAttitude: "Sangat menyukai sistem TUKAR BATERAI (Battery Swap seperti Smoot atau Swap Energi): Tidak perlu menunggu cas 3 jam, cukup 9 detik tukar baterai di minimarket dan langsung lanjut narik order."
    },
    {
      personaId: "PER-003",
      personaName: "Youth & Gen Z Lifestyle (Pelajar, Mahasiswa & Entry Jobbers)",
      targetShareOfMarket: "16.5%",
      primaryDemographics: "Pria & Wanita, 16-24 Tahun, Pelajar SMA, Mahasiswa, atau Pekerja Pertama",
      geography: "Pusat kota, kawasan kampus (Depok, Sleman, Jatinangor, Malang)",
      dailyMileageKm: "20 - 40 km/hari",
      currentVehicleChoice: "Skutik Retro Klasik & Sporty (Honda Scoopy, Yamaha Grand Filano, Fazzio, Honda Genio)",
      primaryUsage: "Kuliah, nongkrong kafe, aktivitas komunitas, flexing gaya hidup di media sosial",
      financingBehavior: "65% dibelikan/dicicil oleh orang tua; 35% menabung mandiri atau paylater",
      keyPurchaseDrivers: [
        "Desain estetika, pilihan warna pastel/duo-tone, dan keunikan bentuk lampu",
        "Fitur konektivitas digital (Smart Keyless, Bluetooth Y-Connect / Honda RoadSync)",
        "Kenyamanan posisi duduk dan bobot motor yang lincah diselap-selip"
      ],
      evAdoptionAttitude: "Paling terbuka dan antusias terhadap adopsi motor listrik (skor afinitas hijau 74%), menganggap EV sebagai simbol kemajuan teknologi dan gaya hidup ramah lingkungan."
    },
    {
      personaId: "PER-004",
      personaName: "The Rural Agro-Harvester (Masyarakat Pedesaan & Perkebunan)",
      targetShareOfMarket: "14.0%",
      primaryDemographics: "Pria & Wanita, 28-60 Tahun, Petani, Pekebun Sawit/Karet, Pedagang Pasar",
      geography: "Pedesaan Jawa, pedalaman Sumatera, Kalimantan, Sulawesi, NTT, NTB",
      dailyMileageKm: "35 - 70 km/hari (Jalur tanah, berbatu, tanjakan terjal perkebunan)",
      currentVehicleChoice: "Bebek Tradisional & Trail (Honda Revo Fit, Supra X 125, Yamaha Vega Force, Kawasaki KLX)",
      primaryUsage: "Mengangkut karung gabah, pupuk, hasil panen sawit, dan belanja logistik pasar kecamatan",
      financingBehavior: "Pembayaran tunai musiman pasca-panen (cash seasonal) atau cicilan lembaga kredit pedesaan",
      keyPurchaseDrivers: [
        "Kekuatan torsi tanjakan dan ketahanan rangka beban berat (>150 kg muatan)",
        "Kemudahan servis menggunakan obeng/kunci pas biasa tanpa perlu alat scanner komputer",
        "Ground clearance tinggi agar knalpot tidak kemasukan air saat melibas genangan/lumpur"
      ],
      evAdoptionAttitude: "Sangat skeptis terhadap EV: Ketiadaan stasiun cas di pelosok kebun, kekhawatiran dinamo terbakar saat menerobos banjir lumpur, serta jarak jauh antar-desa yang melebihi kapasitas baterai."
    },
    {
      personaId: "PER-005",
      personaName: "The Maxi & Sport Enthusiast (Pencinta Performa & Touring)",
      targetShareOfMarket: "9.0%",
      primaryDemographics: "Pria (dominant 94%), 25-50 Tahun, SES A-B (Pendapatan >Rp 10jt/bulan)",
      geography: "Kota-kota besar & koridor rute touring (Puncak, Jalur Pantura, Bali, Trans Jawa)",
      dailyMileageKm: "Harian 25 km, Akhir Pekan (Weekend Touring) 150 - 300 km",
      currentVehicleChoice: "Maxi Skutik 150-250cc & Sport Fairing (Yamaha NMAX Turbo, XMAX, Honda PCX 160, ADV 160, Ninja ZX-25R)",
      primaryUsage: "Mobilitas harian prestise, sunmori (Sunday Morning Ride), touring antarkota bersama klub",
      financingBehavior: "50% tunai keras (cash keras); 50% kredit tenor pendek dengan DP besar (>40%)",
      keyPurchaseDrivers: [
        "Tenaga mesin, akselerasi responsif, dan kestabilan sasis di kecepatan tinggi",
        "Kapasitas tangki BBM besar (>7 liter) untuk jarak tempuh jauh tanpa sering mampir SPBU",
        "Gengsi sosial, komunitas brotherhood kuat, dan potensi modifikasi aksesori aftermarket"
      ],
      evAdoptionAttitude: "Hanya melirik motor listrik performa tinggi (seperti Alva Cervo Boost Charge atau motor sport EV), namun mengeluhkan hilangnya sensasi raungan knalpot (*sound of engine*) dan terbatasnya daya jelajah touring."
    }
  ],

  // 6. ANALISIS PERBANDINGAN BIAYA KEPEMILIKAN (TCO - TOTAL COST OF OWNERSHIP)
  // Perhitungan riil berbasis 10.000 km penggunaan per tahun di Indonesia
  tcoComparison: [
    {
      vehicleType: "ICE Skutik Entry-Level (110cc - e.g. Honda BeAT)",
      purchasePrice: 18500000,
      energyCostPer10kKm: 2000000, // Asumsi 1L Pertalite Rp 10.000 menempuh 50 km = butuh 200 liter = Rp 2.000.000
      maintenanceCostPer10kKm: 650000, // Ganti oli mesin 4x, oli gardan 2x, busi, filter udara, kampas rem
      taxAdminPerYear: 320000, // PKB + SWDKLLJ
      depreciationYear1: 3500000, // Resale value stabil (~81%)
      totalCostYear1: 6470000,
      costPerKm: 647
    },
    {
      vehicleType: "ICE Skutik Maxi (155-160cc - e.g. Yamaha NMAX / PCX)",
      purchasePrice: 33500000,
      energyCostPer10kKm: 3350000, // Asumsi 1L Pertamax Rp 13.400 menempuh 40 km = butuh 250 liter = Rp 3.350.000
      maintenanceCostPer10kKm: 1100000, // Oli sintetik, v-belt, roller CVT, coolant radiator, kampas rem
      taxAdminPerYear: 580000, // PKB + SWDKLLJ
      depreciationYear1: 5800000, // Resale value stabil (~83%)
      totalCostYear1: 10830000,
      costPerKm: 1083
    },
    {
      vehicleType: "EV Baterai Swap (e.g. Smoot Tempur / Zuzu)",
      purchasePrice: 11500000, // Pasca subsidi Rp 7jt
      energyCostPer10kKm: 1600000, // Tarif kuota Swap km: ~Rp 160/km x 10.000 km = Rp 1.600.000 (bebas biaya beli baterai)
      maintenanceCostPer10kKm: 250000, // Hanya kampas rem dan minyak rem (tanpa oli mesin, tanpa filter, tanpa v-belt)
      taxAdminPerYear: 75000, // Bebas BBNKB, PKB 0% di DKI, hanya SWDKLLJ Rp 35.000 + admin
      depreciationYear1: 3000000, // Pasar motor bekas masih terdiskon
      totalCostYear1: 4925000,
      costPerKm: 493
    },
    {
      vehicleType: "EV Direct Home Charging (e.g. Polytron Fox-R / ALVA Cervo)",
      purchasePrice: 13500000, // Fox-R pasca subsidi skema sewa baterai
      energyCostPer10kKm: 450000, // Konsumsi listrik ~3 kWh / 100 km x tarif PLN Rp 1.444,70/kWh x 100 = ~Rp 433.000
      maintenanceCostPer10kKm: 250000, // Kampas rem, ban, cek software
      taxAdminPerYear: 75000, // Bebas PKB & BBNKB
      depreciationYear1: 3200000,
      batteryRentPerYear: 2400000, // Sewa baterai Rp 200rb x 12 bulan (garansi seumur hidup dari pabrikan)
      totalCostYear1: 6375000,
      costPerKm: 638
    }
  ],

  // 7. KAMUS DATA & METADATA SEKUNDER (DATA DICTIONARY)
  // Definisi operasional, metodologi pengumpulan, frekuensi pembaruan, dan reliabilitas
  dataDictionary: [
    {
      fieldId: "IND-01",
      variableName: "Penjualan Domestik (Domestic Wholesales)",
      definition: "Jumlah unit sepeda motor baru yang didistribusikan dari pabrik manufaktur perakitan ke jaringan dealer resmi di seluruh wilayah Indonesia dalam periode kalender satu tahun.",
      unit: "Unit",
      frequency: "Bulanan & Tahunan",
      dataOwner: "AISI (Asosiasi Industri Sepedamotor Indonesia)",
      methodology: "Laporan mandiri resmi (Self-reporting Census) dari 5 anggota aktif AISI (Honda, Yamaha, Suzuki, Kawasaki, TVS). Mulai 2023 dilengkapi data pendaftaran AISMOLI.",
      reliabilityRating: "Sangat Tinggi (A1 - Standar Industri Resmi)"
    },
    {
      fieldId: "IND-02",
      variableName: "Ekspor Sepeda Motor CBU (Completely Built-Up)",
      definition: "Volume unit sepeda motor utuh siap pakai yang diproduksi di pabrik Indonesia dan dikapalkan ke negara tujuan ekspor di Asia Tenggara, Amerika Latin, Eropa, dan Afrika.",
      unit: "Unit",
      frequency: "Bulanan & Tahunan",
      dataOwner: "AISI & BPS (HS Code 8711)",
      methodology: "Data manifes kepabeanan ekspor Ditjen Bea Cukai Kemenkeu yang direkonsiliasi dengan data asosiasi.",
      reliabilityRating: "Sangat Tinggi (A1 - Bea Cukai / BPS)"
    },
    {
      fieldId: "IND-03",
      variableName: "Total Populasi Sepeda Motor Aktif Nasional",
      definition: "Jumlah akumulasi unit sepeda motor yang tercatat dalam buku registrasi kepemilikan kendaraan bermotor nasional dan memiliki status registrasi aktif di Samsat/Korlantas.",
      unit: "Unit",
      frequency: "Tahunan",
      dataOwner: "Korlantas Polri (Sistem ERI) & BPS Statistik Transportasi Darat",
      methodology: "Agregasi data Surat Tanda Nomor Kendaraan (STNK) dan Buku Pemilik Kendaraan Bermotor (BPKB) seluruh Polda di 38 provinsi.",
      reliabilityRating: "Tinggi (BPS / Korlantas Polri)"
    },
    {
      fieldId: "IND-04",
      variableName: "Tingkat Komponen Dalam Negeri (TKDN)",
      definition: "Persentase nilai kandungan lokal pada sebuah produk kendaraan bermotor yang dihitung berdasarkan komponen material lokal, proses manufaktur, tenaga kerja dalam negeri, dan investasi R&D.",
      unit: "Persen (%)",
      frequency: "Per Rilis Sertifikat Uji",
      dataOwner: "P3DN Kementerian Perindustrian & Surveyor Independen (PT Sucofindo / PT Surveyor Indonesia)",
      methodology: "Verifikasi faktual audit fisik fasilitas manufaktur berdasarkan formula Permenperin No. 6/2022.",
      reliabilityRating: "Sangat Tinggi (Statutori Pemerintah RI)"
    },
    {
      fieldId: "IND-05",
      variableName: "Pangsa Segmen Skutik (Scooter Market Share)",
      definition: "Proporsi volume penjualan sepeda motor bertransmisi otomatis (*Continuously Variable Transmission* / CVT) terhadap total penjualan sepeda motor domestik.",
      unit: "Persen (%)",
      frequency: "Tahunan",
      dataOwner: "AISI",
      methodology: "Penjumlahan unit skutik dibagi total penjualan domestik seluruh jenis dikali 100%.",
      reliabilityRating: "Sangat Tinggi"
    }
  ],

  // 8. DATA DISTRIBUSI SPASIAL REGIONAL (38 PROVINSI INDONESIA)
  // Sumber: BPS Statistik Transportasi Darat & Korlantas Polri Electronic Registration and Identification (ERI)
  provincialData: [
    // JAWA & BALI (Pusat Konsentrasi Populasi R2 Terbesar ~62%)
    { code: "31", province: "DKI Jakarta", island: "Jawa", motorcyclePop: 17850000, nationalShare: 12.56, bbnkbEvIncentive: "0% (Pergub 3/2020 Bebas 100%)", dominantType: "Skutik (BeAT, Vario, NMAX, PCX)" },
    { code: "32", province: "Jawa Barat", island: "Jawa", motorcyclePop: 18920000, nationalShare: 13.31, bbnkbEvIncentive: "Diskon 100% BBNKB EV", dominantType: "Skutik & Sport Harian" },
    { code: "33", province: "Jawa Tengah", island: "Jawa", motorcyclePop: 16450000, nationalShare: 11.58, bbnkbEvIncentive: "Diskon BBNKB & Bebas PKB EV", dominantType: "Skutik & Cub Komuter" },
    { code: "35", province: "Jawa Timur", island: "Jawa", motorcyclePop: 19800000, nationalShare: 13.93, bbnkbEvIncentive: "Pembebasan Bea Balik Nama EV", dominantType: "Skutik & Bebek Niaga" },
    { code: "36", province: "Banten", island: "Jawa", motorcyclePop: 6350000, nationalShare: 4.47, bbnkbEvIncentive: "Insentif Pajak Hijau", dominantType: "Skutik Komuter Industri" },
    { code: "34", province: "DI Yogyakarta", island: "Jawa", motorcyclePop: 2380000, nationalShare: 1.67, bbnkbEvIncentive: "Bebas PKB Khusus KBLBB", dominantType: "Skutik Retro (Scoopy, Fazzio)" },
    { code: "51", province: "Bali", island: "Bali & Nusa Tenggara", motorcyclePop: 3750000, nationalShare: 2.64, bbnkbEvIncentive: "Pergub Bali 45/2019 Energi Bersih", dominantType: "Skutik Rental Wisata & EV" },
    { code: "52", province: "Nusa Tenggara Barat", island: "Bali & Nusa Tenggara", motorcyclePop: 1820000, nationalShare: 1.28, bbnkbEvIncentive: "Insentif Standar Nasional", dominantType: "Skutik & Bebek" },
    { code: "53", province: "Nusa Tenggara Timur", island: "Bali & Nusa Tenggara", motorcyclePop: 1150000, nationalShare: 0.81, bbnkbEvIncentive: "Insentif Standar Nasional", dominantType: "Bebek & Trail Agraria" },

    // SUMATERA (Pangsa Pasar Terbesar Kedua ~19%)
    { code: "12", province: "Sumatera Utara", island: "Sumatera", motorcyclePop: 7120000, nationalShare: 5.01, bbnkbEvIncentive: "Pengurangan Pajak EV", dominantType: "Skutik & Bebek Perkebunan" },
    { code: "14", province: "Riau", island: "Sumatera", motorcyclePop: 4180000, nationalShare: 2.94, bbnkbEvIncentive: "Insentif Standar Nasional", dominantType: "Skutik & Trail Sawit" },
    { code: "16", province: "Sumatera Selatan", island: "Sumatera", motorcyclePop: 4320000, nationalShare: 3.04, bbnkbEvIncentive: "Insentif Standar Nasional", dominantType: "Skutik & Bebek" },
    { code: "18", province: "Lampung", island: "Sumatera", motorcyclePop: 4050000, nationalShare: 2.85, bbnkbEvIncentive: "Insentif Standar Nasional", dominantType: "Bebek & Skutik Komuter" },
    { code: "13", province: "Sumatera Barat", island: "Sumatera", motorcyclePop: 2680000, nationalShare: 1.89, bbnkbEvIncentive: "Insentif Standar Nasional", dominantType: "Skutik & Sport" },
    { code: "11", province: "Aceh", island: "Sumatera", motorcyclePop: 2410000, nationalShare: 1.70, bbnkbEvIncentive: "Insentif Standar Nasional", dominantType: "Bebek & Skutik" },
    { code: "15", province: "Jambi", island: "Sumatera", motorcyclePop: 2150000, nationalShare: 1.51, bbnkbEvIncentive: "Insentif Standar Nasional", dominantType: "Trail Sawit & Bebek" },
    { code: "17", province: "Bengkulu", island: "Sumatera", motorcyclePop: 1120000, nationalShare: 0.79, bbnkbEvIncentive: "Insentif Standar Nasional", dominantType: "Bebek & Skutik" },
    { code: "19", province: "Kepulauan Bangka Belitung", island: "Sumatera", motorcyclePop: 980000, nationalShare: 0.69, bbnkbEvIncentive: "Insentif Standar Nasional", dominantType: "Skutik Pesisir" },
    { code: "21", province: "Kepulauan Riau", island: "Sumatera", motorcyclePop: 1250000, nationalShare: 0.88, bbnkbEvIncentive: "Kawasan Bebas Batam (FTZ)", dominantType: "Skutik Kota & Impor CBU" },

    // KALIMANTAN (Pangsa Pasar Berkaitan Siklus Tambang & Sawit ~7%)
    { code: "64", province: "Kalimantan Timur", island: "Kalimantan", motorcyclePop: 3100000, nationalShare: 2.18, bbnkbEvIncentive: "Zona Khusus IKN Nusantara (EV 100%)", dominantType: "Skutik Maxi & Trail Tambang" },
    { code: "61", province: "Kalimantan Barat", island: "Kalimantan", motorcyclePop: 2540000, nationalShare: 1.79, bbnkbEvIncentive: "Insentif Standar Nasional", dominantType: "Bebek & Skutik" },
    { code: "63", province: "Kalimantan Selatan", island: "Kalimantan", motorcyclePop: 2380000, nationalShare: 1.67, bbnkbEvIncentive: "Insentif Standar Nasional", dominantType: "Skutik & Underbone" },
    { code: "62", province: "Kalimantan Tengah", island: "Kalimantan", motorcyclePop: 1420000, nationalShare: 1.00, bbnkbEvIncentive: "Insentif Standar Nasional", dominantType: "Trail & Bebek Sawit" },
    { code: "65", province: "Kalimantan Utara", island: "Kalimantan", motorcyclePop: 410000, nationalShare: 0.29, bbnkbEvIncentive: "Kawasan Industri Hijau KIPI", dominantType: "Trail & Skutik" },

    // SULAWESI (Booming Hilirisasi Nikel & Perkebunan ~7%)
    { code: "73", province: "Sulawesi Selatan", island: "Sulawesi", motorcyclePop: 4620000, nationalShare: 3.25, bbnkbEvIncentive: "Insentif Standar Pemprov", dominantType: "Skutik Maxi & Underbone" },
    { code: "71", province: "Sulawesi Utara", island: "Sulawesi", motorcyclePop: 1350000, nationalShare: 0.95, bbnkbEvIncentive: "Insentif Standar Pemprov", dominantType: "Skutik & Sport" },
    { code: "72", province: "Sulawesi Tengah", island: "Sulawesi", motorcyclePop: 1580000, nationalShare: 1.11, bbnkbEvIncentive: "Insentif Kawasan Morowali", dominantType: "Skutik Pekerja Smelter" },
    { code: "74", province: "Sulawesi Tenggara", island: "Sulawesi", motorcyclePop: 1290000, nationalShare: 0.91, bbnkbEvIncentive: "Insentif Kawasan Industri", dominantType: "Skutik & Bebek" },
    { code: "75", province: "Gorontalo", island: "Sulawesi", motorcyclePop: 560000, nationalShare: 0.39, bbnkbEvIncentive: "Insentif Standar Nasional", dominantType: "Bebek & Bentor R3" },
    { code: "76", province: "Sulawesi Barat", island: "Sulawesi", motorcyclePop: 580000, nationalShare: 0.41, bbnkbEvIncentive: "Insentif Standar Nasional", dominantType: "Bebek Kakao/Sawit" },

    // MALUKU & PAPUA (~2%)
    { code: "81", province: "Maluku", island: "Maluku & Papua", motorcyclePop: 620000, nationalShare: 0.44, bbnkbEvIncentive: "Insentif Standar Nasional", dominantType: "Skutik Kepulauan" },
    { code: "82", province: "Maluku Utara", island: "Maluku & Papua", motorcyclePop: 590000, nationalShare: 0.42, bbnkbEvIncentive: "Kawasan Hilirisasi Weda Bay", dominantType: "Skutik & Trail Pekerja" },
    { code: "91", province: "Papua", island: "Maluku & Papua", motorcyclePop: 780000, nationalShare: 0.55, bbnkbEvIncentive: "Insentif Standar Pemprov", dominantType: "Skutik & Bebek Pesisir" },
    { code: "92", province: "Papua Barat", island: "Maluku & Papua", motorcyclePop: 460000, nationalShare: 0.32, bbnkbEvIncentive: "Insentif Standar Pemprov", dominantType: "Skutik & Trail" },
    { code: "93", province: "Papua Selatan", island: "Maluku & Papua", motorcyclePop: 240000, nationalShare: 0.17, bbnkbEvIncentive: "Insentif Standar Nasional", dominantType: "Bebek & Trail Agraria" },
    { code: "94", province: "Papua Tengah", island: "Maluku & Papua", motorcyclePop: 310000, nationalShare: 0.22, bbnkbEvIncentive: "Insentif Standar Nasional", dominantType: "Trail Pegunungan" },
    { code: "95", province: "Papua Pegunungan", island: "Maluku & Papua", motorcyclePop: 180000, nationalShare: 0.13, bbnkbEvIncentive: "Insentif Standar Nasional", dominantType: "Trail Dual-Purpose" },
    { code: "96", province: "Papua Barat Daya", island: "Maluku & Papua", motorcyclePop: 340000, nationalShare: 0.24, bbnkbEvIncentive: "Kawasan Pesisir Sorong", dominantType: "Skutik Perkotaan" }
  ],

  // 9. ARSIP LIPUTAN & REKAM JEJAK MEDIA BEREPUTASI BAIK (1990 - 2026)
  // Menghimpun arsip Kompas, Bisnis Indonesia, Kontan, Tempo, CNBC Indonesia, Bloomberg
  mediaArchives: [
    {
      year: 1995,
      media: "Harian Kompas",
      headline: "Sejarah Baru: Penjualan Sepeda Motor Nasional Tembus 1 Juta Unit dalam Setahun",
      category: "Milestone Penjualan",
      summary: "Perekonomian nasional yang tumbuh stabil di atas 7% memicu lonjakan kepemilikan sepeda motor kelas pekerja. Honda Astrea Grand dan Suzuki Crystal memimpin pasar.",
      citationRef: "Kompas Edisi Desember 1995"
    },
    {
      year: 1998,
      media: "Bisnis Indonesia",
      headline: "Krismon Menghantam Industri Otomotif: Penjualan Motor Rontok Hingga 76%",
      category: "Krisis Finansial",
      summary: "Nilai tukar rupiah yang anjlok ke Rp 16.000 per dolar AS dan lonjakan suku bunga kredit melumpuhkan daya beli masyarakat. Pabrikan merumahkan ribuan buruh perakitan.",
      citationRef: "Bisnis Indonesia Edisi September 1998"
    },
    {
      year: 2000,
      media: "Majalah SWA & Warta Ekonomi",
      headline: "Gelombang Serbuan Motor China: Menantang Hegemoni Jepang dengan Harga Separuh",
      category: "Disrupsi Pasar",
      summary: "Merek-merek Mocin seperti Jincheng, Sanex, dan Loncin membanjiri kota dan desa di Indonesia dengan harga Rp 5-7 juta, memaksa Honda dan Yamaha meluncurkan varian ekonomis.",
      citationRef: "SWA Sembada No. 14/2000"
    },
    {
      year: 2004,
      media: "Harian Kontan",
      headline: "Yamaha Mio Meluncur: Mengubah Stigma Motor Matik dan Menggaet Pengendara Wanita",
      category: "Inovasi Produk",
      summary: "Yamaha memelopori kampanye matik ramah wanita yang menjadi titik awal ledakan tren transmisi otomatis di tanah air, mengikis dominasi motor bebek.",
      citationRef: "Kontan Edisi Februari 2004"
    },
    {
      year: 2011,
      media: "Investor Daily & DetikOto",
      headline: "Puncak Keemasan: Penjualan Sepeda Motor Indonesia Capai Rekor Tertinggi 8,04 Juta Unit",
      category: "All-Time Record Peak",
      summary: "Didukung ledakan harga komoditas perkebunan dan tambang serta kemudahan kredit uang muka sangat rendah, pasar sepeda motor Indonesia menjadi yang terbesar ke-3 di dunia setelah China dan India.",
      citationRef: "Investor Daily Edisi Januari 2012"
    },
    {
      year: 2012,
      media: "Harian Kompas",
      headline: "Bank Indonesia & Bapepam Tetapkan DP Kredit Motor Minimal 20-25 Persen",
      category: "Regulasi Keuangan",
      summary: "Pemerintah dan otoritas moneter mengerem laju kredit bermasalah (NPL) dengan melarang skema DP nol rupiah pada perusahaan multifinance pembiayaan kendaraan.",
      citationRef: "Kompas Edisi Maret 2012"
    },
    {
      year: 2015,
      media: "Otomotif Group / GridOto",
      headline: "Lahirnya Fenomena Skutik Maxi: Yamaha NMAX Membuka Segmen Baru Kelas Menengah",
      category: "Pergeseran Gaya Hidup",
      summary: "Kehadiran NMAX 155 dengan sistem pengereman ABS di bawah Rp 30 juta menciptakan standar baru motor harian berposisi kaki selonjoran yang sangat diminati profesional muda.",
      citationRef: "Tabloid Otomotif No. 42/XXIV"
    },
    {
      year: 2019,
      media: "CNBC Indonesia",
      headline: "Jokowi Teken Perpres 55/2019: Era Baru Percepatan Motor & Mobil Listrik Dimulai",
      category: "Regulasi Elektrifikasi",
      summary: "Pemerintah menetapkan peta jalan transisi energi bersih dengan insentif fiskal dan penugasan BUMN untuk membangun rantai pasok industri baterai dari bijih nikel lokal.",
      citationRef: "CNBC Indonesia 12 Agustus 2019"
    },
    {
      year: 2020,
      media: "Katadata & Bisnis Indonesia",
      headline: "Pandemi COVID-19 Memukul Telak: Pasar Sepeda Motor Domestik Anjlok 43,6 Persen",
      category: "Dampak Pandemi",
      summary: "Pembatasan Sosial Berskala Besar (PSBB) dan pengetatan likuiditas perusahaan pembiayaan menekan penjualan tahunan ke titik terendah sejak tahun 2004.",
      citationRef: "Katadata Edisi Desember 2020"
    },
    {
      year: 2023,
      media: "Bloomberg Technoz & Tempo",
      headline: "Pemerintah Rombak Syarat Subsidi Motor Listrik Rp 7 Juta: Kini Cukup Modal 1 KTP",
      category: "Kebijakan Subsidi",
      summary: "Menteri Perindustrian Agus Gumiwang menerbitkan Permenperin 21/2023 yang mencabut 4 syarat pembatasan bansos; setiap WNI pemilik NIK berhak membeli 1 unit motor listrik ber-TKDN 40%.",
      citationRef: "Tempo.co 29 Agustus 2023"
    },
    {
      year: 2024,
      media: "Bisnis Indonesia",
      headline: "Pabrik Sel Baterai Karawang HLI Green Power Mulai Beroperasi: Perkuat TKDN Motor Listrik",
      category: "Investasi Rantai Pasok",
      summary: "Fasilitas sel baterai konsorsium Hyundai-LG-IBC berkapasitas 10 GWh resmi memproduksi sel baterai di Karawang, mendorong lonjakan komponen lokal motor listrik melampaui 60%.",
      citationRef: "Bisnis Indonesia Juli 2024"
    },
    {
      year: 2025,
      media: "Kontan & CNBC Indonesia",
      headline: "Subsidi Konversi ESDM Naik Jadi Rp 10 Juta: Targetkan Ratusan Bengkel Resmi Tersertifikasi",
      category: "Konversi Energi",
      summary: "Pemerintah mempercepat penyerapan konversi motor bensin lama ke listrik bagi pengemudi ojol dan ASN, didukung kemudahan penerbitan SUT/SRUT kilat dari Kementerian Perhubungan.",
      citationRef: "Kontan Analisis Energi 2025"
    }
  ],

  // 10. PELACAK REALISASI SUBSIDI KBLBB SISAPIRa (PERMENPERIN 21/2023)
  // Data rekapitulasi penyaluran bantuan subsidi pemerintah Rp 7.000.000 per unit
  subsidyTracker: {
    statutoryQuotaUnit: 200000,
    subsidyAmountPerUnit: 7000000,
    legalBasis: "Permenperin No. 21 Tahun 2023 jo. Permenperin No. 6 Tahun 2023",
    verificationPlatform: "SISAPIRa (Sistem Informasi Pemberian Bantuan Pembelian KBLBB R2)",
    eligibilityRule: "1 NIK KTP untuk 1 Pembelian Motor Listrik Baru ber-TKDN >= 40%",
    topBeneficiaryModels: [
      { brand: "Polytron", model: "Fox-R & Fox-S", tkdnPercent: 45.31, registeredUnits: 42500, priceAfterSubsidy: "Rp 13.500.000" },
      { brand: "Smoot", model: "Zuzu & Tempur", tkdnPercent: 41.80, registeredUnits: 18200, priceAfterSubsidy: "Rp 12.900.000" },
      { brand: "ALVA", model: "One & Cervo", tkdnPercent: 44.00, registeredUnits: 15600, priceAfterSubsidy: "Rp 27.750.000" },
      { brand: "Gesits", model: "Raya G & G1", tkdnPercent: 46.73, registeredUnits: 12400, priceAfterSubsidy: "Rp 20.900.000" },
      { brand: "United E-Motor", model: "TX1800 & MX1200", tkdnPercent: 57.30, registeredUnits: 9800, priceAfterSubsidy: "Rp 8.800.000 (MX)" },
      { brand: "Volta", model: "401 & Mandala", tkdnPercent: 47.60, registeredUnits: 8900, priceAfterSubsidy: "Rp 11.950.000" },
      { brand: "Yadea", model: "T9 & E8S Pro", tkdnPercent: 40.00, registeredUnits: 6500, priceAfterSubsidy: "Rp 14.500.000" },
      { brand: "Selis", model: "Agats & E-Max", tkdnPercent: 53.37, registeredUnits: 4800, priceAfterSubsidy: "Rp 15.900.000" }
    ]
  },

  // 11. MATRIKS KOMPARASI 6 TIPE KENDARAAN RODA DUA DI INDONESIA
  typesComparison: [
    {
      category: "ICE - Bebek / Cub",
      subTypes: "Entry Cub (110cc) & Hyper Underbone (150cc)",
      engineSpec: "110cc - 150cc 4-Tak SOHC/DOHC Injeksi",
      fuelOrEnergy: "Pertalite / Pertamax (~50-65 km/Liter)",
      priceRange: "Rp 16.500.000 - Rp 31.000.000",
      pros: "Sangat irit bahan bakar, torsi tanjakan kuat, sasis tangguh jalan rusak pedesaan, servis murah meriah.",
      cons: "Kapasitas bagasi kecil, posisi kaki kurang rileks dibanding skutik, nilai gengsi sosial menurun.",
      idealBuyer: "Masyarakat pedesaan, kurir barang logistik, pedagang pasar, petani perkebunan."
    },
    {
      category: "ICE - Skutik Entry (Matic)",
      subTypes: "Entry-Level (110-125cc)",
      engineSpec: "110cc - 125cc eSP / Blue Core CVT Otomatis",
      fuelOrEnergy: "Pertalite / Pertamax (~48-60 km/Liter)",
      priceRange: "Rp 18.400.000 - Rp 23.500.000",
      pros: "Sangat praktis tanpa oper gigi, lincah bermanuver di kemacetan, resale value tertinggi di pasar bekas, suku cadang melimpah.",
      cons: "Kapasitas tangki kecil (~4 liter), rem belakang tromol pada varian dasar, performa terbatas jalan menanjak curam.",
      idealBuyer: "Pekerja komuter harian perkotaan, pelajar SMA/mahasiswa, ibu rumah tangga, driver ojek online."
    },
    {
      category: "ICE - Skutik Maxi",
      subTypes: "Medium to High Maxi (150-250cc)",
      engineSpec: "155cc - 250cc Liquid Cooled VVA / 4-Valve CVT",
      fuelOrEnergy: "Pertamax / RON 92+ (~35-45 km/Liter)",
      priceRange: "Rp 32.500.000 - Rp 66.000.000",
      pros: "Kenyamanan berkendara jarak jauh superior (posisi kaki selonjoran), bagasi helm-in muat 2 helm, fitur ABS & kontrol traksi.",
      cons: "Bobot motor lebih berat (>130 kg), dimensi lebar menyulitkan selap-selip macet ekstrem, harga dan pajak tahunan lebih tinggi.",
      idealBuyer: "Profesional muda, eksekutif, penghobi touring antarkota, komunitas klub motor."
    },
    {
      category: "ICE - Sport & Adventure",
      subTypes: "Sport Fairing, Naked Bike, & Dual-Purpose Trail (150-250cc)",
      engineSpec: "150cc - 250cc (1 hingga 4 Silinder) Transmisi Manual 6-Percepatan",
      fuelOrEnergy: "Pertamax / Pertamax Turbo (~25-40 km/Liter)",
      priceRange: "Rp 30.000.000 - Rp 115.000.000+",
      pros: "Tenaga mesin maksimal, handling presisi sasis teralis/deltabox, kemampuan melibas jalur tanah off-road (Trail KLX/CRF/WR).",
      cons: "Posisi berkendara membungkuk cepat lelah di kemacetan, tanpa ruang bagasi penyimpanan, kopling manual melelahkan saat macet.",
      idealBuyer: "Pencinta kecepatan (speed enthusiasts), penjelajah alam & pekerja tambang/perkebunan (Trail), hobi sunmori."
    },
    {
      category: "EV - Battery Swap (KBLBB)",
      subTypes: "Urban Commuter Electric Moped & Scooter",
      engineSpec: "Motor Listrik Hub-Drive / Mid-Drive 1.500W - 3.000W",
      fuelOrEnergy: "Baterai Swap LFP/NMC (Tukar Baterai 9 Detik di SPBKLU)",
      priceRange: "Rp 11.500.000 - Rp 18.000.000 (Pasca Subsidi Rp 7jt)",
      pros: "Tanpa waktu tunggu cas (0 menit), biaya pembelian awal sangat murah (tanpa beli baterai), biaya operasional Rp 160/km.",
      cons: "Tergantung pada kepadatan stasiun swap di sekitar tempat tinggal, kecepatan puncak moderat (60-75 km/jam).",
      idealBuyer: "Driver ojek online intensif jarak tempuh tinggi (>80 km/hari), komuter kota metropolitan."
    },
    {
      category: "EV - Direct Cable Charging",
      subTypes: "Smart High-Performance Electric Scooter",
      engineSpec: "Mid-Drive Motor 3.000W - 5.400W dengan Pendingin Udara/Cairan",
      fuelOrEnergy: "Baterai Tertanam (Colok Listrik Rumah 220V / Fast Charging Station)",
      priceRange: "Rp 13.500.000 - Rp 35.000.000 (Pasca Subsidi Rp 7jt)",
      pros: "Bisa dicas di rumah malam hari saat tarif diskon PLN, performa akselerasi instan torsi tinggi, fitur konektivitas aplikasi canggih.",
      cons: "Membutuhkan waktu cas 3-5 jam di rumah, butuh instalasi colokan listrik memadai (daya rumah minimal 1.300 VA).",
      idealBuyer: "Pekerja kantoran dengan garasi rumah pribadi, penggemar teknologi baru (early adopters), Gen Z eco-conscious."
    }
  ]
};

// Pastikan data dapat diakses baik di browser maupun di Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = I2W_DATA;
}

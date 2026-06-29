import { Truck } from './types';

export const INITIAL_TRUCKS: Truck[] = [
  {
    id: '1',
    brand: 'Hino',
    name: 'HINO RANGER FL 260 JW (6x2) WINGBOX',
    lotNo: 'LOT 101',
    grade: 'B+',
    year: 2021,
    km: 145210,
    transmission: 'Manual',
    location: 'Jakarta (Pool Cilincing)',
    documents: 'BPKB + STNK Ready (Pajak Hidup)',
    bbm: 'Solar (Diesel)',
    basePrice: 585000000,
    imageUrl: 'https://lh3.googleusercontent.com/d/1SQeQ5bRPwAuVpnWIBcMTPz-HyPHi_iRu',
    gallery: [
      'https://lh3.googleusercontent.com/d/1SQeQ5bRPwAuVpnWIBcMTPz-HyPHi_iRu'
    ],
    category: 'Wingbox',
    status: 'Live Terbuka',
    specs: {
      engineModel: 'J08E-WD Turbo Intercooler',
      displacement: '7,684 cc',
      horsePower: '260 PS',
      wheelbase: '4,300 + 1,300 mm',
      maxGvw: '26,000 kg',
      chassisNumber: 'MHFKGD8A3MHXXXXXX',
      engineNumber: 'J08E-WDXXXXXX'
    },
    gradeBreakdown: {
      interior: 'B',
      exterior: 'B+',
      engine: 'A',
      undercarriage: 'B',
      notes: 'Mesin sangat terawat, kebocoran oli nihil, AC kabin berfungsi dingin, ban luar tebal 85%, wingbox hidrolik berfungsi lancar.'
    }
  },
  {
    id: '2',
    brand: 'Mitsubishi Fuso',
    name: 'MITSUBISHI FUSO FIGHTER FN 62 F TRACTOR HEAD (6x4)',
    lotNo: 'LOT 102',
    grade: 'A',
    year: 2022,
    km: 84320,
    transmission: 'Manual',
    location: 'Jakarta (Pool Cilincing)',
    documents: 'Lengkap (BPKB, STNK, KIR Aktif)',
    bbm: 'Solar (Diesel)',
    basePrice: 720000000,
    imageUrl: 'https://lh3.googleusercontent.com/d/1PA8AFO7HDNJGdC2eqgm1ILVfq2XZYNtZ',
    gallery: [
      'https://lh3.googleusercontent.com/d/1PA8AFO7HDNJGdC2eqgm1ILVfq2XZYNtZ'
    ],
    category: 'Tractor Head',
    status: 'Live Terbuka',
    specs: {
      engineModel: '6M60-DAT5 Common Rail',
      displacement: '7,545 cc',
      horsePower: '270 PS',
      wheelbase: '3,800 + 1,350 mm',
      maxGvw: '36,000 kg (GCW)',
      chassisNumber: 'MHYF8FN10MHXXXXXX',
      engineNumber: '6M60-XXXXXX'
    },
    gradeBreakdown: {
      interior: 'A',
      exterior: 'A',
      engine: 'A',
      undercarriage: 'A',
      notes: 'Kondisi mulus orisinal, chassis lurus tanpa las, panel interior lengkap, rem ABS berfungsi normal, ban dual 10 roda kondisi 90%.'
    }
  },
  {
    id: '3',
    brand: 'Isuzu',
    name: 'ISUZU GIGA FVZ 34 N HP DUMP TRUCK (6x4)',
    lotNo: 'LOT 103',
    grade: 'B',
    year: 2020,
    km: 112500,
    transmission: 'Manual',
    location: 'Surabaya (Pool Gresik)',
    documents: 'BPKB Ready (STNK Telat 3 Bulan)',
    bbm: 'Solar (Diesel)',
    basePrice: 590000000,
    imageUrl: 'https://lh3.googleusercontent.com/d/1VNC6fFS3AT48aUGY7wkd6xEw3o5-tq3J',
    gallery: [
      'https://lh3.googleusercontent.com/d/1VNC6fFS3AT48aUGY7wkd6xEw3o5-tq3J'
    ],
    category: 'Dump Truck',
    status: 'Live Terbuka',
    specs: {
      engineModel: '6HK1-TCS Heavy Duty Diesel',
      displacement: '7,790 cc',
      horsePower: '285 PS',
      wheelbase: '4,100 + 1,300 mm',
      maxGvw: '26,000 kg',
      chassisNumber: 'MHFJXZ34LMXXXXXXX',
      engineNumber: '6HK1-XXXXXX'
    },
    gradeBreakdown: {
      interior: 'B',
      exterior: 'B',
      engine: 'B+',
      undercarriage: 'B',
      notes: 'Hidrolik dump lancar jaya, bak besi cor ketebalan 8mm siap tambang/quarry, ada baret pemakaian di bumper depan, suspensi per daun kokoh.'
    }
  },
  {
    id: '4',
    brand: 'Scania',
    name: 'SCANIA P360-A TRACTOR HEAD HEAVY DUTY (6x4)',
    lotNo: 'LOT 104',
    grade: 'A+',
    year: 2019,
    km: 210900,
    transmission: 'Automatic',
    location: 'Surabaya (Pool Gresik)',
    documents: 'Lengkap (BPKB, STNK, Bea Cukai Clear)',
    bbm: 'Solar (Diesel)',
    basePrice: 980000000,
    imageUrl: 'https://lh3.googleusercontent.com/d/1chdpgnLq6GQBqsy-HYPpfuvO6_yYB9uF',
    gallery: [
      'https://lh3.googleusercontent.com/d/1chdpgnLq6GQBqsy-HYPpfuvO6_yYB9uF'
    ],
    category: 'Tractor Head',
    status: 'Segera Mulai',
    specs: {
      engineModel: 'DC13 108 Euro 4 SCANIA Injection',
      displacement: '13,000 cc',
      horsePower: '360 HP',
      wheelbase: '3,200 + 1,450 mm',
      maxGvw: '46,000 kg (GCW)',
      chassisNumber: 'YS2P6X4000XXXXXX',
      engineNumber: 'DC13XXXXXX'
    },
    gradeBreakdown: {
      interior: 'A',
      exterior: 'A+',
      engine: 'A+',
      undercarriage: 'A',
      notes: 'Tipe Opticruise Transmission (Matic pintar Scania), cabin suspension balon udara prima, jok elektis, cruise control jalan, history maintenance dealer resmi Scania.'
    }
  },
  {
    id: '5',
    brand: 'Mitsubishi Fuso',
    name: 'MITSUBISHI FUSO CANTER FE 74 HD LIGHT TRUCK',
    lotNo: 'LOT 105',
    grade: 'C',
    year: 2018,
    km: 285400,
    transmission: 'Manual',
    location: 'Medan (Pool Belawan)',
    documents: 'STNK Hilang (Hanya BPKB & Surat Kehilangan)',
    bbm: 'Solar (Diesel)',
    basePrice: 185000000,
    imageUrl: 'https://lh3.googleusercontent.com/d/12IBeMcewvR0BF0ZibgAS_0syKnxJNzYy',
    gallery: [
      'https://lh3.googleusercontent.com/d/12IBeMcewvR0BF0ZibgAS_0syKnxJNzYy'
    ],
    category: 'Box Rigit',
    status: 'Segera Mulai',
    specs: {
      engineModel: '4D34-2AT8 Turbo Diesel',
      displacement: '3,908 cc',
      horsePower: '125 PS',
      wheelbase: '3,350 mm',
      maxGvw: '8,250 kg',
      chassisNumber: 'MHYFE74HD9XXXXXX',
      engineNumber: '4D34-XXXXXX'
    },
    gradeBreakdown: {
      interior: 'C',
      exterior: 'C',
      engine: 'B',
      undercarriage: 'B-',
      notes: 'Bak kayu drop-side multi-fungsi, performa mesin tangguh bertenaga khas Canter, transmisi lancar, interior butuh sedikit salon/pembersihan ganti sarung jok.'
    }
  },
  {
    id: '6',
    brand: 'Hino',
    name: 'HINO DUTRO 130 HD TRUK TANGKI AIR CPO 8.000L',
    lotNo: 'LOT 106',
    grade: 'B',
    year: 2019,
    km: 198200,
    transmission: 'Manual',
    location: 'Medan (Pool Belawan)',
    documents: 'BPKB + STNK Lengkap (KIR Kadaluarsa)',
    bbm: 'Solar (Diesel)',
    basePrice: 245000000,
    imageUrl: 'https://lh3.googleusercontent.com/d/1OySj4TRZEc6awvmvbv9MpWzXNAF24uaX',
    gallery: [
      'https://lh3.googleusercontent.com/d/1OySj4TRZEc6awvmvbv9MpWzXNAF24uaX'
    ],
    category: 'Tangki',
    status: 'Segera Mulai',
    specs: {
      engineModel: 'N04C-VC Direct Injection',
      displacement: '4,009 cc',
      horsePower: '130 PS',
      wheelbase: '3,380 mm',
      maxGvw: '8,500 kg',
      chassisNumber: 'MHFU4E130MXXXXXX',
      engineNumber: 'N04C-XXXXXX'
    },
    gradeBreakdown: {
      interior: 'B-',
      exterior: 'B',
      engine: 'B+',
      undercarriage: 'B',
      notes: 'Tangki plat besi 4mm anti bocor, pompa hisap PTO aktif, rem tangan pakem, kelistrikan panel speedometer berfungsi normal.'
    }
  },
  {
    id: '7',
    brand: 'Isuzu',
    name: 'ISUZU GIGA FVM 34 U (6x2) BOX BESI BESAR',
    lotNo: 'LOT 107',
    grade: 'A',
    year: 2021,
    km: 72100,
    transmission: 'Manual',
    location: 'Jakarta (Pool Cilincing)',
    documents: 'Lengkap Kapal Api (STNK & BPKB Atas Nama PT)',
    bbm: 'Solar (Diesel)',
    basePrice: 610000000,
    imageUrl: 'https://lh3.googleusercontent.com/d/1SLMV6XugZIuXe-wZqgSwbacCthsMyvdN',
    gallery: [
      'https://lh3.googleusercontent.com/d/1SLMV6XugZIuXe-wZqgSwbacCthsMyvdN'
    ],
    category: 'Box Rigit',
    status: 'Live Terbuka',
    specs: {
      engineModel: '6HK1-TCN Intercooler',
      displacement: '7,790 cc',
      horsePower: '240 PS',
      wheelbase: '5,000 + 1,300 mm',
      maxGvw: '26,000 kg',
      chassisNumber: 'MHFJXZ34LXXXXXXXX',
      engineNumber: '6HK1-XXXXXX'
    },
    gradeBreakdown: {
      interior: 'A',
      exterior: 'A',
      engine: 'A',
      undercarriage: 'A',
      notes: 'Bekas angkutan barang FMCG ringan, bodi box besi lurus tidak penyok, pintu ganda belakang rapat air, mesin sangat bersih tidak berkerak.'
    }
  },
  {
    id: '8',
    brand: 'Mitsubishi Fuso',
    name: 'MITSUBISHI FUSO FIGHTER FN 61 FL WINGBOX 10 RODA',
    lotNo: 'LOT 108',
    grade: 'B',
    year: 2020,
    km: 153000,
    transmission: 'Manual',
    location: 'Surabaya (Pool Gresik)',
    documents: 'BPKB Ready (STNK Mati 1 Tahun)',
    bbm: 'Solar (Diesel)',
    basePrice: 595000000,
    imageUrl: 'https://lh3.googleusercontent.com/d/1WShHGjJWx6h2oWbkpQznfdH9QS8x8g-S',
    gallery: [
      'https://lh3.googleusercontent.com/d/1WShHGjJWx6h2oWbkpQznfdH9QS8x8g-S'
    ],
    category: 'Wingbox',
    status: 'Live Terbuka',
    specs: {
      engineModel: '6M60-T1 Common Rail',
      displacement: '7,545 cc',
      horsePower: '240 PS',
      wheelbase: '5,400 + 1,350 mm',
      maxGvw: '26,000 kg',
      chassisNumber: 'MHYF8FN10XXXXXXXX',
      engineNumber: '6M60-XXXXXX'
    },
    gradeBreakdown: {
      interior: 'B',
      exterior: 'B',
      engine: 'B+',
      undercarriage: 'B',
      notes: 'Wingbox hidrolik lancar, kabin orisinal cat merah fuso, sasis aman dari karat karena pelapisan anti-karat berkala, ban cadangan tersedia.'
    }
  }
];

export const UPCOMING_AUCTIONS = [
  {
    id: 'a1',
    title: 'Lelang Akbar Pancaran Jakarta',
    date: 'Setiap Kamis',
    location: 'Pancaran Energi Transport Pt., RT.12/RW.12, Kali Baru, Kec. Cilincing, Jkt Utara, Daerah Khusus Ibukota Jakarta 14110',
    time: '10:00 - Selesai WIB',
    totalUnits: 45,
    depositFee: 5000000,
    specialHighlights: 'Tractor Head Hino Ranger, Mitsubishi Fighter, Isuzu Giga Wingbox',
    status: 'Buka Pendaftaran'
  },
  {
    id: 'a2',
    title: 'Lelang Komersial Pancaran Surabaya',
    date: 'Setiap Jumat',
    location: 'Pool Gresik, Margomulyo Permai, Surabaya',
    time: '09:30 - Selesai WIB',
    totalUnits: 32,
    depositFee: 5000000,
    specialHighlights: 'Dump Truck Indeks 24, Scania Heavy Duty, Fuso Canter Box',
    status: 'Buka Pendaftaran'
  },
  {
    id: 'a3',
    title: 'Lelang Sumatra Gateway Belawan',
    date: 'Selasa Pekan Depan',
    location: 'Pool Belawan, Medan',
    time: '13:00 - Selesai WIB',
    totalUnits: 18,
    depositFee: 5000000,
    specialHighlights: 'Fuso Colt Diesel FE, Truk Tangki CPO, Isuzu Traga Cargo',
    status: 'Akan Datang'
  }
];

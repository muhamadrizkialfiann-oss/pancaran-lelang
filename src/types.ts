export interface TruckSpecs {
  engineModel: string;
  displacement: string; // e.g. "7,684 cc"
  horsePower: string; // e.g. "260 PS"
  wheelbase: string; // e.g. "4,300 mm"
  maxGvw: string; // e.g. "26,000 kg"
  chassisNumber: string;
  engineNumber: string;
}

export interface TruckGradeBreakdown {
  interior: string; // A, B, C, D
  exterior: string;
  engine: string;
  undercarriage: string;
  notes: string;
}

export interface Truck {
  id: string;
  brand: string;
  name: string;
  lotNo: string;
  grade: string;
  year: number;
  km: number;
  transmission: 'Manual' | 'Automatic';
  location: string;
  documents: string; // e.g. "BPKB Ready" or "STNK + BPKB"
  bbm: string; // e.g. "Solar"
  basePrice: number; // in IDR
  imageUrl: string;
  gallery: string[];
  specs: TruckSpecs;
  gradeBreakdown: TruckGradeBreakdown;
  status: 'Live Terbuka' | 'Segera Mulai' | 'Selesai';
  category: 'Tractor Head' | 'Wingbox' | 'Dump Truck' | 'Box Rigit' | 'Tangki';
}

export interface InspectionBooking {
  id: string;
  truckId: string;
  truckName: string;
  lotNo: string;
  name: string;
  phone: string;
  company: string;
  date: string;
  timeSlot: string;
  status: 'Menunggu Konfirmasi' | 'Disetujui' | 'Selesai';
  bookingCode: string;
  poolLocation: string;
}

export interface NegotiationOffer {
  id: string;
  truckId: string;
  truckName: string;
  lotNo: string;
  proposedPrice: number;
  paymentMethod: 'Cash' | 'Kredit 12 Bulan' | 'Kredit 24 Bulan' | 'Kredit 36 Bulan';
  name: string;
  phone: string;
  status: 'Menunggu Review' | 'Penawaran Dipertimbangkan' | 'Diterima Sistem (Menunggu Verifikasi)' | 'Ditolak (Di bawah Batas)';
  responseText: string;
  date: string;
  basePrice: number;
}

export interface ConsignmentSubmission {
  id: string;
  brand: string;
  modelName: string;
  year: number;
  category: string;
  conditionGrade: string;
  ownerName: string;
  phone: string;
  estimatedValue: number;
  status: 'Menunggu Persetujuan' | 'Dijadwalkan Inspeksi Mandiri' | 'Siap Tayang';
  date: string;
}

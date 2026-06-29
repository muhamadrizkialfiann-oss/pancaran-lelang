import React, { useState, useEffect } from 'react';
import { ConsignmentSubmission } from '../types';
import { Truck, Scale, ShieldCheck, CheckCircle2, DollarSign, Sparkles, Phone, User, Calendar } from 'lucide-react';

interface ConsignmentFormProps {
  onConsignmentSubmitted: (submission: ConsignmentSubmission) => void;
}

export default function ConsignmentForm({ onConsignmentSubmitted }: ConsignmentFormProps) {
  const [brand, setBrand] = useState('Hino');
  const [modelName, setModelName] = useState('');
  const [year, setYear] = useState(2020);
  const [category, setCategory] = useState('Wingbox');
  const [grade, setGrade] = useState('B');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  
  const [estimatedValue, setEstimatedValue] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  // Dynamic Valuation Appraisal Logic
  useEffect(() => {
    let basePriceMultiplier = 300000000; // default Isuzu
    if (brand === 'Hino') basePriceMultiplier = 350000000;
    else if (brand === 'Mitsubishi Fuso') basePriceMultiplier = 330000000;
    else if (brand === 'Scania') basePriceMultiplier = 750000000;
    else if (brand === 'Volvo') basePriceMultiplier = 800000000;

    // Year Factor
    const currentYear = 2026;
    const yearDiff = currentYear - year;
    let yearMultiplier = 1 - (yearDiff * 0.07);
    if (yearMultiplier < 0.3) yearMultiplier = 0.3;

    // Grade Factor
    let gradeMultiplier = 1.0;
    if (grade === 'A+') gradeMultiplier = 1.15;
    else if (grade === 'A') gradeMultiplier = 1.05;
    else if (grade === 'B+') gradeMultiplier = 0.98;
    else if (grade === 'B') gradeMultiplier = 0.90;
    else if (grade === 'C') gradeMultiplier = 0.70;
    else if (grade === 'D') gradeMultiplier = 0.50;

    // Body Category factor
    let categoryMultiplier = 1.0;
    if (category === 'Tractor Head') categoryMultiplier = 1.25;
    else if (category === 'Wingbox') categoryMultiplier = 1.15;
    else if (category === 'Dump Truck') categoryMultiplier = 1.10;
    else if (category === 'Tangki') categoryMultiplier = 1.05;

    const calculatedValuation = basePriceMultiplier * yearMultiplier * gradeMultiplier * categoryMultiplier;
    setEstimatedValue(Math.round(calculatedValuation));
  }, [brand, year, category, grade]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modelName || !ownerName || !phone) {
      alert('Mohon lengkapi nama armada, nama pemilik, dan nomor WhatsApp!');
      return;
    }

    const submission: ConsignmentSubmission = {
      id: 'CON-' + Math.floor(1000 + Math.random() * 9000),
      brand,
      modelName,
      year,
      category,
      conditionGrade: grade,
      ownerName,
      phone,
      estimatedValue,
      status: 'Menunggu Persetujuan',
      date: new Date().toLocaleDateString('id-ID')
    };

    onConsignmentSubmitted(submission);
    setIsSuccess(true);
  };

  const formatIDR = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="max-w-4xl mx-auto py-4 px-2" id="consignment-section">
      
      {/* Visual Header */}
      <div className="bg-gradient-to-br from-[#0F3460] to-[#16213E] text-white rounded-2xl p-6 md:p-8 text-center md:text-left shadow-lg mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/15 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-3 max-w-xl">
            <span className="bg-red-500 text-white font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded">
              Layanan Seller Mandiri
            </span>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-tight">
              Titipkan Armada Truk Anda di Pancaran Lelang
            </h1>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Dapatkan eksposur ke lebih dari 5,000+ bidder aktif korporasi & individu se-Indonesia. Jaminan pencairan dana kilat dalam 3 hari kerja setelah unit terjual!
            </p>
          </div>
          <div className="bg-white/10 p-5 rounded-xl border border-white/10 backdrop-blur-md text-center max-w-[240px] shrink-0">
            <Sparkles className="w-7 h-7 text-amber-400 mx-auto mb-2 animate-bounce" />
            <span className="block text-[10px] text-slate-300 font-bold uppercase">Estimasi Penjualan</span>
            <span className="text-xl font-black text-white mt-1 block">94% Terjual</span>
            <span className="text-[9px] text-slate-400 block mt-0.5">Pada Putaran Lelang Pertama</span>
          </div>
        </div>
      </div>

      {!isSuccess ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Submission Form Column (7/12) */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 bg-white p-6 md:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-[#16213E] pb-3 border-b border-slate-100 flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#0F3460]" />
              Formulir Data Teknis Armada
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Merek Kendaraan</label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 focus:bg-white focus:border-[#0F3460] outline-none font-semibold"
                >
                  <option>Hino</option>
                  <option>Mitsubishi Fuso</option>
                  <option>Isuzu</option>
                  <option>Scania</option>
                  <option>Volvo</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Tipe Karoseri</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 focus:bg-white focus:border-[#0F3460] outline-none font-semibold"
                >
                  <option value="Wingbox">Wingbox Alumunium</option>
                  <option value="Tractor Head">Tractor Head (Tarik Trailer)</option>
                  <option value="Dump Truck">Dump Truck (Besi Tambang)</option>
                  <option value="Box Rigit">Box Besi Tertutup (Rigid)</option>
                  <option value="Tangki">Tangki Air / CPO</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Model / Nama Seri Truk *</label>
              <input
                type="text"
                required
                placeholder="Contoh: Ranger FM 260 JW (Mulus Orisinal)"
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-800 focus:bg-white focus:border-[#0F3460] outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Tahun Perakitan</label>
                <select
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 focus:bg-white focus:border-[#0F3460] outline-none font-semibold"
                >
                  {[2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015].map((y) => (
                    <option key={y} value={y}>Tahun {y}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Perkiraan Grade Fisik</label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 focus:bg-white focus:border-[#0F3460] outline-none font-semibold"
                >
                  <option value="A+">Grade A+ (Mulus Sempurna Like New)</option>
                  <option value="A">Grade A (Orisinal Sangat Mulus)</option>
                  <option value="B+">Grade B+ (Bagus Terawat Minor Lecet)</option>
                  <option value="B">Grade B (Standar Pemakaian Normal)</option>
                  <option value="C">Grade C (Perlu Perbaikan Ringan)</option>
                  <option value="D">Grade D (Kondisi Berat / Apa Adanya)</option>
                </select>
              </div>
            </div>

            <h3 className="text-lg font-bold text-[#16213E] pt-4 pb-3 border-b border-slate-100 flex items-center gap-2">
              <User className="w-5 h-5 text-[#0F3460]" />
              Data Pemilik & Kontak Penanggungjawab
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Nama Pemilik / PIC Perusahaan *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Bapak Alfian"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-800 focus:bg-white focus:border-[#0F3460] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Nomor WhatsApp HP *</label>
                <input
                  type="tel"
                  required
                  placeholder="Contoh: 0812XXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-800 focus:bg-white focus:border-[#0F3460] outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-red-500/15 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
              id="submit-consignment-btn"
            >
              <CheckCircle2 className="w-5 h-5" />
              Kirim Pengajuan Titip Lelang
            </button>
          </form>

          {/* Appraisal Value Live Sidebar (5/12) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm text-center space-y-4">
              <Scale className="w-10 h-10 text-[#0F3460] mx-auto" />
              <div>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">
                  Kalkulasi Nilai Pasar Awal (Appraisal)
                </span>
                <p className="text-xs text-slate-500 mt-1">
                  Nilai estimasi di bawah ini dihitung otomatis secara live berdasarkan riwayat transaksi lelang unit sejenis semester ini:
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <span className="text-xs text-slate-400 font-bold block uppercase">
                  Estimasi Harga Dasar Lelang
                </span>
                <span className="text-2xl md:text-3xl font-black text-emerald-600 block mt-1.5 animate-pulse">
                  {formatIDR(estimatedValue)}
                </span>
                <span className="text-[10px] text-slate-400 block mt-1.5">
                  Toleransi Akurasi Valuasi &plusmn; 5%
                </span>
              </div>

              <div className="text-left space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-4">
                <div className="flex justify-between">
                  <span>Merek Armada:</span>
                  <span className="font-bold text-slate-800">{brand}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tahun Sasis:</span>
                  <span className="font-bold text-slate-800">Tahun {year}</span>
                </div>
                <div className="flex justify-between">
                  <span>Perkiraan Grade:</span>
                  <span className="font-bold text-slate-800">Grade {grade.split(' (')[0]}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#16213E] text-slate-100 p-6 rounded-2xl space-y-4 shadow-md">
              <h4 className="font-bold text-sm text-white flex items-center gap-2 border-b border-slate-700/60 pb-2.5">
                <ShieldCheck className="w-4.5 h-4.5 text-red-500" />
                Mengapa Memilih Pancaran?
              </h4>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex gap-2">
                  <span className="text-emerald-400 font-extrabold">✓</span>
                  <span><strong>Komisi Terendah:</strong> Hanya 2.5% komisi penjualan untuk kemitraan korporasi.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400 font-extrabold">✓</span>
                  <span><strong>Inspeksi Fisik Gratis:</strong> Tim inspektur handal kami mendatangi garasi Anda tanpa pungutan ongkos.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400 font-extrabold">✓</span>
                  <span><strong>Pelunasan Kilat:</strong> Pembayaran 100% lunas langsung masuk rekening pemilik dalam 3 hari.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      ) : (
        /* Success screen with appraisal timeline */
        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center max-w-xl mx-auto space-y-6 shadow-xl animate-scaleUp">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-800">PENGAJUAN DIKIRIM!</h2>
            <p className="text-sm text-slate-500">
              Terima kasih, pengajuan titip lelang atas unit <strong>{brand} {modelName}</strong> telah sukses teregistrasi ke sistem kemitraan kami.
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-left space-y-3 text-xs">
            <span className="font-bold text-slate-700 block uppercase tracking-wider text-[10px]">
              TAHAPAN PROSEDUR SELANJUTNYA:
            </span>
            <div className="space-y-3">
              <div className="flex gap-3 items-start">
                <span className="bg-red-500 text-white font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">1</span>
                <div>
                  <h5 className="font-bold text-slate-800">Verifikasi Berkas Administrasi (1-2 Jam)</h5>
                  <p className="text-slate-500 mt-0.5">Sales representative kami akan menghubungi Anda di WhatsApp {phone} untuk verifikasi STNK/BPKB.</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="bg-slate-200 text-slate-600 font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">2</span>
                <div>
                  <h5 className="font-bold text-slate-800">Inspeksi Fisik Lapangan & Grading (H+1)</h5>
                  <p className="text-slate-500 mt-0.5">Petugas kami mendatangi lokasi armada Anda untuk memeriksa detail mesin, transmisi, sasis dan memberikan rating grade resmi.</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="bg-slate-200 text-slate-600 font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">3</span>
                <div>
                  <h5 className="font-bold text-slate-800">Penayangan Katalog Lelang Live</h5>
                  <p className="text-slate-500 mt-0.5">Unit resmi tayang dengan kode LOT khusus pada putaran lelang hari Kamis atau Jumat terdekat.</p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setIsSuccess(false);
              setModelName('');
              setOwnerName('');
              setPhone('');
            }}
            className="bg-[#0F3460] hover:bg-[#0b2545] text-white font-bold py-3 px-6 rounded-xl text-sm transition-colors cursor-pointer"
          >
            Daftarkan Unit Armada Lain
          </button>
        </div>
      )}

    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Truck } from '../types';
import { Calculator, Award, ArrowRight, ShieldCheck, CheckCircle2, Info } from 'lucide-react';

interface LeasingCalculatorProps {
  trucks: Truck[];
  selectedTruckId?: string;
}

export default function LeasingCalculator({ trucks, selectedTruckId }: LeasingCalculatorProps) {
  const [selectedId, setSelectedId] = useState(selectedTruckId || trucks[0]?.id || '1');
  const [dpPercent, setDpPercent] = useState(30); // Default DP 30%
  const [tenor, setTenor] = useState(24); // Default 24 months
  const [adminFee, setAdminFee] = useState(3500000); // Admin + insurance fee flat
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Find active truck
  const activeTruck = trucks.find(t => t.id === selectedId) || trucks[0];

  // Calculations State
  const [truckPrice, setTruckPrice] = useState(0);
  const [dpAmount, setDpAmount] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0);
  const [monthlyInstallment, setMonthlyInstallment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    if (activeTruck) {
      setSelectedId(activeTruck.id);
    }
  }, [selectedTruckId]);

  useEffect(() => {
    if (!activeTruck) return;

    const price = activeTruck.basePrice;
    setTruckPrice(price);

    // Down Payment Amount
    const dp = (price * dpPercent) / 100;
    setDpAmount(dp);

    // Principal Loan
    const principal = price - dp;
    setLoanAmount(principal);

    // Interest rate depends on tenor
    // 12mo: 5% flat, 24mo: 6% flat, 36mo: 7.5% flat, 48mo: 8.5% flat
    let flatRate = 0.06;
    if (tenor === 12) flatRate = 0.05;
    else if (tenor === 24) flatRate = 0.06;
    else if (tenor === 36) flatRate = 0.075;
    else if (tenor === 48) flatRate = 0.085;

    // Total interest over the period
    const interest = principal * flatRate * (tenor / 12);
    setTotalInterest(interest);

    // Total payout principal + interest divided by tenor months
    const installment = (principal + interest) / tenor;
    setMonthlyInstallment(installment);
  }, [selectedId, dpPercent, tenor, activeTruck]);

  const formatIDR = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto py-4 px-2" id="leasing-calculator-section">
      
      {/* Title description bar */}
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-black text-[#16213E] flex items-center gap-2">
          <Calculator className="w-6 h-6 text-[#0F3460]" />
          Simulasi & Kalkulator Pembiayaan Kredit
        </h2>
        <p className="text-xs md:text-sm text-slate-500 mt-1">
          Dapatkan gambaran simulasi cicilan bulanan armada Anda melalui mitra leasing terpercaya kami (Mandiri Tunas Finance, Astra Sedaya Finance, Orix).
        </p>
      </div>

      {!isSubmitted ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls column (7/12) */}
          <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            
            <h3 className="text-sm font-extrabold uppercase text-[#16213E] tracking-wider pb-2 border-b border-slate-100">
              Konfigurasi Pendanaan
            </h3>

            {/* Truck Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-500 uppercase">Pilih Unit Truk Aktif</label>
              <select
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-3 text-sm text-slate-800 focus:bg-white focus:border-[#0F3460] outline-none font-bold"
              >
                {trucks.map((t) => (
                  <option key={t.id} value={t.id}>
                    [{t.lotNo}] {t.name} ({formatIDR(t.basePrice)})
                  </option>
                ))}
              </select>
            </div>

            {/* Price reference info */}
            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div>
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Harga Dasar Unit</span>
                <span className="text-base font-extrabold text-[#16213E] mt-0.5 block">{formatIDR(truckPrice)}</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Lokasi Pool Fisik</span>
                <span className="text-xs font-bold text-slate-700 mt-1 truncate block">{activeTruck?.location.split(' (')[0]}</span>
              </div>
            </div>

            {/* DP Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-500 uppercase">Down Payment (Uang Muka)</label>
                <span className="bg-red-50 text-red-600 font-extrabold text-xs px-2.5 py-1 rounded">
                  {dpPercent}% - {formatIDR(dpAmount)}
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="50"
                step="5"
                value={dpPercent}
                onChange={(e) => setDpPercent(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0F3460]"
              />
              <div className="flex justify-between text-[10px] font-bold text-slate-400">
                <span>Min: 20%</span>
                <span>Standar: 30%</span>
                <span>Max: 50%</span>
              </div>
            </div>

            {/* Tenor Month Selectors */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-500 uppercase">Durasi Tenor Angsuran</label>
              <div className="grid grid-cols-4 gap-2.5">
                {[12, 24, 36, 48].map((months) => (
                  <button
                    type="button"
                    key={months}
                    onClick={() => setTenor(months)}
                    className={`py-3 px-1.5 rounded-xl text-center border font-extrabold text-xs md:text-sm transition-all cursor-pointer ${
                      tenor === months
                        ? 'bg-[#0F3460] border-[#0F3460] text-white shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {months} Bulan
                    <span className="block text-[9px] font-normal text-slate-300 mt-0.5">
                      {months === 12 ? 'Bunga 5%' : months === 24 ? 'Bunga 6%' : months === 36 ? 'Bunga 7.5%' : 'Bunga 8.5%'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Apply button triggering pre-approval */}
            <form onSubmit={handleApply} className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#0F3460] hover:bg-[#0b2545] text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-[#0F3460]/15 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                id="apply-leasing-btn"
              >
                Ajukan Pengajuan Kredit Sekarang
                <ArrowRight className="w-4.5 h-4.5" />
              </button>
            </form>

          </div>

          {/* Results column (5/12) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Calculation output summary card */}
            <div className="bg-[#16213E] text-white p-6 rounded-2xl shadow-xl border border-slate-700/50 space-y-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E94560]/5 rounded-full blur-2xl"></div>
              
              <h3 className="text-xs font-black uppercase text-[#E94560] tracking-wider border-b border-slate-700/60 pb-2.5 flex items-center gap-1.5">
                <Info className="w-4 h-4" />
                Rincian Angsuran Bulanan
              </h3>

              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">
                  Angsuran Per Bulan (Estimasi)
                </span>
                <span className="text-2xl md:text-3xl font-black text-[#E94560] block tracking-tight">
                  {formatIDR(monthlyInstallment)}
                </span>
                <span className="text-[10px] text-slate-300 block">
                  Tenor {tenor} Bulan, Suku Bunga Flat Per Tahun
                </span>
              </div>

              <div className="space-y-2.5 text-xs border-t border-slate-700/60 pt-4 text-slate-300">
                <div className="flex justify-between">
                  <span>Pokok Pembiayaan:</span>
                  <span className="font-bold text-white">{formatIDR(loanAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Beban Bunga:</span>
                  <span className="font-bold text-white">{formatIDR(totalInterest)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Uang Muka (DP):</span>
                  <span className="font-bold text-white">{formatIDR(dpAmount)}</span>
                </div>
                <div className="flex justify-between text-slate-400 border-t border-dashed border-slate-700/60 pt-2.5">
                  <span>Biaya Provisi & Admin:</span>
                  <span className="font-semibold">{formatIDR(adminFee)}</span>
                </div>
                <div className="flex justify-between text-[#E94560] font-black border-t border-slate-700/60 pt-2.5 text-sm">
                  <span>Pembayaran Pertama (TDP):</span>
                  <span>{formatIDR(dpAmount + adminFee)}</span>
                </div>
              </div>

              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-[10px] text-slate-400 leading-relaxed">
                *TDP (Total Down Payment) mencakup Uang Muka bersih ditambah taksiran biaya asuransi tahun pertama, asuransi sasis, biaya provisi, dan admin administrasi kredit.
              </div>
            </div>

            {/* Help guidelines */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3.5">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#16213E] flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-500" />
                Jaminan Kemitraan Kredit
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Kami bermitra dengan bank nasional terkemuka untuk memastikan suku bunga terendah, persetujuan cepat (instant approval H+1), serta keamanan bilyet BPKB yang disimpan aman di brankas asuransi.
              </p>
              <div className="border-t border-slate-100 pt-3 text-[10px] text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                <span>Seluruh proses legalitas sasis & nomor mesin diverifikasi 100% oleh Samsat mitra sebelum pencairan kredit.</span>
              </div>
            </div>

          </div>

        </div>
      ) : (
        /* Pre-approval Successful Receipt Screen */
        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center max-w-xl mx-auto space-y-6 shadow-xl animate-scaleUp">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-800">PENGAJUAN KREDIT DITERIMA!</h2>
            <p className="text-sm text-slate-500">
              Pengajuan kalkulasi leasing atas unit <strong>{activeTruck?.name}</strong> telah berhasil diajukan ke Analis Kredit Pancaran.
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-left space-y-3 text-xs">
            <span className="font-bold text-slate-700 block uppercase tracking-wider text-[10px]">
              RINCIAN FORMULIR PRE-APPROVAL:
            </span>
            <div className="space-y-2">
              <div className="flex justify-between border-b border-slate-200/50 pb-1.5">
                <span className="text-slate-500">Unit Terpilih:</span>
                <span className="font-bold text-slate-800 text-right max-w-[200px] truncate">{activeTruck?.name}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/50 pb-1.5">
                <span className="text-slate-500">Harga Unit:</span>
                <span className="font-extrabold text-slate-800">{formatIDR(truckPrice)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/50 pb-1.5">
                <span className="text-slate-500">Nilai Uang Muka (DP {dpPercent}%):</span>
                <span className="font-bold text-slate-800">{formatIDR(dpAmount)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/50 pb-1.5">
                <span className="text-slate-500">Durasi Angsuran:</span>
                <span className="font-bold text-slate-800">{tenor} Bulan</span>
              </div>
              <div className="flex justify-between font-extrabold text-[#E94560] pt-1 text-sm">
                <span>Estimasi Cicilan Bulanan:</span>
                <span>{formatIDR(monthlyInstallment)}</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-500">
            Tim analis kami akan menghubungi Anda melalui WhatsApp dalam 2 jam kerja untuk memberikan opsi simulasi suku bunga khusus MTF, ASF, dan Orix.
          </p>

          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-[#0F3460] hover:bg-[#0b2545] text-white font-bold py-3 px-6 rounded-xl text-sm transition-colors cursor-pointer"
          >
            Hitung Kembali / Simulasi Unit Lain
          </button>
        </div>
      )}

    </div>
  );
}

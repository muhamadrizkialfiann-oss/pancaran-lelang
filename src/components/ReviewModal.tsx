import React, { useState } from 'react';
import { Truck, InspectionBooking, NegotiationOffer } from '../types';
import { 
  X, MapPin, Calendar, Gauge, FileText, CheckCircle2, 
  AlertCircle, ShieldCheck, DollarSign, Award, Phone, 
  User, Download, Building2, ChevronRight, ChevronLeft, Wrench 
} from 'lucide-react';

interface ReviewModalProps {
  truck: Truck;
  onClose: () => void;
  onBookingSubmitted: (booking: InspectionBooking) => void;
  onNegotiationSubmitted: (offer: NegotiationOffer) => void;
}

export default function ReviewModal({ truck, onClose, onBookingSubmitted, onNegotiationSubmitted }: ReviewModalProps) {
  // Gallery slider state
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  
  // Tabs within modal: 'forms' | 'spesifikasi' | 'kondisi'
  const [activeTab, setActiveTab] = useState<'forms' | 'spesifikasi' | 'kondisi'>('forms');
  
  // Form inside activeTab='forms': 'cek-unit' | 'negosiasi'
  const [formType, setFormType] = useState<'cek-unit' | 'negosiasi'>('cek-unit');

  // Cek Unit Form state
  const [bookingName, setBookingName] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingCompany, setBookingCompany] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('09:00 - 11:00 WIB');
  const [attendees, setAttendees] = useState('1 Orang');
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);
  const [generatedTicket, setGeneratedTicket] = useState<InspectionBooking | null>(null);

  // Negotiation Form state
  const [negoName, setNegoName] = useState('');
  const [negoPhone, setNegoPhone] = useState('');
  const [negoPrice, setNegoPrice] = useState(truck.basePrice);
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'Kredit 12 Bulan' | 'Kredit 24 Bulan' | 'Kredit 36 Bulan'>('Cash');
  const [isNegoSuccess, setIsNegoSuccess] = useState(false);
  const [negoResult, setNegoResult] = useState<NegotiationOffer | null>(null);
  const [negoErrorMsg, setNegoErrorMsg] = useState('');

  // Currency Formatter helper
  const formatIDR = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Handle Booking Submit
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingPhone || !bookingDate) {
      alert('Mohon lengkapi semua data wajib!');
      return;
    }

    const code = 'INS-' + Math.floor(100000 + Math.random() * 900000);
    const booking: InspectionBooking = {
      id: Math.random().toString(),
      truckId: truck.id,
      truckName: truck.name,
      lotNo: truck.lotNo,
      name: bookingName,
      phone: bookingPhone,
      company: bookingCompany || 'Pribadi/Perorangan',
      date: bookingDate,
      timeSlot: bookingTime,
      status: 'Disetujui',
      bookingCode: code,
      poolLocation: truck.location
    };

    onBookingSubmitted(booking);
    setGeneratedTicket(booking);
    setIsBookingSuccess(true);
  };

  // Handle Negotiation Submit
  const handleNegoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!negoName || !negoPhone || !negoPrice) {
      alert('Mohon lengkapi seluruh kolom negosiasi!');
      return;
    }

    // Validation: cannot propose below 80% of basic price
    const minAcceptablePrice = truck.basePrice * 0.85;
    if (negoPrice < minAcceptablePrice) {
      setNegoErrorMsg(`Penawaran Anda (${formatIDR(negoPrice)}) terlalu rendah dari limit minimal dasar sistem. Batas minimum penawaran adalah Rp ${minAcceptablePrice.toLocaleString('id-ID')} (85% dari Harga Dasar).`);
      return;
    } else {
      setNegoErrorMsg('');
    }

    // System appraisal evaluation response
    let responseText = '';
    let status: NegotiationOffer['status'] = 'Penawaran Dipertimbangkan';
    
    if (negoPrice >= truck.basePrice) {
      status = 'Diterima Sistem (Menunggu Verifikasi)';
      responseText = `Selamat! Penawaran Anda sebesar ${formatIDR(negoPrice)} telah disetujui sistem karena menyentuh atau melampaui limit dasar. Tim Sales Pancaran akan segera menghubungi Anda dalam 1 jam untuk verifikasi & pembuatan NIPL.`;
    } else {
      status = 'Penawaran Dipertimbangkan';
      responseText = `Penawaran Anda sebesar ${formatIDR(negoPrice)} telah masuk ke sistem pengadaan kami. Karena berada sedikit di bawah harga dasar, tim penilai kami akan mereview dalam 1x24 jam.`;
    }

    const offer: NegotiationOffer = {
      id: Math.random().toString(),
      truckId: truck.id,
      truckName: truck.name,
      lotNo: truck.lotNo,
      proposedPrice: negoPrice,
      paymentMethod,
      name: negoName,
      phone: negoPhone,
      status,
      responseText,
      date: new Date().toLocaleDateString('id-ID'),
      basePrice: truck.basePrice
    };

    onNegotiationSubmitted(offer);
    setNegoResult(offer);
    setIsNegoSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-2 md:p-6" id="review-modal-backdrop">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl overflow-hidden flex flex-col max-h-[92vh] border border-slate-200" id="review-modal-content">
        
        {/* Modal Top Header Bar */}
        <div className="bg-[#0F3460] text-white px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="bg-red-500 text-white font-extrabold px-2.5 py-1 rounded text-xs">
              {truck.lotNo}
            </span>
            <h2 className="text-base md:text-lg font-bold truncate max-w-[50vw]">
              Review & Negosiasi: {truck.name}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-200 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors cursor-pointer"
            id="close-modal-x"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto flex-grow divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
          
          {/* Left Column - Review Details & Images (8/12 widths) */}
          <div className="lg:col-span-7 p-6 overflow-y-auto max-h-[82vh]">
            
            {/* Gallery Section */}
            <div className="relative rounded-xl overflow-hidden bg-slate-100 aspect-video mb-4 shadow-inner">
              <img 
                src={truck.gallery[activeImageIdx]} 
                alt={`${truck.name} view`} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              
              {/* Image Navigation Arrows */}
              <button 
                onClick={() => setActiveImageIdx(prev => prev > 0 ? prev - 1 : truck.gallery.length - 1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 p-1.5 rounded-full shadow hover:scale-105 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setActiveImageIdx(prev => prev < truck.gallery.length - 1 ? prev + 1 : 0)}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 p-1.5 rounded-full shadow hover:scale-105 transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="absolute bottom-3 right-3 bg-slate-900/80 text-white font-bold text-xs px-2.5 py-1 rounded">
                Kondisi Real Nyata (Kamera Inspektur)
              </div>
            </div>

            {/* Thumbnail Navigations */}
            <div className="flex gap-2.5 mb-6 overflow-x-auto pb-2">
              {truck.gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-20 md:w-24 aspect-video rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                    idx === activeImageIdx ? 'border-[#0F3460] scale-102 ring-2 ring-[#0F3460]/20' : 'border-slate-200 opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>

            {/* Tab Selectors for Information */}
            <div className="flex gap-2.5 border-b border-slate-200 mb-5 pb-0.5">
              {[
                { id: 'forms', label: 'Ajukan Pengajuan' },
                { id: 'spesifikasi', label: 'Spesifikasi Mesin & Sasis' },
                { id: 'kondisi', label: 'Detail Grading Inspektur' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 font-bold text-sm border-b-2 -mb-0.5 transition-colors cursor-pointer ${
                    activeTab === tab.id 
                      ? 'border-[#0F3460] text-[#0F3460]' 
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab: Detail Grading Inspektur */}
            {activeTab === 'kondisi' && (
              <div className="space-y-5 animate-fadeIn">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                  <h4 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-1.5">
                    <Award className="w-4.5 h-4.5 text-blue-600" />
                    Rangkuman Kelayakan Unit (Grade Keseluruhan: <span className="text-[#E94560] font-black">{truck.grade}</span>)
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed italic">
                    "{truck.gradeBreakdown.notes}"
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: 'Kondisi Interior Kabin', score: truck.gradeBreakdown.interior, color: 'bg-emerald-500' },
                    { label: 'Bodi & Cat Eksterior', score: truck.gradeBreakdown.exterior, color: 'bg-emerald-500' },
                    { label: 'Mesin & Ruang Bakar', score: truck.gradeBreakdown.engine, color: 'bg-blue-500' },
                    { label: 'Sasis & Kaki-Kaki (Undercarriage)', score: truck.gradeBreakdown.undercarriage, color: 'bg-amber-500' }
                  ].map((item, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg border border-slate-150 shadow-xs">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="font-semibold text-slate-700 text-sm">{item.label}</span>
                        <span className="bg-slate-100 font-extrabold text-xs px-2 py-0.5 rounded text-slate-800">
                          Grade {item.score}
                        </span>
                      </div>
                      {/* Dummy Condition Bar to look real */}
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${item.color}`} 
                          style={{ width: item.score.startsWith('A') ? '95%' : item.score.startsWith('B') ? '75%' : '50%' }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-xs text-slate-400 mt-2 flex items-center gap-1 bg-blue-50/50 p-3 rounded-lg border border-blue-100/50 text-blue-700">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Inspeksi dilakukan oleh Inspektur Bersertifikat independen Pancaran Lelang. Jaminan keakuratan data 100%.</span>
                </div>
              </div>
            )}

            {/* Tab: Spesifikasi Mesin & Sasis */}
            {activeTab === 'spesifikasi' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                  <table className="w-full text-sm text-left border-collapse">
                    <tbody>
                      {[
                        { label: 'Merek & Tipe Unit', value: truck.name },
                        { label: 'Model Mesin', value: truck.specs.engineModel },
                        { label: 'Kapasitas Silinder', value: truck.specs.displacement },
                        { label: 'Tenaga Maksimum', value: truck.specs.horsePower },
                        { label: 'Jarak Sumbu Roda', value: truck.specs.wheelbase },
                        { label: 'Berat Maksimum (GVW)', value: truck.specs.maxGvw },
                        { label: 'Nomor Rangka Sasis', value: truck.specs.chassisNumber },
                        { label: 'Nomor Mesin', value: truck.specs.engineNumber },
                        { label: 'Status Dokumen Legal', value: truck.documents },
                        { label: 'Jenis Bahan Bakar', value: truck.bbm }
                      ].map((row, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                          <td className="px-4 py-3 font-bold text-slate-600 w-1/3 border-b border-slate-100">{row.label}</td>
                          <td className="px-4 py-3 text-slate-800 font-semibold border-b border-slate-100">{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab: Ajukan Pengajuan (Default Summary & Quick Stats) */}
            {activeTab === 'forms' && (
              <div className="space-y-5">
                <div className="bg-gradient-to-r from-slate-50 to-blue-50/20 p-5 rounded-xl border border-slate-150">
                  <h3 className="font-extrabold text-slate-800 text-base mb-3">Highlights Penilaian Unit</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-white p-3.5 rounded-lg border border-slate-100 text-center">
                      <span className="block text-[10px] text-slate-400 uppercase font-bold">Tahun Produksi</span>
                      <span className="text-base font-extrabold text-[#16213E] mt-0.5">{truck.year}</span>
                    </div>
                    <div className="bg-white p-3.5 rounded-lg border border-slate-100 text-center">
                      <span className="block text-[10px] text-slate-400 uppercase font-bold">Jarak Tempuh (KM)</span>
                      <span className="text-base font-extrabold text-[#16213E] mt-0.5">{truck.km.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="bg-white p-3.5 rounded-lg border border-slate-100 text-center col-span-2 md:col-span-1">
                      <span className="block text-[10px] text-slate-400 uppercase font-bold">Lokasi Pool Fisik</span>
                      <span className="text-xs font-bold text-[#0F3460] mt-1 truncate block">{truck.location}</span>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-slate-100">
                    <span className="text-xs text-slate-400 font-bold uppercase block mb-1">Harga Dasar Mulai Dari</span>
                    <span className="text-2xl font-black text-[#E94560] block">{formatIDR(truck.basePrice)}</span>
                    <p className="text-xs text-slate-500 mt-1">
                      *Harga di atas adalah batas penawaran awal NIPL. Klik tab formulir di sisi kanan untuk mendaftar inspeksi fisik gratis ke pool atau mengajukan negosiasi harga.
                    </p>
                  </div>
                </div>

                <div className="border border-amber-200 bg-amber-50 p-4 rounded-xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-amber-800 text-xs uppercase tracking-wider mb-1">HATI-HATI PENIPUAN</h5>
                    <p className="text-xs text-amber-700 leading-relaxed">
                      Pancaran Lelang tidak memungut biaya apapun untuk kunjungan cek fisik ke pool. Seluruh dana deposit jaminan penawaran NIPL disetorkan secara resmi ke rekening virtual account atas nama perusahaan kami.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Right Column - Forms for Cek Unit & Negosiasi (5/12 widths) */}
          <div className="lg:col-span-5 p-6 bg-slate-50/50 flex flex-col justify-between max-h-[82vh] overflow-y-auto">
            <div>
              
              {/* Form Option Selector Tabs */}
              <div className="grid grid-cols-2 gap-2 mb-6 bg-slate-200/60 p-1.5 rounded-xl">
                <button
                  onClick={() => {
                    setFormType('cek-unit');
                    setIsBookingSuccess(false);
                  }}
                  className={`py-2.5 px-3 rounded-lg text-xs font-extrabold text-center transition-all cursor-pointer ${
                    formType === 'cek-unit' 
                      ? 'bg-white text-[#0F3460] shadow-sm' 
                      : 'text-slate-600 hover:text-slate-800'
                  }`}
                  id="tab-cek-unit"
                >
                  📝 Cek Unit / Inspeksi
                </button>
                <button
                  onClick={() => {
                    setFormType('negosiasi');
                    setIsNegoSuccess(false);
                    setNegoErrorMsg('');
                  }}
                  className={`py-2.5 px-3 rounded-lg text-xs font-extrabold text-center transition-all cursor-pointer ${
                    formType === 'negosiasi' 
                      ? 'bg-white text-[#0F3460] shadow-sm' 
                      : 'text-slate-600 hover:text-slate-800'
                  }`}
                  id="tab-negosiasi"
                >
                  🤝 Ajukan Negosiasi
                </button>
              </div>

              {/* Form 1: Cek Unit / Inspeksi */}
              {formType === 'cek-unit' && (
                <div>
                  {!isBookingSuccess ? (
                    <form onSubmit={handleBookingSubmit} className="space-y-4 animate-fadeIn">
                      <div className="mb-4">
                        <span className="block text-xs font-bold text-[#0F3460] uppercase tracking-wider mb-1">
                          FORM JADWAL CEK FISIK UNIT
                        </span>
                        <p className="text-xs text-slate-500">
                          Jadwalkan kunjungan Anda ke pool lokasi unit lunas/gratis untuk memeriksa kondisi fisik sasis, bodi, dan menyalakan mesin didampingi mekanik ahli kami.
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-[10px] uppercase font-extrabold text-slate-500 mb-1">
                            Nama Lengkap Anda *
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                              <User className="w-4 h-4" />
                            </span>
                            <input 
                              type="text" 
                              required
                              placeholder="Contoh: Muhammad Rizki"
                              value={bookingName}
                              onChange={(e) => setBookingName(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-800 outline-none focus:border-[#0F3460] focus:ring-1 focus:ring-[#0F3460]/10"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-extrabold text-slate-500 mb-1">
                            Nomor Whatsapp / HP *
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                              <Phone className="w-4 h-4" />
                            </span>
                            <input 
                              type="tel" 
                              required
                              placeholder="Contoh: 08123456789"
                              value={bookingPhone}
                              onChange={(e) => setBookingPhone(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-800 outline-none focus:border-[#0F3460] focus:ring-1 focus:ring-[#0F3460]/10"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-extrabold text-slate-500 mb-1">
                            Nama Perusahaan (Opsional)
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                              <Building2 className="w-4 h-4" />
                            </span>
                            <input 
                              type="text" 
                              placeholder="Contoh: PT Pancaran Transportasi"
                              value={bookingCompany}
                              onChange={(e) => setBookingCompany(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-800 outline-none focus:border-[#0F3460] focus:ring-1 focus:ring-[#0F3460]/10"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] uppercase font-extrabold text-slate-500 mb-1">
                              Tanggal Kunjungan *
                            </label>
                            <input 
                              type="date" 
                              required
                              min={new Date().toISOString().split('T')[0]}
                              value={bookingDate}
                              onChange={(e) => setBookingDate(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 outline-none focus:border-[#0F3460] focus:ring-1 focus:ring-[#0F3460]/10"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] uppercase font-extrabold text-slate-500 mb-1">
                              Waktu Slot *
                            </label>
                            <select
                              value={bookingTime}
                              onChange={(e) => setBookingTime(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 outline-none focus:border-[#0F3460] focus:ring-1 focus:ring-[#0F3460]/10"
                            >
                              <option>09:00 - 11:00 WIB</option>
                              <option>11:00 - 13:00 WIB</option>
                              <option>13:00 - 15:00 WIB</option>
                              <option>15:00 - 16:30 WIB</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-extrabold text-slate-500 mb-1">
                            Jumlah Pengunjung / Attendee
                          </label>
                          <select
                            value={attendees}
                            onChange={(e) => setAttendees(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 outline-none focus:border-[#0F3460] focus:ring-1 focus:ring-[#0F3460]/10"
                          >
                            <option>1 Orang (Hanya Anda)</option>
                            <option>2 Orang (Bersama Teknisi)</option>
                            <option>3 - 5 Orang (Rombongan Perusahaan)</option>
                          </select>
                        </div>

                        <div className="bg-slate-100 p-3 rounded-lg border border-slate-200 text-xs text-slate-600 space-y-1">
                          <span className="font-extrabold block text-[#0F3460]">LOKASI INSPEKSI KUNJUNGAN:</span>
                          <span className="font-medium block">{truck.location}</span>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-emerald-600/15 transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer"
                        id="submit-booking-btn"
                      >
                        <CheckCircle2 className="w-4.5 h-4.5" />
                        Konfirmasi Jadwal Cek Unit
                      </button>
                    </form>
                  ) : (
                    /* Instant Virtual Ticket Generator Success */
                    <div className="bg-white p-5 rounded-2xl border-2 border-dashed border-emerald-500 space-y-4 animate-scaleUp">
                      <div className="text-center space-y-2">
                        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                          <CheckCircle2 className="w-7 h-7" />
                        </div>
                        <h3 className="text-lg font-black text-slate-800">TIKET INSPEKSI FISIK</h3>
                        <p className="text-xs text-slate-500 font-semibold uppercase tracking-widest">
                          KODE TIKET: <span className="text-emerald-600 font-extrabold">{generatedTicket?.bookingCode}</span>
                        </p>
                      </div>

                      <div className="space-y-2 text-xs border-t border-b border-slate-100 py-3">
                        <div className="flex justify-between">
                          <span className="text-slate-400 font-medium">Unit Truk:</span>
                          <span className="font-bold text-slate-800 text-right max-w-[200px] truncate">{truck.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400 font-medium">No. Lot:</span>
                          <span className="font-bold text-slate-800">{truck.lotNo}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400 font-medium">Pengunjung:</span>
                          <span className="font-bold text-slate-800">{generatedTicket?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400 font-medium">Perusahaan:</span>
                          <span className="font-bold text-slate-800">{generatedTicket?.company}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400 font-medium">Hari / Tanggal:</span>
                          <span className="font-bold text-slate-800">{generatedTicket?.date}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400 font-medium">Jam Slot:</span>
                          <span className="font-bold text-slate-800">{generatedTicket?.timeSlot}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400 font-medium">Lokasi Pool:</span>
                          <span className="font-bold text-slate-800 text-right max-w-[180px] truncate">{generatedTicket?.poolLocation.split(' (')[0]}</span>
                        </div>
                      </div>

                      <div className="bg-slate-50 p-3 rounded text-[10px] text-slate-500 text-center">
                        Tunjukkan tiket ini kepada petugas gerbang security Pool Pancaran di lokasi kunjungan.
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            // Simple mock download
                            alert('Voucher Tiket berhasil diunduh ke galeri gawai Anda!');
                          }}
                          className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          Unduh Tiket
                        </button>
                        <button
                          onClick={() => {
                            setIsBookingSuccess(false);
                            setBookingName('');
                            setBookingPhone('');
                            setBookingCompany('');
                          }}
                          className="flex-1 bg-[#0F3460] hover:bg-[#0b2545] text-white font-bold py-2 px-3 rounded-lg text-xs cursor-pointer"
                        >
                          Buat Janji Lain
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Form 2: Ajukan Negosiasi */}
              {formType === 'negosiasi' && (
                <div>
                  {!isNegoSuccess ? (
                    <form onSubmit={handleNegoSubmit} className="space-y-4 animate-fadeIn">
                      <div className="mb-4">
                        <span className="block text-xs font-bold text-[#0F3460] uppercase tracking-wider mb-1">
                          FORM NEGOSIASI HARGA DASAR
                        </span>
                        <p className="text-xs text-slate-500">
                          Tertarik dengan unit {truck.lotNo}? Masukkan penawaran negosiasi harga dasar Anda ke komite penilai Pancaran untuk review awal sebelum lelang live dimulai.
                        </p>
                      </div>

                      {negoErrorMsg && (
                        <div className="bg-red-50 text-red-700 text-xs p-3 rounded-lg border border-red-200 flex gap-2">
                          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                          <span>{negoErrorMsg}</span>
                        </div>
                      )}

                      <div className="space-y-3">
                        <div>
                          <label className="block text-[10px] uppercase font-extrabold text-slate-500 mb-1">
                            Nama Penawar *
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                              <User className="w-4 h-4" />
                            </span>
                            <input 
                              type="text" 
                              required
                              placeholder="Contoh: Muhammad Rizki"
                              value={negoName}
                              onChange={(e) => setNegoName(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-800 outline-none focus:border-[#0F3460] focus:ring-1 focus:ring-[#0F3460]/10"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-extrabold text-slate-500 mb-1">
                            Nomor Whatsapp / HP *
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                              <Phone className="w-4 h-4" />
                            </span>
                            <input 
                              type="tel" 
                              required
                              placeholder="Contoh: 08123456789"
                              value={negoPhone}
                              onChange={(e) => setNegoPhone(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-800 outline-none focus:border-[#0F3460] focus:ring-1 focus:ring-[#0F3460]/10"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-extrabold text-slate-500 mb-1">
                            Harga Penawaran Anda (IDR) *
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-xs">
                              Rp
                            </span>
                            <input 
                              type="number" 
                              required
                              step={1000000}
                              placeholder="Contoh: 570000000"
                              value={negoPrice}
                              onChange={(e) => setNegoPrice(Number(e.target.value))}
                              className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-800 outline-none focus:border-[#0F3460] focus:ring-1 focus:ring-[#0F3460]/10 font-bold"
                            />
                          </div>
                          <div className="flex justify-between mt-1 text-[10px] font-semibold text-slate-400">
                            <span>Harga Dasar: {formatIDR(truck.basePrice)}</span>
                            <span>Saran: {formatIDR(truck.basePrice * 0.95)} (Nego tipis)</span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-extrabold text-slate-500 mb-1">
                            Opsi Pendanaan Pilihan
                          </label>
                          <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value as any)}
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 outline-none focus:border-[#0F3460] focus:ring-1 focus:ring-[#0F3460]/10 font-medium"
                          >
                            <option value="Cash">Cash Keras (Pelunasan 3 Hari Kerja)</option>
                            <option value="Kredit 12 Bulan">Kredit Leasing - 12 Bulan</option>
                            <option value="Kredit 24 Bulan">Kredit Leasing - 24 Bulan</option>
                            <option value="Kredit 36 Bulan">Kredit Leasing - 36 Bulan</option>
                          </select>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#0F3460] hover:bg-[#0b2545] text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-[#0F3460]/15 transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer"
                        id="submit-nego-btn"
                      >
                        <Wrench className="w-4.5 h-4.5" />
                        Kirim Penawaran Negosiasi
                      </button>
                    </form>
                  ) : (
                    /* Instant Intelligent Valuation Agent Feedback */
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4 animate-scaleUp">
                      <div className="text-center space-y-1">
                        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 mx-auto flex items-center justify-center">
                          <DollarSign className="w-6 h-6" />
                        </div>
                        <h3 className="text-base font-black text-slate-800">NEGOSIASI TEREGISTRASI</h3>
                        <p className="text-[10px] text-slate-400 uppercase font-bold">
                          ANALISIS PENILAIAN INSTAN
                        </p>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                        <div className="text-xs space-y-1">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Harga Dasar Lot:</span>
                            <span className="font-bold text-slate-700">{formatIDR(truck.basePrice)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Penawaran Anda:</span>
                            <span className="font-black text-red-600">{formatIDR(negoResult?.proposedPrice || 0)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Selisih Persentase:</span>
                            <span className="font-bold text-slate-800">
                              {negoResult ? (((negoResult.proposedPrice - truck.basePrice) / truck.basePrice) * 100).toFixed(1) : 0}%
                            </span>
                          </div>
                        </div>

                        <div className="border-t border-slate-200/60 pt-3">
                          <span className="text-[9px] font-black text-[#0F3460] block uppercase tracking-wider mb-1">
                            🤖 Agen Virtual Pancaran:
                          </span>
                          <p className="text-xs text-slate-600 leading-relaxed font-medium bg-white p-2.5 rounded border border-slate-100 italic">
                            "{negoResult?.responseText}"
                          </p>
                        </div>
                      </div>

                      <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                        Anda dapat melacak tanggapan final dan status penawaran dari Komite Kredit di menu utama <strong>"Aktivitas Saya"</strong>.
                      </p>

                      <button
                        onClick={() => {
                          setIsNegoSuccess(false);
                          setNegoName('');
                          setNegoPhone('');
                          setNegoPrice(truck.basePrice);
                        }}
                        className="w-full bg-[#16213E] hover:bg-[#0F3460] text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors cursor-pointer"
                      >
                        Ajukan Negosiasi Lain
                      </button>
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Bottom contact help */}
            <div className="border-t border-slate-200/60 pt-4 mt-6 flex items-center justify-between text-xs text-slate-500">
              <span>Butuh Bantuan Cepat?</span>
              <a href="https://wa.me/628123456789" target="_blank" rel="noreferrer" className="text-emerald-600 font-extrabold flex items-center gap-1 hover:underline">
                💬 Chat WA Sales
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

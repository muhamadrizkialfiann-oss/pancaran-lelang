import { useState } from 'react';
import { InspectionBooking, NegotiationOffer, ConsignmentSubmission } from '../types';
import { 
  Calendar, MapPin, CheckCircle2, AlertCircle, Truck, 
  Tag, Sparkles, Download, UserCheck, Coins, ShieldAlert, History
} from 'lucide-react';

interface MyActivityDashboardProps {
  bookings: InspectionBooking[];
  negotiations: NegotiationOffer[];
  consignments: ConsignmentSubmission[];
  onCancelBooking: (id: string) => void;
}

export default function MyActivityDashboard({ bookings, negotiations, consignments, onCancelBooking }: MyActivityDashboardProps) {
  // Registered bidder state to make auction bids interactive
  const [registeredNipl, setRegisteredNipl] = useState<string | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [selectedPool, setSelectedPool] = useState('Jakarta Utara (Pool Cilincing)');

  // Handle Registration Deposit
  const handleRegisterNipl = () => {
    setIsRegistering(true);
    setTimeout(() => {
      const randomNipl = 'KODE-' + Math.floor(10000 + Math.random() * 90000);
      setRegisteredNipl(randomNipl);
      setIsRegistering(false);
    }, 1200);
  };

  const formatIDR = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="space-y-8 py-4 px-2" id="dashboard-portal">
      
      {/* Visual Welcome Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-extrabold text-[#16213E] flex items-center gap-2">
            <UserCheck className="w-5.5 h-5.5 text-blue-600" />
            Portal Aktivitas & Dashboard Anggota
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Kelola janji temu cek fisik, negosiasi harga dasar, titip lelang, serta status Kepesertaan Lelang Anda.
          </p>
        </div>

        {/* Dynamic Registered Status Badge */}
        <div>
          {registeredNipl ? (
            <div className="bg-emerald-50 text-emerald-700 px-4 py-2.5 rounded-xl border border-emerald-200 flex items-center gap-2 text-xs font-bold shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Status Peserta: <span className="font-extrabold text-slate-800 bg-white px-2 py-0.5 rounded border border-emerald-100">{registeredNipl}</span> (Aktif)
            </div>
          ) : (
            <div className="bg-amber-50 text-amber-700 px-4 py-2.5 rounded-xl border border-amber-200 flex items-center gap-2 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Belum Terdaftar Peserta (Tidak Bisa Menawar Live)
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Interactive Column (Deposit Card Generation) - 4/12 */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* JBA Bidder Card Maker */}
          <div className="bg-[#16213E] text-white p-6 rounded-2xl shadow-lg border border-slate-700/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-blue-600/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-red-500/10 rounded-full blur-2xl"></div>
            
            <h3 className="text-xs font-black uppercase tracking-wider text-[#E94560] border-b border-slate-700/60 pb-2.5 mb-4 flex items-center gap-1.5">
              <Coins className="w-4.5 h-4.5" />
              Pendaftaran Kartu Peserta Live
            </h3>

            {!registeredNipl ? (
              <div className="space-y-4">
                <p className="text-xs text-slate-300 leading-relaxed">
                  Ingin mengikuti lelang live hari Kamis/Jumat? Depositkan jaminan sebesar <strong>Rp 5.000.000</strong> per lot untuk mendapatkan Kartu Peserta resmi Anda.
                </p>

                <div className="space-y-2">
                  <label className="block text-[10px] uppercase font-bold text-slate-400">Pilih Lokasi Pool Lelang</label>
                  <select
                    value={selectedPool}
                    onChange={(e) => setSelectedPool(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-red-500"
                  >
                    <option>Jakarta Utara (Pool Cilincing)</option>
                    <option>Surabaya (Pool Gresik)</option>
                    <option>Medan (Pool Belawan)</option>
                  </select>
                </div>

                <div className="bg-slate-800 p-3.5 rounded-xl border border-slate-700/50 text-center">
                  <span className="block text-[10px] text-slate-400 uppercase">Jaminan Deposit Per Lot</span>
                  <span className="text-xl font-black text-white mt-1 block">Rp 5.000.000</span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">*Refundable 100% jika Anda kalah lelang</span>
                </div>

                <button
                  onClick={handleRegisterNipl}
                  disabled={isRegistering}
                  className="w-full bg-[#E94560] hover:bg-[#d63450] text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {isRegistering ? (
                    <span>Mendaftarkan Deposit...</span>
                  ) : (
                    <>
                       <Sparkles className="w-4 h-4" />
                      Deposit Rp 5JT & Ambil Kartu Peserta
                    </>
                  )}
                </button>
              </div>
            ) : (
              /* High-fidelity virtual bidder card */
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-[#0F3460] to-[#1A1A24] p-4.5 rounded-xl border border-slate-700 shadow-md space-y-4 relative">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-black text-red-500 uppercase tracking-widest">PANCARAN BIDDER</span>
                    <span className="bg-emerald-500 text-white font-extrabold text-[8px] px-1.5 py-0.5 rounded uppercase">AKTIF</span>
                  </div>

                  <div className="space-y-1">
                    <span className="block text-[10px] text-slate-400 font-bold uppercase">KODE PENAWARAN PESERTA</span>
                    <span className="text-xl font-mono font-black text-white tracking-wider block">{registeredNipl}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[9px] text-slate-400 border-t border-slate-700/50 pt-3">
                    <div>
                      <span className="block text-[8px] uppercase">LOKASI POOL:</span>
                      <span className="font-bold text-white block">{selectedPool.split(' (')[0]}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] uppercase">DEPOSIT JAMINAN:</span>
                      <span className="font-bold text-emerald-400 block">Rp 5.000.000</span>
                    </div>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 text-center leading-relaxed">
                  Tunjukkan kode peserta di atas saat lelang live berlangsung untuk mengajukan tawaran lot di podium lelang.
                </div>

                <button
                  onClick={() => {
                    setRegisteredNipl(null);
                    alert('Pendaftaran peserta dibatalkan dan uang jaminan jaminan Rp 5.000.000 berhasil direfund kembali ke rekening Anda!');
                  }}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-red-400 hover:text-red-300 border border-slate-700 font-bold py-2 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Tarik Refund Deposit Jaminan
                </button>
              </div>
            )}
          </div>

          <div className="bg-amber-50 border border-amber-200 p-4.5 rounded-2xl flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold text-amber-800 text-xs uppercase tracking-wider mb-1">KETENTUAN BIDDING</h5>
              <p className="text-xs text-amber-700 leading-relaxed">
                Status kepesertaan berlaku selama 30 hari kalender. Jika dalam 30 hari Anda belum memenangkan unit lelang, deposit dapat direfund penuh tanpa potongan biaya administrasi sepeserpun.
              </p>
            </div>
          </div>

        </div>

        {/* Right Tabular lists column - 8/12 */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Tabular Panel 1: Inspeksi Scheduled */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex justify-between items-center">
              <h3 className="font-bold text-[#16213E] text-sm md:text-base flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#0F3460]" />
                Janji Temu Cek Unit ({bookings.length})
              </h3>
              <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">
                Cek Fisik Gratis
              </span>
            </div>

            {bookings.length === 0 ? (
              <div className="p-8 text-center text-slate-400 space-y-1">
                <p className="text-sm font-bold">Belum ada janji temu terdaftar.</p>
                <p className="text-xs">Pilih salah satu unit di Katalog, klik gambar, lalu isi formulir "Cek Unit".</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-500">
                      <th className="p-4 font-bold">Kode Tiket</th>
                      <th className="p-4 font-bold">Nama Truk / Lot</th>
                      <th className="p-4 font-bold">Kunjungan / Jam</th>
                      <th className="p-4 font-bold">Lokasi Pool</th>
                      <th className="p-4 font-bold">Status</th>
                      <th className="p-4 font-bold text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b) => (
                      <tr key={b.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                        <td className="p-4 font-mono font-bold text-blue-600">{b.bookingCode}</td>
                        <td className="p-4">
                          <span className="font-semibold block text-slate-800 truncate max-w-[160px]">{b.truckName}</span>
                          <span className="text-[10px] text-slate-400 font-bold block">{b.lotNo}</span>
                        </td>
                        <td className="p-4">
                          <span className="font-bold block text-slate-700">{b.date}</span>
                          <span className="text-[10px] text-slate-400 block">{b.timeSlot}</span>
                        </td>
                        <td className="p-4 text-slate-500 font-medium truncate max-w-[120px]">{b.poolLocation.split(' (')[0]}</td>
                        <td className="p-4">
                          <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded text-[10px] border border-emerald-100">
                            {b.status}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => onCancelBooking(b.id)}
                            className="text-red-500 hover:text-red-700 font-bold hover:underline cursor-pointer"
                          >
                            Batalkan
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Tabular Panel 2: Negotiations Offer */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
              <h3 className="font-bold text-[#16213E] text-sm md:text-base flex items-center gap-2">
                <Tag className="w-5 h-5 text-[#0F3460]" />
                Riwayat Pengajuan Negosiasi Harga Dasar ({negotiations.length})
              </h3>
            </div>

            {negotiations.length === 0 ? (
              <div className="p-8 text-center text-slate-400 space-y-1">
                <p className="text-sm font-bold">Belum ada negosiasi diajukan.</p>
                <p className="text-xs">Ajukan penawaran harga Anda pada formulir Negosiasi di modal detail unit.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-500">
                      <th className="p-4 font-bold">Tanggal</th>
                      <th className="p-4 font-bold">Armada Truk / Lot</th>
                      <th className="p-4 font-bold">Harga Awal</th>
                      <th className="p-4 font-bold">Tawaran Anda</th>
                      <th className="p-4 font-bold">Metode Bayar</th>
                      <th className="p-4 font-bold">Status Evaluasi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {negotiations.map((n) => (
                      <tr key={n.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                        <td className="p-4 text-slate-500 font-medium">{n.date}</td>
                        <td className="p-4">
                          <span className="font-semibold block text-slate-800 truncate max-w-[150px]">{n.truckName}</span>
                          <span className="text-[10px] text-slate-400 font-bold block">{n.lotNo}</span>
                        </td>
                        <td className="p-4 text-slate-500 font-medium">{formatIDR(n.basePrice)}</td>
                        <td className="p-4 font-black text-red-600">{formatIDR(n.proposedPrice)}</td>
                        <td className="p-4 text-slate-600 font-medium">{n.paymentMethod}</td>
                        <td className="p-4">
                          <span className={`font-bold px-2 py-0.5 rounded text-[10px] border ${
                            n.status.includes('Diterima') 
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                              : 'bg-amber-50 text-amber-700 border-amber-100'
                          }`}>
                            {n.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Tabular Panel 3: Consignments Submitted */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
              <h3 className="font-bold text-[#16213E] text-sm md:text-base flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#0F3460]" />
                Truk yang Dititipkan ({consignments.length})
              </h3>
            </div>

            {consignments.length === 0 ? (
              <div className="p-8 text-center text-slate-400 space-y-1">
                <p className="text-sm font-bold">Belum ada unit yang dititipkan.</p>
                <p className="text-xs">Anda dapat mendaftarkan truk armada Anda untuk ikut dilelang di tab "Titip Lelang".</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-500">
                      <th className="p-4 font-bold">ID Titip</th>
                      <th className="p-4 font-bold">Nama Armada</th>
                      <th className="p-4 font-bold">Perakitan / Kategori</th>
                      <th className="p-4 font-bold">Taksiran Appraisal</th>
                      <th className="p-4 font-bold">Status Alur</th>
                    </tr>
                  </thead>
                  <tbody>
                    {consignments.map((c) => (
                      <tr key={c.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                        <td className="p-4 font-mono font-bold text-slate-700">{c.id}</td>
                        <td className="p-4">
                          <span className="font-bold text-slate-800 block">{c.brand} {c.modelName}</span>
                          <span className="text-[10px] text-slate-400 font-bold block">Pemilik: {c.ownerName}</span>
                        </td>
                        <td className="p-4">
                          <span className="font-medium block text-slate-700">Tahun {c.year}</span>
                          <span className="text-[10px] text-slate-400 block">{c.category}</span>
                        </td>
                        <td className="p-4 font-black text-emerald-600">{formatIDR(c.estimatedValue)}</td>
                        <td className="p-4">
                          <span className="bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded text-[10px] border border-amber-100">
                            {c.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

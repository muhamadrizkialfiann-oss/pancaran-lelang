import { useState } from 'react';
import { 
  Truck, Calendar, History, Calculator, ArrowRight, User, X, 
  ShieldCheck, Coins, BookOpen, Clock, FileText, CheckCircle2,
  ChevronRight, AlertTriangle, MapPin, Award, LogOut, Plus, Shield
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  bookingCount: number;
  negoCount: number;
  consignmentCount: number;
  user: { email: string; name: string; phone: string; role: 'admin' | 'user' } | null;
  onLogout: () => void;
  onOpenAuth: (initialTab?: 'login' | 'register') => void;
  onOpenPostAuction: () => void;
}

export default function Header({ 
  activeTab, 
  setActiveTab, 
  bookingCount, 
  negoCount, 
  consignmentCount,
  user,
  onLogout,
  onOpenAuth,
  onOpenPostAuction
}: HeaderProps) {
  const totalActivities = bookingCount + negoCount + consignmentCount;
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [selectedStep, setSelectedStep] = useState<number>(1);

  const guideSteps = [
    {
      step: 1,
      title: "Cari & Cek Fisik Unit",
      icon: MapPin,
      shortDesc: "Pilih truk andalan Anda dan lakukan inspeksi fisik di pool resmi kami.",
      detailTitle: "Kunjungi Pool & Lakukan Inspeksi Bebas",
      bullets: [
        "Open House diselenggarakan setiap hari Senin - Rabu (Pukul 09:00 s/d 16:00 WIB) di Pool Cilincing Jakarta Utara.",
        "Silakan datangi lokasi untuk menyalakan mesin, meneliti bagian kolong sasis, interior, ban, serta kelengkapan dokumen pendukung.",
        "Kami membebaskan Anda membawa mekanik andalan pribadi maupun inspektur pihak ketiga dari jasa profesional untuk kenyamanan Anda.",
        "Inspeksi fisik ini 100% GRATIS dan tidak dipungut biaya masuk sepeserpun."
      ],
      badge: "Senin - Rabu (09:00 - 16:00)"
    },
    {
      step: 2,
      title: "Dapatkan Nomor Peserta",
      icon: FileText,
      shortDesc: "Terima kode penawaran aktif secara instan untuk mulai mengajukan penawaran.",
      detailTitle: "Kode Identitas Penawaran Resmi",
      bullets: [
        "Sistem kami akan langsung merilis Kartu Peserta elektronik yang unik setelah Anda mendaftar atau masuk ke akun Anda.",
        "Anda akan mendapatkan Kode Penawaran khusus (contoh: KODE-58291) yang tampil di menu 'Aktivitas Saya'.",
        "Gunakan kode digital ini sebagai penanda resmi identitas Anda saat menawar harga lot di podium lelang.",
        "Pendaftaran dan nomor peserta sepenuhnya GRATIS tanpa ada biaya jaminan deposit apa pun."
      ],
      badge: "Kode Unik Digital"
    },
    {
      step: 3,
      title: "Ikuti Lelang Live Bidding",
      icon: Clock,
      shortDesc: "Tawar unit secara real-time pada sesi lelang utama di hari Kamis & Jumat.",
      detailTitle: "Sesi Live Bidding Seru & Transparan",
      bullets: [
        "Lelang utama diselenggarakan setiap hari Kamis & Jumat mulai pukul 09:00 WIB hingga selesai.",
        "Ajukan penawaran harga terbaik Anda. Anda bisa menawar secara mandiri melalui tombol Live Bidding atau dipandu asisten sales kami via telepon.",
        "Sistem lelang kami transparan, adil, dan real-time tanpa ada manipulasi harga dasar."
      ],
      badge: "Kamis & Jumat (09:00 WIB)"
    },
    {
      step: 4,
      title: "Pelunasan & Serah Terima",
      icon: ShieldCheck,
      shortDesc: "Selesaikan administrasi kemenangan dan serah terima unit secara resmi.",
      detailTitle: "Penyelesaian Transaksi Profesional",
      bullets: [
        "Bagi Pemenang Lelang: Lakukan pelunasan sisa pembayaran dalam waktu maksimal 3 hari kerja setelah lelang ditutup.",
        "Setelah pelunasan dikonfirmasi, Anda bisa langsung membawa pulang unit truk beserta dokumen lengkap (STNK, BPKB asli) dengan surat serah terima resmi.",
        "Bagi peserta yang belum menang: Anda dapat langsung memilih unit impian lainnya di periode lelang berikutnya tanpa biaya apa pun."
      ],
      badge: "Proses Cepat & Resmi"
    }
  ];

  return (
    <div className="w-full">
      {/* JBA-inspired top utility bar */}
      <div className="bg-[#16213E] text-slate-100 py-2.5 px-4 md:px-8 text-xs flex flex-col md:flex-row justify-end items-center gap-2 border-b border-slate-700/50">
        <div className="flex items-center gap-4 text-slate-300">
          <button 
            onClick={() => {
              setIsGuideOpen(true);
              setSelectedStep(1);
            }} 
            className="hover:text-red-400 transition-colors focus:outline-none cursor-pointer font-medium"
          >
            Panduan Lelang
          </button>
          <span className="text-slate-600">|</span>
          <a href="#bantuan" className="hover:text-red-400 transition-colors">CS Hotline: (021) 2929-8888</a>
          <span className="text-slate-600">|</span>
          <span className="font-bold text-white flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> ID (Bahasa)
          </span>
        </div>
      </div>

      {/* Main sticky navigation header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 md:px-8 py-4 shadow-sm flex flex-col lg:flex-row justify-between items-center gap-4">
        <div className="flex items-center justify-between w-full lg:w-auto">
          {/* Brand Logo */}
          <button 
            onClick={() => setActiveTab('beranda')} 
            className="flex items-center gap-2.5 text-left focus:outline-none cursor-pointer"
            id="logo-button"
          >
            <div className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-md border border-slate-100 overflow-hidden shrink-0">
              <img 
                src="https://lh3.googleusercontent.com/d/1LmpjB5qAX8ev5_JRzYQDwjM58RxHl18X" 
                alt="Pancaran Lelang Logo" 
                className="w-full h-full object-contain p-0.5"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="block text-xl font-black text-[#0F3460] tracking-tight leading-none">
                PANCARAN <span className="text-red-500">LELANG</span>
              </span>
              <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                Fleet Logistics Auction System
              </span>
            </div>
          </button>

          {/* User profile actions (Mobile) */}
          <div className="flex items-center gap-2 lg:hidden">
            {user ? (
              <div className="flex items-center gap-1.5">
                {user.role === 'admin' && (
                  <button
                    onClick={onOpenPostAuction}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer"
                    title="Posting Unit Lelang"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={onLogout}
                  className="p-2 text-slate-500 hover:text-red-500 hover:bg-slate-50 rounded-lg cursor-pointer"
                  title="Keluar"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => onOpenAuth('login')}
                className="p-2 text-slate-600 hover:text-[#0F3460] hover:bg-slate-50 rounded-lg cursor-pointer"
                title="Masuk"
              >
                <User className="w-4.5 h-4.5" />
              </button>
            )}
            <button 
              onClick={() => setActiveTab('aktivitas')}
              className={`relative p-2 rounded-full ${activeTab === 'aktivitas' ? 'bg-red-50 text-red-500' : 'text-slate-600'}`}
            >
              <History className="w-5 h-5" />
              {totalActivities > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white font-bold text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center">
                  {totalActivities}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Navigation Menus - All Active & Selectable */}
        <nav className="w-full lg:w-auto">
          <ul className="flex flex-wrap items-center justify-center gap-1 md:gap-2">
            {[
              { id: 'beranda', label: 'Katalog Truk', icon: Truck },
              { id: 'aktivitas', label: 'Aktivitas Saya', icon: History, count: totalActivities },
            ].map((menu) => {
              const Icon = menu.icon;
              const isActive = activeTab === menu.id;
              return (
                <li key={menu.id}>
                  <button
                    id={`nav-tab-${menu.id}`}
                    onClick={() => setActiveTab(menu.id)}
                    className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#0F3460] text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{menu.label}</span>
                    {menu.count && menu.count > 0 ? (
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${isActive ? 'bg-red-500 text-white' : 'bg-red-100 text-red-600'}`}>
                        {menu.count}
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bidder registration actions */}
        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-4 bg-slate-50 border border-slate-200/60 px-4 py-2 rounded-xl">
              <div className="text-left">
                <span className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">
                  Sesi {user.role === 'admin' ? 'Administrator' : 'Keanggotaan'}
                </span>
                <span className="block text-xs font-bold text-slate-700 max-w-[150px] truncate" title={user.email}>
                  {user.name}
                </span>
              </div>

              {user.role === 'admin' && (
                <button
                  onClick={onOpenPostAuction}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wide px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Posting Unit
                </button>
              )}

              <button
                onClick={onLogout}
                className="text-slate-500 hover:text-red-600 p-1.5 hover:bg-slate-200/50 rounded-lg transition-colors cursor-pointer"
                title="Keluar / Logout"
              >
                <LogOut className="w-4.5 h-4.5" />
              </button>
            </div>
          ) : (
            <>
              <button 
                onClick={() => onOpenAuth('login')}
                className="text-sm font-bold text-slate-700 hover:text-[#0F3460] transition-colors flex items-center gap-1.5 px-3 py-2 cursor-pointer"
                id="login-button"
              >
                <User className="w-4 h-4" />
                Masuk Anggota
              </button>
              <button
                onClick={() => onOpenAuth('register')}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md shadow-red-500/20 transition-all duration-200 hover:scale-102 cursor-pointer"
                id="register-nipl-button"
              >
                Daftar Peserta Sekarang
              </button>
            </>
          )}
        </div>
      </header>

      {/* Panduan Lelang Modal */}
      {isGuideOpen && (
        <div className="fixed inset-0 bg-slate-900/65 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-fadeIn" id="panduan-lelang-modal">
            {/* Modal Header */}
            <div className="bg-[#0F3460] text-white px-6 py-4 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-5 h-5 text-red-400 shrink-0" />
                <div className="min-w-0">
                  <h3 className="font-extrabold text-sm md:text-base uppercase tracking-wider truncate">Panduan Resmi Lelang Pancaran</h3>
                  <p className="text-[10px] text-slate-300 font-medium truncate">Langkah mudah memenangkan armada truk impian Anda dengan aman & legal</p>
                </div>
              </div>
              <button 
                onClick={() => setIsGuideOpen(false)}
                className="text-slate-300 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12">
              
              {/* Left Column: Steps Timeline */}
              <div className="md:col-span-5 bg-slate-50 border-r border-slate-100 p-4 md:p-6 overflow-y-auto flex md:flex-col gap-2.5 scrollbar-thin md:max-h-full">
                <div className="hidden md:block mb-3">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Alur Proses Lelang</span>
                  <p className="text-xs text-slate-500 mt-0.5">Ikuti 4 langkah mudah berikut ini:</p>
                </div>

                {guideSteps.map((item) => {
                  const StepIcon = item.icon;
                  const isSelected = selectedStep === item.step;
                  return (
                    <button
                      key={item.step}
                      onClick={() => setSelectedStep(item.step)}
                      className={`w-full text-left p-3 rounded-xl border transition-all duration-200 cursor-pointer flex items-center gap-3 shrink-0 md:shrink ${
                        isSelected 
                          ? 'bg-white border-[#0F3460]/30 shadow-md shadow-slate-100 md:translate-x-1' 
                          : 'bg-transparent border-transparent hover:bg-slate-100/70 text-slate-600'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shrink-0 transition-colors ${
                        isSelected ? 'bg-[#0F3460] text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {item.step}
                      </div>
                      <div className="hidden md:block min-w-0">
                        <span className={`block font-bold text-xs ${isSelected ? 'text-[#0F3460]' : 'text-slate-700'}`}>
                          {item.title}
                        </span>
                        <span className="block text-[10px] text-slate-400 truncate mt-0.5">
                          {item.badge}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Step Detail Display */}
              <div className="md:col-span-7 p-6 overflow-y-auto flex flex-col justify-between max-h-[50vh] md:max-h-full">
                {(() => {
                  const currentData = guideSteps.find(s => s.step === selectedStep)!;
                  const IconComponent = currentData.icon;
                  return (
                    <div className="space-y-5 animate-fadeIn">
                      
                      {/* Title & Icon Header */}
                      <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                        <div className="space-y-1">
                          <span className="bg-red-100 text-red-700 font-extrabold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded">
                            Langkah {currentData.step} dari 4
                          </span>
                          <h4 className="text-base md:text-lg font-black text-[#0F3460] tracking-tight mt-1">
                            {currentData.detailTitle}
                          </h4>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0F3460] shrink-0 shadow-xs">
                          <IconComponent className="w-6 h-6" />
                        </div>
                      </div>

                      {/* Detail Bullets */}
                      <div className="space-y-3.5">
                        {currentData.bullets.map((bullet, index) => (
                          <div key={index} className="flex gap-2.5 items-start">
                            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                              {bullet}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Action buttons inside the slide */}
                      <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex items-center justify-between gap-3 mt-4">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                          <span className="text-[11px] text-slate-500 font-medium">Ketentuan: {currentData.badge}</span>
                        </div>
                        
                        {currentData.step < 4 ? (
                          <button 
                            onClick={() => setSelectedStep(prev => prev + 1)}
                            className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-1.5 px-3 rounded-lg text-xs transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <span>Langkah Berikutnya</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg">
                            <Award className="w-4 h-4" />
                            <span>Prosedur Selesai</span>
                          </div>
                        )}
                      </div>

                    </div>
                  );
                })()}
              </div>

            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-3 shrink-0">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                <span className="text-left">Seluruh proses lelang diaudit secara independen & transparan.</span>
              </div>
              <div className="flex gap-2.5 w-full sm:w-auto shrink-0">
                <button
                  onClick={() => setIsGuideOpen(false)}
                  className="flex-1 sm:flex-none bg-[#0F3460] hover:bg-[#0b2545] text-white font-extrabold text-xs px-6 py-2.5 rounded-lg shadow-md shadow-[#0F3460]/10 transition-all cursor-pointer text-center"
                >
                  Saya Mengerti, Tutup Panduan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

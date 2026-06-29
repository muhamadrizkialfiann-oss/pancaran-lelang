import { Truck, Calendar, History, Calculator, ArrowRight, User } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  bookingCount: number;
  negoCount: number;
  consignmentCount: number;
}

export default function Header({ activeTab, setActiveTab, bookingCount, negoCount, consignmentCount }: HeaderProps) {
  const totalActivities = bookingCount + negoCount + consignmentCount;

  return (
    <div className="w-full">
      {/* JBA-inspired top utility bar */}
      <div className="bg-[#16213E] text-slate-100 py-2.5 px-4 md:px-8 text-xs flex flex-col md:flex-row justify-between items-center gap-2 border-b border-slate-700/50">
        <div className="flex items-center gap-2">
          <span className="bg-red-500 text-white font-bold px-2 py-0.5 rounded text-[10px] tracking-wider animate-pulse">
            INFO LELANG
          </span>
          <span className="text-slate-300 font-medium">
            Pool Jakarta (Cilincing) Open House Senin - Rabu, Pukul 09:00 - 16:00 WIB
          </span>
        </div>
        <div className="flex items-center gap-4 text-slate-300">
          <a href="#panduan" className="hover:text-red-400 transition-colors">Panduan Lelang</a>
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
              { id: 'jadwal', label: 'Jadwal Live', icon: Calendar },
              { id: 'titip', label: 'Titip Lelang', icon: ArrowRight },
              { id: 'kalkulator', label: 'Simulasi Leasing', icon: Calculator },
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
          <button 
            onClick={() => setActiveTab('aktivitas')}
            className="text-sm font-bold text-slate-700 hover:text-[#0F3460] transition-colors flex items-center gap-1.5 px-3 py-2 cursor-pointer"
            id="login-button"
          >
            <User className="w-4 h-4" />
            Masuk Anggota
          </button>
          <button
            onClick={() => setActiveTab('jadwal')}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md shadow-red-500/20 transition-all duration-200 hover:scale-102 cursor-pointer"
            id="register-nipl-button"
          >
            Daftar Peserta Sekarang
          </button>
        </div>
      </header>
    </div>
  );
}

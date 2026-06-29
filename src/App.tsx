import { useState, useEffect } from 'react';
import { Truck, InspectionBooking, NegotiationOffer, ConsignmentSubmission } from './types';
import { INITIAL_TRUCKS } from './data';

// Component Imports
import Header from './components/Header';
import TruckCard from './components/TruckCard';
import ReviewModal from './components/ReviewModal';
import MyActivityDashboard from './components/MyActivityDashboard';
import AuthModal from './components/AuthModal';
import AdminPostAuctionModal from './components/AdminPostAuctionModal';

import { 
  getTrucks, 
  getBookings, 
  getNegotiations, 
  getConsignments, 
  addBooking, 
  addNegotiation, 
  addConsignment, 
  deleteBooking as dbDeleteBooking 
} from './lib/firestoreService';

// Icon Imports
import { 
  Search, SlidersHorizontal, MapPin, Calendar, BookOpen, 
  HelpCircle, ShieldCheck, CheckCircle2, Award, Sparkles, PhoneCall, Plus 
} from 'lucide-react';

export default function App() {
  // Navigation Tabs State: 'beranda' | 'jadwal' | 'titip' | 'kalkulator' | 'aktivitas'
  const [activeTab, setActiveTab] = useState<string>('beranda');

  // Interactive Database State (starts with hydration)
  const [trucks, setTrucks] = useState<Truck[]>(INITIAL_TRUCKS);
  
  // Auth state
  const [user, setUser] = useState<{ email: string; name: string; phone: string; role: 'admin' | 'user' } | null>(() => {
    const saved = localStorage.getItem('pancaran_session');
    return saved ? JSON.parse(saved) : null;
  });

  // Modal and Tab control states
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
  const [isAdminPostOpen, setIsAdminPostOpen] = useState(false);
  
  const [bookings, setBookings] = useState<InspectionBooking[]>([
    {
      id: 'b-init-1',
      truckId: '1',
      truckName: 'HINO RANGER FL 260 JW (6x2) WINGBOX',
      lotNo: 'LOT 101',
      name: 'Muhammad Rizki',
      phone: '08123456789',
      company: 'PT Global Logistik',
      date: '2026-07-01',
      timeSlot: '11:00 - 13:00 WIB',
      status: 'Disetujui',
      bookingCode: 'INS-493821',
      poolLocation: 'Jakarta (Pool Cilincing)'
    }
  ]);

  const [negotiations, setNegotiations] = useState<NegotiationOffer[]>([
    {
      id: 'n-init-1',
      truckId: '2',
      truckName: 'MITSUBISHI FUSO FIGHTER FN 62 F TRACTOR HEAD (6x4)',
      lotNo: 'LOT 102',
      proposedPrice: 700000000,
      paymentMethod: 'Cash',
      name: 'Muhammad Rizki',
      phone: '08123456789',
      status: 'Penawaran Dipertimbangkan',
      responseText: 'Penawaran Anda sebesar Rp 700.000.000 telah masuk ke sistem pengadaan kami. Karena berada sedikit di bawah harga dasar, tim penilai kami akan mereview dalam 1x24 jam.',
      date: '28/06/2026',
      basePrice: 720000000
    }
  ]);

  const [consignments, setConsignments] = useState<ConsignmentSubmission[]>([
    {
      id: 'CON-9831',
      brand: 'Isuzu',
      modelName: 'Giga FVR Cargo Box',
      year: 2020,
      category: 'Box Rigit',
      conditionGrade: 'B+',
      ownerName: 'Muhammad Rizki',
      phone: '08123456789',
      estimatedValue: 420000000,
      status: 'Menunggu Persetujuan',
      date: '28/06/2026'
    }
  ]);

  // Selected Truck state for detailed Review modal
  const [selectedTruck, setSelectedTruck] = useState<Truck | null>(null);

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('Semua');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedLocation, setSelectedLocation] = useState('Semua');
  const [sortOption, setSortOption] = useState('lot-asc');

  // Announcements state
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  // Brand Options & Counts helper
  const brands = ['Semua', 'Hino', 'Mitsubishi Fuso', 'Isuzu', 'Scania'];
  const categories = ['Semua', 'Wingbox', 'Tractor Head', 'Dump Truck', 'Box Rigit', 'Tangki'];
  const locations = ['Semua', 'Jakarta', 'Surabaya', 'Medan'];

  // Hydrate data from Firestore on Mount
  useEffect(() => {
    async function loadFirebaseData() {
      try {
        const firebaseTrucks = await getTrucks();
        if (firebaseTrucks.length > 0) {
          setTrucks(firebaseTrucks);
        }

        const firebaseBookings = await getBookings();
        if (firebaseBookings.length > 0) {
          setBookings(firebaseBookings);
        }

        const firebaseNegotiations = await getNegotiations();
        if (firebaseNegotiations.length > 0) {
          setNegotiations(firebaseNegotiations);
        }

        const firebaseConsignments = await getConsignments();
        if (firebaseConsignments.length > 0) {
          setConsignments(firebaseConsignments);
        }
      } catch (err) {
        console.error('Failed to load data from Firestore:', err);
      }
    }
    loadFirebaseData();
  }, []);

  // Auth session handlers
  const handleLoginSuccess = (userSession: typeof user) => {
    setUser(userSession);
    if (userSession) {
      localStorage.setItem('pancaran_session', JSON.stringify(userSession));
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('pancaran_session');
  };

  const handleOpenAuth = (initialTab: 'login' | 'register' = 'login') => {
    setAuthTab(initialTab);
    setIsAuthOpen(true);
  };

  const handlePostSuccess = (newTruck: Truck) => {
    setTrucks(prev => [newTruck, ...prev]);
    // Scroll to filters to see newly posted truck
    setTimeout(() => {
      document.getElementById('katalog-filter')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Handler submissions from children components
  const handleBookingSubmitted = async (newBooking: InspectionBooking) => {
    setBookings(prev => [newBooking, ...prev]);
    try {
      await addBooking(newBooking);
    } catch (err) {
      console.error('Error saving booking to Firestore:', err);
    }
  };

  const handleNegotiationSubmitted = async (newOffer: NegotiationOffer) => {
    setNegotiations(prev => [newOffer, ...prev]);
    try {
      await addNegotiation(newOffer);
    } catch (err) {
      console.error('Error saving negotiation to Firestore:', err);
    }
  };

  const handleConsignmentSubmitted = async (newConsignment: ConsignmentSubmission) => {
    setConsignments(prev => [newConsignment, ...prev]);
    try {
      await addConsignment(newConsignment);
    } catch (err) {
      console.error('Error saving consignment to Firestore:', err);
    }
  };

  const handleCancelBooking = async (id: string) => {
    setBookings(prev => prev.filter(b => b.id !== id));
    try {
      await dbDeleteBooking(id);
    } catch (err) {
      console.error('Error deleting booking from Firestore:', err);
    }
  };

  // Filter & Sort Logic
  const filteredTrucks = trucks.filter(truck => {
    const matchesSearch = truck.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          truck.lotNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          truck.brand.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesBrand = selectedBrand === 'Semua' || truck.brand === selectedBrand;
    
    const matchesCategory = selectedCategory === 'Semua' || truck.category === selectedCategory;
    
    const matchesLocation = selectedLocation === 'Semua' || truck.location.includes(selectedLocation);

    return matchesSearch && matchesBrand && matchesCategory && matchesLocation;
  }).sort((a, b) => {
    if (sortOption === 'lot-asc') {
      return a.lotNo.localeCompare(b.lotNo);
    } else if (sortOption === 'price-asc') {
      return a.basePrice - b.basePrice;
    } else if (sortOption === 'price-desc') {
      return b.basePrice - a.basePrice;
    } else if (sortOption === 'year-desc') {
      return b.year - a.year;
    }
    return 0;
  });

  // Calculate count of trucks per brand for dynamic badges
  const getBrandCount = (brand: string) => {
    if (brand === 'Semua') return trucks.length;
    return trucks.filter(t => t.brand === brand).length;
  };

  // Calculate highest bid/vote for a truck dynamically
  const getHighestBidForTruck = (truckId: string, basePrice: number) => {
    const idNum = parseInt(truckId) || 1;
    // unique deterministic mock increment per truck
    const mockIncrement = (idNum * 3500000) + 4000000;
    const initialHighest = basePrice + mockIncrement;

    const truckNegos = negotiations.filter(n => n.truckId === truckId);
    const maxNego = truckNegos.length > 0 ? Math.max(...truckNegos.map(n => n.proposedPrice)) : 0;

    return Math.max(initialHighest, maxNego);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      
      {/* Dynamic Header Component */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        bookingCount={bookings.length}
        negoCount={negotiations.length}
        consignmentCount={consignments.length}
        user={user}
        onLogout={handleLogout}
        onOpenAuth={handleOpenAuth}
        onOpenPostAuction={() => setIsAdminPostOpen(true)}
      />

      {/* Main Body */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 md:px-8 py-8">
        
        {/* Floating live news banner */}
        {isBannerVisible && activeTab === 'beranda' && (
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shadow-xs">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-xs md:text-sm text-blue-800 font-bold">
                Lelang Gelombang XXI Dibuka: <span className="underline">45 Unit Tractor & Dump Truck</span> Siap Dikunjungi Di Pool Cilincing Hari Ini!
              </span>
            </div>
            <button 
              onClick={() => setIsBannerVisible(false)}
              className="text-xs font-bold text-blue-500 hover:text-blue-800 shrink-0 cursor-pointer"
            >
              Sembunyikan
            </button>
          </div>
        )}

        {/* Tab content 1: Katalog Truk (Beranda) */}
        {activeTab === 'beranda' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Banner Jumbotron */}
            <div className="bg-gradient-to-br from-[#0F3460] to-[#16213E] text-white rounded-2xl p-6 md:p-10 text-center md:text-left shadow-lg relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/10 rounded-full blur-3xl"></div>
              
              <div className="space-y-4 max-w-2xl relative z-10">
                <span className="bg-red-500 text-white font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded">
                  Portal Resmi Lelang Pancaran Group
                </span>
                <h1 className="text-2xl md:text-4xl font-black tracking-tight leading-tight">
                  Lelang Truk & Alat Berat Terbesar, Transparan, dan Terpercaya
                </h1>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-lg">
                  Semua unit kami telah melalui inspeksi ketat 150+ titik uji oleh mekanik independen bersertifikat. Dokumen BPKB dan STNK aman, legal, dan dijamin 100% orisinal.
                </p>
                
                <div className="flex flex-wrap gap-4 pt-2">
                  <button 
                    onClick={() => {
                      document.getElementById('katalog-filter')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-md shadow-red-500/10 transition-all hover:scale-102 cursor-pointer"
                  >
                    Mulai Cari Truk
                  </button>
                </div>
              </div>

              {/* JBA Statistics widget */}
              <div className="bg-white/10 border border-white/10 backdrop-blur-md p-6 rounded-2xl max-w-xs w-full text-center space-y-4 relative z-10 shrink-0">
                <div className="space-y-1">
                  <span className="block text-[10px] text-slate-300 font-extrabold uppercase tracking-wider">Lolos Inspeksi</span>
                  <span className="block text-3xl font-black text-white">100% Lolos</span>
                </div>
                <p className="text-[10px] text-slate-300 leading-relaxed">
                  Semua kendaraan lelang dipastikan memiliki nomor rangka & nomor mesin lurus terdaftar di Kepolisian.
                </p>
              </div>
            </div>

            {/* Advanced Filters Section */}
            <div id="katalog-filter" className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
              
              {/* Filter Top: Search & Sorting */}
              <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
                
                {/* Search Bar */}
                <div className="relative flex-grow max-w-lg">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <Search className="w-5 h-5" />
                  </span>
                  <input
                    type="text"
                    placeholder="Cari berdasarkan nama truk, lot lencana, atau spesifikasi (Hino, LOT 101, Fuso)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-800 outline-none focus:bg-white focus:border-[#0F3460] focus:ring-2 focus:ring-[#0F3460]/10 transition-all font-medium"
                  />
                </div>

                {/* Sort Option */}
                <div className="flex items-center gap-2.5 shrink-0">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Urutkan:</span>
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 px-3.5 py-2.5 rounded-xl outline-none focus:bg-white focus:border-[#0F3460] cursor-pointer"
                  >
                    <option value="lot-asc">Lot Terkecil (Awal)</option>
                    <option value="price-asc">Harga Dasar: Terendah</option>
                    <option value="price-desc">Harga Dasar: Tertinggi</option>
                    <option value="year-desc">Tahun Perakitan Terbaru</option>
                  </select>
                </div>

              </div>

              {/* Brand Filters Interactive row */}
              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100">
                <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mr-2">Merek:</span>
                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedBrand === brand
                        ? 'bg-[#0F3460] text-white shadow-sm'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {brand} ({getBrandCount(brand)})
                  </button>
                ))}
              </div>

              {/* Sub-Filters: Category & Location dropdown selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="block text-[10px] uppercase font-bold text-slate-400">Pilih Karoseri</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 px-3 py-2.5 rounded-lg focus:bg-white outline-none"
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c === 'Semua' ? 'Semua Tipe Karoseri' : c}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] uppercase font-bold text-slate-400">Lokasi Pool Kendaraan</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 px-3 py-2.5 rounded-lg focus:bg-white outline-none"
                  >
                    {locations.map(l => (
                      <option key={l} value={l}>{l === 'Semua' ? 'Semua Pool Wilayah' : `Pool ${l}`}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-end justify-end md:col-span-1">
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedBrand('Semua');
                      setSelectedCategory('Semua');
                      setSelectedLocation('Semua');
                    }}
                    className="text-xs font-bold text-red-500 hover:text-red-600 px-4 py-2.5 rounded-lg bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
                  >
                    Reset Semua Pencarian
                  </button>
                </div>
              </div>

            </div>

            {/* Truck Grid Output */}
            {filteredTrucks.length === 0 ? (
              <div className="text-center bg-white p-12 rounded-2xl border border-slate-200 space-y-2">
                <SlidersHorizontal className="w-10 h-10 text-slate-300 mx-auto" />
                <h4 className="font-bold text-slate-700 text-base">Tidak Ada Unit Cocok</h4>
                <p className="text-xs text-slate-400">Saran: kurangi parameter filter Anda atau ketik kata kunci yang lebih umum.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTrucks.map((truck) => (
                  <TruckCard 
                    key={truck.id} 
                    truck={truck} 
                    highestBid={getHighestBidForTruck(truck.id, truck.basePrice)}
                    onSelect={(selected) => setSelectedTruck(selected)} 
                  />
                ))}
              </div>
            )}

          </div>
        )}

        {/* Tab content 5: Aktivitas Saya (Dashboard) */}
        {activeTab === 'aktivitas' && (
          <MyActivityDashboard 
            bookings={bookings} 
            negotiations={negotiations} 
            consignments={consignments}
            onCancelBooking={handleCancelBooking}
          />
        )}

      </main>

      {/* Main Detail Review & Negotiation Modal */}
      {selectedTruck && (
        <ReviewModal 
          truck={selectedTruck}
          highestBid={getHighestBidForTruck(selectedTruck.id, selectedTruck.basePrice)}
          onClose={() => setSelectedTruck(null)}
          onBookingSubmitted={handleBookingSubmitted}
          onNegotiationSubmitted={handleNegotiationSubmitted}
        />
      )}

      {/* Auth Modal (Masuk / Daftar) */}
      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Admin Post Auction Modal */}
      <AdminPostAuctionModal 
        isOpen={isAdminPostOpen}
        onClose={() => setIsAdminPostOpen(false)}
        onPostSuccess={handlePostSuccess}
      />

      {/* Footer */}
      <footer className="bg-[#1A1A24] text-slate-400 py-12 px-4 md:px-8 border-t border-slate-800 text-xs mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="space-y-4">
            <h4 className="font-black text-slate-200 text-sm tracking-wider uppercase">PANCARAN LELANG</h4>
            <p className="leading-relaxed">
              Platform modern lelang armada logistik komersial terbesar di Indonesia. Menghubungkan korporasi dengan pembeli individu secara transparan, adil, dan aman.
            </p>
            <div className="flex gap-3 text-emerald-400 font-bold">
              <span>● Online Support 24/7</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-slate-200 uppercase">Pool Operasional</h4>
            <ul className="space-y-2">
              <li>📍 <strong>Jakarta (Pool Cilincing):</strong> Pancaran Energi Transport Pt., RT.12/RW.12, Kali Baru, Kec. Cilincing, Jkt Utara, Daerah Khusus Ibukota Jakarta 14110</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-slate-200 uppercase">Layanan Anggota</h4>
            <ul className="space-y-1.5">
              <li><a href="#katalog" onClick={(e) => { e.preventDefault(); setActiveTab('beranda'); }} className="hover:text-white">Katalog Truk</a></li>
              <li><a href="#aktivitas" onClick={(e) => { e.preventDefault(); setActiveTab('aktivitas'); }} className="hover:text-white">Lacak Aktivitas Anggota</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-slate-200 uppercase">Hubungi Tim Sales</h4>
            <p className="leading-relaxed">
              Miliki pertanyaan terkait tata cara lelang, prosedur serah terima, atau asuransi kendaraan? Hubungi customer support kami:
            </p>
            <div className="bg-slate-800 p-3 rounded-lg border border-slate-700/60 font-semibold text-slate-300">
              📞 (021) 2929-8888 <br/>
              ✉️ cs@pancaranlelang.co.id
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-slate-800 pt-6 text-center text-[10px] text-slate-500 space-y-2">
          <p>&copy; 2026 Pancaran Lelang. Semua Hak Dilindungi. Member of Pancaran Group Logistics Ecosystem.</p>
          <p>Terdaftar dan diawasi oleh Direktorat Jenderal Kekayaan Negara (DJKN) Kementerian Keuangan Republik Indonesia.</p>
        </div>
      </footer>

    </div>
  );
}

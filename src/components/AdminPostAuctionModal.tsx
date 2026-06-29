import React, { useState } from 'react';
import { X, Plus, Image, FileText, Settings, Sparkles, Check, Truck } from 'lucide-react';
import { Truck as TruckType } from '../types';

interface AdminPostAuctionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostSuccess: (newTruck: TruckType) => void;
}

const PRESET_IMAGES = [
  {
    name: 'Hino Ranger Wingbox (Red/Orange)',
    url: 'https://lh3.googleusercontent.com/d/1SQeQ5bRPwAuVpnWIBcMTPz-HyPHi_iRu',
    category: 'Wingbox'
  },
  {
    name: 'Mitsubishi Fuso Tractor Head (Green)',
    url: 'https://lh3.googleusercontent.com/d/1PA8AFO7HDNJGdC2eqgm1ILVfq2XZYNtZ',
    category: 'Tractor Head'
  },
  {
    name: 'Isuzu Giga Dump Truck (White/Yellow)',
    url: 'https://lh3.googleusercontent.com/d/1VNC6fFS3AT48aUGY7wkd6xEw3o5-tq3J',
    category: 'Dump Truck'
  }
];

export default function AdminPostAuctionModal({ isOpen, onClose, onPostSuccess }: AdminPostAuctionModalProps) {
  const [brand, setBrand] = useState('Hino');
  const [name, setName] = useState('');
  const [lotNo, setLotNo] = useState('');
  const [grade, setGrade] = useState('B+');
  const [year, setYear] = useState<number>(2021);
  const [km, setKm] = useState<number>(120000);
  const [transmission, setTransmission] = useState<'Manual' | 'Automatic'>('Manual');
  const [location, setLocation] = useState('Jakarta (Pool Cilincing)');
  const [documents, setDocuments] = useState('BPKB + STNK Ready');
  const [bbm, setBbm] = useState('Solar (Diesel)');
  const [basePrice, setBasePrice] = useState<number>(450000000);
  const [category, setCategory] = useState<'Tractor Head' | 'Wingbox' | 'Dump Truck' | 'Box Rigit' | 'Tangki'>('Wingbox');
  const [imageUrl, setImageUrl] = useState('https://lh3.googleusercontent.com/d/1SQeQ5bRPwAuVpnWIBcMTPz-HyPHi_iRu');
  
  // Advanced features
  const [engineModel, setEngineModel] = useState('J08E-WD Turbo Intercooler');
  const [displacement, setDisplacement] = useState('7,684 cc');
  const [horsePower, setHorsePower] = useState('260 PS');
  const [wheelbase, setWheelbase] = useState('4,300 mm');
  const [maxGvw, setMaxGvw] = useState('26,000 kg');
  const [chassisNumber, setChassisNumber] = useState('MHFKGD8A3MH' + Math.floor(Math.random() * 100000));
  const [engineNumber, setEngineNumber] = useState('J08E-WD' + Math.floor(Math.random() * 100000));

  const [interiorGrade, setInteriorGrade] = useState('B');
  const [exteriorGrade, setExteriorGrade] = useState('B+');
  const [engineGrade, setEngineGrade] = useState('A');
  const [undercarriageGrade, setUndercarriageGrade] = useState('B');
  const [inspectionNotes, setInspectionNotes] = useState('Kondisi prima siap operasional, chassis mulus bebas las, mesin garing tanpa rembesan oli.');

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  // Auto set preset specs depending on brand / category
  const handlePresetSelect = (preset: typeof PRESET_IMAGES[0]) => {
    setImageUrl(preset.url);
    setCategory(preset.category as any);
    if (preset.category === 'Wingbox') {
      setName('HINO RANGER FL 260 JW (6x2) WINGBOX');
      setBrand('Hino');
      setEngineModel('J08E-WD Turbo Intercooler');
      setDisplacement('7,684 cc');
      setHorsePower('260 PS');
      setBasePrice(585000000);
    } else if (preset.category === 'Tractor Head') {
      setName('MITSUBISHI FUSO FIGHTER FN 62 F TRACTOR HEAD (6x4)');
      setBrand('Mitsubishi Fuso');
      setEngineModel('6M60-DAT5 Common Rail');
      setDisplacement('7,545 cc');
      setHorsePower('270 PS');
      setBasePrice(720000000);
    } else if (preset.category === 'Dump Truck') {
      setName('ISUZU GIGA FVZ 34 N HP DUMP TRUCK (6x4)');
      setBrand('Isuzu');
      setEngineModel('6HK1-TCS Heavy Duty');
      setDisplacement('7,790 cc');
      setHorsePower('285 PS');
      setBasePrice(590000000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !lotNo || !basePrice) {
      alert('Mohon lengkapi nama truk, nomor lot, dan harga dasar.');
      return;
    }

    setLoading(true);

    const generatedId = `tr-${Date.now()}`;
    const newTruck: TruckType = {
      id: generatedId,
      brand,
      name,
      lotNo: lotNo.toUpperCase().startsWith('LOT') ? lotNo.toUpperCase() : `LOT ${lotNo}`,
      grade,
      year: Number(year),
      km: Number(km),
      transmission,
      location,
      documents,
      bbm,
      basePrice: Number(basePrice),
      imageUrl,
      gallery: [imageUrl],
      category,
      status: 'Live Terbuka',
      specs: {
        engineModel,
        displacement,
        horsePower,
        wheelbase,
        maxGvw,
        chassisNumber,
        engineNumber
      },
      gradeBreakdown: {
        interior: interiorGrade,
        exterior: exteriorGrade,
        engine: engineGrade,
        undercarriage: undercarriageGrade,
        notes: inspectionNotes
      }
    };

    try {
      // Lazy import to service to write to Firestore
      const { addTruck } = await import('../lib/firestoreService');
      await addTruck(newTruck);
      onPostSuccess(newTruck);
      onClose();
    } catch (err) {
      console.error('Failed to post truck to Firebase:', err);
      alert('Gagal memposting ke database Firebase. Menggunakan backup local.');
      onPostSuccess(newTruck);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/65 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden border border-slate-100 flex flex-col">
        
        {/* Header */}
        <div className="bg-[#0F3460] text-white px-6 py-4 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-red-400" />
            <div>
              <h3 className="font-extrabold text-sm uppercase tracking-wider">Posting Unit Lelang Baru</h3>
              <p className="text-[10px] text-slate-300">Formulir Admin &bull; Tersimpan otomatis ke Firebase Firestore</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Section 1: Quick Preset Selection */}
          <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 space-y-2.5">
            <span className="text-[10px] font-extrabold text-[#0F3460] uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              Gunakan Gambar & Spesifikasi Template Cepat
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {PRESET_IMAGES.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handlePresetSelect(preset)}
                  className={`p-2.5 bg-white rounded-lg border text-left flex items-center gap-2 hover:border-blue-400 transition-colors cursor-pointer ${
                    imageUrl === preset.url ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-200'
                  }`}
                >
                  <div className="w-10 h-10 bg-slate-100 rounded overflow-hidden shrink-0">
                    <img src={preset.url} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[10px] font-extrabold text-slate-700 truncate">{preset.name}</span>
                    <span className="block text-[9px] text-slate-400 font-bold uppercase">{preset.category}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: General Information */}
          <div className="space-y-4">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider border-l-3 border-[#E94560] pl-2 flex items-center gap-1">
              <Truck className="w-4 h-4 text-slate-400" />
              Informasi Umum Armada
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Brand / Merek Truk</label>
                <select 
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#0F3460] focus:bg-white"
                >
                  <option value="Hino">Hino</option>
                  <option value="Mitsubishi Fuso">Mitsubishi Fuso</option>
                  <option value="Isuzu">Isuzu</option>
                  <option value="Scania">Scania</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Kategori Unit</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#0F3460] focus:bg-white"
                >
                  <option value="Wingbox">Wingbox</option>
                  <option value="Tractor Head">Tractor Head</option>
                  <option value="Dump Truck">Dump Truck</option>
                  <option value="Box Rigit">Box Rigit</option>
                  <option value="Tangki">Tangki</option>
                </select>
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Nama Lengkap Tipe Unit Truk</label>
                <input 
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: HINO RANGER FL 260 JW (6x2) WINGBOX"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#0F3460] focus:bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Nomor Lot Lelang</label>
                <input 
                  type="text"
                  required
                  value={lotNo}
                  onChange={(e) => setLotNo(e.target.value)}
                  placeholder="Contoh: LOT 105"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#0F3460] focus:bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Grade Unit (Skor Keseluruhan)</label>
                <select 
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#0F3460] focus:bg-white"
                >
                  <option value="A">Grade A (Sangat Istimewa)</option>
                  <option value="B+">Grade B+ (Bagus Sekali)</option>
                  <option value="B">Grade B (Bagus Standar)</option>
                  <option value="C">Grade C (Cukup)</option>
                  <option value="D">Grade D (Butuh Perbaikan)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Tahun Perakitan</label>
                <input 
                  type="number"
                  required
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  placeholder="2021"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#0F3460] focus:bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Kilometer (Odometer)</label>
                <input 
                  type="number"
                  required
                  value={km}
                  onChange={(e) => setKm(Number(e.target.value))}
                  placeholder="120000"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#0F3460] focus:bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Transmisi</label>
                <select 
                  value={transmission}
                  onChange={(e) => setTransmission(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#0F3460] focus:bg-white"
                >
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Lokasi Pool</label>
                <select 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#0F3460] focus:bg-white"
                >
                  <option value="Jakarta (Pool Cilincing)">Jakarta (Pool Cilincing)</option>
                  <option value="Surabaya (Pool Gresik)">Surabaya (Pool Gresik)</option>
                  <option value="Medan">Medan</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Harga Dasar (IDR)</label>
                <input 
                  type="number"
                  required
                  value={basePrice}
                  onChange={(e) => setBasePrice(Number(e.target.value))}
                  placeholder="450000000"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-extrabold focus:outline-none focus:border-[#0F3460] focus:bg-white text-red-600"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Ketersediaan Dokumen</label>
                <input 
                  type="text"
                  required
                  value={documents}
                  onChange={(e) => setDocuments(e.target.value)}
                  placeholder="BPKB + STNK Ready (Pajak Hidup)"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#0F3460] focus:bg-white"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Custom Image URL</label>
                <div className="relative">
                  <Image className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://example.com/truck.jpg"
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#0F3460] focus:bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Technical Specifications */}
          <div className="space-y-4">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider border-l-3 border-[#0F3460] pl-2 flex items-center gap-1">
              <Settings className="w-4 h-4 text-slate-400" />
              Spesifikasi Teknis Detil
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Model Mesin</label>
                <input 
                  type="text"
                  value={engineModel}
                  onChange={(e) => setEngineModel(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Kapasitas Mesin (Displacement)</label>
                <input 
                  type="text"
                  value={displacement}
                  onChange={(e) => setDisplacement(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Tenaga Mesin (Horse Power)</label>
                <input 
                  type="text"
                  value={horsePower}
                  onChange={(e) => setHorsePower(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Wheelbase</label>
                <input 
                  type="text"
                  value={wheelbase}
                  onChange={(e) => setWheelbase(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Max GVW</label>
                <input 
                  type="text"
                  value={maxGvw}
                  onChange={(e) => setMaxGvw(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Nomor Rangka (Chassis No)</label>
                <input 
                  type="text"
                  value={chassisNumber}
                  onChange={(e) => setChassisNumber(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Nomor Mesin (Engine No)</label>
                <input 
                  type="text"
                  value={engineNumber}
                  onChange={(e) => setEngineNumber(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Inspection Grade Breakdown */}
          <div className="space-y-4">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider border-l-3 border-emerald-500 pl-2 flex items-center gap-1">
              <FileText className="w-4 h-4 text-slate-400" />
              Rincian Hasil Skor Inspeksi
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Skor Interior</label>
                <select 
                  value={interiorGrade}
                  onChange={(e) => setInteriorGrade(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                >
                  <option value="A">A</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Skor Exterior</label>
                <select 
                  value={exteriorGrade}
                  onChange={(e) => setExteriorGrade(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                >
                  <option value="A">A</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Skor Mesin</label>
                <select 
                  value={engineGrade}
                  onChange={(e) => setEngineGrade(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                >
                  <option value="A">A</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Sasis & Kolong</label>
                <select 
                  value={undercarriageGrade}
                  onChange={(e) => setUndercarriageGrade(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                >
                  <option value="A">A</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </div>

              <div className="space-y-1 col-span-2 sm:col-span-4">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Catatan Tambahan Inspektur</label>
                <textarea 
                  rows={2}
                  value={inspectionNotes}
                  onChange={(e) => setInspectionNotes(e.target.value)}
                  placeholder="Isi catatan kondisi fisik truk secara transparan..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Action button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0F3460] hover:bg-[#0b2545] text-white font-extrabold text-xs uppercase tracking-widest py-3.5 rounded-xl transition-all shadow-lg shadow-[#0F3460]/20 flex items-center justify-center gap-2 cursor-pointer mt-4"
          >
            {loading ? 'Menyimpan ke Firebase...' : 'Tayangkan Unit & Posting Lelang'}
            {!loading && <Check className="w-4 h-4 text-emerald-400" />}
          </button>
        </form>
      </div>
    </div>
  );
}

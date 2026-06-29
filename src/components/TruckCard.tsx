import { Truck } from '../types';
import { MapPin, Calendar, Gauge, FileText, ArrowRight } from 'lucide-react';

interface TruckCardProps {
  key?: string | number;
  truck: Truck;
  onSelect: (truck: Truck) => void;
}

export default function TruckCard({ truck, onSelect }: TruckCardProps) {
  // Format price into IDR format
  const formatIDR = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Format Mileage
  const formatKM = (km: number) => {
    return km.toLocaleString('id-ID') + ' KM';
  };

  // Color logic for grades
  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'bg-emerald-500 text-white';
    if (grade.startsWith('B')) return 'bg-amber-500 text-white';
    return 'bg-red-500 text-white';
  };

  return (
    <div 
      className="bg-white rounded-xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group relative"
      id={`truck-card-${truck.id}`}
    >
      {/* Upper badges absolute */}
      <div className="absolute top-3 left-3 z-10 bg-slate-900/85 backdrop-blur-md text-white px-3 py-1.5 rounded-md text-xs font-bold tracking-wider shadow-sm">
        {truck.lotNo}
      </div>

      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 items-end">
        {/* Quality Grade Circle */}
        <div className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-sm border-2 border-white shadow-md ${getGradeColor(truck.grade)}`}>
          {truck.grade}
        </div>
        
        {/* Category Label */}
        <span className="bg-blue-600 text-white font-bold text-[10px] px-2 py-0.5 rounded shadow-sm">
          {truck.category}
        </span>
      </div>

      {/* Image container - clickable to view review */}
      <div 
        onClick={() => onSelect(truck)}
        className="w-full h-52 bg-slate-100 overflow-hidden relative cursor-pointer group"
      >
        <img 
          src={truck.imageUrl} 
          alt={truck.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
          referrerPolicy="no-referrer"
          id={`truck-img-${truck.id}`}
        />
        
        {/* Overlay Hover Effect */}
        <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="bg-[#0F3460] text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
            Review Detail & Cek Unit
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* Card Body Info */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Brand label */}
        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1 block">
          {truck.brand}
        </span>
        
        {/* Truck Title */}
        <h3 
          onClick={() => onSelect(truck)}
          className="font-bold text-[#16213E] text-sm md:text-base leading-snug h-11 line-clamp-2 hover:text-red-500 transition-colors cursor-pointer"
        >
          {truck.name}
        </h3>

        {/* Specs Highlights */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 my-4 pt-3.5 border-t border-slate-100 text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
            <span>Tahun {truck.year}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Gauge className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="truncate">{formatKM(truck.km)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="truncate">{truck.location.split(' (')[0]}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="truncate">{truck.documents.split(' (')[0]}</span>
          </div>
        </div>

        {/* Pricing tag JBA style */}
        <div className="mt-auto bg-slate-50 border-l-4 border-[#0F3460] px-3.5 py-2.5 rounded-r-lg">
          <span className="block text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">
            Harga Dasar NIPL
          </span>
          <span className="block text-lg font-black text-[#E94560] mt-0.5">
            {formatIDR(truck.basePrice)}
          </span>
        </div>

        {/* Action Button & Bid status */}
        <div className="mt-4 flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <span className="text-[11px] font-bold flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${truck.status === 'Live Terbuka' ? 'bg-emerald-500 animate-ping' : 'bg-amber-400'}`}></span>
            <span className={truck.status === 'Live Terbuka' ? 'text-emerald-600' : 'text-slate-500'}>
              {truck.status}
            </span>
          </span>

          <button
            onClick={() => onSelect(truck)}
            className="text-xs font-bold text-[#0F3460] hover:text-red-500 transition-colors flex items-center gap-1 group/btn cursor-pointer"
            id={`btn-review-${truck.id}`}
          >
            Review & Nego
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}

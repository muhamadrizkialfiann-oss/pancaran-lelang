import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, Shield, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { email: string; name: string; phone: string; role: 'admin' | 'user' }) => void;
}

export default function AuthModal({ isOpen, onClose, onLoginSuccess }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      // Clean inputs
      const trimmedEmail = email.trim().toLowerCase();

      // Check specifically for Admin
      if (trimmedEmail === 'muhamadrizkialfiann@gmail.com') {
        if (password === '12345678') {
          // Success Admin Login
          onLoginSuccess({
            email: 'muhamadrizkialfiann@gmail.com',
            name: 'M. Rizki Alfian (Admin)',
            phone: '08123456789',
            role: 'admin'
          });
          onClose();
          return;
        } else {
          setError('Password admin salah!');
          return;
        }
      }

      // Normal Login or Register
      if (activeTab === 'login') {
        if (!email || !password) {
          setError('Harap isi email dan password.');
          return;
        }
        if (password.length < 6) {
          setError('Password minimal terdiri dari 6 karakter.');
          return;
        }

        // Mock login
        onLoginSuccess({
          email: trimmedEmail,
          name: name || trimmedEmail.split('@')[0].toUpperCase(),
          phone: phone || '0812-3456-7890',
          role: 'user'
        });
        onClose();
      } else {
        // Register Mode
        if (!email || !password || !name || !phone) {
          setError('Harap lengkapi semua field pendaftaran.');
          return;
        }
        if (password.length < 6) {
          setError('Password minimal terdiri dari 6 karakter.');
          return;
        }

        onLoginSuccess({
          email: trimmedEmail,
          name: name,
          phone: phone,
          role: 'user'
        });
        onClose();
      }
    }, 600);
  };

  const handleAdminQuickFill = () => {
    setEmail('muhamadrizkialfiann@gmail.com');
    setPassword('12345678');
    setActiveTab('login');
  };

  return (
    <div className="fixed inset-0 bg-slate-900/65 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100 flex flex-col">
        {/* Header */}
        <div className="bg-[#0F3460] text-white px-6 py-4 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-red-400" />
            <div>
              <h3 className="font-extrabold text-sm uppercase tracking-wider">Sistem Keanggotaan</h3>
              <p className="text-[10px] text-slate-300">Akses akun & penawaran digital Pancaran Lelang</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-2 border-b border-slate-100 shrink-0">
          <button
            onClick={() => { setActiveTab('login'); setError(''); }}
            className={`py-3 text-center text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'login' 
                ? 'border-[#0F3460] text-[#0F3460] bg-slate-50/50' 
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Masuk Anggota
          </button>
          <button
            onClick={() => { setActiveTab('register'); setError(''); }}
            className={`py-3 text-center text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'register' 
                ? 'border-[#0F3460] text-[#0F3460] bg-slate-50/50' 
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Daftar Peserta
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto max-h-[70vh]">
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-xs p-3 rounded-lg font-semibold animate-shake">
              ⚠️ {error}
            </div>
          )}

          {activeTab === 'register' && (
            <>
              {/* Name field */}
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">Nama Lengkap sesuai KTP</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Muhammad Rizki"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0F3460] focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Phone field */}
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">Nomor Handphone (WhatsApp)</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Contoh: 08123456789"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0F3460] focus:bg-white transition-all"
                  />
                </div>
              </div>
            </>
          )}

          {/* Email field */}
          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">Alamat Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0F3460] focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0F3460] focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0F3460] hover:bg-[#0b2545] disabled:bg-slate-300 text-white font-extrabold text-xs uppercase tracking-wider py-3 rounded-xl transition-all shadow-md shadow-[#0F3460]/10 flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            {loading ? 'Memproses...' : activeTab === 'login' ? 'Masuk Sekarang' : 'Daftar Sekarang'}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>

          {/* Quick Admin Access Feature helper */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-slate-500 text-xs leading-relaxed space-y-2 mt-4">
            <span className="font-extrabold text-[#0F3460] text-[10px] uppercase tracking-wider block">🔑 Akses Cepat Akun Admin</span>
            <p className="text-[11px] text-slate-500">
              Gunakan akun admin resmi berikut untuk mengaktifkan fitur <strong>Posting Lelang</strong> baru langsung ke Firebase Firestore.
            </p>
            <div className="bg-white p-2 rounded border border-slate-200 text-[11px] font-mono select-all">
              <div>Email: muhamadrizkialfiann@gmail.com</div>
              <div>Pass: 12345678</div>
            </div>
            <button
              type="button"
              onClick={handleAdminQuickFill}
              className="text-[10px] text-blue-600 hover:text-blue-800 font-extrabold uppercase tracking-wide block pt-1 hover:underline cursor-pointer"
            >
              Isi otomatis akun admin &raquo;
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

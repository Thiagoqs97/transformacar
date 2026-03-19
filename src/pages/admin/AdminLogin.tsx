import { useState } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { Lock, Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
  const { login } = useSiteData();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login(password)) {
      setError('Senha incorreta. Tente novamente.');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-[#021631] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#fcbc17] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#fcbc17]/20">
              <Lock className="w-8 h-8 text-[#021631]" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">Painel Administrativo</h1>
            <p className="text-white/50 text-sm">Transformacar Autos</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white/70 text-xs font-bold uppercase tracking-widest mb-2">
                Senha de Acesso
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  placeholder="Digite a senha..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#fcbc17] focus:ring-1 focus:ring-[#fcbc17]/50 transition-all pr-12"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {error && (
                <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#fcbc17] text-[#021631] font-bold py-3 rounded-lg hover:bg-[#fcbc17]/90 transition-all shadow-lg shadow-[#fcbc17]/20 uppercase tracking-wider text-sm"
            >
              Entrar
            </button>
          </form>

          <p className="text-white/30 text-xs text-center mt-6">
            Acesso restrito a administradores
          </p>
        </div>
      </div>
    </div>
  );
}

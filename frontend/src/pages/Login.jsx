// src/pages/Login.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import Swal from 'sweetalert2';

export default function Login({ setUser }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Debug: lihat apa yang dikirim
    console.log('Data yang dikirim ke /auth/login →', form);

    try {
      const res = await api.post('/auth/login', form);

      // Simpan token & user
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user);

      // SweetAlert Sukses (Toast)
      Swal.fire({
        icon: 'success',
        title: 'Login Berhasil! 🎉',
        text: `Selamat datang kembali, ${res.data.user.nama || 'Pengguna'}`,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      }).then(() => {
        navigate('/'); // Pindah ke dashboard
      });

    } catch (err) {
      // Tampilkan error detail dari backend (ini yang paling penting!)
      console.error('Detail error dari server:', err.response?.data);

      const errorMessage = err.response?.data?.message 
        || err.response?.data?.error 
        || 'Email atau password salah';

      Swal.fire({
        icon: 'error',
        title: 'Login Gagal',
        text: errorMessage,
        confirmButtonText: 'Coba Lagi',
        confirmButtonColor: '#ef4444',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 lg:p-10">
          
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
            Masuk ke Akunmu
          </h2>

          <form onSubmit={handleSubmit} className="space-y-7">

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Alamat email"
                className="w-full px-4 py-3.5 bg-white border border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none font-medium"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full px-4 py-3.5 pr-12 bg-white border border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Tombol Login */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 rounded-2xl transition-all shadow-lg hover:shadow-xl active:scale-98 flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Masuk...</span>
                </>
              ) : (
                'Masuk Sekarang'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Belum punya akun?{' '}
              <Link to="/register" className="font-bold text-blue-600 hover:text-blue-700 hover:underline">
                Daftar di sini
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          © 2025 NabungKuy
        </p>
      </div>
    </div>
  );
}
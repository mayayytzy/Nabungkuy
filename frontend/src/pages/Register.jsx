// src/pages/Register.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Swal from 'sweetalert2'; // Tambahkan ini

export default function Register() {
  const [form, setForm] = useState({ nama: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/auth/register', form);

      // SweetAlert Sukses + otomatis pindah ke login setelah klik OK
      Swal.fire({
        icon: 'success',
        title: 'Yeay! Registrasi Berhasil 🎉',
        text: 'Akun kamu sudah dibuat. Silakan masuk sekarang!',
        confirmButtonText: 'Masuk Sekarang',
        confirmButtonColor: '#2563eb',
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });

    } catch (err) {
      // SweetAlert Error dengan pesan dari backend
      const errorMsg = err.response?.data?.message 
        || err.response?.data?.error 
        || 'Registrasi gagal. Silakan coba lagi.';

      Swal.fire({
        icon: 'error',
        title: 'Oops... Registrasi Gagal',
        text: errorMsg,
        confirmButtonText: 'Coba Lagi',
        confirmButtonColor: '#dc2626'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Card Register */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 lg:p-10">
          
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
            Buat Akun Baru
          </h2>

          <form onSubmit={handleSubmit} className="space-y-7">

            {/* Nama */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                value={form.nama}
                onChange={(e) => setForm({ ...form, nama: e.target.value })}
                placeholder="Masukkan nama kamu"
                className="w-full px-4 py-3.5 bg-white border border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none font-medium"
              />
            </div>

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
                  minLength="6"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Minimal 6 karakter"
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
              <p className="text-xs text-gray-500 mt-2">Password minimal 6 karakter</p>
            </div>

            {/* Tombol Daftar */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 rounded-2xl transition-all shadow-lg hover:shadow-xl active:scale-98 flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Membuat akun...</span>
                </>
              ) : (
                'Daftar Sekarang'
              )}
            </button>
          </form>

          {/* Link ke Login */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Sudah punya akun?{' '}
              <Link to="/login" className="font-bold text-blue-600 hover:text-blue-700 hover:underline">
                Masuk di sini
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-8">
          © 2025 NabungKuy
        </p>
      </div>
    </div>
  );
}
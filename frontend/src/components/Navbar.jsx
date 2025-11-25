// src/components/Navbar.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { 
  Bars3Icon, 
  XMarkIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

export default function Navbar({ user, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    Swal.fire({
      title: 'Yakin ingin keluar?',
      text: `Sampai jumpa lagi, ${user?.nama || 'Pengguna'}!`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Ya, Keluar',
      cancelButtonText: 'Batal',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        onLogout();
        Swal.fire({
          icon: 'success',
          title: 'Berhasil Keluar!',
          text: 'Sampai jumpa kembali 👋',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  return (
    <>
      {/* Navbar Desktop & Mobile */}
      <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo + Nama App */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-all">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                  NABUNG KUY
                </h1>
                <p className="text-xs text-gray-500 -mt-1">Catat Keuanganmu</p>
              </div>
            </Link>

            {/* Desktop: User Info + Logout */}
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    Selamat datang
                  </p>
                  <p className="text-lg font-bold text-blue-600">
                    {user?.nama || 'Pengguna'}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {user?.nama?.charAt(0).toUpperCase() || 'U'}
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                <span>Keluar</span>
              </button>
            </div>

            {/* Mobile: Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="w-7 h-7 text-gray-700" />
              ) : (
                <Bars3Icon className="w-7 h-7 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-6 py-5 space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                  {user?.nama?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <p className="text-sm text-gray-600">Selamat datang kembali</p>
                  <p className="text-xl font-bold text-gray-900">
                    {user?.nama || 'Pengguna'}
                  </p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white py-3.5 rounded-xl font-bold transition-all shadow-md active:scale-95"
              >
                <ArrowRightOnRectangleIcon className="w-6 h-6" />
                <span>Keluar dari Akun</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
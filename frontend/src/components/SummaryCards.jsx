// src/components/SummaryCards.jsx
import React from 'react';

const formatRupiah = (angka) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(angka || 0);
};

export default function SummaryCards({ summary }) {
  const { totalMasuk = 0, totalKeluar = 0, saldo = 0 } = summary;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-7 mb-10">

      {/* Total Pemasukan */}
      <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
        <div className="p-7">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Pemasukan</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {formatRupiah(totalMasuk)}
              </p>
            </div>
            <div className="text-6xl text-green-500 opacity-20">
              ↑
            </div>
          </div>
          <div className="mt-5 flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-green-700">Pendapatan</span>
          </div>
        </div>
      </div>

      {/* Total Pengeluaran */}
      <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
        <div className="p-7">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Pengeluaran</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {formatRupiah(totalKeluar)}
              </p>
            </div>
            <div className="text-6xl text-red-500 opacity-20">
              ↓
            </div>
          </div>
          <div className="mt-5 flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm font-medium text-red-700">Pengeluaran</span>
          </div>
        </div>
      </div>

      {/* Saldo Akhir */}
      <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
        <div className="p-7">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Saldo Akhir</p>
              <p className={`text-3xl font-bold mt-2 ${saldo >= 0 ? 'text-gray-900' : 'text-red-600'}`}>
                {formatRupiah(saldo)}
              </p>
              <p className={`text-sm font-semibold mt-4 px-3 py-1 rounded-full inline-block text-xs
                ${saldo >= 0 
                  ? 'bg-green-50 text-green-700' 
                  : 'bg-red-50 text-red-700'
                }`}>
                {saldo >= 0 ? 'Keuangan Sehat' : 'Perlu Penghematan'}
              </p>
            </div>
            <div className={`text-7xl font-light ${saldo >= 0 ? 'text-green-500' : 'text-red-500'} opacity-15`}>
              {saldo >= 0 ? '✓' : '!' }
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
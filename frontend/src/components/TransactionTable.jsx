// src/components/TransactionTable.jsx
import React, { useState } from 'react';
import { 
  PencilSquareIcon, 
  TrashIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon 
} from '@heroicons/react/24/outline';

const ITEMS_PER_PAGE = 10;

// Format rupiah AMAN 100% untuk angka besar (50jt → 50.000.000, 1M → 1.000.000.000)
const formatRupiah = (number) => {
  if (number === null || number === undefined || number === '') return 'Rp 0';
  
  const num = typeof number === 'string' 
    ? parseInt(number.toString().replace(/\D/g, ''), 10) || 0
    : Math.round(Number(number));

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
};

export default function TransactionTable({ transactions = [], onEdit, onDelete }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, transactions.length);
  const currentData = transactions.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-16 text-center">
        <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-xl font-semibold text-gray-700">Belum ada transaksi</p>
        <p className="text-sm text-gray-500 mt-2">
          Mulai catat pemasukan dan pengeluaran Anda sekarang
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="px-6 py-5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Tanggal
              </th>
              <th className="px-6 py-5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Keterangan
              </th>
              <th className="px-6 py-5 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">
                Jumlah
              </th>
              <th className="px-6 py-5 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                Kategori
              </th>
              <th className="px-6 py-5 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {currentData.map((t) => (
              <tr 
                key={t.id} 
                className="hover:bg-gray-50/70 transition-all duration-150 group cursor-pointer"
                onClick={() => onEdit?.(t)} // klik row juga bisa edit
              >
                <td className="px-6 py-5 text-sm text-gray-700 whitespace-nowrap">
                  {new Date(t.tanggal).toLocaleDateString('id-ID', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </td>
                <td className="px-6 py-5 font-medium text-gray-900 max-w-xs truncate">
                  {t.keterangan}
                </td>
                <td className={`px-6 py-5 text-right font-bold text-lg whitespace-nowrap ${
                  t.tipe === 'pemasukan' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {t.tipe === 'pemasukan' ? '+' : '-'} {formatRupiah(t.jumlah)}
                </td>
                <td className="px-6 py-5 text-center">
                  <span className={`inline-flex px-4 py-1.5 text-xs font-semibold rounded-full ${
                    t.tipe === 'pemasukan' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {t.kategori_nama || '-'}
                  </span>
                </td>
                <td className="px-6 py-5" onClick={(e) => e.stopPropagation()}>
                  <div className="flex justify-center items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {/* Tombol Edit */}
                    <button
                      onClick={() => onEdit?.(t)}
                      className="p-2.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-all hover:scale-110 active:scale-95"
                      title="Edit transaksi"
                    >
                      <PencilSquareIcon className="w-5 h-5" />
                    </button>

                    {/* Tombol Hapus → kirim id + keterangan */}
                    <button
                      onClick={() => onDelete?.(t.id, t.keterangan)}
                      className="p-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all hover:scale-110 active:scale-95"
                      title="Hapus transaksi"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-5 bg-gray-50 border-t border-gray-200 gap-4">
          <p className="text-sm text-gray-600">
            Menampilkan <span className="font-medium">{startIndex + 1}</span> - <span className="font-medium">{endIndex}</span> dari{' '}
            <span className="font-medium">{transactions.length}</span> transaksi
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2.5 rounded-lg hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all border border-gray-300"
            >
              <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
            </button>

            <div className="flex gap-1.5">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let page = i + 1;
                if (currentPage > 3 && totalPages > 5) {
                  page = currentPage - 2 + i;
                }
                if (page > totalPages) return null;
                return (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                      currentPage === page
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <span className="px-2 text-gray-500">...</span>
              )}
            </div>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2.5 rounded-lg hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all border border-gray-300"
            >
              <ChevronRightIcon className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
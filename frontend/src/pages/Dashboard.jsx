// src/pages/Dashboard.jsx
import { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import SummaryCards from '../components/SummaryCards';
import TransactionForm from '../components/TransactionForm';
import TransactionTable from '../components/TransactionTable';

export default function Dashboard({ user, logout }) {
  const [data, setData] = useState({
    transactions: [],
    summary: { totalMasuk: 0, totalKeluar: 0, saldo: 0 },
    categories: []
  });
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Ref untuk scroll otomatis ke form
  const formRef = useRef(null);

  // Fungsi scroll ke form
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get('/transactions');
      setData(res.data);
    } catch (err) {
      Swal.fire('Error', 'Gagal memuat data transaksi', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (formData) => {
    try {
      if (editData) {
        await api.put(`/transactions/${editData.id}`, formData);
        Swal.fire('Berhasil!', 'Transaksi berhasil diperbarui', 'success');
      } else {
        await api.post('/transactions', formData);
        Swal.fire('Berhasil!', 'Transaksi baru telah ditambahkan', 'success');
      }
      setShowForm(false);
      setEditData(null);
      fetchData();
    } catch (err) {
      Swal.fire('Gagal', 'Tidak dapat menyimpan transaksi', 'error');
    }
  };

  // Konfirmasi hapus dengan nama transaksi
  const handleDelete = (id, keterangan = 'transaksi ini') => {
    Swal.fire({
      title: 'Yakin ingin menghapus?',
      html: `Transaksi <strong>"${keterangan}"</strong> akan dihapus permanen!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          Swal.fire({
            title: 'Menghapus...',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading()
          });

          await api.delete(`/transactions/${id}`);
          await fetchData();

          Swal.fire('Terhapus!', 'Transaksi telah dihapus', 'success');
        } catch (err) {
          Swal.fire('Gagal', 'Tidak dapat menghapus transaksi', 'error');
        }
      }
    });
  };

  // Edit dengan auto scroll
  const handleEdit = (transaction) => {
    setEditData({
      ...transaction,
      jumlah: transaction.jumlah.toString(), // penting biar bisa diedit
    });
    setShowForm(true);
    // Delay kecil biar form muncul dulu baru scroll
    setTimeout(scrollToForm, 150);
  };

  // Tambah transaksi dengan auto scroll
  const handleAddNew = () => {
    setEditData(null);
    setShowForm(true);
    setTimeout(scrollToForm, 150);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogout={logout} />
      
      <div className="max-w-7xl mx-auto p-6">
        <SummaryCards summary={data.summary} />

        {/* Tombol Tambah */}
        <button
          onClick={handleAddNew}
          className="mb-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition shadow-md active:scale-95"
        >
          + Tambah Transaksi Baru
        </button>

        {/* Form dengan highlight & ref */}
        {showForm && (
          <div 
            ref={formRef}
            className="mb-10 animate-in slide-in-from-top-4 duration-500"
          >
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-1">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <TransactionForm
                  categories={data.categories}
                  editData={editData}
                  onSubmit={handleSave}
                  onCancel={() => { 
                    setShowForm(false); 
                    setEditData(null); 
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Loading Skeleton */}
        {loading ? (
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
              <div className="space-y-4">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="flex gap-4">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/6 ml-auto"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <TransactionTable
            transactions={data.transactions}
            onEdit={handleEdit}
            onDelete={(id, keterangan) => handleDelete(id, keterangan)}
          />
        )}
      </div>
    </div>
  );
}
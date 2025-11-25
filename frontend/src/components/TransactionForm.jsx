// src/components/TransactionForm.jsx
import { useState, useEffect } from 'react';
import { 
  CalendarIcon, 
  TagIcon, 
  DocumentTextIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';
import Swal from 'sweetalert2';

// Helper tanggal
const toDateInputValue = (dateString) => {
  if (!dateString) return '';
  return dateString.split('T')[0];
};

// Helper AMAN untuk angka besar (INI YANG PENTING!)
const cleanNumber = (value) => {
  if (!value) return 0;
  // Hapus semua selain angka, lalu ubah jadi integer
  const cleaned = value.toString().replace(/\D/g, '');
  return cleaned ? parseInt(cleaned, 10) : 0;
};

export default function TransactionForm({ onSubmit, categories = [], editData, onCancel }) {
  const [form, setForm] = useState({
    keterangan: '',
    jumlah: '',
    tipe: 'pengeluaran',
    kategori_id: '',
    tanggal: '',
  });

  useEffect(() => {
    if (editData) {
      setForm({
        keterangan: editData.keterangan || '',
        jumlah: editData.jumlah?.toString() || '', // pastikan string biar bisa edit
        tipe: editData.tipe || 'pengeluaran',
        kategori_id: editData.kategori_id || '',
        tanggal: toDateInputValue(editData.tanggal),
      });
    } else {
      setForm({
        keterangan: '',
        jumlah: '',
        tipe: 'pengeluaran',
        kategori_id: '',
        tanggal: new Date().toISOString().split('T')[0],
      });
    }
  }, [editData]);

  const handleChange = (field) => (e) => {
    let value = e.target.value;

    // Khusus untuk jumlah: hanya boleh angka
    if (field === 'jumlah') {
      value = value.replace(/\D/g, ''); // hapus semua selain angka
    }

    setForm(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'tipe' ? { kategori_id: '' } : {})
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi
    if (!form.keterangan.trim()) {
      Swal.fire('Gagal', 'Keterangan wajib diisi!', 'warning');
      return;
    }

    const jumlahAngka = cleanNumber(form.jumlah);
    if (jumlahAngka <= 0) {
      Swal.fire('Gagal', 'Masukkan jumlah yang valid!', 'warning');
      return;
    }

    if (!form.kategori_id) {
      Swal.fire('Gagal', 'Pilih kategori terlebih dahulu!', 'warning');
      return;
    }

    if (!form.tanggal) {
      Swal.fire('Gagal', 'Pilih tanggal transaksi!', 'warning');
      return;
    }

    // Kirim data → jumlah PASTI integer & akurat!
    onSubmit({
      ...form,
      jumlah: jumlahAngka, // INI YANG BENAR → 50.000.000 tetap 50000000
      kategori_id: parseInt(form.kategori_id),
      tanggal: new Date(form.tanggal).toISOString(),
    });

    // Notifikasi sukses
    Swal.fire({
      icon: 'success',
      title: 'Berhasil!',
      text: editData ? 'Transaksi berhasil diperbarui' : 'Transaksi baru telah ditambahkan',
      confirmButtonColor: '#2563eb',
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        {editData ? 'Edit Transaksi' : 'Tambah Transaksi Baru'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Keterangan */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Keterangan</label>
          <div className="relative">
            <DocumentTextIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Contoh: Gaji bulan November"
              value={form.keterangan}
              onChange={handleChange('keterangan')}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Jumlah & Tipe */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah (Rp)</label>
            <div className="relative">
              <BanknotesIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"  // ganti dari number ke text biar bisa angka besar & aman
                inputMode="numeric"
                placeholder="50000000"
                value={form.jumlah}
                onChange={handleChange('jumlah')}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipe</label>
            <select
              value={form.tipe}
              onChange={handleChange('tipe')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="pemasukan">Pemasukan</option>
              <option value="pengeluaran">Pengeluaran</option>
            </select>
          </div>
        </div>

        {/* Kategori & Tanggal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
            <div className="relative">
              <TagIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={form.kategori_id}
                onChange={handleChange('kategori_id')}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none"
              >
                <option value="">Pilih kategori</option>
                {categories
                  .filter(cat => cat.tipe === form.tipe)
                  .map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.nama}</option>
                  ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal</label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={toDateInputValue(form.tanggal)}
                onChange={handleChange('tanggal')}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Tombol */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all shadow-sm active:scale-95"
          >
            {editData ? 'Update Transaksi' : 'Simpan Transaksi'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition-all border border-gray-300"
            >
              Batal
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
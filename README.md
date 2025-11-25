# NABUNG KUY — Aplikasi Pencatatan Keuangan Pribadi

**NabungKuy** adalah aplikasi web modern untuk mencatat pemasukan & pengeluaran harian dengan tampilan yang bersih, cepat, dan nyaman digunakan di desktop maupun smartphone.

## Fitur Utama
- Registrasi & Login (JWT + bcrypt)
- Tambah, Edit, Hapus transaksi
- Kategori pemasukan / pengeluaran
- Ringkasan saldo, total pemasukan & pengeluaran
- Auto-scroll saat edit / tambah transaksi
- Konfirmasi hapus dengan nama transaksi
- SweetAlert2 untuk semua notifikasi
- Loading skeleton & animasi halus
- 100% responsif (mobile friendly)
- Format rupiah akurat (tidak ada bug 49.999.999)

## Tech Stack

| Layer       | Technology                                      |
|-------------|-------------------------------------------------|
| Frontend    | React 18 + Vite + Tailwind CSS + Heroicons      |
| State       | React Hooks (useState, useEffect, useRef)       |
| Routing     | React Router DOM v6                             |
| HTTP Client | Axios (interceptor + baseURL)                   |
| Alert       | SweetAlert2                                     |
| Backend     | Node.js + Express                               |
| Database    | MySQL                                           |
| Auth        | JWT + bcryptjs                                  |

## Anggota Kelompok

<div align="center">

| Nama                     | 
|--------------------------|
| **Fahriansyah Nur Fajar** | **Project Leader**           |
| **Afgan**                
| **Raditya Pratama**     
| **Wira**                 

</div>

<br>

## Cara Install & Jalankan (Lokal)

```bash
# 1. Clone repository
git clone https://github.com/mayayytzy/Nabungkuy.git
cd Nabungkuy

# 2. Install/jalankan backend
cd backend
npm run dev

# 3. Install/jalankan frontend (terminal baru)
cd frontend
npm run dev
# → http://localhost:5173

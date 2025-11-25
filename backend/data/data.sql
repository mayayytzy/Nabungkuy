-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 25 Nov 2025 pada 12.14
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `keuangan_app`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `tipe` enum('pemasukan','pengeluaran') NOT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `categories`
--

INSERT INTO `categories` (`id`, `nama`, `tipe`, `user_id`) VALUES
(1, 'Gaji', 'pemasukan', NULL),
(2, 'Freelance', 'pemasukan', NULL),
(3, 'Lain-lain', 'pemasukan', NULL),
(4, 'Makan & Minum', 'pengeluaran', NULL),
(5, 'Transportasi', 'pengeluaran', NULL),
(6, 'Belanja', 'pengeluaran', NULL),
(7, 'Hiburan', 'pengeluaran', NULL),
(8, 'Tagihan', 'pengeluaran', NULL),
(9, 'Kesehatan', 'pengeluaran', NULL),
(10, 'Lain-lain', 'pengeluaran', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `keterangan` varchar(255) NOT NULL,
  `jumlah` decimal(15,2) NOT NULL,
  `tipe` enum('pemasukan','pengeluaran') NOT NULL,
  `kategori_id` int(11) DEFAULT NULL,
  `tanggal` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `transactions`
--

INSERT INTO `transactions` (`id`, `user_id`, `keterangan`, `jumlah`, `tipe`, `kategori_id`, `tanggal`, `created_at`) VALUES
(1, 1, '121', 1211.00, 'pemasukan', 1, '2025-11-22', '2025-11-22 06:03:17'),
(2, 2, 'makan', 1300.00, 'pengeluaran', 2, '2025-11-22', '2025-11-22 06:17:06'),
(3, 1, '12323', 1232131.00, 'pengeluaran', 4, '2025-11-22', '2025-11-22 08:13:01'),
(4, 3, 'makan', 10000.00, 'pengeluaran', 4, '2025-11-24', '2025-11-24 04:16:14'),
(14, 5, 'Dikasih', 1950000.00, 'pemasukan', 3, '2025-11-23', '2025-11-24 10:47:58'),
(16, 5, 'Jajan', 150000.00, 'pengeluaran', 4, '2025-11-23', '2025-11-24 12:59:20'),
(17, 5, 'Nemu', 50000.00, 'pemasukan', 3, '2025-11-23', '2025-11-24 12:59:27'),
(18, 5, 'Ke Cafe', 60050000.00, 'pengeluaran', 4, '2025-11-23', '2025-11-24 12:59:45'),
(19, 5, 'Beli mie', 150000.00, 'pengeluaran', 6, '2025-11-23', '2025-11-24 13:00:12'),
(20, 5, 'Gaji', 150000.00, 'pemasukan', 1, '2025-11-23', '2025-11-24 13:00:36'),
(28, 5, 'MAKAN', 131231232100.00, 'pemasukan', 2, '2025-11-23', '2025-11-24 14:47:18'),
(29, 5, 'Gajian', 123123130000.00, 'pemasukan', 1, '2025-11-22', '2025-11-24 14:47:31'),
(30, 5, 'Gajian', 321321321300.00, 'pemasukan', 2, '2025-11-23', '2025-11-24 14:47:39'),
(33, 5, 'Gajih', 5000000000.00, 'pemasukan', 1, '2025-11-22', '2025-11-25 05:25:01'),
(36, 5, 'makan', 5000000.00, 'pengeluaran', 4, '2025-11-23', '2025-11-25 10:38:44');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `nama`, `email`, `password`, `created_at`) VALUES
(1, 'Fajar', 'cillaaja123@gmail.com', '$2b$10$wiLvJhCcgrDdrNAzkwRFRu4fGLK8GRr1tfGFK/wOKxx..4UHM1Rme', '2025-11-22 06:02:28'),
(2, 'fajargaming1', 'fajar123@gmail.com', '$2b$10$eryczHSYD6aE0Px71Q0jWOT0Eo9X4Mv02MzhGaWgXWtDC2vQZ7qM6', '2025-11-22 06:15:42'),
(3, 'aranjing', 'fajar1234@gmail.com', '$2b$10$TIqHDf/eVG87zmRHYeL0YO4L1RKKgLBkVnmJ2EGoxlIIRudtv4hmq', '2025-11-24 04:15:38'),
(4, 'makan', 'petot@gmail.com', '$2b$10$AERHTrvIjvegoVwl1Ld/A.cX/jzR10sVLdLOmALLFnxxxeXBgGKPi', '2025-11-24 05:31:28'),
(5, 'Afgan', 'mrapip@gmail.com', '$2b$10$tQxJLTNo8BpbQDU/YOQUYua6000NC9IygiCWmQq.pNt51.fZxi2Yq', '2025-11-24 06:37:45'),
(6, 'albiribi', 'albi@gmail.com', '$2b$10$depr8RyjzxjDp//POGIcfOHFDumIcF1R.p1QywLHSJ/WDQWXU1tO2', '2025-11-25 05:34:28');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeks untuk tabel `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `kategori_id` (`kategori_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`kategori_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

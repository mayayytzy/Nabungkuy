// transactionroutes.js (SUDAH DIPERBAIKI & LENGKAP)

const express = require('express');
const router = express.Router();
const db = require('../db');
const verifyToken = require('../middleware/auth');

// GET semua transaksi user + summary + kategori
router.get('/', verifyToken, async (req, res) => {
    const userId = req.user.id;
    try {
        const [trans] = await db.query(`
            SELECT t.*, c.nama as kategori_nama 
            FROM transactions t 
            LEFT JOIN categories c ON t.kategori_id = c.id 
            WHERE t.user_id = ? 
            ORDER BY t.tanggal DESC, t.created_at DESC
        `, [userId]);

        const [summary] = await db.query(`
            SELECT 
                SUM(CASE WHEN tipe='pemasukan' THEN jumlah ELSE 0 END) as total_masuk,
                SUM(CASE WHEN tipe='pengeluaran' THEN jumlah ELSE 0 END) as total_keluar
            FROM transactions WHERE user_id = ?
        `, [userId]);

        const [kategori] = await db.query('SELECT * FROM categories WHERE user_id IS NULL OR user_id = ?', [userId]);

        const totalMasuk = summary[0]?.total_masuk || 0;
        const totalKeluar = summary[0]?.total_keluar || 0;

        res.json({
            transactions: trans,
            summary: { totalMasuk, totalKeluar, saldo: totalMasuk - totalKeluar },
            categories: kategori
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST transaksi baru
router.post('/', verifyToken, async (req, res) => {
    const { keterangan, jumlah, tipe, kategori_id, tanggal } = req.body;
    const userId = req.user.id;

    try {
        const [result] = await db.query(
            'INSERT INTO transactions (user_id, keterangan, jumlah, tipe, kategori_id, tanggal) VALUES (?, ?, ?, ?, ?, ?)',
            [userId, keterangan, jumlah, tipe, kategori_id || null, tanggal]
        );
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT - Update transaksi
router.put('/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const { keterangan, jumlah, tipe, kategori_id, tanggal } = req.body;
    const userId = req.user.id;

    try {
        await db.query(
            `UPDATE transactions 
             SET keterangan = ?, jumlah = ?, tipe = ?, kategori_id = ?, tanggal = ? 
             WHERE id = ? AND user_id = ?`,
            [keterangan, jumlah, tipe, kategori_id || null, tanggal, id, userId]
        );
        res.json({ success: true, message: 'Transaksi diperbarui' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE - HAPUS TRANSAKSI (INI YANG KAMU TUNGGU!)
router.delete('/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const [result] = await db.query(
            'DELETE FROM transactions WHERE id = ? AND user_id = ?',
            [id, userId]
        );

        // Jika tidak ada baris yang dihapus (misal ID salah atau bukan punya user ini)
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Transaksi tidak ditemukan atau bukan milik Anda' });
        }

        res.json({ success: true, message: 'Transaksi berhasil dihapus' });
    } catch (err) {
        console.error('Error delete:', err);
        res.status(500).json({ error: 'Gagal menghapus transaksi' });
    }
});

module.exports = router;
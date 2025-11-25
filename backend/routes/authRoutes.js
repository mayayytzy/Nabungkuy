const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

router.post('/register', async (req, res) => {
    const { nama, email, password } = req.body;
    if (!nama || !email || !password) return res.status(400).json({ message: 'Semua field wajib diisi' });

    try {
        const [existing] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existing.length > 0) return res.status(400).json({ message: 'Email sudah terdaftar' });

        const hashed = await bcrypt.hash(password, 10);
        await db.query('INSERT INTO users (nama, email, password) VALUES (?, ?, ?)', [nama, email, hashed]);

        res.status(201).json({ message: 'Registrasi berhasil' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) return res.status(400).json({ message: 'Email atau password salah' });

        const user = users[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: 'Email atau password salah' });

        const token = jwt.sign({ id: user.id, nama: user.nama }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        res.json({ token, user: { id: user.id, nama: user.nama, email: user.email } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
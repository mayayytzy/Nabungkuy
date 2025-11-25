const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);

app.get('/', (req, res) => res.send('API Keuangan Pribadi v2'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server jalan di http://localhost:${PORT}`));
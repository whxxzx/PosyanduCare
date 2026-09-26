import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import db from './db.js'

dotenv.config({
  path: './backend/.env'
})

const app = express()

app.use(cors())
app.use(express.json())

// =========================
// TEST KONEKSI DATABASE
// =========================
app.get('/api/test-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 AS berhasil')

    res.json({
      berhasil: true,
      pesan: 'Koneksi ke MySQL berhasil.',
      data: rows
    })
  } catch (error) {
    console.error('Database Error:', error)

    res.status(500).json({
      berhasil: false,
      pesan: 'Koneksi ke MySQL gagal.',
      error: error.message
    })
  }
})

// =========================
// GET SEMUA BALITA
// =========================
app.get('/api/balita', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        id,
        nama,
        jenis_kelamin,
        tanggal_lahir,
        alamat,
        bb_lahir,
        pb_lahir,
        nama_ayah,
        nama_ibu,
        created_at
      FROM balita
      ORDER BY id ASC
    `)

    res.json({
      berhasil: true,
      data: rows
    })
  } catch (error) {
    console.error('GET Balita Error:', error)

    res.status(500).json({
      berhasil: false,
      pesan: 'Gagal mengambil data balita.',
      error: error.message
    })
  }
})

// =========================
// GET BALITA BERDASARKAN ID
// =========================
app.get('/api/balita/:id', async (req, res) => {
  try {
    const { id } = req.params

    const [rows] = await db.query(
      `
      SELECT
        id,
        nama,
        jenis_kelamin,
        tanggal_lahir,
        alamat,
        bb_lahir,
        pb_lahir,
        nama_ayah,
        nama_ibu,
        created_at
      FROM balita
      WHERE id = ?
      `,
      [id]
    )

    if (rows.length === 0) {
      return res.status(404).json({
        berhasil: false,
        pesan: 'Data balita tidak ditemukan.'
      })
    }

    res.json({
      berhasil: true,
      data: rows[0]
    })
  } catch (error) {
    console.error('GET Balita Detail Error:', error)

    res.status(500).json({
      berhasil: false,
      pesan: 'Gagal mengambil detail balita.',
      error: error.message
    })
  }
})

// =========================
// TAMBAH BALITA
// =========================
app.post('/api/balita', async (req, res) => {
  try {
    const {
      nama,
      jenis_kelamin,
      tanggal_lahir,
      alamat,
      bb_lahir,
      pb_lahir,
      nama_ayah,
      nama_ibu
    } = req.body

    if (!nama || !jenis_kelamin || !tanggal_lahir || !alamat) {
      return res.status(400).json({
        berhasil: false,
        pesan: 'Nama, jenis kelamin, tanggal lahir, dan alamat wajib diisi.'
      })
    }

    const [result] = await db.query(
      `
      INSERT INTO balita
      (
        nama,
        jenis_kelamin,
        tanggal_lahir,
        alamat,
        bb_lahir,
        pb_lahir,
        nama_ayah,
        nama_ibu
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        nama,
        jenis_kelamin,
        tanggal_lahir,
        alamat,
        bb_lahir || null,
        pb_lahir || null,
        nama_ayah || null,
        nama_ibu || null
      ]
    )

    res.status(201).json({
      berhasil: true,
      pesan: 'Data balita berhasil ditambahkan.',
      id: result.insertId
    })
  } catch (error) {
    console.error('POST Balita Error:', error)

    res.status(500).json({
      berhasil: false,
      pesan: 'Gagal menambahkan data balita.',
      error: error.message
    })
  }
})

// =========================
// UPDATE BALITA
// =========================
app.put('/api/balita/:id', async (req, res) => {
  try {
    const { id } = req.params

    const {
      nama,
      jenis_kelamin,
      tanggal_lahir,
      alamat,
      bb_lahir,
      pb_lahir,
      nama_ayah,
      nama_ibu
    } = req.body

    if (!nama || !jenis_kelamin || !tanggal_lahir || !alamat) {
      return res.status(400).json({
        berhasil: false,
        pesan: 'Nama, jenis kelamin, tanggal lahir, dan alamat wajib diisi.'
      })
    }

    const [result] = await db.query(
      `
      UPDATE balita
      SET
        nama = ?,
        jenis_kelamin = ?,
        tanggal_lahir = ?,
        alamat = ?,
        bb_lahir = ?,
        pb_lahir = ?,
        nama_ayah = ?,
        nama_ibu = ?
      WHERE id = ?
      `,
      [
        nama,
        jenis_kelamin,
        tanggal_lahir,
        alamat,
        bb_lahir || null,
        pb_lahir || null,
        nama_ayah || null,
        nama_ibu || null,
        id
      ]
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({
        berhasil: false,
        pesan: 'Data balita tidak ditemukan.'
      })
    }

    res.json({
      berhasil: true,
      pesan: 'Data balita berhasil diperbarui.'
    })
  } catch (error) {
    console.error('PUT Balita Error:', error)

    res.status(500).json({
      berhasil: false,
      pesan: 'Gagal memperbarui data balita.',
      error: error.message
    })
  }
})

// =========================
// HAPUS BALITA
// =========================
app.delete('/api/balita/:id', async (req, res) => {
  try {
    const { id } = req.params

    const [result] = await db.query(
      'DELETE FROM balita WHERE id = ?',
      [id]
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({
        berhasil: false,
        pesan: 'Data balita tidak ditemukan.'
      })
    }

    res.json({
      berhasil: true,
      pesan: 'Data balita berhasil dihapus.'
    })
  } catch (error) {
    console.error('DELETE Balita Error:', error)

    res.status(500).json({
      berhasil: false,
      pesan: 'Gagal menghapus data balita.',
      error: error.message
    })
  }
})

// =========================
// GET PEMERIKSAAN BERDASARKAN BALITA
// =========================
app.get('/api/balita/:id/pemeriksaan', async (req, res) => {
  try {
    const { id } = req.params

    const [rows] = await db.query(
      `
      SELECT
        id,
        balita_id,
        tanggal_pemeriksaan,
        bb,
        tb,
        lila,
        lk,
        imunisasi,
        vitamin_a,
        obat_cacing,
        created_at
      FROM pemeriksaan
      WHERE balita_id = ?
      ORDER BY tanggal_pemeriksaan DESC
      `,
      [id]
    )

    res.json({
      berhasil: true,
      data: rows
    })
  } catch (error) {
    console.error('GET Pemeriksaan Error:', error)

    res.status(500).json({
      berhasil: false,
      pesan: 'Gagal mengambil data pemeriksaan.',
      error: error.message
    })
  }
})

// =========================
// TAMBAH PEMERIKSAAN
// =========================
app.post('/api/balita/:id/pemeriksaan', async (req, res) => {
  try {
    const { id } = req.params

    const {
      tanggal_pemeriksaan,
      bb,
      tb,
      lila,
      lk,
      imunisasi,
      vitamin_a,
      obat_cacing
    } = req.body

    if (!tanggal_pemeriksaan) {
      return res.status(400).json({
        berhasil: false,
        pesan: 'Tanggal pemeriksaan wajib diisi.'
      })
    }

    // Pastikan balita tersedia
    const [balita] = await db.query(
      'SELECT id FROM balita WHERE id = ?',
      [id]
    )

    if (balita.length === 0) {
      return res.status(404).json({
        berhasil: false,
        pesan: 'Data balita tidak ditemukan.'
      })
    }

    const [result] = await db.query(
      `
      INSERT INTO pemeriksaan
      (
        balita_id,
        tanggal_pemeriksaan,
        bb,
        tb,
        lila,
        lk,
        imunisasi,
        vitamin_a,
        obat_cacing
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        id,
        tanggal_pemeriksaan,
        bb ?? null,
        tb ?? null,
        lila ?? null,
        lk ?? null,
        imunisasi ?? false,
        vitamin_a ?? false,
        obat_cacing ?? false
      ]
    )

    res.status(201).json({
      berhasil: true,
      pesan: 'Data pemeriksaan berhasil ditambahkan.',
      id: result.insertId
    })
  } catch (error) {
    console.error('POST Pemeriksaan Error:', error)

    res.status(500).json({
      berhasil: false,
      pesan: 'Gagal menambahkan pemeriksaan.',
      error: error.message
    })
  }
})

// =========================
// UPDATE PEMERIKSAAN
// =========================
app.put('/api/pemeriksaan/:id', async (req, res) => {
  try {
    const { id } = req.params

    const {
      tanggal_pemeriksaan,
      bb,
      tb,
      lila,
      lk,
      imunisasi,
      vitamin_a,
      obat_cacing
    } = req.body

    if (!tanggal_pemeriksaan) {
      return res.status(400).json({
        berhasil: false,
        pesan: 'Tanggal pemeriksaan wajib diisi.'
      })
    }

    const [result] = await db.query(
      `
      UPDATE pemeriksaan
      SET
        tanggal_pemeriksaan = ?,
        bb = ?,
        tb = ?,
        lila = ?,
        lk = ?,
        imunisasi = ?,
        vitamin_a = ?,
        obat_cacing = ?
      WHERE id = ?
      `,
      [
        tanggal_pemeriksaan,
        bb ?? null,
        tb ?? null,
        lila ?? null,
        lk ?? null,
        imunisasi ?? false,
        vitamin_a ?? false,
        obat_cacing ?? false,
        id
      ]
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({
        berhasil: false,
        pesan: 'Data pemeriksaan tidak ditemukan.'
      })
    }

    res.json({
      berhasil: true,
      pesan: 'Data pemeriksaan berhasil diperbarui.'
    })
  } catch (error) {
    console.error('PUT Pemeriksaan Error:', error)

    res.status(500).json({
      berhasil: false,
      pesan: 'Gagal memperbarui pemeriksaan.',
      error: error.message
    })
  }
})

// =========================
// HAPUS PEMERIKSAAN
// =========================
app.delete('/api/pemeriksaan/:id', async (req, res) => {
  try {
    const { id } = req.params

    const [result] = await db.query(
      'DELETE FROM pemeriksaan WHERE id = ?',
      [id]
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({
        berhasil: false,
        pesan: 'Data pemeriksaan tidak ditemukan.'
      })
    }

    res.json({
      berhasil: true,
      pesan: 'Data pemeriksaan berhasil dihapus.'
    })
  } catch (error) {
    console.error('DELETE Pemeriksaan Error:', error)

    res.status(500).json({
      berhasil: false,
      pesan: 'Gagal menghapus pemeriksaan.',
      error: error.message
    })
  }
})

// =========================
// JALANKAN SERVER
// =========================
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Backend PosyanduCare berjalan di http://localhost:${PORT}`)
})
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
    const [rows] = await db.query(
      'SELECT 1 AS berhasil'
    )

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

// =====================================================
// GET SEMUA ANAK
// /api/anak
// /api/balita  -> tetap dipertahankan untuk frontend lama
// =====================================================
app.get(['/api/anak', '/api/balita'], async (req, res) => {
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
      FROM anak
      ORDER BY id ASC
    `)

    res.json({
      berhasil: true,
      data: rows
    })
  } catch (error) {
    console.error('GET Anak Error:', error)

    res.status(500).json({
      berhasil: false,
      pesan: 'Gagal mengambil data anak.',
      error: error.message
    })
  }
})

// =====================================================
// GET ANAK BERDASARKAN ID
// /api/anak/:id
// /api/balita/:id -> tetap dipertahankan
// =====================================================
app.get(['/api/anak/:id', '/api/balita/:id'], async (req, res) => {
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
      FROM anak
      WHERE id = ?
      `,
      [id]
    )

    if (rows.length === 0) {
      return res.status(404).json({
        berhasil: false,
        pesan: 'Data anak tidak ditemukan.'
      })
    }

    res.json({
      berhasil: true,
      data: rows[0]
    })
  } catch (error) {
    console.error('GET Anak Detail Error:', error)

    res.status(500).json({
      berhasil: false,
      pesan: 'Gagal mengambil detail anak.',
      error: error.message
    })
  }
})

// =====================================================
// TAMBAH ANAK
// /api/anak
// /api/balita -> tetap dipertahankan
// =====================================================
app.post(['/api/anak', '/api/balita'], async (req, res) => {
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

    if (
      !nama ||
      !jenis_kelamin ||
      !tanggal_lahir ||
      !alamat
    ) {
      return res.status(400).json({
        berhasil: false,
        pesan:
          'Nama, jenis kelamin, tanggal lahir, dan alamat wajib diisi.'
      })
    }

    const [result] = await db.query(
      `
      INSERT INTO anak
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
      pesan: 'Data anak berhasil ditambahkan.',
      id: result.insertId
    })
  } catch (error) {
    console.error('POST Anak Error:', error)

    res.status(500).json({
      berhasil: false,
      pesan: 'Gagal menambahkan data anak.',
      error: error.message
    })
  }
})

// =====================================================
// UPDATE ANAK
// /api/anak/:id
// /api/balita/:id -> tetap dipertahankan
// =====================================================
app.put(['/api/anak/:id', '/api/balita/:id'], async (req, res) => {
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

    if (
      !nama ||
      !jenis_kelamin ||
      !tanggal_lahir ||
      !alamat
    ) {
      return res.status(400).json({
        berhasil: false,
        pesan:
          'Nama, jenis kelamin, tanggal lahir, dan alamat wajib diisi.'
      })
    }

    const [result] = await db.query(
      `
      UPDATE anak
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
        pesan: 'Data anak tidak ditemukan.'
      })
    }

    res.json({
      berhasil: true,
      pesan: 'Data anak berhasil diperbarui.'
    })
  } catch (error) {
    console.error('PUT Anak Error:', error)

    res.status(500).json({
      berhasil: false,
      pesan: 'Gagal memperbarui data anak.',
      error: error.message
    })
  }
})

// =====================================================
// HAPUS ANAK
// /api/anak/:id
// /api/balita/:id -> tetap dipertahankan
// =====================================================
app.delete(['/api/anak/:id', '/api/balita/:id'], async (req, res) => {
  try {
    const { id } = req.params

    const [result] = await db.query(
      'DELETE FROM anak WHERE id = ?',
      [id]
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({
        berhasil: false,
        pesan: 'Data anak tidak ditemukan.'
      })
    }

    res.json({
      berhasil: true,
      pesan: 'Data anak berhasil dihapus.'
    })
  } catch (error) {
    console.error('DELETE Anak Error:', error)

    res.status(500).json({
      berhasil: false,
      pesan: 'Gagal menghapus data anak.',
      error: error.message
    })
  }
})

// =====================================================
// GET PEMERIKSAAN ANAK
// /api/anak/:id/pemeriksaan
// /api/balita/:id/pemeriksaan -> tetap dipertahankan
// =====================================================
app.get(
  ['/api/anak/:id/pemeriksaan', '/api/balita/:id/pemeriksaan'],
  async (req, res) => {
    try {
      const { id } = req.params

      const [rows] = await db.query(
        `
        SELECT
          id,
          anak_id,
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
        WHERE anak_id = ?
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
  }
)

// =====================================================
// TAMBAH PEMERIKSAAN
// /api/anak/:id/pemeriksaan
// /api/balita/:id/pemeriksaan -> tetap dipertahankan
// =====================================================
app.post(
  ['/api/anak/:id/pemeriksaan', '/api/balita/:id/pemeriksaan'],
  async (req, res) => {
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

      // Pastikan anak tersedia
      const [anak] = await db.query(
        'SELECT id FROM anak WHERE id = ?',
        [id]
      )

      if (anak.length === 0) {
        return res.status(404).json({
          berhasil: false,
          pesan: 'Data anak tidak ditemukan.'
        })
      }

      const [result] = await db.query(
        `
        INSERT INTO pemeriksaan
        (
          anak_id,
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
  }
)

// =====================================================
// UPDATE PEMERIKSAAN
// =====================================================
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

// =====================================================
// HAPUS PEMERIKSAAN
// =====================================================
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
      pesan: 'Gagal menghapus data pemeriksaan.',
      error: error.message
    })
  }
})

// =====================================================
// JALANKAN SERVER
// =====================================================
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(
    `Backend PosyanduCare berjalan di http://localhost:${PORT}`
  )
})
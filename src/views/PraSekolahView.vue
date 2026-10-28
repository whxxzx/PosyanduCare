
<template>
  <div class="app-layout">
    <!-- SIDEBAR -->
    <aside class="sidebar">
      <div class="sidebar-logo">
        🎒
        <span>PosyanduCare</span>
      </div>

      <div class="posyandu-name">
        Posyandu Sedap Malam 2
      </div>

      <nav>
        <router-link to="/dashboard">
          🏠 Dashboard
        </router-link>

        <router-link to="/bayi">
          👶 Bayi
        </router-link>

        <router-link to="/balita">
          🧒 Balita
        </router-link>

        <router-link to="/pra-sekolah" class="active">
          🎒 Pra Sekolah
        </router-link>
      </nav>
    </aside>

    <!-- MAIN CONTENT -->
    <main class="main-content">
      <!-- TOPBAR -->
      <header class="topbar">
        <div>
          <h2>Data Pra Sekolah</h2>
          <p>Data anak usia 60–72 bulan</p>
        </div>

        <div
          class="profile-wrapper"
          @click="menuProfil = !menuProfil"
        >
          <div class="user-info">
            <div class="profile-avatar">
              👤
            </div>

            <div class="profile-name">
              <strong>{{ namaUser }}</strong>
              <small>Kader Posyandu</small>
            </div>

            <span class="profile-arrow">▾</span>
          </div>

          <!-- DROPDOWN -->
          <div
            v-if="menuProfil"
            class="profile-dropdown"
            @click.stop
          >
            <div class="profile-dropdown-header">
              <div class="profile-avatar large">
                👤
              </div>

              <div>
                <strong>{{ namaUser }}</strong>
                <small>Kader Posyandu</small>
              </div>
            </div>

            <div class="profile-divider"></div>

            <button
              class="logout-button"
              type="button"
              @click.stop="logout"
            >
              <span>↪</span>
              Keluar
            </button>
          </div>
        </div>
      </header>

      <!-- CONTENT -->
      <section class="page-content">
        <!-- HEADER -->
        <div class="page-header">
          <div>
            <h1>Data Pra Sekolah</h1>

            <p>
              Menampilkan anak dengan usia
              60–72 bulan secara otomatis.
            </p>
          </div>

          <button
            type="button"
            class="btn-primary"
            @click="tambahAnak"
          >
            + Tambah Data Anak
          </button>
        </div>

        <!-- INFO -->
        <div class="category-info">
          <div class="category-icon">
            🎒
          </div>

          <div>
            <strong>Kategori Pra Sekolah</strong>

            <p>
              Anak berusia 60–72 bulan akan otomatis
              masuk ke halaman ini berdasarkan tanggal lahir.
            </p>
          </div>
        </div>

        <!-- PESAN -->
        <div v-if="pesan" class="page-message">
          {{ pesan }}
        </div>

        <!-- LOADING -->
        <div
          v-if="sedangMemuat"
          class="empty-state"
        >
          <div class="loading-icon">⏳</div>

          <p>Memuat data pra sekolah...</p>
        </div>

        <!-- EMPTY -->
        <div
          v-else-if="dataPraSekolah.length === 0"
          class="empty-state"
        >
          <div class="empty-icon">🎒</div>

          <h3>Belum ada data pra sekolah</h3>

          <p>
            Belum terdapat anak dengan usia
            60–72 bulan pada data Posyandu.
          </p>

          <button
            type="button"
            class="btn-primary"
            @click="tambahAnak"
          >
            + Tambah Data Anak
          </button>
        </div>

        <!-- TABLE -->
        <div v-else class="data-card">
          <div class="table-header">
            <div>
              <h3>Daftar Pra Sekolah</h3>

              <p>
                Total {{ dataPraSekolah.length }} anak
              </p>
            </div>
          </div>

          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Anak</th>
                  <th>Jenis Kelamin</th>
                  <th>Tanggal Lahir</th>
                  <th>Umur</th>
                  <th>Nama Ibu</th>
                  <th>Alamat</th>
                  <th>Aksi</th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="(anak, index) in dataPraSekolah"
                  :key="anak.id"
                >
                  <td>{{ index + 1 }}</td>

                  <td>
                    <strong>{{ anak.nama }}</strong>
                  </td>

                  <td>
                    <span
                      class="gender-badge"
                      :class="
                        anak.jenis_kelamin === 'L'
                          ? 'male'
                          : 'female'
                      "
                    >
                      {{
                        anak.jenis_kelamin === 'L'
                          ? 'Laki-laki'
                          : 'Perempuan'
                      }}
                    </span>
                  </td>

                  <td>
                    {{ formatTanggal(anak.tanggal_lahir) }}
                  </td>

                  <td>
                    <span class="age-badge">
                      {{ formatUmurAnak(anak.tanggal_lahir) }}
                    </span>
                  </td>

                  <td>{{ anak.nama_ibu || '-' }}</td>

                  <td>{{ anak.alamat || '-' }}</td>

                  <td>
                    
<div class="action-buttons">
  <button
    type="button"
    class="btn-view"
    @click="lihatDetail(anak.id)"
  >
    Lihat
  </button>

  <button
    type="button"
    class="btn-edit"
    @click="editAnak(anak.id)"
  >
    Edit
  </button>

  <button
    type="button"
    class="btn-delete"
    :disabled="sedangMenghapusId === anak.id"
    @click="hapusAnak(anak)"
  >
    {{
      sedangMenghapusId === anak.id
        ? 'Menghapus...'
        : 'Hapus'
    }}
  </button>
</div>

                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>

    <!-- MODAL TAMBAH DATA ANAK -->
    <div
      v-if="modalTambah"
      class="modal-overlay"
      @click.self="tutupModal"
    >
      <div
        class="modal-box"
        role="dialog"
        aria-modal="true"
        aria-labelledby="judul-modal"
      >
        <div class="modal-header">
          <div>
            <h3 id="judul-modal">Tambah Data Anak</h3>
            <p>Lengkapi data anak pra sekolah.</p>
          </div>

          <button
            type="button"
            class="modal-close"
            aria-label="Tutup formulir"
            @click="tutupModal"
          >
            ×
          </button>
        </div>

        <form @submit.prevent="simpanAnak">
          <div class="form-group">
            <label for="nama-anak">Nama Anak *</label>

            <input
              id="nama-anak"
              v-model.trim="form.nama"
              type="text"
              placeholder="Masukkan nama lengkap anak"
              required
            />
          </div>

          <div class="form-group">
            <label for="jenis-kelamin">Jenis Kelamin *</label>

            <select
              id="jenis-kelamin"
              v-model="form.jenis_kelamin"
              required
            >
              <option value="" disabled>
                Pilih jenis kelamin
              </option>

              <option value="L">Laki-laki</option>
              <option value="P">Perempuan</option>
            </select>
          </div>

          <div class="form-group">
            <label for="tanggal-lahir">Tanggal Lahir *</label>

            <input
              id="tanggal-lahir"
              v-model="form.tanggal_lahir"
              type="date"
              :max="tanggalHariIni"
              required
            />
          </div>

          <div
            v-if="form.tanggal_lahir"
            class="age-preview"
          >
            Usia anak:
            {{ formatUmurAnak(form.tanggal_lahir) }}

            <p v-if="kategoriForm === 'Pra Sekolah'">
              Anak termasuk kategori Pra Sekolah.
            </p>

            <p v-else>
              Kategori saat ini:
              {{ kategoriForm || 'Tidak diketahui' }}.
              Data hanya dapat disimpan jika termasuk
              kategori Pra Sekolah.
            </p>
          </div>

          <div class="form-group">
            <label for="nama-ibu">Nama Ibu *</label>

            <input
              id="nama-ibu"
              v-model.trim="form.nama_ibu"
              type="text"
              placeholder="Masukkan nama ibu"
              required
            />
          </div>

          <div class="form-group">
            <label for="alamat-anak">Alamat</label>

            <textarea
              id="alamat-anak"
              v-model.trim="form.alamat"
              rows="3"
              placeholder="Masukkan alamat anak"
            ></textarea>
          </div>

          <p v-if="errorForm" class="form-error">
            {{ errorForm }}
          </p>

          <div class="modal-actions">
            <button
              type="button"
              class="btn-modal-cancel"
              :disabled="sedangMenyimpan"
              @click="tutupModal"
            >
              Batal
            </button>

            <button
              type="submit"
              class="btn-modal-save"
              :disabled="sedangMenyimpan"
            >
              {{
                sedangMenyimpan
                  ? 'Menyimpan...'
                  : 'Simpan Data'
              }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  computed,
  onMounted,
  ref
} from 'vue'

import {
  useRouter
} from 'vue-router'

import {
  tentukanKategoriAnak,
  formatUmurAnak
} from '../utils/kategoriAnak'

const router = useRouter()

/* =========================================================
   USER
========================================================= */

const user = JSON.parse(
  localStorage.getItem('userLogin') || 'null'
)

const menuProfil = ref(false)

const namaUser = computed(() => {
  return user?.nama || 'Kader'
})

/* =========================================================
   DATA
========================================================= */

const dataPraSekolah = ref([])
const sedangMemuat = ref(true)
const sedangMenghapusId = ref(null)
/* =========================================================
   MODAL TAMBAH DATA
========================================================= */

const modalTambah = ref(false)
const sedangMenyimpan = ref(false)
const errorForm = ref('')
const pesan = ref('')

const form = ref({
  nama: '',
  jenis_kelamin: '',
  tanggal_lahir: '',
  nama_ibu: '',
  alamat: ''
})

const tanggalHariIni = (() => {
  const sekarang = new Date()
  const tahun = sekarang.getFullYear()
  const bulan = String(sekarang.getMonth() + 1).padStart(2, '0')
  const hari = String(sekarang.getDate()).padStart(2, '0')

  return `${tahun}-${bulan}-${hari}`
})()

const kategoriForm = computed(() => {
  if (!form.value.tanggal_lahir) {
    return ''
  }

  return tentukanKategoriAnak(form.value.tanggal_lahir)
})

const tambahAnak = () => {
  form.value = {
    nama: '',
    jenis_kelamin: '',
    tanggal_lahir: '',
    nama_ibu: '',
    alamat: ''
  }

  errorForm.value = ''
  pesan.value = ''
  menuProfil.value = false
  modalTambah.value = true
}

const tutupModal = () => {
  if (sedangMenyimpan.value) {
    return
  }

  modalTambah.value = false
  errorForm.value = ''
}

const simpanAnak = async () => {
  errorForm.value = ''

  if (
    !form.value.nama ||
    !form.value.jenis_kelamin ||
    !form.value.tanggal_lahir ||
    !form.value.nama_ibu
  ) {
    errorForm.value =
      'Nama anak, jenis kelamin, tanggal lahir, dan nama ibu wajib diisi.'

    return
  }

  if (form.value.tanggal_lahir > tanggalHariIni) {
    errorForm.value =
      'Tanggal lahir tidak boleh melebihi tanggal hari ini.'

    return
  }

  if (kategoriForm.value !== 'Pra Sekolah') {
    errorForm.value =
      'Tanggal lahir anak tidak termasuk kategori Pra Sekolah. Periksa kembali tanggal lahir.'

    return
  }

  sedangMenyimpan.value = true

  try {
    const response = await fetch(
      'http://localhost:3000/api/anak',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form.value)
      }
    )

    const hasil = await response.json().catch(() => ({}))

    if (!response.ok || hasil.berhasil === false) {
      throw new Error(
        hasil.pesan ||
        hasil.message ||
        `Data gagal disimpan. Status server: ${response.status}.`
      )
    }

    modalTambah.value = false

    await ambilDataPraSekolah()

    pesan.value = 'Data anak berhasil disimpan.'
  } catch (error) {
    console.error('Gagal menyimpan data anak:', error)

    errorForm.value =
      error.message ||
      'Data gagal disimpan. Periksa koneksi backend.'
  } finally {
    sedangMenyimpan.value = false
  }
}

/* =========================================================
   AMBIL DATA
========================================================= */

const ambilDataPraSekolah = async () => {
  try {
    sedangMemuat.value = true

    const response = await fetch(
      'http://localhost:3000/api/anak'
    )

    if (!response.ok) {
      throw new Error('Gagal mengambil data anak.')
    }

    const hasil = await response.json()

    const data = Array.isArray(hasil.data)
      ? hasil.data
      : []

    dataPraSekolah.value = data.filter(
      anak =>
        tentukanKategoriAnak(
          anak.tanggal_lahir
        ) === 'Pra Sekolah'
    )
  } catch (error) {
    console.error(
      'Gagal mengambil data pra sekolah:',
      error
    )

    dataPraSekolah.value = []
    pesan.value =
      'Data belum berhasil dimuat. Periksa koneksi server.'
  } finally {
    sedangMemuat.value = false
  }
}

/* =========================================================
   FORMAT TANGGAL
========================================================= */

const formatTanggal = (tanggal) => {
  if (!tanggal) {
    return '-'
  }

  const tanggalString = String(tanggal).substring(0, 10)

  const [
    tahun,
    bulan,
    hari
  ] = tanggalString.split('-')

  return `${hari}-${bulan}-${tahun}`
}

/* =========================================================
   DETAIL
========================================================= */

const lihatDetail = (id) => {
  router.push(`/pra-sekolah/${id}`)
}


/* =========================================================
   HAPUS DATA
========================================================= */

const hapusAnak = async (anak) => {
  const konfirmasi = window.confirm(
    `Apakah data anak "${anak.nama}" ingin dihapus? Data yang dihapus tidak dapat dipulihkan.`
  )

  if (!konfirmasi) {
    return
  }

  sedangMenghapusId.value = anak.id
  pesan.value = ''

  try {
    const response = await fetch(
      `http://localhost:3000/api/anak/${anak.id}`,
      {
        method: 'DELETE'
      }
    )

    const hasil = await response.json().catch(() => ({}))

    if (!response.ok || hasil.berhasil === false) {
      throw new Error(
        hasil.pesan ||
        hasil.message ||
        `Data gagal dihapus. Status server: ${response.status}.`
      )
    }

    await ambilDataPraSekolah()

    pesan.value = 'Data anak berhasil dihapus.'
  } catch (error) {
    console.error('Gagal menghapus data pra sekolah:', error)

    pesan.value =
      error.message ||
      'Data gagal dihapus. Periksa koneksi server.'
  } finally {
    sedangMenghapusId.value = null
  }
}

/* =========================================================
   EDIT
========================================================= */

const editAnak = (id) => {
  router.push({
    path: '/balita',
    query: {
      edit: id
    }
  })
}

/* =========================================================
   LOGOUT
========================================================= */

const logout = () => {
  localStorage.removeItem('userLogin')
  router.push('/login')
}

/* =========================================================
   LOAD
========================================================= */

onMounted(() => {
  ambilDataPraSekolah()
})
</script>

<style scoped>
.page-content {
  padding: 30px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.page-header h1 {
  margin: 0 0 6px;
  font-size: 24px;
}

.page-header p {
  margin: 0;
  color: #64748b;
  font-size: 14px;
}

/* =========================================================
   PROFILE
========================================================= */

.profile-wrapper {
  position: relative;
  cursor: pointer;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.profile-avatar {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 18px;
}

.profile-name {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.profile-name strong {
  font-size: 14px;
}

.profile-name small {
  font-size: 11px;
}

.profile-arrow {
  margin-left: 3px;
}

.profile-dropdown {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 220px;
  padding: 12px;
  border-radius: 12px;
  background: white;
  border: 1px solid #e5e7eb;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  z-index: 2000;
}

.profile-dropdown-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.profile-avatar.large {
  width: 42px;
  height: 42px;
}

.profile-dropdown-header div:last-child {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.profile-divider {
  height: 1px;
  background: #e5e7eb;
  margin: 10px 0;
}

.logout-button {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  text-align: left;
}

.logout-button:hover {
  background: #fef2f2;
}

/* =========================================================
   INFO KATEGORI
========================================================= */

.category-info {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 18px 20px;
  margin-bottom: 25px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 12px;
}

.category-icon {
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #dcfce7;
  font-size: 22px;
}

.category-info strong {
  display: block;
  margin-bottom: 4px;
}

.category-info p {
  margin: 0;
  color: #64748b;
  font-size: 13px;
}

/* =========================================================
   BUTTON ASLI
========================================================= */

.btn-primary {
  padding: 11px 18px;
  border: none;
  border-radius: 8px;
  background: #2563eb;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

.btn-primary:hover {
  background: #1d4ed8;
}

/* =========================================================
   DATA CARD
========================================================= */

.data-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  overflow: hidden;
}

.table-header {
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.table-header h3 {
  margin: 0 0 5px;
}

.table-header p {
  margin: 0;
  color: #64748b;
  font-size: 13px;
}

/* =========================================================
   TABLE
========================================================= */

.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 14px 16px;
  text-align: left;
  border-bottom: 1px solid #f1f5f9;
  font-size: 13px;
}

th {
  background: #f8fafc;
  color: #475569;
  font-weight: 600;
}

tbody tr:hover {
  background: #f8fafc;
}

/* =========================================================
   BADGE
========================================================= */

.gender-badge,
.age-badge {
  display: inline-flex;
  align-items: center;
  padding: 5px 9px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.gender-badge.male {
  background: #dbeafe;
  color: #1d4ed8;
}

.gender-badge.female {
  background: #fce7f3;
  color: #be185d;
}

.age-badge {
  background: #dcfce7;
  color: #15803d;
}

/* =========================================================
   ACTION ASLI
========================================================= */

.action-buttons {
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-view,
.btn-edit {
  padding: 7px 11px;
  border-radius: 7px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
}

.btn-view {
  border: 1px solid #bfdbfe;
  background: #eff6ff;
  color: #2563eb;
}

.btn-edit {
  border: 1px solid #fed7aa;
  background: #fff7ed;
  color: #ea580c;
}

/* =========================================================
   EMPTY ASLI
========================================================= */

.empty-state {
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  text-align: center;
}

.empty-icon,
.loading-icon {
  font-size: 40px;
}

.empty-state h3 {
  margin: 5px 0;
}

.empty-state p {
  margin: 0 0 10px;
  color: #64748b;
  font-size: 14px;
}

/* =========================================================
   TOPBAR ASLI
========================================================= */

.topbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: #ffffff;
}

/* =========================================================
   TAMBAHAN MODAL
   CSS di atas dipertahankan
========================================================= */

.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(15, 23, 42, 0.5);
}

.modal-box {
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 24px;
  border-radius: 14px;
  background: #ffffff;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 20px;
}

.modal-header h3 {
  margin: 0 0 5px;
}

.modal-header p {
  margin: 0;
  color: #64748b;
  font-size: 13px;
}

.modal-close {
  flex-shrink: 0;
  border: none;
  background: transparent;
  color: #475569;
  font-size: 25px;
  cursor: pointer;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin-bottom: 15px;
}

.form-group label {
  font-size: 13px;
  font-weight: 600;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 7px;
  background: #ffffff;
  color: #334155;
  font-family: inherit;
  font-size: 13px;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #2563eb;
}

.age-preview {
  padding: 10px 12px;
  margin-bottom: 15px;
  border-radius: 8px;
  background: #f0fdf4;
  color: #166534;
  font-size: 12px;
  line-height: 1.6;
}

.age-preview p {
  margin: 5px 0 0;
}

.form-error {
  margin: 0 0 14px;
  color: #dc2626;
  font-size: 13px;
  line-height: 1.5;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.btn-modal-cancel,
.btn-modal-save {
  padding: 10px 15px;
  border-radius: 7px;
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.btn-modal-cancel {
  border: 1px solid #d1d5db;
  background: #ffffff;
  color: #475569;
}

.btn-modal-save {
  border: 1px solid #2563eb;
  background: #2563eb;
  color: #ffffff;
}

.btn-modal-cancel:hover {
  background: #f8fafc;
}

.btn-modal-save:hover {
  background: #1d4ed8;
}

.btn-modal-cancel:disabled,
.btn-modal-save:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.page-message {
  padding: 12px 15px;
  margin-bottom: 18px;
  border: 1px solid #bbf7d0;
  border-radius: 8px;
  background: #f0fdf4;
  color: #166534;
  font-size: 13px;
}

@media (max-width: 540px) {
  .modal-box {
    padding: 18px;
  }
}


/* =========================================================
   TOMBOL HAPUS
========================================================= */

.btn-delete {
  padding: 7px 11px;
  border: 1px solid #fecaca;
  border-radius: 7px;
  background: #fef2f2;
  color: #dc2626;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
}

.btn-delete:hover {
  background: #fee2e2;
}

.btn-delete:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}


</style>

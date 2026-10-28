
<template>
  <div class="app-layout">
    <!-- SIDEBAR -->
    <aside class="sidebar">
      <div class="sidebar-logo">🏥 <span>PosyanduCare</span></div>
      <div class="posyandu-name">Posyandu Sedap Malam 2</div>
      <nav>
        <router-link to="/dashboard">🏠 Dashboard</router-link>
        <router-link to="/bayi">👶 Bayi</router-link>
        <router-link to="/balita">🧒 Balita</router-link>
        <router-link to="/pra-sekolah">🎒 Pra Sekolah</router-link>
      </nav>
    </aside>

    <!-- MAIN -->
    <main class="main-content">
      <header class="topbar">
        <div>
          <h2>Dashboard</h2>
          <p>Selamat datang di Posyandu Sedap Malam 2</p>
        </div>

        <div class="profile-wrapper" @click="menuProfil = !menuProfil">
          <div class="user-info">
            <div class="profile-avatar">👤</div>
            <div class="profile-name">
              <strong>{{ namaUser }}</strong>
              <small>Kader Posyandu</small>
            </div>
            <span class="profile-arrow">▾</span>
          </div>

          <div v-if="menuProfil" class="profile-dropdown" @click.stop>
            <div class="profile-dropdown-header">
              <div class="profile-avatar large">👤</div>
              <div>
                <strong>{{ namaUser }}</strong>
                <small>Kader Posyandu</small>
              </div>
            </div>
            <div class="profile-divider"></div>
            <button class="logout-button" @click.stop="logout">
              <span>↪</span> Keluar
            </button>
          </div>
        </div>
      </header>

      <section class="dashboard-content">
        <!-- SAMBUTAN DAN EKSPOR -->
        <div class="welcome-export-row">
          <div class="welcome-box">
            <h1>Selamat datang, {{ namaUser }} 👋</h1>
            <p>Berikut ringkasan data kesehatan Posyandu Sedap Malam 2.</p>
          </div>

          <button class="btn-export-excel" @click="modalRekap = true">
            📊 Ekspor Laporan Excel
          </button>
        </div>

        <!-- RINGKASAN POSYANDU -->
        <div class="dashboard-panel">
          <div class="panel-header"><h3>Ringkasan Posyandu</h3></div>
          <div class="info-row"><span>Nama Posyandu</span><strong>Posyandu Sedap Malam 2</strong></div>
          <div class="info-row"><span>Kelurahan</span><strong>Nginden Jangkungan</strong></div>
          <div class="info-row"><span>Kecamatan</span><strong>Sukolilo</strong></div>
          <div class="info-row"><span>Kota</span><strong>Surabaya</strong></div>
        </div>

        <!-- STATISTIK UTAMA -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">👶</div>
            <div><p>Total Anak</p><h2>{{ jumlahBalita }}</h2><span>Anak terdaftar</span></div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">📋</div>
            <div><p>Sudah Diperiksa</p><h2>{{ jumlahSudahDiperiksa }}</h2><span>Sudah diperiksa bulan ini</span></div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">📝</div>
            <div><p>Belum Diperiksa</p><h2>{{ jumlahBelumDiperiksa }}</h2><span>Belum diperiksa bulan ini</span></div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">📊</div>
            <div><p>Persentase Stunting</p><h2>{{ persentaseStunting }}</h2><span>Pemeriksaan bulan ini</span></div>
          </div>
        </div>

        <!-- KATEGORI ANAK -->
        <div class="dashboard-panel category-panel">
          <div class="panel-header">
            <div><h3>Kategori Anak</h3><p>Jumlah anak berdasarkan kelompok umur.</p></div>
          </div>
          <div class="category-grid">
            <div class="category-card bayi">
              <div class="category-icon">👶</div>
              <div><span>Bayi</span><strong>{{ jumlahBayi }}</strong><small>0–11 bulan</small></div>
            </div>
            <div class="category-card balita">
              <div class="category-icon">🧒</div>
              <div><span>Balita</span><strong>{{ jumlahBalitaKategori }}</strong><small>12–59 bulan</small></div>
            </div>
            <div class="category-card prasekolah">
              <div class="category-icon">🎒</div>
              <div><span>Pra Sekolah</span><strong>{{ jumlahPraSekolah }}</strong><small>60–72 bulan</small></div>
            </div>
          </div>
        </div>

        <!-- STATUS WHO -->
        <div class="dashboard-panel">
          <div class="panel-header">
            <div>
              <h3>Status Pertumbuhan WHO</h3>
              <p>Status berdasarkan pemeriksaan terbaru yang memiliki data TB/PB.</p>
            </div>
          </div>
          <div class="status-grid">
            <div class="status-card normal"><span class="status-icon">✓</span><div><span>Normal</span><strong>{{ jumlahNormal }}</strong></div></div>
            <div class="status-card stunted"><span class="status-icon">!</span><div><span>Stunted</span><strong>{{ jumlahStunted }}</strong></div></div>
            <div class="status-card severe"><span class="status-icon">!!</span><div><span>Severely Stunted</span><strong>{{ jumlahSeverelyStunted }}</strong></div></div>
            <div class="status-card belum"><span class="status-icon">?</span><div><span>Belum Diperiksa</span><strong>{{ jumlahBelumDiperiksa }}</strong></div></div>
          </div>
        </div>

        <!-- AKSES CEPAT -->
        <div class="dashboard-grid">
          <div class="dashboard-panel">
            <div class="panel-header"><h3>Akses Cepat</h3></div>
            <router-link to="/balita" class="quick-button">
              👶
              <span><strong>Data Balita</strong><small>Lihat dan kelola data anak</small></span>
            </router-link>
          </div>
        </div>

        <!-- GRAFIK STATUS -->
        <div class="dashboard-panel">
          <div class="panel-header">
            <div><h3>Tren Status Pertumbuhan</h3><p>Perbandingan hasil pemeriksaan setiap bulan.</p></div>
          </div>
          <div class="chart-container">
            <div v-if="dataTrenBulanan.length === 0" class="empty-data">Belum ada data pemeriksaan.</div>
            <div v-else class="dashboard-chart-wrapper"><canvas ref="statusChartCanvas"></canvas></div>
          </div>
        </div>

        <!-- GRAFIK PERSENTASE -->
        <div class="dashboard-panel">
          <div class="panel-header">
            <div><h3>Tren Persentase Stunting</h3><p>Persentase Stunted dan Severely Stunted dari anak yang diperiksa pada setiap bulan.</p></div>
          </div>
          <div class="chart-container">
            <div v-if="dataTrenBulanan.length === 0" class="empty-data">Belum ada data pemeriksaan.</div>
            <div v-else class="dashboard-chart-wrapper"><canvas ref="percentageChartCanvas"></canvas></div>
          </div>
        </div>

        <!-- PEMERIKSAAN TERBARU -->
        <div class="dashboard-panel">
          <div class="panel-header">
            <div><h3>Pemeriksaan Terbaru</h3><p>Data pemeriksaan terakhir yang tersimpan.</p></div>
          </div>
          <div v-if="pemeriksaanTerbaru.length === 0" class="empty-data">Belum ada pemeriksaan.</div>
          <div v-else class="recent-examination-list">
            <div v-for="(item, index) in pemeriksaanTerbaruHalaman" :key="`${item.anak.id}-${item.pemeriksaan.id}`" class="recent-examination-item">
              <div class="recent-number">{{ (halamanPemeriksaanTerbaru - 1) * itemPerHalaman + index + 1 }}</div>
              <div class="recent-avatar">👶</div>
              <div class="recent-information">
                <strong>{{ item.anak.nama }}</strong>
                <span>{{ formatTanggal(item.pemeriksaan.tanggal) }}</span>
                <small>TB/PB: {{ tampilkanAngka(item.pemeriksaan.tb) }} cm &nbsp;•&nbsp; BB: {{ tampilkanAngka(item.pemeriksaan.bb) }} kg</small>
              </div>
              <div :class="['status-badge', statusClass(item.status)]">{{ item.status || 'Belum dihitung' }}</div>
            </div>
          </div>
          <div v-if="totalHalamanPemeriksaanTerbaru > 1" class="pagination-controls">
            <button class="pagination-button" :disabled="halamanPemeriksaanTerbaru === 1" @click="halamanPemeriksaanTerbaru--">‹</button>
            <span>{{ halamanPemeriksaanTerbaru }} / {{ totalHalamanPemeriksaanTerbaru }}</span>
            <button class="pagination-button" :disabled="halamanPemeriksaanTerbaru === totalHalamanPemeriksaanTerbaru" @click="halamanPemeriksaanTerbaru++">›</button>
          </div>
        </div>

        <!-- ANAK PERLU DIPANTAU -->
        <div class="dashboard-panel">
          <div class="panel-header">
            <div><h3>Anak yang Perlu Dipantau</h3><p>Anak dengan hasil skrining Stunted atau Severely Stunted.</p></div>
          </div>
          <div v-if="anakPerluDipantau.length === 0" class="empty-data success-empty">
            ✓ Tidak ada anak yang masuk daftar pemantauan berdasarkan data pemeriksaan terbaru.
          </div>
          <div v-else class="monitoring-list">
            <div v-for="(item, index) in anakPerluDipantauHalaman" :key="`${item.anak.id}-${item.pemeriksaan.id}`" class="monitoring-item">
              <div class="monitoring-number">{{ (halamanAnakDipantau - 1) * itemPerHalaman + index + 1 }}</div>
              <div class="monitoring-information">
                <strong>{{ item.anak.nama }}</strong>
                <span>Pemeriksaan: {{ formatTanggal(item.pemeriksaan.tanggal) }}</span>
              </div>
              <div :class="['status-badge', statusClass(item.status)]">{{ item.status }}</div>
            </div>
          </div>
          <div v-if="totalHalamanAnakDipantau > 1" class="pagination-controls">
            <button class="pagination-button" :disabled="halamanAnakDipantau === 1" @click="halamanAnakDipantau--">‹</button>
            <span>{{ halamanAnakDipantau }} / {{ totalHalamanAnakDipantau }}</span>
            <button class="pagination-button" :disabled="halamanAnakDipantau === totalHalamanAnakDipantau" @click="halamanAnakDipantau++">›</button>
          </div>
        </div>

        <!-- LAYANAN -->
        <div class="dashboard-panel">
          <div class="panel-header">
            <div><h3>Rekap Layanan</h3><p>Data layanan yang tercatat pada pemeriksaan.</p></div>
          </div>
          <div class="service-grid">
            <div class="service-card"><span class="service-icon">💉</span><div><span>Imunisasi</span><strong>{{ jumlahImunisasi }}</strong><small>Pemeriksaan tercatat</small></div></div>
            <div class="service-card"><span class="service-icon">💊</span><div><span>Vitamin A</span><strong>{{ jumlahVitaminA }}</strong><small>Pemeriksaan tercatat</small></div></div>
            <div class="service-card"><span class="service-icon">🧴</span><div><span>Obat Cacing</span><strong>{{ jumlahObatCacing }}</strong><small>Pemeriksaan tercatat</small></div></div>
          </div>
        </div>

        <div class="dashboard-note">
          <strong>Catatan:</strong>
          Hasil status pertumbuhan pada dashboard merupakan hasil skrining berdasarkan data antropometri dan standar WHO, bukan diagnosis medis.
        </div>
      </section>
    </main>

    <!-- MODAL EKSPOR -->
    <div v-if="modalRekap" class="export-overlay" @click.self="modalRekap = false">
      <div class="export-modal">
        <button class="export-close" type="button" @click="modalRekap = false" :disabled="sedangEkspor">×</button>
        <h2>Ekspor Laporan Excel</h2>
        <p>Pilih kategori data anak yang ingin dimasukkan ke dalam laporan.</p>

        <label for="kategoriRekap">Kategori anak</label>
        <select id="kategoriRekap" v-model="kategoriRekap">
          <option value="Semua Data">Semua Data</option>
          <option value="Bayi">Bayi</option>
          <option value="Balita">Balita</option>
          <option value="Pra Sekolah">Pra Sekolah</option>
        </select>

        <div class="export-info">
          <strong>Isi laporan:</strong>
          <ul>
            <li>Ringkasan Laporan</li>
            <li>Data Anak</li>
            <li>Diagram Status Pertumbuhan</li>
            <li>Tren Pertumbuhan Bulanan</li>
            <li>Riwayat Pemeriksaan</li>
          </ul>
        </div>

        <p v-if="pesanEkspor" class="export-error">{{ pesanEkspor }}</p>

        <div class="export-modal-actions">
          <button class="btn-export-cancel" @click="modalRekap = false" :disabled="sedangEkspor">Batal</button>
          <button class="btn-export-confirm" @click="eksporLaporanExcel" :disabled="sedangEkspor">
            {{ sedangEkspor ? 'Menyiapkan laporan...' : 'Unduh Excel' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { hitungStatusWHO } from '../utils/whoGrowth'
import { tentukanKategoriAnak } from '../utils/kategoriAnak'
import ExcelJS from 'exceljs'
import {
  Chart,
  LineController,
  LineElement,
  BarController,
  BarElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
  PieController,
  ArcElement
} from 'chart.js'

Chart.register(
  LineController,
  LineElement,
  BarController,
  BarElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
  PieController,
  ArcElement
)

const router = useRouter()

/* USER */
const user = JSON.parse(localStorage.getItem('userLogin') || 'null')
const menuProfil = ref(false)
const namaUser = computed(() => user?.nama || 'Kader')

/* DATA */
const dataBalita = ref([])
const sedangMemuat = ref(true)
const hasilWHO = ref({})

/* EKSPOR EXCEL */
const modalRekap = ref(false)
const kategoriRekap = ref('Semua Data')
const sedangEkspor = ref(false)
const pesanEkspor = ref('')

/* WARNA GRAFIK PROFESIONAL */
const warnaGrafik = {
  hijau: '#477A68',
  hijauMuda: '#88A99A',
  emas: '#D6A34D',
  merah: '#B85C5C',
  biru: '#7187A5',
  abu: '#A3ADB8',
  grid: '#E8ECE9',
  teks: '#34443D'
}

/* NORMALISASI */
const normalisasiTanggal = (tanggal) => {
  if (!tanggal) return null
  return String(tanggal).substring(0, 10)
}

const pemeriksaanValidWHO = (pemeriksaan) => (
  pemeriksaan &&
  pemeriksaan.tanggal &&
  pemeriksaan.tb !== null &&
  pemeriksaan.tb !== undefined &&
  Number(pemeriksaan.tb) > 0
)

/* AMBIL DATA MYSQL */
const ambilDataBalita = async () => {
  try {
    sedangMemuat.value = true

    const response = await fetch('http://localhost:3000/api/balita')

    if (!response.ok) {
      throw new Error('Gagal mengambil data balita.')
    }

    const hasil = await response.json()
    const data = Array.isArray(hasil.data) ? hasil.data : []

    const dataLengkap = await Promise.all(
      data.map(async (anak) => {
        try {
          const responsePemeriksaan = await fetch(
            `http://localhost:3000/api/balita/${anak.id}/pemeriksaan`
          )

          if (!responsePemeriksaan.ok) {
            return { ...anak, pemeriksaan: [] }
          }

          const hasilPemeriksaan = await responsePemeriksaan.json()

          const pemeriksaan = Array.isArray(hasilPemeriksaan.data)
            ? hasilPemeriksaan.data
            : []

          return {
            ...anak,
            pemeriksaan: pemeriksaan.map(item => ({
              ...item,
              tanggal: item.tanggal || item.tanggal_pemeriksaan,
              tb: item.tb !== null && item.tb !== undefined
                ? Number(item.tb)
                : null,
              bb: item.bb !== null && item.bb !== undefined
                ? Number(item.bb)
                : null,
              lk: item.lk !== null && item.lk !== undefined
                ? Number(item.lk)
                : null,
              lila: item.lila !== null && item.lila !== undefined
                ? Number(item.lila)
                : null
            }))
          }
        } catch (error) {
          console.error(
            `Gagal mengambil pemeriksaan anak ${anak.id}:`,
            error
          )

          return { ...anak, pemeriksaan: [] }
        }
      })
    )

    dataBalita.value = dataLengkap
  } catch (error) {
    console.error('Gagal mengambil data dashboard:', error)
    dataBalita.value = []
  } finally {
    sedangMemuat.value = false
  }
}

/* DATA ANAK AKTIF */
const dataAnakAktif = computed(() => dataBalita.value.filter(anak => {
  const kategori = tentukanKategoriAnak(
    anak.tanggal_lahir || anak.tanggalLahir
  )

  return ['Bayi', 'Balita', 'Pra Sekolah'].includes(kategori)
}))

/* JUMLAH ANAK */
const jumlahBalita = computed(() => dataAnakAktif.value.length)

/* PEMERIKSAAN BULAN INI */
const anakDiperiksaBulanIni = computed(() => {
  const sekarang = new Date()

  return dataAnakAktif.value.filter(anak =>
    (anak.pemeriksaan || []).some(pemeriksaan => {
      const tanggal = pemeriksaan.tanggal || pemeriksaan.tanggal_pemeriksaan

      if (!tanggal) return false

      const t = new Date(tanggal)

      return t.getFullYear() === sekarang.getFullYear() &&
        t.getMonth() === sekarang.getMonth()
    })
  )
})

const jumlahSudahDiperiksa = computed(
  () => anakDiperiksaBulanIni.value.length
)

const jumlahBelumDiperiksa = computed(
  () => jumlahBalita.value - jumlahSudahDiperiksa.value
)

/* KATEGORI ANAK */
const jumlahBayi = computed(() => dataAnakAktif.value.filter(
  anak => tentukanKategoriAnak(
    anak.tanggal_lahir || anak.tanggalLahir
  ) === 'Bayi'
).length)

const jumlahBalitaKategori = computed(() => dataAnakAktif.value.filter(
  anak => tentukanKategoriAnak(
    anak.tanggal_lahir || anak.tanggalLahir
  ) === 'Balita'
).length)

const jumlahPraSekolah = computed(() => dataAnakAktif.value.filter(
  anak => tentukanKategoriAnak(
    anak.tanggal_lahir || anak.tanggalLahir
  ) === 'Pra Sekolah'
).length)

/* PEMERIKSAAN TERBARU PER ANAK */
const ambilPemeriksaanTerbaru = (anak) => {
  if (!anak.pemeriksaan || anak.pemeriksaan.length === 0) return null

  return [...anak.pemeriksaan]
    .filter(pemeriksaan => pemeriksaanValidWHO(pemeriksaan))
    .sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal))[0] || null
}

/* WHO */
const hitungStatus = async (anak, pemeriksaan) => {
  if (!pemeriksaanValidWHO(pemeriksaan)) return null

  const tanggalLahir = normalisasiTanggal(
    anak.tanggal_lahir || anak.tanggalLahir
  )

  const tanggalPemeriksaan = normalisasiTanggal(pemeriksaan.tanggal)
  const jenisKelamin = anak.jenis_kelamin || anak.jenisKelamin

  if (!tanggalLahir || !tanggalPemeriksaan || !jenisKelamin) {
    return null
  }

  try {
    const hasil = await hitungStatusWHO({
      tanggalLahir,
      tanggalPemeriksaan,
      jenisKelamin,
      tb: pemeriksaan.tb,
      bb: pemeriksaan.bb,
      lk: pemeriksaan.lk
    })

    if (!hasil || !hasil.berhasil) return null

    return hasil
  } catch (error) {
    console.error('Gagal menghitung WHO:', error)
    return null
  }
}

const hitungSemuaStatusWHO = async () => {
  const hasil = {}

  for (const anak of dataAnakAktif.value) {
    for (const pemeriksaan of anak.pemeriksaan || []) {
      if (!pemeriksaanValidWHO(pemeriksaan)) continue

      const hasilPemeriksaan = await hitungStatus(anak, pemeriksaan)

      if (!hasilPemeriksaan) continue

      hasil[`${anak.id}-${pemeriksaan.id}`] = {
        balitaId: anak.id,
        pemeriksaanId: pemeriksaan.id,
        status: hasilPemeriksaan.status,
        zScore: hasilPemeriksaan.zScore,
        tanggal: pemeriksaan.tanggal
      }
    }
  }

  hasilWHO.value = hasil
}

/* HASIL WHO TERBARU */
const hasilWHOterbaru = computed(() => {
  const hasil = []

  dataAnakAktif.value.forEach(anak => {
    const pemeriksaan = ambilPemeriksaanTerbaru(anak)

    if (!pemeriksaan) return

    const hasilPemeriksaan = hasilWHO.value[
      `${anak.id}-${pemeriksaan.id}`
    ]

    if (hasilPemeriksaan) {
      hasil.push({ ...hasilPemeriksaan, anak, pemeriksaan })
    }
  })

  return hasil
})

/* STATUS */
const jumlahNormal = computed(() => hasilWHOterbaru.value.filter(
  item => item.status === 'Normal'
).length)

const jumlahStunted = computed(() => hasilWHOterbaru.value.filter(
  item => item.status === 'Stunted'
).length)

const jumlahSeverelyStunted = computed(
  () => hasilWHOterbaru.value.filter(
    item => item.status === 'Severely Stunted'
  ).length
)

/* PEMERIKSAAN BULAN BERJALAN */
const pemeriksaanBulanIni = computed(() => {
  const sekarang = new Date()
  const hasil = []

  dataAnakAktif.value.forEach(anak => {
    const pemeriksaan = (anak.pemeriksaan || [])
      .filter(item => {
        if (!pemeriksaanValidWHO(item)) return false

        const tanggal = new Date(item.tanggal)

        return tanggal.getFullYear() === sekarang.getFullYear() &&
          tanggal.getMonth() === sekarang.getMonth()
      })
      .sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal))[0]

    if (!pemeriksaan) return

    const who = hasilWHO.value[`${anak.id}-${pemeriksaan.id}`]

    if (who) hasil.push({ ...who, anak, pemeriksaan })
  })

  return hasil
})

/* PERSENTASE STUNTING */
const persentaseStunting = computed(() => {
  const data = pemeriksaanBulanIni.value

  if (data.length === 0) return '0%'

  const jumlah = data.filter(item =>
    item.status === 'Stunted' ||
    item.status === 'Severely Stunted'
  ).length

  return `${((jumlah / data.length) * 100).toFixed(1).replace('.', ',')}%`
})

/* TREN STATUS BULANAN DASHBOARD
   Setiap anak dihitung satu kali per bulan berdasarkan pemeriksaan
   terakhir pada bulan tersebut.
*/
const dataTrenBulanan = computed(() => {
  const data = {}

  dataAnakAktif.value.forEach(anak => {
    const pemeriksaanPerBulan = {}

    ;(anak.pemeriksaan || []).forEach(pemeriksaan => {
      if (!pemeriksaanValidWHO(pemeriksaan)) return

      const who = hasilWHO.value[`${anak.id}-${pemeriksaan.id}`]

      if (!who) return

      const tanggal = new Date(pemeriksaan.tanggal)

      if (Number.isNaN(tanggal.getTime())) return

      const tahun = tanggal.getFullYear()
      const bulan = tanggal.getMonth()
      const key = `${tahun}-${String(bulan + 1).padStart(2, '0')}`

      if (
        !pemeriksaanPerBulan[key] ||
        tanggal > new Date(pemeriksaanPerBulan[key].tanggal)
      ) {
        pemeriksaanPerBulan[key] = pemeriksaan
      }
    })

    Object.entries(pemeriksaanPerBulan).forEach(([key, pemeriksaan]) => {
      const [tahun, bulan] = key.split('-').map(Number)

      if (!data[key]) {
        data[key] = {
          tahun,
          bulan: bulan - 1,
          total: 0,
          normal: 0,
          stunted: 0,
          severe: 0
        }
      }

      const who = hasilWHO.value[`${anak.id}-${pemeriksaan.id}`]

      if (!who) return

      data[key].total++

      if (who.status === 'Normal') data[key].normal++
      else if (who.status === 'Stunted') data[key].stunted++
      else if (who.status === 'Severely Stunted') data[key].severe++
    })
  })

  return Object.values(data)
    .sort((a, b) => a.tahun !== b.tahun
      ? a.tahun - b.tahun
      : a.bulan - b.bulan
    )
    .map(item => {
      const jumlahStunting = item.stunted + item.severe
      const persentase = item.total > 0
        ? (jumlahStunting / item.total) * 100
        : 0

      return {
        ...item,
        label: new Date(item.tahun, item.bulan, 1)
          .toLocaleDateString('id-ID', {
            month: 'short',
            year: 'numeric'
          }),
        persentase: Number(persentase.toFixed(1))
      }
    })
})

/* PEMERIKSAAN TERBARU */
const pemeriksaanTerbaru = computed(() => {
  const hasil = []

  dataAnakAktif.value.forEach(anak => {
    const pemeriksaan = ambilPemeriksaanTerbaru(anak)

    if (!pemeriksaan) return

    const who = hasilWHO.value[`${anak.id}-${pemeriksaan.id}`]

    hasil.push({
      anak,
      pemeriksaan,
      status: who?.status || null,
      waktu: new Date(pemeriksaan.tanggal).getTime()
    })
  })

  return hasil.sort((a, b) => b.waktu - a.waktu).slice(0, 1000)
})

/* PAGINATION */
const itemPerHalaman = 10
const halamanPemeriksaanTerbaru = ref(1)

const totalHalamanPemeriksaanTerbaru = computed(() => Math.max(
  1,
  Math.ceil(pemeriksaanTerbaru.value.length / itemPerHalaman)
))

const pemeriksaanTerbaruHalaman = computed(() => {
  const mulai = (halamanPemeriksaanTerbaru.value - 1) * itemPerHalaman

  return pemeriksaanTerbaru.value.slice(
    mulai,
    mulai + itemPerHalaman
  )
})

/* ANAK PERLU DIPANTAU */
const anakPerluDipantau = computed(() => hasilWHOterbaru.value.filter(
  item => item.status === 'Stunted' ||
    item.status === 'Severely Stunted'
))

const halamanAnakDipantau = ref(1)

const totalHalamanAnakDipantau = computed(() => Math.max(
  1,
  Math.ceil(anakPerluDipantau.value.length / itemPerHalaman)
))

const anakPerluDipantauHalaman = computed(() => {
  const mulai = (halamanAnakDipantau.value - 1) * itemPerHalaman

  return anakPerluDipantau.value.slice(
    mulai,
    mulai + itemPerHalaman
  )
})

/* LAYANAN */
const jumlahImunisasi = computed(() => dataAnakAktif.value.reduce(
  (total, anak) => total + (anak.pemeriksaan || []).filter(
    item => item.imunisasi && String(item.imunisasi).trim() !== ''
  ).length,
  0
))

const jumlahVitaminA = computed(() => dataAnakAktif.value.reduce(
  (total, anak) => total + (anak.pemeriksaan || []).filter(
    item => item.vitamin_a && String(item.vitamin_a).trim() !== ''
  ).length,
  0
))

const jumlahObatCacing = computed(() => dataAnakAktif.value.reduce(
  (total, anak) => total + (anak.pemeriksaan || []).filter(
    item => item.obat_cacing && String(item.obat_cacing).trim() !== ''
  ).length,
  0
))

/* FORMAT */
const formatTanggal = (tanggal) => {
  if (!tanggal) return '-'

  const date = new Date(tanggal)

  if (Number.isNaN(date.getTime())) return '-'

  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

const formatTanggalExcel = (tanggal) => {
  if (!tanggal) return '-'

  const date = new Date(tanggal)

  if (Number.isNaN(date.getTime())) return '-'

  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

const tampilkanAngka = (nilai) => {
  if (nilai === null || nilai === undefined || nilai === '') return '-'

  return Number(nilai).toLocaleString('id-ID', {
    maximumFractionDigits: 2
  })
}

const statusClass = (status) => {
  if (status === 'Normal') return 'status-normal'
  if (status === 'Stunted') return 'status-stunted'
  if (status === 'Severely Stunted') return 'status-severe'

  return 'status-belum'
}

/* CHART DASHBOARD */
const statusChartCanvas = ref(null)
const percentageChartCanvas = ref(null)

let statusChart = null
let percentageChart = null

const buatChartStatus = () => {
  if (!statusChartCanvas.value || dataTrenBulanan.value.length === 0) {
    return
  }

  if (statusChart) statusChart.destroy()

  statusChart = new Chart(statusChartCanvas.value, {
    type: 'bar',
    data: {
      labels: dataTrenBulanan.value.map(item => item.label),
      datasets: [
        {
          label: 'Normal',
          data: dataTrenBulanan.value.map(item => item.normal),
          backgroundColor: warnaGrafik.hijau,
          borderRadius: 5,
          maxBarThickness: 42
        },
        {
          label: 'Stunted',
          data: dataTrenBulanan.value.map(item => item.stunted),
          backgroundColor: warnaGrafik.emas,
          borderRadius: 5,
          maxBarThickness: 42
        },
        {
          label: 'Severely Stunted',
          data: dataTrenBulanan.value.map(item => item.severe),
          backgroundColor: warnaGrafik.merah,
          borderRadius: 5,
          maxBarThickness: 42
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        legend: { position: 'top' },
        tooltip: {
          callbacks: {
            label: context =>
              `${context.dataset.label}: ${context.parsed.y} anak`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { stepSize: 1 },
          grid: { color: warnaGrafik.grid },
          title: {
            display: true,
            text: 'Jumlah Anak'
          }
        },
        x: {
          grid: { display: false },
          title: {
            display: true,
            text: 'Bulan Pemeriksaan'
          }
        }
      }
    }
  })
}

const buatChartPersentase = () => {
  if (!percentageChartCanvas.value || dataTrenBulanan.value.length === 0) {
    return
  }

  if (percentageChart) percentageChart.destroy()

  percentageChart = new Chart(percentageChartCanvas.value, {
    type: 'line',
    data: {
      labels: dataTrenBulanan.value.map(item => item.label),
      datasets: [{
        label: 'Persentase Stunting',
        data: dataTrenBulanan.value.map(item => item.persentase),
        borderColor: warnaGrafik.biru,
        backgroundColor: 'rgba(113, 135, 165, 0.14)',
        pointBackgroundColor: warnaGrafik.biru,
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 7,
        tension: 0.25,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top' },
        tooltip: {
          callbacks: {
            label: context => `Persentase: ${context.parsed.y}%`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            callback: value => `${value}%`
          },
          grid: { color: warnaGrafik.grid },
          title: {
            display: true,
            text: 'Persentase Stunting'
          }
        },
        x: {
          grid: { display: false },
          title: {
            display: true,
            text: 'Bulan Pemeriksaan'
          }
        }
      }
    }
  })
}

/* =========================================================
   EKSPOR EXCEL
========================================================= */

/* FORMAT HEADER TABEL */
const gayaHeader = (worksheet, rowNumber = 1) => {
  const row = worksheet.getRow(rowNumber)
  row.height = 30

  row.eachCell(cell => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF477A68' }
    }

    cell.font = {
      bold: true,
      color: { argb: 'FFFFFFFF' },
      size: 10
    }

    cell.alignment = {
      vertical: 'middle',
      horizontal: 'center',
      wrapText: true
    }

    cell.border = {
      bottom: {
        style: 'thin',
        color: { argb: 'FF355D50' }
      }
    }
  })
}

/* FORMAT JUDUL WORKSHEET */
const gayaJudul = (
  worksheet,
  judul,
  subjudul,
  jumlahKolom = 5
) => {
  worksheet.mergeCells(1, 1, 1, jumlahKolom)

  const title = worksheet.getCell(1, 1)
  title.value = judul
  title.font = {
    bold: true,
    size: 18,
    color: { argb: 'FFFFFFFF' }
  }
  title.alignment = {
    vertical: 'middle',
    horizontal: 'center'
  }
  title.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF355D50' }
  }

  worksheet.getRow(1).height = 40

  worksheet.mergeCells(2, 1, 2, jumlahKolom)

  const subtitle = worksheet.getCell(2, 1)
  subtitle.value = subjudul
  subtitle.font = {
    italic: true,
    size: 10,
    color: { argb: 'FF64748B' }
  }
  subtitle.alignment = {
    horizontal: 'center',
    vertical: 'middle'
  }

  worksheet.getRow(2).height = 25
}

/* FORMAT TABEL */
const aturTabel = (worksheet, headerRow, kolomLebar) => {
  gayaHeader(worksheet, headerRow)

  worksheet.views = [{
    state: 'frozen',
    ySplit: headerRow
  }]

  worksheet.autoFilter = {
    from: { row: headerRow, column: 1 },
    to: { row: headerRow, column: kolomLebar.length }
  }

  kolomLebar.forEach((lebar, index) => {
    worksheet.getColumn(index + 1).width = lebar
  })

  for (
    let i = headerRow + 1;
    i <= worksheet.rowCount;
    i++
  ) {
    const row = worksheet.getRow(i)
    row.height = 23

    row.eachCell(cell => {
      cell.alignment = {
        vertical: 'middle',
        wrapText: true
      }

      cell.border = {
        bottom: {
          style: 'hair',
          color: { argb: 'FFE2E8F0' }
        }
      }

      if (i % 2 === 0) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFF3F7F4' }
        }
      }
    })
  }
}

/* GAMBAR CHART UNTUK EXCEL */
const buatGambarChart = async (
  tipe,
  labels,
  datasets,
  opsiTambahan = {}
) => {
  const canvas = document.createElement('canvas')

  canvas.width = 1200
  canvas.height = 650

  const konteks = canvas.getContext('2d')

  if (konteks) {
    konteks.fillStyle = '#FFFFFF'
    konteks.fillRect(0, 0, canvas.width, canvas.height)
  }

  const chart = new Chart(canvas, {
    type: tipe,
    data: {
      labels,
      datasets
    },
    options: {
      responsive: false,
      maintainAspectRatio: false,
      animation: false,
      layout: {
        padding: {
          top: 25,
          bottom: 20,
          left: 20,
          right: 25
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            color: warnaGrafik.teks,
            padding: 20,
            usePointStyle: true,
            font: {
              size: 14
            }
          }
        },
        title: {
          display: true,
          text: opsiTambahan.judul || '',
          color: warnaGrafik.teks,
          font: {
            size: 21,
            weight: 'bold'
          },
          padding: {
            top: 10,
            bottom: 25
          }
        },
        tooltip: {
          enabled: false
        }
      },
      scales: tipe === 'pie' ? {} : {
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: warnaGrafik.teks,
            font: {
              size: 13
            }
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: warnaGrafik.grid
          },
          ticks: {
            precision: 0,
            color: warnaGrafik.teks,
            callback: value => opsiTambahan.persentase
              ? `${value}%`
              : value
          },
          title: {
            display: Boolean(opsiTambahan.satuan),
            text: opsiTambahan.satuan || '',
            color: warnaGrafik.teks
          }
        }
      }
    }
  })

  try {
    chart.update('none')
    return canvas.toDataURL('image/png')
  } finally {
    chart.destroy()
  }
}

/* MASUKKAN GAMBAR KE EXCEL */
const tambahGambarKeSheet = (
  workbook,
  worksheet,
  dataUrl,
  posisi,
  ukuran
) => {
  const idGambar = workbook.addImage({
    base64: dataUrl.split(',')[1],
    extension: 'png'
  })

  worksheet.addImage(idGambar, {
    tl: {
      col: posisi.col,
      row: posisi.row
    },
    ext: {
      width: ukuran.width,
      height: ukuran.height
    }
  })
}

/* MENGHITUNG REKAP BULANAN SESUAI KATEGORI TERPILIH */
const buatRekapBulanan = (daftarAnak) => {
  const rekap = new Map()

  daftarAnak.forEach(anak => {
    const pemeriksaanPerBulan = new Map()

    ;(anak.pemeriksaan || []).forEach(pemeriksaan => {
      if (!pemeriksaanValidWHO(pemeriksaan)) return

      const tanggal = new Date(pemeriksaan.tanggal)

      if (Number.isNaN(tanggal.getTime())) return

      const kunciBulan = `${tanggal.getFullYear()}-${String(
        tanggal.getMonth() + 1
      ).padStart(2, '0')}`

      const lama = pemeriksaanPerBulan.get(kunciBulan)

      if (!lama || tanggal > new Date(lama.tanggal)) {
        pemeriksaanPerBulan.set(kunciBulan, pemeriksaan)
      }
    })

    pemeriksaanPerBulan.forEach((pemeriksaan, kunciBulan) => {
      if (!rekap.has(kunciBulan)) {
        const [tahun, bulan] = kunciBulan.split('-').map(Number)

        rekap.set(kunciBulan, {
          kunciBulan,
          tahun,
          bulan: bulan - 1,
          total: 0,
          normal: 0,
          stunted: 0,
          severe: 0,
          totalTB: 0,
          jumlahTB: 0,
          totalBB: 0,
          jumlahBB: 0,
          totalLK: 0,
          jumlahLK: 0
        })
      }

      const item = rekap.get(kunciBulan)

      /* Rata-rata pengukuran dihitung dari pemeriksaan terakhir
         setiap anak dalam bulan tersebut. */
      const tb = Number(pemeriksaan.tb)
      const bb = Number(pemeriksaan.bb)
      const lk = Number(pemeriksaan.lk)

      if (Number.isFinite(tb) && tb > 0) {
        item.totalTB += tb
        item.jumlahTB++
      }

      if (Number.isFinite(bb) && bb > 0) {
        item.totalBB += bb
        item.jumlahBB++
      }

      if (Number.isFinite(lk) && lk > 0) {
        item.totalLK += lk
        item.jumlahLK++
      }

      /* Status memakai hasil WHO untuk pemeriksaan yang sama,
         bukan status terbaru anak dari bulan yang berbeda. */
      const who = hasilWHO.value[
        `${anak.id}-${pemeriksaan.id}`
      ]

      if (!who) return

      if (
        who.status !== 'Normal' &&
        who.status !== 'Stunted' &&
        who.status !== 'Severely Stunted'
      ) {
        return
      }

      item.total++

      if (who.status === 'Normal') item.normal++
      else if (who.status === 'Stunted') item.stunted++
      else if (who.status === 'Severely Stunted') item.severe++
    })
  })

  return [...rekap.values()]
    .sort((a, b) => a.kunciBulan.localeCompare(b.kunciBulan))
    .map(item => ({
      ...item,
      label: new Date(item.tahun, item.bulan, 1)
        .toLocaleDateString('id-ID', {
          month: 'short',
          year: 'numeric'
        }),
      rataTB: item.jumlahTB
        ? Number((item.totalTB / item.jumlahTB).toFixed(2))
        : null,
      rataBB: item.jumlahBB
        ? Number((item.totalBB / item.jumlahBB).toFixed(2))
        : null,
      rataLK: item.jumlahLK
        ? Number((item.totalLK / item.jumlahLK).toFixed(2))
        : null,
      persentase: item.total
        ? Number(
          (((item.stunted + item.severe) / item.total) * 100).toFixed(1)
        )
        : 0
    }))
}

/* EKSPOR LAPORAN */
const eksporLaporanExcel = async () => {
  if (sedangEkspor.value) return

  sedangEkspor.value = true
  pesanEkspor.value = ''

  try {
    const workbook = new ExcelJS.Workbook()

    workbook.creator = 'PosyanduCare'
    workbook.subject = 'Laporan kesehatan anak Posyandu'
    workbook.title = 'Laporan PosyanduCare'
    workbook.created = new Date()

    const tanggalCetak = new Date().toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })

    /* FILTER KATEGORI */
    const daftarAnak = dataAnakAktif.value.filter(anak => {
      const kategori = tentukanKategoriAnak(
        anak.tanggal_lahir || anak.tanggalLahir
      )

      return kategoriRekap.value === 'Semua Data' ||
        kategori === kategoriRekap.value
    })

    /* RIWAYAT PEMERIKSAAN */
    const daftarRiwayat = []

    daftarAnak.forEach(anak => {
      ;(anak.pemeriksaan || []).forEach(pemeriksaan => {
        daftarRiwayat.push({
          anak,
          pemeriksaan
        })
      })
    })

    const hasilUntukAnak = (anak) => {
      const pemeriksaan = ambilPemeriksaanTerbaru(anak)

      if (!pemeriksaan) {
        return {
          pemeriksaan: null,
          who: null
        }
      }

      return {
        pemeriksaan,
        who: hasilWHO.value[
          `${anak.id}-${pemeriksaan.id}`
        ] || null
      }
    }

    const statusDariAnak = daftarAnak.map(anak => ({
      anak,
      ...hasilUntukAnak(anak)
    }))

    const totalNormal = statusDariAnak.filter(
      item => item.who?.status === 'Normal'
    ).length

    const totalStunted = statusDariAnak.filter(
      item => item.who?.status === 'Stunted'
    ).length

    const totalSevere = statusDariAnak.filter(
      item => item.who?.status === 'Severely Stunted'
    ).length

    const totalBelum = daftarAnak.length -
      totalNormal -
      totalStunted -
      totalSevere

    const totalStunting = totalStunted + totalSevere

    const persen = daftarAnak.length
      ? Number(
        ((totalStunting / daftarAnak.length) * 100).toFixed(1)
      )
      : 0

    /* SHEET 1: RINGKASAN LAPORAN */
    const ringkasan = workbook.addWorksheet('Ringkasan Laporan')

    gayaJudul(
      ringkasan,
      'LAPORAN POSYANDUCARE',
      `Posyandu Sedap Malam 2 • Dicetak ${tanggalCetak}`,
      2
    )

    ringkasan.getColumn(1).width = 48
    ringkasan.getColumn(2).width = 65

    ringkasan.addRow([])
    ringkasan.addRow(['Kategori laporan', kategoriRekap.value])
    ringkasan.addRow(['Total anak', daftarAnak.length])
    ringkasan.addRow(['Anak dengan status Normal', totalNormal])
    ringkasan.addRow(['Anak dengan status Stunted', totalStunted])
    ringkasan.addRow(['Anak dengan status Severely Stunted', totalSevere])
    ringkasan.addRow(['Belum memiliki status WHO terbaru', totalBelum])
    ringkasan.addRow([
      'Persentase stunting dari seluruh anak dalam laporan',
      `${persen}%`
    ])
    ringkasan.addRow([
      'Total riwayat pemeriksaan',
      daftarRiwayat.length
    ])

    ringkasan.addRow([])
    ringkasan.addRow(['Informasi Posyandu', 'Keterangan'])

    const headerInfoRow = ringkasan.rowCount
    gayaHeader(ringkasan, headerInfoRow)

    ringkasan.addRow(['Nama Posyandu', 'Posyandu Sedap Malam 2'])
    ringkasan.addRow(['Kelurahan', 'Nginden Jangkungan'])
    ringkasan.addRow(['Kecamatan', 'Sukolilo'])
    ringkasan.addRow(['Kota', 'Surabaya'])
    ringkasan.addRow([])
    ringkasan.addRow([
      'Catatan',
      'Status pertumbuhan merupakan hasil skrining berdasarkan data antropometri, bukan diagnosis medis.'
    ])

    for (let i = 4; i <= 11; i++) {
      const row = ringkasan.getRow(i)
      row.height = 25
      row.getCell(1).font = {
        bold: true,
        color: { argb: 'FF334155' }
      }
      row.getCell(2).font = {
        bold: true,
        color: { argb: 'FF477A68' }
      }
    }

    ringkasan.getRow(ringkasan.rowCount).height = 42
    ringkasan.getCell(`B${ringkasan.rowCount}`).alignment = {
      wrapText: true,
      vertical: 'top'
    }

    /* SHEET 2: DATA ANAK */
    const dataSheet = workbook.addWorksheet('Data Anak')

    dataSheet.addRow([
      'No.',
      'ID Anak',
      'Nama Anak',
      'Jenis Kelamin',
      'Tanggal Lahir',
      'Kategori Umur',
      'Nama Ibu',
      'Alamat/RT/RW',
      'Tanggal Pemeriksaan Terbaru',
      'TB/PB (cm)',
      'BB (kg)',
      'LK (cm)',
      'Status WHO Terbaru',
      'Z-Score'
    ])

    daftarAnak.forEach((anak, index) => {
      const { pemeriksaan, who } = hasilUntukAnak(anak)

      const alamat = anak.alamat ||
        [
          anak.rt ? `RT ${anak.rt}` : '',
          anak.rw ? `RW ${anak.rw}` : ''
        ].filter(Boolean).join(' / ') ||
        '-'

      dataSheet.addRow([
        index + 1,
        anak.id ?? '-',
        anak.nama ?? '-',
        anak.jenis_kelamin || anak.jenisKelamin || '-',
        formatTanggalExcel(anak.tanggal_lahir || anak.tanggalLahir),
        tentukanKategoriAnak(anak.tanggal_lahir || anak.tanggalLahir),
        anak.nama_ibu || anak.namaIbu || anak.nama_orang_tua || '-',
        alamat,
        pemeriksaan ? formatTanggalExcel(pemeriksaan.tanggal) : '-',
        pemeriksaan?.tb ?? '-',
        pemeriksaan?.bb ?? '-',
        pemeriksaan?.lk ?? '-',
        who?.status || 'Belum dihitung',
        who?.zScore ?? '-'
      ])
    })

    aturTabel(
      dataSheet,
      1,
      [8, 12, 26, 16, 18, 18, 24, 26, 22, 14, 12, 12, 24, 14]
    )

    /* SHEET 3: DIAGRAM STATUS */
    const diagram = workbook.addWorksheet('Diagram Status')

    gayaJudul(
      diagram,
      'DIAGRAM STATUS PERTUMBUHAN',
      `Kategori: ${kategoriRekap.value} • ${tanggalCetak}`,
      4
    )

    diagram.getColumn(1).width = 28
    diagram.getColumn(2).width = 18
    diagram.getColumn(3).width = 18
    diagram.getColumn(4).width = 18

    diagram.addRow([])
    diagram.addRow(['Status', 'Jumlah Anak'])

    const headerDiagram = diagram.rowCount
    gayaHeader(diagram, headerDiagram)

    diagram.addRow(['Normal', totalNormal])
    diagram.addRow(['Stunted', totalStunted])
    diagram.addRow(['Severely Stunted', totalSevere])
    diagram.addRow(['Belum dihitung', totalBelum])

    const gambarPie = await buatGambarChart(
      'pie',
      ['Normal', 'Stunted', 'Severely Stunted', 'Belum dihitung'],
      [{
        label: 'Jumlah Anak',
        data: [totalNormal, totalStunted, totalSevere, totalBelum],
        backgroundColor: [
          warnaGrafik.hijau,
          warnaGrafik.emas,
          warnaGrafik.merah,
          warnaGrafik.abu
        ],
        borderColor: '#FFFFFF',
        borderWidth: 3
      }],
      {
        judul: 'Distribusi Status Pertumbuhan WHO'
      }
    )

    tambahGambarKeSheet(
      workbook,
      diagram,
      gambarPie,
      { col: 2, row: 3 },
      { width: 650, height: 360 }
    )

    /* SHEET 4: TREN PERTUMBUHAN */
    const tren = workbook.addWorksheet('Tren Pertumbuhan')

    gayaJudul(
      tren,
      'TREN PERTUMBUHAN DAN STATUS WHO',
      `Kategori: ${kategoriRekap.value} • ${tanggalCetak}`,
      8
    )

    tren.getColumn(1).width = 20
    tren.getColumn(2).width = 17
    tren.getColumn(3).width = 17
    tren.getColumn(4).width = 22
    tren.getColumn(5).width = 20
    tren.getColumn(6).width = 22
    tren.getColumn(7).width = 18
    tren.getColumn(8).width = 18

    const rekapBulanan = buatRekapBulanan(daftarAnak)
    const labelBulan = rekapBulanan.map(item => item.label)

    /* TABEL REKAP BULANAN */
    tren.addRow([])
    tren.addRow([
      'Bulan',
      'Rata-rata TB/PB (cm)',
      'Rata-rata BB (kg)',
      'Rata-rata LK (cm)',
      'Normal',
      'Stunted',
      'Severely Stunted',
      'Total Status Terhitung'
    ])

    const headerTren = tren.rowCount
    gayaHeader(tren, headerTren)

    rekapBulanan.forEach(item => {
      tren.addRow([
        item.label,
        item.rataTB ?? 'Tidak ada data',
        item.rataBB ?? 'Tidak ada data',
        item.rataLK ?? 'Tidak ada data',
        item.normal,
        item.stunted,
        item.severe,
        item.total
      ])
    })

    tren.views = [{ state: 'frozen', ySplit: headerTren }]

    /* GRAFIK 1: RATA-RATA TB/PB */
    const grafikTB = await buatGambarChart(
      'bar',
      labelBulan,
      [{
        label: 'Rata-rata TB/PB',
        data: rekapBulanan.map(item => item.rataTB),
        backgroundColor: warnaGrafik.hijau,
        borderRadius: 6,
        maxBarThickness: 48,
        skipNull: true
      }],
      {
        judul: 'Rata-rata Tinggi/Panjang Badan per Bulan',
        satuan: 'cm'
      }
    )

    /* GRAFIK 2: RATA-RATA BB */
    const grafikBB = await buatGambarChart(
      'bar',
      labelBulan,
      [{
        label: 'Rata-rata BB',
        data: rekapBulanan.map(item => item.rataBB),
        backgroundColor: warnaGrafik.emas,
        borderRadius: 6,
        maxBarThickness: 48,
        skipNull: true
      }],
      {
        judul: 'Rata-rata Berat Badan per Bulan',
        satuan: 'kg'
      }
    )

    /* GRAFIK 3: RATA-RATA LK */
    const grafikLK = await buatGambarChart(
      'bar',
      labelBulan,
      [{
        label: 'Rata-rata LK',
        data: rekapBulanan.map(item => item.rataLK),
        backgroundColor: warnaGrafik.biru,
        borderRadius: 6,
        maxBarThickness: 48,
        skipNull: true
      }],
      {
        judul: 'Rata-rata Lingkar Kepala per Bulan',
        satuan: 'cm'
      }
    )

    /* GRAFIK 4: TREN STATUS WHO
       Menggunakan diagram batang berkelompok. */
    const grafikStatus = await buatGambarChart(
      'bar',
      labelBulan,
      [
        {
          label: 'Normal',
          data: rekapBulanan.map(item => item.normal),
          backgroundColor: warnaGrafik.hijau,
          borderRadius: 5,
          maxBarThickness: 38
        },
        {
          label: 'Stunted',
          data: rekapBulanan.map(item => item.stunted),
          backgroundColor: warnaGrafik.emas,
          borderRadius: 5,
          maxBarThickness: 38
        },
        {
          label: 'Severely Stunted',
          data: rekapBulanan.map(item => item.severe),
          backgroundColor: warnaGrafik.merah,
          borderRadius: 5,
          maxBarThickness: 38
        }
      ],
      {
        judul: 'Tren Jumlah Status Pertumbuhan WHO',
        satuan: 'Jumlah anak'
      }
    )

    /* GRAFIK 5: PERSENTASE STUNTING BULANAN */
    const grafikPersentase = await buatGambarChart(
      'bar',
      labelBulan,
      [{
        label: 'Persentase Stunting',
        data: rekapBulanan.map(item => item.persentase),
        backgroundColor: warnaGrafik.biru,
        borderRadius: 5,
        maxBarThickness: 48
      }],
      {
        judul: 'Persentase Stunted dan Severely Stunted',
        satuan: 'Persentase',
        persentase: true
      }
    )

    /* GRAFIK DITATA TERPISAH DI WORKSHEET */
    const tinggiGrafik = 330
    const lebarGrafik = 600
    const jarakKolom = 7
    const barisGrafikAtas = tren.rowCount + 3

    tambahGambarKeSheet(
      workbook,
      tren,
      grafikTB,
      { col: 0, row: barisGrafikAtas },
      { width: lebarGrafik, height: tinggiGrafik }
    )

    tambahGambarKeSheet(
      workbook,
      tren,
      grafikBB,
      { col: jarakKolom, row: barisGrafikAtas },
      { width: lebarGrafik, height: tinggiGrafik }
    )

    const barisGrafikBawah = barisGrafikAtas + 19

    tambahGambarKeSheet(
      workbook,
      tren,
      grafikLK,
      { col: 0, row: barisGrafikBawah },
      { width: lebarGrafik, height: tinggiGrafik }
    )

    tambahGambarKeSheet(
      workbook,
      tren,
      grafikStatus,
      { col: jarakKolom, row: barisGrafikBawah },
      { width: lebarGrafik, height: tinggiGrafik }
    )

    const barisGrafikTerakhir = barisGrafikBawah + 19

    tambahGambarKeSheet(
      workbook,
      tren,
      grafikPersentase,
      { col: 0, row: barisGrafikTerakhir },
      { width: lebarGrafik, height: tinggiGrafik }
    )

    
/* SHEET 5: RIWAYAT PEMERIKSAAN */
const riwayatSheet = workbook.addWorksheet('Riwayat Pemeriksaan')

riwayatSheet.addRow([
  'No.',
  'ID Anak',
  'Nama Anak',
  'Kategori',
  'Tanggal Pemeriksaan',
  'TB/PB (cm)',
  'BB (kg)',
  'LK (cm)',
  'LILA (cm)',
  'Imunisasi',
  'Vitamin A',
  'Obat Cacing',
  'Status WHO',
  'Z-Score'
])

// Urutkan riwayat berdasarkan tanggal pemeriksaan.
// Data tanpa tanggal atau data yang tidak lengkap tetap ditangani.
daftarRiwayat.sort((a, b) => {
  const tanggalA = new Date(
    a?.pemeriksaan?.tanggal ||
    a?.pemeriksaan?.tanggal_pemeriksaan ||
    0
  ).getTime()

  const tanggalB = new Date(
    b?.pemeriksaan?.tanggal ||
    b?.pemeriksaan?.tanggal_pemeriksaan ||
    0
  ).getTime()

  const waktuA = Number.isFinite(tanggalA) ? tanggalA : 0
  const waktuB = Number.isFinite(tanggalB) ? tanggalB : 0

  return waktuA - waktuB
})

daftarRiwayat.forEach(({ anak, pemeriksaan }, index) => {
  // Lewati data yang tidak memiliki objek anak atau pemeriksaan.
  if (!anak || !pemeriksaan) return

  const who = hasilWHO.value[
    `${anak.id}-${pemeriksaan.id}`
  ]

  riwayatSheet.addRow([
    index + 1,
    anak.id ?? '-',
    anak.nama ?? '-',
    tentukanKategoriAnak(
      anak.tanggal_lahir || anak.tanggalLahir
    ),
    formatTanggalExcel(
      pemeriksaan.tanggal || pemeriksaan.tanggal_pemeriksaan
    ),
    pemeriksaan.tb ?? '-',
    pemeriksaan.bb ?? '-',
    pemeriksaan.lk ?? '-',
    pemeriksaan.lila ?? '-',
    pemeriksaan.imunisasi || '-',
    pemeriksaan.vitamin_a || '-',
    pemeriksaan.obat_cacing || '-',
    who?.status || 'Belum dihitung',
    who?.zScore ?? '-'
  ])
})


    aturTabel(
      riwayatSheet,
      1,
      [8, 12, 26, 18, 22, 14, 12, 12, 12, 20, 16, 18, 24, 14]
    )

    /* UNDUH FILE */
    const kategoriNama = kategoriRekap.value
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')

    const tanggalNama = new Date().toISOString().slice(0, 10)

    const buffer = await workbook.xlsx.writeBuffer()

    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = `Laporan-PosyanduCare-${kategoriNama}-${tanggalNama}.xlsx`

    document.body.appendChild(link)
    link.click()
    link.remove()

    setTimeout(() => URL.revokeObjectURL(url), 1000)

    modalRekap.value = false
  } catch (error) {
    console.error('Gagal mengekspor laporan Excel:', error)

    pesanEkspor.value =
      'Laporan gagal dibuat. Periksa konsol browser dan pastikan ExcelJS sudah terpasang.'
  } finally {
    sedangEkspor.value = false
  }
}

/* LOAD */
onMounted(async () => {
  await ambilDataBalita()
  await hitungSemuaStatusWHO()
  await nextTick()

  buatChartStatus()
  buatChartPersentase()
})

onBeforeUnmount(() => {
  if (statusChart) {
    statusChart.destroy()
    statusChart = null
  }

  if (percentageChart) {
    percentageChart.destroy()
    percentageChart = null
  }
})

/* LOGOUT */
const logout = () => {
  localStorage.removeItem('userLogin')
  router.push('/login')
}
</script>

<style scoped>
/* STYLE DASHBOARD ASLI */
.dashboard-content > .dashboard-panel,
.dashboard-content > .dashboard-grid,
.dashboard-content > .dashboard-note,
.dashboard-content > .welcome-box,
.dashboard-content > .stats-grid {
  margin-bottom: 30px;
}

.dashboard-content > .dashboard-panel:last-child,
.dashboard-content > .dashboard-note:last-child {
  margin-bottom: 0;
}

.pagination-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 18px;
  padding-top: 15px;
  border-top: 1px solid #f1f5f9;
  color: #64748b;
  font-size: 12px;
}

.pagination-button {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #ffffff;
  color: #334155;
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
}

.pagination-button:hover:not(:disabled) {
  background: #f1f5f9;
}

.pagination-button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.recent-number,
.monitoring-number {
  width: 28px;
  min-width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #f1f5f9;
  color: #475569;
  font-size: 12px;
  font-weight: 700;
}

.monitoring-information {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

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
  flex-shrink: 0;
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
  font-size: 14px;
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
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.10);
  z-index: 2000;
}

.profile-dropdown-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px;
}

.profile-avatar.large {
  width: 42px;
  height: 42px;
  font-size: 20px;
}

.profile-dropdown-header div:last-child {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.profile-dropdown-header strong {
  font-size: 14px;
}

.profile-dropdown-header small {
  font-size: 11px;
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
  padding: 10px 9px;
  border: none;
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  text-align: left;
  font-size: 13px;
}

.logout-button:hover {
  background: #fef2f2;
}

.dashboard-grid {
  margin-bottom: 30px;
  gap: 30px;
}

.dashboard-panel {
  margin-bottom: 30px;
}

.dashboard-chart-wrapper {
  position: relative;
  width: 100%;
  height: 320px;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: #ffffff;
}

.category-panel {
  margin-bottom: 30px;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.category-card {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 18px;
  border-radius: 13px;
  background: #f8fafc;
  border: 1px solid #e5e7eb;
}

.category-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: #eef2ff;
  font-size: 23px;
}

.category-card > div:last-child {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.category-card span {
  font-size: 13px;
  color: #64748b;
}

.category-card strong {
  font-size: 24px;
}

.category-card small {
  font-size: 11px;
  color: #94a3b8;
}

.status-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}

.status-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 17px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
}

.status-card > div {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.status-card span:not(.status-icon) {
  font-size: 12px;
  color: #64748b;
}

.status-card strong {
  font-size: 23px;
}

.status-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-weight: bold;
}

.status-card.normal .status-icon {
  background: #dcfce7;
  color: #16a34a;
}

.status-card.stunted .status-icon {
  background: #fef3c7;
  color: #d97706;
}

.status-card.severe .status-icon {
  background: #fee2e2;
  color: #dc2626;
}

.status-card.belum .status-icon {
  background: #f1f5f9;
  color: #64748b;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
}

.status-normal {
  background: #dcfce7;
  color: #15803d;
}

.status-stunted {
  background: #fef3c7;
  color: #b45309;
}

.status-severe {
  background: #fee2e2;
  color: #b91c1c;
}

.status-belum {
  background: #f1f5f9;
  color: #64748b;
}

.recent-examination-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.recent-examination-item {
  display: flex;
  align-items: center;
  gap: 14px;
  min-height: 68px;
  padding: 14px 4px;
  border-bottom: 1px solid #f1f5f9;
}

.recent-examination-item:last-child {
  border-bottom: none;
}

.recent-avatar {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #eef2ff;
  font-size: 19px;
}

.recent-information {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.recent-information strong {
  font-size: 14px;
}

.recent-information span {
  font-size: 11px;
  color: #64748b;
}

.recent-information small {
  font-size: 11px;
  color: #94a3b8;
}

.monitoring-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.monitoring-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  min-height: 62px;
  padding: 14px 4px;
  border-bottom: 1px solid #f1f5f9;
}

.monitoring-item:last-child {
  border-bottom: none;
}

.monitoring-item > div:first-child {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.monitoring-item strong {
  font-size: 14px;
}

.monitoring-item span {
  font-size: 11px;
  color: #64748b;
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.service-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px;
  border-radius: 12px;
  background: #f8fafc;
  border: 1px solid #e5e7eb;
}

.service-icon {
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #eef2ff;
  font-size: 21px;
}

.service-card > div {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.service-card span {
  font-size: 12px;
  color: #64748b;
}

.service-card strong {
  font-size: 22px;
}

.service-card small {
  font-size: 10px;
  color: #94a3b8;
}

.empty-data {
  padding: 35px 20px;
  text-align: center;
  color: #94a3b8;
  font-size: 13px;
}

.success-empty {
  color: #16a34a;
  background: #f0fdf4;
  border-radius: 10px;
}

.dashboard-note {
  margin-top: 25px;
  padding: 14px 16px;
  border-radius: 10px;
  background: #eff6ff;
  color: #475569;
  font-size: 12px;
  line-height: 1.6;
}

.dashboard-note strong {
  color: #1e40af;
}

@media (max-width: 1100px) {
  .status-grid { grid-template-columns: repeat(2, 1fr); }
  .category-grid { grid-template-columns: 1fr; }
  .service-grid { grid-template-columns: 1fr; }
}

@media (max-width: 800px) {
  .sidebar { width: 210px; }
  .main-content { margin-left: 210px; }
  .dashboard-grid { grid-template-columns: 1fr; }
  .stats-grid { grid-template-columns: 1fr; }
}

@media (max-width: 600px) {
  .sidebar { display: none; }
  .main-content { margin-left: 0; }
  .dashboard-content { padding: 20px; }
  .status-grid { grid-template-columns: 1fr; }
}

/* TAMBAHAN FITUR EKSPOR — tidak mengubah style dashboard di atas */
.welcome-export-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 30px;
}

.welcome-export-row .welcome-box {
  flex: 1;
  margin-bottom: 0;
}

.btn-export-excel {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 18px;
  border: none;
  border-radius: 10px;
  background: #276749;
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(39, 103, 73, 0.15);
  transition: background 0.2s, transform 0.2s;
}

.btn-export-excel:hover {
  background: #1f5f40;
  transform: translateY(-1px);
}

.export-overlay {
  position: fixed;
  inset: 0;
  z-index: 5000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(15, 23, 42, 0.55);
}

.export-modal {
  position: relative;
  width: 100%;
  max-width: 470px;
  padding: 28px;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.export-modal h2 {
  margin: 0 30px 8px 0;
  color: #1e293b;
  font-size: 21px;
}

.export-modal > p {
  margin: 0 0 20px;
  color: #64748b;
  font-size: 13px;
  line-height: 1.6;
}

.export-modal label {
  display: block;
  margin-bottom: 8px;
  color: #334155;
  font-size: 13px;
  font-weight: 700;
}

.export-modal select {
  width: 100%;
  padding: 12px;
  border: 1px solid #cbd5e1;
  border-radius: 9px;
  background: #ffffff;
  color: #334155;
  font-size: 14px;
}

.export-info {
  margin-top: 18px;
  padding: 14px 16px;
  border-radius: 10px;
  background: #f0fdf4;
  color: #334155;
  font-size: 12px;
  line-height: 1.7;
}

.export-info ul {
  margin: 6px 0 0;
  padding-left: 20px;
}

.export-modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 22px;
}

.btn-export-cancel,
.btn-export-confirm {
  padding: 11px 17px;
  border-radius: 9px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}

.btn-export-cancel {
  border: 1px solid #e2e8f0;
  background: #ffffff;
  color: #475569;
}

.btn-export-confirm {
  border: 1px solid #276749;
  background: #276749;
  color: #ffffff;
}

.btn-export-confirm:hover:not(:disabled) {
  background: #1f5f40;
}

.btn-export-cancel:disabled,
.btn-export-confirm:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.export-close {
  position: absolute;
  top: 16px;
  right: 18px;
  border: none;
  background: transparent;
  color: #64748b;
  font-size: 25px;
  cursor: pointer;
}

.export-error {
  margin-top: 12px !important;
  padding: 10px;
  border-radius: 8px;
  background: #fef2f2;
  color: #b91c1c !important;
}

@media (max-width: 600px) {
  .welcome-export-row {
    align-items: stretch;
    flex-direction: column;
  }

  .btn-export-excel {
    width: 100%;
  }

  .export-modal {
    padding: 22px;
  }
}
</style>

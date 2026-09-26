<template>

  <div class="app-layout">

    <!-- SIDEBAR -->

    <aside class="sidebar">

      <div class="sidebar-logo">
        🏥
        <span>PosyanduCare</span>
      </div>

      <div class="posyandu-name">
        Posyandu Melati
      </div>

      <nav>

        <router-link to="/dashboard">
          🏠 Dashboard
        </router-link>

        <router-link to="/balita">
          👶 Data Balita
        </router-link>

        <router-link to="/ibu-hamil">
          🤰 Ibu Hamil
        </router-link>

      </nav>

    </aside>


    <!-- MAIN CONTENT -->

    <main class="main-content">

      <header class="topbar">

        <div>

          <h2>
            Detail Balita
          </h2>

          <p>
            Informasi dan pemantauan perkembangan balita
          </p>

        </div>

      </header>


      <section class="dashboard-content">


        <!-- KEMBALI -->

        <router-link
          to="/balita"
          class="back-link"
        >
          ← Kembali ke Data Balita
        </router-link>


        <!-- PROFILE -->

        <div class="profile-header">

          <div class="profile-avatar">
            👶
          </div>


          <div class="profile-main">

            <div class="detail-profile-name">

              <h1>
                {{ anak.nama }}
              </h1>

              <span class="status-normal">
                Data Terdaftar
              </span>

            </div>


            <p>

              {{
                anak.jenisKelamin === 'L'
                  ? 'Laki-laki'
                  : 'Perempuan'
              }}

              •

              {{ hitungUmur(anak.tanggalLahir) }}

            </p>

          </div>


          <button
            class="primary-button"
            @click="bukaFormTambah"
          >
            + Tambah Pemeriksaan
          </button>

        </div>


        <!-- INFORMASI -->

        <div class="detail-top-grid">


          <div class="dashboard-panel">

            <div class="panel-header">

              <h3>
                Informasi Balita
              </h3>

            </div>


            <div class="info-row">

              <span>
                Nama
              </span>

              <strong>
                {{ anak.nama }}
              </strong>

            </div>


            <div class="info-row">

              <span>
                Tanggal Lahir
              </span>

              <strong>
                {{ formatTanggal(anak.tanggalLahir) }}
              </strong>

            </div>


            <div class="info-row">

              <span>
                Jenis Kelamin
              </span>

              <strong>

                {{
                  anak.jenisKelamin === 'L'
                    ? 'Laki-laki'
                    : 'Perempuan'
                }}

              </strong>

            </div>


            <div class="info-row">

              <span>
                Nama Ibu
              </span>

              <strong>
                {{ anak.namaIbu }}
              </strong>

            </div>


            <div class="info-row">

              <span>
                Alamat
              </span>

              <strong>
                {{ anak.alamat }}
              </strong>

            </div>

          </div>


          <!-- KUNJUNGAN -->

          <div class="dashboard-panel last-visit-card">

            <div class="visit-icon">
              📅
            </div>

            <p>
              Kunjungan Terakhir
            </p>

            <h2>
              {{ kunjunganTerakhir }}
            </h2>

            <span>
              {{ pemeriksaanTerbaru.length }}
              kali pemeriksaan tercatat
            </span>

          </div>

        </div>


        <!-- =========================
             STATUS PERTUMBUHAN WHO
        ========================== -->

        <div class="dashboard-panel who-status-panel">

          <div class="panel-header">

            <div>

              <h3>
                Status Pertumbuhan
              </h3>

              <p class="panel-description">
                Berdasarkan indikator TB/PB menurut umur
              </p>

            </div>

            <span
              v-if="hasilWHO?.berhasil"
              :class="[
                'who-status-badge',
                hasilWHO.status === 'Normal'
                  ? 'who-normal'
                  : 'who-stunted'
              ]"
            >

              {{
                hasilWHO.status === 'Normal'
                  ? 'Normal'
                  : hasilWHO.status
              }}

            </span>

          </div>


          <!-- LOADING -->

          <div
            v-if="sedangMenghitung"
            class="who-loading"
          >

            <span class="loading-spinner"></span>

            Menghitung berdasarkan standar WHO...

          </div>


          <!-- HASIL -->

          <div
            v-else-if="hasilWHO?.berhasil"
            class="who-result"
          >


            <div class="who-result-main">

              <div class="who-status-icon">

                {{
                  hasilWHO.status === 'Normal'
                    ? '✓'
                    : '!'
                }}

              </div>


              <div>

                <h2>

                  {{
                    hasilWHO.status === 'Normal'
                      ? 'Tidak Stunting'
                      : 'Terindikasi Stunting'
                  }}

                </h2>

                <p>
                  {{ hasilWHO.keterangan }}
                </p>

              </div>

            </div>


            <div class="who-metrics">


              <div class="who-metric">

                <span>
                  TB/PB
                </span>

                <strong>
                  {{ pemeriksaanTerbaru[0]?.tb }} cm
                </strong>

              </div>


              <!-- UMUR -->

              <div class="who-metric">

                <span>
                  Umur
                </span>

                <strong>
                  {{ formatUmurWHO() }}
                </strong>

              </div>


              <div class="who-metric">

                <span>
                  Z-score
                </span>

                <strong>

                  {{
                    hasilWHO.zScore
                  }}

                  SD

                </strong>

              </div>


              <div class="who-metric">

                <span>
                  Indikator
                </span>

                <strong>
                  TB/PB menurut umur
                </strong>

              </div>

            </div>


            <div class="who-info">

              <span>
                ℹ️
              </span>

              <p>

                Hasil ini merupakan perhitungan
                antropometri berdasarkan standar
                pertumbuhan WHO dan bukan diagnosis
                medis.

              </p>

            </div>

          </div>


          <!-- ERROR -->

          <div
            v-else
            class="who-empty"
          >

            Belum ada hasil perhitungan.

          </div>

        </div>


        <!-- TABS -->

        <div class="detail-tabs">

          <button
            :class="[
              'tab-button',
              {
                active: activeTab === 'histori'
              }
            ]"
            @click="activeTab = 'histori'"
          >
            📋 Histori Pemeriksaan
          </button>


          <button
            :class="[
              'tab-button',
              {
                active: activeTab === 'grafik'
              }
            ]"
            @click="activeTab = 'grafik'"
          >
            📈 Grafik Pertumbuhan
          </button>

        </div>


        <!-- =========================
             HISTORI
        ========================== -->

        <div
          v-if="activeTab === 'histori'"
          class="dashboard-panel"
        >

          <div class="panel-header">

            <div>

              <h3>
                Histori Pemeriksaan
              </h3>

              <p class="panel-description">
                Riwayat hasil pengukuran balita
              </p>

            </div>


            <button
              class="primary-button"
              @click="bukaFormTambah"
            >
              + Tambah Pemeriksaan
            </button>

          </div>


          <!-- JARAK TABEL -->

          <div class="history-table-spacing">

            <div class="table-container">

              <table>

                <thead>

                  <tr>

                    <th>No</th>

                    <th>Tanggal</th>

                    <th>TB/PB</th>

                    <th>BB</th>

                    <th>LK</th>

                    <th>LILA</th>

                    <th>Status</th>

                    <th>Imunisasi</th>

                    <th>Vitamin A</th>

                    <th>Obat Cacing</th>

                    <th>Aksi</th>

                  </tr>

                </thead>


                <tbody>

                  <tr
                    v-for="(
                      item,
                      index
                    ) in pemeriksaanTerbaru"
                    :key="item.id"
                  >

                    <td>
                      {{ index + 1 }}
                    </td>


                    <td>
                      {{ formatTanggal(item.tanggal) }}
                    </td>


                    <td>
                      {{ item.tb }} cm
                    </td>


                    <td>
                      {{ item.bb }} kg
                    </td>


                    <td>
                      {{ item.lk }} cm
                    </td>


                    <td>
                      {{ item.lila ?? '-' }} cm
                    </td>


                    <td>

                      <span
                        :class="
                          item.status === 'Stunted' ||
                          item.status === 'Severely Stunted'
                            ? 'status-pending'
                            : 'status-normal'
                        "
                      >
                        {{ item.status || 'Belum dihitung' }}
                      </span>

                    </td>


                    <!-- IMUNISASI -->

                    <td>

                      <span
                        v-if="item.imunisasi === true"
                        class="status-normal"
                        title="Imunisasi diberikan"
                      >
                        ✓
                      </span>

                      <span
                        v-else
                        title="Imunisasi tidak diberikan"
                      >
                        —
                      </span>

                    </td>


                    <!-- VITAMIN A -->

                    <td>

                      <span
                        v-if="item.vitaminA === true"
                        class="status-normal"
                        title="Vitamin A diberikan"
                      >
                        ✓
                      </span>

                      <span
                        v-else
                        title="Vitamin A tidak diberikan"
                      >
                        —
                      </span>

                    </td>


                    <!-- OBAT CACING -->

                    <td>

                      <span
                        v-if="item.obatCacing === true"
                        class="status-normal"
                        title="Obat cacing diberikan"
                      >
                        ✓
                      </span>

                      <span
                        v-else
                        title="Obat cacing tidak diberikan"
                      >
                        —
                      </span>

                    </td>


                    <td class="action-cell">

                      <button
                        class="icon-button"
                        @click="bukaFormEdit(item)"
                        title="Edit pemeriksaan"
                      >
                        ✏️
                      </button>


                      <button
                        class="icon-button delete"
                        @click="hapusPemeriksaan(item)"
                        title="Hapus pemeriksaan"
                      >
                        🗑️
                      </button>

                    </td>

                  </tr>


                  <tr
                    v-if="
                      pemeriksaanTerbaru.length === 0
                    "
                  >

                    <td
                      colspan="11"
                      class="empty-data"
                    >

                      <div>
                        📋
                      </div>

                      <strong>
                        Belum ada pemeriksaan
                      </strong>

                      <p>
                        Klik "Tambah Pemeriksaan"
                        untuk memasukkan data.
                      </p>

                    </td>

                  </tr>

                </tbody>

              </table>

            </div>

          </div>

        </div>


        <!-- =========================
             GRAFIK
        ========================== -->

        <div
          v-if="activeTab === 'grafik'"
          class="growth-chart-container"
        >

          <!-- GRAFIK TB/PB -->

          <div class="growth-chart-section">

            <h3>
              Grafik Tinggi/Panjang Badan Anak
            </h3>

            <GrowthChart
              :pemeriksaan="anak.pemeriksaan"
              jenis-data="tb"
            />

          </div>


          <!-- KURVA WHO -->

          <div class="growth-chart-section">

            <h3>
              Kurva Pertumbuhan Standar WHO
            </h3>

            <p class="growth-chart-description">
              TB/PB menurut umur berdasarkan standar pertumbuhan WHO
            </p>

           <WHOGrowthChart
  :pemeriksaan="anak.pemeriksaan"
  :tanggal-lahir="anak.tanggalLahir"
  :jenis-kelamin="anak.jenisKelamin"
/>

          </div>


          <!-- GRAFIK BB -->

          <div class="growth-chart-section">

            <h3>
              Grafik Berat Badan Anak
            </h3>

            <GrowthChart
              :pemeriksaan="anak.pemeriksaan"
              jenis-data="bb"
            />

          </div>


          <!-- GRAFIK LK -->

          <div class="growth-chart-section">

            <h3>
              Grafik Lingkar Kepala Anak
            </h3>

            <GrowthChart
              :pemeriksaan="anak.pemeriksaan"
              jenis-data="lk"
            />

          </div>


          <!-- GRAFIK LILA -->

          <div class="growth-chart-section">

            <h3>
              Grafik Lingkar Lengan Atas Anak
            </h3>

            <GrowthChart
              :pemeriksaan="anak.pemeriksaan"
              jenis-data="lila"
            />

          </div>

        </div>


      </section>

    </main>


    <!-- =========================
         MODAL FORM
    ========================== -->

    <div
      v-if="showModal"
      class="modal-overlay"
      @click.self="tutupModal"
    >

      <div class="modal-card">


        <!-- MODAL HEADER -->

        <div class="modal-header">

          <div>

            <h2>
              {{
                mode === 'tambah'
                  ? 'Tambah Pemeriksaan'
                  : 'Edit Pemeriksaan'
              }}
            </h2>

            <p>
              {{ anak.nama }}
            </p>

          </div>


          <button
            class="modal-close"
            @click="tutupModal"
          >
            ×
          </button>

        </div>


        <!-- FORM -->

        <form
          @submit.prevent="simpanPemeriksaan"
          class="form-body"
        >


          <!-- TANGGAL -->

          <div class="form-group">

            <label>
              Tanggal Pemeriksaan
              <span>*</span>
            </label>

            <input
              v-model="form.tanggal"
              type="date"
              required
            />

          </div>


          <!-- TB -->

          <div class="form-group">

            <label>
              Tinggi / Panjang Badan (cm)
              <span>*</span>
            </label>

            <input
              v-model.number="form.tb"
              type="number"
              step="0.1"
              min="30"
              max="150"
              placeholder="Contoh: 86.5"
              required
            />

          </div>


          <!-- BB -->

          <div class="form-group">

            <label>
              Berat Badan (kg)
              <span>*</span>
            </label>

            <input
              v-model.number="form.bb"
              type="number"
              step="0.1"
              min="1"
              max="50"
              placeholder="Contoh: 11.2"
              required
            />

          </div>


          <!-- LK -->

          <div class="form-group">

            <label>
              Lingkar Kepala (cm)
              <span>*</span>
            </label>

            <input
              v-model.number="form.lk"
              type="number"
              step="0.1"
              min="25"
              max="70"
              placeholder="Contoh: 47.0"
              required
            />

          </div>


          <!-- LILA -->

          <div class="form-group">

            <label>
              Lingkar Lengan Atas (LILA) (cm)
              <span>*</span>
            </label>

            <input
              v-model.number="form.lila"
              type="number"
              step="0.1"
              min="5"
              max="30"
              placeholder="Contoh: 14.2"
              required
            />

          </div>


          <!-- =========================
               IMUNISASI
          ========================== -->

          <div class="form-group">

            <label>
              Apakah imunisasi diberikan?
              <span>*</span>
            </label>


            <div class="yes-no-choice">

              <button
                type="button"
                :class="[
                  'choice-button',
                  {
                    selected: form.imunisasi === true,
                    'choice-yes': form.imunisasi === true
                  }
                ]"
                @click="form.imunisasi = true"
              >

                <span>
                  ✓
                </span>

                Ya

              </button>


              <button
                type="button"
                :class="[
                  'choice-button',
                  {
                    selected: form.imunisasi === false,
                    'choice-no': form.imunisasi === false
                  }
                ]"
                @click="form.imunisasi = false"
              >

                <span>
                  ×
                </span>

                Tidak

              </button>

            </div>

          </div>


          <!-- =========================
               VITAMIN A
          ========================== -->

          <div class="form-group">

            <label>
              Apakah Vitamin A diberikan?
              <span>*</span>
            </label>


            <div class="yes-no-choice">

              <button
                type="button"
                :class="[
                  'choice-button',
                  {
                    selected: form.vitaminA === true,
                    'choice-yes': form.vitaminA === true
                  }
                ]"
                @click="form.vitaminA = true"
              >

                <span>
                  ✓
                </span>

                Ya

              </button>


              <button
                type="button"
                :class="[
                  'choice-button',
                  {
                    selected: form.vitaminA === false,
                    'choice-no': form.vitaminA === false
                  }
                ]"
                @click="form.vitaminA = false"
              >

                <span>
                  ×
                </span>

                Tidak

              </button>

            </div>

          </div>


          <!-- =========================
               OBAT CACING
          ========================== -->

          <div class="form-group">

            <label>
              Apakah obat cacing diberikan?
              <span>*</span>
            </label>


            <div class="yes-no-choice">

              <button
                type="button"
                :class="[
                  'choice-button',
                  {
                    selected: form.obatCacing === true,
                    'choice-yes': form.obatCacing === true
                  }
                ]"
                @click="form.obatCacing = true"
              >

                <span>
                  ✓
                </span>

                Ya

              </button>


              <button
                type="button"
                :class="[
                  'choice-button',
                  {
                    selected: form.obatCacing === false,
                    'choice-no': form.obatCacing === false
                  }
                ]"
                @click="form.obatCacing = false"
              >

                <span>
                  ×
                </span>

                Tidak

              </button>

            </div>

          </div>


          <!-- INFO -->

          <div class="form-info">

            <span>
              ℹ️
            </span>

            <p>
              Data pengukuran dan pemberian layanan akan
              tersimpan sebagai histori pemeriksaan balita.
            </p>

          </div>


          <!-- BUTTON -->

          <div class="form-actions">

            <button
              type="button"
              class="secondary-button"
              @click="tutupModal"
            >
              Batal
            </button>


            <button
              type="submit"
              class="primary-button"
            >
              {{
                mode === 'tambah'
                  ? 'Simpan Pemeriksaan'
                  : 'Simpan Perubahan'
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
  ref,
  reactive,
  computed,
  onMounted
} from 'vue'

import {
  useRoute
} from 'vue-router'

import GrowthChart
  from '../components/GrowthChart.vue'

import WHOGrowthChart
  from '../components/WHOGrowthChart.vue'

import {
  hitungStatusWHO
} from '../utils/whoGrowth'


/*
|--------------------------------------------------------------------------
| ROUTER
|--------------------------------------------------------------------------
*/

const route = useRoute()

const id = Number(route.params.id)

const API_URL = 'http://localhost:3000/api'


/*
|--------------------------------------------------------------------------
| DATA BALITA
|--------------------------------------------------------------------------
*/

const anak = reactive({

  id: id,

  nama: '',

  jenisKelamin: '',

  tanggalLahir: '',

  namaIbu: '',

  alamat: '',

  pemeriksaan: []

})


const loadingData = ref(true)


/*
|--------------------------------------------------------------------------
| TAB
|--------------------------------------------------------------------------
*/

const activeTab = ref('histori')


/*
|--------------------------------------------------------------------------
| HASIL WHO
|--------------------------------------------------------------------------
*/

const hasilWHO = ref(null)

const sedangMenghitung = ref(false)


/*
|--------------------------------------------------------------------------
| MODAL
|--------------------------------------------------------------------------
*/

const showModal = ref(false)

const mode = ref('tambah')


/*
|--------------------------------------------------------------------------
| FORM
|--------------------------------------------------------------------------
*/

const form = ref({

  id: null,

  tanggal: '',

  tb: '',

  bb: '',

  lk: '',

  lila: '',

  imunisasi: false,

  vitaminA: false,

  obatCacing: false

})


/*
|--------------------------------------------------------------------------
| NORMALISASI TANGGAL
|--------------------------------------------------------------------------
|
| MySQL DATE dari backend dapat dikirim browser sebagai:
| 2026-09-15
| atau
| 2026-09-14T17:00:00.000Z
|
| Fungsi ini memastikan tanggal tetap menjadi tanggal lokal Indonesia.
|--------------------------------------------------------------------------
*/

const normalisasiTanggal = (tanggal) => {

  if (!tanggal) {
    return ''
  }

  if (
    typeof tanggal === 'string' &&
    /^\d{4}-\d{2}-\d{2}$/.test(tanggal)
  ) {

    return tanggal

  }

  const date = new Date(tanggal)

  if (isNaN(date.getTime())) {
    return ''
  }

  const tahun =
    date.getFullYear()

  const bulan =
    String(date.getMonth() + 1)
      .padStart(2, '0')

  const hari =
    String(date.getDate())
      .padStart(2, '0')

  return `${tahun}-${bulan}-${hari}`

}


/*
|--------------------------------------------------------------------------
| LOAD DATA BALITA
|--------------------------------------------------------------------------
*/

const loadBalita = async () => {

  try {

    loadingData.value = true


    /*
    |--------------------------------------------------------------------------
    | AMBIL DATA BALITA
    |--------------------------------------------------------------------------
    */

    const responseBalita =
      await fetch(
        `${API_URL}/balita/${id}`
      )


    if (!responseBalita.ok) {

      throw new Error(
        'Data balita tidak ditemukan.'
      )

    }


    const hasilBalita =
      await responseBalita.json()


    if (
      !hasilBalita.berhasil ||
      !hasilBalita.data
    ) {

      throw new Error(
        'Data balita tidak ditemukan.'
      )

    }


    const data = hasilBalita.data


    /*
    |--------------------------------------------------------------------------
    | MASUKKAN DATA KE OBJEK ANAK
    |--------------------------------------------------------------------------
    */

    anak.id =
      data.id

    anak.nama =
      data.nama || ''

    anak.jenisKelamin =
      data.jenis_kelamin || ''

    anak.tanggalLahir =
      normalisasiTanggal(
        data.tanggal_lahir
      )

    anak.namaIbu =
      data.nama_ibu || ''

    anak.alamat =
      data.alamat || ''

    anak.pemeriksaan =
      []


    /*
    |--------------------------------------------------------------------------
    | AMBIL DATA PEMERIKSAAN
    |--------------------------------------------------------------------------
    */

    await loadPemeriksaan()


  }
  catch (error) {

    console.error(
      'Gagal mengambil data balita:',
      error
    )

    alert(
      'Data balita gagal dimuat dari server.'
    )

  }
  finally {

    loadingData.value = false

  }

}


/*
|--------------------------------------------------------------------------
| LOAD PEMERIKSAAN
|--------------------------------------------------------------------------
*/

const loadPemeriksaan = async () => {

  try {

    const response =
      await fetch(
        `${API_URL}/balita/${id}/pemeriksaan`
      )


    if (!response.ok) {

      throw new Error(
        'Data pemeriksaan gagal diambil.'
      )

    }


    const hasil =
      await response.json()


    if (
      !hasil.berhasil ||
      !Array.isArray(hasil.data)
    ) {

      anak.pemeriksaan = []

      return

    }


    anak.pemeriksaan =
      hasil.data.map(
        item => ({

          id:
            item.id,

          tanggal:
            normalisasiTanggal(
              item.tanggal_pemeriksaan
            ),

          tb:
            item.tb !== null &&
            item.tb !== undefined
              ? Number(item.tb)
              : null,

          bb:
            item.bb !== null &&
            item.bb !== undefined
              ? Number(item.bb)
              : null,

          lk:
            item.lk !== null &&
            item.lk !== undefined
              ? Number(item.lk)
              : null,

          lila:
            item.lila !== null &&
            item.lila !== undefined
              ? Number(item.lila)
              : null,

          imunisasi:
            item.imunisasi === true ||
            item.imunisasi === 1,

          vitaminA:
            item.vitamin_a === true ||
            item.vitamin_a === 1,

          obatCacing:
            item.obat_cacing === true ||
            item.obat_cacing === 1,

          status:
            null,

          zScore:
            null,

          percentile:
            null

        })
      )


    /*
    |--------------------------------------------------------------------------
    | HITUNG WHO UNTUK SEMUA HISTORI
    |--------------------------------------------------------------------------
    */

    await hitungSemuaHistoriWHO()


  }
  catch (error) {

    console.error(
      'Gagal mengambil pemeriksaan:',
      error
    )

    anak.pemeriksaan = []

  }

}


/*
|--------------------------------------------------------------------------
| TAB — HISTORI TERBARU
|--------------------------------------------------------------------------
*/

const pemeriksaanTerbaru =
  computed(() => {

    if (
      !anak.pemeriksaan ||
      anak.pemeriksaan.length === 0
    ) {

      return []

    }


    return [
      ...anak.pemeriksaan
    ].sort(
      (a, b) =>
        new Date(b.tanggal) -
        new Date(a.tanggal)
    )

  })


/*
|--------------------------------------------------------------------------
| KUNJUNGAN TERAKHIR
|--------------------------------------------------------------------------
*/

const kunjunganTerakhir =
  computed(() => {

    if (
      pemeriksaanTerbaru.value.length === 0
    ) {

      return '-'

    }


    return formatTanggal(
      pemeriksaanTerbaru.value[0].tanggal
    )

  })


/*
|--------------------------------------------------------------------------
| RESET FORM
|--------------------------------------------------------------------------
*/

const resetForm = () => {

  form.value = {

    id: null,

    tanggal:
      new Date()
        .toISOString()
        .split('T')[0],

    tb: '',

    bb: '',

    lk: '',

    lila: '',

    imunisasi: false,

    vitaminA: false,

    obatCacing: false

  }

}


/*
|--------------------------------------------------------------------------
| BUKA FORM TAMBAH
|--------------------------------------------------------------------------
*/

const bukaFormTambah = () => {

  mode.value = 'tambah'

  resetForm()

  showModal.value = true

}


/*
|--------------------------------------------------------------------------
| BUKA FORM EDIT
|--------------------------------------------------------------------------
*/

const bukaFormEdit = (item) => {

  mode.value = 'edit'


  form.value = {

    id:
      item.id,

    tanggal:
      item.tanggal,

    tb:
      item.tb ?? '',

    bb:
      item.bb ?? '',

    lk:
      item.lk ?? '',

    lila:
      item.lila ?? '',

    imunisasi:
      item.imunisasi === true,

    vitaminA:
      item.vitaminA === true,

    obatCacing:
      item.obatCacing === true

  }


  showModal.value = true

}


/*
|--------------------------------------------------------------------------
| TUTUP MODAL
|--------------------------------------------------------------------------
*/

const tutupModal = () => {

  showModal.value = false

}


/*
|--------------------------------------------------------------------------
| HITUNG WHO
|--------------------------------------------------------------------------
*/

const hitungWHO = async (pemeriksaan) => {

  if (!pemeriksaan) {

    hasilWHO.value = null

    return null

  }


  /*
  |--------------------------------------------------------------------------
  | TB/PB WAJIB ADA UNTUK STUNTING
  |--------------------------------------------------------------------------
  */

  if (
    pemeriksaan.tb === null ||
    pemeriksaan.tb === undefined ||
    pemeriksaan.tb === ''
  ) {

    hasilWHO.value = {

      berhasil: false,

      pesan:
        'TB/PB belum tersedia sehingga status TB/PB menurut umur belum dapat dihitung.'

    }

    return hasilWHO.value

  }


  sedangMenghitung.value = true


  try {

    const hasil =
      await hitungStatusWHO({

        tanggalLahir:
          anak.tanggalLahir,

        tanggalPemeriksaan:
          pemeriksaan.tanggal,

        jenisKelamin:
          anak.jenisKelamin,

        tb:
          pemeriksaan.tb,

        bb:
          pemeriksaan.bb,

        lk:
          pemeriksaan.lk

      })


    hasilWHO.value =
      hasil


    return hasil

  }
  catch (error) {

    console.error(
      'Gagal menghitung WHO:',
      error
    )


    hasilWHO.value = {

      berhasil: false,

      pesan:
        'Perhitungan WHO gagal dilakukan.'

    }


    return hasilWHO.value

  }
  finally {

    sedangMenghitung.value =
      false

  }

}


/*
|--------------------------------------------------------------------------
| HITUNG WHO DATA
|--------------------------------------------------------------------------
*/

const hitungStatusWHOData =
  async (pemeriksaan) => {

    if (!pemeriksaan) {
      return null
    }


    if (
      pemeriksaan.tb === null ||
      pemeriksaan.tb === undefined ||
      pemeriksaan.tb === ''
    ) {

      return {

        berhasil: false,

        pesan:
          'TB/PB belum tersedia.'

      }

    }


    try {

      return await hitungStatusWHO({

        tanggalLahir:
          anak.tanggalLahir,

        tanggalPemeriksaan:
          pemeriksaan.tanggal,

        jenisKelamin:
          anak.jenisKelamin,

        tb:
          pemeriksaan.tb,

        bb:
          pemeriksaan.bb,

        lk:
          pemeriksaan.lk

      })

    }
    catch (error) {

      console.error(
        'WHO History Error:',
        error
      )


      return {

        berhasil: false,

        pesan:
          'Perhitungan WHO gagal dilakukan.'

      }

    }

  }


/*
|--------------------------------------------------------------------------
| HITUNG SEMUA HISTORI WHO
|--------------------------------------------------------------------------
*/

const hitungSemuaHistoriWHO =
  async () => {

    if (
      !anak.pemeriksaan ||
      anak.pemeriksaan.length === 0
    ) {

      return

    }


    for (
      const pemeriksaan
      of anak.pemeriksaan
    ) {

      const hasil =
        await hitungStatusWHOData(
          pemeriksaan
        )


      if (
        hasil?.berhasil
      ) {

        pemeriksaan.status =
          hasil.status

        pemeriksaan.zScore =
          hasil.zScore

        pemeriksaan.percentile =
          hasil.percentile

      }
      else {

        pemeriksaan.status =
          'Belum dihitung'

        pemeriksaan.zScore =
          null

        pemeriksaan.percentile =
          null

      }

    }

  }


/*
|--------------------------------------------------------------------------
| SIMPAN PEMERIKSAAN
|--------------------------------------------------------------------------
*/

const simpanPemeriksaan =
  async () => {

    /*
    |--------------------------------------------------------------------------
    | VALIDASI DATA DASAR
    |--------------------------------------------------------------------------
    */

    if (
      !form.value.tanggal ||
      form.value.tb === '' ||
      form.value.bb === '' ||
      form.value.lk === '' ||
      form.value.lila === ''
    ) {

      alert(
        'Semua data pemeriksaan harus diisi.'
      )

      return

    }


    /*
    |--------------------------------------------------------------------------
    | VALIDASI LAYANAN
    |--------------------------------------------------------------------------
    */

    if (
      typeof form.value.imunisasi !== 'boolean' ||
      typeof form.value.vitaminA !== 'boolean' ||
      typeof form.value.obatCacing !== 'boolean'
    ) {

      alert(
        'Silakan pilih Ya atau Tidak untuk imunisasi, Vitamin A, dan obat cacing.'
      )

      return

    }


    /*
    |--------------------------------------------------------------------------
    | VALIDASI TB
    |--------------------------------------------------------------------------
    */

    if (
      Number(form.value.tb) < 30 ||
      Number(form.value.tb) > 150
    ) {

      alert(
        'Tinggi/Panjang Badan harus antara 30–150 cm.'
      )

      return

    }


    /*
    |--------------------------------------------------------------------------
    | VALIDASI BB
    |--------------------------------------------------------------------------
    */

    if (
      Number(form.value.bb) < 1 ||
      Number(form.value.bb) > 50
    ) {

      alert(
        'Berat Badan harus antara 1–50 kg.'
      )

      return

    }


    /*
    |--------------------------------------------------------------------------
    | VALIDASI LK
    |--------------------------------------------------------------------------
    */

    if (
      Number(form.value.lk) < 25 ||
      Number(form.value.lk) > 70
    ) {

      alert(
        'Lingkar Kepala harus antara 25–70 cm.'
      )

      return

    }


    /*
    |--------------------------------------------------------------------------
    | VALIDASI LILA
    |--------------------------------------------------------------------------
    */

    if (
      Number(form.value.lila) < 5 ||
      Number(form.value.lila) > 30
    ) {

      alert(
        'LILA harus antara 5–30 cm.'
      )

      return

    }


    /*
    |--------------------------------------------------------------------------
    | DATA YANG DIKIRIM KE BACKEND
    |--------------------------------------------------------------------------
    */

    const payload = {

      tanggal_pemeriksaan:
        form.value.tanggal,

      bb:
        Number(form.value.bb),

      tb:
        Number(form.value.tb),

      lk:
        Number(form.value.lk),

      lila:
        Number(form.value.lila),

      imunisasi:
        form.value.imunisasi,

      vitamin_a:
        form.value.vitaminA,

      obat_cacing:
        form.value.obatCacing

    }


    try {

      let response


      /*
      |--------------------------------------------------------------------------
      | TAMBAH
      |--------------------------------------------------------------------------
      */

      if (
        mode.value === 'tambah'
      ) {

        response =
          await fetch(
            `${API_URL}/balita/${id}/pemeriksaan`,
            {

              method: 'POST',

              headers: {
                'Content-Type':
                  'application/json'
              },

              body:
                JSON.stringify(
                  payload
                )

            }
          )

      }


      /*
      |--------------------------------------------------------------------------
      | EDIT
      |--------------------------------------------------------------------------
      */

      else {

        response =
          await fetch(
            `${API_URL}/pemeriksaan/${form.value.id}`,
            {

              method: 'PUT',

              headers: {
                'Content-Type':
                  'application/json'
              },

              body:
                JSON.stringify(
                  payload
                )

            }
          )

      }


      /*
      |--------------------------------------------------------------------------
      | CEK RESPONSE
      |--------------------------------------------------------------------------
      */

      const hasil =
        await response.json()


      if (!response.ok || !hasil.berhasil) {

        throw new Error(
          hasil.pesan ||
          'Pemeriksaan gagal disimpan.'
        )

      }


      /*
      |--------------------------------------------------------------------------
      | AMBIL ULANG DATA DARI MYSQL
      |--------------------------------------------------------------------------
      |
      | Kita tidak langsung push hasil form ke array.
      | Data diambil ulang dari database supaya tampilan
      | benar-benar mengikuti data MySQL.
      |--------------------------------------------------------------------------
      */

      await loadPemeriksaan()


      /*
      |--------------------------------------------------------------------------
      | HITUNG WHO TERBARU
      |--------------------------------------------------------------------------
      */

      if (
        pemeriksaanTerbaru.value.length > 0
      ) {

        await hitungWHO(
          pemeriksaanTerbaru.value[0]
        )

      }
      else {

        hasilWHO.value =
          null

      }


      /*
      |--------------------------------------------------------------------------
      | TUTUP MODAL
      |--------------------------------------------------------------------------
      */

      showModal.value =
        false


    }
    catch (error) {

      console.error(
        'Gagal menyimpan pemeriksaan:',
        error
      )


      alert(
        error.message ||
        'Pemeriksaan gagal disimpan.'
      )

    }

  }


/*
|--------------------------------------------------------------------------
| HAPUS PEMERIKSAAN
|--------------------------------------------------------------------------
*/

const hapusPemeriksaan =
  async (item) => {

    const yakin =
      confirm(
        `Hapus pemeriksaan tanggal ${formatTanggal(item.tanggal)}?`
      )


    if (!yakin) {
      return
    }


    try {

      const response =
        await fetch(
          `${API_URL}/pemeriksaan/${item.id}`,
          {
            method: 'DELETE'
          }
        )


      const hasil =
        await response.json()


      if (
        !response.ok ||
        !hasil.berhasil
      ) {

        throw new Error(
          hasil.pesan ||
          'Pemeriksaan gagal dihapus.'
        )

      }


      /*
      |--------------------------------------------------------------------------
      | LOAD ULANG DATA MYSQL
      |--------------------------------------------------------------------------
      */

      await loadPemeriksaan()


      /*
      |--------------------------------------------------------------------------
      | TAMPILKAN HASIL WHO TERBARU
      |--------------------------------------------------------------------------
      */

      if (
        pemeriksaanTerbaru.value.length > 0
      ) {

        await hitungWHO(
          pemeriksaanTerbaru.value[0]
        )

      }
      else {

        hasilWHO.value =
          null

      }


    }
    catch (error) {

      console.error(
        'Gagal menghapus pemeriksaan:',
        error
      )


      alert(
        error.message ||
        'Pemeriksaan gagal dihapus.'
      )

    }

  }


/*
|--------------------------------------------------------------------------
| FORMAT TANGGAL
|--------------------------------------------------------------------------
*/

const formatTanggal =
  (tanggal) => {

    if (!tanggal) {
      return '-'
    }


    const tanggalNormal =
      normalisasiTanggal(tanggal)


    if (!tanggalNormal) {
      return '-'
    }


    const [tahun, bulan, hari] =
      tanggalNormal
        .split('-')
        .map(Number)


    const date =
      new Date(
        tahun,
        bulan - 1,
        hari
      )


    return date.toLocaleDateString(
      'id-ID',
      {

        day: '2-digit',

        month: 'long',

        year: 'numeric'

      }
    )

  }


/*
|--------------------------------------------------------------------------
| HITUNG UMUR DARI DUA TANGGAL
|--------------------------------------------------------------------------
*/

const hitungUmurDariTanggal =
  (
    tanggalLahir,
    tanggalPemeriksaan
  ) => {

    if (
      !tanggalLahir ||
      !tanggalPemeriksaan
    ) {

      return '-'

    }


    const lahir =
      new Date(
        `${normalisasiTanggal(
          tanggalLahir
        )}T00:00:00`
      )


    const periksa =
      new Date(
        `${normalisasiTanggal(
          tanggalPemeriksaan
        )}T00:00:00`
      )


    if (
      isNaN(lahir.getTime()) ||
      isNaN(periksa.getTime())
    ) {

      return '-'

    }


    let tahun =
      periksa.getFullYear() -
      lahir.getFullYear()


    let bulan =
      periksa.getMonth() -
      lahir.getMonth()


    let hari =
      periksa.getDate() -
      lahir.getDate()


    if (hari < 0) {

      bulan--


      const hariBulanSebelumnya =
        new Date(
          periksa.getFullYear(),
          periksa.getMonth(),
          0
        ).getDate()


      hari +=
        hariBulanSebelumnya

    }


    if (bulan < 0) {

      tahun--

      bulan += 12

    }


    if (tahun > 0) {

      if (bulan > 0) {

        return `${tahun} tahun ${bulan} bulan`

      }


      return `${tahun} tahun`

    }


    if (bulan > 0) {

      return `${bulan} bulan`

    }


    return `${hari} hari`

  }


/*
|--------------------------------------------------------------------------
| UMUR WHO
|--------------------------------------------------------------------------
*/

const formatUmurWHO =
  () => {

    if (
      !anak ||
      pemeriksaanTerbaru.value.length === 0
    ) {

      return '-'

    }


    const pemeriksaan =
      pemeriksaanTerbaru.value[0]


    return hitungUmurDariTanggal(

      anak.tanggalLahir,

      pemeriksaan.tanggal

    )

  }


/*
|--------------------------------------------------------------------------
| UMUR PROFILE
|--------------------------------------------------------------------------
*/

const hitungUmur =
  (tanggalLahir) => {

    if (!tanggalLahir) {
      return '-'
    }


    const sekarang =
      new Date()


    const tanggalHariIni =
      `${sekarang.getFullYear()}-${String(
        sekarang.getMonth() + 1
      ).padStart(2, '0')}-${String(
        sekarang.getDate()
      ).padStart(2, '0')}`


    return hitungUmurDariTanggal(

      tanggalLahir,

      tanggalHariIni

    )

  }


/*
|--------------------------------------------------------------------------
| SAAT HALAMAN DIBUKA
|--------------------------------------------------------------------------
*/

onMounted(async () => {

  await loadBalita()


  /*
  |--------------------------------------------------------------------------
  | TAMPILKAN WHO TERBARU
  |--------------------------------------------------------------------------
  */

  if (
    pemeriksaanTerbaru.value.length > 0
  ) {

    await hitungWHO(
      pemeriksaanTerbaru.value[0]
    )

  }

})

</script>


<style scoped>

/*
|--------------------------------------------------------------------------
| PERBAIKAN HEADER DETAIL BALITA
|--------------------------------------------------------------------------
*/

.detail-profile-name {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: left;
  gap: 7px;
}


.detail-profile-name h1 {
  margin: 0;
  text-align: left;
}


.detail-profile-name .status-normal {
  display: inline-block;
  width: fit-content;
  text-align: left;
  line-height: 1.2;
}


.profile-main {
  text-align: left;
  align-items: flex-start;
}


.profile-main > p {
  text-align: left;
}


/*
|--------------------------------------------------------------------------
| JARAK DARI TAB KE GRAFIK
|--------------------------------------------------------------------------
*/

.growth-chart-container {
  margin-top: 30px;
}


/*
|--------------------------------------------------------------------------
| JARAK ANTAR GRAFIK
|--------------------------------------------------------------------------
*/

.growth-chart-section {
  margin-bottom: 35px;
}


.growth-chart-section h3 {
  margin-bottom: 12px;
}


.growth-chart-description {
  margin-top: -4px;
  margin-bottom: 15px;
  font-size: 13px;
  color: #6b7280;
}


/*
|--------------------------------------------------------------------------
| JARAK TABEL HISTORI PEMERIKSAAN
|--------------------------------------------------------------------------
*/

.history-table-spacing {
  margin-top: 30px;
  margin-bottom: 30px;
  position: relative;
  display: block;
  width: 100%;
}


/*
|--------------------------------------------------------------------------
| PILIHAN YA / TIDAK
|--------------------------------------------------------------------------
*/

.yes-no-choice {
  display: flex;
  gap: 10px;
  margin-top: 8px;
  width: 100%;
}


.choice-button {
  flex: 1;
  min-height: 44px;
  padding: 10px 16px;

  border: 1px solid #d1d5db;
  border-radius: 8px;

  background: #ffffff;
  color: #374151;

  font-family: inherit;
  font-size: 14px;
  font-weight: 500;

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease;
}


.choice-button:hover {
  border-color: #9ca3af;
  background: #f9fafb;
}


.choice-button.selected {
  font-weight: 600;
}


.choice-button.choice-yes.selected {
  background: #ecfdf5;
  border-color: #10b981;
  color: #047857;
  box-shadow: 0 0 0 1px #10b981;
}


.choice-button.choice-no.selected {
  background: #fef2f2;
  border-color: #ef4444;
  color: #dc2626;
  box-shadow: 0 0 0 1px #ef4444;
}


.choice-button span {
  font-size: 16px;
  font-weight: 700;
}

</style>
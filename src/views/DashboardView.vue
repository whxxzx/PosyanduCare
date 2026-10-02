<template>
  <div class="app-layout">

    <!-- SIDEBAR -->
    <aside class="sidebar">

      <div class="sidebar-logo">
        🏥
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

        <router-link to="/pra-sekolah">
          🎒 Pra Sekolah
        </router-link>

      </nav>

    </aside>


    <!-- MAIN -->
    <main class="main-content">

      <!-- TOPBAR -->
      <header class="topbar">

        <div>
          <h2>Dashboard</h2>

          <p>
            Selamat datang di Posyandu Sedap Malam 2
          </p>
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

              <strong>
                {{ namaUser }}
              </strong>

              <small>
                Kader Posyandu
              </small>

            </div>

            <span class="profile-arrow">
              ▾
            </span>

          </div>


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

                <strong>
                  {{ namaUser }}
                </strong>

                <small>
                  Kader Posyandu
                </small>

              </div>

            </div>


            <div class="profile-divider"></div>


            <button
              class="logout-button"
              @click.stop="logout"
            >

              <span>↪</span>

              Keluar

            </button>

          </div>

        </div>

      </header>


      <!-- CONTENT -->
      <section class="dashboard-content">

        <!-- WELCOME -->
        <div class="welcome-box">

          <h1>
            Selamat datang,
            {{ namaUser }} 👋
          </h1>

          <p>
            Berikut ringkasan data kesehatan
            Posyandu Sedap Malam 2.
          </p>

        </div>


        <!-- STATISTIK UTAMA -->
        <div class="stats-grid">

          <!-- TOTAL ANAK -->
          <div class="stat-card">

            <div class="stat-icon">
              👶
            </div>

            <div>

              <p>
                Total Anak
              </p>

              <h2>
                {{ jumlahBalita }}
              </h2>

              <span>
                Anak terdaftar
              </span>

            </div>

          </div>


          <!-- SUDAH DIPERIKSA -->
          <div class="stat-card">

            <div class="stat-icon">
              📋
            </div>

            <div>

              <p>
                Sudah Diperiksa
              </p>

              <h2>
                {{ jumlahSudahDiperiksa }}
              </h2>

              <span>
                Memiliki pemeriksaan
              </span>

            </div>

          </div>


          <!-- BELUM DIPERIKSA -->
          <div class="stat-card">

            <div class="stat-icon">
              📝
            </div>

            <div>

              <p>
                Belum Diperiksa
              </p>

              <h2>
                {{ jumlahBelumDiperiksa }}
              </h2>

              <span>
                Belum memiliki pemeriksaan
              </span>

            </div>

          </div>


          <!-- PERSENTASE STUNTING -->
          <div class="stat-card">

            <div class="stat-icon">
              📊
            </div>

            <div>

              <p>
                Persentase Stunting
              </p>

              <h2>
                {{ persentaseStunting }}
              </h2>

              <span>
                Pemeriksaan bulan ini
              </span>

            </div>

          </div>

        </div>


        <!-- KATEGORI ANAK -->
        <div class="dashboard-panel category-panel">

          <div class="panel-header">

            <div>

              <h3>
                Kategori Anak
              </h3>

              <p>
                Jumlah anak berdasarkan kelompok umur.
              </p>

            </div>

          </div>


          <div class="category-grid">

            <div class="category-card bayi">

              <div class="category-icon">
                👶
              </div>

              <div>

                <span>
                  Bayi
                </span>

                <strong>
                  {{ jumlahBayi }}
                </strong>

                <small>
                  0–11 bulan
                </small>

              </div>

            </div>


            <div class="category-card balita">

              <div class="category-icon">
                🧒
              </div>

              <div>

                <span>
                  Balita
                </span>

                <strong>
                  {{ jumlahBalitaKategori }}
                </strong>

                <small>
                  12–59 bulan
                </small>

              </div>

            </div>


            <div class="category-card prasekolah">

              <div class="category-icon">
                🎒
              </div>

              <div>

                <span>
                  Pra Sekolah
                </span>

                <strong>
                  {{ jumlahPraSekolah }}
                </strong>

                <small>
                  60–72 bulan
                </small>

              </div>

            </div>

          </div>

        </div>


        <!-- STATUS WHO -->
        <div class="dashboard-panel">

          <div class="panel-header">

            <div>

              <h3>
                Status Pertumbuhan WHO
              </h3>

              <p>
                Status berdasarkan pemeriksaan terbaru
                yang memiliki data TB/PB.
              </p>

            </div>

          </div>


          <div class="status-grid">

            <div class="status-card normal">

              <span class="status-icon">
                ✓
              </span>

              <div>

                <span>
                  Normal
                </span>

                <strong>
                  {{ jumlahNormal }}
                </strong>

              </div>

            </div>


            <div class="status-card stunted">

              <span class="status-icon">
                !
              </span>

              <div>

                <span>
                  Stunted
                </span>

                <strong>
                  {{ jumlahStunted }}
                </strong>

              </div>

            </div>


            <div class="status-card severe">

              <span class="status-icon">
                !!
              </span>

              <div>

                <span>
                  Severely Stunted
                </span>

                <strong>
                  {{ jumlahSeverelyStunted }}
                </strong>

              </div>

            </div>


            <div class="status-card belum">

              <span class="status-icon">
                ?
              </span>

              <div>

                <span>
                  Belum Diperiksa
                </span>

                <strong>
                  {{ jumlahBelumDiperiksa }}
                </strong>

              </div>

            </div>

          </div>

        </div>


        <!-- INFO + AKSES CEPAT -->
        <div class="dashboard-grid">

          <!-- INFORMASI POSYANDU -->
          <div class="dashboard-panel">

            <div class="panel-header">

              <h3>
                Ringkasan Posyandu
              </h3>

            </div>


            <div class="info-row">

              <span>
                Nama Posyandu
              </span>

              <strong>
                Posyandu Sedap Malam 2
              </strong>

            </div>


            <div class="info-row">

              <span>
                Kelurahan
              </span>

              <strong>
                Nginden Jangkungan
              </strong>

            </div>


            <div class="info-row">

              <span>
                Kecamatan
              </span>

              <strong>
                Sukolilo
              </strong>

            </div>


            <div class="info-row">

              <span>
                Kota
              </span>

              <strong>
                Surabaya
              </strong>

            </div>

          </div>


          <!-- AKSES CEPAT -->
          <div class="dashboard-panel">

            <div class="panel-header">

              <h3>
                Akses Cepat
              </h3>

            </div>


            <router-link
              to="/balita"
              class="quick-button"
            >

              👶

              <span>

                <strong>
                  Data Balita
                </strong>

                <small>
                  Lihat dan kelola data anak
                </small>

              </span>

            </router-link>

          </div>

        </div>


        <!-- GRAFIK STATUS -->
        <div class="dashboard-panel">

          <div class="panel-header">

            <div>

              <h3>
                Tren Status Pertumbuhan
              </h3>

              <p>
                Perbandingan hasil pemeriksaan setiap bulan.
              </p>

            </div>

          </div>


          <div class="chart-container">

            <div
              v-if="dataTrenBulanan.length === 0"
              class="empty-data"
            >
              Belum ada data pemeriksaan.
            </div>


            <div
              v-else
              class="dashboard-chart-wrapper"
            >

              <canvas
                ref="statusChartCanvas"
              ></canvas>

            </div>

          </div>

        </div>


        <!-- GRAFIK PERSENTASE -->
        <div class="dashboard-panel">

          <div class="panel-header">

            <div>

              <h3>
                Tren Persentase Stunting
              </h3>

              <p>
                Persentase Stunted dan Severely Stunted
                dari anak yang diperiksa pada setiap bulan.
              </p>

            </div>

          </div>


          <div class="chart-container">

            <div
              v-if="dataTrenBulanan.length === 0"
              class="empty-data"
            >
              Belum ada data pemeriksaan.
            </div>


            <div
              v-else
              class="dashboard-chart-wrapper"
            >

              <canvas
                ref="percentageChartCanvas"
              ></canvas>

            </div>

          </div>

        </div>


        <!-- PEMERIKSAAN TERBARU -->
        <div class="dashboard-panel">

          <div class="panel-header">

            <div>

              <h3>
                Pemeriksaan Terbaru
              </h3>

              <p>
                Data pemeriksaan terakhir yang tersimpan.
              </p>

            </div>

          </div>


          <div
            v-if="pemeriksaanTerbaru.length === 0"
            class="empty-data"
          >
            Belum ada pemeriksaan.
          </div>


          <div
            v-else
            class="recent-examination-list"
          >

            <div
              v-for="(item, index) in pemeriksaanTerbaruHalaman"
              :key="`${item.anak.id}-${item.pemeriksaan.id}`"
              class="recent-examination-item"
            >

              <div class="recent-number">
                {{ (halamanPemeriksaanTerbaru - 1) * itemPerHalaman + index + 1 }}
              </div>

              <div class="recent-avatar">
                👶
              </div>


              <div class="recent-information">

                <strong>
                  {{ item.anak.nama }}
                </strong>

                <span>
                  {{ formatTanggal(item.pemeriksaan.tanggal) }}
                </span>

                <small>
                  TB/PB:
                  {{ tampilkanAngka(item.pemeriksaan.tb) }} cm
                  &nbsp;•&nbsp;
                  BB:
                  {{ tampilkanAngka(item.pemeriksaan.bb) }} kg
                </small>

              </div>


              <div
                :class="[
                  'status-badge',
                  statusClass(item.status)
                ]"
              >

                {{ item.status || 'Belum dihitung' }}

              </div>

            </div>

          </div>


          <!-- PAGINATION PEMERIKSAAN -->
          <div
            v-if="totalHalamanPemeriksaanTerbaru > 1"
            class="pagination-controls"
          >

            <button
              class="pagination-button"
              :disabled="halamanPemeriksaanTerbaru === 1"
              @click="halamanPemeriksaanTerbaru--"
            >
              ‹
            </button>

            <span>
              {{ halamanPemeriksaanTerbaru }}
              /
              {{ totalHalamanPemeriksaanTerbaru }}
            </span>

            <button
              class="pagination-button"
              :disabled="halamanPemeriksaanTerbaru === totalHalamanPemeriksaanTerbaru"
              @click="halamanPemeriksaanTerbaru++"
            >
              ›
            </button>

          </div>

        </div>


        <!-- ANAK PERLU DIPANTAU -->
        <div class="dashboard-panel">

          <div class="panel-header">

            <div>

              <h3>
                Anak yang Perlu Dipantau
              </h3>

              <p>
                Anak dengan hasil skrining Stunted
                atau Severely Stunted.
              </p>

            </div>

          </div>


          <div
            v-if="anakPerluDipantau.length === 0"
            class="empty-data success-empty"
          >
            ✓ Tidak ada anak yang masuk daftar
            pemantauan berdasarkan data pemeriksaan terbaru.
          </div>


          <div
            v-else
            class="monitoring-list"
          >

            <div
              v-for="(item, index) in anakPerluDipantauHalaman"
              :key="`${item.anak.id}-${item.pemeriksaan.id}`"
              class="monitoring-item"
            >

              <div class="monitoring-number">
                {{ (halamanAnakDipantau - 1) * itemPerHalaman + index + 1 }}
              </div>


              <div class="monitoring-information">

                <strong>
                  {{ item.anak.nama }}
                </strong>

                <span>
                  Pemeriksaan:
                  {{ formatTanggal(item.pemeriksaan.tanggal) }}
                </span>

              </div>


              <div
                :class="[
                  'status-badge',
                  statusClass(item.status)
                ]"
              >

                {{ item.status }}

              </div>

            </div>

          </div>


          <!-- PAGINATION ANAK DIPANTAU -->
          <div
            v-if="totalHalamanAnakDipantau > 1"
            class="pagination-controls"
          >

            <button
              class="pagination-button"
              :disabled="halamanAnakDipantau === 1"
              @click="halamanAnakDipantau--"
            >
              ‹
            </button>

            <span>
              {{ halamanAnakDipantau }}
              /
              {{ totalHalamanAnakDipantau }}
            </span>

            <button
              class="pagination-button"
              :disabled="halamanAnakDipantau === totalHalamanAnakDipantau"
              @click="halamanAnakDipantau++"
            >
              ›
            </button>

          </div>

        </div>


        <!-- LAYANAN -->
        <div class="dashboard-panel">

          <div class="panel-header">

            <div>

              <h3>
                Rekap Layanan
              </h3>

              <p>
                Data layanan yang tercatat pada pemeriksaan.
              </p>

            </div>

          </div>


          <div class="service-grid">

            <div class="service-card">

              <span class="service-icon">
                💉
              </span>

              <div>

                <span>
                  Imunisasi
                </span>

                <strong>
                  {{ jumlahImunisasi }}
                </strong>

                <small>
                  Pemeriksaan tercatat
                </small>

              </div>

            </div>


            <div class="service-card">

              <span class="service-icon">
                💊
              </span>

              <div>

                <span>
                  Vitamin A
                </span>

                <strong>
                  {{ jumlahVitaminA }}
                </strong>

                <small>
                  Pemeriksaan tercatat
                </small>

              </div>

            </div>


            <div class="service-card">

              <span class="service-icon">
                🧴
              </span>

              <div>

                <span>
                  Obat Cacing
                </span>

                <strong>
                  {{ jumlahObatCacing }}
                </strong>

                <small>
                  Pemeriksaan tercatat
                </small>

              </div>

            </div>

          </div>

        </div>


        <!-- CATATAN -->
        <div class="dashboard-note">

          <strong>
            Catatan:
          </strong>

          Hasil status pertumbuhan pada dashboard
          merupakan hasil skrining berdasarkan data
          antropometri dan standar WHO, bukan diagnosis medis.

        </div>

      </section>

    </main>

  </div>
</template>


<script setup>

import {
  computed,
  onMounted,
  onBeforeUnmount,
  ref
} from 'vue'

import {
  useRouter
} from 'vue-router'

import {
  hitungStatusWHO
} from '../utils/whoGrowth'

import {
  hitungUmurBulan,
  tentukanKategoriAnak
} from '../utils/kategoriAnak'

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
  Filler
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
  Filler
)


const router = useRouter()


/* =========================================================
   USER
========================================================= */

const user =
  JSON.parse(
    localStorage.getItem('userLogin')
  )


const menuProfil =
  ref(false)


const namaUser =
  computed(() => {

    return user?.nama || 'Kader'

  })


/* =========================================================
   DATA
========================================================= */

const dataBalita =
  ref([])


const sedangMemuat =
  ref(true)


const hasilWHO =
  ref({})


/* =========================================================
   NORMALISASI
========================================================= */

const normalisasiTanggal =
  (tanggal) => {

    if (!tanggal) {
      return null
    }

    return String(tanggal)
      .substring(0, 10)

  }


const pemeriksaanValidWHO =
  (pemeriksaan) => {

    return (
      pemeriksaan &&
      pemeriksaan.tanggal &&
      pemeriksaan.tb !== null &&
      pemeriksaan.tb !== undefined &&
      Number(pemeriksaan.tb) > 0
    )

  }


/* =========================================================
   AMBIL DATA MYSQL
========================================================= */

const ambilDataBalita =
  async () => {

    try {

      sedangMemuat.value = true


      const response =
        await fetch(
          'http://localhost:3000/api/balita'
        )


      if (!response.ok) {

        throw new Error(
          'Gagal mengambil data balita.'
        )

      }


      const hasil =
        await response.json()


      const data =
        Array.isArray(hasil.data)
          ? hasil.data
          : []


      const dataLengkap =
        await Promise.all(

          data.map(
            async (anak) => {

              try {

                const responsePemeriksaan =
                  await fetch(
                    `http://localhost:3000/api/balita/${anak.id}/pemeriksaan`
                  )


                if (
                  !responsePemeriksaan.ok
                ) {

                  return {
                    ...anak,
                    pemeriksaan: []
                  }

                }


                const hasilPemeriksaan =
                  await responsePemeriksaan.json()


                const pemeriksaan =
                  Array.isArray(
                    hasilPemeriksaan.data
                  )
                    ? hasilPemeriksaan.data
                    : []


                return {

                  ...anak,

                  pemeriksaan:
                    pemeriksaan.map(
                      item => ({

                        ...item,

                        tanggal:
                          item.tanggal ||
                          item.tanggal_pemeriksaan,

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
                            : null

                      })
                    )

                }

              }
              catch (error) {

                console.error(
                  `Gagal mengambil pemeriksaan anak ${anak.id}:`,
                  error
                )

                return {
                  ...anak,
                  pemeriksaan: []
                }

              }

            }
          )

        )


      dataBalita.value =
        dataLengkap

    }
    catch (error) {

      console.error(
        'Gagal mengambil data dashboard:',
        error
      )

      dataBalita.value = []

    }
    finally {

      sedangMemuat.value = false

    }

  }


/* =========================================================
   JUMLAH ANAK
========================================================= */

const jumlahBalita =
  computed(() => {

    return dataBalita.value.length

  })


const jumlahSudahDiperiksa =
  computed(() => {

    return dataBalita.value.filter(
      anak =>
        anak.pemeriksaan &&
        anak.pemeriksaan.length > 0
    ).length

  })


const jumlahBelumDiperiksa =
  computed(() => {

    return (
      jumlahBalita.value -
      jumlahSudahDiperiksa.value
    )

  })


/* =========================================================
   KATEGORI ANAK
========================================================= */

const jumlahBayi =
  computed(() => {

    return dataBalita.value.filter(
      anak =>
        tentukanKategoriAnak(
          anak.tanggal_lahir ||
          anak.tanggalLahir
        ) === 'Bayi'
    ).length

  })


const jumlahBalitaKategori =
  computed(() => {

    return dataBalita.value.filter(
      anak =>
        tentukanKategoriAnak(
          anak.tanggal_lahir ||
          anak.tanggalLahir
        ) === 'Balita'
    ).length

  })


const jumlahPraSekolah =
  computed(() => {

    return dataBalita.value.filter(
      anak =>
        tentukanKategoriAnak(
          anak.tanggal_lahir ||
          anak.tanggalLahir
        ) === 'Pra Sekolah'
    ).length

  })


/* =========================================================
   PEMERIKSAAN TERBARU
========================================================= */

const ambilPemeriksaanTerbaru =
  (anak) => {

    if (
      !anak.pemeriksaan ||
      anak.pemeriksaan.length === 0
    ) {

      return null

    }


    return [
      ...anak.pemeriksaan
    ]
      .filter(
        pemeriksaan =>
          pemeriksaanValidWHO(
            pemeriksaan
          )
      )
      .sort(
        (a, b) =>
          new Date(b.tanggal) -
          new Date(a.tanggal)
      )[0] || null

  }


/* =========================================================
   WHO
========================================================= */

const hitungStatus =
  async (
    anak,
    pemeriksaan
  ) => {

    if (
      !pemeriksaanValidWHO(
        pemeriksaan
      )
    ) {

      return null

    }


    const tanggalLahir =
      normalisasiTanggal(
        anak.tanggal_lahir ||
        anak.tanggalLahir
      )


    const tanggalPemeriksaan =
      normalisasiTanggal(
        pemeriksaan.tanggal
      )


    const jenisKelamin =
      anak.jenis_kelamin ||
      anak.jenisKelamin


    if (
      !tanggalLahir ||
      !tanggalPemeriksaan ||
      !jenisKelamin
    ) {

      return null

    }


    try {

      const hasil =
        await hitungStatusWHO({

          tanggalLahir,

          tanggalPemeriksaan,

          jenisKelamin,

          tb:
            pemeriksaan.tb,

          bb:
            pemeriksaan.bb,

          lk:
            pemeriksaan.lk

        })


      if (
        !hasil ||
        !hasil.berhasil
      ) {

        return null

      }


      return hasil

    }
    catch (error) {

      console.error(
        'Gagal menghitung WHO:',
        error
      )

      return null

    }

  }


const hitungSemuaStatusWHO =
  async () => {

    const hasil = {}


    for (
      const anak
      of dataBalita.value
    ) {

      for (
        const pemeriksaan
        of anak.pemeriksaan || []
      ) {

        if (
          !pemeriksaanValidWHO(
            pemeriksaan
          )
        ) {

          continue

        }


        const hasilPemeriksaan =
          await hitungStatus(
            anak,
            pemeriksaan
          )


        if (
          hasilPemeriksaan
        ) {

          const key =
            `${anak.id}-${pemeriksaan.id}`


          hasil[key] = {

            balitaId:
              anak.id,

            pemeriksaanId:
              pemeriksaan.id,

            status:
              hasilPemeriksaan.status,

            zScore:
              hasilPemeriksaan.zScore,

            tanggal:
              pemeriksaan.tanggal

          }

        }

      }

    }


    hasilWHO.value =
      hasil

  }


/* =========================================================
   HASIL WHO TERBARU
========================================================= */

const hasilWHOterbaru =
  computed(() => {

    const hasil = []


    dataBalita.value.forEach(
      anak => {

        const pemeriksaan =
          ambilPemeriksaanTerbaru(
            anak
          )


        if (!pemeriksaan) {
          return
        }


        const key =
          `${anak.id}-${pemeriksaan.id}`


        const hasilPemeriksaan =
          hasilWHO.value[key]


        if (hasilPemeriksaan) {

          hasil.push({

            ...hasilPemeriksaan,

            anak,

            pemeriksaan

          })

        }

      }
    )


    return hasil

  })


/* =========================================================
   STATUS
========================================================= */

const jumlahNormal =
  computed(() => {

    return hasilWHOterbaru.value.filter(
      item =>
        item.status === 'Normal'
    ).length

  })


const jumlahStunted =
  computed(() => {

    return hasilWHOterbaru.value.filter(
      item =>
        item.status === 'Stunted'
    ).length

  })


const jumlahSeverelyStunted =
  computed(() => {

    return hasilWHOterbaru.value.filter(
      item =>
        item.status === 'Severely Stunted'
    ).length

  })


/* =========================================================
   PEMERIKSAAN BULAN BERJALAN
========================================================= */

const pemeriksaanBulanIni =
  computed(() => {

    const sekarang =
      new Date()

    const tahun =
      sekarang.getFullYear()

    const bulan =
      sekarang.getMonth()


    const hasil = []


    dataBalita.value.forEach(
      anak => {

        const pemeriksaan =
          (anak.pemeriksaan || [])
            .filter(
              item => {

                if (
                  !pemeriksaanValidWHO(
                    item
                  )
                ) {

                  return false

                }


                const tanggal =
                  new Date(
                    item.tanggal
                  )


                return (
                  tanggal.getFullYear() === tahun &&
                  tanggal.getMonth() === bulan
                )

              }
            )
            .sort(
              (a, b) =>
                new Date(b.tanggal) -
                new Date(a.tanggal)
            )[0]


        if (!pemeriksaan) {
          return
        }


        const key =
          `${anak.id}-${pemeriksaan.id}`


        const who =
          hasilWHO.value[key]


        if (who) {

          hasil.push({

            ...who,

            anak,

            pemeriksaan

          })

        }

      }
    )


    return hasil

  })


/* =========================================================
   PERSENTASE STUNTING BULAN INI
========================================================= */

const persentaseStunting =
  computed(() => {

    const data =
      pemeriksaanBulanIni.value


    if (data.length === 0) {

      return '0%'

    }


    const jumlah =
      data.filter(
        item =>
          item.status === 'Stunted' ||
          item.status === 'Severely Stunted'
      ).length


    const hasil =
      (
        jumlah /
        data.length
      ) * 100


    return `${hasil
      .toFixed(1)
      .replace('.', ',')}%`

  })


/* =========================================================
   TREN BULANAN
========================================================= */

const dataTrenBulanan =
  computed(() => {

    const data = {}


    dataBalita.value.forEach(
      anak => {

        const pemeriksaanPerBulan = {}


        ;(anak.pemeriksaan || [])
          .forEach(
            pemeriksaan => {

              if (
                !pemeriksaanValidWHO(
                  pemeriksaan
                )
              ) {

                return

              }


              const keyWHO =
                `${anak.id}-${pemeriksaan.id}`


              const who =
                hasilWHO.value[keyWHO]


              if (!who) {
                return
              }


              const tanggal =
                new Date(
                  pemeriksaan.tanggal
                )


              if (
                isNaN(
                  tanggal.getTime()
                )
              ) {

                return

              }


              const tahun =
                tanggal.getFullYear()


              const bulan =
                tanggal.getMonth()


              const key =
                `${tahun}-${String(
                  bulan + 1
                ).padStart(2, '0')}`


              if (
                !pemeriksaanPerBulan[key]
              ) {

                pemeriksaanPerBulan[key] =
                  pemeriksaan

              }
              else {

                const tanggalLama =
                  new Date(
                    pemeriksaanPerBulan[key]
                      .tanggal
                  )


                if (
                  tanggal >
                  tanggalLama
                ) {

                  pemeriksaanPerBulan[key] =
                    pemeriksaan

                }

              }

            }
          )


        Object.entries(
          pemeriksaanPerBulan
        ).forEach(
          ([key, pemeriksaan]) => {

            const [tahun, bulan] =
              key
                .split('-')
                .map(Number)


            if (!data[key]) {

              data[key] = {

                tahun,

                bulan:
                  bulan - 1,

                total:
                  0,

                normal:
                  0,

                stunted:
                  0,

                severe:
                  0

              }

            }


            const keyWHO =
              `${anak.id}-${pemeriksaan.id}`


            const who =
              hasilWHO.value[keyWHO]


            if (!who) {
              return
            }


            data[key].total++


            if (
              who.status === 'Normal'
            ) {

              data[key].normal++

            }
            else if (
              who.status === 'Stunted'
            ) {

              data[key].stunted++

            }
            else if (
              who.status === 'Severely Stunted'
            ) {

              data[key].severe++

            }

          }
        )

      }
    )


    return Object
      .values(data)
      .sort(
        (a, b) => {

          if (
            a.tahun !==
            b.tahun
          ) {

            return (
              a.tahun -
              b.tahun
            )

          }


          return (
            a.bulan -
            b.bulan
          )

        }
      )
      .map(
        item => {

          const jumlahStunting =
            item.stunted +
            item.severe


          const persentase =
            item.total > 0
              ? (
                  jumlahStunting /
                  item.total
                ) * 100
              : 0


          return {

            ...item,

            label:
              new Date(
                item.tahun,
                item.bulan,
                1
              ).toLocaleDateString(
                'id-ID',
                {
                  month:
                    'short',

                  year:
                    'numeric'
                }
              ),

            persentase:
              Number(
                persentase.toFixed(1)
              )

          }

        }
      )

  })


/* =========================================================
   PEMERIKSAAN TERBARU
========================================================= */

const pemeriksaanTerbaru =
  computed(() => {

    const hasil = []


    dataBalita.value.forEach(
      anak => {

        const pemeriksaan =
          ambilPemeriksaanTerbaru(
            anak
          )


        if (!pemeriksaan) {
          return
        }


        const key =
          `${anak.id}-${pemeriksaan.id}`


        const who =
          hasilWHO.value[key]


        hasil.push({

          anak,

          pemeriksaan,

          status:
            who?.status || null,

          waktu:
            new Date(
              pemeriksaan.tanggal
            ).getTime()

        })

      }
    )


    return hasil
      .sort(
        (a, b) =>
          b.waktu -
          a.waktu
      )
      .slice(0, 1000)

  })


/* =========================================================
   PAGINATION PEMERIKSAAN TERBARU
========================================================= */

const itemPerHalaman = 10

const halamanPemeriksaanTerbaru =
  ref(1)


const totalHalamanPemeriksaanTerbaru =
  computed(() => {

    return Math.max(
      1,
      Math.ceil(
        pemeriksaanTerbaru.value.length /
        itemPerHalaman
      )
    )

  })


const pemeriksaanTerbaruHalaman =
  computed(() => {

    const mulai =
      (halamanPemeriksaanTerbaru.value - 1) *
      itemPerHalaman


    return pemeriksaanTerbaru.value.slice(
      mulai,
      mulai + itemPerHalaman
    )

  })


/* =========================================================
   ANAK PERLU DIPANTAU
========================================================= */

const anakPerluDipantau =
  computed(() => {

    return hasilWHOterbaru.value
      .filter(
        item =>
          item.status === 'Stunted' ||
          item.status === 'Severely Stunted'
      )

  })


/* =========================================================
   PAGINATION ANAK DIPANTAU
========================================================= */

const halamanAnakDipantau =
  ref(1)


const totalHalamanAnakDipantau =
  computed(() => {

    return Math.max(
      1,
      Math.ceil(
        anakPerluDipantau.value.length /
        itemPerHalaman
      )
    )

  })


const anakPerluDipantauHalaman =
  computed(() => {

    const mulai =
      (halamanAnakDipantau.value - 1) *
      itemPerHalaman


    return anakPerluDipantau.value.slice(
      mulai,
      mulai + itemPerHalaman
    )

  })


/* =========================================================
   LAYANAN
========================================================= */

const jumlahImunisasi =
  computed(() => {

    return dataBalita.value.reduce(
      (total, anak) => {

        return (
          total +
          (anak.pemeriksaan || [])
            .filter(
              item =>
                item.imunisasi &&
                String(
                  item.imunisasi
                ).trim() !== ''
            ).length
        )

      },
      0
    )

  })


const jumlahVitaminA =
  computed(() => {

    return dataBalita.value.reduce(
      (total, anak) => {

        return (
          total +
          (anak.pemeriksaan || [])
            .filter(
              item =>
                item.vitamin_a &&
                String(
                  item.vitamin_a
                ).trim() !== ''
            ).length
        )

      },
      0
    )

  })


const jumlahObatCacing =
  computed(() => {

    return dataBalita.value.reduce(
      (total, anak) => {

        return (
          total +
          (anak.pemeriksaan || [])
            .filter(
              item =>
                item.obat_cacing &&
                String(
                  item.obat_cacing
                ).trim() !== ''
            ).length
        )

      },
      0
    )

  })


/* =========================================================
   FORMAT
========================================================= */

const formatTanggal =
  (tanggal) => {

    if (!tanggal) {
      return '-'
    }


    const date =
      new Date(tanggal)


    if (
      isNaN(
        date.getTime()
      )
    ) {

      return '-'

    }


    return date.toLocaleDateString(
      'id-ID',
      {
        day:
          '2-digit',

        month:
          'short',

        year:
          'numeric'
      }
    )

  }


const tampilkanAngka =
  (nilai) => {

    if (
      nilai === null ||
      nilai === undefined ||
      nilai === ''
    ) {

      return '-'

    }


    return Number(
      nilai
    ).toLocaleString(
      'id-ID',
      {
        maximumFractionDigits:
          2
      }
    )

  }


const statusClass =
  (status) => {

    if (
      status === 'Normal'
    ) {

      return 'status-normal'

    }


    if (
      status === 'Stunted'
    ) {

      return 'status-stunted'

    }


    if (
      status === 'Severely Stunted'
    ) {

      return 'status-severe'

    }


    return 'status-belum'

  }


/* =========================================================
   CHART
========================================================= */

const statusChartCanvas =
  ref(null)


const percentageChartCanvas =
  ref(null)


let statusChart =
  null


let percentageChart =
  null


const buatChartStatus =
  () => {

    if (
      !statusChartCanvas.value ||
      dataTrenBulanan.value.length === 0
    ) {

      return

    }


    if (statusChart) {

      statusChart.destroy()

    }


    const labels =
      dataTrenBulanan.value.map(
        item => item.label
      )


    const normal =
      dataTrenBulanan.value.map(
        item => item.normal
      )


    const stunted =
      dataTrenBulanan.value.map(
        item => item.stunted
      )


    const severe =
      dataTrenBulanan.value.map(
        item => item.severe
      )


    statusChart =
      new Chart(
        statusChartCanvas.value,
        {

          type: 'bar',

          data: {

            labels,

            datasets: [

              {
                label: 'Normal',
                data: normal,
                backgroundColor: '#22c55e',
                borderRadius: 6
              },

              {
                label: 'Stunted',
                data: stunted,
                backgroundColor: '#f59e0b',
                borderRadius: 6
              },

              {
                label: 'Severely Stunted',
                data: severe,
                backgroundColor: '#ef4444',
                borderRadius: 6
              }

            ]

          },

          options: {

            responsive: true,

            maintainAspectRatio:
              false,

            plugins: {

              legend: {
                position: 'top'
              },

              tooltip: {
                callbacks: {

                  label:
                    context =>
                      `${context.dataset.label}: ${context.parsed.y} anak`

                }
              }

            },

            scales: {

              y: {

                beginAtZero:
                  true,

                ticks: {

                  stepSize:
                    1

                },

                title: {

                  display:
                    true,

                  text:
                    'Jumlah Anak'

                }

              },

              x: {

                title: {

                  display:
                    true,

                  text:
                    'Bulan Pemeriksaan'

                }

              }

            }

          }

        }
      )

  }


const buatChartPersentase =
  () => {

    if (
      !percentageChartCanvas.value ||
      dataTrenBulanan.value.length === 0
    ) {

      return

    }


    if (percentageChart) {

      percentageChart.destroy()

    }


    const labels =
      dataTrenBulanan.value.map(
        item => item.label
      )


    const nilai =
      dataTrenBulanan.value.map(
        item => item.persentase
      )


    percentageChart =
      new Chart(
        percentageChartCanvas.value,
        {

          type: 'line',

          data: {

            labels,

            datasets: [

              {

                label:
                  'Persentase Stunting',

                data:
                  nilai,

                borderColor:
                  '#7c3aed',

                backgroundColor:
                  'rgba(124, 58, 237, 0.12)',

                pointBackgroundColor:
                  '#7c3aed',

                pointBorderColor:
                  '#ffffff',

                pointBorderWidth:
                  2,

                borderWidth:
                  3,

                pointRadius:
                  5,

                pointHoverRadius:
                  7,

                tension:
                  0.35,

                fill:
                  true

              }

            ]

          },

          options: {

            responsive:
              true,

            maintainAspectRatio:
              false,

            plugins: {

              legend: {
                position: 'top'
              },

              tooltip: {

                callbacks: {

                  label:
                    context =>
                      `Persentase: ${context.parsed.y}%`

                }

              }

            },

            scales: {

              y: {

                beginAtZero:
                  true,

                max:
                  100,

                ticks: {

                  callback:
                    value =>
                      `${value}%`

                },

                title: {

                  display:
                    true,

                  text:
                    'Persentase Stunting'

                }

              },

              x: {

                title: {

                  display:
                    true,

                  text:
                    'Bulan Pemeriksaan'

                }

              }

            }

          }

        }
      )

  }


/* =========================================================
   LOAD
========================================================= */

onMounted(
  async () => {

    await ambilDataBalita()

    await hitungSemuaStatusWHO()

    buatChartStatus()

    buatChartPersentase()

  }
)


onBeforeUnmount(
  () => {

    if (statusChart) {

      statusChart.destroy()

      statusChart = null

    }


    if (percentageChart) {

      percentageChart.destroy()

      percentageChart = null

    }

  }
)


/* =========================================================
   LOGOUT
========================================================= */

const logout =
  () => {

    localStorage.removeItem(
      'userLogin'
    )

    router.push(
      '/login'
    )

  }

</script>


<style scoped>

/* =========================================================
   JARAK ANTAR PANEL
========================================================= */

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


/* =========================================================
   PAGINATION
========================================================= */

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


/* =========================================================
   DASHBOARD
========================================================= */

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


/* =========================================================
   KATEGORI
========================================================= */

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


/* =========================================================
   STATUS WHO
========================================================= */

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


/* =========================================================
   BADGE
========================================================= */

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


/* =========================================================
   PEMERIKSAAN TERBARU
========================================================= */

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


/* =========================================================
   MONITORING
========================================================= */

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


/* =========================================================
   SERVICE
========================================================= */

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


/* =========================================================
   EMPTY
========================================================= */

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


/* =========================================================
   CATATAN
========================================================= */

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


/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 1100px) {

  .status-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .category-grid {
    grid-template-columns: 1fr;
  }

  .service-grid {
    grid-template-columns: 1fr;
  }

}

</style>
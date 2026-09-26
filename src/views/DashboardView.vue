<template>

  <div class="app-layout">

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


    <main class="main-content">

      <header class="topbar">

        <div>

          <h2>
            Dashboard
          </h2>

          <p>
            Selamat datang di Posyandu Melati
          </p>

        </div>


        <div
          class="profile-wrapper"
          @click="
            menuProfil = !menuProfil
          "
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

              <span>
                ↪
              </span>

              Keluar

            </button>

          </div>

        </div>

      </header>


      <section class="dashboard-content">


        <!-- WELCOME -->

        <div class="welcome-box">

          <h1>
            Selamat datang,
            {{ namaUser }} 👋
          </h1>

          <p>
            Berikut ringkasan data kesehatan
            Posyandu Melati.
          </p>

        </div>


        <!-- STATISTIK -->

        <div class="stats-grid">


          <div class="stat-card">

            <div class="stat-icon">
              👶
            </div>

            <div>

              <p>
                Jumlah Balita
              </p>

              <h2>
                {{ jumlahBalita }}
              </h2>

              <span>
                Balita terdaftar
              </span>

            </div>

          </div>


          <div class="stat-card">

            <div class="stat-icon">
              🤰
            </div>

            <div>

              <p>
                Jumlah Ibu Hamil
              </p>

              <h2>
                {{ jumlahIbuHamil }}
              </h2>

              <span>
                Ibu hamil terdaftar
              </span>

            </div>

          </div>


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
                Dari seluruh balita
              </span>

            </div>

          </div>

        </div>


        <!-- RINGKASAN + AKSES CEPAT -->

        <div class="dashboard-grid">


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
                Desa/Kelurahan
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
                Kota/Kabupaten
              </span>

              <strong>
                Surabaya
              </strong>

            </div>

          </div>


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
                  Lihat dan kelola data balita
                </small>

              </span>

            </router-link>


            <router-link
              to="/ibu-hamil"
              class="quick-button"
            >

              🤰

              <span>

                <strong>
                  Data Ibu Hamil
                </strong>

                <small>
                  Lihat data ibu hamil
                </small>

              </span>

            </router-link>

          </div>

        </div>


        <!-- GRAFIK STUNTING -->

        <div class="dashboard-panel">

          <div class="panel-header">

            <div>

              <h3>
                Jumlah Stunting per Bulan
              </h3>

              <p>
                Jumlah balita terindikasi stunting
                berdasarkan bulan pemeriksaan
              </p>

            </div>

          </div>


          <div class="chart-container">

            <div
              v-if="
                dataStuntingPerBulan.length === 0
              "
              class="empty-data"
            >

              Belum ada data pemeriksaan.

            </div>


            <div
              v-else
              class="dashboard-chart-wrapper"
            >

              <canvas
                ref="stuntingChartCanvas"
              ></canvas>

            </div>

          </div>

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


import balita, {
  simpanBalita
} from '../data/balita'


import ibuHamil
  from '../data/ibuHamil'


import {
  hitungStatusWHO
} from '../utils/whoGrowth'


import {
  Chart,
  LineController,
  LineElement,
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
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler
)


const router = useRouter()



/*
|--------------------------------------------------------------------------
| USER LOGIN
|--------------------------------------------------------------------------
*/

const user = JSON.parse(
  localStorage.getItem('userLogin')
)


const menuProfil =
  ref(false)



const namaUser =
  computed(() => {

    return user?.nama || 'Kader'

  })



/*
|--------------------------------------------------------------------------
| HITUNG SEMUA STATUS WHO
|--------------------------------------------------------------------------
*/

const hitungSemuaStatusWHO =
  async () => {

    let adaPerubahan =
      false


    for (const anak of balita) {

      if (
        !anak.pemeriksaan ||
        anak.pemeriksaan.length === 0
      ) {

        continue

      }


      for (
        const pemeriksaan
        of anak.pemeriksaan
      ) {

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


        if (hasil.berhasil) {

          if (
            pemeriksaan.status !==
            hasil.status
          ) {

            pemeriksaan.status =
              hasil.status

            adaPerubahan =
              true

          }

        }

      }

    }


    if (adaPerubahan) {

      simpanBalita()

    }

  }



/*
|--------------------------------------------------------------------------
| JUMLAH BALITA
|--------------------------------------------------------------------------
*/

const jumlahBalita =
  computed(() => {

    return balita.length

  })



/*
|--------------------------------------------------------------------------
| JUMLAH IBU HAMIL
|--------------------------------------------------------------------------
*/

const jumlahIbuHamil =
  computed(() => {

    return ibuHamil.length

  })



/*
|--------------------------------------------------------------------------
| JUMLAH STUNTING TERKINI
|--------------------------------------------------------------------------
*/

const jumlahStunting =
  computed(() => {

    let jumlah = 0


    balita.forEach((anak) => {

      if (
        !anak.pemeriksaan ||
        anak.pemeriksaan.length === 0
      ) {

        return

      }


      const pemeriksaanTerbaru =
        [...anak.pemeriksaan]
          .sort(
            (a, b) =>
              new Date(b.tanggal) -
              new Date(a.tanggal)
          )[0]


      if (
        pemeriksaanTerbaru.status ===
          'Stunted' ||

        pemeriksaanTerbaru.status ===
          'Severely Stunted'
      ) {

        jumlah++

      }

    })


    return jumlah

  })



/*
|--------------------------------------------------------------------------
| PERSENTASE STUNTING
|--------------------------------------------------------------------------
*/

const persentaseStunting =
  computed(() => {

    if (
      jumlahBalita.value === 0
    ) {

      return '0%'

    }


    const hasil =
      (
        jumlahStunting.value /
        jumlahBalita.value
      ) * 100


    return `${hasil
      .toFixed(1)
      .replace('.', ',')}%`

  })



/*
|--------------------------------------------------------------------------
| DATA STUNTING PER BULAN
|--------------------------------------------------------------------------
*/

const dataStuntingPerBulan =
  computed(() => {

    const hasil = {}


    balita.forEach((anak) => {

      if (
        !anak.pemeriksaan ||
        anak.pemeriksaan.length === 0
      ) {

        return

      }


      const pemeriksaanPerBulan =
        {}


      anak.pemeriksaan.forEach(
        (pemeriksaan) => {

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

          const [
            tahun,
            bulan
          ] =
            key
              .split('-')
              .map(Number)


          if (!hasil[key]) {

            hasil[key] = {

              tahun,

              bulan:
                bulan - 1,

              jumlah: 0

            }

          }


          if (

            pemeriksaan.status ===
              'Stunted' ||

            pemeriksaan.status ===
              'Severely Stunted'

          ) {

            hasil[key].jumlah++

          }

        }
      )

    })


    return Object
      .values(hasil)

      .sort((a, b) => {

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

      })


      .map((item) => ({

        label:
          new Date(
            item.tahun,
            item.bulan,
            1
          ).toLocaleDateString(
            'id-ID',
            {
              month: 'long',
              year: 'numeric'
            }
          ),

        jumlah:
          item.jumlah

      }))

  })



/*
|--------------------------------------------------------------------------
| CANVAS CHART
|--------------------------------------------------------------------------
*/

const stuntingChartCanvas =
  ref(null)


let stuntingChart =
  null



/*
|--------------------------------------------------------------------------
| BUAT GRAFIK STUNTING
|--------------------------------------------------------------------------
*/

const buatChartStunting =
  () => {

    if (
      !stuntingChartCanvas.value
    ) {

      return

    }


    if (
      dataStuntingPerBulan.value.length === 0
    ) {

      return

    }


    /*
    |--------------------------------------------------------------------------
    | Hapus chart sebelumnya
    |--------------------------------------------------------------------------
    */

    if (stuntingChart) {

      stuntingChart.destroy()

    }


    /*
    |--------------------------------------------------------------------------
    | Label bulan
    |--------------------------------------------------------------------------
    */

    const labels =
      dataStuntingPerBulan.value.map(
        item =>
          item.label
      )


    /*
    |--------------------------------------------------------------------------
    | Nilai jumlah stunting
    |--------------------------------------------------------------------------
    */

    const nilai =
      dataStuntingPerBulan.value.map(
        item =>
          item.jumlah
      )


    /*
    |--------------------------------------------------------------------------
    | GRADASI AREA GRAFIK
    |--------------------------------------------------------------------------
    */

    const ctx =
      stuntingChartCanvas.value
        .getContext('2d')


    const gradient =
      ctx.createLinearGradient(
        0,
        0,
        0,
        320
      )


    gradient.addColorStop(
      0,
      'rgba(124, 58, 237, 0.25)'
    )


    gradient.addColorStop(
      1,
      'rgba(236, 72, 153, 0.02)'
    )


    /*
    |--------------------------------------------------------------------------
    | BUAT LINE CHART
    |--------------------------------------------------------------------------
    */

    stuntingChart =
      new Chart(
        stuntingChartCanvas.value,
        {

          type: 'line',


          data: {

            labels,


            datasets: [

              {

                label:
                  'Jumlah Stunting',

                data:
                  nilai,

                borderColor:
                  '#7c3aed',

                backgroundColor:
                  gradient,

                pointBackgroundColor:
                  '#ec4899',

                pointBorderColor:
                  '#ffffff',

                pointHoverBackgroundColor:
                  '#ec4899',

                pointHoverBorderColor:
                  '#ffffff',

                borderWidth:
                  3,

                pointRadius:
                  6,

                pointHoverRadius:
                  8,

                tension:
                  0.4,

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


            interaction: {

              intersect:
                false,

              mode:
                'index'

            },


            plugins: {

              legend: {

                display:
                  true,

                position:
                  'top',

                labels: {

                  usePointStyle:
                    true,

                  pointStyle:
                    'circle',

                  padding:
                    20,

                  font: {

                    size:
                      13,

                    weight:
                      '600'

                  }

                }

              },


              tooltip: {

                backgroundColor:
                  '#312e81',

                titleColor:
                  '#ffffff',

                bodyColor:
                  '#ffffff',

                padding:
                  12,

                cornerRadius:
                  10,

                displayColors:
                  true,

                callbacks: {

                  label:
                    function(context) {

                      return (
                        `Jumlah: ${context.parsed.y} balita`
                      )

                    }

                }

              }

            },


            scales: {

              y: {

                beginAtZero:
                  true,


                ticks: {

                  stepSize:
                    1,

                  color:
                    '#64748b',

                  padding:
                    8,

                  font: {

                    size:
                      12

                  }

                },


                grid: {

                  color:
                    'rgba(124, 58, 237, 0.10)',

                  drawBorder:
                    false

                },


                title: {

                  display:
                    true,

                  text:
                    'Jumlah Balita',

                  color:
                    '#475569',

                  font: {

                    size:
                      13,

                    weight:
                      '600'

                  }

                }

              },


              x: {

                ticks: {

                  color:
                    '#64748b',

                  padding:
                    8,

                  font: {

                    size:
                      12

                  }

                },


                grid: {

                  color:
                    'rgba(124, 58, 237, 0.06)',

                  drawBorder:
                    false

                },


                title: {

                  display:
                    true,

                  text:
                    'Bulan Pemeriksaan',

                  color:
                    '#475569',

                  font: {

                    size:
                      13,

                    weight:
                      '600'

                  }

                }

              }

            }

          }

        }
      )

  }



/*
|--------------------------------------------------------------------------
| SAAT DASHBOARD DIBUKA
|--------------------------------------------------------------------------
*/

onMounted(async () => {

  await hitungSemuaStatusWHO()

  buatChartStunting()

})



/*
|--------------------------------------------------------------------------
| SAAT MENINGGALKAN DASHBOARD
|--------------------------------------------------------------------------
*/

onBeforeUnmount(() => {

  if (stuntingChart) {

    stuntingChart.destroy()

    stuntingChart =
      null

  }

})



/*
|--------------------------------------------------------------------------
| LOGOUT
|--------------------------------------------------------------------------
*/

const logout = () => {

  localStorage.removeItem(
    'userLogin'
  )

  router.push('/login')

}

</script>



<style scoped>

/*
|--------------------------------------------------------------------------
| PROFILE
|--------------------------------------------------------------------------
*/

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

  box-shadow:
    0 8px 25px rgba(0, 0, 0, 0.10);

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


/*
|--------------------------------------------------------------------------
| JARAK ANTAR CARD
|--------------------------------------------------------------------------
*/

.dashboard-grid {
  margin-bottom: 30px;
}


/*
|--------------------------------------------------------------------------
| WRAPPER GRAFIK
|--------------------------------------------------------------------------
*/

.dashboard-chart-wrapper {
  position: relative;

  width: 100%;

  height: 320px;
}


/*
|--------------------------------------------------------------------------
| TOPBAR
|--------------------------------------------------------------------------
*/

.topbar {
  position: sticky;

  top: 0;

  z-index: 100;

  background: #ffffff;
}

</style>
<template>
  <div class="who-chart-wrapper">

    <div class="who-chart-header">
      <div>
        <h3>Grafik Pertumbuhan WHO</h3>
        <p>
          TB/PB menurut umur berdasarkan WHO Child Growth Standards
        </p>
      </div>

      <div class="who-legend">

        <span class="legend-item">
          <span class="legend-line minus3"></span>
          -3 SD
        </span>

        <span class="legend-item">
          <span class="legend-line minus2"></span>
          -2 SD
        </span>

        <span class="legend-item">
          <span class="legend-line median"></span>
          Median
        </span>

        <span class="legend-item">
          <span class="legend-line plus2"></span>
          +2 SD
        </span>

        <span class="legend-item">
          <span class="legend-line plus3"></span>
          +3 SD
        </span>

        <span class="legend-item">
          <span class="legend-dot"></span>
          Pengukuran anak
        </span>

      </div>
    </div>


    <div class="chart-container">
      <canvas ref="chartCanvas"></canvas>
    </div>


    <div class="who-note">
      <span>●</span>
      Kurva menggunakan data referensi WHO Child Growth Standards.
    </div>

  </div>
</template>


<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import Chart from 'chart.js/auto'

/*
  Data WHO sudah disalin dari package
  @pedi-growth/core ke folder:

  src/data/lhfa-girls-0-5.json
  src/data/lhfa-boys-0-5.json
*/

import girlsData from '../data/lhfa-girls-0-5.json'
import boysData from '../data/lhfa-boys-0-5.json'


const props = defineProps({
  pemeriksaan: {
    type: Array,
    default: () => []
  },

  tanggalLahir: {
    type: String,
    default: ''
  },

  jenisKelamin: {
    type: String,
    default: 'P'
  }
})


const chartCanvas = ref(null)

let chartInstance = null


/* =========================================
   HITUNG UMUR DALAM BULAN
========================================= */

const hitungUmurBulan = (
  tanggalLahir,
  tanggalPemeriksaan
) => {

  if (!tanggalLahir || !tanggalPemeriksaan) {
    return null
  }

  const lahir = new Date(
    `${tanggalLahir}T00:00:00`
  )

  const periksa = new Date(
    `${tanggalPemeriksaan}T00:00:00`
  )

  if (
    Number.isNaN(lahir.getTime()) ||
    Number.isNaN(periksa.getTime())
  ) {
    return null
  }

  const tahun =
    periksa.getFullYear() -
    lahir.getFullYear()

  const bulan =
    periksa.getMonth() -
    lahir.getMonth()

  const hari =
    periksa.getDate() -
    lahir.getDate()

  let umurBulan =
    tahun * 12 + bulan

  if (hari < 0) {
    umurBulan -= 1
  }

  return umurBulan
}


/* =========================================
   RUMUS LMS WHO
========================================= */

const hitungNilaiZ = (
  M,
  S,
  L,
  z
) => {

  if (
    !Number.isFinite(M) ||
    !Number.isFinite(S) ||
    !Number.isFinite(L) ||
    !Number.isFinite(z)
  ) {
    return null
  }

  /*
    Rumus LMS:

    Jika L ≠ 0:

    X = M × (1 + L × S × Z)^(1/L)

    Jika L = 0:

    X = M × exp(S × Z)
  */

  if (L === 0) {

    return (
      M *
      Math.exp(S * z)
    )

  }

  const bagian =
    1 +
    L *
    S *
    z

  if (bagian <= 0) {
    return null
  }

  return (
    M *
    Math.pow(
      bagian,
      1 / L
    )
  )
}


/* =========================================
   PILIH DATA WHO SESUAI JENIS KELAMIN
========================================= */

const getWHOData = () => {

  if (props.jenisKelamin === 'L') {
    return boysData
  }

  return girlsData
}


/* =========================================
   BUAT KURVA WHO
========================================= */

const buatKurvaWHO = (
  zScore
) => {

  const dataWHO =
    getWHOData()

  return dataWHO
    .map(item => {

      const M =
        Number(item.M)

      const S =
        Number(item.S)

      const L =
        Number(item.L)

      const age =
        Number(item.age)

      const nilai =
        hitungNilaiZ(
          M,
          S,
          L,
          zScore
        )

      if (
        nilai === null ||
        !Number.isFinite(nilai)
      ) {
        return null
      }

      return {
        x: age,
        y: Number(
          nilai.toFixed(2)
        )
      }

    })

    .filter(
      item => item !== null
    )
}


/* =========================================
   DATA PENGUKURAN ANAK
========================================= */

const buatDataAnak = () => {

  if (
    !props.tanggalLahir ||
    !props.pemeriksaan ||
    !props.pemeriksaan.length
  ) {
    return []
  }

  return props.pemeriksaan

    .map(item => {

      const tanggal =
        item.tanggal ||
        item.tanggal_pemeriksaan

      const umurBulan =
        hitungUmurBulan(
          props.tanggalLahir,
          tanggal
        )

      const tb =
        item.tb !== null &&
        item.tb !== undefined &&
        item.tb !== ''
          ? Number(item.tb)
          : null

      if (
        umurBulan === null ||
        tb === null ||
        !Number.isFinite(tb) ||
        umurBulan < 0 ||
        umurBulan > 60
      ) {
        return null
      }

      return {
        x: umurBulan,
        y: tb
      }

    })

    .filter(
      item => item !== null
    )

    .sort(
      (a, b) =>
        a.x - b.x
    )
}


/* =========================================
   BUAT CHART
========================================= */

const buatChart = () => {

  if (!chartCanvas.value) {
    return
  }

  if (chartInstance) {

    chartInstance.destroy()

    chartInstance = null
  }

  const ctx =
    chartCanvas.value.getContext(
      '2d'
    )

  const dataAnak =
    buatDataAnak()


  chartInstance = new Chart(
    ctx,
    {

      type: 'line',

      data: {

        datasets: [

          /* =========================
             -3 SD
          ========================= */

          {
            label: '-3 SD',

            data:
              buatKurvaWHO(-3),

            borderColor:
              '#dc2626',

            backgroundColor:
              'transparent',

            borderWidth: 1.5,

            pointRadius: 0,

            pointHoverRadius: 0,

            tension: 0.15,

            fill: false
          },


          /* =========================
             -2 SD
          ========================= */

          {
            label: '-2 SD',

            data:
              buatKurvaWHO(-2),

            borderColor:
              '#f59e0b',

            backgroundColor:
              'transparent',

            borderWidth: 1.5,

            borderDash:
              [6, 4],

            pointRadius: 0,

            pointHoverRadius: 0,

            tension: 0.15,

            fill: false
          },


          /* =========================
             MEDIAN
          ========================= */

          {
            label: 'Median',

            data:
              buatKurvaWHO(0),

            borderColor:
              '#2563eb',

            backgroundColor:
              'transparent',

            borderWidth: 2,

            pointRadius: 0,

            pointHoverRadius: 0,

            tension: 0.15,

            fill: false
          },


          /* =========================
             +2 SD
          ========================= */

          {
            label: '+2 SD',

            data:
              buatKurvaWHO(2),

            borderColor:
              '#f59e0b',

            backgroundColor:
              'transparent',

            borderWidth: 1.5,

            borderDash:
              [6, 4],

            pointRadius: 0,

            pointHoverRadius: 0,

            tension: 0.15,

            fill: false
          },


          /* =========================
             +3 SD
          ========================= */

          {
            label: '+3 SD',

            data:
              buatKurvaWHO(3),

            borderColor:
              '#dc2626',

            backgroundColor:
              'transparent',

            borderWidth: 1.5,

            pointRadius: 0,

            pointHoverRadius: 0,

            tension: 0.15,

            fill: false
          },


          /* =========================
             DATA ANAK
          ========================= */

          {
            label:
              'Pengukuran anak',

            data:
              dataAnak,

            borderColor:
              '#111827',

            backgroundColor:
              '#111827',

            borderWidth: 2,

            pointRadius: 5,

            pointHoverRadius: 7,

            pointBackgroundColor:
              '#111827',

            pointBorderColor:
              '#ffffff',

            pointBorderWidth: 2,

            showLine: true,

            tension: 0.15,

            fill: false
          }

        ]

      },


      options: {

        responsive: true,

        maintainAspectRatio: false,

        interaction: {

          mode: 'nearest',

          intersect: false

        },


        plugins: {

          legend: {

            display: false

          },


          tooltip: {

            callbacks: {

              title(items) {

                if (
                  !items ||
                  !items.length
                ) {
                  return ''
                }

                return (
                  `Umur: ${
                    items[0].parsed.x
                  } bulan`
                )
              },


              label(context) {

                return (
                  `${
                    context.dataset.label
                  }: ${
                    context.parsed.y
                  } cm`
                )
              }

            }

          }

        },


        scales: {

          x: {

            type: 'linear',

            min: 0,

            max: 60,

            title: {

              display: true,

              text:
                'Umur (bulan)'

            },

            ticks: {

              stepSize: 6

            },

            grid: {

              color:
                'rgba(0, 0, 0, 0.06)'

            }

          },


          y: {

            min: 45,

            max: 125,

            title: {

              display: true,

              text:
                'Panjang/Tinggi Badan (cm)'

            },

            ticks: {

              stepSize: 10

            },

            grid: {

              color:
                'rgba(0, 0, 0, 0.06)'

            }

          }

        }

      }

    }
  )
}


/* =========================================
   WATCH PERUBAHAN DATA
========================================= */

watch(

  () => [
    props.pemeriksaan,
    props.tanggalLahir,
    props.jenisKelamin
  ],

  () => {

    setTimeout(() => {

      buatChart()

    }, 50)

  },

  {
    deep: true
  }

)


/* =========================================
   SAAT COMPONENT DIMUAT
========================================= */

onMounted(() => {

  buatChart()

})


/* =========================================
   CLEANUP
========================================= */

onBeforeUnmount(() => {

  if (chartInstance) {

    chartInstance.destroy()

    chartInstance = null

  }

})

</script>


<style scoped>

.who-chart-wrapper {
  width: 100%;
}


.who-chart-header {
  display: flex;

  justify-content:
    space-between;

  align-items:
    flex-start;

  gap: 20px;

  margin-bottom: 15px;
}


.who-chart-header h3 {
  margin: 0 0 5px;

  font-size: 18px;

  color: #1f2937;
}


.who-chart-header p {
  margin: 0;

  font-size: 13px;

  color: #6b7280;
}


.who-legend {
  display: flex;

  flex-wrap: wrap;

  justify-content:
    flex-end;

  gap: 8px 14px;

  font-size: 11px;

  color: #4b5563;
}


.legend-item {
  display: flex;

  align-items: center;

  gap: 5px;

  white-space: nowrap;
}


.legend-line {
  width: 22px;

  height: 2px;

  display: inline-block;
}


.legend-line.minus3,
.legend-line.plus3 {
  background:
    #dc2626;
}


.legend-line.minus2,
.legend-line.plus2 {
  background:
    #f59e0b;
}


.legend-line.median {
  background:
    #2563eb;
}


.legend-dot {
  width: 8px;

  height: 8px;

  border-radius: 50%;

  background:
    #111827;

  display: inline-block;
}


.chart-container {
  position: relative;

  width: 100%;

  height: 360px;
}


.who-note {
  margin-top: 10px;

  font-size: 12px;

  color: #6b7280;
}


.who-note span {
  color: #2563eb;

  margin-right: 5px;
}


@media (max-width: 768px) {

  .who-chart-header {
    flex-direction:
      column;
  }


  .who-legend {
    justify-content:
      flex-start;
  }


  .chart-container {
    height: 320px;
  }

}

</style>
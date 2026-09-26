<template>

  <div class="chart-wrapper">

    <canvas ref="chartCanvas"></canvas>

  </div>

</template>


<script setup>

import {
  ref,
  onMounted,
  onBeforeUnmount,
  watch
} from 'vue'


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


/*
|--------------------------------------------------------------------------
| PROPS
|--------------------------------------------------------------------------
*/

const props = defineProps({

  pemeriksaan: {

    type: Array,

    default: () => []

  },


  jenisData: {

    type: String,

    default: 'tb'

  }

})


/*
|--------------------------------------------------------------------------
| CANVAS
|--------------------------------------------------------------------------
*/

const chartCanvas = ref(null)

let chartInstance = null


/*
|--------------------------------------------------------------------------
| BUAT CHART
|--------------------------------------------------------------------------
*/

const buatChart = () => {

  if (!chartCanvas.value) {

    return

  }


  /*
  |--------------------------------------------------------------------------
  | HAPUS CHART LAMA
  |--------------------------------------------------------------------------
  */

  if (chartInstance) {

    chartInstance.destroy()

    chartInstance = null

  }


  /*
  |--------------------------------------------------------------------------
  | URUTKAN DATA BERDASARKAN TANGGAL
  |--------------------------------------------------------------------------
  */

  const dataUrut = [

    ...props.pemeriksaan

  ]

    .filter(item => item && item.tanggal)

    .sort(

      (a, b) =>

        new Date(a.tanggal) -

        new Date(b.tanggal)

    )


  /*
  |--------------------------------------------------------------------------
  | LABEL TANGGAL
  |--------------------------------------------------------------------------
  */

  const labels = dataUrut.map(item => {

    const tanggal = new Date(item.tanggal)

    if (isNaN(tanggal.getTime())) {

      return '-'

    }


    return tanggal.toLocaleDateString(

      'id-ID',

      {

        month: 'short',

        year: 'numeric'

      }

    )

  })


  /*
  |--------------------------------------------------------------------------
  | LABEL DAN SATUAN
  |--------------------------------------------------------------------------
  */

  let label = 'Tinggi/Panjang Badan'

  let satuan = 'cm'

  let warna = '#16a34a'

  let warnaTitik = '#15803d'

  let warnaArea =
    'rgba(22, 163, 74, 0.10)'


  /*
  |--------------------------------------------------------------------------
  | TB / PB
  |--------------------------------------------------------------------------
  */

  if (props.jenisData === 'tb') {

    label = 'Tinggi/Panjang Badan'

    satuan = 'cm'

    warna = '#16a34a'

    warnaTitik = '#15803d'

    warnaArea =
      'rgba(22, 163, 74, 0.10)'

  }


  /*
  |--------------------------------------------------------------------------
  | BB
  |--------------------------------------------------------------------------
  */

  if (props.jenisData === 'bb') {

    label = 'Berat Badan'

    satuan = 'kg'

    warna = '#2563eb'

    warnaTitik = '#1d4ed8'

    warnaArea =
      'rgba(37, 99, 235, 0.10)'

  }


  /*
  |--------------------------------------------------------------------------
  | LK
  |--------------------------------------------------------------------------
  */

  if (props.jenisData === 'lk') {

    label = 'Lingkar Kepala'

    satuan = 'cm'

    warna = '#9333ea'

    warnaTitik = '#7e22ce'

    warnaArea =
      'rgba(147, 51, 234, 0.10)'

  }


  /*
  |--------------------------------------------------------------------------
  | LILA
  |--------------------------------------------------------------------------
  */

  if (props.jenisData === 'lila') {

    label = 'Lingkar Lengan Atas'

    satuan = 'cm'

    warna = '#f59e0b'

    warnaTitik = '#d97706'

    warnaArea =
      'rgba(245, 158, 11, 0.10)'

  }


  /*
  |--------------------------------------------------------------------------
  | AMBIL NILAI DATA
  |--------------------------------------------------------------------------
  */

  const nilai = dataUrut.map(item => {

    let nilaiData = null


    /*
    |--------------------------------------------------------------------------
    | TB
    |--------------------------------------------------------------------------
    */

    if (props.jenisData === 'tb') {

      nilaiData = item.tb

    }


    /*
    |--------------------------------------------------------------------------
    | BB
    |--------------------------------------------------------------------------
    */

    else if (props.jenisData === 'bb') {

      nilaiData = item.bb

    }


    /*
    |--------------------------------------------------------------------------
    | LK
    |--------------------------------------------------------------------------
    */

    else if (props.jenisData === 'lk') {

      nilaiData = item.lk

    }


    /*
    |--------------------------------------------------------------------------
    | LILA
    |--------------------------------------------------------------------------
    */

    else if (props.jenisData === 'lila') {

      nilaiData = item.lila

    }


    /*
    |--------------------------------------------------------------------------
    | DATA KOSONG
    |--------------------------------------------------------------------------
    */

    if (
      nilaiData === null ||
      nilaiData === undefined ||
      nilaiData === ''
    ) {

      return null

    }


    const angka = Number(nilaiData)


    if (isNaN(angka)) {

      return null

    }


    return angka

  })


  /*
  |--------------------------------------------------------------------------
  | BUAT CHART
  |--------------------------------------------------------------------------
  */

  chartInstance = new Chart(

    chartCanvas.value,

    {

      type: 'line',


      data: {

        labels,


        datasets: [

          {

            label,

            data: nilai,


            borderColor: warna,

            backgroundColor: warnaArea,


            pointBackgroundColor: '#ffffff',

            pointBorderColor: warnaTitik,

            pointHoverBackgroundColor: warnaTitik,

            pointHoverBorderColor: '#ffffff',


            pointRadius: 5,

            pointHoverRadius: 7,


            borderWidth: 3,


            tension: 0.35,


            fill: true,


            spanGaps: true

          }

        ]

      },


      options: {

        responsive: true,


        maintainAspectRatio: false,


        interaction: {

          intersect: false,

          mode: 'index'

        },


        plugins: {

          legend: {

            display: true,

            position: 'top',


            labels: {

              usePointStyle: true,

              pointStyle: 'circle',

              padding: 20,


              font: {

                size: 13,

                weight: '600'

              }

            }

          },


          tooltip: {

            backgroundColor: '#1f2937',

            titleColor: '#ffffff',

            bodyColor: '#ffffff',


            padding: 12,

            cornerRadius: 8,


            displayColors: true,


            callbacks: {

              label: function(context) {

                const nilaiTooltip =
                  context.parsed.y


                return (

                  `${context.dataset.label}: ` +

                  `${nilaiTooltip} ${satuan}`

                )

              }

            }

          }

        },


        scales: {

          y: {

            beginAtZero: false,


            grid: {

              color:
                'rgba(148, 163, 184, 0.18)',

              drawBorder: false

            },


            ticks: {

              color: '#64748b',

              padding: 8,


              font: {

                size: 12

              }

            },


            title: {

              display: true,

              text: satuan,

              color: '#475569',


              font: {

                size: 13,

                weight: '600'

              }

            }

          },


          x: {

            grid: {

              display: false

            },


            ticks: {

              color: '#64748b',

              padding: 8,


              font: {

                size: 12

              }

            },


            title: {

              display: true,

              text: 'Tanggal Pemeriksaan',

              color: '#475569',


              font: {

                size: 13,

                weight: '600'

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
| SAAT COMPONENT DIBUKA
|--------------------------------------------------------------------------
*/

onMounted(() => {

  buatChart()

})


/*
|--------------------------------------------------------------------------
| UPDATE JIKA DATA BERUBAH
|--------------------------------------------------------------------------
*/

watch(

  () => [

    props.pemeriksaan,

    props.jenisData

  ],


  () => {

    buatChart()

  },


  {

    deep: true

  }

)


/*
|--------------------------------------------------------------------------
| CLEANUP
|--------------------------------------------------------------------------
*/

onBeforeUnmount(() => {

  if (chartInstance) {

    chartInstance.destroy()

    chartInstance = null

  }

})

</script>


<style scoped>

.chart-wrapper {

  position: relative;

  width: 100%;

  height: 320px;

  padding: 10px 5px;

}

</style>
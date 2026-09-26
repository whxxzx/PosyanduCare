<template>

  <div class="app-layout">

    <!-- SIDEBAR -->

    <aside class="sidebar">

      <div class="sidebar-logo">

        🏥

        <span>
          PosyanduCare
        </span>

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
            Detail Ibu Hamil
          </h2>

          <p>
            Informasi dan pemantauan kehamilan
          </p>

        </div>

      </header>


      <section class="dashboard-content">


        <!-- KEMBALI -->

        <router-link
          to="/ibu-hamil"
          class="back-link"
        >
          ← Kembali ke Data Ibu Hamil
        </router-link>


        <!-- PROFILE -->

        <div class="profile-header">

          <div class="profile-avatar">
            🤰
          </div>


          <div class="profile-main">

            <div class="profile-name">

              <h1>
                {{ ibu.nama }}
              </h1>


              <span
                :class="
                  ibu.status === 'Risiko Rendah'
                    ? 'status-normal'
                    : 'status-pemantauan'
                "
              >
                {{ ibu.status }}
              </span>

            </div>


            <p>
              Usia kehamilan
              •
              {{ ibu.usiaKehamilan }} minggu
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
                Informasi Ibu Hamil
              </h3>

            </div>


            <div class="info-row">

              <span>
                Nama
              </span>

              <strong>
                {{ ibu.nama }}
              </strong>

            </div>


            <div class="info-row">

              <span>
                Usia Kehamilan
              </span>

              <strong>
                {{ ibu.usiaKehamilan }} minggu
              </strong>

            </div>


            <div class="info-row">

              <span>
                Status
              </span>

              <strong>
                {{ ibu.status }}
              </strong>

            </div>

          </div>


          <!-- KUNJUNGAN -->

          <div class="dashboard-panel last-visit-card">

            <div class="visit-icon">
              📅
            </div>


            <p>
              Pemeriksaan Terakhir
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


        <!-- STATUS KEHAMILAN -->

        <div class="dashboard-panel who-status-panel">

          <div class="panel-header">

            <div>

              <h3>
                Status Pemantauan
              </h3>


              <p class="panel-description">
                Status berdasarkan hasil pemeriksaan terbaru
              </p>

            </div>


            <span
              :class="
                ibu.status === 'Risiko Rendah'
                  ? 'status-normal'
                  : 'status-pending'
              "
            >
              {{ ibu.status }}
            </span>

          </div>


          <div
            v-if="pemeriksaanTerbaru.length > 0"
            class="who-result"
          >


            <div class="who-result-main">

              <div class="who-status-icon">

                {{
                  ibu.status === 'Risiko Rendah'
                    ? '✓'
                    : '!'
                }}

              </div>


              <div>

                <h2>
                  {{ ibu.status }}
                </h2>


                <p>
                  Status ditentukan secara otomatis
                  berdasarkan hasil pemeriksaan terbaru.
                </p>

              </div>

            </div>


            <div class="who-metrics">


              <div class="who-metric">

                <span>
                  Berat Badan
                </span>

                <strong>
                  {{ pemeriksaanTerbaru[0].bb }} kg
                </strong>

              </div>


              <div class="who-metric">

                <span>
                  Tekanan Darah
                </span>

                <strong>
                  {{ pemeriksaanTerbaru[0].tekananDarah }}
                </strong>

              </div>


              <div class="who-metric">

                <span>
                  LILA
                </span>

                <strong>
                  {{ pemeriksaanTerbaru[0].lila }} cm
                </strong>

              </div>


              <div class="who-metric">

                <span>
                  Hb
                </span>

                <strong>
                  {{ pemeriksaanTerbaru[0].hb }} g/dL
                </strong>

              </div>

            </div>


            <div class="who-info">

              <span>
                ℹ️
              </span>


              <p>
                Status ini merupakan indikator pemantauan
                sederhana pada aplikasi dan bukan diagnosis medis.
              </p>

            </div>

          </div>


          <div
            v-else
            class="who-empty"
          >
            Belum ada pemeriksaan.
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
                active: activeTab === 'ringkasan'
              }
            ]"
            @click="activeTab = 'ringkasan'"
          >
            📊 Ringkasan
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
                Riwayat pemeriksaan ibu hamil
              </p>

            </div>

          </div>


          <div class="history-table-spacing">

            <div class="table-container">

              <table>

                <thead>

                  <tr>

                    <th>
                      No
                    </th>

                    <th>
                      Tanggal
                    </th>

                    <th>
                      BB
                    </th>

                    <th>
                      Tekanan Darah
                    </th>

                    <th>
                      LILA
                    </th>

                    <th>
                      Tinggi Fundus
                    </th>

                    <th>
                      Hb
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Aksi
                    </th>

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
                      {{ item.bb }} kg
                    </td>


                    <td>
                      {{ item.tekananDarah }}
                    </td>


                    <td>
                      {{ item.lila }} cm
                    </td>


                    <td>
                      {{ item.tinggiFundus }} cm
                    </td>


                    <td>
                      {{ item.hb }} g/dL
                    </td>


                    <td>

                      <span
                        :class="
                          item.status === 'Risiko Rendah'
                            ? 'status-normal'
                            : 'status-pemantauan'
                        "
                      >
                        {{ item.status }}
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
                      colspan="9"
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
             RINGKASAN
        ========================== -->

        <div
          v-if="activeTab === 'ringkasan'"
          class="dashboard-panel"
        >

          <div class="panel-header">

            <div>

              <h3>
                Ringkasan Pemeriksaan
              </h3>


              <p class="panel-description">
                Informasi pemeriksaan terbaru
              </p>

            </div>

          </div>


          <div
            v-if="pemeriksaanTerbaru.length > 0"
            class="who-metrics"
          >


            <div class="who-metric">

              <span>
                Berat Badan
              </span>

              <strong>
                {{ pemeriksaanTerbaru[0].bb }} kg
              </strong>

            </div>


            <div class="who-metric">

              <span>
                Tekanan Darah
              </span>

              <strong>
                {{ pemeriksaanTerbaru[0].tekananDarah }}
              </strong>

            </div>


            <div class="who-metric">

              <span>
                LILA
              </span>

              <strong>
                {{ pemeriksaanTerbaru[0].lila }} cm
              </strong>

            </div>


            <div class="who-metric">

              <span>
                Tinggi Fundus
              </span>

              <strong>
                {{ pemeriksaanTerbaru[0].tinggiFundus }} cm
              </strong>

            </div>


            <div class="who-metric">

              <span>
                Hb
              </span>

              <strong>
                {{ pemeriksaanTerbaru[0].hb }} g/dL
              </strong>

            </div>

          </div>


          <div
            v-else
            class="who-empty"
          >
            Belum ada data pemeriksaan.
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
              {{ ibu.nama }}
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

              <span>
                *
              </span>

            </label>


            <input
              v-model="form.tanggal"
              type="date"
              required
            />

          </div>


          <!-- BERAT BADAN -->

          <div class="form-group">

            <label>

              Berat Badan (kg)

              <span>
                *
              </span>

            </label>


            <input
              v-model.number="form.bb"
              type="number"
              step="0.1"
              min="20"
              max="150"
              placeholder="Contoh: 55.5"
              required
            />

          </div>


          <!-- TEKANAN DARAH -->

          <div class="form-group">

            <label>

              Tekanan Darah

              <span>
                *
              </span>

            </label>


            <input
              v-model="form.tekananDarah"
              type="text"
              placeholder="Contoh: 120/80"
              required
            />

          </div>


          <!-- LILA -->

          <div class="form-group">

            <label>

              LILA (cm)

              <span>
                *
              </span>

            </label>


            <input
              v-model.number="form.lila"
              type="number"
              step="0.1"
              min="10"
              max="50"
              placeholder="Contoh: 25.5"
              required
            />

          </div>


          <!-- TINGGI FUNDUS -->

          <div class="form-group">

            <label>

              Tinggi Fundus Uteri (cm)

              <span>
                *
              </span>

            </label>


            <input
              v-model.number="form.tinggiFundus"
              type="number"
              step="0.1"
              min="1"
              max="50"
              placeholder="Contoh: 24"
              required
            />

          </div>


          <!-- HB -->

          <div class="form-group">

            <label>

              Hb (g/dL)

              <span>
                *
              </span>

            </label>


            <input
              v-model.number="form.hb"
              type="number"
              step="0.1"
              min="1"
              max="20"
              placeholder="Contoh: 12"
              required
            />

          </div>


          <!-- INFO -->

          <div class="form-info">

            <span>
              ℹ️
            </span>


            <p>

              Status akan ditentukan otomatis berdasarkan
              hasil pemeriksaan yang dimasukkan.

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
  computed
} from 'vue'


import {
  useRoute
} from 'vue-router'


import ibuHamil, {
  simpanIbuHamil
} from '../data/ibuHamil'


/*
|--------------------------------------------------------------------------
| ROUTER
|--------------------------------------------------------------------------
*/

const route = useRoute()


const id = Number(
  route.params.id
)


/*
|--------------------------------------------------------------------------
| DATA IBU HAMIL
|--------------------------------------------------------------------------
*/

const ibu = ibuHamil.find(
  item => item.id === id
)


/*
|--------------------------------------------------------------------------
| TAB
|--------------------------------------------------------------------------
*/

const activeTab =
  ref('histori')


/*
|--------------------------------------------------------------------------
| MODAL
|--------------------------------------------------------------------------
*/

const showModal =
  ref(false)


const mode =
  ref('tambah')


/*
|--------------------------------------------------------------------------
| FORM
|--------------------------------------------------------------------------
*/

const form = ref({

  id: null,

  tanggal: '',

  bb: '',

  tekananDarah: '',

  lila: '',

  tinggiFundus: '',

  hb: ''

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

    bb: '',

    tekananDarah: '',

    lila: '',

    tinggiFundus: '',

    hb: ''

  }

}


/*
|--------------------------------------------------------------------------
| HISTORI
|--------------------------------------------------------------------------
*/

const pemeriksaanTerbaru =
  computed(() => {

    if (!ibu?.pemeriksaan) {

      return []

    }


    return [
      ...ibu.pemeriksaan
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
| BUKA FORM TAMBAH
|--------------------------------------------------------------------------
*/

const bukaFormTambah = () => {

  mode.value =
    'tambah'


  resetForm()


  showModal.value =
    true

}


/*
|--------------------------------------------------------------------------
| BUKA FORM EDIT
|--------------------------------------------------------------------------
*/

const bukaFormEdit = (
  item
) => {

  mode.value =
    'edit'


  form.value = {

    id:
      item.id,

    tanggal:
      item.tanggal,

    bb:
      item.bb,

    tekananDarah:
      item.tekananDarah,

    lila:
      item.lila,

    tinggiFundus:
      item.tinggiFundus,

    hb:
      item.hb

  }


  showModal.value =
    true

}


/*
|--------------------------------------------------------------------------
| TUTUP MODAL
|--------------------------------------------------------------------------
*/

const tutupModal = () => {

  showModal.value =
    false

}


/*
|--------------------------------------------------------------------------
| HITUNG STATUS OTOMATIS
|--------------------------------------------------------------------------
*/

const hitungStatus = (
  pemeriksaan
) => {

  const tekanan =
    pemeriksaan.tekananDarah
      .replace(/\s/g, '')
      .split('/')


  const sistolik =
    Number(tekanan[0])


  const diastolik =
    Number(tekanan[1])


  if (

    Number.isNaN(sistolik) ||

    Number.isNaN(diastolik)

  ) {

    return 'Butuh Pemantauan'

  }


  if (

    sistolik >= 140 ||

    diastolik >= 90 ||

    Number(pemeriksaan.lila) < 23.5 ||

    Number(pemeriksaan.hb) < 10

  ) {

    return 'Butuh Pemantauan'

  }


  return 'Risiko Rendah'

}


/*
|--------------------------------------------------------------------------
| VALIDASI TEKANAN DARAH
|--------------------------------------------------------------------------
*/

const formatTekananDarahValid =
  (nilai) => {

    const hasil =
      nilai
        .replace(/\s/g, '')
        .match(/^(\d{2,3})\/(\d{2,3})$/)


    return hasil

  }


/*
|--------------------------------------------------------------------------
| SIMPAN PEMERIKSAAN
|--------------------------------------------------------------------------
*/

const simpanPemeriksaan = () => {


  /*
  |--------------------------------------------------------------------------
  | VALIDASI DASAR
  |--------------------------------------------------------------------------
  */

  if (

    !form.value.tanggal ||

    !form.value.bb ||

    !form.value.tekananDarah ||

    !form.value.lila ||

    !form.value.tinggiFundus ||

    !form.value.hb

  ) {

    alert(
      'Semua data pemeriksaan harus diisi.'
    )


    return

  }


  /*
  |--------------------------------------------------------------------------
  | VALIDASI TEKANAN DARAH
  |--------------------------------------------------------------------------
  */

  const tekananValid =
    formatTekananDarahValid(

      form.value.tekananDarah

    )


  if (!tekananValid) {

    alert(
      'Format tekanan darah harus seperti 120/80.'
    )


    return

  }


  /*
  |--------------------------------------------------------------------------
  | DATA PEMERIKSAAN
  |--------------------------------------------------------------------------
  */

  const dataPemeriksaan = {

    id:

      mode.value === 'tambah'

        ? Date.now()

        : form.value.id,


    tanggal:
      form.value.tanggal,


    bb:
      Number(form.value.bb),


    tekananDarah:

      form.value.tekananDarah
        .replace(/\s/g, ''),


    lila:
      Number(form.value.lila),


    tinggiFundus:
      Number(form.value.tinggiFundus),


    hb:
      Number(form.value.hb)

  }


  /*
  |--------------------------------------------------------------------------
  | HITUNG STATUS
  |--------------------------------------------------------------------------
  */

  dataPemeriksaan.status =
    hitungStatus(
      dataPemeriksaan
    )


  /*
  |--------------------------------------------------------------------------
  | MODE TAMBAH
  |--------------------------------------------------------------------------
  */

  if (
    mode.value === 'tambah'
  ) {

    ibu.pemeriksaan.push(
      dataPemeriksaan
    )

  }


  /*
  |--------------------------------------------------------------------------
  | MODE EDIT
  |--------------------------------------------------------------------------
  */

  else {

    const index =
      ibu.pemeriksaan.findIndex(

        item =>
          item.id ===
          form.value.id

      )


    if (index !== -1) {

      ibu.pemeriksaan[index] =
        dataPemeriksaan

    }

  }


  /*
  |--------------------------------------------------------------------------
  | STATUS IBU MENGIKUTI PEMERIKSAAN TERBARU
  |--------------------------------------------------------------------------
  */

  const terbaru =
    [...ibu.pemeriksaan]
      .sort(

        (a, b) =>
          new Date(b.tanggal) -
          new Date(a.tanggal)

      )[0]


  if (terbaru) {

    ibu.status =
      hitungStatus(
        terbaru
      )

  }


  /*
  |--------------------------------------------------------------------------
  | SIMPAN
  |--------------------------------------------------------------------------
  */

  simpanIbuHamil()


  showModal.value =
    false


  alert(
    `Pemeriksaan berhasil disimpan.\nStatus: ${ibu.status}`
  )

}


/*
|--------------------------------------------------------------------------
| HAPUS PEMERIKSAAN
|--------------------------------------------------------------------------
*/

const hapusPemeriksaan = (
  item
) => {

  const yakin =
    confirm(

      `Hapus pemeriksaan tanggal ${formatTanggal(item.tanggal)}?`

    )


  if (!yakin) {

    return

  }


  const index =
    ibu.pemeriksaan.findIndex(

      pemeriksaan =>
        pemeriksaan.id ===
        item.id

    )


  if (index !== -1) {

    ibu.pemeriksaan.splice(
      index,
      1
    )

  }


  /*
  |--------------------------------------------------------------------------
  | HITUNG ULANG STATUS
  |--------------------------------------------------------------------------
  */

  const terbaru =
    [...ibu.pemeriksaan]
      .sort(

        (a, b) =>
          new Date(b.tanggal) -
          new Date(a.tanggal)

      )[0]


  if (terbaru) {

    ibu.status =
      hitungStatus(
        terbaru
      )

  }

  else {

    ibu.status =
      'Risiko Rendah'

  }


  simpanIbuHamil()

}


/*
|--------------------------------------------------------------------------
| FORMAT TANGGAL
|--------------------------------------------------------------------------
*/

const formatTanggal = (
  tanggal
) => {

  return new Date(
    tanggal
  ).toLocaleDateString(

    'id-ID',

    {

      day: '2-digit',

      month: 'long',

      year: 'numeric'

    }

  )

}

</script>


<style scoped>

/* =========================
   HEADER DETAIL IBU HAMIL
========================= */

.profile-header {
  align-items: flex-start;
}


.profile-main {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: left;
}


.profile-name {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: left;
  gap: 7px;
  width: 100%;
}


.profile-name h1 {
  margin: 0;
  padding: 0;
  text-align: left;
}


.profile-name .status-normal,
.profile-name .status-pemantauan {
  display: inline-block;
  width: fit-content;
  text-align: left;
  line-height: 1.2;
}


.profile-main > p {
  margin-left: 0;
  text-align: left;
}


.status-pemantauan {
  padding: 6px 12px;
  border-radius: 20px;
  background: #fee2e2;
  color: #dc2626;
  font-weight: 600;
}


/* =========================
   JARAK TABEL HISTORI
========================= */

.history-table-spacing {
  margin-top: 30px;
  margin-bottom: 30px;
  position: relative;
  display: block;
  width: 100%;
}



</style>
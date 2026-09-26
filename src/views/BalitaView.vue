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

      <!-- TOPBAR -->
      <header class="topbar">

        <div>
          <h2>Data Balita</h2>
          <p>Data balita Posyandu Melati</p>
        </div>

      </header>


      <!-- CONTENT -->
      <section class="dashboard-content">

        <!-- HEADER -->
        <div class="page-header">

          <div>
            <h1>Data Balita</h1>

            <p>
              Cari dan lihat informasi balita.
            </p>
          </div>

          <button
            class="primary-button"
            @click="bukaFormTambah"
          >
            + Tambah Balita
          </button>

        </div>


        <!-- SEARCH -->
        <div class="search-box">

          <span>🔍</span>

          <input
            v-model="search"
            type="text"
            placeholder="Cari nama balita..."
          />

        </div>


        <!-- JUMLAH HASIL -->
        <p class="result-info">

          Menampilkan {{ filteredBalita.length }}
          dari {{ balita.length }} balita

        </p>


        <!-- TABLE -->
        <div class="table-container">

          <table>

            <thead>

              <tr>

                <th>
                  No
                </th>

                <th>
                  Nama Balita
                </th>

                <th>
                  Jenis Kelamin
                </th>

                <th>
                  Umur
                </th>

                <th>
                  Kunjungan Terakhir
                </th>

                <th>
                  Aksi
                </th>

              </tr>

            </thead>


            <tbody>

              <tr
                v-for="(anak, index) in filteredBalita"
                :key="anak.id"
              >

                <!-- NOMOR -->
                <td>
                  {{ index + 1 }}
                </td>


                <!-- NAMA BALITA + STATUS -->
                <td>

                  <div class="child-name">

                    <div class="child-avatar">
                      👶
                    </div>


                    <div class="child-info">

                      <strong class="child-name-text">
                        {{ anak.nama }}
                      </strong>


                      <span
                        :class="
                          statusBalita(anak) === 'Normal'
                            ? 'status-normal'
                            : 'status-pending'
                        "
                      >
                        {{ statusBalita(anak) }}
                      </span>

                    </div>

                  </div>

                </td>


                <!-- JENIS KELAMIN -->
                <td>

                  {{
                    anak.jenisKelamin === 'L'
                      ? 'Laki-laki'
                      : 'Perempuan'
                  }}

                </td>


                <!-- UMUR -->
                <td>

                  {{ hitungUmur(anak.tanggalLahir) }}

                </td>


                <!-- KUNJUNGAN TERAKHIR -->
                <td>

                  {{ kunjunganTerakhir(anak) }}

                </td>


                <!-- AKSI -->
                <td>

                  <button
                    class="action-button"
                    @click="lihatDetail(anak.id)"
                  >
                    Lihat
                  </button>

                  <button
                    class="action-button"
                    @click="bukaFormEdit(anak)"
                  >
                    Edit
                  </button>

                </td>

              </tr>


              <!-- JIKA DATA TIDAK DITEMUKAN -->
              <tr
                v-if="filteredBalita.length === 0"
              >

                <td
                  colspan="6"
                  class="empty-data"
                >

                  <div>
                    🔍
                  </div>

                  <strong>
                    Data balita tidak ditemukan
                  </strong>

                  <p>
                    Coba gunakan nama balita yang lain.
                  </p>

                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </section>

    </main>


    <!-- MODAL TAMBAH BALITA -->
    <div
      v-if="showModal"
      class="modal-overlay"
      @click.self="tutupForm"
    >

      <div class="modal-box">

        <div class="modal-header">

          <div>

            <h2>
              {{
                modeForm === 'tambah'
                  ? 'Tambah Balita'
                  : 'Edit Balita'
              }}
            </h2>

            <p>
              {{
                modeForm === 'tambah'
                  ? 'Masukkan data balita baru.'
                  : 'Ubah data balita.'
              }}
            </p>

          </div>


          <button
            class="modal-close"
            @click="tutupForm"
          >
            ✕
          </button>

        </div>


        <form
          @submit.prevent="simpanDataBalita"
        >

          <!-- NAMA -->
          <div class="form-group">

            <label>
              Nama Balita
            </label>

            <input
              v-model="form.nama"
              type="text"
              placeholder="Masukkan nama balita"
            />

          </div>


          <!-- JENIS KELAMIN -->
          <div class="form-group">

            <label>
              Jenis Kelamin
            </label>

            <select
              v-model="form.jenisKelamin"
            >

              <option value="">
                Pilih jenis kelamin
              </option>

              <option value="L">
                Laki-laki
              </option>

              <option value="P">
                Perempuan
              </option>

            </select>

          </div>


          <!-- TANGGAL LAHIR -->
          <div class="form-group">

            <label>
              Tanggal Lahir
            </label>

            <input
              v-model="form.tanggalLahir"
              type="date"
              :max="tanggalHariIni"
            />

          </div>


          <!-- NAMA IBU -->
          <div class="form-group">

            <label>
              Nama Ibu
            </label>

            <input
              v-model="form.namaIbu"
              type="text"
              placeholder="Masukkan nama ibu"
            />

          </div>


          <!-- ALAMAT -->
          <div class="form-group">

            <label>
              Alamat
            </label>

            <textarea
              v-model="form.alamat"
              rows="3"
              placeholder="Masukkan alamat"
            ></textarea>

          </div>


          <!-- ERROR -->
          <div
            v-if="errorForm"
            class="form-error"
          >

            {{ errorForm }}

          </div>


          <!-- BUTTON -->
          <div class="modal-actions">

            <button
              type="button"
              class="secondary-button"
              @click="tutupForm"
            >
              Batal
            </button>


            <button
              type="submit"
              class="primary-button"
            >

              {{
                modeForm === 'tambah'
                  ? 'Simpan Balita'
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
  computed,
  reactive,
  onMounted
} from 'vue'

import {
  useRouter
} from 'vue-router'


const router = useRouter()


/*
|--------------------------------------------------------------------------
| DATA
|--------------------------------------------------------------------------
*/

const balita = ref([])

const search = ref('')

const showModal = ref(false)

const errorForm = ref('')

const modeForm = ref('tambah')

const editId = ref(null)

const loading = ref(false)


/*
|--------------------------------------------------------------------------
| FORM TAMBAH / EDIT BALITA
|--------------------------------------------------------------------------
*/

const form = reactive({

  nama: '',

  jenisKelamin: '',

  tanggalLahir: '',

  namaIbu: '',

  alamat: ''

})


/*
|--------------------------------------------------------------------------
| TANGGAL HARI INI
|--------------------------------------------------------------------------
*/

const tanggalHariIni =
  computed(() => {

    const tanggal =
      new Date()

    const tahun =
      tanggal.getFullYear()

    const bulan =
      String(
        tanggal.getMonth() + 1
      ).padStart(2, '0')

    const hari =
      String(
        tanggal.getDate()
      ).padStart(2, '0')

    return `${tahun}-${bulan}-${hari}`

  })


/*
|--------------------------------------------------------------------------
| AMBIL DATA BALITA DARI MYSQL
|--------------------------------------------------------------------------
*/

const ambilDataBalita =
  async () => {

    try {

      loading.value = true

      const response =
        await fetch(
          'http://localhost:3000/api/balita'
        )

      const hasil =
        await response.json()

      if (!response.ok || !hasil.berhasil) {

        throw new Error(
          hasil.pesan ||
          'Gagal mengambil data balita.'
        )

      }

      const dataBalita =
        hasil.data.map((anak) => ({

          id:
            anak.id,

          nama:
            anak.nama,

          jenisKelamin:
            anak.jenis_kelamin,

          tanggalLahir:
            anak.tanggal_lahir
              ? anak.tanggal_lahir
                  .substring(0, 10)
              : '',

          namaIbu:
            anak.nama_ibu || '',

          alamat:
            anak.alamat || '',

          bbLahir:
            anak.bb_lahir,

          pbLahir:
            anak.pb_lahir,

          pemeriksaan:
            []

        }))


      /*
      |--------------------------------------------------------------------------
      | AMBIL PEMERIKSAAN SETIAP BALITA
      |--------------------------------------------------------------------------
      */

      const dataLengkap =
        await Promise.all(

          dataBalita.map(
            async (anak) => {

              try {

                const responsePemeriksaan =
                  await fetch(
                    `http://localhost:3000/api/balita/${anak.id}/pemeriksaan`
                  )

                const hasilPemeriksaan =
                  await responsePemeriksaan.json()

                if (
                  responsePemeriksaan.ok &&
                  hasilPemeriksaan.berhasil
                ) {

                  anak.pemeriksaan =
                    hasilPemeriksaan.data.map(
                      (item) => ({

                        id:
                          item.id,

                        tanggal:
                          item.tanggal_pemeriksaan
                            ? item.tanggal_pemeriksaan
                                .substring(0, 10)
                            : '',

                        bb:
                          item.bb,

                        tb:
                          item.tb,

                        lila:
                          item.lila,

                        lk:
                          item.lk

                      })
                    )

                }

              } catch (error) {

                console.error(
                  `Gagal mengambil pemeriksaan balita ${anak.id}:`,
                  error
                )

                anak.pemeriksaan = []

              }

              return anak

            }
          )

        )


      balita.value =
        dataLengkap

    } catch (error) {

      console.error(
        'Gagal mengambil data balita:',
        error
      )

      errorForm.value =
        'Data balita gagal dimuat. Pastikan backend dan MySQL sedang berjalan.'

    } finally {

      loading.value = false

    }

  }


/*
|--------------------------------------------------------------------------
| LOAD DATA SAAT HALAMAN DIBUKA
|--------------------------------------------------------------------------
*/

onMounted(() => {

  ambilDataBalita()

})


/*
|--------------------------------------------------------------------------
| SEARCH BALITA
|--------------------------------------------------------------------------
*/

const filteredBalita =
  computed(() => {

    const keyword =
      search.value
        .toLowerCase()
        .trim()


    if (!keyword) {

      return balita.value

    }


    return balita.value.filter(
      (anak) =>

        anak.nama
          .toLowerCase()
          .includes(keyword)

    )

  })


/*
|--------------------------------------------------------------------------
| HITUNG UMUR
|--------------------------------------------------------------------------
*/

const hitungUmur =
  (tanggalLahir) => {

    if (!tanggalLahir) {

      return '-'

    }


    const lahir =
      new Date(tanggalLahir)

    const sekarang =
      new Date()


    let tahun =
      sekarang.getFullYear() -
      lahir.getFullYear()


    let bulan =
      sekarang.getMonth() -
      lahir.getMonth()


    if (
      bulan < 0 ||
      (
        bulan === 0 &&
        sekarang.getDate() <
        lahir.getDate()
      )
    ) {

      tahun--

      bulan += 12

    }


    if (tahun > 0) {

      return `${tahun} tahun`

    }


    return `${bulan} bulan`

  }


/*
|--------------------------------------------------------------------------
| KUNJUNGAN TERAKHIR
|--------------------------------------------------------------------------
*/

const kunjunganTerakhir =
  (anak) => {

    if (
      !anak.pemeriksaan ||
      anak.pemeriksaan.length === 0
    ) {

      return '-'

    }


    const tanggal =
      anak.pemeriksaan
        .map(
          item =>
            new Date(item.tanggal)
        )
        .sort(
          (a, b) => b - a
        )[0]


    if (!tanggal) {

      return '-'

    }


    return tanggal.toLocaleDateString(
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
| STATUS PERTUMBUHAN BALITA
|--------------------------------------------------------------------------
*/

const statusBalita =
  (anak) => {

    if (
      !anak.pemeriksaan ||
      anak.pemeriksaan.length === 0
    ) {

      return 'Belum diperiksa'

    }


    const pemeriksaanTerbaru =
      [...anak.pemeriksaan]
        .sort(
          (a, b) =>
            new Date(b.tanggal) -
            new Date(a.tanggal)
        )[0]


    return (
      pemeriksaanTerbaru.status ||
      'Belum dihitung'
    )

  }


/*
|--------------------------------------------------------------------------
| DETAIL BALITA
|--------------------------------------------------------------------------
*/

const lihatDetail =
  (id) => {

    router.push(
      `/balita/${id}`
    )

  }


/*
|--------------------------------------------------------------------------
| BUKA FORM TAMBAH
|--------------------------------------------------------------------------
*/

const bukaFormTambah = () => {

  modeForm.value =
    'tambah'

  editId.value =
    null

  errorForm.value =
    ''


  form.nama =
    ''

  form.jenisKelamin =
    ''

  form.tanggalLahir =
    ''

  form.namaIbu =
    ''

  form.alamat =
    ''


  showModal.value =
    true

}


/*
|--------------------------------------------------------------------------
| BUKA FORM EDIT
|--------------------------------------------------------------------------
*/

const bukaFormEdit =
  (anak) => {

    modeForm.value =
      'edit'

    editId.value =
      anak.id

    errorForm.value =
      ''


    form.nama =
      anak.nama

    form.jenisKelamin =
      anak.jenisKelamin

    form.tanggalLahir =
      anak.tanggalLahir

    form.namaIbu =
      anak.namaIbu || ''

    form.alamat =
      anak.alamat


    showModal.value =
      true

  }


/*
|--------------------------------------------------------------------------
| TUTUP FORM
|--------------------------------------------------------------------------
*/

const tutupForm = () => {

  showModal.value =
    false

  errorForm.value =
    ''

}


/*
|--------------------------------------------------------------------------
| SIMPAN DATA BALITA
|--------------------------------------------------------------------------
*/

const simpanDataBalita =
  async () => {

    errorForm.value =
      ''


    /*
    |--------------------------------------------------------------------------
    | VALIDASI
    |--------------------------------------------------------------------------
    */

    if (
      !form.nama.trim() ||
      !form.jenisKelamin ||
      !form.tanggalLahir ||
      !form.alamat.trim()
    ) {

      errorForm.value =
        'Nama, jenis kelamin, tanggal lahir, dan alamat wajib diisi.'

      return

    }


    try {

      /*
      |--------------------------------------------------------------------------
      | MODE TAMBAH
      |--------------------------------------------------------------------------
      */

      if (
        modeForm.value ===
        'tambah'
      ) {

        const response =
          await fetch(
            'http://localhost:3000/api/balita',
            {
              method: 'POST',

              headers: {
                'Content-Type':
                  'application/json'
              },

              body:
                JSON.stringify({

                  nama:
                    form.nama.trim(),

                  jenis_kelamin:
                    form.jenisKelamin,

                  tanggal_lahir:
                    form.tanggalLahir,

                  alamat:
                    form.alamat.trim(),

                  nama_ibu:
                    form.namaIbu.trim() ||
                    null

                })

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
            'Gagal menambahkan data balita.'
          )

        }


        tutupForm()

        await ambilDataBalita()

        alert(
          'Data balita berhasil ditambahkan.'
        )

        return

      }


      /*
      |--------------------------------------------------------------------------
      | MODE EDIT
      |--------------------------------------------------------------------------
      */

      const response =
        await fetch(
          `http://localhost:3000/api/balita/${editId.value}`,
          {
            method: 'PUT',

            headers: {
              'Content-Type':
                'application/json'
            },

            body:
              JSON.stringify({

                nama:
                  form.nama.trim(),

                jenis_kelamin:
                  form.jenisKelamin,

                tanggal_lahir:
                  form.tanggalLahir,

                alamat:
                  form.alamat.trim(),

                nama_ibu:
                  form.namaIbu.trim() ||
                  null

              })

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
          'Gagal memperbarui data balita.'
        )

      }


      tutupForm()

      await ambilDataBalita()

      alert(
        'Data balita berhasil diperbarui.'
      )

    } catch (error) {

      console.error(
        'Simpan Balita Error:',
        error
      )

      errorForm.value =
        error.message ||
        'Terjadi kesalahan saat menyimpan data balita.'

    }

  }

</script>


<style scoped>

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-box {
  width: 100%;
  max-width: 520px;
  max-height: 90vh;
  overflow-y: auto;
  background: white;
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.modal-header h2 {
  margin: 0 0 5px;
}

.modal-header p {
  margin: 0;
  color: #6b7280;
  font-size: 14px;
}

.modal-close {
  border: none;
  background: transparent;
  font-size: 20px;
  cursor: pointer;
  color: #6b7280;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 7px;
  font-weight: 600;
  font-size: 14px;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-family: inherit;
  font-size: 14px;
  box-sizing: border-box;
}

.form-group textarea {
  resize: vertical;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #4f46e5;
}

.form-error {
  padding: 10px 12px;
  margin-bottom: 16px;
  background: #fef2f2;
  color: #dc2626;
  border-radius: 8px;
  font-size: 14px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.secondary-button {
  border: 1px solid #d1d5db;
  background: white;
  color: #374151;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

.secondary-button:hover {
  background: #f9fafb;
}

.action-button + .action-button {
  margin-left: 8px;
}


/* =========================
   NAMA BALITA + STATUS
========================= */

.child-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 7px;
}

.child-name-text {
  line-height: 1.3;
}

.child-info .status-normal,
.child-info .status-pending {
  display: inline-block;
  width: fit-content;
  line-height: 1.2;
}

</style>
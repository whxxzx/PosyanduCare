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

        <router-link
          to="/balita"
          class="active"
        >
          🧒 Balita
        </router-link>

        <router-link to="/pra-sekolah">
          🎒 Pra Sekolah
        </router-link>

      </nav>

    </aside>


    <!-- MAIN CONTENT -->
    <main class="main-content">

      <!-- TOPBAR -->
      <header class="topbar">

        <div>

          <h2>
            Data Balita
          </h2>

          <p>
            Data anak usia 12–59 bulan
          </p>

        </div>


        <!-- PROFILE -->
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


      <!-- CONTENT -->
      <section class="page-content">

        <!-- PAGE HEADER -->
        <div class="page-header">

          <div>

            <h1>
              Data Balita
            </h1>

            <p>
              Menampilkan anak dengan usia
              12–59 bulan secara otomatis.
            </p>

          </div>


          <button
            class="btn-primary"
            @click="bukaFormTambah"
          >
            + Tambah Data Anak
          </button>

        </div>


        <!-- INFO KATEGORI -->
        <div class="category-info">

          <div class="category-icon">
            🧒
          </div>

          <div>

            <strong>
              Kategori Balita
            </strong>

            <p>
              Anak berusia 12–59 bulan akan otomatis
              masuk ke halaman ini berdasarkan tanggal lahir.
            </p>

          </div>

        </div>


        <!-- SEARCH -->
        <div class="search-box">

          <span>
            🔍
          </span>

          <input
            v-model="search"
            type="text"
            placeholder="Cari nama balita..."
          />

        </div>


        <!-- JUMLAH DATA -->
        <p class="result-info">

          Total
          <strong>
            {{ filteredBalita.length }}
          </strong>
          balita

        </p>


        <!-- DATA TABLE -->
        <div
          v-if="filteredBalita.length > 0"
          class="data-card"
        >

          <div class="table-header">

            <div>

              <h3>
                Daftar Balita
              </h3>

              <p>
                Menampilkan balita usia 12–59 bulan
              </p>

            </div>

          </div>


          <div class="table-wrapper">

            <table>

              <thead>

                <tr>

                  <th>
                    No
                  </th>

                  <th>
                    Nama Anak
                  </th>

                  <th>
                    Jenis Kelamin
                  </th>

                  <th>
                    Tanggal Lahir
                  </th>

                  <th>
                    Umur
                  </th>

                  <th>
                    Nama Ibu
                  </th>

                  <th>
                    Alamat
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
                  v-for="(
                    anak,
                    index
                  ) in filteredBalita"
                  :key="anak.id"
                >

                  <!-- NO -->
                  <td>
                    {{ index + 1 }}
                  </td>


                  <!-- NAMA -->
                  <td>

                    <strong>
                      {{ anak.nama }}
                    </strong>

                  </td>


                  <!-- JENIS KELAMIN -->
                  <td>

                    <span
                      class="gender-badge"
                      :class="
                        anak.jenisKelamin === 'L'
                          ? 'male'
                          : 'female'
                      "
                    >

                      {{
                        anak.jenisKelamin === 'L'
                          ? 'Laki-laki'
                          : 'Perempuan'
                      }}

                    </span>

                  </td>


                  <!-- TANGGAL LAHIR -->
                  <td>

                    {{ formatTanggal(
                      anak.tanggalLahir
                    ) }}

                  </td>


                  <!-- UMUR -->
                  <td>

                    <span class="age-badge">

                      {{
                        formatUmurAnak(
                          anak.tanggalLahir
                        )
                      }}

                    </span>

                  </td>


                  <!-- NAMA IBU -->
                  <td>

                    {{ anak.namaIbu || '-' }}

                  </td>


                  <!-- ALAMAT -->
                  <td>

                    {{ anak.alamat || '-' }}

                  </td>


                  <!-- KUNJUNGAN -->
                  <td>

                    {{ kunjunganTerakhir(
                      anak
                    ) }}

                  </td>


                  <!-- AKSI -->
                  <td>

                    <div class="action-buttons">

                      <button
                        class="btn-view"
                        @click="lihatDetail(
                          anak.id
                        )"
                      >
                        Lihat
                      </button>

                      <button
                        class="btn-edit"
                        @click="bukaFormEdit(
                          anak
                        )"
                      >
                        Edit
                      </button>

                    </div>

                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>


        <!-- EMPTY STATE -->
        <div
          v-else
          class="empty-state"
        >

          <div class="empty-icon">
            🧒
          </div>

          <h3>
            Belum ada data balita
          </h3>

          <p>
            Belum terdapat anak dengan usia
            12–59 bulan pada data Posyandu.
          </p>

          <button
            class="btn-primary"
            @click="bukaFormTambah"
          >
            + Tambah Data Anak
          </button>

        </div>

      </section>

    </main>


    <!-- MODAL -->
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
                  ? 'Tambah Data Anak'
                  : 'Edit Data Anak'
              }}

            </h2>

            <p>

              {{
                modeForm === 'tambah'
                  ? 'Masukkan data anak baru.'
                  : 'Ubah informasi data anak.'
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
              Nama Anak
            </label>

            <input
              v-model="form.nama"
              type="text"
              placeholder="Masukkan nama anak"
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


          <!-- ACTION -->
          <div class="modal-actions">

            <button
              type="button"
              class="btn-cancel"
              @click="tutupForm"
            >
              Batal
            </button>

            <button
              type="submit"
              class="btn-primary"
            >

              {{
                modeForm === 'tambah'
                  ? 'Simpan Data'
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
  computed,
  onMounted,
  reactive,
  ref
} from 'vue'

import {
  useRouter
} from 'vue-router'

import {
  tentukanKategoriAnak,
  formatUmurAnak
} from '../utils/kategoriAnak'


/* =========================================================
   ROUTER
========================================================= */

const router =
  useRouter()


/* =========================================================
   USER
========================================================= */

const user =
  JSON.parse(
    localStorage.getItem(
      'userLogin'
    )
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

const balita =
  ref([])


const search =
  ref('')


const showModal =
  ref(false)


const errorForm =
  ref('')


const modeForm =
  ref('tambah')


const editId =
  ref(null)


const sedangMemuat =
  ref(false)


/* =========================================================
   FORM
========================================================= */

const form =
  reactive({

    nama: '',

    jenisKelamin: '',

    tanggalLahir: '',

    namaIbu: '',

    alamat: ''

  })


/* =========================================================
   TANGGAL HARI INI
========================================================= */

const tanggalHariIni =
  computed(() => {

    const sekarang =
      new Date()

    const tahun =
      sekarang.getFullYear()

    const bulan =
      String(
        sekarang.getMonth() + 1
      ).padStart(
        2,
        '0'
      )

    const hari =
      String(
        sekarang.getDate()
      ).padStart(
        2,
        '0'
      )

    return `${tahun}-${bulan}-${hari}`

  })


/* =========================================================
   AMBIL DATA BALITA
========================================================= */

const ambilDataBalita =
  async () => {

    try {

      sedangMemuat.value =
        true


      const response =
        await fetch(
          'http://localhost:3000/api/anak'
        )


      if (!response.ok) {

        throw new Error(
          'Gagal mengambil data balita.'
        )

      }


      const hasil =
        await response.json()


      const data =
        Array.isArray(
          hasil.data
        )
          ? hasil.data
          : []


      /*
       * Normalisasi data
       */

      const dataBalita =
        data.map(
          anak => ({

            id:
              anak.id,

            nama:
              anak.nama,

            jenisKelamin:
              anak.jenis_kelamin,

            tanggalLahir:
              anak.tanggal_lahir
                ? String(
                    anak.tanggal_lahir
                  ).substring(
                    0,
                    10
                  )
                : '',

            namaIbu:
              anak.nama_ibu || '',

            alamat:
              anak.alamat || '',

            pemeriksaan:
              []

          })
        )


      /*
       * Ambil pemeriksaan masing-masing anak
       */

      const dataLengkap =
        await Promise.all(

          dataBalita.map(
            async anak => {

              try {

                const responsePemeriksaan =
                  await fetch(
                    `http://localhost:3000/api/anak/${anak.id}/pemeriksaan`
                  )


                if (
                  !responsePemeriksaan.ok
                ) {

                  return anak

                }


                const hasilPemeriksaan =
                  await responsePemeriksaan.json()


                const dataPemeriksaan =
                  Array.isArray(
                    hasilPemeriksaan.data
                  )
                    ? hasilPemeriksaan.data
                    : []


                anak.pemeriksaan =
                  dataPemeriksaan.map(
                    item => ({

                      id:
                        item.id,

                      tanggal:
                        item.tanggal_pemeriksaan
                          ? String(
                              item.tanggal_pemeriksaan
                            ).substring(
                              0,
                              10
                            )
                          : '',

                      bb:
                        item.bb,

                      tb:
                        item.tb,

                      lk:
                        item.lk,

                      lila:
                        item.lila,

                      imunisasi:
                        item.imunisasi,

                      vitamin_a:
                        item.vitamin_a,

                      obat_cacing:
                        item.obat_cacing

                    })
                  )

              }
              catch (error) {

                console.error(
                  `Gagal mengambil pemeriksaan anak ${anak.id}:`,
                  error
                )

              }


              return anak

            }
          )

        )


      /*
       * FILTER KHUSUS BALITA
       *
       * 0–11  = Bayi
       * 12–59 = Balita
       * 60–72 = Pra Sekolah
       */

      balita.value =
        dataLengkap.filter(
          anak =>
            tentukanKategoriAnak(
              anak.tanggalLahir
            ) === 'Balita'
        )

    }
    catch (error) {

      console.error(
        'Gagal mengambil data:',
        error
      )

      balita.value =
        []

      errorForm.value =
        'Data balita gagal dimuat.'

    }
    finally {

      sedangMemuat.value =
        false

    }

  }


/* =========================================================
   SEARCH
========================================================= */

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
      anak =>
        anak.nama
          .toLowerCase()
          .includes(
            keyword
          )
    )

  })


/* =========================================================
   FORMAT TANGGAL
========================================================= */

const formatTanggal =
  tanggal => {

    if (!tanggal) {

      return '-'

    }


    const tanggalString =
      String(tanggal)
        .substring(
          0,
          10
        )


    const [
      tahun,
      bulan,
      hari
    ] =
      tanggalString.split('-')


    if (
      !tahun ||
      !bulan ||
      !hari
    ) {

      return '-'

    }


    return `${hari}-${bulan}-${tahun}`

  }


/* =========================================================
   KUNJUNGAN TERAKHIR
========================================================= */

const kunjunganTerakhir =
  anak => {

    if (
      !anak.pemeriksaan ||
      anak.pemeriksaan.length === 0
    ) {

      return '-'

    }


    const tanggalTerakhir =
      [...anak.pemeriksaan]
        .filter(
          item =>
            item.tanggal
        )
        .sort(
          (a, b) =>
            new Date(
              b.tanggal
            ) -
            new Date(
              a.tanggal
            )
        )[0]


    if (!tanggalTerakhir) {

      return '-'

    }


    return formatTanggal(
      tanggalTerakhir.tanggal
    )

  }


/* =========================================================
   DETAIL
========================================================= */

const lihatDetail =
  id => {

    router.push(
      `/balita/${id}`
    )

  }


/* =========================================================
   TAMBAH
========================================================= */

const bukaFormTambah =
  () => {

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


/* =========================================================
   EDIT
========================================================= */

const bukaFormEdit =
  anak => {

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
      anak.alamat || ''


    showModal.value =
      true

  }


/* =========================================================
   TUTUP MODAL
========================================================= */

const tutupForm =
  () => {

    showModal.value =
      false

    errorForm.value =
      ''

  }


/* =========================================================
   SIMPAN DATA
========================================================= */

const simpanDataBalita =
  async () => {

    errorForm.value =
      ''


    /*
     * VALIDASI
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


    /*
     * TAMBAH
     */

    if (
      modeForm.value ===
      'tambah'
    ) {

      try {

        const response =
          await fetch(
            'http://localhost:3000/api/anak',
            {
              method:
                'POST',

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
            'Gagal menambahkan data.'
          )

        }


        tutupForm()

        await ambilDataBalita()

        alert(
          'Data anak berhasil ditambahkan.'
        )

      }
      catch (error) {

        console.error(
          error
        )

        errorForm.value =
          error.message ||
          'Gagal menambahkan data.'

      }


      return

    }


    /*
     * EDIT
     */

    try {

      const response =
        await fetch(
          `http://localhost:3000/api/anak/${editId.value}`,
          {
            method:
              'PUT',

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
          'Gagal memperbarui data.'
        )

      }


      tutupForm()

      await ambilDataBalita()

      alert(
        'Data anak berhasil diperbarui.'
      )

    }
    catch (error) {

      console.error(
        error
      )

      errorForm.value =
        error.message ||
        'Gagal memperbarui data.'

    }

  }


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


/* =========================================================
   LOAD
========================================================= */

onMounted(
  () => {

    ambilDataBalita()

  }
)

</script>


<style scoped>

/* =========================================================
   CONTENT
========================================================= */

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

  box-shadow:
    0 8px 25px rgba(0, 0, 0, 0.1);

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


.profile-dropdown-header > div:last-child {
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
  margin-bottom: 20px;

  background: #eff6ff;

  border: 1px solid #bfdbfe;

  border-radius: 12px;
}


.category-icon {
  width: 45px;
  height: 45px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px;

  background: #dbeafe;

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
   SEARCH
========================================================= */

.search-box {
  display: flex;
  align-items: center;
  gap: 10px;

  width: 100%;
  max-width: 450px;

  margin-bottom: 10px;

  padding: 10px 14px;

  background: white;

  border: 1px solid #e5e7eb;

  border-radius: 9px;

  box-sizing: border-box;
}


.search-box span {
  font-size: 16px;
}


.search-box input {
  width: 100%;

  border: none;
  outline: none;

  font-size: 14px;

  background: transparent;
}


.result-info {
  margin: 0 0 12px;

  color: #64748b;

  font-size: 13px;
}


/* =========================================================
   BUTTON
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
   ACTION
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
   EMPTY
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


.empty-icon {
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
   MODAL
========================================================= */

.modal-overlay {
  position: fixed;

  inset: 0;

  display: flex;

  align-items: center;
  justify-content: center;

  padding: 20px;

  background: rgba(
    0,
    0,
    0,
    0.45
  );

  z-index: 1000;
}


.modal-box {
  width: 100%;
  max-width: 520px;

  max-height: 90vh;

  overflow-y: auto;

  padding: 24px;

  box-sizing: border-box;

  background: white;

  border-radius: 14px;

  box-shadow:
    0 20px 50px
    rgba(
      0,
      0,
      0,
      0.2
    );
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

  color: #64748b;

  font-size: 14px;
}


.modal-close {
  border: none;

  background: transparent;

  color: #64748b;

  font-size: 20px;

  cursor: pointer;
}


.form-group {
  margin-bottom: 16px;
}


.form-group label {
  display: block;

  margin-bottom: 7px;

  font-size: 14px;

  font-weight: 600;
}


.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;

  padding: 10px 12px;

  box-sizing: border-box;

  border: 1px solid #d1d5db;

  border-radius: 8px;

  font-family: inherit;

  font-size: 14px;
}


.form-group textarea {
  resize: vertical;
}


.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;

  border-color: #2563eb;
}


.form-error {
  padding: 10px 12px;

  margin-bottom: 16px;

  background: #fef2f2;

  color: #dc2626;

  border-radius: 8px;

  font-size: 13px;
}


.modal-actions {
  display: flex;

  justify-content: flex-end;

  gap: 10px;

  margin-top: 20px;
}


.btn-cancel {
  padding: 10px 16px;

  border: 1px solid #d1d5db;

  border-radius: 8px;

  background: white;

  color: #374151;

  cursor: pointer;

  font-weight: 600;
}


.btn-cancel:hover {
  background: #f8fafc;
}

</style>
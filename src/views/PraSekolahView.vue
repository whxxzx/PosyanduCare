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

        <router-link
          to="/pra-sekolah"
          class="active"
        >
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
            Data Pra Sekolah
          </h2>

          <p>
            Data anak usia 60–72 bulan
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


        <!-- HEADER -->

        <div class="page-header">

          <div>

            <h1>
              Data Pra Sekolah
            </h1>

            <p>
              Menampilkan anak dengan usia
              60–72 bulan secara otomatis.
            </p>

          </div>


          <button
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

            <strong>
              Kategori Pra Sekolah
            </strong>

            <p>
              Anak berusia 60–72 bulan akan otomatis
              masuk ke halaman ini berdasarkan tanggal lahir.
            </p>

          </div>

        </div>


        <!-- LOADING -->

        <div
          v-if="sedangMemuat"
          class="empty-state"
        >

          <div class="loading-icon">
            ⏳
          </div>

          <p>
            Memuat data pra sekolah...
          </p>

        </div>


        <!-- EMPTY -->

        <div
          v-else-if="dataPraSekolah.length === 0"
          class="empty-state"
        >

          <div class="empty-icon">
            🎒
          </div>

          <h3>
            Belum ada data pra sekolah
          </h3>

          <p>
            Belum terdapat anak dengan usia
            60–72 bulan pada data Posyandu.
          </p>

          <button
            class="btn-primary"
            @click="tambahAnak"
          >
            + Tambah Data Anak
          </button>

        </div>


        <!-- TABLE -->

        <div
          v-else
          class="data-card"
        >

          <div class="table-header">

            <div>

              <h3>
                Daftar Pra Sekolah
              </h3>

              <p>
                Total {{ dataPraSekolah.length }} anak
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
                    Aksi
                  </th>

                </tr>

              </thead>


              <tbody>

                <tr
                  v-for="(
                    anak,
                    index
                  ) in dataPraSekolah"
                  :key="anak.id"
                >

                  <td>
                    {{ index + 1 }}
                  </td>


                  <td>

                    <strong>
                      {{ anak.nama }}
                    </strong>

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
                    {{ formatTanggal(
                      anak.tanggal_lahir
                    ) }}
                  </td>


                  <td>

                    <span class="age-badge">
                      {{ formatUmurAnak(
                        anak.tanggal_lahir
                      ) }}
                    </span>

                  </td>


                  <td>
                    {{ anak.nama_ibu || '-' }}
                  </td>


                  <td>
                    {{ anak.alamat || '-' }}
                  </td>


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
                        @click="editAnak(
                          anak.id
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


      </section>

    </main>

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

const dataPraSekolah =
  ref([])


const sedangMemuat =
  ref(true)


/* =========================================================
   AMBIL DATA
========================================================= */

const ambilDataPraSekolah =
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
       * Kategori dihitung otomatis
       * berdasarkan tanggal lahir.
       */

      dataPraSekolah.value =
        data.filter(
          anak =>
            tentukanKategoriAnak(
              anak.tanggal_lahir
            ) === 'Pra Sekolah'
        )

    }
    catch (error) {

      console.error(
        'Gagal mengambil data pra sekolah:',
        error
      )


      dataPraSekolah.value =
        []

    }
    finally {

      sedangMemuat.value =
        false

    }

  }


/* =========================================================
   FORMAT TANGGAL
========================================================= */

const formatTanggal =
  (tanggal) => {

    if (!tanggal) {
      return '-'
    }


    const tanggalString =
      String(tanggal)
        .substring(0, 10)


    const [
      tahun,
      bulan,
      hari
    ] =
      tanggalString.split('-')


    return `${hari}-${bulan}-${tahun}`

  }


/* =========================================================
   DETAIL
========================================================= */

const lihatDetail =
  (id) => {

    router.push(
      `/pra-sekolah/${id}`
    )

  }


/* =========================================================
   EDIT
========================================================= */

const editAnak =
  (id) => {

    /*
     * Untuk sementara tetap menggunakan
     * halaman CRUD yang sudah ada.
     */

    router.push({
      path: '/balita',
      query: {
        edit: id
      }
    })

  }


/* =========================================================
   TAMBAH
========================================================= */

const tambahAnak =
  () => {

    /*
     * Form tambah yang sudah ada tetap digunakan.
     * Kategori akan dihitung otomatis setelah
     * tanggal lahir disimpan.
     */

    router.push(
      '/balita'
    )

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

    ambilDataPraSekolah()

  }
)

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
   TOPBAR
========================================================= */

.topbar {
  position: sticky;
  top: 0;

  z-index: 100;

  background: #ffffff;
}

</style>

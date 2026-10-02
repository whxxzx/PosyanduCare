<template>
  <div class="app-layout">

    <!-- =========================
         SIDEBAR
    ========================== -->
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

        <router-link to="/pra-sekolah">
          🎒 Pra Sekolah
        </router-link>

      </nav>

    </aside>


    <!-- =========================
         MAIN CONTENT
    ========================== -->
    <main class="main-content">

      <!-- =========================
           TOPBAR
      ========================== -->
      <header class="topbar">

        <div>
          <h2>Data Bayi</h2>

          <p>
            Data bayi usia 0–11 bulan
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


          <!-- DROPDOWN PROFILE -->
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


      <!-- =========================
           PAGE CONTENT
      ========================== -->
      <section class="page-content">


        <!-- PAGE HEADER -->
        <div class="page-header">

          <div>

            <h1>
              Data Bayi
            </h1>

            <p>
              Menampilkan anak dengan usia
              0–11 bulan secara otomatis.
            </p>

          </div>


          <button
            class="primary-button"
            @click="tambahBayi"
          >
            + Tambah Data Bayi
          </button>

        </div>


        <!-- =========================
             INFO KATEGORI
        ========================== -->
        <div class="category-info">

          <div class="category-icon">
            👶
          </div>

          <div>

            <strong>
              Kategori Bayi
            </strong>

            <p>
              Anak berusia 0–11 bulan akan otomatis
              masuk ke halaman ini berdasarkan tanggal lahir.
            </p>

          </div>

        </div>


        <!-- =========================
             LOADING
        ========================== -->
        <div
          v-if="sedangMemuat"
          class="empty-state"
        >

          <div class="loading-icon">
            ⏳
          </div>

          <p>
            Memuat data bayi...
          </p>

        </div>


        <!-- =========================
             DATA KOSONG
        ========================== -->
        <div
          v-else-if="dataBayi.length === 0"
          class="empty-state"
        >

          <div class="empty-icon">
            👶
          </div>

          <h3>
            Belum ada data bayi
          </h3>

          <p>
            Belum terdapat anak dengan usia
            0–11 bulan pada data Posyandu.
          </p>

          <button
            class="primary-button"
            @click="tambahBayi"
          >
            + Tambah Data Bayi
          </button>

        </div>


        <!-- =========================
             DATA BAYI
        ========================== -->
        <div
          v-else
          class="table-container"
        >

          <div class="table-header">

            <div>

              <h3>
                Daftar Bayi
              </h3>

              <p>
                Total {{ dataBayi.length }} anak
              </p>

            </div>

          </div>


          <div class="table-wrapper">

            <table>

              <thead>

                <tr>

                  <th>No</th>

                  <th>Nama Anak</th>

                  <th>Jenis Kelamin</th>

                  <th>Tanggal Lahir</th>

                  <th>Umur</th>

                  <th>Nama Ibu</th>

                  <th>Alamat</th>

                  <th>Aksi</th>

                </tr>

              </thead>


              <tbody>

                <tr
                  v-for="(bayi, index) in dataBayi"
                  :key="bayi.id"
                >

                  <td>
                    {{ index + 1 }}
                  </td>


                  <td>

                    <strong>
                      {{ bayi.nama }}
                    </strong>

                  </td>


                  <td>

                    <span
                      class="gender-badge"
                      :class="
                        bayi.jenis_kelamin === 'L'
                          ? 'male'
                          : 'female'
                      "
                    >

                      {{
                        bayi.jenis_kelamin === 'L'
                          ? 'Laki-laki'
                          : 'Perempuan'
                      }}

                    </span>

                  </td>


                  <td>

                    {{
                      formatTanggal(
                        bayi.tanggal_lahir
                      )
                    }}

                  </td>


                  <td>

                    <span class="age-badge">

                      {{
                        formatUmurAnak(
                          bayi.tanggal_lahir
                        )
                      }}

                    </span>

                  </td>


                  <td>
                    {{ bayi.nama_ibu || '-' }}
                  </td>


                  <td>
                    {{ bayi.alamat || '-' }}
                  </td>


                  <td>

                    <div class="action-buttons">

                      <button
                        class="btn-view"
                        @click="
                          lihatDetail(
                            bayi.id
                          )
                        "
                      >
                        Lihat
                      </button>


                      <button
                        class="btn-edit"
                        @click="
                          editBayi(
                            bayi.id
                          )
                        "
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


const router = useRouter()


/* =========================
   USER
========================= */

const user =
  JSON.parse(
    localStorage.getItem(
      'userLogin'
    ) || 'null'
  )


const menuProfil = ref(false)


const namaUser = computed(() => {

  return user?.nama || 'Kader'

})


/* =========================
   DATA
========================= */

const dataBayi = ref([])

const sedangMemuat = ref(true)


/* =========================
   AMBIL DATA
========================= */

const ambilDataBayi = async () => {

  try {

    sedangMemuat.value = true


    const response =
      await fetch(
        'http://localhost:3000/api/anak'
      )


    if (!response.ok) {

      throw new Error(
        'Gagal mengambil data balita'
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

    dataBayi.value =
      data.filter(
        anak =>
          tentukanKategoriAnak(
            anak.tanggal_lahir
          ) === 'Bayi'
      )

  }

  catch (error) {

    console.error(
      'Gagal mengambil data bayi:',
      error
    )

    dataBayi.value = []

  }

  finally {

    sedangMemuat.value = false

  }

}


/* =========================
   FORMAT TANGGAL
========================= */

const formatTanggal = (tanggal) => {

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


/* =========================
   LIHAT DETAIL
========================= */

const lihatDetail = (id) => {

  router.push(
    `/bayi/${id}`
  )

}


/* =========================
   EDIT
========================= */

const editBayi = (id) => {

  router.push({

    path: '/balita',

    query: {
      edit: id
    }

  })

}


/* =========================
   TAMBAH
========================= */

const tambahBayi = () => {

  router.push(
    '/balita'
  )

}


/* =========================
   LOGOUT
========================= */

const logout = () => {

  localStorage.removeItem(
    'userLogin'
  )


  router.push(
    '/login'
  )

}


/* =========================
   LOAD
========================= */

onMounted(() => {

  ambilDataBayi()

})

</script>


<style scoped>

/*
|--------------------------------------------------------------------------
| PENTING
|--------------------------------------------------------------------------
|
| Tidak ada CSS untuk:
| .sidebar
| .sidebar-logo
| .posyandu-name
| .sidebar nav
| .main-content
| .topbar
| .profile-wrapper
|
| Semua mengikuti main.css.
|--------------------------------------------------------------------------
*/


.page-content {
  padding: 30px;
}


/* =========================
   CATEGORY INFO
========================= */

.category-info {

  display: flex;

  align-items: center;

  gap: 15px;

  padding: 18px 20px;

  margin-bottom: 25px;

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

  flex-shrink: 0;

}


.category-info strong {

  display: block;

  margin-bottom: 4px;

  color: #1e293b;

}


.category-info p {

  margin: 0;

  color: #64748b;

  font-size: 13px;

  line-height: 1.5;

}


/* =========================
   TABLE
========================= */

.table-wrapper {

  width: 100%;

  overflow-x: auto;

}


table {

  width: 100%;

  min-width: 950px;

}


/* =========================
   GENDER
========================= */

.gender-badge {

  display: inline-flex;

  align-items: center;

  padding: 5px 10px;

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


/* =========================
   UMUR
========================= */

.age-badge {

  display: inline-flex;

  align-items: center;

  padding: 5px 10px;

  border-radius: 20px;

  background: #dcfce7;

  color: #15803d;

  font-size: 12px;

  font-weight: 600;

}


/* =========================
   ACTION
========================= */

.action-buttons {

  display: flex;

  align-items: center;

  gap: 8px;

}


.btn-view {

  padding: 7px 12px;

  border: 1px solid #bfdbfe;

  border-radius: 7px;

  background: #eff6ff;

  color: #2563eb;

  cursor: pointer;

  font-size: 12px;

  font-weight: 600;

}


.btn-view:hover {

  background: #dbeafe;

}


.btn-edit {

  padding: 7px 12px;

  border: 1px solid #fed7aa;

  border-radius: 7px;

  background: #fff7ed;

  color: #ea580c;

  cursor: pointer;

  font-size: 12px;

  font-weight: 600;

}


.btn-edit:hover {

  background: #ffedd5;

}


/* =========================
   EMPTY
========================= */

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

  padding: 30px;

}


.empty-icon,
.loading-icon {

  font-size: 40px;

}


.empty-state h3 {

  margin: 5px 0;

  color: #1e293b;

}


.empty-state p {

  margin: 0 0 10px;

  color: #64748b;

  font-size: 14px;

}

</style>

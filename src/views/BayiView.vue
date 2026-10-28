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
    @click="lihatDetail(bayi.id)"
  >
    Lihat
  </button>

  <button
    class="btn-edit"
    @click="editBayi(bayi.id)"
  >
    Edit
  </button>

  <button
    class="btn-delete"
    :disabled="sedangMenghapusId === bayi.id"
    @click="hapusBayi(bayi)"
  >
    {{ sedangMenghapusId === bayi.id ? 'Menghapus...' : 'Hapus' }}
  </button>

</div>


                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </section>

     <!-- MODAL TAMBAH DATA BAYI -->
<div
  v-if="modalTambahBayi"
  class="modal-overlay"
  @click.self="tutupModalTambah"
>
  <div class="modal-box">
    <div class="modal-header">
      <div>
        <h2>Tambah Data Bayi</h2>
        <p>Lengkapi informasi bayi yang akan didaftarkan.</p>
      </div>

      <button
        type="button"
        class="modal-close"
        @click="tutupModalTambah"
        :disabled="sedangMenyimpanBayi"
      >
        &times;
      </button>
    </div>

    <form @submit.prevent="simpanBayi">
      <div class="form-group">
        <label for="nama-bayi">Nama Anak <span>*</span></label>
        <input
          id="nama-bayi"
          v-model.trim="formBayi.nama"
          type="text"
          placeholder="Masukkan nama anak"
          required
        />
      </div>

      <div class="form-group">
        <label for="jenis-kelamin-bayi">
          Jenis Kelamin <span>*</span>
        </label>

        <select
          id="jenis-kelamin-bayi"
          v-model="formBayi.jenis_kelamin"
          required
        >
          <option value="" disabled>Pilih jenis kelamin</option>
          <option value="L">Laki-laki</option>
          <option value="P">Perempuan</option>
        </select>
      </div>

      <div class="form-group">
        <label for="tanggal-lahir-bayi">
          Tanggal Lahir <span>*</span>
        </label>

        <input
          id="tanggal-lahir-bayi"
          v-model="formBayi.tanggal_lahir"
          type="date"
          :max="tanggalHariIni"
          required
        />

        <small>
          Bayi harus berusia 0–11 bulan berdasarkan tanggal lahir.
        </small>
      </div>

      <div class="form-group">
        <label for="nama-ibu-bayi">Nama Ibu</label>
        <input
          id="nama-ibu-bayi"
          v-model.trim="formBayi.nama_ibu"
          type="text"
          placeholder="Masukkan nama ibu"
        />
      </div>

      <div class="form-group">
        <label for="alamat-bayi">Alamat</label>
        <textarea
          id="alamat-bayi"
          v-model.trim="formBayi.alamat"
          rows="3"
          placeholder="Masukkan alamat lengkap"
        ></textarea>
      </div>

      <p v-if="pesanFormBayi" class="form-error">
        {{ pesanFormBayi }}
      </p>

      <div class="modal-actions">
        <button
          type="button"
          class="btn-cancel"
          :disabled="sedangMenyimpanBayi"
          @click="tutupModalTambah"
        >
          Batal
        </button>

        <button
          type="submit"
          class="btn-primary"
          :disabled="sedangMenyimpanBayi"
        >
          {{ sedangMenyimpanBayi ? 'Menyimpan...' : 'Simpan Data' }}
        </button>
      </div>
    </form>
  </div>
</div>

    </main>

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


const sedangMenghapusId = ref(null)

const hapusBayi = async (bayi) => {
  const konfirmasi = window.confirm(
    `Apakah data bayi "${bayi.nama}" akan dihapus? Data yang sudah dihapus tidak dapat dipulihkan.`
  )

  if (!konfirmasi) return

  try {
    sedangMenghapusId.value = bayi.id

    const response = await fetch(
      `http://localhost:3000/api/anak/${bayi.id}`,
      {
        method: 'DELETE'
      }
    )

    const hasil = await response.json().catch(() => ({}))

    if (!response.ok || hasil.berhasil === false) {
      throw new Error(
        hasil.pesan || 'Data bayi gagal dihapus.'
      )
    }

    alert(hasil.pesan || 'Data bayi berhasil dihapus.')

    await ambilDataBayi()
  } catch (error) {
    console.error('Gagal menghapus data bayi:', error)

    alert(
      error.message || 'Terjadi kesalahan saat menghapus data bayi.'
    )
  } finally {
    sedangMenghapusId.value = null
  }
}

const modalTambahBayi = ref(false)
const sedangMenyimpanBayi = ref(false)
const pesanFormBayi = ref('')

const formBayi = reactive({
  nama: '',
  jenis_kelamin: '',
  tanggal_lahir: '',
  nama_ibu: '',
  alamat: ''
})

const tanggalHariIni = new Date().toLocaleDateString('en-CA')


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
  pesanFormBayi.value = ''
  modalTambahBayi.value = true
}

const resetFormBayi = () => {
  formBayi.nama = ''
  formBayi.jenis_kelamin = ''
  formBayi.tanggal_lahir = ''
  formBayi.nama_ibu = ''
  formBayi.alamat = ''
  pesanFormBayi.value = ''
}

const tutupModalTambah = () => {
  if (sedangMenyimpanBayi.value) return
  modalTambahBayi.value = false
  resetFormBayi()
}

const simpanBayi = async () => {
  pesanFormBayi.value = ''

  if (!formBayi.tanggal_lahir) {
    pesanFormBayi.value = 'Tanggal lahir wajib diisi.'
    return
  }

  if (tentukanKategoriAnak(formBayi.tanggal_lahir) !== 'Bayi') {
    pesanFormBayi.value = 'Tanggal lahir tersebut tidak termasuk kategori bayi usia 0–11 bulan.'
    return
  }

  try {
    sedangMenyimpanBayi.value = true

    const response = await fetch('http://localhost:3000/api/anak', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nama: formBayi.nama,
        jenis_kelamin: formBayi.jenis_kelamin,
        tanggal_lahir: formBayi.tanggal_lahir,
        alamat: formBayi.alamat,
        nama_ibu: formBayi.nama_ibu
      })
    })

    const hasil = await response.json().catch(() => ({}))

    if (!response.ok || hasil.berhasil === false) {
      throw new Error(hasil.pesan || 'Data bayi gagal disimpan.')
    }

    alert(hasil.pesan || 'Data bayi berhasil ditambahkan.')
    modalTambahBayi.value = false
    resetFormBayi()
    await ambilDataBayi()
  } catch (error) {
    console.error('Gagal menyimpan data bayi:', error)
    pesanFormBayi.value = error.message || 'Terjadi kesalahan saat menyimpan data bayi.'
  } finally {
    sedangMenyimpanBayi.value = false
  }
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

/* =========================
   MODAL TAMBAH DATA BAYI
========================= */

.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.45);
  overflow-y: auto;
}

.modal-box {
  width: 100%;
  max-width: 520px;
  max-height: 90vh;
  overflow-y: auto;
  background: #ffffff;
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.15);
}

.modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h2 {
  margin: 0 0 6px;
  color: #1e293b;
  font-size: 20px;
  font-weight: 700;
}

.modal-header p {
  margin: 0;
  color: #64748b;
  font-size: 13px;
  line-height: 1.5;
}

.modal-close {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: #64748b;
  font-size: 25px;
  cursor: pointer;
}

.modal-close:hover {
  background: #f1f5f9;
  color: #1e293b;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 7px;
  color: #334155;
  font-size: 14px;
  font-weight: 600;
}

.form-group label span {
  color: #dc2626;
}

.form-group input,
.form-group select,
.form-group textarea {
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #ffffff;
  color: #1e293b;
  font-family: inherit;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-group input,
.form-group select {
  min-height: 42px;
}

.form-group textarea {
  min-height: 85px;
  resize: vertical;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.form-group small {
  display: block;
  margin-top: 6px;
  color: #64748b;
  font-size: 12px;
  line-height: 1.5;
}

.form-error {
  margin: 0 0 16px;
  padding: 10px 12px;
  border: 1px solid #fecaca;
  border-radius: 8px;
  background: #fef2f2;
  color: #b91c1c;
  font-size: 13px;
  line-height: 1.5;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  margin-top: 24px;
  padding-top: 18px;
  border-top: 1px solid #e5e7eb;
}

.btn-cancel,
.btn-primary {
  min-height: 40px;
  padding: 10px 18px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
}

.btn-cancel {
  border: 1px solid #d1d5db;
  background: #ffffff;
  color: #475569;
}

.btn-cancel:hover {
  background: #f8fafc;
}

.btn-primary {
  border: 1px solid #4f46e5;
  background: #4f46e5;
  color: #ffffff;
}

.btn-primary:hover {
  background: #4338ca;
  border-color: #4338ca;
}

.btn-cancel:disabled,
.btn-primary:disabled,
.modal-close:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 480px) {
  .modal-overlay {
    padding: 12px;
  }

  .modal-box {
    padding: 18px;
  }

  .modal-actions {
    flex-direction: column-reverse;
    align-items: stretch;
  }

  .modal-actions button {
    width: 100%;
  }
}

/* =========================
   PERAPIAN HALAMAN DATA BAYI
========================= */
.page-content {
  padding: 28px 32px 36px;
  max-width: 1600px;
  margin: 0 auto;
  box-sizing: border-box;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 22px;
}

.page-header h1 {
  margin: 0 0 7px;
  color: #1e293b;
  font-size: 26px;
  line-height: 1.25;
  font-weight: 700;
}

.page-header p {
  margin: 0;
  color: #64748b;
  font-size: 14px;
  line-height: 1.6;
}

.page-header .primary-button,
.empty-state .primary-button {
  flex-shrink: 0;
  min-height: 42px;
  padding: 11px 18px;
  border: 0;
  border-radius: 9px;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
}

.category-info {
  margin-bottom: 24px;
  padding: 18px 20px;
  border-radius: 12px;
}

.category-info strong {
  font-size: 15px;
}

.category-info p {
  margin-top: 5px;
  font-size: 13px;
}

.table-container {
  width: 100%;
  overflow: hidden;
  background: #fff;
  border: 1px solid #e8edf4;
  border-radius: 14px;
  box-shadow: 0 3px 12px rgba(15, 23, 42, 0.035);
}

.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 22px 16px;
  border-bottom: 1px solid #edf0f5;
}

.table-header h3 {
  margin: 0;
  color: #1e293b;
  font-size: 17px;
  line-height: 1.4;
  font-weight: 700;
}

.table-header p {
  margin: 5px 0 0;
  color: #64748b;
  font-size: 13px;
}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  min-width: 1050px;
  border-collapse: separate;
  border-spacing: 0;
  text-align: left;
}

thead th {
  padding: 14px 16px;
  background: #f8fafc;
  color: #64748b;
  border-bottom: 1px solid #e9edf3;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
}

tbody td {
  padding: 15px 16px;
  color: #334155;
  border-bottom: 1px solid #eef1f5;
  font-size: 13px;
  line-height: 1.5;
  vertical-align: middle;
}

tbody tr:last-child td {
  border-bottom: 0;
}

tbody tr:hover {
  background: #fafcff;
}

tbody td strong {
  color: #0f172a;
  font-weight: 650;
}

.gender-badge,
.age-badge {
  justify-content: center;
  white-space: nowrap;
  min-width: max-content;
}

.action-buttons {
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.btn-view,
.btn-edit {
  min-width: 56px;
  padding: 7px 11px;
  font-size: 12px;
  line-height: 1.2;
}

.empty-state {
  margin-top: 4px;
}

/* Form modal lebih teratur dan nyaman dibaca */
.modal-card {
  width: min(100%, 600px);
  padding: 28px;
  border: 1px solid #e8edf4;
}

.form-bayi {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px 16px;
}

.form-group {
  min-width: 0;
  gap: 8px;
}

.form-group:last-of-type,
.form-error,
.modal-actions {
  grid-column: 1 / -1;
}

.form-group label {
  font-size: 13px;
}

.form-group input,
.form-group select,
.form-group textarea {
  min-height: 43px;
  padding: 11px 12px;
  border-color: #d7dee8;
  border-radius: 9px;
}

.form-group textarea {
  min-height: 82px;
  resize: vertical;
}

.modal-actions {
  padding-top: 6px;
  border-top: 1px solid #edf0f5;
}

.btn-cancel,
.modal-actions .primary-button {
  min-height: 42px;
  padding: 10px 17px;
  border-radius: 9px;
  font-size: 13px;
  font-weight: 600;
}

@media (max-width: 900px) {
  .page-content {
    padding: 22px 20px 28px;
  }

  .page-header h1 {
    font-size: 23px;
  }
}

@media (max-width: 600px) {
  .page-content {
    padding: 18px 14px 24px;
  }

  .page-header {
    align-items: flex-start;
    flex-direction: column;
    gap: 14px;
  }

  .page-header .primary-button {
    width: 100%;
  }

  .category-info {
    align-items: flex-start;
    padding: 15px;
  }

  .table-header {
    padding: 16px;
  }

  .modal-overlay {
    align-items: flex-start;
    padding: 12px;
  }

  .modal-card {
    margin: auto 0;
    padding: 20px;
    max-height: calc(100vh - 24px);
  }

  .form-bayi {
    grid-template-columns: minmax(0, 1fr);
    gap: 15px;
  }

  .form-group:last-of-type,
  .form-error,
  .modal-actions {
    grid-column: auto;
  }

  .modal-actions {
    flex-direction: column-reverse;
  }

  .modal-actions button {
    width: 100%;
  }
}


.btn-delete {
  padding: 7px 12px;
  border: 1px solid #fecaca;
  border-radius: 7px;
  background: #fef2f2;
  color: #dc2626;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
}

.btn-delete:hover {
  background: #fee2e2;
}

.btn-delete:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}


</style>

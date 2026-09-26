```vue
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
            Data Ibu Hamil
          </h2>

          <p>
            Data ibu hamil Posyandu Melati
          </p>

        </div>

      </header>


      <section class="dashboard-content">


        <div class="page-header">

          <div>

            <h1>
              Data Ibu Hamil
            </h1>

            <p>
              Kelola data ibu hamil di wilayah posyandu.
            </p>

          </div>


          <button
            class="primary-button"
            @click="bukaFormTambah"
          >
            + Tambah Ibu Hamil
          </button>

        </div>


        <div class="search-box">

          🔍

          <input
            v-model="search"
            type="text"
            placeholder="Cari nama ibu hamil..."
          />

        </div>


        <div class="table-container">

          <table>

            <thead>

              <tr>

                <th>
                  No
                </th>

                <th>
                  Nama
                </th>

                <th>
                  Usia Kehamilan
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
                  ibu,
                  index
                ) in filteredIbuHamil"
                :key="ibu.id"
              >

                <td>
                  {{ index + 1 }}
                </td>


                <td>
                  {{ ibu.nama }}
                </td>


                <td>

                  {{ ibu.usiaKehamilan }}
                  minggu

                </td>


                <td>

                  <span
  :class="
    ibu.status === 'Risiko Rendah'
      ? 'status-normal'
      : 'status-pemantauan'
  "
>
  {{ ibu.status }}
</span>

                </td>


                <td>

                  <button
                    class="action-button"
                    @click="lihatDetail(ibu.id)"
                  >
                    Lihat
                  </button>

                </td>

              </tr>


              <tr
                v-if="
                  filteredIbuHamil.length === 0
                "
              >

                <td
                  colspan="5"
                  class="empty-data"
                >

                  Data ibu hamil tidak ditemukan.

                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </section>

    </main>


    <!-- ==========================================
         MODAL TAMBAH IBU HAMIL
    =========================================== -->

    <div
      v-if="showModal"
      class="modal-overlay"
      @click.self="tutupForm"
    >

      <div class="modal-box">


        <!-- HEADER CARD -->

        <div class="modal-header">

          <div>

            <h2>
              Tambah Ibu Hamil
            </h2>

            <p>
              Masukkan data ibu hamil
            </p>

          </div>


          <button
            class="modal-close"
            @click="tutupForm"
            type="button"
          >
            ×
          </button>

        </div>


        <!-- FORM -->

        <div class="form-body">


          <!-- NAMA -->

          <div class="form-group">

            <label>
              Nama Ibu Hamil
              <span>*</span>
            </label>


            <input
              v-model="form.nama"
              type="text"
              placeholder="Masukkan nama ibu hamil"
            />

          </div>


          <!-- USIA KEHAMILAN -->

          <div class="form-group">

            <label>
              Usia Kehamilan
              <span>*</span>
            </label>


            <input
              v-model="form.usiaKehamilan"
              type="number"
              min="1"
              max="42"
              placeholder="Contoh: 24"
            />


            <small>
              Masukkan usia kehamilan dalam minggu.
            </small>

          </div>


          <!-- ERROR -->

          <div
            v-if="errorForm"
            class="form-info"
          >

            ⚠️
            {{ errorForm }}

          </div>


          <!-- BUTTON -->

          <div class="form-actions">

            <button
              class="secondary-button"
              @click="tutupForm"
              type="button"
            >
              Batal
            </button>


            <button
              class="primary-button"
              @click="simpanDataIbuHamil"
              type="button"
            >
              Simpan
            </button>

          </div>

        </div>

      </div>

    </div>

  </div>
</template>


<script setup>

import {
  ref,
  reactive,
  computed
} from 'vue'

import {
  useRouter
} from 'vue-router'

import ibuHamil, {
  simpanIbuHamil
} from '../data/ibuHamil'


const router =
  useRouter()


const search =
  ref('')


const showModal =
  ref(false)


const errorForm =
  ref('')


const form =
  reactive({

    nama: '',

    usiaKehamilan: ''

  })


const filteredIbuHamil =
  computed(() => {

    const keyword =
      search.value
        .toLowerCase()
        .trim()


    if (!keyword) {

      return ibuHamil

    }


    return ibuHamil.filter(
      (ibu) =>
        ibu.nama
          .toLowerCase()
          .includes(keyword)
    )

  })


const lihatDetail =
  (id) => {

    router.push(
      `/ibu-hamil/${id}`
    )

  }


const bukaFormTambah =
  () => {

    form.nama =
      ''

    form.usiaKehamilan =
      ''

    errorForm.value =
      ''

    showModal.value =
      true

  }


const tutupForm =
  () => {

    showModal.value =
      false

    errorForm.value =
      ''

  }


const simpanDataIbuHamil =
  () => {

    errorForm.value =
      ''


    if (
      !form.nama.trim() ||
      !form.usiaKehamilan
    ) {

      errorForm.value =
        'Nama dan usia kehamilan harus diisi.'

      return

    }


    const usia =
      Number(
        form.usiaKehamilan
      )


    if (
      usia < 1 ||
      usia > 42
    ) {

      errorForm.value =
        'Usia kehamilan harus antara 1 sampai 42 minggu.'

      return

    }


    const idBaru =
      ibuHamil.length > 0

        ? Math.max(
            ...ibuHamil.map(
              (ibu) =>
                ibu.id
            )
          ) + 1

        : 1


    ibuHamil.push({

      id:
        idBaru,

      nama:
        form.nama.trim(),

      usiaKehamilan:
        usia,

      status:
        'Risiko Rendah',

      pemeriksaan:
        []

    })


    simpanIbuHamil()


    tutupForm()


    alert(
      'Data ibu hamil berhasil ditambahkan.'
    )

  }

</script>


<style scoped>

/* =====================================================
   MODAL OVERLAY
===================================================== */

.modal-overlay {

  position: fixed;

  inset: 0;

  z-index: 9999;

  display: flex;

  align-items: center;

  justify-content: center;

  padding: 20px;

  background:
    rgba(15, 23, 42, 0.45);

}


/* =====================================================
   CARD MODAL
===================================================== */

.modal-box {

  width: 100%;

  max-width: 500px;

  background: #ffffff;

  border-radius: 16px;

  overflow: hidden;

  box-shadow:
    0 20px 50px
    rgba(0, 0, 0, 0.18);

  animation:
    modalMasuk
    0.2s
    ease;

}


/* =====================================================
   HEADER MODAL
===================================================== */

.modal-header {

  display: flex;

  align-items: flex-start;

  justify-content: space-between;

  padding: 22px 24px;

  border-bottom:
    1px solid #e5e7eb;

}


.modal-header h2 {

  margin: 0;

  font-size: 20px;

  font-weight: 700;

  color: #1f2937;

}


.modal-header p {

  margin:
    6px 0 0;

  font-size: 13px;

  color: #6b7280;

}


/* =====================================================
   CLOSE
===================================================== */

.modal-close {

  width: 34px;

  height: 34px;

  display: flex;

  align-items: center;

  justify-content: center;

  border: none;

  border-radius: 8px;

  background: transparent;

  color: #6b7280;

  font-size: 25px;

  line-height: 1;

  cursor: pointer;

}


.modal-close:hover {

  background: #f3f4f6;

  color: #111827;

}


/* =====================================================
   FORM BODY
===================================================== */

.form-body {

  padding: 24px;

}


/* =====================================================
   FORM GROUP
===================================================== */

.form-group {

  margin-bottom: 18px;

}


.form-group label {

  display: block;

  margin-bottom: 8px;

  font-size: 14px;

  font-weight: 600;

  color: #374151;

}


.form-group label span {

  color: #ef4444;

}


.form-group input {

  width: 100%;

  height: 44px;

  padding:
    0 13px;

  box-sizing: border-box;

  border:
    1px solid #d1d5db;

  border-radius: 9px;

  background: #ffffff;

  color: #1f2937;

  font-family: inherit;

  font-size: 14px;

  outline: none;

  transition:
    border-color 0.2s,
    box-shadow 0.2s;

}


.form-group input::placeholder {

  color: #9ca3af;

}


.form-group input:focus {

  border-color: #6366f1;

  box-shadow:
    0 0 0 3px
    rgba(99, 102, 241, 0.1);

}


.form-group small {

  display: block;

  margin-top: 7px;

  font-size: 12px;

  color: #6b7280;

}


/* =====================================================
   ERROR
===================================================== */

.form-info {

  display: flex;

  align-items: center;

  gap: 7px;

  margin-bottom: 18px;

  padding:
    11px 13px;

  border-radius: 9px;

  background: #fff7ed;

  border:
    1px solid #fed7aa;

  color: #c2410c;

  font-size: 13px;

  line-height: 1.4;

}


/* =====================================================
   FORM ACTIONS
===================================================== */

.form-actions {

  display: flex;

  justify-content: flex-end;

  align-items: center;

  gap: 10px;

  padding-top: 4px;

}


.form-actions button {

  min-height: 40px;

}


/* =====================================================
   ANIMATION
===================================================== */

@keyframes modalMasuk {

  from {

    opacity: 0;

    transform:
      translateY(-10px)
      scale(0.98);

  }

  to {

    opacity: 1;

    transform:
      translateY(0)
      scale(1);

  }

}


/* =====================================================
   RESPONSIVE
===================================================== */

@media (max-width: 600px) {

  .modal-overlay {

    padding: 14px;

  }


  .modal-box {

    max-width: 100%;

    border-radius: 14px;

  }


  .modal-header {

    padding:
      18px 20px;

  }


  .form-body {

    padding:
      20px;

  }

}

.status-pemantauan {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  background: #fee2e2;
  color: #dc2626;
  font-weight: 600;
}

</style>


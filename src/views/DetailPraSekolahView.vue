```vue
<template>

  <div class="detail-page">

    <!-- HEADER -->

    <div class="detail-header">

      <button
        class="btn-back"
        @click="kembali"
      >
        ← Kembali
      </button>

      <div>
        <h1>Detail Pra Sekolah</h1>
        <p>
          Informasi data dan pemeriksaan anak pra sekolah
        </p>
      </div>

    </div>


    <!-- LOADING -->

    <div
      v-if="sedangMemuat"
      class="state-box"
    >
      <div class="state-icon">
        ⏳
      </div>

      <p>
        Memuat data...
      </p>
    </div>


    <!-- DATA TIDAK DITEMUKAN -->

    <div
      v-else-if="!anak"
      class="state-box"
    >

      <div class="state-icon">
        🔍
      </div>

      <h3>
        Data tidak ditemukan
      </h3>

      <p>
        Data anak tidak tersedia.
      </p>

      <button
        class="btn-primary"
        @click="kembali"
      >
        Kembali ke Pra Sekolah
      </button>

    </div>


    <!-- DETAIL -->

    <template v-else>

      <!-- IDENTITAS -->

      <div class="card">

        <div class="card-title">
          <h2>
            {{ anak.nama }}
          </h2>

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
        </div>


        <div class="identity-grid">

          <div class="identity-item">

            <span>
              Tanggal Lahir
            </span>

            <strong>
              {{ formatTanggal(
                anak.tanggal_lahir
              ) }}
            </strong>

          </div>


          <div class="identity-item">

            <span>
              Umur
            </span>

            <strong>
              {{ formatUmurAnak(
                anak.tanggal_lahir
              ) }}
            </strong>

          </div>


          <div class="identity-item">

            <span>
              Nama Ibu
            </span>

            <strong>
              {{ anak.nama_ibu || '-' }}
            </strong>

          </div>


          <div class="identity-item">

            <span>
              Nama Ayah
            </span>

            <strong>
              {{ anak.nama_ayah || '-' }}
            </strong>

          </div>


          <div class="identity-item full">

            <span>
              Alamat
            </span>

            <strong>
              {{ anak.alamat || '-' }}
            </strong>

          </div>

        </div>

      </div>


      <!-- INFORMASI KATEGORI -->

      <div class="category-card">

        <div class="category-icon">
          🎒
        </div>

        <div>

          <strong>
            Kategori Pra Sekolah
          </strong>

          <p>
            Anak termasuk kategori pra sekolah
            berdasarkan perhitungan otomatis dari
            tanggal lahir.
          </p>

        </div>

      </div>


      <!-- PEMERIKSAAN -->

      <div class="card">

        <div class="section-header">

          <div>

            <h2>
              Riwayat Pemeriksaan
            </h2>

            <p>
              Data pemeriksaan yang tersimpan
              untuk anak ini.
            </p>

          </div>

        </div>


        <div
          v-if="
            !anak.pemeriksaan ||
            anak.pemeriksaan.length === 0
          "
          class="empty-history"
        >

          <div>
            📋
          </div>

          <p>
            Belum ada data pemeriksaan.
          </p>

        </div>


        <div
          v-else
          class="table-wrapper"
        >

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
                  BB (kg)
                </th>

                <th>
                  TB/PB (cm)
                </th>

                <th>
                  LK (cm)
                </th>

                <th>
                  LILA (cm)
                </th>

                <th>
                  Imunisasi
                </th>

                <th>
                  Vitamin A
                </th>

                <th>
                  Obat Cacing
                </th>

              </tr>

            </thead>


            <tbody>

              <tr
                v-for="(
                  pemeriksaan,
                  index
                ) in anak.pemeriksaan"
                :key="pemeriksaan.id"
              >

                <td>
                  {{ index + 1 }}
                </td>

                <td>
                  {{ formatTanggal(
                    pemeriksaan.tanggal_pemeriksaan
                  ) }}
                </td>

                <td>
                  {{ pemeriksaan.bb ?? '-' }}
                </td>

                <td>
                  {{ pemeriksaan.tb ?? '-' }}
                </td>

                <td>
                  {{ pemeriksaan.lk ?? '-' }}
                </td>

                <td>
                  {{ pemeriksaan.lila ?? '-' }}
                </td>

                <td>
                  {{ pemeriksaan.imunisasi ? 'Ya' : 'Tidak' }}
                </td>

                <td>
                  {{ pemeriksaan.vitamin_a ? 'Ya' : 'Tidak' }}
                </td>

                <td>
                  {{ pemeriksaan.obat_cacing ? 'Ya' : 'Tidak' }}
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </template>

  </div>

</template>


<script setup>

import {
  onMounted,
  ref
} from 'vue'

import {
  useRoute,
  useRouter
} from 'vue-router'

import {
  formatUmurAnak
} from '../utils/kategoriAnak'


const route =
  useRoute()

const router =
  useRouter()


const anak =
  ref(null)

const sedangMemuat =
  ref(true)


/* =========================================================
   AMBIL DATA
========================================================= */

const ambilData =
  async () => {

    try {

      sedangMemuat.value =
        true


      const response =
        await fetch(
          `http://localhost:3000/api/balita/${route.params.id}`
        )


      if (!response.ok) {

        throw new Error(
          'Data anak tidak ditemukan.'
        )

      }


      const hasil =
        await response.json()


      const data =
        hasil.data || hasil


      /*
       * Pastikan data pemeriksaan
       * tetap tersedia.
       */

      const responsePemeriksaan =
        await fetch(
          `http://localhost:3000/api/balita/${route.params.id}/pemeriksaan`
        )


      if (responsePemeriksaan.ok) {

        const hasilPemeriksaan =
          await responsePemeriksaan.json()


        data.pemeriksaan =
          hasilPemeriksaan.data ||
          hasilPemeriksaan ||
          []

      }
      else {

        data.pemeriksaan =
          []

      }


      anak.value =
        data

    }
    catch (error) {

      console.error(
        'Gagal mengambil detail pra sekolah:',
        error
      )

      anak.value =
        null

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
   KEMBALI
========================================================= */

const kembali =
  () => {

    router.push(
      '/pra-sekolah'
    )

  }


/* =========================================================
   LOAD
========================================================= */

onMounted(
  () => {

    ambilData()

  }
)

</script>


<style scoped>

.detail-page {
  padding: 30px;
  background: #f5f7fb;
  min-height: 100vh;
}


.detail-header {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 25px;
}


.detail-header h1 {
  margin: 0 0 5px;
  font-size: 24px;
}


.detail-header p {
  margin: 0;
  color: #64748b;
  font-size: 14px;
}


.btn-back {
  border: none;
  background: white;
  color: #334155;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid #e2e8f0;
}


.btn-back:hover {
  background: #f8fafc;
}


.card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 22px;
  margin-bottom: 20px;
}


.card-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 22px;
}


.card-title h2 {
  margin: 0;
  font-size: 20px;
}


.identity-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
}


.identity-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}


.identity-item.full {
  grid-column: 1 / -1;
}


.identity-item span {
  color: #64748b;
  font-size: 12px;
}


.identity-item strong {
  color: #1e293b;
  font-size: 14px;
}


.gender-badge {
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


.category-card {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 18px 20px;
  margin-bottom: 20px;
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


.category-card strong {
  display: block;
  margin-bottom: 4px;
}


.category-card p {
  margin: 0;
  color: #64748b;
  font-size: 13px;
}


.section-header {
  margin-bottom: 18px;
}


.section-header h2 {
  margin: 0 0 5px;
  font-size: 18px;
}


.section-header p {
  margin: 0;
  color: #64748b;
  font-size: 13px;
}


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
  padding: 12px 14px;
  border-bottom: 1px solid #f1f5f9;
  text-align: left;
  font-size: 13px;
  white-space: nowrap;
}


th {
  background: #f8fafc;
  color: #475569;
  font-weight: 600;
}


.empty-history {
  text-align: center;
  padding: 40px;
  color: #64748b;
}


.state-box {
  min-height: 300px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 14px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 10px;
  text-align: center;
}


.state-icon {
  font-size: 40px;
}


.state-box h3 {
  margin: 5px 0;
}


.state-box p {
  margin: 0 0 10px;
  color: #64748b;
}


.btn-primary {
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  background: #2563eb;
  color: white;
  cursor: pointer;
  font-weight: 600;
}


@media (max-width: 768px) {

  .detail-page {
    padding: 20px;
  }


  .identity-grid {
    grid-template-columns: 1fr;
  }


  .identity-item.full {
    grid-column: auto;
  }


  .detail-header {
    align-items: flex-start;
    flex-direction: column;
  }

}

</style>
```

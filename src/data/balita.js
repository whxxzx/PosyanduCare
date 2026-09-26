import { reactive } from 'vue'

const dataAwal = [
  {
    id: 1,
    nama: 'Aisyah Putri',
    jenisKelamin: 'P',
    tanggalLahir: '2024-09-15',
    namaIbu: 'Siti Aminah',
    alamat: 'RT 01 / RW 02',

    pemeriksaan: [
      {
        id: 101,
        tanggal: '2026-06-15',
        tb: 82.5,
        bb: 8,
        lk: 45,
        lila: 14.0
      },
      {
        id: 102,
        tanggal: '2026-07-15',
        tb: 81.7,
        bb: 9.9,
        lk: 46.0,
        lila: 14.2
      }
    ]
  },

  {
    id: 2,
    nama: 'Bima Pratama',
    jenisKelamin: 'L',
    tanggalLahir: '2024-02-12',
    namaIbu: 'Siti',
    alamat: 'RT 03 / RW 04',

    pemeriksaan: [
      {
        id: 201,
        tanggal: '2026-07-15',
        tb: 86.5,
        bb: 11.2,
        lk: 47.0,
        lila: 15.0
      },
      {
        id: 202,
        tanggal: '2026-05-15',
        tb: 85.7,
        bb: 10.9,
        lk: 46.7,
        lila: 14.8
      },
      {
        id: 203,
        tanggal: '2026-08-15',
        tb: 84.8,
        bb: 10.6,
        lk: 46.5,
        lila: 14.6
      }
    ]
  },

  {
    id: 3,
    nama: 'Citra Amelia',
    jenisKelamin: 'P',
    tanggalLahir: '2025-03-20',
    namaIbu: 'Dewi Lestari',
    alamat: 'RT 02 / RW 03',

    pemeriksaan: [
      {
        id: 301,
        tanggal: '2026-07-15',
        tb: 76.4,
        bb: 9.1,
        lk: 44.8,
        lila: 13.8
      },
      {
        id: 302,
        tanggal: '2026-05-15',
        tb: 75.6,
        bb: 8.8,
        lk: 44.5,
        lila: 13.5
      }
    ]
  },

  {
    id: 4,
    nama: 'Daffa Ramadhan',
    jenisKelamin: 'L',
    tanggalLahir: '2023-09-10',
    namaIbu: 'Rina Marlina',
    alamat: 'RT 04 / RW 01',

    pemeriksaan: [
      {
        id: 401,
        tanggal: '2026-05-15',
        tb: 86.0,
        bb: 11.0,
        lk: 47.1,
        lila: 15.2
      }
    ]
  },

  {
    id: 5,
    nama: 'Eka Lestari',
    jenisKelamin: 'P',
    tanggalLahir: '2024-11-05',
    namaIbu: 'Nur Aini',
    alamat: 'RT 05 / RW 02',

    pemeriksaan: [
      {
        id: 501,
        tanggal: '2026-05-15',
        tb: 80.3,
        bb: 9.8,
        lk: 45.7,
        lila: 14.1
      }
    ]
  },

  {
    id: 6,
    nama: 'Fajar Nugroho',
    jenisKelamin: 'L',
    tanggalLahir: '2024-06-18',
    namaIbu: 'Lina',
    alamat: 'RT 02 / RW 05',

    pemeriksaan: [
      {
        id: 601,
        tanggal: '2026-06-15',
        tb: 84.2,
        bb: 10.5,
        lk: 46.4,
        lila: 14.7
      }
    ]
  }
]


/*
|--------------------------------------------------------------------------
| AMBIL DATA DARI LOCAL STORAGE
|--------------------------------------------------------------------------
*/

const dataTersimpan =
  localStorage.getItem('posyandu_balita')


const data = dataTersimpan
  ? JSON.parse(dataTersimpan)
  : dataAwal


/*
|--------------------------------------------------------------------------
| DATA REAKTIF
|--------------------------------------------------------------------------
*/

const balita = reactive(data)


/*
|--------------------------------------------------------------------------
| SIMPAN DATA
|--------------------------------------------------------------------------
*/

export const simpanBalita = () => {

  localStorage.setItem(
    'posyandu_balita',
    JSON.stringify(balita)
  )

}


export default balita
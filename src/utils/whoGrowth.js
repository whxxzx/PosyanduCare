import { calculateAll } from '@pedi-growth/core'

/*
|--------------------------------------------------------------------------
| Konversi tanggal YYYY-MM-DD ke tanggal lokal
|--------------------------------------------------------------------------
*/
const buatTanggalLokal = (tanggal) => {
  if (!tanggal) return null

  const [tahun, bulan, hari] = tanggal.split('-').map(Number)

  return new Date(tahun, bulan - 1, hari)
}

/*
|--------------------------------------------------------------------------
| Membuat angka z-score lebih rapi
|--------------------------------------------------------------------------
*/
const formatZScore = (nilai) => {
  if (
    nilai === null ||
    nilai === undefined ||
    Number.isNaN(Number(nilai))
  ) {
    return null
  }

  return Number(Number(nilai).toFixed(2))
}

/*
|--------------------------------------------------------------------------
| Klasifikasi TB/PB menurut umur
|
| INI YANG DIGUNAKAN UNTUK MENENTUKAN STUNTING
|--------------------------------------------------------------------------
*/
const klasifikasiTBU = (zScore) => {
  if (
    zScore === null ||
    zScore === undefined ||
    Number.isNaN(Number(zScore))
  ) {
    return {
      status: 'Tidak dapat dihitung',
      keterangan: 'Z-score TB/PB menurut umur tidak tersedia.'
    }
  }

  const z = Number(zScore)

  if (z < -3) {
    return {
      status: 'Severely Stunted',
      keterangan: 'TB/PB menurut umur berada di bawah -3 SD.'
    }
  }

  if (z < -2) {
    return {
      status: 'Stunted',
      keterangan: 'TB/PB menurut umur berada di bawah -2 SD.'
    }
  }

  return {
    status: 'Normal',
    keterangan: 'TB/PB menurut umur berada pada atau di atas -2 SD.'
  }
}

/*
|--------------------------------------------------------------------------
| Klasifikasi BB menurut umur
|--------------------------------------------------------------------------
*/
const klasifikasiBBU = (zScore) => {
  if (
    zScore === null ||
    zScore === undefined ||
    Number.isNaN(Number(zScore))
  ) {
    return {
      status: 'Tidak dapat dihitung',
      keterangan: 'Z-score BB menurut umur tidak tersedia.'
    }
  }

  const z = Number(zScore)

  if (z < -3) {
    return {
      status: 'Sangat Rendah',
      keterangan: 'BB menurut umur berada di bawah -3 SD.'
    }
  }

  if (z < -2) {
    return {
      status: 'Rendah',
      keterangan: 'BB menurut umur berada di bawah -2 SD.'
    }
  }

  return {
    status: 'Normal',
    keterangan: 'BB menurut umur berada pada atau di atas -2 SD.'
  }
}

/*
|--------------------------------------------------------------------------
| Klasifikasi BB menurut TB/PB
|
| Catatan:
| indikator yang tersedia dari library dapat berupa
| weight-for-length atau weight-for-height.
|--------------------------------------------------------------------------
*/
const klasifikasiBBTB = (zScore) => {
  if (
    zScore === null ||
    zScore === undefined ||
    Number.isNaN(Number(zScore))
  ) {
    return {
      status: 'Tidak dapat dihitung',
      keterangan: 'Z-score BB menurut TB/PB tidak tersedia.'
    }
  }

  const z = Number(zScore)

  if (z < -3) {
    return {
      status: 'Sangat Kurus',
      keterangan: 'BB menurut TB/PB berada di bawah -3 SD.'
    }
  }

  if (z < -2) {
    return {
      status: 'Kurus',
      keterangan: 'BB menurut TB/PB berada di bawah -2 SD.'
    }
  }

  if (z <= 1) {
    return {
      status: 'Normal',
      keterangan: 'BB menurut TB/PB berada pada rentang normal.'
    }
  }

  if (z <= 2) {
    return {
      status: 'Risiko Gizi Lebih',
      keterangan: 'BB menurut TB/PB berada di atas rentang normal dan perlu diperhatikan.'
    }
  }

  if (z <= 3) {
    return {
      status: 'Gizi Lebih',
      keterangan: 'BB menurut TB/PB berada di atas +2 SD.'
    }
  }

  return {
    status: 'Obesitas',
    keterangan: 'BB menurut TB/PB berada di atas +3 SD.'
  }
}

/*
|--------------------------------------------------------------------------
| Klasifikasi IMT menurut umur
|--------------------------------------------------------------------------
*/
const klasifikasiIMTU = (zScore) => {
  if (
    zScore === null ||
    zScore === undefined ||
    Number.isNaN(Number(zScore))
  ) {
    return {
      status: 'Tidak dapat dihitung',
      keterangan: 'Z-score IMT menurut umur tidak tersedia.'
    }
  }

  const z = Number(zScore)

  if (z < -3) {
    return {
      status: 'Sangat Kurus',
      keterangan: 'IMT menurut umur berada di bawah -3 SD.'
    }
  }

  if (z < -2) {
    return {
      status: 'Kurus',
      keterangan: 'IMT menurut umur berada di bawah -2 SD.'
    }
  }

  if (z <= 1) {
    return {
      status: 'Normal',
      keterangan: 'IMT menurut umur berada pada rentang normal.'
    }
  }

  if (z <= 2) {
    return {
      status: 'Risiko Gizi Lebih',
      keterangan: 'IMT menurut umur berada di atas rentang normal dan perlu diperhatikan.'
    }
  }

  if (z <= 3) {
    return {
      status: 'Gizi Lebih',
      keterangan: 'IMT menurut umur berada di atas +2 SD.'
    }
  }

  return {
    status: 'Obesitas',
    keterangan: 'IMT menurut umur berada di atas +3 SD.'
  }
}

/*
|--------------------------------------------------------------------------
| Fungsi utama perhitungan WHO
|--------------------------------------------------------------------------
*/
export const hitungStatusWHO = async ({
  tanggalLahir,
  tanggalPemeriksaan,
  jenisKelamin,
  tb,
  bb,
  lk
}) => {
  try {
    /*
    |--------------------------------------------------------------------------
    | Validasi data dasar
    |--------------------------------------------------------------------------
    */
    if (
      !tanggalLahir ||
      !tanggalPemeriksaan ||
      !jenisKelamin
    ) {
      return {
        berhasil: false,
        pesan:
          'Data tanggal lahir, tanggal pemeriksaan, dan jenis kelamin wajib tersedia.'
      }
    }

    /*
    |--------------------------------------------------------------------------
    | TB/PB wajib tersedia karena menjadi indikator utama stunting
    |--------------------------------------------------------------------------
    */
    if (
      tb === null ||
      tb === undefined ||
      tb === ''
    ) {
      return {
        berhasil: false,
        pesan:
          'TB/PB belum tersedia sehingga TB/PB menurut umur belum dapat dihitung.'
      }
    }

    const tanggalLahirLokal = buatTanggalLokal(tanggalLahir)
    const tanggalPemeriksaanLokal = buatTanggalLokal(tanggalPemeriksaan)

    /*
    |--------------------------------------------------------------------------
    | Siapkan data untuk calculateAll
    |--------------------------------------------------------------------------
    |
    | Kita hanya memasukkan nilai yang memang tersedia.
    | Ini lebih aman daripada mengirim undefined ke library.
    |--------------------------------------------------------------------------
    */
    const dataInput = {
      sex: jenisKelamin === 'L' ? 'male' : 'female',
      dateOfBirth: tanggalLahirLokal,
      dateOfMeasurement: tanggalPemeriksaanLokal,
      lengthHeight: Number(tb),
      chartSet: 'who-standard'
    }

    if (
      bb !== null &&
      bb !== undefined &&
      bb !== ''
    ) {
      dataInput.weight = Number(bb)
    }

    if (
      lk !== null &&
      lk !== undefined &&
      lk !== ''
    ) {
      dataInput.headCircumference = Number(lk)
    }

    /*
    |--------------------------------------------------------------------------
    | Hitung seluruh indikator yang tersedia
    |--------------------------------------------------------------------------
    */
    const hasil = await calculateAll(dataInput)

    /*
    |--------------------------------------------------------------------------
    | Ambil hasil masing-masing indikator
    |--------------------------------------------------------------------------
    */
    const hasilTBU = hasil.results?.find(
      item => item.indicator === 'length-height-for-age'
    )

    const hasilBBU = hasil.results?.find(
      item => item.indicator === 'weight-for-age'
    )

    const hasilBBTB = hasil.results?.find(
      item =>
        item.indicator === 'weight-for-length' ||
        item.indicator === 'weight-for-height'
    )

    const hasilIMTU = hasil.results?.find(
      item => item.indicator === 'bmi-for-age'
    )

    /*
    |--------------------------------------------------------------------------
    | TB/PB menurut umur
    |--------------------------------------------------------------------------
    */
    let dataTBU = null

    if (hasilTBU) {
      const zScore = formatZScore(hasilTBU.zScore)
      const klasifikasi = klasifikasiTBU(zScore)

      dataTBU = {
        zScore,
        percentile: hasilTBU.percentile ?? null,
        status: klasifikasi.status,
        keterangan: klasifikasi.keterangan,
        indikator: 'TB/PB menurut umur'
      }
    }

    /*
    |--------------------------------------------------------------------------
    | BB menurut umur
    |--------------------------------------------------------------------------
    */
    let dataBBU = null

    if (hasilBBU) {
      const zScore = formatZScore(hasilBBU.zScore)
      const klasifikasi = klasifikasiBBU(zScore)

      dataBBU = {
        zScore,
        percentile: hasilBBU.percentile ?? null,
        status: klasifikasi.status,
        keterangan: klasifikasi.keterangan,
        indikator: 'BB menurut umur'
      }
    }

    /*
    |--------------------------------------------------------------------------
    | BB menurut TB/PB
    |--------------------------------------------------------------------------
    */
    let dataBBTB = null

    if (hasilBBTB) {
      const zScore = formatZScore(hasilBBTB.zScore)
      const klasifikasi = klasifikasiBBTB(zScore)

      dataBBTB = {
        zScore,
        percentile: hasilBBTB.percentile ?? null,
        status: klasifikasi.status,
        keterangan: klasifikasi.keterangan,
        indikator: 'BB menurut TB/PB',
        jenisIndikator: hasilBBTB.indicator
      }
    }

    /*
    |--------------------------------------------------------------------------
    | IMT menurut umur
    |--------------------------------------------------------------------------
    */
    let dataIMTU = null

    if (hasilIMTU) {
      const zScore = formatZScore(hasilIMTU.zScore)
      const klasifikasi = klasifikasiIMTU(zScore)

      let nilaiIMT = null

      if (
        bb !== null &&
        bb !== undefined &&
        bb !== '' &&
        tb !== null &&
        tb !== undefined &&
        tb !== ''
      ) {
        const berat = Number(bb)
        const tinggiMeter = Number(tb) / 100

        if (tinggiMeter > 0) {
          nilaiIMT = Number(
            (berat / (tinggiMeter * tinggiMeter)).toFixed(2)
          )
        }
      }

      dataIMTU = {
        imt: nilaiIMT,
        zScore,
        percentile: hasilIMTU.percentile ?? null,
        status: klasifikasi.status,
        keterangan: klasifikasi.keterangan,
        indikator: 'IMT menurut umur'
      }
    }

    /*
    |--------------------------------------------------------------------------
    | TB/PB menurut umur wajib ada
    |--------------------------------------------------------------------------
    |
    | Karena indikator ini merupakan dasar status stunting.
    |--------------------------------------------------------------------------
    */
    if (!dataTBU) {
      return {
        berhasil: false,
        pesan:
          'Hasil TB/PB menurut umur tidak tersedia.'
      }
    }

    /*
    |--------------------------------------------------------------------------
    | HASIL AKHIR
    |--------------------------------------------------------------------------
    |
    | zScore, percentile, status, dan keterangan di bagian atas
    | sengaja tetap dipertahankan untuk kompatibilitas dengan
    | DetailBalitaView.vue yang sekarang.
    |--------------------------------------------------------------------------
    */
    return {
      berhasil: true,

      umurHari: hasil.age?.days ?? null,
      umurBulan: hasil.age?.months ?? null,

      /*
      |--------------------------------------------------------------------------
      | 4 indikator baru
      |--------------------------------------------------------------------------
      */
      tbU: dataTBU,
      bbU: dataBBU,
      bbTbPb: dataBBTB,
      imtU: dataIMTU,

      /*
      |--------------------------------------------------------------------------
      | Data lama tetap tersedia
      |--------------------------------------------------------------------------
      |
      | Ini supaya kode DetailBalitaView.vue yang sekarang
      | tidak langsung rusak.
      |--------------------------------------------------------------------------
      */
      zScore: dataTBU.zScore,
      percentile: dataTBU.percentile,
      status: dataTBU.status,
      keterangan: dataTBU.keterangan,
      indikator: dataTBU.indikator,

      sumber: 'WHO Child Growth Standards'
    }

  } catch (error) {
    console.error('WHO Growth Error:', error)

    return {
      berhasil: false,
      pesan: 'Perhitungan WHO gagal dilakukan.',
      error: error.message
    }
  }
}
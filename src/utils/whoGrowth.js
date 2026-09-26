import {
  calculateAll
} from '@pedi-growth/core'


/*
|--------------------------------------------------------------------------
| Membuat Date lokal dari YYYY-MM-DD
|--------------------------------------------------------------------------
*/

const buatTanggalLokal = (tanggal) => {

  if (!tanggal) {
    return null
  }

  const [tahun, bulan, hari] =
    tanggal.split('-').map(Number)

  return new Date(
    tahun,
    bulan - 1,
    hari
  )
}


/*
|--------------------------------------------------------------------------
| Hitung status pertumbuhan WHO
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

    const hasil = await calculateAll({

      sex:
        jenisKelamin === 'L'
          ? 'male'
          : 'female',

      dateOfBirth:
        buatTanggalLokal(tanggalLahir),

      dateOfMeasurement:
        buatTanggalLokal(tanggalPemeriksaan),

      weight:
        Number(bb),

      lengthHeight:
        Number(tb),

      headCircumference:
        Number(lk),

      chartSet:
        'who-standard'

    })


    /*
    |--------------------------------------------------------------------------
    | Cari hasil TB/PB menurut umur
    |--------------------------------------------------------------------------
    */

    const hasilTB =
      hasil.results?.find(
        item =>
          item.indicator ===
          'length-height-for-age'
      )


    /*
    |--------------------------------------------------------------------------
    | Jika hasil tidak tersedia
    |--------------------------------------------------------------------------
    */

    if (!hasilTB) {

      return {

        berhasil: false,

        pesan:
          'Hasil TB/PB menurut umur tidak tersedia.'

      }

    }


    const zScore =
      Number(hasilTB.zScore)


    /*
    |--------------------------------------------------------------------------
    | KLASIFIKASI
    |--------------------------------------------------------------------------
    */

    let status =
      'Normal'

    let keterangan =
      'TB/PB menurut umur berada pada atau di atas -2 SD.'


    if (zScore < -3) {

      status =
        'Severely Stunted'

      keterangan =
        'TB/PB menurut umur berada di bawah -3 SD.'

    }

    else if (zScore < -2) {

      status =
        'Stunted'

      keterangan =
        'TB/PB menurut umur berada di bawah -2 SD.'

    }


    return {

      berhasil: true,

      umurHari:
        hasil.age?.days ?? null,

      umurBulan:
        hasil.age?.months ?? null,

      zScore:
        Number(zScore.toFixed(2)),

      percentile:
        hasilTB.percentile ?? null,

      status,

      keterangan,

      indikator:
        'TB/PB menurut umur',

      sumber:
        'WHO Child Growth Standards'

    }

  }

  catch (error) {

    console.error(
      'WHO Growth Error:',
      error
    )


    return {

      berhasil: false,

      pesan:
        'Perhitungan WHO gagal dilakukan.'

    }

  }

}
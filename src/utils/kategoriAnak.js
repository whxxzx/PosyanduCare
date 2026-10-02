
/*
|--------------------------------------------------------------------------
| KATEGORI ANAK POSYANDUCARE
|--------------------------------------------------------------------------
|
| Bayi        : 0 - 11 bulan
| Balita      : 12 - 59 bulan
| Pra Sekolah : 60 - 72 bulan
|
| Kategori dihitung otomatis dari tanggal lahir.
|--------------------------------------------------------------------------
*/

export const hitungUmurBulan = (tanggalLahir) => {

  if (!tanggalLahir) {
    return null
  }

  const lahir = new Date(tanggalLahir)
  const sekarang = new Date()

  let tahun =
    sekarang.getFullYear() -
    lahir.getFullYear()

  let bulan =
    sekarang.getMonth() -
    lahir.getMonth()

  /*
   * Jika tanggal hari ini belum mencapai
   * tanggal lahir pada bulan berjalan,
   * umur bulan dikurangi satu.
   */

  if (
    sekarang.getDate() <
    lahir.getDate()
  ) {
    bulan--
  }

  /*
   * Jika jumlah bulan negatif,
   * sesuaikan dengan tahun.
   */

  if (bulan < 0) {
    tahun--
    bulan += 12
  }

  return (
    tahun * 12 +
    bulan
  )
}


/*
|--------------------------------------------------------------------------
| TENTUKAN KATEGORI
|--------------------------------------------------------------------------
*/

export const tentukanKategoriAnak = (
  tanggalLahir
) => {

  const umurBulan =
    hitungUmurBulan(
      tanggalLahir
    )

  if (umurBulan === null) {
    return null
  }

  /*
   * 0 - 11 bulan
   */

  if (
    umurBulan >= 0 &&
    umurBulan <= 11
  ) {

    return 'Bayi'

  }


  /*
   * 12 - 59 bulan
   */

  if (
    umurBulan >= 12 &&
    umurBulan <= 59
  ) {

    return 'Balita'

  }


  /*
   * 60 - 72 bulan
   */

  if (
    umurBulan >= 60 &&
    umurBulan <= 72
  ) {

    return 'Pra Sekolah'

  }


  /*
   * Di atas 72 bulan.
   *
   * Untuk sementara dikembalikan
   * sebagai null karena sudah berada
   * di luar kategori yang kita gunakan
   * dalam PosyanduCare.
   */

  return null
}


/*
|--------------------------------------------------------------------------
| LABEL UMUR
|--------------------------------------------------------------------------
*/

export const formatUmurAnak = (
  tanggalLahir
) => {

  const umurBulan =
    hitungUmurBulan(
      tanggalLahir
    )

  if (umurBulan === null) {
    return '-'
  }


  if (umurBulan < 12) {

    return `${umurBulan} bulan`

  }


  const tahun =
    Math.floor(
      umurBulan / 12
    )

  const bulan =
    umurBulan % 12


  if (bulan === 0) {

    return `${tahun} tahun`

  }


  return `${tahun} tahun ${bulan} bulan`

}


/*
|--------------------------------------------------------------------------
| WARNA KATEGORI
|--------------------------------------------------------------------------
*/

export const warnaKategori = (
  kategori
) => {

  if (kategori === 'Bayi') {
    return 'kategori-bayi'
  }

  if (kategori === 'Balita') {
    return 'kategori-balita'
  }

  if (kategori === 'Pra Sekolah') {
    return 'kategori-pra-sekolah'
  }

  return 'kategori-lain'

}


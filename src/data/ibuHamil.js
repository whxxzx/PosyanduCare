import { reactive } from 'vue'

const dataAwal = [
  {
    id: 1,
    nama: 'Siti Nurhaliza',
    usiaKehamilan: 24,
    status: 'Risiko Rendah',
    pemeriksaan: []
  },
  {
    id: 2,
    nama: 'Dewi Lestari',
    usiaKehamilan: 32,
    status: 'Risiko Rendah',
    pemeriksaan: []
  }
]

const dataTersimpan =
  localStorage.getItem('posyandu_ibu_hamil')

const data = dataTersimpan
  ? JSON.parse(dataTersimpan)
  : dataAwal

data.forEach((ibu) => {
  if (!ibu.pemeriksaan) {
    ibu.pemeriksaan = []
  }

  if (!ibu.status) {
    ibu.status = 'Risiko Rendah'
  }
})

const ibuHamil = reactive(data)

export const simpanIbuHamil = () => {
  localStorage.setItem(
    'posyandu_ibu_hamil',
    JSON.stringify(ibuHamil)
  )
}

export default ibuHamil
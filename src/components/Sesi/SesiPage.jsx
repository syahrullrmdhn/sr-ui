import { useState } from 'react'
import Page from '../ui/Page'
import { Card, CardHeader, CardBody } from '../ui/Card'
import DataTable from '../ui/DataTable'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import ClassicStatCard from '../ui/ClassicStatCard'
import Modal from '../ui/Modal'
import Input from '../ui/Input'
import { useToast } from '../ui/Toast'

export default function SesiPage() {
  const { addToast } = useToast()
  const [modalOpen, setModalOpen] = useState(false)
  const [sesiList, setSesiList] = useState([
    { id: 1, namaSesi: 'Sesi 1 (Pagi)', jamMulai: '08:00 WIB', jamSelesai: '10:00 WIB', kapasitas: '80 Peserta', jeda: '30 Menit', status: 'Aktif' },
    { id: 2, namaSesi: 'Sesi 2 (Siang)', jamMulai: '10:30 WIB', jamSelesai: '12:30 WIB', kapasitas: '85 Peserta', jeda: '60 Menit', status: 'Aktif' },
    { id: 3, namaSesi: 'Sesi 3 (Sore)', jamMulai: '13:30 WIB', jamSelesai: '15:30 WIB', kapasitas: '85 Peserta', jeda: '-', status: 'Aktif' },
  ])

  const [formData, setFormData] = useState({
    namaSesi: 'Sesi 4 (Malam / Tambahan)',
    jamMulai: '16:00 WIB',
    jamSelesai: '18:00 WIB',
    kapasitas: '50 Peserta',
    jeda: '15 Menit',
    status: 'Aktif'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.namaSesi || !formData.jamMulai) {
      addToast({ title: 'Input Kurang', message: 'Nama Sesi dan Jam Mulai wajib diisi!', variant: 'warning' })
      return
    }

    const newSesi = {
      id: Date.now(),
      ...formData
    }
    setSesiList([...sesiList, newSesi])
    addToast({ title: 'Sesi Ditambahkan', message: `Rotasi ${formData.namaSesi} berhasil ditambahkan ke jadwal.`, variant: 'success' })
    setModalOpen(false)
    setFormData({ namaSesi: `Sesi ${sesiList.length + 2}`, jamMulai: '18:30 WIB', jamSelesai: '20:30 WIB', kapasitas: '50 Peserta', jeda: '15 Menit', status: 'Aktif' })
  }

  const handleDelete = (id, nama) => {
    if (window.confirm(`Hapus rotasi sesi "${nama}"?`)) {
      setSesiList(sesiList.filter(s => s.id !== id))
      addToast({ title: 'Sesi Dihapus', message: `Sesi rotasi berhasil dihapus.`, variant: 'danger' })
    }
  }

  const columns = [
    { header: 'No', render: (_, i) => i + 1 },
    { header: 'Nama Sesi Rotasi', accessor: 'namaSesi', render: r => <span className="font-bold text-slate-800">{r.namaSesi}</span> },
    { header: 'Jam Mulai', accessor: 'jamMulai', render: r => <span className="font-mono font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded">{r.jamMulai}</span> },
    { header: 'Jam Selesai', accessor: 'jamSelesai', render: r => <span className="font-mono font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded">{r.jamSelesai}</span> },
    { header: 'Alokasi Kapasitas', accessor: 'kapasitas', render: r => <Badge variant="info">{r.kapasitas}</Badge> },
    { header: 'Jeda Sterilisasi Lab', accessor: 'jeda' },
    { header: 'Status Sesi', accessor: 'status', render: r => <Badge variant="success" dot>{r.status}</Badge> },
  ]

  return (
    <Page 
      title="Pengaturan Sesi & Waktu Ujian" 
      subtitle="Manajemen rotasi jam ujian, jeda antar gelombang, dan alokasi sesi per ruangan"
      icon="fa-clock"
      bannerTheme="purple"
      badge={`Total: ${sesiList.length} Sesi Terjadwal`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 w-full">
        {sesiList.slice(0, 3).map((sesi, index) => (
          <ClassicStatCard 
            key={index}
            colorTheme={index === 0 ? 'purple' : index === 1 ? 'blue' : 'teal'} 
            value={sesi.namaSesi.split(' ')[0]} 
            title={`${sesi.jamMulai} - ${sesi.jamSelesai}`} 
            icon={index === 0 ? 'fa-sun' : index === 1 ? 'fa-clock' : 'fa-moon'} 
            footerText={`${sesi.kapasitas} Alokasi Kursi`} 
          />
        ))}
      </div>

      <Card className="flex-1 flex flex-col w-full shadow-sm">
        <CardHeader action={
          <Button variant="primary" size="sm" icon="fa-plus" onClick={() => setModalOpen(true)}>
            Tambah Rotasi Sesi
          </Button>
        }>
          Tabel Konfigurasi Sesi Waktu CBT
        </CardHeader>
        <CardBody className="flex-1 flex flex-col">
          <DataTable 
            columns={columns} 
            data={sesiList} 
            className="flex-1"
            actions={row => (
              <div className="flex justify-end gap-1.5">
                <Button variant="outline" size="xs" icon="fa-cog" title="Atur Jeda" onClick={() => addToast({ title: 'Pengaturan Jeda', message: `Waktu jeda sterilisasi untuk ${row.namaSesi} adalah ${row.jeda}.`, variant: 'info' })} />
                <Button variant="danger" size="xs" icon="fa-trash" title="Hapus Sesi" onClick={() => handleDelete(row.id, row.namaSesi)} />
              </div>
            )}
          />
        </CardBody>
      </Card>

      {/* Modal Tambah Sesi */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Buat Rotasi Sesi Ujian Baru"
        icon="fa-clock"
        size="md"
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Batal</Button>
            <Button variant="primary" icon="fa-save" onClick={handleSubmit}>Simpan Sesi Baru</Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Nama / Nomor Sesi" value={formData.namaSesi} onChange={e => setFormData({...formData, namaSesi: e.target.value})} icon="fa-clipboard" placeholder="Sesi 4 (Malam)" required />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Jam Mulai" value={formData.jamMulai} onChange={e => setFormData({...formData, jamMulai: e.target.value})} icon="fa-clock" placeholder="16:00 WIB" required />
            <Input label="Jam Selesai" value={formData.jamSelesai} onChange={e => setFormData({...formData, jamSelesai: e.target.value})} icon="fa-clock" placeholder="18:00 WIB" required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Kapasitas Maksimal" value={formData.kapasitas} onChange={e => setFormData({...formData, kapasitas: e.target.value})} icon="fa-users" placeholder="50 Peserta" required />
            <Input label="Jeda Antar Sesi (Menit)" value={formData.jeda} onChange={e => setFormData({...formData, jeda: e.target.value})} icon="fa-hourglass-half" placeholder="15 Menit" />
          </div>
        </form>
      </Modal>
    </Page>
  )
}

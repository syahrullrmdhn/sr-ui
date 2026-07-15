import { useState } from 'react'
import { mockJadwal } from '../../data/mockData'
import { Card, CardHeader, CardBody } from '../ui/Card'
import DataTable from '../ui/DataTable'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import Page from '../ui/Page'
import Modal from '../ui/Modal'
import Input from '../ui/Input'
import Select from '../ui/Select'
import { useToast } from '../ui/Toast'
import { useMessageBox } from '../ui/MessageBox'

export default function JadwalPage() {
  const { confirm } = useMessageBox()
  const { addToast } = useToast()
  const [jadwalList, setJadwalList] = useState(mockJadwal)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const [formData, setFormData] = useState({
    namaTes: 'Tes Kompetensi Dasar',
    tanggal: '22 Juli 2026',
    jamMulai: '08:00 WIB',
    jamSelesai: '10:00 WIB',
    sesi: '1',
    lokasi: 'Lab Komputer Utama (Lab 1)',
    status: 'Terjadwal'
  })

  const handleOpenAdd = () => {
    setEditingId(null)
    setFormData({ namaTes: 'Tes Kompetensi Dasar', tanggal: '22 Juli 2026', jamMulai: '08:00 WIB', jamSelesai: '10:00 WIB', sesi: '1', lokasi: 'Lab Komputer Utama (Lab 1)', status: 'Terjadwal' })
    setModalOpen(true)
  }

  const handleOpenEdit = (jadwal) => {
    setEditingId(jadwal.id)
    setFormData({
      namaTes: jadwal.namaTes,
      tanggal: jadwal.tanggal,
      jamMulai: jadwal.jamMulai,
      jamSelesai: jadwal.jamSelesai,
      sesi: String(jadwal.sesi),
      lokasi: jadwal.lokasi,
      status: jadwal.status
    })
    setModalOpen(true)
  }

  const handleDelete = async (id, nama) => {
    const confirmed = await confirm({ title: 'Konfirmasi Hapus', message: `Hapus jadwal sesi "${nama}"?`, variant: 'danger', confirmText: 'Ya, Hapus' })
    if (confirmed) {
      setJadwalList(jadwalList.filter(j => j.id !== id))
      addToast({ title: 'Jadwal Dihapus', message: `Jadwal ujian "${nama}" berhasil dihapus.`, variant: 'danger' })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.namaTes || !formData.tanggal) {
      addToast({ title: 'Input Kurang', message: 'Nama Tes dan Tanggal wajib diisi!', variant: 'warning' })
      return
    }

    if (editingId) {
      setJadwalList(jadwalList.map(j => j.id === editingId ? { ...j, ...formData, sesi: Number(formData.sesi) } : j))
      addToast({ title: 'Jadwal Diperbarui', message: `Jadwal "${formData.namaTes}" Sesi ${formData.sesi} berhasil diperbarui.`, variant: 'success' })
    } else {
      const newJadwal = {
        id: Date.now(),
        ...formData,
        sesi: Number(formData.sesi)
      }
      setJadwalList([newJadwal, ...jadwalList])
      addToast({ title: 'Jadwal Dibuat', message: `Jadwal baru "${formData.namaTes}" Sesi ${formData.sesi} berhasil ditambahkan.`, variant: 'success' })
    }
    setModalOpen(false)
  }

  const columns = [
    { header: 'No', render: (_, i) => i + 1 },
    { header: 'Nama Tes / Sesi', accessor: 'namaTes', render: r => <span className="font-bold text-slate-800">{r.namaTes}</span> },
    { header: 'Tanggal Pelaksanaan', accessor: 'tanggal', render: r => <span className="font-medium text-slate-700">{r.tanggal}</span> },
    { header: 'Jam Ujian', render: r => <span className="text-xs font-mono bg-slate-100 px-2.5 py-1 rounded-md text-slate-700 font-bold">{r.jamMulai} - {r.jamSelesai}</span> },
    { header: 'Sesi', render: r => <Badge variant="purple">Sesi {r.sesi}</Badge> },
    { header: 'Lokasi / Ruang', accessor: 'lokasi', render: r => <span className="text-sm text-slate-700 font-medium">{r.lokasi}</span> },
    { header: 'Status Sesi', accessor: 'status', render: r => <Badge variant={r.status === 'Terjadwal' ? 'success' : 'warning'} dot>{r.status}</Badge> },
  ]

  return (
    <Page 
      title="Jadwal Pelaksanaan Sesi Ujian" 
      subtitle="Atur tanggal, jam mulai/selesai, serta alokasi sesi ujian di setiap laboratorium dan ruang CBT"
      icon="fa-calendar-alt"
      bannerTheme="rose"
      badge={`Total: ${jadwalList.length} Sesi Terjadwal`}
    >
      <Card className="flex-1 flex flex-col w-full shadow-sm">
        <CardHeader action={
          <Button variant="primary" size="sm" icon="fa-plus" onClick={handleOpenAdd}>
            Buat Jadwal Baru
          </Button>
        }>
          Daftar Jadwal Sesi & Gelombang CBT
        </CardHeader>
        <CardBody className="flex-1 flex flex-col">
          <DataTable 
            columns={columns} 
            data={jadwalList}
            className="flex-1"
            actions={row => (
              <div className="flex justify-end gap-1.5">
                <Button variant="outline" size="xs" icon="fa-edit" title="Edit Jadwal" onClick={() => handleOpenEdit(row)} />
                <Button variant="danger" size="xs" icon="fa-trash" title="Hapus Jadwal" onClick={() => handleDelete(row.id, row.namaTes)} />
              </div>
            )}
          />
        </CardBody>
      </Card>

      {/* Modal Tambah / Edit Jadwal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? 'Edit Jadwal Sesi Ujian' : 'Buat Jadwal Sesi Baru'}
        icon="fa-calendar-plus"
        size="md"
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Batal</Button>
            <Button variant="primary" icon="fa-save" onClick={handleSubmit}>
              {editingId ? 'Simpan Perubahan' : 'Buat Jadwal'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Nama Tes / Mata Ujian" value={formData.namaTes} onChange={e => setFormData({...formData, namaTes: e.target.value})} icon="fa-clipboard" required />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Tanggal Pelaksanaan" value={formData.tanggal} onChange={e => setFormData({...formData, tanggal: e.target.value})} icon="fa-calendar" placeholder="22 Juli 2026" required />
            <Select
              label="Sesi Ujian"
              value={formData.sesi}
              onChange={e => setFormData({...formData, sesi: e.target.value})}
              options={[
                { key: '1', value: 'Sesi 1 (08:00 - 10:00 WIB)' },
                { key: '2', value: 'Sesi 2 (10:30 - 12:30 WIB)' },
                { key: '3', value: 'Sesi 3 (13:30 - 15:30 WIB)' },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Jam Mulai" value={formData.jamMulai} onChange={e => setFormData({...formData, jamMulai: e.target.value})} icon="fa-clock" placeholder="08:00 WIB" required />
            <Input label="Jam Selesai" value={formData.jamSelesai} onChange={e => setFormData({...formData, jamSelesai: e.target.value})} icon="fa-clock" placeholder="10:00 WIB" required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Lokasi / Laboratorium"
              value={formData.lokasi}
              onChange={e => setFormData({...formData, lokasi: e.target.value})}
              options={[
                { key: 'Lab Komputer Utama (Lab 1)', value: 'Lab Komputer Utama (Lab 1)' },
                { key: 'Lab Multimedia (Lab 2)', value: 'Lab Multimedia (Lab 2)' },
                { key: 'Ruang Ujian Terpadu A', value: 'Ruang Ujian Terpadu A' },
              ]}
            />

            <Select
              label="Status Sesi"
              value={formData.status}
              onChange={e => setFormData({...formData, status: e.target.value})}
              options={[
                { key: 'Terjadwal', value: 'Terjadwal (Siap Dilaksanakan)' },
                { key: 'Ditunda', value: 'Ditunda / Reschedule' },
              ]}
            />
          </div>
        </form>
      </Modal>
    </Page>
  )
}

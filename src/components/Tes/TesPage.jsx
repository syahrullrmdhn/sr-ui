import { useState } from 'react'
import { mockTes } from '../../data/mockData'
import { Card, CardHeader, CardBody } from '../ui/Card'
import DataTable from '../ui/DataTable'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import Page from '../ui/Page'
import Modal from '../ui/Modal'
import Input from '../ui/Input'
import { useToast } from '../ui/Toast'

export default function TesPage() {
  const { addToast } = useToast()
  const [tesList, setTesList] = useState(mockTes)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const [formData, setFormData] = useState({
    namaTes: '',
    materi: 'Pengetahuan Umum',
    jumlahSoal: 50,
    waktu: 90,
    tanggal: '20 Juli 2026',
    status: 'Aktif'
  })

  const handleOpenAdd = () => {
    setEditingId(null)
    setFormData({ namaTes: '', materi: 'Pengetahuan Umum', jumlahSoal: 50, waktu: 90, tanggal: '20 Juli 2026', status: 'Aktif' })
    setModalOpen(true)
  }

  const handleOpenEdit = (tes) => {
    setEditingId(tes.id)
    setFormData({
      namaTes: tes.namaTes,
      materi: tes.materi,
      jumlahSoal: tes.jumlahSoal,
      waktu: tes.waktu,
      tanggal: tes.tanggal,
      status: tes.status
    })
    setModalOpen(true)
  }

  const handleDelete = (id, nama) => {
    if (window.confirm(`Hapus konfigurasi tes "${nama}"?`)) {
      setTesList(tesList.filter(t => t.id !== id))
      addToast({ title: 'Tes Dihapus', message: `Konfigurasi tes "${nama}" berhasil dihapus.`, variant: 'danger' })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.namaTes) {
      addToast({ title: 'Form Tidak Lengkap', message: 'Nama Tes wajib diisi!', variant: 'warning' })
      return
    }

    if (editingId) {
      setTesList(tesList.map(t => t.id === editingId ? { ...t, ...formData, jumlahSoal: Number(formData.jumlahSoal), waktu: Number(formData.waktu) } : t))
      addToast({ title: 'Tes Diperbarui', message: `Konfigurasi "${formData.namaTes}" berhasil diupdate.`, variant: 'success' })
    } else {
      const newTes = {
        id: Date.now(),
        ...formData,
        jumlahSoal: Number(formData.jumlahSoal),
        waktu: Number(formData.waktu)
      }
      setTesList([newTes, ...tesList])
      addToast({ title: 'Tes Dibuat', message: `Tes baru "${formData.namaTes}" berhasil ditambahkan.`, variant: 'success' })
    }
    setModalOpen(false)
  }

  const columns = [
    { header: 'No', render: (_, i) => i + 1 },
    { header: 'Nama Tes / Subtes', accessor: 'namaTes', render: r => <span className="font-bold text-slate-800">{r.namaTes}</span> },
    { header: 'Materi Uji', accessor: 'materi', render: r => <span className="font-medium text-slate-700">{r.materi}</span> },
    { header: 'Alokasi Soal', accessor: 'jumlahSoal', render: r => <Badge variant="info">{r.jumlahSoal} soal</Badge> },
    { header: 'Durasi Waktu', accessor: 'waktu', render: r => <span className="font-semibold text-slate-700">{r.waktu} menit</span> },
    { header: 'Jadwal Rilis', accessor: 'tanggal', render: r => <span className="text-xs text-slate-500">{r.tanggal}</span> },
    { header: 'Status Tes', accessor: 'status', render: r => <Badge variant={r.status === 'Aktif' ? 'success' : 'warning'} dot>{r.status}</Badge> },
  ]

  return (
    <Page 
      title="Daftar Tes / Subtes Ujian" 
      subtitle="Pengaturan spesifikasi paket tes, durasi pengerjaan, dan status aktif ujian di server"
      icon="fa-clipboard-list"
      bannerTheme="amber"
      badge={`Total: ${tesList.length} Paket Tes`}
    >
      <Card className="flex-1 flex flex-col w-full shadow-sm">
        <CardHeader action={
          <Button variant="primary" size="sm" icon="fa-plus" onClick={handleOpenAdd}>
            Buat Tes / Subtes Baru
          </Button>
        }>
          Daftar Konfigurasi Tes & Subtes CBT
        </CardHeader>
        <CardBody className="flex-1 flex flex-col">
          <DataTable 
            columns={columns} 
            data={tesList}
            className="flex-1"
            actions={row => (
              <div className="flex justify-end gap-1.5">
                <Button variant="outline" size="xs" icon="fa-edit" title="Edit Pengaturan Tes" onClick={() => handleOpenEdit(row)} />
                <Button variant="outline" size="xs" icon="fa-random" title="Acak Soal & Pilihan" onClick={() => addToast({ title: 'Acak Soal Aktif', message: `Urutan soal pada tes "${row.namaTes}" telah diacak otomatis.`, variant: 'info' })} />
                <Button variant="danger" size="xs" icon="fa-trash" title="Hapus Tes" onClick={() => handleDelete(row.id, row.namaTes)} />
              </div>
            )}
          />
        </CardBody>
      </Card>

      {/* Modal Tambah / Edit Tes */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? 'Edit Konfigurasi Tes' : 'Buat Konfigurasi Tes Baru'}
        icon="fa-clipboard-check"
        size="md"
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Batal</Button>
            <Button variant="primary" icon="fa-save" onClick={handleSubmit}>
              {editingId ? 'Simpan Perubahan' : 'Buat Tes Baru'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Nama Tes / Subtes" value={formData.namaTes} onChange={e => setFormData({...formData, namaTes: e.target.value})} icon="fa-clipboard" placeholder="Contoh: Tes Wawasan Kebangsaan (TWK)" required />

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 tracking-wide uppercase">Materi Uji Terkait</label>
            <select value={formData.materi} onChange={e => setFormData({...formData, materi: e.target.value})} className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200/80 rounded-xl focus:border-teal-500 outline-none font-medium text-slate-800">
              <option value="Pengetahuan Umum">Pengetahuan Umum</option>
              <option value="Bahasa Indonesia">Bahasa Indonesia</option>
              <option value="Bahasa Inggris">Bahasa Inggris Kedinasan</option>
              <option value="Logika & Tes Potensi">Logika & Tes Potensi</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Alamat Soal (Jumlah Item)" type="number" value={formData.jumlahSoal} onChange={e => setFormData({...formData, jumlahSoal: e.target.value})} icon="fa-list-ol" required />
            <Input label="Durasi Pengerjaan (Menit)" type="number" value={formData.waktu} onChange={e => setFormData({...formData, waktu: e.target.value})} icon="fa-clock" required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Jadwal Pelaksanaan" value={formData.tanggal} onChange={e => setFormData({...formData, tanggal: e.target.value})} icon="fa-calendar" required />
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 tracking-wide uppercase">Status Tes</label>
              <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200/80 rounded-xl focus:border-teal-500 outline-none font-medium text-slate-800">
                <option value="Aktif">Aktif (Dapat Dikerjakan)</option>
                <option value="Draft">Draft (Disembunyikan)</option>
              </select>
            </div>
          </div>
        </form>
      </Modal>
    </Page>
  )
}

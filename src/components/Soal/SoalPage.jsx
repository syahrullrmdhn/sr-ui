import { useState } from 'react'
import { mockSoal } from '../../data/mockData'
import { Card, CardHeader, CardBody } from '../ui/Card'
import DataTable from '../ui/DataTable'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import Page from '../ui/Page'
import Modal from '../ui/Modal'
import Input from '../ui/Input'
import { BarChart } from '../ui/Chart'
import { useToast } from '../ui/Toast'
import { useNavigate } from 'react-router-dom'

export default function SoalPage() {
  const { addToast } = useToast()
  const navigate = useNavigate()
  const [soalList, setSoalList] = useState(mockSoal)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const [formData, setFormData] = useState({
    kode: '',
    materi: 'Pengetahuan Umum',
    jumlahSoal: 50,
    tipe: 'Pilihan Ganda',
    status: 'Aktif'
  })

  const handleOpenAdd = () => {
    setEditingId(null)
    setFormData({ kode: `SOAL-${Math.floor(100 + Math.random() * 900)}`, materi: 'Pengetahuan Umum', jumlahSoal: 50, tipe: 'Pilihan Ganda', status: 'Aktif' })
    setModalOpen(true)
  }

  const handleOpenEdit = (soal) => {
    setEditingId(soal.id)
    setFormData({
      kode: soal.kode,
      materi: soal.materi,
      jumlahSoal: soal.jumlahSoal,
      tipe: soal.tipe,
      status: soal.status
    })
    setModalOpen(true)
  }

  const handleDelete = (id, kode) => {
    if (window.confirm(`Hapus paket soal "${kode}"?`)) {
      setSoalList(soalList.filter(s => s.id !== id))
      addToast({ title: 'Paket Soal Dihapus', message: `Paket soal "${kode}" berhasil dihapus dari bank soal.`, variant: 'danger' })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.kode || !formData.materi) {
      addToast({ title: 'Input Tidak Lengkap', message: 'Kode Soal dan Materi wajib diisi!', variant: 'warning' })
      return
    }

    if (editingId) {
      setSoalList(soalList.map(s => s.id === editingId ? { ...s, ...formData, jumlahSoal: Number(formData.jumlahSoal) } : s))
      addToast({ title: 'Paket Soal Diupdate', message: `Data paket "${formData.kode}" berhasil diperbarui.`, variant: 'success' })
    } else {
      const newSoal = {
        id: Date.now(),
        ...formData,
        jumlahSoal: Number(formData.jumlahSoal),
        createdAt: 'Hari ini'
      }
      setSoalList([newSoal, ...soalList])
      addToast({ title: 'Paket Soal Dibuat', message: `Paket baru "${formData.kode}" berhasil ditambahkan ke bank soal.`, variant: 'success' })
    }
    setModalOpen(false)
  }

  const chartDataMateri = [
    { label: 'Pengetahuan Umum', value: 120 },
    { label: 'Bahasa Indonesia', value: 85 },
    { label: 'Bahasa Inggris', value: 70 },
    { label: 'Logika & Tes Potensi', value: 65 },
    { label: 'Wawasan Kebangsaan', value: 50 },
  ]

  const columns = [
    { header: 'No', render: (_, i) => i + 1 },
    { header: 'Kode Soal', accessor: 'kode', render: r => <span className="font-bold text-slate-800 font-mono">{r.kode}</span> },
    { header: 'Materi Pelajaran', accessor: 'materi', render: r => <span className="font-semibold text-slate-800">{r.materi}</span> },
    { header: 'Jumlah Butir', accessor: 'jumlahSoal', render: r => <Badge variant="primary">{r.jumlahSoal} soal</Badge> },
    { header: 'Tipe Ujian', accessor: 'tipe' },
    { header: 'Status Bank', accessor: 'status', render: r => <Badge variant={r.status === 'Aktif' ? 'success' : 'warning'} dot>{r.status}</Badge> },
    { header: 'Tanggal Dibuat', accessor: 'createdAt', render: r => <span className="text-xs text-slate-500">{r.createdAt}</span> },
  ]

  return (
    <Page 
      title="Bank Soal & Butir Ujian" 
      subtitle="Pusat penyimpanan, pengelolaan, kompilasi, dan verifikasi butir soal untuk seluruh mata ujian"
      icon="fa-question-circle"
      bannerTheme="emerald"
      badge={`Total: ${soalList.reduce((s, c) => s + c.jumlahSoal, 0)} Butir Soal`}
    >
      {/* Visual Analytics Chart - Full Width */}
      <Card className="border-none ring-1 ring-slate-200/60 w-full overflow-hidden shadow-sm">
        <CardHeader>
          <span className="flex items-center gap-2 text-slate-800 font-bold">
            <i className="fas fa-chart-bar text-emerald-600"></i> Distribusi Butir Soal Berdasarkan Materi Ujian
          </span>
        </CardHeader>
        <CardBody className="pt-3">
          <BarChart 
            data={chartDataMateri} 
            height={180} 
            color="teal" 
            unit="Butir Soal" 
          />
        </CardBody>
      </Card>

      <Card className="flex-1 flex flex-col w-full shadow-sm">
        <CardHeader action={
          <div className="flex flex-wrap gap-2">
            <Button variant="success" size="sm" icon="fa-file-import" onClick={() => navigate('/admin/soal/import')}>
              Import Excel / Word
            </Button>
            <Button variant="primary" size="sm" icon="fa-plus" onClick={handleOpenAdd}>
              Buat Paket Soal Baru
            </Button>
          </div>
        }>
          Daftar Paket Bank Soal CBT
        </CardHeader>
        <CardBody className="flex-1 flex flex-col">
          <DataTable 
            columns={columns} 
            data={soalList}
            className="flex-1"
            actions={row => (
              <div className="flex justify-end gap-1.5">
                <Button variant="outline" size="xs" icon="fa-eye" title="Pratinjau Soal" onClick={() => addToast({ title: 'Pratinjau Soal', message: `Menampilkan butir soal dari paket ${row.kode}...`, variant: 'info' })} />
                <Button variant="outline" size="xs" icon="fa-edit" title="Edit Paket Soal" onClick={() => handleOpenEdit(row)} />
                <Button variant="danger" size="xs" icon="fa-trash" title="Hapus Paket" onClick={() => handleDelete(row.id, row.kode)} />
              </div>
            )}
          />
        </CardBody>
      </Card>

      {/* Modal Tambah / Edit Paket Soal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? 'Edit Paket Bank Soal' : 'Buat Paket Soal Baru'}
        icon="fa-folder-plus"
        size="md"
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Batal</Button>
            <Button variant="primary" icon="fa-save" onClick={handleSubmit}>
              {editingId ? 'Simpan Perubahan' : 'Buat Paket Soal'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input 
              label="Kode Paket Soal" 
              value={formData.kode} 
              onChange={e => setFormData({...formData, kode: e.target.value})} 
              icon="fa-hashtag" 
              placeholder="Contoh: PU-2026-A"
              required 
            />
            <Input 
              label="Jumlah Butir Soal" 
              type="number" 
              value={formData.jumlahSoal} 
              onChange={e => setFormData({...formData, jumlahSoal: e.target.value})} 
              icon="fa-list-ol" 
              placeholder="50"
              required 
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 tracking-wide uppercase">Mata Pelajaran / Materi</label>
            <select 
              value={formData.materi}
              onChange={e => setFormData({...formData, materi: e.target.value})}
              className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200/80 rounded-xl focus:border-teal-500 outline-none font-medium text-slate-800"
            >
              <option value="Pengetahuan Umum">Pengetahuan Umum & Wawasan</option>
              <option value="Bahasa Indonesia">Bahasa Indonesia & Komunikasi</option>
              <option value="Bahasa Inggris">Bahasa Inggris Kedinasan</option>
              <option value="Logika & Tes Potensi">Analisis Logika & Pemecahan Masalah</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 tracking-wide uppercase">Tipe Soal</label>
              <select 
                value={formData.tipe}
                onChange={e => setFormData({...formData, tipe: e.target.value})}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200/80 rounded-xl focus:border-teal-500 outline-none font-medium text-slate-800"
              >
                <option value="Pilihan Ganda">Pilihan Ganda (A - E)</option>
                <option value="Benar / Salah">Benar / Salah (B/S)</option>
                <option value="Essay Singkat">Essay Singkat</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 tracking-wide uppercase">Status Bank</label>
              <select 
                value={formData.status}
                onChange={e => setFormData({...formData, status: e.target.value})}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200/80 rounded-xl focus:border-teal-500 outline-none font-medium text-slate-800"
              >
                <option value="Aktif">Aktif (Siap Dirakit)</option>
                <option value="Draft">Draft (Belum Selesai)</option>
              </select>
            </div>
          </div>
        </form>
      </Modal>
    </Page>
  )
}

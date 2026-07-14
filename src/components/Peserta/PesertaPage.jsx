import { useState } from 'react'
import { mockPeserta } from '../../data/mockData'
import { Card, CardHeader, CardBody } from '../ui/Card'
import DataTable from '../ui/DataTable'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import Page from '../ui/Page'
import Modal from '../ui/Modal'
import Input from '../ui/Input'
import { DonutChart } from '../ui/Chart'
import { useToast } from '../ui/Toast'

const statusMap = { 'Diterima': 'success', 'Verifikasi': 'warning', 'Ditolak': 'danger' }

export default function PesertaPage() {
  const { addToast } = useToast()
  const [pesertaList, setPesertaList] = useState(mockPeserta)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const [formData, setFormData] = useState({
    nopes: '',
    nama: '',
    nip: '',
    gender: 'L',
    kotama: 'Kotama A',
    satker: 'Satker 1',
    pangkat: 'Penata / III-c',
    status: 'Diterima'
  })

  const handleOpenAdd = () => {
    setEditingId(null)
    const randomNum = Math.floor(1000 + Math.random() * 9000)
    setFormData({ nopes: `2026-${randomNum}`, nama: '', nip: '', gender: 'L', kotama: 'Kotama A', satker: 'Satker 1', pangkat: 'Penata / III-c', status: 'Diterima' })
    setModalOpen(true)
  }

  const handleOpenEdit = (peserta) => {
    setEditingId(peserta.id)
    setFormData({
      nopes: peserta.nopes,
      nama: peserta.nama,
      nip: peserta.nip,
      gender: peserta.gender,
      kotama: peserta.kotama,
      satker: peserta.satker,
      pangkat: peserta.pangkat,
      status: peserta.status
    })
    setModalOpen(true)
  }

  const handleDelete = (id, nama) => {
    if (window.confirm(`Hapus data peserta "${nama}"?`)) {
      setPesertaList(pesertaList.filter(p => p.id !== id))
      addToast({ title: 'Peserta Dihapus', message: `Data peserta "${nama}" berhasil dihapus.`, variant: 'danger' })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.nama || !formData.nip) {
      addToast({ title: 'Data Kurang Lengkap', message: 'Nama Lengkap dan NIP wajib diisi!', variant: 'warning' })
      return
    }

    if (editingId) {
      setPesertaList(pesertaList.map(p => p.id === editingId ? { ...p, ...formData } : p))
      addToast({ title: 'Data Diupdate', message: `Data peserta "${formData.nama}" berhasil diperbarui.`, variant: 'success' })
    } else {
      const newPeserta = {
        id: Date.now(),
        ...formData
      }
      setPesertaList([newPeserta, ...pesertaList])
      addToast({ title: 'Peserta Didata', message: `Peserta baru "${formData.nama}" berhasil didaftarkan.`, variant: 'success' })
    }
    setModalOpen(false)
  }

  const statusDonut = [
    { label: 'Diterima & Verifikasi Lolos', value: pesertaList.filter(p => p.status === 'Diterima').length, color: '#10b981' },
    { label: 'Dalam Proses Verifikasi', value: pesertaList.filter(p => p.status === 'Verifikasi').length, color: '#f59e0b' },
    { label: 'Berkas Ditolak / Perbaikan', value: pesertaList.filter(p => p.status === 'Ditolak').length, color: '#ef4444' },
  ]

  const columns = [
    { header: 'No', render: (_, i) => i + 1 },
    { header: 'No. Peserta', accessor: 'nopes', render: r => <span className="font-bold text-slate-800 font-mono">{r.nopes}</span> },
    { header: 'Nama Lengkap', accessor: 'nama', render: r => <span className="font-semibold text-slate-800 uppercase">{r.nama}</span> },
    { header: 'NIP / Identitas', accessor: 'nip', render: r => <span className="text-xs text-slate-500 font-mono">{r.nip}</span> },
    { header: 'JK', accessor: 'gender' },
    { header: 'UO / Kotama', accessor: 'kotama', render: r => <span className="text-xs font-medium">{r.kotama}</span> },
    { header: 'Satker / Unit', accessor: 'satker', render: r => <span className="text-xs">{r.satker}</span> },
    { header: 'Pangkat / Gol', accessor: 'pangkat', render: r => <Badge variant="gray">{r.pangkat}</Badge> },
    { header: 'Status Verifikasi', accessor: 'status', render: r => <Badge variant={statusMap[r.status] || 'info'} dot>{r.status}</Badge> },
  ]

  return (
    <Page 
      title="Manajemen Induk Peserta Ujian" 
      subtitle="Manajemen dan verifikasi berkas pendaftaran peserta yang terdaftar pada gelombang ujian aktif"
      icon="fa-user-graduate"
      bannerTheme="indigo"
      badge={`Total: ${pesertaList.length} Peserta`}
    >
      {/* Chart Status Peserta - Full Width */}
      <Card className="border-none ring-1 ring-slate-200/60 w-full overflow-hidden shadow-sm">
        <CardHeader>
          <span className="flex items-center gap-2 text-slate-800 font-bold">
            <i className="fas fa-chart-pie text-indigo-600"></i> Statistik Status Verifikasi Peserta Ujian
          </span>
        </CardHeader>
        <CardBody className="py-4">
          <DonutChart items={statusDonut} totalLabel="Orang" />
        </CardBody>
      </Card>

      <Card className="flex-1 flex flex-col w-full shadow-sm">
        <CardHeader action={
          <div className="flex flex-wrap gap-2">
            <Button variant="success" size="sm" icon="fa-file-export" onClick={() => addToast({ title: 'Export PDF/Excel', message: 'Daftar peserta telah diekspor ke dalam berkas Excel.', variant: 'success' })}>
              Export Data Peserta
            </Button>
            <Button variant="primary" size="sm" icon="fa-plus" onClick={handleOpenAdd}>
              Tambah Peserta Baru
            </Button>
          </div>
        }>
          Daftar Induk Peserta Terdaftar CBT
        </CardHeader>
        <CardBody className="flex-1 flex flex-col">
          <DataTable 
            columns={columns} 
            data={pesertaList}
            className="flex-1"
            actions={row => (
              <div className="flex justify-end gap-1.5">
                <Button variant="outline" size="xs" icon="fa-eye" title="Lihat Profil" onClick={() => addToast({ title: 'Profil Peserta', message: `Nama: ${row.nama} | NIP: ${row.nip}`, variant: 'info' })} />
                <Button variant="outline" size="xs" icon="fa-edit" title="Edit Peserta" onClick={() => handleOpenEdit(row)} />
                <Button variant="outline" size="xs" icon="fa-id-card" title="Cetak Kartu Ujian" onClick={() => addToast({ title: 'Cetak Kartu', message: `Mencetak kartu ujian digital untuk ${row.nama}...`, variant: 'success' })} />
                <Button variant="danger" size="xs" icon="fa-trash" title="Hapus Peserta" onClick={() => handleDelete(row.id, row.nama)} />
              </div>
            )}
          />
        </CardBody>
      </Card>

      {/* Modal Tambah / Edit Peserta */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? 'Edit Data Peserta Ujian' : 'Registrasi Peserta Baru'}
        icon="fa-user-plus"
        size="lg"
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Batal</Button>
            <Button variant="primary" icon="fa-save" onClick={handleSubmit}>
              {editingId ? 'Simpan Perubahan' : 'Daftarkan Peserta'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Nomor Peserta" value={formData.nopes} onChange={e => setFormData({...formData, nopes: e.target.value})} icon="fa-hashtag" required />
            <Input label="Nomor Induk Pegawai (NIP)" value={formData.nip} onChange={e => setFormData({...formData, nip: e.target.value})} icon="fa-id-badge" required />
          </div>

          <Input label="Nama Lengkap Sesuai SK" value={formData.nama} onChange={e => setFormData({...formData, nama: e.target.value})} icon="fa-user" placeholder="Nama lengkap dan gelar" required className="uppercase" />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 tracking-wide uppercase">Jenis Kelamin</label>
              <select value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})} className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200/80 rounded-xl focus:border-teal-500 outline-none font-medium text-slate-800">
                <option value="L">Laki - laki (L)</option>
                <option value="P">Perempuan (P)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 tracking-wide uppercase">Kotama / UO</label>
              <select value={formData.kotama} onChange={e => setFormData({...formData, kotama: e.target.value})} className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200/80 rounded-xl focus:border-teal-500 outline-none font-medium text-slate-800">
                <option value="Kotama A">Kotama A</option>
                <option value="Kotama B">Kotama B</option>
                <option value="Kotama C">Kotama C</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 tracking-wide uppercase">Satker / Unit</label>
              <select value={formData.satker} onChange={e => setFormData({...formData, satker: e.target.value})} className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200/80 rounded-xl focus:border-teal-500 outline-none font-medium text-slate-800">
                <option value="Satker 1">Satker 1</option>
                <option value="Satker 2">Satker 2</option>
                <option value="Satker 3">Satker 3</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <Input label="Pangkat / Golongan" value={formData.pangkat} onChange={e => setFormData({...formData, pangkat: e.target.value})} icon="fa-star" />

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 tracking-wide uppercase">Status Verifikasi</label>
              <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200/80 rounded-xl focus:border-teal-500 outline-none font-medium text-slate-800">
                <option value="Diterima">Diterima (Siap Ujian)</option>
                <option value="Verifikasi">Verifikasi (Dalam Pemeriksaan)</option>
                <option value="Ditolak">Ditolak (Perlu Perbaikan Data)</option>
              </select>
            </div>
          </div>
        </form>
      </Modal>
    </Page>
  )
}

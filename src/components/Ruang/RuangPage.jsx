import { useState } from 'react'
import { mockRuang } from '../../data/mockData'
import { Card, CardHeader, CardBody } from '../ui/Card'
import DataTable from '../ui/DataTable'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import { ProgressBar } from '../ui/Progress'
import Page from '../ui/Page'
import Modal from '../ui/Modal'
import Input from '../ui/Input'
import Select from '../ui/Select'
import { useToast } from '../ui/Toast'
import { useMessageBox } from '../ui/MessageBox'

export default function RuangPage() {
  const { confirm } = useMessageBox()
  const { addToast } = useToast()
  const [ruangList, setRuangList] = useState(mockRuang)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const [formData, setFormData] = useState({
    kode: '',
    namaRuang: 'Laboratorium Baru',
    kapasitas: 40,
    peserta: 0,
    lokasi: 'Gedung Utama CBT - Lantai 2',
    status: 'Aktif'
  })

  const handleOpenAdd = () => {
    setEditingId(null)
    const nextNum = ruangList.length + 1
    setFormData({ kode: `LOK-0${nextNum}`, namaRuang: 'Laboratorium Baru', kapasitas: 40, peserta: 0, lokasi: 'Gedung Utama CBT - Lantai 2', status: 'Aktif' })
    setModalOpen(true)
  }

  const handleOpenEdit = (ruang) => {
    setEditingId(ruang.id)
    setFormData({
      kode: ruang.kode,
      namaRuang: ruang.namaRuang,
      kapasitas: ruang.kapasitas,
      peserta: ruang.peserta,
      lokasi: ruang.lokasi,
      status: ruang.status
    })
    setModalOpen(true)
  }

  const handleDelete = async (id, nama) => {
    const confirmed = await confirm({ title: 'Konfirmasi Hapus', message: `Hapus data laboratorium "${nama}"?`, variant: 'danger', confirmText: 'Ya, Hapus' })
    if (confirmed) {
      setRuangList(ruangList.filter(r => r.id !== id))
      addToast({ title: 'Lab Dihapus', message: `Data laboratorium "${nama}" berhasil dihapus.`, variant: 'danger' })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.kode || !formData.namaRuang) {
      addToast({ title: 'Form Tidak Lengkap', message: 'Kode dan Nama Ruang wajib diisi!', variant: 'warning' })
      return
    }

    if (editingId) {
      setRuangList(ruangList.map(r => r.id === editingId ? { ...r, ...formData, kapasitas: Number(formData.kapasitas), peserta: Number(formData.peserta) } : r))
      addToast({ title: 'Ruang Diperbarui', message: `Laboratorium "${formData.namaRuang}" berhasil diperbarui.`, variant: 'success' })
    } else {
      const newRuang = {
        id: Date.now(),
        ...formData,
        kapasitas: Number(formData.kapasitas),
        peserta: Number(formData.peserta)
      }
      setRuangList([newRuang, ...ruangList])
      addToast({ title: 'Ruang Ditambahkan', message: `Laboratorium baru "${formData.namaRuang}" berhasil didaftarkan.`, variant: 'success' })
    }
    setModalOpen(false)
  }

  const columns = [
    { header: 'No', render: (_, i) => i + 1 },
    { header: 'Kode Ruang', accessor: 'kode', render: r => <span className="font-bold text-slate-800 font-mono">{r.kode}</span> },
    { header: 'Nama Laboratorium / Ruang', accessor: 'namaRuang', render: r => <span className="font-semibold text-slate-800">{r.namaRuang}</span> },
    { header: 'Kapasitas Klien', accessor: 'kapasitas', render: r => <Badge variant="info">{r.kapasitas} Komputer</Badge> },
    { header: 'Okupansi Peserta', render: r => (
      <div className="w-32">
        <div className="flex justify-between text-xs font-semibold mb-1 text-slate-700">
          <span>{r.peserta} terisi</span>
          <span>{Math.round((r.peserta / r.kapasitas) * 100)}%</span>
        </div>
        <ProgressBar value={r.peserta} max={r.kapasitas} variant={r.peserta / r.kapasitas > 0.8 ? 'danger' : 'success'} size="sm" showPercent={false} />
      </div>
    )},
    { header: 'Lokasi Gedung', accessor: 'lokasi', render: r => <span className="text-xs text-slate-600 font-medium">{r.lokasi}</span> },
    { header: 'Status Lab', accessor: 'status', render: r => <Badge variant={r.status === 'Aktif' ? 'success' : 'warning'} dot>{r.status}</Badge> },
  ]

  return (
    <Page 
      title="Manajemen Ruang & Laboratorium CBT" 
      subtitle="Monitoring kapasitas klien komputer, alokasi pengawas lab, dan status kesiapan perangkat di setiap ruangan"
      icon="fa-door-open"
      bannerTheme="teal"
      badge={`Total: ${ruangList.length} Ruang Lab`}
    >
      <Card className="flex-1 flex flex-col w-full shadow-sm">
        <CardHeader action={
          <Button variant="primary" size="sm" icon="fa-plus" onClick={handleOpenAdd}>
            Registrasi Lab / Ruang Baru
          </Button>
        }>
          Daftar Ruang Laboratorium CBT Terdaftar
        </CardHeader>
        <CardBody className="flex-1 flex flex-col">
          <DataTable 
            columns={columns} 
            data={ruangList}
            className="flex-1"
            actions={row => (
              <div className="flex justify-end gap-1.5">
                <Button variant="outline" size="xs" icon="fa-users" title="Daftar Peserta Ruang Ini" onClick={() => addToast({ title: 'Okupansi Ruang', message: `${row.peserta} dari ${row.kapasitas} kursi terisi di ${row.namaRuang}.`, variant: 'info' })} />
                <Button variant="outline" size="xs" icon="fa-edit" title="Edit Ruang" onClick={() => handleOpenEdit(row)} />
                <Button variant="outline" size="xs" icon="fa-print" title="Cetak Denah" onClick={() => addToast({ title: 'Cetak Denah', message: `Mencetak denah tempat duduk laboratorium ${row.kode}...`, variant: 'success' })} />
                <Button variant="danger" size="xs" icon="fa-trash" title="Hapus Ruang" onClick={() => handleDelete(row.id, row.namaRuang)} />
              </div>
            )}
          />
        </CardBody>
      </Card>

      {/* Modal Tambah / Edit Ruang */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? 'Edit Data Laboratorium' : 'Registrasi Ruang Lab Baru'}
        icon="fa-door-open"
        size="md"
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Batal</Button>
            <Button variant="primary" icon="fa-save" onClick={handleSubmit}>
              {editingId ? 'Simpan Perubahan' : 'Daftarkan Ruang'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Kode Ruang / Lab" value={formData.kode} onChange={e => setFormData({...formData, kode: e.target.value})} icon="fa-hashtag" placeholder="LOK-04" required />
            <Input label="Kapasitas Klien (PC)" type="number" value={formData.kapasitas} onChange={e => setFormData({...formData, kapasitas: e.target.value})} icon="fa-desktop" required />
          </div>

          <Input label="Nama Laboratorium / Ruangan" value={formData.namaRuang} onChange={e => setFormData({...formData, namaRuang: e.target.value})} icon="fa-school" placeholder="Contoh: Lab Komputer Khusus A" required />

          <Input label="Lokasi / Gedung" value={formData.lokasi} onChange={e => setFormData({...formData, lokasi: e.target.value})} icon="fa-building" placeholder="Gedung Sayap Kanan - Lantai 1" required />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Peserta Terisi Saat Ini" type="number" value={formData.peserta} onChange={e => setFormData({...formData, peserta: e.target.value})} icon="fa-users" />
            <Select
              label="Status Kesiapan Lab"
              value={formData.status}
              onChange={e => setFormData({...formData, status: e.target.value})}
              options={[
                { key: 'Aktif', value: 'Aktif (100% Siap Ujian)' },
                { key: 'Maintenance', value: 'Maintenance / Dalam Perbaikan' },
              ]}
            />
          </div>
        </form>
      </Modal>
    </Page>
  )
}

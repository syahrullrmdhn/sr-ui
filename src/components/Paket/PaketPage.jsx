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

export default function PaketPage() {
  const { addToast } = useToast()
  const [modalOpen, setModalOpen] = useState(false)
  const [paketList, setPaketList] = useState([
    { id: 1, kode: 'PKT-TWK-01', nama: 'Paket Ujian Penyesuaian Kenaikan Pangkat A', jumlahSoal: 100, durasi: '120 Menit', status: 'Verifikasi Lolos' },
    { id: 2, kode: 'PKT-DINAS-01', nama: 'Paket Ujian Dinas Tingkat I Gelombang 1', jumlahSoal: 80, durasi: '90 Menit', status: 'Verifikasi Lolos' },
    { id: 3, kode: 'PKT-SIM-02', nama: 'Paket Simulasi & Tryout Mandiri Peserta', jumlahSoal: 50, durasi: '60 Menit', status: 'Draft Review' },
  ])

  const [formData, setFormData] = useState({
    kode: 'PKT-NEW-01',
    nama: '',
    jumlahSoal: 100,
    durasi: '120 Menit',
    status: 'Verifikasi Lolos'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.nama) {
      addToast({ title: 'Nama Kosong', message: 'Nama Paket Ujian wajib diisi!', variant: 'warning' })
      return
    }

    const newPaket = {
      id: Date.now(),
      ...formData,
      jumlahSoal: Number(formData.jumlahSoal)
    }
    setPaketList([newPaket, ...paketList])
    addToast({ title: 'Paket Dirakit', message: `Paket soal "${formData.nama}" berhasil dirakit dan disimpan.`, variant: 'success' })
    setModalOpen(false)
    setFormData({ kode: `PKT-NEW-0${paketList.length + 2}`, nama: '', jumlahSoal: 100, durasi: '120 Menit', status: 'Verifikasi Lolos' })
  }

  const handleDelete = (id, nama) => {
    if (window.confirm(`Hapus paket ujian "${nama}"?`)) {
      setPaketList(paketList.filter(p => p.id !== id))
      addToast({ title: 'Paket Dihapus', message: `Paket berhasil dihapus dari sistem.`, variant: 'danger' })
    }
  }

  const columns = [
    { header: 'No', render: (_, i) => i + 1 },
    { header: 'Kode Paket', accessor: 'kode', render: r => <span className="font-bold text-slate-800 font-mono">{r.kode}</span> },
    { header: 'Nama Paket Ujian Kompilasi', accessor: 'nama', render: r => <span className="font-semibold text-slate-800">{r.nama}</span> },
    { header: 'Total Butir Soal', accessor: 'jumlahSoal', render: r => <Badge variant="primary">{r.jumlahSoal} Soal</Badge> },
    { header: 'Durasi Waktu', accessor: 'durasi', render: r => <span className="font-medium text-slate-700">{r.durasi}</span> },
    { header: 'Status Rakitan', accessor: 'status', render: r => <Badge variant={r.status === 'Verifikasi Lolos' ? 'success' : 'warning'} dot>{r.status}</Badge> },
  ]

  return (
    <Page 
      title="Manajemen Paket Soal CBT" 
      subtitle="Kompilasi, pengacakan, dan pengaturan pembobotan skor butir soal dalam satu bundel ujian"
      icon="fa-box"
      bannerTheme="amber"
      badge={`Total: ${paketList.length} Paket Ujian`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 w-full">
        <ClassicStatCard colorTheme="orange" value={paketList.length} title="Paket Ujian Terdaftar" icon="fa-box-open" footerText="Siap Dijadwalkan" />
        <ClassicStatCard colorTheme="green" value={paketList.reduce((s, c) => s + c.jumlahSoal, 0)} title="Total Butir Soal Terikat" icon="fa-list-ol" footerText="Acak Otomatis" />
        <ClassicStatCard colorTheme="blue" value="1" title="Paket Sedang Draft" icon="fa-edit" footerText="Butuh Review Admin" />
      </div>

      <Card className="flex-1 flex flex-col w-full shadow-sm">
        <CardHeader action={
          <Button variant="primary" size="sm" icon="fa-plus" onClick={() => setModalOpen(true)}>
            Rakit Paket Soal Baru
          </Button>
        }>
          Daftar Bundel & Paket Ujian Kompilasi Aktif
        </CardHeader>
        <CardBody className="flex-1 flex flex-col">
          <DataTable 
            columns={columns} 
            data={paketList} 
            className="flex-1"
            actions={row => (
              <div className="flex justify-end gap-1.5">
                <Button variant="outline" size="xs" icon="fa-random" title="Acak Butir Soal" onClick={() => addToast({ title: 'Acak Soal Selesai', message: `Urutan dan opsi jawaban pada paket ${row.kode} telah diacak.`, variant: 'info' })} />
                <Button variant="outline" size="xs" icon="fa-edit" title="Edit Paket" onClick={() => setModalOpen(true)} />
                <Button variant="danger" size="xs" icon="fa-trash" title="Hapus Paket" onClick={() => handleDelete(row.id, row.nama)} />
              </div>
            )}
          />
        </CardBody>
      </Card>

      {/* Modal Perakitan Paket */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Rakit Paket Bank Soal Ujian Baru"
        icon="fa-box-open"
        size="md"
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Batal</Button>
            <Button variant="primary" icon="fa-save" onClick={handleSubmit}>Simpan Paket Soal</Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Kode Paket" value={formData.kode} onChange={e => setFormData({...formData, kode: e.target.value})} icon="fa-hashtag" required />
          <Input label="Nama Paket Ujian" value={formData.nama} onChange={e => setFormData({...formData, nama: e.target.value})} icon="fa-box" placeholder="Contoh: Paket Ujian Dinas Gelombang 2" required />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Total Butir Soal" type="number" value={formData.jumlahSoal} onChange={e => setFormData({...formData, jumlahSoal: e.target.value})} icon="fa-list-ol" required />
            <Input label="Durasi Waktu Pengerjaan" value={formData.durasi} onChange={e => setFormData({...formData, durasi: e.target.value})} icon="fa-clock" placeholder="120 Menit" required />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 tracking-wide uppercase">Status Rakitan</label>
            <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200/80 rounded-xl focus:border-teal-500 outline-none font-medium text-slate-800">
              <option value="Verifikasi Lolos">Verifikasi Lolos (Siap Digunakan)</option>
              <option value="Draft Review">Draft Review (Dalam Pengecekan)</option>
            </select>
          </div>
        </form>
      </Modal>
    </Page>
  )
}

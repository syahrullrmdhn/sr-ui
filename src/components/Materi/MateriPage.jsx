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

export default function MateriPage() {
  const { addToast } = useToast()
  const [modalOpen, setModalOpen] = useState(false)
  const [materiList, setMateriList] = useState([
    { id: 1, kode: 'MAT-01', judul: 'Silabus Tes Pengetahuan Umum & Wawasan Kebangsaan', kategori: 'Wajib Dasar', berkas: 'Silabus_TWK_2026.pdf', ukuran: '2.4 MB', tanggal: '10 Juli 2026' },
    { id: 2, kode: 'MAT-02', judul: 'Kisi-Kisi Soal Analisis Matematika & Numerik', kategori: 'Kuantitatif', berkas: 'Kisi_Numerik_v2.pdf', ukuran: '1.8 MB', tanggal: '11 Juli 2026' },
    { id: 3, kode: 'MAT-03', judul: 'Panduan Evaluasi Bahasa Indonesia Kedinasan', kategori: 'Bahasa', berkas: 'Panduan_BIndo.pdf', ukuran: '3.1 MB', tanggal: '12 Juli 2026' },
  ])

  const [formData, setFormData] = useState({
    kode: 'MAT-04',
    judul: '',
    kategori: 'Wajib Dasar',
    berkas: 'Panduan_Baru.pdf'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.judul) {
      addToast({ title: 'Judul Kosong', message: 'Judul materi wajib diisi!', variant: 'warning' })
      return
    }

    const newMateri = {
      id: Date.now(),
      ...formData,
      ukuran: '2.1 MB',
      tanggal: 'Hari ini'
    }
    setMateriList([newMateri, ...materiList])
    addToast({ title: 'Materi Diunggah', message: `Materi "${formData.judul}" berhasil ditambahkan ke katalog.`, variant: 'success' })
    setModalOpen(false)
    setFormData({ kode: `MAT-0${materiList.length + 2}`, judul: '', kategori: 'Wajib Dasar', berkas: 'Dokumen_Silabus.pdf' })
  }

  const handleDelete = (id, judul) => {
    if (window.confirm(`Hapus materi silabus "${judul}"?`)) {
      setMateriList(materiList.filter(m => m.id !== id))
      addToast({ title: 'Materi Dihapus', message: `Dokumen silabus berhasil dihapus.`, variant: 'danger' })
    }
  }

  const columns = [
    { header: 'No', render: (_, i) => i + 1 },
    { header: 'Kode Materi', accessor: 'kode', render: r => <span className="font-bold text-slate-800 font-mono">{r.kode}</span> },
    { header: 'Judul Silabus / Referensi', accessor: 'judul', render: r => <span className="font-semibold text-slate-800">{r.judul}</span> },
    { header: 'Kategori Uji', accessor: 'kategori', render: r => <Badge variant="info">{r.kategori}</Badge> },
    { header: 'Nama Berkas', accessor: 'berkas', render: r => <span className="text-xs font-mono text-teal-600 bg-teal-50 px-2 py-1 rounded border border-teal-100 flex items-center gap-1 w-max"><i className="fas fa-file-pdf"></i> {r.berkas} ({r.ukuran})</span> },
    { header: 'Tanggal Rilis', accessor: 'tanggal', render: r => <span className="text-xs text-slate-500">{r.tanggal}</span> },
  ]

  return (
    <Page 
      title="Manajemen Materi & Silabus Ujian" 
      subtitle="Pengaturan referensi kisi-kisi, dokumen silabus, dan bahan bacaan persiapan untuk peserta"
      icon="fa-book"
      bannerTheme="indigo"
      badge={`Total: ${materiList.length} Materi`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 w-full">
        <ClassicStatCard colorTheme="blue" value={materiList.length} title="Total Materi Terdaftar" icon="fa-book-open" footerText="Silabus & Kisi-kisi" />
        <ClassicStatCard colorTheme="teal" value="48" title="Dokumen & Kisi-Kisi" icon="fa-file-alt" footerText="Siap Diunduh Peserta" />
        <ClassicStatCard colorTheme="purple" value="3" title="Kategori Mata Ujian" icon="fa-tags" footerText="Terverifikasi" />
      </div>

      <Card className="flex-1 flex flex-col w-full shadow-sm">
        <CardHeader action={
          <Button variant="primary" size="sm" icon="fa-plus" onClick={() => setModalOpen(true)}>
            Unggah Materi Baru
          </Button>
        }>
          Daftar Silabus & Referensi Pembelajaran CBT
        </CardHeader>
        <CardBody className="flex-1 flex flex-col">
          <DataTable 
            columns={columns} 
            data={materiList} 
            className="flex-1"
            actions={row => (
              <div className="flex justify-end gap-1.5">
                <Button variant="outline" size="xs" icon="fa-download" title="Unduh Silabus" onClick={() => addToast({ title: 'Mengunduh File', message: `Berkas ${row.berkas} sedang diunduh...`, variant: 'info' })} />
                <Button variant="danger" size="xs" icon="fa-trash" title="Hapus Materi" onClick={() => handleDelete(row.id, row.judul)} />
              </div>
            )}
          />
        </CardBody>
      </Card>

      {/* Modal Unggah Materi */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Unggah Dokumen Materi & Silabus Baru"
        icon="fa-cloud-upload-alt"
        size="md"
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Batal</Button>
            <Button variant="primary" icon="fa-save" onClick={handleSubmit}>Simpan & Unggah Materi</Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Kode Referensi Materi" value={formData.kode} onChange={e => setFormData({...formData, kode: e.target.value})} icon="fa-hashtag" required />
          <Input label="Judul Silabus / Referensi Pembelajaran" value={formData.judul} onChange={e => setFormData({...formData, judul: e.target.value})} icon="fa-book" placeholder="Contoh: Silabus Tes Pengetahuan Dasar 2026" required />

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 tracking-wide uppercase">Kategori Mata Ujian</label>
            <select value={formData.kategori} onChange={e => setFormData({...formData, kategori: e.target.value})} className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200/80 rounded-xl focus:border-teal-500 outline-none font-medium text-slate-800">
              <option value="Wajib Dasar">Wajib Dasar</option>
              <option value="Kuantitatif">Kuantitatif & Numerik</option>
              <option value="Bahasa">Bahasa & Komunikasi</option>
              <option value="Khusus Instansi">Khusus Instansi / Kejuruan</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 tracking-wide uppercase">Pilih Berkas (.pdf / .docx)</label>
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition">
              <i className="fas fa-file-upload text-2xl text-teal-600 mb-2"></i>
              <div className="text-xs font-bold text-slate-700">Klik atau seret file dokumen silabus ke sini</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Maksimal ukuran berkas 15 MB</div>
            </div>
          </div>
        </form>
      </Modal>
    </Page>
  )
}

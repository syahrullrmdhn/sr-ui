import React, { useState } from 'react'
import PageBanner from '../ui/PageBanner'
import { Card, CardHeader, CardBody } from '../ui/Card'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Select from '../ui/Select'
import RichTextEditor from '../ui/RichTextEditor'
import Badge from '../ui/Badge'
import { useToast } from '../ui/Toast'

export default function BeritaPage() {
  const { addToast } = useToast()

  const [articles, setArticles] = useState([
    {
      id: 1,
      judul: 'Tata Tertib & Panduan Pelaksanaan Ujian CBT Gelombang I Tahun 2026',
      kategori: 'Instruksi & Panduan',
      status: 'Published',
      tanggal: '14 Juli 2026',
      penulis: 'Super Admin CBT',
      konten: `
        <h3>Panduan Resmi Peserta Ujian</h3>
        <p>Dengan hormat disampaikan kepada seluruh peserta seleksi berbasis komputer (CBT) bahwa pelaksanaan ujian Gelombang I akan dilaksanakan secara serentak di seluruh laboratorium yang telah ditentukan.</p>
        
        <div style="background-color: #f8f5f1; border-left: 4px solid #a86e2f; padding: 12px 16px; border-radius: 8px; margin: 14px 0;">
          <strong style="color: #a86e2f;"><i class="fas fa-exclamation-triangle"></i> Ketentuan Wajib Hadir:</strong> Peserta diwajibkan hadir 30 menit sebelum sesi dimulai untuk verifikasi biometrik dan pemeriksaan berkas fisik.
        </div>

        <h4>Daftar Barang yang Dilarang Masuk Ruang Ujian:</h4>
        <ul>
          <li>Perangkat komunikasi seluler (handphone, smartwatch, tablet).</li>
          <li>Kalkulator fisik, buku catatan, maupun rumus referensi.</li>
          <li>Senjata tajam atau barang berbahaya lainnya.</li>
        </ul>
        <p>Pelanggaran terhadap tata tertib di atas akan berakibat pada diskualifikasi otomatis dari sistem.</p>
      `
    },
    {
      id: 2,
      judul: 'Jadwal Maintenance Server & Pembaruan Bank Soal Kompetensi Teknis',
      kategori: 'Pemberitahuan Sistem',
      status: 'Draft',
      tanggal: '12 Juli 2026',
      penulis: 'Tim IT Kemhan',
      konten: `<p>Pemberitahuan kepada seluruh operator dan pengawas lokasi ujian bahwa server utama akan mengalami pemeliharaan rutin pada hari Sabtu pukul 22.00 - 04.00 WIB.</p>`
    }
  ])

  const [selectedArticle, setSelectedArticle] = useState(articles[0])
  const [isEditing, setIsEditing] = useState(false)

  const handleCreateNew = () => {
    const newArt = {
      id: Date.now(),
      judul: 'Judul Pengumuman Baru...',
      kategori: 'Pemberitahuan Sistem',
      status: 'Draft',
      tanggal: '14 Juli 2026',
      penulis: 'Super Admin CBT',
      konten: `<h3>Judul Artikel / Pengumuman</h3><p>Tuliskan isi pengumuman atau berita portal ujian di sini menggunakan Rich Text Editor...</p>`
    }
    setArticles([newArt, ...articles])
    setSelectedArticle(newArt)
    setIsEditing(true)
  }

  const handleSaveArticle = () => {
    setArticles(articles.map(a => a.id === selectedArticle.id ? selectedArticle : a))
    setIsEditing(false)
    addToast({
      title: 'Pengumuman Berhasil Disimpan',
      message: `Artikel "${selectedArticle.judul}" telah diperbarui dan disinkronkan ke portal ujian.`,
      variant: 'success'
    })
  }

  return (
    <div className="space-y-6 w-full font-sans text-[#2c2c2c] pb-10">
      <PageBanner
        title="Manajemen Pengumuman & Berita Portal (Rich Text)"
        subtitle="Publikasikan instruksi ujian, silabus, maupun pengumuman resmi ke halaman utama peserta menggunakan editor berformat lengkap."
        icon="fa-newspaper"
        badge="Rich Text Portal News"
        actions={
          <Button variant="primary" size="sm" icon="fa-plus" onClick={handleCreateNew}>
            Buat Pengumuman Baru
          </Button>
        }
      />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Daftar Artikel Kiri */}
        <div className="w-full lg:w-1/3 flex flex-col space-y-4">
          <Card className="shadow-sm border border-[#e8d9c7]">
            <CardHeader actions={<Badge variant="primary">{articles.length} Artikel</Badge>}>
              Daftar Pengumuman CBT
            </CardHeader>
            <CardBody className="p-3 space-y-2 max-h-[620px] overflow-y-auto">
              {articles.map((art) => {
                const isActive = selectedArticle?.id === art.id
                return (
                  <div
                    key={art.id}
                    onClick={() => { setSelectedArticle(art); setIsEditing(false) }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isActive ? 'bg-[#a86e2f] text-white shadow-sm border-[#a86e2f]' : 'bg-white hover:bg-[#f8f5f1] border-[#e8d9c7] text-[#2c2c2c]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <Badge variant={isActive ? 'primary' : (art.status === 'Published' ? 'success' : 'warning')} className={isActive ? 'bg-white text-[#a86e2f]' : ''}>
                        {art.status}
                      </Badge>
                      <span className={`text-[11px] ${isActive ? 'text-white/80' : 'text-[#6b5e52]'}`}>{art.tanggal}</span>
                    </div>
                    <div className="font-bold text-sm leading-tight mb-1 line-clamp-2">{art.judul}</div>
                    <div className={`text-xs flex items-center gap-1.5 ${isActive ? 'text-white/90' : 'text-[#6b5e52]'}`}>
                      <i className="fas fa-folder-open text-[10px]"></i> {art.kategori}
                    </div>
                  </div>
                )
              })}
            </CardBody>
          </Card>
        </div>

        {/* Panel Editor & Detail Kanan */}
        <div className="w-full lg:w-2/3 flex flex-col space-y-6">
          <Card className="shadow-sm border border-[#e8d9c7]">
            <CardHeader actions={
              <div className="flex items-center gap-2">
                {!isEditing ? (
                  <Button variant="primary" size="xs" icon="fa-edit" onClick={() => setIsEditing(true)}>
                    Sunting Artikel
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" size="xs" onClick={() => setIsEditing(false)}>
                      Batal
                    </Button>
                    <Button variant="success" size="xs" icon="fa-check" onClick={handleSaveArticle}>
                      Simpan Perubahan
                    </Button>
                  </>
                )}
              </div>
            }>
              {isEditing ? 'Penyuntingan Pengumuman' : 'Preview Detail Pengumuman'}
            </CardHeader>
            <CardBody className="p-6 space-y-5">
              {isEditing ? (
                <>
                  <Input
                    label="Judul Pengumuman / Artikel"
                    value={selectedArticle.judul}
                    onChange={(e) => setSelectedArticle({ ...selectedArticle, judul: e.target.value })}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                      label="Kategori Pengumuman"
                      value={selectedArticle.kategori}
                      onChange={(e) => setSelectedArticle({ ...selectedArticle, kategori: e.target.value })}
                      options={[
                        { value: 'Instruksi & Panduan', label: 'Instruksi & Panduan Ujian' },
                        { value: 'Pemberitahuan Sistem', label: 'Pemberitahuan Sistem & Maintenance' },
                        { value: 'Silabus & Materi Ujian', label: 'Silabus & Referensi Materi' },
                        { value: 'Jadwal & Gelombang', label: 'Informasi Jadwal & Gelombang' },
                      ]}
                    />
                    <Select
                      label="Status Publikasi"
                      value={selectedArticle.status}
                      onChange={(e) => setSelectedArticle({ ...selectedArticle, status: e.target.value })}
                      options={[
                        { value: 'Published', label: '🟢 Published (Tampil di Portal)' },
                        { value: 'Draft', label: '🟡 Draft (Internal Admin saja)' },
                      ]}
                    />
                  </div>
                  <RichTextEditor
                    value={selectedArticle.konten}
                    onChange={(val) => setSelectedArticle({ ...selectedArticle, konten: val })}
                    label="Isi Pengumuman / Artikel Berita"
                    helperText="Anda dapat menyisipkan callout peringatan, tabel jadwal, atau diagram instruksi di dalam pengumuman ini."
                    minHeight="360px"
                  />
                </>
              ) : (
                <div className="space-y-6">
                  <div className="border-b border-[#e8d9c7] pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={selectedArticle.status === 'Published' ? 'success' : 'warning'} dot>
                        {selectedArticle.status}
                      </Badge>
                      <Badge variant="secondary">{selectedArticle.kategori}</Badge>
                    </div>
                    <h2 className="text-xl md:text-2xl font-extrabold text-[#2c2c2c] m-0">{selectedArticle.judul}</h2>
                    <div className="flex items-center gap-4 text-xs text-[#6b5e52] mt-2">
                      <span><i className="fas fa-user-edit mr-1 text-[#a86e2f]"></i> {selectedArticle.penulis}</span>
                      <span><i className="far fa-calendar-alt mr-1 text-[#2f69a8]"></i> {selectedArticle.tanggal}</span>
                    </div>
                  </div>

                  <div 
                    className="prose prose-sm max-w-none text-[#2c2c2c] leading-relaxed p-6 bg-[#f8f5f1] rounded-2xl border border-[#e8d9c7] shadow-inner"
                    dangerouslySetInnerHTML={{ __html: selectedArticle.konten }}
                  />
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { mockRekap } from '../../data/mockData'
import { Card, CardHeader, CardBody } from '../ui/Card'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import Page from '../ui/Page'
import Modal from '../ui/Modal'
import Select from '../ui/Select'
import { BarChart, DonutChart } from '../ui/Chart'
import { useToast } from '../ui/Toast'

export default function RekapPage() {
  const { addToast } = useToast()
  const [search, setSearch] = useState('')
  const [selectedPeserta, setSelectedPeserta] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const filtered = mockRekap.filter(p => 
    p.nama.toLowerCase().includes(search.toLowerCase()) || 
    p.nip.toLowerCase().includes(search.toLowerCase())
  )

  const handleOpenDetail = (peserta) => {
    setSelectedPeserta(peserta)
    setModalOpen(true)
  }

  const chartNilai = [
    { label: 'Sangat Baik (>=85)', value: filtered.filter(p => (p.tes.reduce((s, t) => s + t.nilai, 0) / p.tes.length) >= 85).length },
    { label: 'Lulus Baik (70-84)', value: filtered.filter(p => {
      const avg = p.tes.reduce((s, t) => s + t.nilai, 0) / p.tes.length
      return avg >= 70 && avg < 85
    }).length },
    { label: 'Belum Lulus (<70)', value: filtered.filter(p => (p.tes.reduce((s, t) => s + t.nilai, 0) / p.tes.length) < 70).length },
  ]

  const chartLulus = [
    { label: 'Peserta Lulus Ujian', value: filtered.filter(p => (p.tes.reduce((s, t) => s + t.nilai, 0) / p.tes.length) >= 70).length, color: '#10b981' },
    { label: 'Peserta Tidak Lulus', value: filtered.filter(p => (p.tes.reduce((s, t) => s + t.nilai, 0) / p.tes.length) < 70).length, color: '#ef4444' },
  ]

  return (
    <Page 
      title="Rekapitulasi Nilai & Kelulusan Akhir" 
      subtitle="Monitoring real-time perolehan skor ujian CBT, analisa statistik butir soal, dan pengesahan kelulusan"
      icon="fa-chart-line"
      bannerTheme="blue"
      badge="Rekap Nilai Real-Time"
    >
      {/* Grid Charts Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 w-full">
        <Card className="lg:col-span-2 border-none ring-1 ring-slate-200/60 w-full overflow-hidden shadow-sm">
          <CardHeader>
            <span className="flex items-center gap-2 text-slate-800 font-bold">
              <i className="fas fa-chart-bar text-teal-600"></i> Distribusi Kategori Nilai Peserta Ujian
            </span>
          </CardHeader>
          <CardBody className="pt-3">
            <BarChart 
              data={chartNilai} 
              height={180} 
              color="teal" 
              unit="Peserta" 
            />
          </CardBody>
        </Card>

        <Card className="border-none ring-1 ring-slate-200/60 w-full overflow-hidden shadow-sm">
          <CardHeader>
            <span className="flex items-center gap-2 text-slate-800 font-bold">
              <i className="fas fa-chart-pie text-emerald-600"></i> Persentase Kelulusan
            </span>
          </CardHeader>
          <CardBody className="py-2">
            <DonutChart items={chartLulus} totalLabel="Peserta" />
          </CardBody>
        </Card>
      </div>

      <Card className="flex-1 flex flex-col w-full shadow-sm">
        <CardHeader action={
          <div className="flex flex-wrap gap-2">
            <Button variant="success" size="sm" icon="fa-file-excel" onClick={() => addToast({ title: 'Ekspor Excel', message: 'Rekapitulasi nilai akhir telah diekspor ke format Excel (.xlsx)', variant: 'success' })}>
              Ekspor Excel
            </Button>
            <Button variant="danger" size="sm" icon="fa-file-pdf" onClick={() => addToast({ title: 'Ekspor PDF', message: 'Laporan kelulusan resmi sedang dibuat ke format PDF (.pdf)', variant: 'info' })}>
              Laporan PDF
            </Button>
            <Button variant="outline" size="sm" icon="fa-print" onClick={() => addToast({ title: 'Cetak Lembar Nilai', message: 'Membuka dialog pencetakan dokumen resmi...', variant: 'success' })}>
              Cetak Rekap
            </Button>
          </div>
        }>
          Tabel Rekapitulasi Hasil Evaluasi & Kelulusan
        </CardHeader>
        <CardBody className="flex-1 flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Select
                label=""
                options={[
                  { key: 'all', value: 'Semua Gelombang Ujian' },
                  { key: 'kenaikan', value: 'Ujian Penyesuaian Kenaikan Pangkat' },
                  { key: 'dinas', value: 'Ujian Dinas Tingkat I & II' },
                ]}
              />
            </div>
            <div className="relative w-full sm:w-72">
              <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
              <input 
                type="text" 
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200/80 rounded-xl focus:bg-white focus:border-teal-500 outline-none transition-all placeholder:text-slate-400 font-medium" 
                placeholder="Cari nama atau NIP peserta..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200/60 shadow-2xs flex-1">
            <table className="w-full text-sm whitespace-nowrap">
              <thead className="bg-slate-50/80 border-b border-slate-200/60">
                <tr>
                  <th rowSpan="2" className="px-5 py-3.5 text-left font-semibold text-slate-700 text-xs tracking-wide uppercase align-middle">No</th>
                  <th rowSpan="2" className="px-5 py-3.5 text-left font-semibold text-slate-700 text-xs tracking-wide uppercase align-middle">Nama Lengkap</th>
                  <th rowSpan="2" className="px-5 py-3.5 text-left font-semibold text-slate-700 text-xs tracking-wide uppercase align-middle">NIP / Identitas</th>
                  <th rowSpan="2" className="px-5 py-3.5 text-left font-semibold text-slate-700 text-xs tracking-wide uppercase align-middle">Pangkat</th>
                  <th colSpan="3" className="px-5 py-3.5 text-center font-semibold text-slate-700 text-xs tracking-wide uppercase border-b border-slate-200/60">Nilai Subtes Mata Ujian</th>
                  <th rowSpan="2" className="px-5 py-3.5 text-center font-semibold text-slate-700 text-xs tracking-wide uppercase align-middle">Rata-rata</th>
                  <th rowSpan="2" className="px-5 py-3.5 text-center font-semibold text-slate-700 text-xs tracking-wide uppercase align-middle">Status Akhir</th>
                  <th rowSpan="2" className="px-5 py-3.5 text-center font-semibold text-slate-700 text-xs tracking-wide uppercase align-middle">Aksi</th>
                </tr>
                <tr>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-600 tracking-wide uppercase">Pengetahuan Umum</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-600 tracking-wide uppercase">Bahasa Indonesia</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-slate-600 tracking-wide uppercase">Matematika / Logika</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white whitespace-nowrap">
                {filtered.map((p, i) => {
                  const avg = Math.round(p.tes.reduce((s, t) => s + t.nilai, 0) / p.tes.length)
                  return (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-5 py-3.5 text-slate-600">{i + 1}</td>
                      <td className="px-5 py-3.5 font-extrabold text-slate-800 uppercase">{p.nama}</td>
                      <td className="px-5 py-3.5 text-xs font-mono text-slate-500">{p.nip}</td>
                      <td className="px-5 py-3.5 text-slate-700 font-medium">{p.pangkat}</td>
                      {p.tes.map((t, ti) => (
                        <td key={ti} className="px-5 py-3.5">
                          <span className={`font-extrabold px-2.5 py-1 rounded-md text-xs ${t.nilai >= 70 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' : 'bg-rose-50 text-rose-700 border border-rose-200/60'}`}>
                            {t.nilai}
                          </span>
                        </td>
                      ))}
                      <td className="px-5 py-3.5 text-center">
                        <strong className="text-base font-extrabold text-teal-600 font-mono">{avg}</strong>
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <Badge variant={avg >= 70 ? 'success' : 'danger'} dot>
                          {avg >= 70 ? 'Lulus' : 'Tidak Lulus'}
                        </Badge>
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <Button variant="outline" size="xs" icon="fa-id-card" onClick={() => handleOpenDetail(p)}>
                          Detail Transkrip
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      {/* Modal Detail Transkrip */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Detail Transkrip & Evaluasi Hasil Ujian"
        icon="fa-graduation-cap"
        size="lg"
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Tutup</Button>
            <Button variant="success" icon="fa-print" onClick={() => addToast({ title: 'Cetak Sertifikat', message: `Mencetak sertifikat hasil ujian untuk ${selectedPeserta?.nama}...`, variant: 'success' })}>
              Cetak Transkrip / Sertifikat
            </Button>
          </>
        }
      >
        {selectedPeserta && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-widest text-teal-100 font-bold">Transkrip Nilai Digital CBT</div>
                <h4 className="text-lg font-extrabold mt-0.5">{selectedPeserta.nama}</h4>
                <div className="text-xs font-mono text-white/90 mt-1 flex items-center gap-3">
                  <span>NIP: {selectedPeserta.nip}</span>
                  <span>•</span>
                  <span>Pangkat: {selectedPeserta.pangkat}</span>
                </div>
              </div>
              <div className="bg-white/15 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/20 text-center">
                <div className="text-[10px] text-white/80 font-bold uppercase">Rata-rata Skor</div>
                <div className="text-3xl font-extrabold font-mono">
                  {Math.round(selectedPeserta.tes.reduce((s, t) => s + t.nilai, 0) / selectedPeserta.tes.length)}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h6 className="font-bold text-sm text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2">
                <i className="fas fa-list-check text-teal-600"></i> Rincian Perolehan Nilai Per Subtes Mata Ujian
              </h6>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {selectedPeserta.tes.map((t, i) => (
                  <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 flex flex-col justify-between">
                    <span className="text-xs font-semibold text-slate-500 uppercase">{t.nama}</span>
                    <div className="flex items-end justify-between mt-3">
                      <span className="text-2xl font-extrabold font-mono text-slate-800">{t.nilai}</span>
                      <Badge variant={t.nilai >= 70 ? 'success' : 'danger'}>{t.nilai >= 70 ? 'Lulus Passing Grade' : 'Di Bawah Standar'}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200/80 text-xs text-emerald-800 flex items-center gap-3">
              <i className="fas fa-check-circle text-2xl text-emerald-600 flex-shrink-0"></i>
              <div>
                <strong className="block font-bold">Rekomendasi Kelulusan Sistem:</strong>
                <span>Peserta dinyatakan <strong>LULUS</strong> dalam pengujian kompetensi dasar dan berhak melanjutkan ke tahapan sertifikasi selanjutnya.</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </Page>
  )
}

import React, { useState } from 'react'
import Page from '../ui/Page'
import { Card, CardHeader, CardBody } from '../ui/Card'
import Button from '../ui/Button'
import { useToast } from '../ui/Toast'
import { useNavigate } from 'react-router-dom'

export default function SoalImportPage() {
  const { addToast } = useToast()
  const navigate = useNavigate()
  const [dragActive, setDragActive] = useState(false)

  const handleSimulateImport = () => {
    addToast({ title: 'Impor Berhasil', message: '50 butir soal berhasil diimpor ke dalam bank soal active.', variant: 'success' })
    setTimeout(() => navigate('/admin/soal'), 1000)
  }

  return (
    <Page 
      title="Impor Bank Soal Ujian" 
      subtitle="Unggah berkas template Excel (.xlsx) atau Word (.docx) untuk mengimpor massal butir soal dan pilihan ganda"
      icon="fa-file-import"
      bannerTheme="emerald"
      badge="Impor Massal Soal"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 w-full flex-1">
        {/* Kolom Kiri: Unggah Berkas - Full Width */}
        <Card className="lg:col-span-2 flex-1 flex flex-col w-full shadow-sm">
          <CardHeader action={
            <Button variant="outline" size="xs" icon="fa-download" onClick={() => addToast({ title: 'Template Diunduh', message: 'Template_Soal_CBT.xlsx telah diunduh.', variant: 'info' })}>
              Unduh Template Resmi (.xlsx)
            </Button>
          }>
            Area Unggah Dokumen Soal
          </CardHeader>
          <CardBody className="flex-1 flex flex-col justify-center items-center p-8">
            <div 
              onDragOver={e => { e.preventDefault(); setDragActive(true) }}
              onDragLeave={() => setDragActive(false)}
              onDrop={e => { e.preventDefault(); setDragActive(false); handleSimulateImport() }}
              className={`w-full flex-1 min-h-[300px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-8 transition-all duration-300 ${
                dragActive ? 'border-emerald-500 bg-emerald-50/50 scale-[0.99]' : 'border-slate-300 bg-slate-50/50 hover:bg-slate-50 hover:border-emerald-400'
              }`}
            >
              <div className="w-20 h-20 bg-white text-emerald-600 rounded-2xl flex items-center justify-center text-4xl mb-4 shadow-sm border border-emerald-100">
                <i className="fas fa-cloud-upload-alt"></i>
              </div>
              <h4 className="text-base font-bold text-slate-800">Seret & Lepaskan File Excel / Word di Sini</h4>
              <p className="text-xs text-slate-500 max-w-sm text-center mt-1">
                Format yang didukung: .xlsx, .xls, atau .docx dengan struktur tabel yang sesuai dengan format resmi CBT.
              </p>

              <div className="mt-6 flex items-center gap-3">
                <label className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2.5 rounded-xl cursor-pointer shadow-sm text-xs md:text-sm flex items-center gap-2 transition-colors">
                  <i className="fas fa-folder-open"></i> Pilih Berkas dari Komputer
                  <input type="file" className="hidden" onChange={handleSimulateImport} />
                </label>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Kolom Kanan: Panduan & Aturan - Full Width */}
        <Card className="flex-1 flex flex-col w-full shadow-sm">
          <CardHeader>Panduan & Ketentuan Format</CardHeader>
          <CardBody className="flex-1 flex flex-col space-y-4 text-xs text-slate-600 leading-relaxed">
            <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/60 space-y-2">
              <div className="font-bold text-amber-900 flex items-center gap-1.5">
                <i className="fas fa-exclamation-triangle text-amber-600"></i> Perhatian Penting Sebelum Impor
              </div>
              <ul className="list-disc list-inside space-y-1 text-amber-800/90 pl-1">
                <li>Gunakan hanya template resmi yang telah disediakan oleh sistem agar tidak terjadi error pembacaan kolom.</li>
                <li>Pastikan tidak ada sel ganda (merged cells) pada tabel butir soal di Excel.</li>
                <li>Untuk soal bergambar atau audio, silakan unggah file media pada menu lampiran setelah impor selesai.</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-2">
              <div className="font-bold text-slate-800 flex items-center gap-1.5">
                <i className="fas fa-list-check text-slate-500"></i> Kolom Wajib Pada Template Excel:
              </div>
              <div className="space-y-1 font-mono text-[11px] text-slate-700">
                <div className="p-1.5 bg-white border border-slate-200 rounded">1. KODE_SOAL (Contoh: PU-001)</div>
                <div className="p-1.5 bg-white border border-slate-200 rounded">2. PERTANYAAN (Teks Butir Soal)</div>
                <div className="p-1.5 bg-white border border-slate-200 rounded">3. PILIHAN_A s/d PILIHAN_E</div>
                <div className="p-1.5 bg-white border border-slate-200 rounded">4. KUNCI_JAWABAN (A / B / C / D / E)</div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </Page>
  )
}

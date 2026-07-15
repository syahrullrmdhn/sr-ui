import React from 'react'
import Page from '../ui/Page'
import { Card, CardHeader, CardBody } from '../ui/Card'
import Button from '../ui/Button'
import { useToast } from '../ui/Toast'
import { useNavigate } from 'react-router-dom'
import FileUpload from '../ui/FileUpload'

export default function SoalImportPage() {
  const { addToast } = useToast()
  const navigate = useNavigate()
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
            <FileUpload name="file" label="Import Soal" accept=".xlsx,.xls,.csv" onFileChange={(f) => { console.log(f); handleSimulateImport() }} />
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

import { useState } from 'react'
import { mockToken } from '../../data/mockData'
import { Card, CardHeader, CardBody } from '../ui/Card'
import Button from '../ui/Button'
import { useToast } from '../ui/Toast'
import Page from '../ui/Page'
import ClassicStatCard from '../ui/ClassicStatCard'

export default function TokenPage() {
  const [token, setToken] = useState(mockToken.currentToken)
  const { addToast } = useToast()

  const generate = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    for (let i = 0; i < 8; i++) result += chars[Math.floor(Math.random() * chars.length)]
    setToken(result)
    addToast({ title: 'Token Baru Diterbitkan', message: 'Token ujian berhasil digenerate: ' + result, variant: 'success' })
  }

  return (
    <Page 
      title="Token Akses Ujian (CBT Key)" 
      subtitle="Generate, rilis, dan pantau masa berlaku token keamanan untuk memulai sesi pengerjaan soal peserta"
      icon="fa-key"
      bannerTheme="slate"
      badge="Keamanan Sistem"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 w-full">
        <ClassicStatCard colorTheme="teal" value={token} title="Token Aktif Saat Ini" icon="fa-shield-alt" footerText="Berlaku 15 Menit" />
        <ClassicStatCard colorTheme="blue" value={mockToken.generatedBy} title="Di-generate Oleh" icon="fa-user-shield" footerText="Akses Admin Utama" />
        <ClassicStatCard colorTheme="orange" value={mockToken.expiredAt} title="Waktu Kadaluwarsa" icon="fa-clock" footerText="Perpanjang Otomatis" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 w-full flex-1">
        {/* Card Generator Token - Full Width */}
        <Card className="flex-1 flex flex-col w-full shadow-sm">
          <CardHeader>Generator Token Keamanan</CardHeader>
          <CardBody className="flex-1 flex flex-col justify-between p-6 font-sans">
            {/* Clean Solid #f8f5f1 Token Box without gradient */}
            <div className="bg-[#f8f5f1] border-2 border-[#e8d9c7] p-6 md:p-8 rounded-2xl text-center shadow-inner my-auto relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-[#a86e2f]/10 blur-sm pointer-events-none"></div>
              <div className="text-xs font-bold tracking-widest text-[#a86e2f] uppercase mb-2 flex items-center justify-center gap-1.5">
                <i className="fas fa-lock text-[#a86e2f]"></i> KODE TOKEN AKTIF SESI UJIAN
              </div>
              <div className="text-5xl md:text-6xl font-extrabold text-[#2c2c2c] tracking-[10px] font-sans my-4 drop-shadow-2xs">{token}</div>
              <div className="text-xs text-[#6b5e52] font-bold mt-2">
                Bagikan token ini hanya kepada peserta yang sudah hadir dan siap di dalam ruang ujian.
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
              <Button variant="primary" size="lg" icon="fa-sync-alt" onClick={generate} className="flex-1 py-3.5 shadow-md">
                Perbarui & Rilis Token Baru
              </Button>
              <Button variant="outline" size="lg" icon="fa-copy" onClick={() => { navigator.clipboard.writeText(token); addToast({ title: 'Tersalin', message: 'Token berhasil disalin ke clipboard', variant: 'info' }) }} className="py-3.5">
                Salin Token
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Card Panduan & Log Token - Full Width */}
        <Card className="flex-1 flex flex-col w-full shadow-sm">
          <CardHeader>Informasi & Riwayat Keamanan</CardHeader>
          <CardBody className="flex-1 flex flex-col space-y-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 pb-2 border-b border-slate-200">
                <span>Di-generate Oleh Admin:</span>
                <span className="text-slate-900 font-bold">{mockToken.generatedBy}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 pb-2 border-b border-slate-200">
                <span>Masa Berlaku Token:</span>
                <span className="text-rose-600 font-bold">{mockToken.expiredAt}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>Status Sinkronisasi Server:</span>
                <span className="text-emerald-600 font-bold flex items-center gap-1"><i className="fas fa-check-circle"></i> Terhubung & Sinkron</span>
              </div>
            </div>

            <div className="p-4 bg-teal-50/50 rounded-xl border border-teal-100 text-xs text-teal-900 leading-relaxed space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-teal-800">
                <i className="fas fa-info-circle text-teal-600"></i> Catatan Prosedur Token CBT
              </div>
              <ul className="list-disc list-inside space-y-1 text-teal-800/90 pl-1">
                <li>Token otomatis kedaluwarsa setelah 15 menit jika tidak diperbarui atau diubah.</li>
                <li>Peserta yang sedang mengerjakan soal tidak akan terputus saat token baru diterbitkan.</li>
                <li>Jika terjadi kendala login pada peserta tertentu, segera periksa kecocokan token ini.</li>
              </ul>
            </div>
          </CardBody>
        </Card>
      </div>
    </Page>
  )
}

import { useNavigate } from 'react-router-dom'
import { VerticalTabs } from '../ui/Tabs'
import Alert from '../ui/Alert'
import Button from '../ui/Button'
import { CircularProgress } from '../ui/Progress'
import Avatar from '../ui/Avatar'

export default function ExamPage() {
  const navigate = useNavigate()

  const sidebarContent = (
    <div className="text-center py-2">
      <Avatar name="Ahmad Fauzi" size="xl" className="mx-auto mb-3 shadow-sm ring-4 ring-teal-50" />
      <div className="font-extrabold text-base text-slate-800">Ahmad Fauzi</div>
      <div className="text-xs font-mono text-teal-600 bg-teal-50 px-3 py-1 rounded-full inline-block mt-1 border border-teal-100 font-semibold">PST-001</div>
    </div>
  )

  const tabs = [
    {
      id: 'home', icon: 'fa-home', label: 'Beranda Ujian',
      content: (
        <div className="flex-1 flex flex-col justify-between space-y-6">
          <div>
            <h6 className="font-bold text-lg mb-4 text-slate-800 flex items-center gap-2">
              <i className="fas fa-desktop text-teal-600"></i> Portal Ujian Aktif Peserta
            </h6>
            <Alert variant="info" className="mb-6">
              Silakan periksa koneksi internet Anda dan pilih menu <strong>Jadwal Ujian</strong> atau klik tombol mulai pada kartu di bawah jika waktu pengerjaan telah dibuka.
            </Alert>

            <div className="bg-gradient-to-br from-slate-50 to-teal-50/40 border border-slate-200/80 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-2xs">
              <div className="flex items-center gap-5">
                <CircularProgress value={85} variant="success" size="lg" />
                <div>
                  <div className="font-extrabold text-lg text-slate-800">Tes Kompetensi Dasar & Pengetahuan Umum</div>
                  <div className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                    <span className="bg-white px-2.5 py-1 rounded-md border border-slate-200 font-medium"><i className="far fa-calendar-alt text-teal-600"></i> 20 Juli 2026</span>
                    <span className="bg-white px-2.5 py-1 rounded-md border border-slate-200 font-medium"><i className="far fa-clock text-teal-600"></i> 120 Menit</span>
                  </div>
                </div>
              </div>
              <Button variant="primary" size="lg" icon="fa-play" onClick={() => navigate('/peserta/exam/start')} className="px-8 py-3.5 shadow-md shadow-teal-500/20 w-full sm:w-auto font-bold">
                Mulai Ujian Sekarang
              </Button>
            </div>
          </div>

          <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/60 text-xs text-amber-800 flex items-center gap-3">
            <i className="fas fa-shield-alt text-xl text-amber-600 flex-shrink-0"></i>
            <span>Sistem dilengkapi dengan pemantauan tab browser aktif. Dilarang membuka halaman lain selama sesi berlangsung.</span>
          </div>
        </div>
      )
    },
    {
      id: 'profile', icon: 'fa-user-check', label: 'Biodata Peserta',
      content: (
        <div className="flex-1 flex flex-col">
          <h6 className="font-bold text-lg mb-6 text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
            <i className="fas fa-id-card text-teal-600"></i> Verifikasi Data Diri Peserta
          </h6>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 flex-1">
            {[
              ['Nomor Induk Pegawai (NIP)', '198501012010011001'], ['Nama Lengkap', 'AHMAD FAUZI, S.Kom.'],
              ['Tempat, Tanggal Lahir', 'Jakarta, 1 Januari 1985'], ['Jenis Kelamin', 'Laki-laki'],
              ['UO / Kotama', 'Kotama A - Sekretariat Jenderal'], ['Satker / Unit Kerja', 'Satker 1 - Biro SDM dan Organisasi'],
              ['Pangkat / Golongan Ruang', 'Pembina / IV-a'], ['Status Pendaftaran', 'Terverifikasi & Siap Ujian'],
            ].map(([label, val]) => (
              <div key={label} className="flex flex-col justify-center border-b border-slate-100/80 py-2.5">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{label}</span>
                <span className="text-sm font-bold text-slate-800 mt-0.5">{val}</span>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'jadwal', icon: 'fa-calendar-check', label: 'Jadwal Sesi Ujian',
      content: (
        <div className="flex-1 flex flex-col">
          <h6 className="font-bold text-lg mb-6 text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
            <i className="fas fa-calendar-alt text-teal-600"></i> Daftar Mata Ujian Terjadwal
          </h6>
          <div className="space-y-4 flex-1">
            {[
              { nama: 'Tes Kompetensi Dasar & Wawasan Kebangsaan', waktu: '08:00 - 10:00 WIB', tgl: '20 Juli 2026', status: 'Siap Dikerjakan', variant: 'success' },
              { nama: 'Tes Bahasa Indonesia & Bahasa Inggris Kedinasan', waktu: '10:30 - 12:00 WIB', tgl: '20 Juli 2026', status: 'Menunggu Sesi', variant: 'info' },
              { nama: 'Tes Analisis Logika & Pemecahan Masalah', waktu: '13:00 - 14:30 WIB', tgl: '21 Juli 2026', status: 'Terjadwal', variant: 'warning' },
            ].map((j, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-slate-50/80 hover:bg-slate-50 rounded-2xl border border-slate-200/60 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-600 text-white flex items-center justify-center text-lg shadow-sm">
                    <i className="fas fa-clipboard-list"></i>
                  </div>
                  <div>
                    <div className="font-extrabold text-base text-slate-800">{j.nama}</div>
                    <div className="text-xs text-slate-500 flex items-center gap-3 mt-1 font-medium">
                      <span><i className="far fa-calendar text-teal-600"></i> {j.tgl}</span>
                      <span><i className="far fa-clock text-teal-600"></i> {j.waktu}</span>
                    </div>
                  </div>
                </div>
                <span className={`text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider ${j.variant === 'success' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : j.variant === 'info' ? 'bg-blue-100 text-blue-800 border border-blue-300' : 'bg-amber-100 text-amber-800 border border-amber-300'}`}>
                  {j.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'kartu', icon: 'fa-id-badge', label: 'Kartu Peserta Digital',
      content: (
        <div className="flex-1 flex flex-col items-center justify-center py-6">
          <div className="border-2 border-slate-200 rounded-3xl p-8 w-full max-w-lg bg-gradient-to-br from-white via-slate-50 to-teal-50/30 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-12 -mt-12 w-32 h-32 bg-teal-500/10 rounded-full blur-xl pointer-events-none"></div>
            
            <div className="text-center border-b-2 border-dashed border-slate-200 pb-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center text-lg mx-auto mb-2 shadow-2xs">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <div className="text-base font-extrabold tracking-wider uppercase text-slate-800">KARTU PESERTA UJIAN DIGITAL</div>
              <div className="text-xs text-teal-700 font-semibold mt-0.5">SISTEM UJIAN BERBASIS KOMPUTER (CBT) 2026</div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="w-28 h-36 bg-slate-200/80 rounded-2xl flex flex-col items-center justify-center text-slate-400 text-4xl border-2 border-white shadow-md flex-shrink-0">
                <i className="fas fa-user mb-1"></i>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Pas Foto 3x4</span>
              </div>
              <div className="text-sm space-y-2.5 flex-1 w-full">
                <div className="border-b border-slate-100 pb-1">
                  <span className="text-xs text-slate-400 block font-semibold">NAMA LENGKAP PESERTA</span>
                  <span className="font-extrabold text-slate-800 uppercase">AHMAD FAUZI, S.Kom.</span>
                </div>
                <div className="border-b border-slate-100 pb-1">
                  <span className="text-xs text-slate-400 block font-semibold">NOMOR INDUK PEGAWAI (NIP)</span>
                  <span className="font-bold text-slate-800 font-mono">198501012010011001</span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <span className="text-xs text-slate-400 block font-semibold">USERNAME LOGIN</span>
                    <span className="font-extrabold text-teal-700 font-mono text-base">PST-001</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-semibold">KODE RUANG LAB</span>
                    <span className="font-extrabold text-slate-800 font-mono text-base">LOK-01</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200/80 flex justify-between items-center text-xs text-slate-500">
              <span>Dicetak secara digital oleh sistem CBT</span>
              <Button variant="outline" size="xs" icon="fa-print">Cetak Kartu Ujian</Button>
            </div>
          </div>
        </div>
      )
    },
  ]

  return (
    <div className="w-full flex-1 flex flex-col">
      <VerticalTabs tabs={tabs} sidebarContent={sidebarContent} className="flex-1" />
    </div>
  )
}

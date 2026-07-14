import { useNavigate } from 'react-router-dom'
import { VerticalTabs } from '../ui/Tabs'
import Alert from '../ui/Alert'
import Button from '../ui/Button'
import { CircularProgress } from '../ui/Progress'
import Avatar from '../ui/Avatar'

export default function ExamPage() {
  const navigate = useNavigate()

  const sidebarContent = (
    <div className="text-center">
      <Avatar name="Ahmad Fauzi" size="xl" className="mx-auto mb-2" />
      <div className="font-bold text-sm">PST-001</div>
      <div className="text-gray-600">Ahmad Fauzi</div>
    </div>
  )

  const tabs = [
    {
      id: 'home', icon: 'fa-home', label: 'Home',
      content: (
        <div>
          <h6 className="font-bold mb-4 flex items-center gap-2"><i className="fas fa-comments text-primary"></i> Selamat Datang Ahmad Fauzi</h6>
          <Alert variant="info">Silahkan pilih menu <strong>Jadwal Ujian</strong> untuk melihat jadwal ujian yang tersedia.</Alert>
          <div className="bg-white border border-gray-100 rounded-xl p-5 flex items-center gap-5 mt-4 shadow-sm">
            <CircularProgress value={85} variant="primary" />
            <div>
              <div className="font-bold text-base">Tes Kompetensi Dasar</div>
              <div className="text-xs text-gray-400">20 Juli 2026</div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Button variant="primary" size="lg" rounded icon="fa-play" onClick={() => navigate('/peserta/exam/start')}>
              Mulai Ujian
            </Button>
          </div>
        </div>
      )
    },
    {
      id: 'profile', icon: 'fa-user', label: 'Profile',
      content: (
        <div>
          <h6 className="font-bold mb-4 flex items-center gap-2"><i className="fas fa-user text-primary"></i> Profil Peserta</h6>
          <div className="space-y-3">
            {[
              ['NIP', '198501012010011001'], ['Nama', 'Ahmad Fauzi'], ['Tempat Lahir', 'Jakarta'],
              ['Tanggal Lahir', '1 Januari 1985'], ['Jenis Kelamin', 'Laki-laki'],
              ['Kotama/UO', 'Kotama A'], ['Satker', 'Satker 1'], ['Pangkat', 'Pembina / IV-a'],
            ].map(([label, val]) => (
              <div key={label} className="flex border-b border-gray-100 pb-2">
                <span className="w-32 text-xs text-gray-500 font-medium">{label}</span>
                <span className="text-sm">{val}</span>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'jadwal', icon: 'fa-calendar', label: 'Jadwal Ujian',
      content: (
        <div>
          <h6 className="font-bold mb-4 flex items-center gap-2"><i className="fas fa-calendar text-primary"></i> Jadwal Ujian</h6>
          <div className="space-y-3">
            {[
              { nama: 'Tes Kompetensi Dasar', waktu: '08:00 - 09:30', tgl: '20 Juli 2026', status: 'Akan Datang' },
              { nama: 'Tes Bahasa', waktu: '10:00 - 11:00', tgl: '20 Juli 2026', status: 'Akan Datang' },
            ].map((j, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <i className="fas fa-clipboard"></i>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">{j.nama}</div>
                  <div className="text-xs text-gray-400">{j.tgl} | {j.waktu}</div>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">{j.status}</span>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'kartu', icon: 'fa-id-card', label: 'Kartu Peserta',
      content: (
        <div>
          <h6 className="font-bold mb-4 flex items-center gap-2"><i className="fas fa-id-card text-primary"></i> Kartu Peserta</h6>
          <div className="border border-gray-200 rounded-xl p-6 max-w-sm">
            <div className="text-center border-b border-gray-200 pb-3 mb-4">
              <div className="text-xs font-bold tracking-wider uppercase">Kartu Peserta</div>
              <div className="text-xs text-gray-500">Sistem Ujian Online</div>
            </div>
            <div className="flex gap-4">
              <div className="w-20 h-24 bg-gray-100 rounded flex items-center justify-center text-gray-300 text-2xl"><i className="fas fa-user"></i></div>
              <div className="text-xs space-y-1">
                <div><strong>Nama:</strong> Ahmad Fauzi</div>
                <div><strong>NIP:</strong> 198501012010011001</div>
                <div><strong>Username:</strong> PST-001</div>
                <div><strong>Password:</strong> ******</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
  ]

  return (
    <div className="p-5">
      <VerticalTabs tabs={tabs} sidebarContent={sidebarContent} />
    </div>
  )
}

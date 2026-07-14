import StatCard from '../ui/StatCard'
import { Card, CardHeader, CardBody } from '../ui/Card'
import { ProgressBar } from '../ui/Progress'

export default function DashboardPage() {
  const activities = [
    { icon: 'fa-user-plus', color: 'bg-green-500/10 text-green-600', text: 'Peserta baru terdaftar', time: '5 menit lalu' },
    { icon: 'fa-clipboard-check', color: 'bg-sky-500/10 text-sky-600', text: 'Tes Kompetensi selesai', time: '1 jam lalu' },
    { icon: 'fa-key', color: 'bg-amber-500/10 text-amber-600', text: 'Token diperbarui', time: '2 jam lalu' },
    { icon: 'fa-upload', color: 'bg-primary/10 text-primary', text: 'Soal baru diimport', time: '3 jam lalu' },
    { icon: 'fa-user', color: 'bg-red-500/10 text-red-500', text: 'User baru ditambahkan', time: '5 jam lalu' },
  ]

  return (
    <div>
      <h4 className="text-base font-medium text-gray-700 mb-5 flex items-center gap-2">
        <i className="fas fa-home text-primary"></i> Dashboard
      </h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
        <StatCard icon="fa-users" value="150" label="Total Peserta" variant="primary" />
        <StatCard icon="fa-question-circle" value="12" label="Soal Aktif" variant="success" />
        <StatCard icon="fa-calendar" value="8" label="Jadwal Ujian" variant="warning" />
        <StatCard icon="fa-door-open" value="5" label="Ruang Ujian" variant="info" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader><span className="flex items-center gap-2"><i className="fas fa-chart-line text-primary"></i> Statistik Ujian</span></CardHeader>
          <CardBody>
            <div className="flex justify-around py-5 border-b border-gray-100 mb-5">
              {[
                { val: '85%', label: 'Rata-rata Nilai', color: 'text-primary' },
                { val: '92%', label: 'Kelulusan', color: 'text-green-600' },
                { val: '145', label: 'Sudah Ujian', color: 'text-sky-600' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className={"text-3xl font-bold " + s.color}>{s.val}</div>
                  <div className="text-xs text-gray-400">{s.label}</div>
                </div>
              ))}
            </div>
            <ProgressBar value={88} label="Pengetahuan Umum" variant="primary" className="mb-3" />
            <ProgressBar value={76} label="Bahasa Indonesia" variant="success" className="mb-3" />
            <ProgressBar value={82} label="Matematika" variant="info" />
          </CardBody>
        </Card>

        <Card>
          <CardHeader><span className="flex items-center gap-2"><i className="fas fa-clock text-primary"></i> Aktivitas Terbaru</span></CardHeader>
          <CardBody className="px-3 py-2">
            {activities.map((a, i) => (
              <div key={i} className="flex items-center gap-3 px-2 py-2.5 border-b border-gray-50 last:border-0">
                <div className={"w-8 h-8 rounded-full flex items-center justify-center text-sm " + a.color}>
                  <i className={"fas " + a.icon}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-gray-700 truncate">{a.text}</div>
                  <div className="text-[11px] text-gray-400">{a.time}</div>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

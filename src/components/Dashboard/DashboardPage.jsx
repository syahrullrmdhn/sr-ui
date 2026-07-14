import React from 'react'
import { Card, CardHeader, CardBody } from '../ui/Card' 
import ClassicStatCard from '../ui/ClassicStatCard'
import { BarChart, DonutChart } from '../ui/Chart'
import { useToast } from '../ui/Toast'

export default function DashboardPage() {
  const { addToast } = useToast()

  const chartDataSiswa = [
    { label: 'Gel 1', value: 32 },
    { label: 'Gel 2', value: 45 },
    { label: 'Gel 3', value: 60 },
    { label: 'Gel 4', value: 85 },
    { label: 'Gel 5', value: 110 },
    { label: 'Gel 6', value: 125 },
  ]

  const donutProporsi = [
    { label: 'Peserta Ujian (Siswa/Pegawai)', value: 125, color: '#0d9488' },
    { label: 'Pengawas Lab & Guru', value: 15, color: '#3b82f6' },
    { label: 'Operator & Administrator', value: 4, color: '#f59e0b' },
  ]

  return (
    <div className="space-y-6 w-full max-w-full overflow-x-hidden pb-6 flex-1 flex flex-col min-h-full">
      
      {/* Banner Utama - Full Width */}
      <div className="bg-gradient-to-r from-[#8c5822] via-[#a86e2f] to-[#d99244] rounded-xl shadow-md p-4 md:p-5 flex flex-col sm:flex-row items-center justify-between text-white w-full border border-white/10">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-lg border border-white/20 shadow-inner text-amber-200">
            <i className="fas fa-laptop-code text-white"></i>
          </div>
          <div>
            <h1 className="text-base md:text-lg font-bold tracking-wide flex items-center gap-2">
              Portal Ujian Berbasis Komputer (CBT)
            </h1>
            <p className="text-xs text-white/85 mt-0.5 font-normal">Sistem evaluasi akademik digital terintegrasi real-time</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3 sm:mt-0">
          <button 
            onClick={() => addToast({ title: 'Data Disinkronkan', message: 'Semua grafik dan statistik di dashboard telah diperbarui dari database aktif.', variant: 'success' })}
            className="text-xs font-semibold bg-white/15 hover:bg-white/25 px-4 py-1.5 rounded-full border border-white/25 transition-all shadow-inner cursor-pointer flex items-center gap-1.5"
          >
            <i className="fas fa-sync-alt text-[11px]"></i> Sync Realtime
          </button>
          <div className="text-xs font-semibold bg-white/10 px-4 py-1.5 rounded-full border border-white/20 shadow-inner">
            Dashboard Admin
          </div>
        </div>
      </div>

      {/* Grid Stat Cards - Full Width */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 w-full">
        <ClassicStatCard colorTheme="blue" value="125" title="Jumlah Siswa Terdaftar" icon="fa-users" footerText="25 Hadir Sesi Ini" />
        <ClassicStatCard colorTheme="orange" value="48" title="Jumlah Nilai Keluar" icon="fa-edit" footerText="Rata-rata Skor 82.4" />
        <ClassicStatCard colorTheme="red" value="12" title="Bank Soal Aktif" icon="fa-flask" footerText="350 Butir Soal" />
        <ClassicStatCard colorTheme="green" value="21" title="Ruang & Kelas CBT" icon="fa-school" footerText="Okupansi 92%" />
      </div>

      {/* Grid Tengah: Charts Visual Interaktif - Full Width */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 w-full">
        {/* Bar Chart Pertumbuhan Peserta */}
        <Card className="lg:col-span-2 border-none ring-1 ring-slate-200/60 w-full overflow-hidden flex flex-col shadow-sm">
          <CardHeader action={
            <select className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-600 font-semibold outline-none focus:border-teal-500">
              <option>Tahun 2026</option>
              <option>Tahun 2025</option>
            </select>
          }>
            <span className="flex items-center gap-2 text-slate-800 font-bold">
              <i className="fas fa-chart-bar text-teal-600"></i> Statistik Kehadiran & Partisipasi Peserta Ujian
            </span>
          </CardHeader>
          <CardBody className="flex-1 flex flex-col pt-3">
            <BarChart 
              data={chartDataSiswa} 
              subtitle="Tren pertumbuhan jumlah peserta yang menyelesaikan sesi ujian per gelombang"
              height={220}
              color="teal"
              unit="Peserta"
            />
          </CardBody>
        </Card>

        {/* Donut Chart Proporsi Pengguna */}
        <Card className="border-none ring-1 ring-slate-200/60 w-full overflow-hidden flex flex-col shadow-sm">
          <CardHeader>
            <span className="flex items-center gap-2 text-slate-800 font-bold">
              <i className="fas fa-chart-pie text-blue-500"></i> Komposisi Akses Sistem
            </span>
          </CardHeader>
          <CardBody className="flex-1 flex flex-col justify-center">
            <DonutChart items={donutProporsi} totalLabel="Akun" />
          </CardBody>
        </Card>
      </div>

      {/* Grid Bawah - Full Width & Full Height Flex-1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 w-full flex-1 min-h-[340px]">
        
        {/* Kolom Pengumuman */}
        <Card className="lg:col-span-2 border-none ring-1 ring-slate-200/60 w-full overflow-hidden flex flex-col flex-1 shadow-sm">
          <CardHeader action={
            <button className="text-slate-400 hover:text-rose-500 transition-colors p-1 cursor-pointer" title="Bersihkan Pengumuman">
              <i className="fas fa-trash-alt text-sm"></i>
            </button>
          }>
            <span className="flex items-center gap-2 text-slate-800 font-bold">
              <i className="fas fa-bullhorn text-blue-500"></i> Pengumuman & Informasi Pelaksanaan
            </span>
          </CardHeader>
          <CardBody className="flex-1 flex flex-col">
            <div className="inline-block bg-blue-50 text-blue-600 border border-blue-200/60 text-[11px] font-bold px-3 py-1 rounded-full mb-6 shadow-2xs self-start">
              - Terkini -
            </div>

            <div className="relative border-l-2 border-slate-100 ml-3 pl-6 pb-2 flex-1">
              <div className="absolute -left-[17px] top-0 bg-emerald-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center text-white shadow-sm">
                <i className="fas fa-envelope text-[10px]"></i>
              </div>
              
              <div className="bg-amber-50/60 border border-amber-200/60 rounded-xl p-4 md:p-5 relative shadow-2xs transition-all hover:bg-amber-50">
                <div className="absolute top-4 -left-2 w-3 h-3 bg-amber-50 border-l border-b border-amber-200/60 rotate-45"></div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-1">
                  <h5 className="font-bold text-emerald-800 text-sm">Informasi Rilis Jadwal Gelombang Ujian CBT</h5>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium whitespace-nowrap">
                    <i className="far fa-calendar-alt"></i> 15-07-2026 08:30
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  Pastikan seluruh data siswa, pengawas ruang, dan jadwal mata pelajaran telah divalidasi sebelum token keamanan sesi ujian diterbitkan dan disosialisasikan.
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Kolom Log Aktifitas */}
        <Card className="border-none ring-1 ring-slate-200/60 w-full overflow-hidden flex flex-col flex-1 shadow-sm">
          <CardHeader action={
            <button className="text-slate-400 hover:text-rose-500 transition-colors p-1 cursor-pointer" title="Hapus Riwayat">
              <i className="fas fa-trash-alt text-sm"></i>
            </button>
          }>
            <span className="flex items-center gap-2 text-slate-800 font-bold">
              <i className="fas fa-history text-slate-400"></i> Log Aktifitas Sistem
            </span>
          </CardHeader>
          <CardBody className="flex-1 flex flex-col justify-between p-4 space-y-3">
            <div className="space-y-3 flex-1 overflow-y-auto">
              {[
                { time: '10:15 WIB', user: 'Admin Utama', action: 'Mengaktifkan Token Sesi 1', variant: 'success' },
                { time: '09:40 WIB', user: 'Operator Lab', action: 'Sinkronisasi 40 PC Klien Lab 1', variant: 'info' },
                { time: '08:30 WIB', user: 'Guru Pengampu', action: 'Mengimpor 50 Butir Soal PU', variant: 'warning' },
              ].map((log, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                  <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${log.variant === 'success' ? 'bg-emerald-500' : log.variant === 'info' ? 'bg-blue-500' : 'bg-amber-500'}`}></span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between font-semibold text-slate-800">
                      <span>{log.user}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{log.time}</span>
                    </div>
                    <p className="text-slate-500 mt-0.5">{log.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

      </div>
    </div>
  )
}
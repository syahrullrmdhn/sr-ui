import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardBody } from '../ui/Card'
import { mockPeserta, mockTes, mockUsers, mockRuang } from '../../data/mockData'

export default function DashboardPage() {
  const navigate = useNavigate()

  const stats = [
    { label: 'Total Peserta', value: mockPeserta.length, icon: 'fa-user-graduate', color: '#855b2f', link: '/admin/peserta' },
    { label: 'Bank Soal', value: '4 Paket', icon: 'fa-question-circle', color: '#2e7d32', link: '/admin/soal' },
    { label: 'Tes Aktif', value: mockTes.filter(t => t.status === 'Aktif').length, icon: 'fa-clipboard-list', color: '#1565c0', link: '/admin/tes' },
    { label: 'Ruang Ujian', value: mockRuang.filter(r => r.status === 'Aktif').length, icon: 'fa-door-open', color: '#6a1b9a', link: '/admin/ruang' },
    { label: 'Users', value: mockUsers.length, icon: 'fa-users', color: '#c62828', link: '/admin/users' },
  ]

  return (
    <div>
      {/* Welcome Banner */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4 border-l-4" style={{borderLeftColor:'#855b2f'}}>
        <h5 className="text-base font-bold text-gray-800 m-0">
          <i className="fas fa-tachometer-alt mr-2 text-[#855b2f]"></i>
          Dashboard - CAT Kemhan
        </h5>
        <p className="text-xs text-gray-500 m-0 mt-1">
          Sistem Informasi CAT - Biro Kepegawaian - Kementerian Pertahanan
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-4">
        {stats.map((stat, i) => (
          <div 
            key={i} 
            className="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow border-l-4"
            style={{borderLeftColor: stat.color}}
            onClick={() => navigate(stat.link)}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
              </div>
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-lg"
                style={{backgroundColor: stat.color + '20', color: stat.color}}
              >
                <i className={`fas ${stat.icon}`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Peserta */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <h6 className="text-sm font-bold text-gray-800 m-0">
              <i className="fas fa-user-graduate mr-2 text-[#855b2f]"></i>
              Peserta Terbaru
            </h6>
            <a href="javascript:void(0)" onClick={() => navigate('/admin/peserta')} className="text-xs text-[#855b2f] font-semibold hover:underline">
              Lihat Semua →
            </a>
          </div>
          <div className="p-0">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50 text-gray-500">
                  <th className="text-left px-4 py-2 font-semibold">No.</th>
                  <th className="text-left px-4 py-2 font-semibold">Nama</th>
                  <th className="text-left px-4 py-2 font-semibold">Pangkat</th>
                  <th className="text-left px-4 py-2 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockPeserta.map((p, i) => (
                  <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-2.5">{i + 1}</td>
                    <td className="px-4 py-2.5 font-semibold">{p.nama}</td>
                    <td className="px-4 py-2.5">{p.pangkat}</td>
                    <td className="px-4 py-2.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        p.status === 'Diterima' ? 'bg-green-100 text-green-800' : 
                        p.status === 'Verifikasi' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Jadwal Tes */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <h6 className="text-sm font-bold text-gray-800 m-0">
              <i className="fas fa-calendar mr-2 text-[#855b2f]"></i>
              Jadwal Tes
            </h6>
            <a href="javascript:void(0)" onClick={() => navigate('/admin/jadwal')} className="text-xs text-[#855b2f] font-semibold hover:underline">
              Lihat Semua →
            </a>
          </div>
          <div className="p-0">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50 text-gray-500">
                  <th className="text-left px-4 py-2 font-semibold">Tes</th>
                  <th className="text-left px-4 py-2 font-semibold">Tanggal</th>
                  <th className="text-left px-4 py-2 font-semibold">Waktu</th>
                  <th className="text-left px-4 py-2 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { nama: 'Tes Kompetensi Dasar', tgl: '20 Juli 2026', waktu: '08:00 - 09:30', status: 'Terjadwal' },
                  { nama: 'Tes Bahasa', tgl: '20 Juli 2026', waktu: '10:00 - 11:00', status: 'Terjadwal' },
                  { nama: 'Tes Matematika', tgl: '21 Juli 2026', waktu: '08:00 - 08:45', status: 'Draft' },
                ].map((j, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-2.5 font-semibold">{j.nama}</td>
                    <td className="px-4 py-2.5">{j.tgl}</td>
                    <td className="px-4 py-2.5">{j.waktu}</td>
                    <td className="px-4 py-2.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        j.status === 'Terjadwal' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {j.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

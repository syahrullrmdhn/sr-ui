import React from 'react'
import Page from '../ui/Page'
import { Card, CardHeader, CardBody } from '../ui/Card'
import DataTable from '../ui/DataTable'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import ClassicStatCard from '../ui/ClassicStatCard'

export default function RekapLokasiPage() {
  const dataLokasi = [
    { id: 1, kode: 'LOK-01', nama: 'Laboratorium Komputer Utama (Lab 1)', kapasitas: 40, hadir: 40, lulus: 38, rata: 84 },
    { id: 2, kode: 'LOK-02', nama: 'Laboratorium Multimedia (Lab 2)', kapasitas: 35, hadir: 35, lulus: 31, rata: 78 },
    { id: 3, kode: 'LOK-03', nama: 'Ruang Ujian Terpadu A', kapasitas: 50, hadir: 48, lulus: 42, rata: 81 },
  ]

  const columns = [
    { header: 'No', render: (_, i) => i + 1 },
    { header: 'Kode Lokasi', accessor: 'kode', render: r => <span className="font-bold text-slate-800 font-mono">{r.kode}</span> },
    { header: 'Nama Laboratorium / Ruang Ujian', accessor: 'nama', render: r => <span className="font-semibold text-slate-800">{r.nama}</span> },
    { header: 'Kapasitas Klien', accessor: 'kapasitas', render: r => `${r.kapasitas} Unit` },
    { header: 'Kehadiran Peserta', accessor: 'hadir', render: r => <Badge variant="info">{r.hadir} Hadir</Badge> },
    { header: 'Peserta Lulus', accessor: 'lulus', render: r => <Badge variant="success">{r.lulus} Lulus ({Math.round((r.lulus/r.hadir)*100)}%)</Badge> },
    { header: 'Rata-Rata Skor', accessor: 'rata', render: r => <strong className="text-teal-600 text-base">{r.rata}</strong> },
  ]

  return (
    <Page 
      title="Rekapitulasi Nilai per Lokasi Lab" 
      subtitle="Analisis perbandingan persentase kelulusan, tingkat kehadiran, dan rata-rata skor antar laboratorium/ruangan"
      icon="fa-map-marker-alt"
      bannerTheme="teal"
      badge="Monitoring 3 Lokasi"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 w-full">
        <ClassicStatCard colorTheme="teal" value="123" title="Total Peserta Hadir" icon="fa-users" footerText="Kehadiran 98.4%" />
        <ClassicStatCard colorTheme="green" value="111" title="Total Peserta Lulus" icon="fa-check-circle" footerText="Kelulusan 90.2%" />
        <ClassicStatCard colorTheme="blue" value="81.2" title="Rata-Rata Skor Gabungan" icon="fa-chart-line" footerText="Stabil & Di Atas KKM" />
      </div>

      <Card className="flex-1 flex flex-col w-full shadow-sm">
        <CardHeader action={
          <div className="flex gap-2">
            <Button variant="success" size="sm" icon="fa-file-excel">Ekspor Excel</Button>
            <Button variant="outline" size="sm" icon="fa-print">Cetak Laporan</Button>
          </div>
        }>
          Tabel Evaluasi Nilai Berdasarkan Ruang & Lokasi CBT
        </CardHeader>
        <CardBody className="flex-1 flex flex-col">
          <DataTable columns={columns} data={dataLokasi} className="flex-1" />
        </CardBody>
      </Card>
    </Page>
  )
}

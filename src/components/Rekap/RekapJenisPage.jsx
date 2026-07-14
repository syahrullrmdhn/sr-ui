import React from 'react'
import Page from '../ui/Page'
import { Card, CardHeader, CardBody } from '../ui/Card'
import DataTable from '../ui/DataTable'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import ClassicStatCard from '../ui/ClassicStatCard'

export default function RekapJenisPage() {
  const dataJenis = [
    { id: 1, jenis: 'Ujian Penyesuaian Kenaikan Pangkat (UPKP)', totalPeserta: 150, lulus: 135, tidakLulus: 15, rataSkor: 83.5 },
    { id: 2, jenis: 'Ujian Dinas Tingkat I', totalPeserta: 100, lulus: 88, tidakLulus: 12, rataSkor: 79.2 },
  ]

  const columns = [
    { header: 'No', render: (_, i) => i + 1 },
    { header: 'Jenis Ujian / Kategori', accessor: 'jenis', render: r => <span className="font-bold text-slate-800">{r.jenis}</span> },
    { header: 'Total Peserta', accessor: 'totalPeserta', render: r => <Badge variant="info">{r.totalPeserta} Orang</Badge> },
    { header: 'Lulus Ujian', accessor: 'lulus', render: r => <Badge variant="success">{r.lulus} Lulus ({Math.round((r.lulus/r.totalPeserta)*100)}%)</Badge> },
    { header: 'Tidak Lulus', accessor: 'tidakLulus', render: r => <Badge variant="danger">{r.tidakLulus} Orang</Badge> },
    { header: 'Rata-Rata Skor Akhir', accessor: 'rataSkor', render: r => <strong className="text-teal-600 text-base">{r.rataSkor}</strong> },
  ]

  return (
    <Page 
      title="Rekapitulasi Nilai per Jenis Ujian" 
      subtitle="Komparasi tingkat keberhasilan dan rata-rata pencapaian skor antar gelombang atau jenis ujian dinas"
      icon="fa-clipboard-check"
      bannerTheme="indigo"
      badge="Monitoring 2 Kategori"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 w-full">
        <ClassicStatCard colorTheme="indigo" value="250" title="Total Seluruh Peserta" icon="fa-user-graduate" footerText="2 Kategori Ujian" />
        <ClassicStatCard colorTheme="green" value="223" title="Total Kelulusan Gabungan" icon="fa-check-double" footerText="Tingkat Kelulusan 89.2%" />
        <ClassicStatCard colorTheme="orange" value="81.8" title="Skor Rata-Rata Keseluruhan" icon="fa-chart-pie" footerText="Melebihi KKM (70.0)" />
      </div>

      <Card className="flex-1 flex flex-col w-full shadow-sm">
        <CardHeader action={
          <div className="flex gap-2">
            <Button variant="success" size="sm" icon="fa-file-excel">Ekspor Excel</Button>
            <Button variant="outline" size="sm" icon="fa-print">Cetak Rekap</Button>
          </div>
        }>
          Tabel Evaluasi Berdasarkan Jenis Ujian Dinas & Penyesuaian
        </CardHeader>
        <CardBody className="flex-1 flex flex-col">
          <DataTable columns={columns} data={dataJenis} className="flex-1" />
        </CardBody>
      </Card>
    </Page>
  )
}

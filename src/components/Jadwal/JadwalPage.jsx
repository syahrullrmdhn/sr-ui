import { mockJadwal } from '../../data/mockData'
import { Card, CardHeader, CardBody } from '../ui/Card'
import DataTable from '../ui/DataTable'
import Button from '../ui/Button'
import Badge from '../ui/Badge'

export default function JadwalPage() {
  const columns = [
    { header: 'No', render: (_, i) => i + 1 },
    { header: 'Nama Tes', accessor: 'namaTes', render: r => <span className="font-semibold">{r.namaTes}</span> },
    { header: 'Tanggal', accessor: 'tanggal' },
    { header: 'Jam', render: r => r.jamMulai + ' - ' + r.jamSelesai },
    { header: 'Sesi', render: r => 'Sesi ' + r.sesi },
    { header: 'Lokasi', accessor: 'lokasi' },
    { header: 'Status', accessor: 'status', render: r => <Badge variant={r.status === 'Terjadwal' ? 'success' : 'warning'}>{r.status}</Badge> },
  ]

  return (
    <div>
      <h4 className="text-base font-medium text-gray-700 mb-5 flex items-center gap-2">
        <i className="fas fa-calendar text-primary"></i> Jadwal Ujian
      </h4>
      <Card>
        <CardHeader action={<Button variant="primary" size="sm" icon="fa-plus">Tambah Jadwal</Button>}>Daftar Jadwal</CardHeader>
        <CardBody>
          <DataTable columns={columns} data={mockJadwal}
            actions={row => (
              <div className="flex gap-1">
                <Button variant="outline" size="xs" icon="fa-edit" />
                <Button variant="danger" size="xs" icon="fa-trash" />
              </div>
            )}
          />
        </CardBody>
      </Card>
    </div>
  )
}

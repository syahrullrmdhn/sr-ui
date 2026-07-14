import { mockTes } from '../../data/mockData'
import { Card, CardHeader, CardBody } from '../ui/Card'
import DataTable from '../ui/DataTable'
import Button from '../ui/Button'
import Badge from '../ui/Badge'

export default function TesPage() {
  const columns = [
    { header: 'No', render: (_, i) => i + 1 },
    { header: 'Nama Tes', accessor: 'namaTes', render: r => <span className="font-semibold">{r.namaTes}</span> },
    { header: 'Materi', accessor: 'materi' },
    { header: 'Soal', accessor: 'jumlahSoal', render: r => r.jumlahSoal + ' soal' },
    { header: 'Waktu', accessor: 'waktu', render: r => r.waktu + ' menit' },
    { header: 'Tanggal', accessor: 'tanggal' },
    { header: 'Status', accessor: 'status', render: r => <Badge variant={r.status === 'Aktif' ? 'success' : 'warning'}>{r.status}</Badge> },
  ]

  return (
    <div>
      <h4 className="text-base font-medium text-gray-700 mb-5 flex items-center gap-2">
        <i className="fas fa-clipboard-list text-primary"></i> Tes / Subtes
      </h4>
      <Card>
        <CardHeader action={<Button variant="primary" size="sm" icon="fa-plus">Tambah Tes</Button>}>Daftar Tes</CardHeader>
        <CardBody>
          <DataTable columns={columns} data={mockTes}
            actions={row => (
              <div className="flex gap-1">
                <Button variant="outline" size="xs" icon="fa-edit" />
                <Button variant="outline" size="xs" icon="fa-random" />
                <Button variant="danger" size="xs" icon="fa-trash" />
              </div>
            )}
          />
        </CardBody>
      </Card>
    </div>
  )
}

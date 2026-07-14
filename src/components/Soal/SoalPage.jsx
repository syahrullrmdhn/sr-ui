import { mockSoal } from '../../data/mockData'
import { Card, CardHeader, CardBody } from '../ui/Card'
import DataTable from '../ui/DataTable'
import Button from '../ui/Button'
import Badge from '../ui/Badge'

export default function SoalPage() {
  const columns = [
    { header: 'No', render: (_, i) => i + 1 },
    { header: 'Kode', accessor: 'kode', render: r => <span className="font-semibold">{r.kode}</span> },
    { header: 'Materi', accessor: 'materi' },
    { header: 'Jumlah Soal', accessor: 'jumlahSoal', render: r => r.jumlahSoal + ' soal' },
    { header: 'Tipe', accessor: 'tipe' },
    { header: 'Status', accessor: 'status', render: r => <Badge variant={r.status === 'Aktif' ? 'success' : 'warning'}>{r.status}</Badge> },
    { header: 'Tanggal', accessor: 'createdAt' },
  ]

  return (
    <div>
      <h4 className="text-base font-medium text-gray-700 mb-5 flex items-center gap-2">
        <i className="fas fa-question-circle text-primary"></i> Bank Soal
      </h4>
      <Card>
        <CardHeader action={
          <div className="flex gap-2">
            <Button variant="success" size="sm" icon="fa-file-import">Import</Button>
            <Button variant="primary" size="sm" icon="fa-plus">Tambah Soal</Button>
          </div>
        }>Daftar Soal</CardHeader>
        <CardBody>
          <DataTable columns={columns} data={mockSoal}
            actions={row => (
              <div className="flex gap-1">
                <Button variant="outline" size="xs" icon="fa-eye" />
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

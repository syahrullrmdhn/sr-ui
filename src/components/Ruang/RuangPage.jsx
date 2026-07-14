import { mockRuang } from '../../data/mockData'
import { Card, CardHeader, CardBody } from '../ui/Card'
import DataTable from '../ui/DataTable'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import { ProgressBar } from '../ui/Progress'

export default function RuangPage() {
  const columns = [
    { header: 'No', render: (_, i) => i + 1 },
    { header: 'Kode', accessor: 'kode', render: r => <span className="font-semibold">{r.kode}</span> },
    { header: 'Nama Ruang', accessor: 'namaRuang' },
    { header: 'Kapasitas', accessor: 'kapasitas', render: r => r.kapasitas + ' orang' },
    { header: 'Peserta', render: r => (
      <div>
        <span>{r.peserta}</span>
        <ProgressBar value={r.peserta} max={r.kapasitas} variant={r.peserta / r.kapasitas > 0.8 ? 'danger' : 'success'} size="sm" showPercent={false} className="mt-1 w-20" />
      </div>
    )},
    { header: 'Lokasi', accessor: 'lokasi' },
    { header: 'Status', accessor: 'status', render: r => <Badge variant={r.status === 'Aktif' ? 'success' : 'warning'} dot>{r.status}</Badge> },
  ]

  return (
    <div>
      <h4 className="text-base font-medium text-gray-700 mb-5 flex items-center gap-2">
        <i className="fas fa-door-open text-primary"></i> Ruang Ujian
      </h4>
      <Card>
        <CardHeader action={<Button variant="primary" size="sm" icon="fa-plus">Tambah Ruang</Button>}>Daftar Ruang</CardHeader>
        <CardBody>
          <DataTable columns={columns} data={mockRuang}
            actions={row => (
              <div className="flex gap-1">
                <Button variant="outline" size="xs" icon="fa-users" />
                <Button variant="outline" size="xs" icon="fa-edit" />
                <Button variant="outline" size="xs" icon="fa-print" />
              </div>
            )}
          />
        </CardBody>
      </Card>
    </div>
  )
}

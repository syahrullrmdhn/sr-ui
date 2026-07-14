import { mockPeserta } from '../../data/mockData'
import { Card, CardHeader, CardBody } from '../ui/Card'
import DataTable from '../ui/DataTable'
import Button from '../ui/Button'
import Badge from '../ui/Badge'

const statusMap = { 'Diterima': 'success', 'Verifikasi': 'warning', 'Ditolak': 'danger' }

export default function PesertaPage() {
  const columns = [
    { header: 'No', render: (_, i) => i + 1 },
    { header: 'Nopes', accessor: 'nopes', render: r => <span className="font-semibold">{r.nopes}</span> },
    { header: 'Nama', accessor: 'nama' },
    { header: 'NIP', accessor: 'nip', render: r => <span className="text-[11px]">{r.nip}</span> },
    { header: 'JK', accessor: 'gender' },
    { header: 'Kotama', accessor: 'kotama' },
    { header: 'Satker', accessor: 'satker' },
    { header: 'Pangkat', accessor: 'pangkat' },
    { header: 'Status', accessor: 'status', render: r => <Badge variant={statusMap[r.status] || 'info'}>{r.status}</Badge> },
  ]

  return (
    <div>
      <h4 className="text-base font-medium text-gray-700 mb-5 flex items-center gap-2">
        <i className="fas fa-user-graduate text-primary"></i> Data Peserta
      </h4>
      <Card>
        <CardHeader action={
          <div className="flex gap-2">
            <Button variant="success" size="sm" icon="fa-file-export">Export</Button>
            <Button variant="primary" size="sm" icon="fa-plus">Tambah</Button>
          </div>
        }>Daftar Peserta</CardHeader>
        <CardBody>
          <DataTable columns={columns} data={mockPeserta}
            actions={row => (
              <div className="flex gap-1">
                <Button variant="outline" size="xs" icon="fa-eye" />
                <Button variant="outline" size="xs" icon="fa-edit" />
                <Button variant="outline" size="xs" icon="fa-id-card" />
                <Button variant="danger" size="xs" icon="fa-trash" />
              </div>
            )}
          />
        </CardBody>
      </Card>
    </div>
  )
}

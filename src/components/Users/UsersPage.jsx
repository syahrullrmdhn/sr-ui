import { mockUsers } from '../../data/mockData'
import { Card, CardHeader, CardBody } from '../ui/Card'
import DataTable from '../ui/DataTable'
import Button from '../ui/Button'
import Badge from '../ui/Badge'

export default function UsersPage() {
  const columns = [
    { header: 'No', render: (_, i) => i + 1 },
    { header: 'Username', accessor: 'username', render: r => <span className="font-semibold">{r.username}</span> },
    { header: 'Nama', accessor: 'nama' },
    { header: 'Role', accessor: 'role', render: r => <Badge variant="primary">{r.role}</Badge> },
    { header: 'Email', accessor: 'email' },
    { header: 'Status', accessor: 'status', render: r => <Badge variant={r.status === 'Aktif' ? 'success' : 'danger'} dot>{r.status}</Badge> },
    { header: 'Terakhir Login', accessor: 'lastLogin' },
  ]

  return (
    <div>
      <h4 className="text-base font-medium text-gray-700 mb-5 flex items-center gap-2">
        <i className="fas fa-users text-primary"></i> Manajemen Users
      </h4>
      <Card>
        <CardHeader action={<Button variant="primary" size="sm" icon="fa-plus">Tambah User</Button>}>
          Daftar Users
        </CardHeader>
        <CardBody>
          <DataTable columns={columns} data={mockUsers}
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

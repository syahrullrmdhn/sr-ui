import { useState } from 'react'
import { mockUsers } from '../../data/mockData'
import { Card, CardHeader, CardBody } from '../ui/Card'
import DataTable from '../ui/DataTable'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import Page from '../ui/Page'
import Modal from '../ui/Modal'
import Input from '../ui/Input'
import { useToast } from '../ui/Toast'

export default function UsersPage() {
  const { addToast } = useToast()
  const [users, setUsers] = useState(mockUsers)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  
  const [formData, setFormData] = useState({
    username: '',
    nama: '',
    role: 'Administrator',
    email: '',
    status: 'Aktif'
  })

  const handleOpenAdd = () => {
    setEditingId(null)
    setFormData({ username: '', nama: '', role: 'Administrator', email: '', status: 'Aktif' })
    setModalOpen(true)
  }

  const handleOpenEdit = (user) => {
    setEditingId(user.id)
    setFormData({
      username: user.username,
      nama: user.nama,
      role: user.role,
      email: user.email,
      status: user.status
    })
    setModalOpen(true)
  }

  const handleDelete = (id, nama) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus user "${nama}"?`)) {
      setUsers(users.filter(u => u.id !== id))
      addToast({ title: 'User Dihapus', message: `Akun pengguna "${nama}" berhasil dihapus dari sistem.`, variant: 'danger' })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.username || !formData.nama) {
      addToast({ title: 'Form Tidak Lengkap', message: 'Username dan Nama Lengkap wajib diisi!', variant: 'warning' })
      return
    }

    if (editingId) {
      setUsers(users.map(u => u.id === editingId ? { ...u, ...formData } : u))
      addToast({ title: 'User Diperbarui', message: `Data akun "${formData.nama}" berhasil diperbarui.`, variant: 'success' })
    } else {
      const newUser = {
        id: Date.now(),
        ...formData,
        lastLogin: 'Baru saja'
      }
      setUsers([newUser, ...users])
      addToast({ title: 'User Ditambahkan', message: `Akun baru "${formData.nama}" berhasil didaftarkan.`, variant: 'success' })
    }
    setModalOpen(false)
  }

  const columns = [
    { header: 'No', render: (_, i) => i + 1 },
    { header: 'Username', accessor: 'username', render: r => <span className="font-bold text-slate-800">{r.username}</span> },
    { header: 'Nama Lengkap', accessor: 'nama' },
    { header: 'Role Akses', accessor: 'role', render: r => <Badge variant={r.role === 'Administrator' ? 'purple' : r.role === 'Guru' ? 'info' : 'gray'}>{r.role}</Badge> },
    { header: 'Email', accessor: 'email', render: r => <span className="text-slate-500">{r.email}</span> },
    { header: 'Status Akun', accessor: 'status', render: r => <Badge variant={r.status === 'Aktif' ? 'success' : 'danger'} dot>{r.status}</Badge> },
    { header: 'Terakhir Login', accessor: 'lastLogin', render: r => <span className="text-xs text-slate-500">{r.lastLogin}</span> },
  ]

  return (
    <Page 
      title="Manajemen Users & Hak Akses" 
      subtitle="Kelola data akun pengawas, guru pengampu, admin sistem, dan operator laboratorium CBT"
      icon="fa-users"
      bannerTheme="blue"
      badge={`Total: ${users.length} Akun`}
    >
      <Card className="flex-1 flex flex-col w-full shadow-sm">
        <CardHeader action={
          <Button variant="primary" size="sm" icon="fa-plus" onClick={handleOpenAdd}>
            Tambah User Baru
          </Button>
        }>
          Daftar Pengguna Sistem CBT
        </CardHeader>
        <CardBody className="flex-1 flex flex-col">
          <DataTable 
            columns={columns} 
            data={users}
            className="flex-1"
            actions={row => (
              <div className="flex justify-end gap-1.5">
                <Button variant="outline" size="xs" icon="fa-edit" title="Edit User" onClick={() => handleOpenEdit(row)} />
                <Button variant="danger" size="xs" icon="fa-trash" title="Hapus User" onClick={() => handleDelete(row.id, row.nama)} />
              </div>
            )}
          />
        </CardBody>
      </Card>

      {/* Modal Form Tambah / Edit User */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? 'Edit Data Pengguna' : 'Registrasi User Baru'}
        icon="fa-user-plus"
        size="md"
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Batal</Button>
            <Button variant="primary" icon="fa-save" onClick={handleSubmit}>
              {editingId ? 'Simpan Perubahan' : 'Daftarkan User'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input 
              label="Username" 
              value={formData.username} 
              onChange={e => setFormData({...formData, username: e.target.value})} 
              icon="fa-user" 
              placeholder="Contoh: admin_guru"
              required 
            />
            <Input 
              label="Nama Lengkap" 
              value={formData.nama} 
              onChange={e => setFormData({...formData, nama: e.target.value})} 
              icon="fa-id-card" 
              placeholder="Nama dan gelar"
              required 
            />
          </div>

          <Input 
            label="Alamat Email" 
            type="email" 
            value={formData.email} 
            onChange={e => setFormData({...formData, email: e.target.value})} 
            icon="fa-envelope" 
            placeholder="email@instansi.go.id"
            required 
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 tracking-wide uppercase">Role Akses</label>
              <select 
                value={formData.role}
                onChange={e => setFormData({...formData, role: e.target.value})}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200/80 rounded-xl focus:border-teal-500 outline-none font-medium text-slate-800"
              >
                <option value="Administrator">Administrator</option>
                <option value="Guru">Guru / Pengampu Soal</option>
                <option value="Operator">Operator Ruang Lab</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 tracking-wide uppercase">Status Akun</label>
              <select 
                value={formData.status}
                onChange={e => setFormData({...formData, status: e.target.value})}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200/80 rounded-xl focus:border-teal-500 outline-none font-medium text-slate-800"
              >
                <option value="Aktif">Aktif</option>
                <option value="Nonaktif">Nonaktif</option>
              </select>
            </div>
          </div>
        </form>
      </Modal>
    </Page>
  )
}

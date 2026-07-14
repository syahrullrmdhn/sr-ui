import React, { useState } from 'react'
import Page from '../ui/Page'
import { Card, CardHeader, CardBody } from '../ui/Card'
import Button from '../ui/Button'
import Input from '../ui/Input'
import { useToast } from '../ui/Toast'

export default function AccountPage() {
  const { addToast } = useToast()
  const [user, setUser] = useState({
    username: 'admin_cbt',
    nama: 'Syahrul Ramadhan',
    email: 'syahrul.admin@disdiklat.go.id',
    role: 'Administrator Utama',
    telepon: '081234567890',
  })

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleUpdateProfile = (e) => {
    e.preventDefault()
    addToast({ title: 'Profil Diperbarui', message: 'Informasi akun profil Anda berhasil diperbarui.', variant: 'success' })
  }

  const handleChangePassword = (e) => {
    e.preventDefault()
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      addToast({ title: 'Gagal', message: 'Konfirmasi password baru tidak cocok!', variant: 'danger' })
      return
    }
    addToast({ title: 'Password Diubah', message: 'Password akun Anda berhasil diganti dengan yang baru.', variant: 'success' })
    setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' })
  }

  return (
    <Page 
      title="Pengaturan Profil Akun" 
      subtitle="Kelola informasi identitas akun login, email kontak, pengamanan password, dan riwayat aktivitas Anda"
      icon="fa-user-cog"
      bannerTheme="teal"
      badge="Akun Admin Utama"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 w-full flex-1">
        {/* Kolom Kiri: Profil Identitas - Full Width */}
        <Card className="lg:col-span-2 flex-1 flex flex-col w-full shadow-sm">
          <CardHeader>Informasi Profil & Kredensial</CardHeader>
          <CardBody className="flex-1 flex flex-col justify-between">
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                <div className="w-16 h-16 rounded-2xl bg-teal-600 text-white flex items-center justify-center text-2xl font-bold shadow-md">
                  SR
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-800">{user.nama}</h4>
                  <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200/60">
                    {user.role}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Username Login" value={user.username} disabled icon="fa-user" />
                <Input label="Nama Lengkap" value={user.nama} onChange={e => setUser({...user, nama: e.target.value})} icon="fa-id-card" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Alamat Email" type="email" value={user.email} onChange={e => setUser({...user, email: e.target.value})} icon="fa-envelope" />
                <Input label="No. Telepon / WA" value={user.telepon} onChange={e => setUser({...user, telepon: e.target.value})} icon="fa-phone" />
              </div>

              <div className="pt-4 flex justify-end">
                <Button type="submit" variant="primary" size="lg" icon="fa-save" className="px-8 shadow-md">
                  Simpan Profil Akun
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>

        {/* Kolom Kanan: Ganti Password - Full Width */}
        <Card className="flex-1 flex flex-col w-full shadow-sm">
          <CardHeader>Keamanan & Ganti Password</CardHeader>
          <CardBody className="flex-1 flex flex-col justify-between">
            <form onSubmit={handleChangePassword} className="space-y-4">
              <Input 
                label="Password Lama" 
                type="password" 
                value={passwordForm.oldPassword} 
                onChange={e => setPasswordForm({...passwordForm, oldPassword: e.target.value})} 
                icon="fa-lock" 
                placeholder="Masukkan password lama"
                required 
              />

              <Input 
                label="Password Baru" 
                type="password" 
                value={passwordForm.newPassword} 
                onChange={e => setPasswordForm({...passwordForm, newPassword: e.target.value})} 
                icon="fa-key" 
                placeholder="Minimal 6 karakter"
                required 
              />

              <Input 
                label="Konfirmasi Password Baru" 
                type="password" 
                value={passwordForm.confirmPassword} 
                onChange={e => setPasswordForm({...passwordForm, confirmPassword: e.target.value})} 
                icon="fa-check-circle" 
                placeholder="Ulangi password baru"
                required 
              />

              <div className="pt-4">
                <Button type="submit" variant="danger" size="lg" icon="fa-shield-alt" className="w-full shadow-md">
                  Perbarui Password Sekarang
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </Page>
  )
}

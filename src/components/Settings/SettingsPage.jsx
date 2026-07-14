import React, { useState } from 'react'
import Page from '../ui/Page'
import { Card, CardHeader, CardBody } from '../ui/Card'
import Button from '../ui/Button'
import Input from '../ui/Input'
import { useToast } from '../ui/Toast'

export default function SettingsPage() {
  const { addToast } = useToast()
  const [config, setConfig] = useState({
    namaInstansi: 'DINAS PENDIDIKAN DAN PELATIHAN',
    kodeInstansi: 'DISDIKLAT-RI-2026',
    serverUjian: 'https://cbt-server.kemdikbud.go.id',
    durasiDefault: 120,
    kunciJawabanAktif: false,
    autoBackup: true,
  })

  const handleSave = (e) => {
    e.preventDefault()
    addToast({ title: 'Konfigurasi Disimpan', message: 'Pengaturan sistem CBT berhasil diupdate ke server.', variant: 'success' })
  }

  return (
    <Page 
      title="Pengaturan Sistem & Server CBT" 
      subtitle="Konfigurasi parameter global, identitas instansi, keamanan token, serta pencadangan database"
      icon="fa-cog"
      bannerTheme="slate"
      badge="Konfigurasi Global"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 w-full flex-1">
        {/* Kolom Kiri: Profil Instansi & Server - Full Width */}
        <Card className="lg:col-span-2 flex-1 flex flex-col w-full shadow-sm">
          <CardHeader>Identitas Instansi & Koneksi Server</CardHeader>
          <CardBody className="flex-1 flex flex-col justify-between">
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Nama Instansi / Lembaga" value={config.namaInstansi} onChange={e => setConfig({...config, namaInstansi: e.target.value})} icon="fa-building" />
                <Input label="Kode Registrasi Instansi" value={config.kodeInstansi} onChange={e => setConfig({...config, kodeInstansi: e.target.value})} icon="fa-id-badge" />
              </div>

              <Input label="URL Endpoint Server Utama CBT" value={config.serverUjian} onChange={e => setConfig({...config, serverUjian: e.target.value})} icon="fa-server" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700 tracking-wide uppercase">Tampilkan Nilai ke Peserta Selesai Ujian</label>
                  <select 
                    value={config.kunciJawabanAktif ? 'ya' : 'tidak'} 
                    onChange={e => setConfig({...config, kunciJawabanAktif: e.target.value === 'ya'})}
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200/80 rounded-xl focus:border-teal-500 outline-none font-medium text-slate-800"
                  >
                    <option value="ya">Ya, langsung tampilkan skor akhir</option>
                    <option value="tidak">Tidak, sembunyikan nilai (hanya di rekap admin)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700 tracking-wide uppercase">Pencadangan Database (Auto-Backup)</label>
                  <select 
                    value={config.autoBackup ? 'aktif' : 'nonaktif'} 
                    onChange={e => setConfig({...config, autoBackup: e.target.value === 'aktif'})}
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200/80 rounded-xl focus:border-teal-500 outline-none font-medium text-slate-800"
                  >
                    <option value="aktif">Aktif (Otomatis setiap 30 menit)</option>
                    <option value="nonaktif">Nonaktif (Hanya cadangan manual)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button type="submit" variant="primary" size="lg" icon="fa-save" className="px-8 shadow-md">
                  Simpan Perubahan Sistem
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>

        {/* Kolom Kanan: Keamanan & Status System - Full Width */}
        <Card className="flex-1 flex flex-col w-full shadow-sm">
          <CardHeader>Status Keamanan & Maintenance</CardHeader>
          <CardBody className="flex-1 flex flex-col space-y-4">
            <div className="p-4 bg-emerald-50/70 border border-emerald-200/60 rounded-xl space-y-2">
              <div className="font-bold text-xs text-emerald-800 flex items-center justify-between">
                <span>Status Koneksi Database:</span>
                <span className="bg-emerald-600 text-white px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">Normal / Stabil</span>
              </div>
              <p className="text-xs text-emerald-700/90">
                Ping latensi ke server utama berada pada angka 4ms. Penyimpanan database tersedia 84 GB.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-3">
              <div className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                <i className="fas fa-tools text-slate-500"></i> Alat Pemeliharaan Server
              </div>
              <div className="space-y-2">
                <Button variant="outline" size="sm" icon="fa-database" className="w-full justify-start text-xs">
                  Cadangkan Database Sekarang (.sql)
                </Button>
                <Button variant="outline" size="sm" icon="fa-broom" className="w-full justify-start text-xs">
                  Bersihkan Log Aktifitas Lawas
                </Button>
                <Button variant="danger" size="sm" icon="fa-sync" className="w-full justify-start text-xs">
                  Reset Cache Ujian Sesi Aktif
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </Page>
  )
}

export const systemInfo = {
  title: 'Sistem Ujian Online',
  name: 'SISTEM UJIAN ONLINE',
  organization: 'PEMERINTAH REPUBLIK INDONESIA',
  office: 'DINAS PENDIDIKAN DAN PELATIHAN',
  logo: null,
}

export const mockUser = {
  id: 1,
  nama: 'Administrator',
  username: 'admin',
  role: 'super_admin',
  avatar: null,
}

export const mockMenus = [
  {
    menu: 'Dashboard',
    hasChild: true,
    items: [
      { menu: 'Beranda', icon: 'fa-home', link: '/admin/dashboard', class: 'Dashboard', ajax: 'Y', dialog: 'N', hasChild: false, items: [] },
    ]
  },
  {
    menu: 'Master Data',
    hasChild: true,
    items: [
      { menu: 'Users', icon: 'fa-users', link: '/admin/users', class: 'Users', ajax: 'Y', dialog: 'N', hasChild: false, items: [] },
      { menu: 'Soal', icon: 'fa-question-circle', link: '/admin/soal', class: 'Soal', ajax: 'Y', dialog: 'N', hasChild: true, items: [
        { menu: 'Bank Soal', link: '/admin/soal', class: 'SoalList', ajax: 'Y', dialog: 'N' },
        { menu: 'Import Soal', link: '/admin/soal/import', class: 'SoalImport', ajax: 'Y', dialog: 'N' },
      ]},
      { menu: 'Tes / Subtes', icon: 'fa-clipboard-list', link: '/admin/tes', class: 'Tes', ajax: 'Y', dialog: 'N', hasChild: false, items: [] },
      { menu: 'Materi', icon: 'fa-book', link: '/admin/materi', class: 'Materi', ajax: 'Y', dialog: 'N', hasChild: false, items: [] },
      { menu: 'Paket Soal', icon: 'fa-box', link: '/admin/paket', class: 'Paket', ajax: 'Y', dialog: 'N', hasChild: false, items: [] },
    ]
  },
  {
    menu: 'Peserta',
    hasChild: true,
    items: [
      { menu: 'Data Peserta', icon: 'fa-user-graduate', link: '/admin/peserta', class: 'Peserta', ajax: 'Y', dialog: 'N', hasChild: false, items: [] },
      { menu: 'Pendaftaran', icon: 'fa-user-plus', link: '/admin/pendaftaran', class: 'Pendaftaran', ajax: 'Y', dialog: 'N', hasChild: false, items: [] },
    ]
  },
  {
    menu: 'Pelaksanaan',
    hasChild: true,
    items: [
      { menu: 'Jadwal Ujian', icon: 'fa-calendar', link: '/admin/jadwal', class: 'Jadwal', ajax: 'Y', dialog: 'N', hasChild: false, items: [] },
      { menu: 'Token', icon: 'fa-key', link: '/admin/token', class: 'Token', ajax: 'Y', dialog: 'N', hasChild: false, items: [] },
      { menu: 'Ruang Ujian', icon: 'fa-door-open', link: '/admin/ruang', class: 'Ruang', ajax: 'Y', dialog: 'N', hasChild: false, items: [] },
      { menu: 'Sesi', icon: 'fa-clock', link: '/admin/sesi', class: 'Sesi', ajax: 'Y', dialog: 'N', hasChild: false, items: [] },
    ]
  },
  {
    menu: 'Rekapitulasi',
    hasChild: true,
    items: [
      { menu: 'Rekap Nilai', icon: 'fa-chart-bar', link: '/admin/rekap', class: 'Rekap', ajax: 'Y', dialog: 'N', hasChild: false, items: [] },
      { menu: 'Rekap per Lokasi', icon: 'fa-map-marker-alt', link: '/admin/rekap/lokasi', class: 'RekapLokasi', ajax: 'Y', dialog: 'N', hasChild: false, items: [] },
      { menu: 'Rekap per Jenis Ujian', icon: 'fa-clipboard-check', link: '/admin/rekap/jenis', class: 'RekapJenis', ajax: 'Y', dialog: 'N', hasChild: false, items: [] },
    ]
  },
  {
    menu: 'Pengaturan',
    hasChild: true,
    items: [
      { menu: 'Pengaturan Sistem', icon: 'fa-cog', link: '/admin/settings', class: 'Settings', ajax: 'Y', dialog: 'Y', hasChild: false, items: [] },
      { menu: 'Pengaturan Akun', icon: 'fa-user-cog', link: '/admin/account', class: 'Account', ajax: 'Y', dialog: 'Y', hasChild: false, items: [] },
    ]
  },
]

export const mockUsers = [
  { id: 1, username: 'admin', nama: 'Administrator', role: 'Super Admin', status: 'Aktif', email: 'admin@kemhan.go.id', lastLogin: '2026-07-14 08:30' },
  { id: 2, username: 'operator', nama: 'Operator Ujian', role: 'Operator', status: 'Aktif', email: 'operator@kemhan.go.id', lastLogin: '2026-07-14 09:15' },
  { id: 3, username: 'pengawas1', nama: 'Pengawas Ruang 1', role: 'Pengawas', status: 'Aktif', email: 'pw1@kemhan.go.id', lastLogin: '2026-07-13 14:00' },
  { id: 4, username: 'pengawas2', nama: 'Pengawas Ruang 2', role: 'Pengawas', status: 'Nonaktif', email: 'pw2@kemhan.go.id', lastLogin: '2026-07-10 10:00' },
]

export const mockSoal = [
  { id: 1, kode: 'SOAL-001', materi: 'Pengetahuan Umum', jumlahSoal: 50, tipe: 'Pilihan Ganda', status: 'Aktif', createdAt: '2026-06-01' },
  { id: 2, kode: 'SOAL-002', materi: 'Bahasa Indonesia', jumlahSoal: 40, tipe: 'Pilihan Ganda', status: 'Aktif', createdAt: '2026-06-05' },
  { id: 3, kode: 'SOAL-003', materi: 'Matematika', jumlahSoal: 30, tipe: 'Pilihan Ganda', status: 'Draft', createdAt: '2026-06-10' },
  { id: 4, kode: 'SOAL-004', materi: 'Wawasan Kebangsaan', jumlahSoal: 25, tipe: 'Essay', status: 'Aktif', createdAt: '2026-06-15' },
]

export const mockTes = [
  { id: 1, namaTes: 'Tes Kompetensi Dasar', materi: 'Pengetahuan Umum', jumlahSoal: 50, waktu: 90, status: 'Aktif', tanggal: '2026-07-20' },
  { id: 2, namaTes: 'Tes Bahasa', materi: 'Bahasa Indonesia', jumlahSoal: 40, waktu: 60, status: 'Aktif', tanggal: '2026-07-20' },
  { id: 3, namaTes: 'Tes Matematika', materi: 'Matematika', jumlahSoal: 30, waktu: 45, status: 'Draft', tanggal: '2026-07-21' },
]

export const mockPeserta = [
  { id: 1, nopes: 'PST-001', nama: 'Ahmad Fauzi', nip: '198501012010011001', gender: 'L', kotama: 'Kotama A', satker: 'Satker 1', pangkat: 'Pembina / IV-a', status: 'Diterima' },
  { id: 2, nopes: 'PST-002', nama: 'Siti Rahayu', nip: '199001022012012002', gender: 'P', kotama: 'Kotama B', satker: 'Satker 2', pangkat: 'Penata / III-c', status: 'Diterima' },
  { id: 3, nopes: 'PST-003', nama: 'Budi Santoso', nip: '198701032009011003', gender: 'L', kotama: 'Kotama A', satker: 'Satker 3', pangkat: 'Pembina Tk I / IV-b', status: 'Verifikasi' },
  { id: 4, nopes: 'PST-004', nama: 'Dewi Lestari', nip: '199201042015012004', gender: 'P', kotama: 'Kotama C', satker: 'Satker 1', pangkat: 'Penata Muda / III-a', status: 'Ditolak' },
]

export const mockJadwal = [
  { id: 1, namaTes: 'Tes Kompetensi Dasar', tanggal: '2026-07-20', jamMulai: '08:00', jamSelesai: '09:30', sesi: 1, lokasi: 'Gedung A', status: 'Terjadwal' },
  { id: 2, namaTes: 'Tes Bahasa', tanggal: '2026-07-20', jamMulai: '10:00', jamSelesai: '11:00', sesi: 2, lokasi: 'Gedung A', status: 'Terjadwal' },
  { id: 3, namaTes: 'Tes Matematika', tanggal: '2026-07-21', jamMulai: '08:00', jamSelesai: '08:45', sesi: 1, lokasi: 'Gedung B', status: 'Draft' },
]

export const mockToken = {
  currentToken: 'ABCD1234',
  expiredAt: '2026-07-20 09:30:00',
  generatedBy: 'admin',
}

export const mockRuang = [
  { id: 1, namaRuang: 'Lab Komputer 1', kode: 'RG-001', kapasitas: 30, peserta: 28, lokasi: 'Gedung A Lt. 2', status: 'Aktif' },
  { id: 2, namaRuang: 'Lab Komputer 2', kode: 'RG-002', kapasitas: 30, peserta: 25, lokasi: 'Gedung A Lt. 3', status: 'Aktif' },
  { id: 3, namaRuang: 'Ruang Ujian 1', kode: 'RG-003', kapasitas: 40, peserta: 0, lokasi: 'Gedung B Lt. 1', status: 'Nonaktif' },
]

export const mockRekap = [
  { id: 1, nama: 'Ahmad Fauzi', nip: '198501012010011001', pangkat: 'Pembina / IV-a', tes: [
    { namaTes: 'Pengetahuan Umum', nilai: 85, bobot: 85 },
    { namaTes: 'Bahasa Indonesia', nilai: 78, bobot: 78 },
    { namaTes: 'Matematika', nilai: 90, bobot: 90 },
  ]},
  { id: 2, nama: 'Siti Rahayu', nip: '199001022012012002', pangkat: 'Penata / III-c', tes: [
    { namaTes: 'Pengetahuan Umum', nilai: 72, bobot: 72 },
    { namaTes: 'Bahasa Indonesia', nilai: 88, bobot: 88 },
    { namaTes: 'Matematika', nilai: 65, bobot: 65 },
  ]},
]

export const examQuestions = [
  { id: 1, soal: '<p>1. Ibu kota Indonesia adalah...</p>', jawaban: ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Semarang'], correct: 0 },
  { id: 2, soal: '<p>2. Pancasila memiliki sila berjumlah...</p>', jawaban: ['3 sila', '4 sila', '5 sila', '6 sila', '7 sila'], correct: 2 },
  { id: 3, soal: '<p>3. Proklamasi kemerdekaan Indonesia dikumandangkan pada tahun...</p>', jawaban: ['1942', '1943', '1944', '1945', '1946'], correct: 3 },
  { id: 4, soal: '<p>4. Presiden pertama Republik Indonesia adalah...</p>', jawaban: ['Soeharto', 'B.J. Habibie', 'Soekarno', 'Megawati', 'Susilo Bambang Yudhoyono'], correct: 2 },
  { id: 5, soal: '<p>5. Lambang negara Indonesia adalah...</p>', jawaban: ['Garuda Pancasila', 'Banteng', 'Padi dan Kapas', 'Bintang', 'Keris'], correct: 0 },
]

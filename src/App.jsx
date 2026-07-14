import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastProvider } from './components/ui/Toast'
import AdminLayout from './components/Layout/AdminLayout'
import MasterLayout from './components/Layout/MasterLayout'
import LoginPage from './components/Login/LoginPage'
import RegisterPage from './components/Register/RegisterPage'
import ResetPage from './components/Reset/ResetPage'
import DashboardPage from './components/Dashboard/DashboardPage'
import UsersPage from './components/Users/UsersPage'
import SoalPage from './components/Soal/SoalPage'
import TesPage from './components/Tes/TesPage'
import PesertaPage from './components/Peserta/PesertaPage'
import JadwalPage from './components/Jadwal/JadwalPage'
import TokenPage from './components/Token/TokenPage'
import RuangPage from './components/Ruang/RuangPage'
import RekapPage from './components/Rekap/RekapPage'
import SoalImportPage from './components/Soal/SoalImportPage'
import MateriPage from './components/Materi/MateriPage'
import PaketPage from './components/Paket/PaketPage'
import SesiPage from './components/Sesi/SesiPage'
import RekapLokasiPage from './components/Rekap/RekapLokasiPage'
import RekapJenisPage from './components/Rekap/RekapJenisPage'
import SettingsPage from './components/Settings/SettingsPage'
import AccountPage from './components/Account/AccountPage'
import ExamPage from './components/Exam/ExamPage'
import ExamSessionPage from './components/Exam/ExamSessionPage'
import PendaftaranPage from './components/Pendaftaran/PendaftaranPage'
import SoalEditorPage from './components/Soal/SoalEditorPage'
import BeritaPage from './components/Berita/BeritaPage'

function App() {
  return (
    <ToastProvider position="top-right">
      <Router>
        <Routes>
          {/* Public / Peserta Routes */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reset" element={<ResetPage />} />
          <Route path="/pendaftaran" element={<PendaftaranPage />} />

          {/* Exam Routes (Master Layout) */}
          <Route element={<MasterLayout />}>
            <Route path="/peserta/exam" element={<ExamPage />} />
            <Route path="/peserta/exam/start" element={<ExamSessionPage />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<DashboardPage />} />
            <Route path="/admin/dashboard" element={<DashboardPage />} />
            <Route path="/admin/users" element={<UsersPage />} />
            <Route path="/admin/soal" element={<SoalPage />} />
            <Route path="/admin/soal/editor" element={<SoalEditorPage />} />
            <Route path="/admin/soal/import" element={<SoalImportPage />} />
            <Route path="/admin/berita" element={<BeritaPage />} />
            <Route path="/admin/tes" element={<TesPage />} />
            <Route path="/admin/materi" element={<MateriPage />} />
            <Route path="/admin/paket" element={<PaketPage />} />
            <Route path="/admin/peserta" element={<PesertaPage />} />
            <Route path="/admin/jadwal" element={<JadwalPage />} />
            <Route path="/admin/token" element={<TokenPage />} />
            <Route path="/admin/ruang" element={<RuangPage />} />
            <Route path="/admin/sesi" element={<SesiPage />} />
            <Route path="/admin/rekap" element={<RekapPage />} />
            <Route path="/admin/rekap/lokasi" element={<RekapLokasiPage />} />
            <Route path="/admin/rekap/jenis" element={<RekapJenisPage />} />
            <Route path="/admin/settings" element={<SettingsPage />} />
            <Route path="/admin/account" element={<AccountPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ToastProvider>
  )
}

export default App

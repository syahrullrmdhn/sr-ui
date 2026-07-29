import { useNavigate } from 'react-router-dom'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100" style={{fontFamily:"'Roboto', sans-serif"}}>
      <div className="text-center">
        <div className="text-8xl font-bold text-[#855b2f] mb-4">404</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Halaman Tidak Ditemukan</h2>
        <p className="text-sm text-gray-500 mb-6">Maaf, halaman yang Anda cari tidak tersedia.</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2.5 bg-[#855b2f] hover:bg-[#5e3f1f] text-white font-bold rounded text-sm transition-colors"
        >
          <i className="fas fa-home mr-2"></i> Kembali ke Beranda
        </button>
      </div>
    </div>
  )
}

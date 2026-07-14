import { useNavigate } from 'react-router-dom'

export default function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <div className="page-404">
      <p className="big-404">404</p>
      <p className="text-404">Maaf, halaman tidak ditemukan</p>
      <button className="btn btn-primary" onClick={() => navigate('/')}>
        <i className="fas fa-arrow-left"></i> Kembali
      </button>
    </div>
  )
}

import { useNavigate } from 'react-router-dom'
import Button from '../ui/Button'

export default function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <p className="text-[120px] font-bold italic text-gray-400 m-0 leading-none">404</p>
      <p className="text-base text-gray-400 mt-2 mb-5">Maaf, halaman tidak ditemukan</p>
      <Button variant="primary" icon="fa-arrow-left" onClick={() => navigate('/')}>Kembali</Button>
    </div>
  )
}

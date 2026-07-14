import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { systemInfo } from '../../data/mockData'
import '../../assets/css/exam.css'

export default function MasterLayout() {
  const navigate = useNavigate()

  return (
    <div className="exam-wrapper">
      <div className="exam-header">
        <div className="logo-section">
          <div style={{ fontSize: 32 }}>
            <i className="fas fa-graduation-cap"></i>
          </div>
          <div>
            <h2>{systemInfo.organization}</h2>
            <h6>{systemInfo.name}</h6>
          </div>
        </div>
        <div className="user-section">
          <h6 style={{ margin: 0, fontSize: 13 }}>Peserta Ujian</h6>
          <div className="user-icon">
            <i className="fas fa-user-graduate"></i>
          </div>
          <button className="btn-logout" onClick={() => navigate('/')}>
            Logout
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  )
}

import { Outlet, useNavigate } from 'react-router-dom'
import { systemInfo } from '../../data/mockData'

export default function MasterLayout() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden" style={{fontFamily:"'Roboto', sans-serif", backgroundColor:'#E9E9E9'}}>
      {/* Background header strip */}
      <div className="fixed top-0 left-0 right-0 h-[197px] z-[-1]" style={{backgroundColor:'#855b2f', backgroundImage:'url(/assets/img/bg-header-new.png)'}}></div>
      
      {/* Header */}
      <header className="flex items-center justify-between px-5 md:px-10 pt-6 pb-6 w-full mx-5 max-w-none" style={{color:'#fff'}}>
        {/* Logo Left */}
        <div className="flex items-center">
          <div className="w-[70px] h-[70px] mr-5 bg-white/20 rounded-lg flex items-center justify-center">
            <i className="fas fa-graduation-cap text-white text-3xl"></i>
          </div>
          <div>
            <h2 className="text-xl font-bold m-0 text-white">{systemInfo.organization}</h2>
            <h2 className="text-base font-normal m-0 text-white/90">{systemInfo.office}</h2>
            <h6 className="text-sm font-light tracking-[4px] mt-1 m-0 text-white/80">{systemInfo.name}</h6>
          </div>
        </div>

        {/* User Right */}
        <div className="flex items-center ml-auto">
          <div className="text-right mr-4">
            <h6 className="text-sm font-bold m-0 text-white">Peserta Ujian</h6>
            <a 
              href="javascript:;" 
              className="inline-block bg-white text-[#359AE2] px-5 py-1 rounded-full text-xs font-bold no-underline hover:opacity-80 transition-opacity"
              onClick={(e) => { e.preventDefault(); navigate('/'); }}
            >
              Logout
            </a>
          </div>
          <div className="w-10 h-10 rounded-[10px] bg-black/30 flex items-center justify-center text-2xl text-white" style={{padding:'10px 20px'}}>
            <span className="fas fa-user-graduate"></span>
          </div>
        </div>
      </header>
      
      {/* Content Area */}
      <main className="w-full flex-1 flex flex-col px-5 md:px-10 overflow-y-auto">
        <div className="w-full min-h-full flex-1 flex flex-col">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

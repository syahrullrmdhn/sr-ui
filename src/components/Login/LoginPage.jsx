import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { systemInfo } from '../../data/mockData'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showLupa, setShowLupa] = useState(false)
  const [lupaEmail, setLupaEmail] = useState('')
  const [lupaSent, setLupaSent] = useState(false)
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    if (username && password) {
      setLoading(true)
      setTimeout(() => {
        if (username === 'admin') {
          navigate('/admin/dashboard')
        } else {
          navigate('/peserta/exam')
        }
      }, 800)
    }
  }

  const handleLupaPassword = (e) => {
    e.preventDefault()
    if (lupaEmail) {
      setLupaSent(true)
      setTimeout(() => {
        setShowLupa(false)
        setLupaSent(false)
        setLupaEmail('')
      }, 2000)
    }
  }

  return (
    <div 
      className="fixed inset-0 overflow-auto"
      style={{
        fontFamily: "'Roboto', sans-serif",
        fontSize: '0.875rem',
        zIndex: 1000,
      }}
    >
      {/* Full blue background with pattern at bottom */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          background: 'url(/assets/img/pattern.png) repeat-x left bottom, #00B2FF'
        }}
      />

      {/* Particles-like floating dots */}
      <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
        {Array.from({length: 20}).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: (4 + Math.random() * 12) + 'px',
              height: (4 + Math.random() * 12) + 'px',
              left: (Math.random() * 100) + '%',
              top: (Math.random() * 100) + '%',
              animation: 'floatBubble ' + (4 + Math.random() * 6) + 's ease-in-out ' + (Math.random() * 3) + 's infinite'
            }}
          />
        ))}
      </div>

      {/* Main wrapper - centered content */}
      <div className="relative z-[2] flex items-center justify-center min-h-screen p-4">
        {/* box-container */}
        <div className="relative flex w-full z-[1]">
          {/* box-wrapper */}
          <div className="flex items-center w-full">
            {/* box-wrapper-again */}
            <div className="flex flex-wrap justify-center items-center w-full" style={{margin: '-12px'}}>
              {/* box-main - 768px max */}
              <div className="flex flex-wrap justify-center w-full" style={{maxWidth: '768px'}}>
                
                {/* === LEFT PANEL (box-left) - Logo & Info === */}
                <div className="relative w-1/2 max-md:hidden" style={{padding: '12px'}}>
                  <div 
                    className="flex absolute overflow-hidden"
                    style={{
                      top: '-15px',
                      left: '2px',
                      width: '100%',
                      height: 'calc(100% + 30px)',
                      padding: '80px 50px',
                      boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)',
                      borderRadius: '10px',
                      backgroundImage: 'url(/assets/img/img-5.png)',
                      backgroundSize: '85%',
                      backgroundPosition: 'bottom center',
                      backgroundColor: '#fff',
                      backgroundRepeat: 'no-repeat'
                    }}
                  >
                    {/* Blue gradient overlay */}
                    <div 
                      className="absolute inset-0 z-0"
                      style={{
                        background: 'linear-gradient(#fff, #00B2FF)',
                        opacity: 0.3
                      }}
                    />

                    {/* Content */}
                    <div className="relative z-[1] w-full">
                      {/* Logo */}
                      <div className="block text-center w-full pb-8">
                        <div className="w-20 h-20 mx-auto bg-white/30 rounded-xl flex items-center justify-center backdrop-blur-sm">
                          <img src="/assets/img/logo-white.png" alt="Logo" className="w-16 h-16 object-contain" 
                            onError={(e) => { e.target.style.display='none'; e.target.parentElement.innerHTML='<i class="fas fa-graduation-cap text-white text-4xl"></i>' }}
                          />
                        </div>
                      </div>

                      {/* System Title */}
                      <div className="text-center w-full" style={{fontSize:'13px',fontWeight:700,textTransform:'uppercase',color:'#666',textShadow:'1px 1px #fff'}}>
                        <div className="text-sm font-bold text-gray-700 mb-1">{systemInfo.organization}</div>
                        <div className="text-sm font-bold text-gray-700 mb-1">{systemInfo.office}</div>
                        <div className="text-xs font-bold text-gray-500 mt-2 tracking-wider">{systemInfo.name}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* === RIGHT PANEL (box-right) - Login Form === */}
                <div className="w-1/2 max-md:w-full" style={{padding: '12px'}}>
                  {/* box-right-wrapper */}
                  <div style={{marginTop: '-24px'}}>
                    {/* box-right-content */}
                    <div 
                      style={{
                        paddingLeft: '24px',
                        paddingRight: '24px',
                        marginTop: '24px',
                        paddingTop: '20px',
                        paddingBottom: '10px',
                        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
                        borderRadius: '5px',
                        backgroundColor: '#fff'
                      }}
                    >
                      {/* Title with blue underline */}
                      <div 
                        className="block relative uppercase"
                        style={{
                          fontSize: '18px',
                          marginBottom: '32px',
                          paddingBottom: '16px'
                        }}
                      >
                        MASUK
                        <span 
                          className="absolute left-0 bottom-0 block"
                          style={{
                            width: '40px',
                            borderBottom: '4px solid #60BAFD'
                          }}
                        />
                      </div>

                      {/* Login Form */}
                      <form onSubmit={handleLogin}>
                        {/* Username - floating label */}
                        <div className="relative mb-4">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm z-10">
                            <i className="fas fa-user"></i>
                          </span>
                          <input
                            type="text"
                            id="username"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#60BAFD] focus:ring-1 focus:ring-[#60BAFD] transition-all peer"
                            placeholder=" "
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            autoFocus
                          />
                          <label 
                            htmlFor="username"
                            className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-400 text-sm transition-all duration-100 pointer-events-none
                              peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-500
                              peer-not-placeholder-shown:top-1 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-gray-500"
                          >
                            Username
                          </label>
                          <span className="absolute bottom-0 left-0 w-0 h-0 bg-[#60BAFD] transition-all duration-300 peer-focus:w-full" style={{height:'2px'}}></span>
                        </div>

                        {/* Password - floating label */}
                        <div className="relative mb-4">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm z-10">
                            <i className="fas fa-lock"></i>
                          </span>
                          <input
                            type={showPw ? 'text' : 'password'}
                            id="password"
                            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#60BAFD] focus:ring-1 focus:ring-[#60BAFD] transition-all peer"
                            placeholder=" "
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <label 
                            htmlFor="password"
                            className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-400 text-sm transition-all duration-100 pointer-events-none
                              peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-500
                              peer-not-placeholder-shown:top-1 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-gray-500"
                          >
                            Password
                          </label>
                          <span 
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600 text-sm z-10"
                            onClick={() => setShowPw(!showPw)}
                          >
                            <i className={`fas ${showPw ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                          </span>
                        </div>

                        {/* Login Button */}
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full py-3 text-white font-bold rounded text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2 mb-3"
                          style={{
                            backgroundColor: '#855b2f',
                            fontSize: '1rem',
                            padding: '0.5rem 1rem',
                          }}
                          onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#5e3f1f')}
                          onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#855b2f')}
                        >
                          {loading ? (
                            <>
                              <span className="fas fa-spinner fa-spin text-sm"></span>
                              Loading...
                            </>
                          ) : (
                            'Login'
                          )}
                        </button>

                        {/* Forgot Password Link */}
                        <div className="text-center mb-4">
                          <a 
                            href="javascript:void(0)" 
                            className="text-sm text-blue-500 hover:underline"
                            onClick={(e) => { e.preventDefault(); setShowLupa(true); }}
                          >
                            Lupa Password ?
                          </a>
                        </div>
                      </form>

                      {/* Secure Image / CAPTCHA placeholder */}
                      <div className="text-center mb-4">
                        <div className="inline-block bg-gray-50 border border-gray-200 rounded px-4 py-2">
                          <div className="text-[10px] text-gray-400 mb-1">Secure Image</div>
                          <div className="w-40 h-10 bg-gray-100 rounded flex items-center justify-center text-gray-300 text-xs">
                            <i className="fas fa-shield-alt mr-1"></i> CAPTCHA
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer below card */}
                    <div className="text-center mt-3 text-xs text-white/60">
                      Kementerian Pertahanan &copy; 2022
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === LUPA PASSWORD MODAL === */}
      {showLupa && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => { setShowLupa(false); setLupaSent(false); }}
          />
          
          {/* Modal */}
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md z-10">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
              <h6 className="text-sm font-bold text-gray-800 m-0">Lupa Password</h6>
              <button 
                onClick={() => { setShowLupa(false); setLupaSent(false); }}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100 transition-colors cursor-pointer text-lg"
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4">
              {lupaSent ? (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded text-sm">
                  <i className="fas fa-check-circle mr-2"></i>
                  Link reset password telah dikirim ke email Anda.
                </div>
              ) : (
                <form onSubmit={handleLupaPassword}>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#855b2f] focus:ring-1 focus:ring-[#855b2f]"
                    placeholder="Email Yang Terdaftar"
                    value={lupaEmail}
                    onChange={(e) => setLupaEmail(e.target.value)}
                    required
                    autoFocus
                  />
                </form>
              )}
            </div>

            {/* Modal Footer */}
            {!lupaSent && (
              <div className="flex justify-end gap-2 px-4 py-3 border-t border-gray-200">
                <button 
                  onClick={() => { setShowLupa(false); setLupaSent(false); }}
                  className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded text-sm font-semibold transition-colors cursor-pointer"
                >
                  Tutup
                </button>
                <button 
                  onClick={handleLupaPassword}
                  className="px-4 py-1.5 bg-[#855b2f] hover:bg-[#5e3f1f] text-white rounded text-sm font-semibold transition-colors cursor-pointer"
                >
                  Kirim
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

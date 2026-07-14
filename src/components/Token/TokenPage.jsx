import { useState } from 'react'
import { mockToken } from '../../data/mockData'

export default function TokenPage() {
  const [token, setToken] = useState(mockToken.currentToken)

  const generateToken = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setToken(result)
  }

  return (
    <div>
      <h4 style={{ margin: '0 0 20px', color: '#333', fontWeight: 500 }}>
        <i className="fas fa-key" style={{ marginRight: 8 }}></i> Token Ujian
      </h4>

      <div style={{ maxWidth: 500 }}>
        <div className="card-admin">
          <div className="card-header">
            <span>Token Saat Ini</span>
          </div>
          <div className="card-body">
            <div style={{
              background: '#FFFF66', padding: 20, borderRadius: 8,
              textAlign: 'center', marginBottom: 20,
              border: '2px solid #e6e600'
            }}>
              <div style={{ fontSize: 11, color: '#999', marginBottom: 5 }}>TOKEN AKTIF</div>
              <div style={{ fontSize: 42, fontWeight: 'bold', color: '#CE0000', letterSpacing: 8, fontFamily: 'monospace' }}>
                {token}
              </div>
            </div>
            <div style={{ fontSize: 12, color: '#666', marginBottom: 15 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f0f0f0' }}>
                <span>Di-generate oleh:</span>
                <strong>{mockToken.generatedBy}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f0f0f0' }}>
                <span>Berlaku hingga:</span>
                <strong>{mockToken.expiredAt}</strong>
              </div>
            </div>
            <button className="btn btn-primary" onClick={generateToken} style={{ width: '100%' }}>
              <i className="fas fa-sync-alt"></i> Generate Token Baru
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

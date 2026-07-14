import { useState } from 'react'
import { mockToken } from '../../data/mockData'
import { Card, CardHeader, CardBody } from '../ui/Card'
import Button from '../ui/Button'
import { useToast } from '../ui/Toast'

export default function TokenPage() {
  const [token, setToken] = useState(mockToken.currentToken)
  const { addToast } = useToast()

  const generate = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    for (let i = 0; i < 8; i++) result += chars[Math.floor(Math.random() * chars.length)]
    setToken(result)
    addToast({ title: 'Token Baru', message: 'Token berhasil digenerate: ' + result, variant: 'success' })
  }

  return (
    <div>
      <h4 className="text-base font-medium text-gray-700 mb-5 flex items-center gap-2">
        <i className="fas fa-key text-primary"></i> Token Ujian
      </h4>
      <div className="max-w-md">
        <Card>
          <CardHeader>Token Saat Ini</CardHeader>
          <CardBody>
            <div className="bg-yellow-100 border-2 border-yellow-300 p-5 rounded-xl text-center mb-5">
              <div className="text-[11px] text-gray-500 mb-1">TOKEN AKTIF</div>
              <div className="text-[42px] font-bold text-red-600 tracking-[8px] font-mono">{token}</div>
            </div>
            <div className="text-xs text-gray-500 space-y-1.5 mb-5">
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span>Di-generate oleh:</span><strong className="text-gray-700">{mockToken.generatedBy}</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span>Berlaku hingga:</span><strong className="text-gray-700">{mockToken.expiredAt}</strong>
              </div>
            </div>
            <Button variant="primary" icon="fa-sync-alt" onClick={generate} className="w-full">
              Generate Token Baru
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

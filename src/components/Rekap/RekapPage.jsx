import { mockRekap } from '../../data/mockData'
import { Card, CardHeader, CardBody } from '../ui/Card'
import Button from '../ui/Button'
import Badge from '../ui/Badge'

export default function RekapPage() {
  return (
    <div>
      <h4 className="text-base font-medium text-gray-700 mb-5 flex items-center gap-2">
        <i className="fas fa-chart-bar text-primary"></i> Rekapitulasi Nilai
      </h4>
      <Card>
        <CardHeader action={
          <div className="flex gap-2">
            <Button variant="success" size="sm" icon="fa-file-excel">Excel</Button>
            <Button variant="danger" size="sm" icon="fa-file-pdf">PDF</Button>
            <Button variant="outline" size="sm" icon="fa-print">Cetak</Button>
          </div>
        }>Rekap Nilai Peserta</CardHeader>
        <CardBody>
          <div className="flex gap-3 mb-4">
            <select className="px-3 py-2 text-sm border border-gray-200 rounded-lg"><option>Semua Tes</option></select>
            <input type="text" className="px-3 py-2 text-sm border border-gray-200 rounded-lg w-60" placeholder="Cari peserta..." />
          </div>
          <div className="overflow-x-auto rounded-lg border border-gray-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th rowSpan="2" className="px-3 py-2.5 text-left font-medium text-gray-500 align-middle">No</th>
                  <th rowSpan="2" className="px-3 py-2.5 text-left font-medium text-gray-500 align-middle">Nama</th>
                  <th rowSpan="2" className="px-3 py-2.5 text-left font-medium text-gray-500 align-middle">NIP</th>
                  <th rowSpan="2" className="px-3 py-2.5 text-left font-medium text-gray-500 align-middle">Pangkat</th>
                  <th colSpan="3" className="px-3 py-2.5 text-center font-medium text-gray-500">Nilai Tes</th>
                  <th rowSpan="2" className="px-3 py-2.5 text-center font-medium text-gray-500 align-middle">Rata-rata</th>
                  <th rowSpan="2" className="px-3 py-2.5 text-center font-medium text-gray-500 align-middle">Status</th>
                </tr>
                <tr className="bg-gray-50">
                  <th className="px-3 py-2 text-left text-xs text-gray-500">Pengetahuan Umum</th>
                  <th className="px-3 py-2 text-left text-xs text-gray-500">Bahasa Indonesia</th>
                  <th className="px-3 py-2 text-left text-xs text-gray-500">Matematika</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {mockRekap.map((p, i) => {
                  const avg = Math.round(p.tes.reduce((s, t) => s + t.nilai, 0) / p.tes.length)
                  return (
                    <tr key={p.id} className="hover:bg-amber-50/30 transition">
                      <td className="px-3 py-2.5">{i + 1}</td>
                      <td className="px-3 py-2.5 font-semibold">{p.nama}</td>
                      <td className="px-3 py-2.5 text-[11px]">{p.nip}</td>
                      <td className="px-3 py-2.5">{p.pangkat}</td>
                      {p.tes.map((t, ti) => (
                        <td key={ti} className="px-3 py-2.5">
                          <span className={"font-bold " + (t.nilai >= 70 ? 'text-green-600' : 'text-red-500')}>{t.nilai}</span>
                        </td>
                      ))}
                      <td className="px-3 py-2.5 text-center"><strong className="text-primary">{avg}</strong></td>
                      <td className="px-3 py-2.5 text-center">
                        <Badge variant={avg >= 70 ? 'success' : 'danger'}>{avg >= 70 ? 'Lulus' : 'Tidak Lulus'}</Badge>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

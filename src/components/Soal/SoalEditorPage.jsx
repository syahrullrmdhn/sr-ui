import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageBanner from '../ui/PageBanner'
import { Card, CardHeader, CardBody } from '../ui/Card'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Select from '../ui/Select'
import RichTextEditor from '../ui/RichTextEditor'
import Badge from '../ui/Badge'
import { useToast } from '../ui/Toast'

export default function SoalEditorPage() {
  const navigate = useNavigate()
  const { addToast } = useToast()

  const [questionData, setQuestionData] = useState({
    kategori: 'TIU - Tes Intelegensi Umum',
    subtes: 'Kemampuan Numerik & Analisis Data',
    bobot: '5',
    tingkatKesulitan: 'sedang',
    kodeSoal: 'CBT-NUM-2026-089',
    stem: `
      <h3>Soal Analisis Numerik & Kecepatan</h3>
      <p>Sebuah kendaraan taktis milik instansi melaju dari Kota A menuju Kota B dengan kecepatan awal \( v_0 = 40 \\text{ km/jam} \). Setelah menempuh jarak selama 2 jam, kecepatan dinaikkan menjadi 60 km/jam. Berikut adalah rekapitulasi waktu tempuh dan konsumsi bahan bakar selama perjalanan:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 12px 0; border: 1px solid #e8d9c7;">
        <thead>
          <tr style="background-color: #f8f5f1; color: #2c2c2c;">
            <th style="border: 1px solid #e8d9c7; padding: 10px; text-align: left;">Sesi Perjalanan</th>
            <th style="border: 1px solid #e8d9c7; padding: 10px; text-align: left;">Kecepatan Rata-rata</th>
            <th style="border: 1px solid #e8d9c7; padding: 10px; text-align: left;">Durasi Waktu</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #e8d9c7; padding: 10px;">Tahap Pertama</td>
            <td style="border: 1px solid #e8d9c7; padding: 10px;">40 km/jam</td>
            <td style="border: 1px solid #e8d9c7; padding: 10px;">2 Jam</td>
          </tr>
          <tr style="background-color: #f8f5f1/40;">
            <td style="border: 1px solid #e8d9c7; padding: 10px;">Tahap Kedua</td>
            <td style="border: 1px solid #e8d9c7; padding: 10px;">60 km/jam</td>
            <td style="border: 1px solid #e8d9c7; padding: 10px;">3,5 Jam</td>
          </tr>
        </tbody>
      </table>

      <div style="background-color: #f8f5f1; border-left: 4px solid #2f69a8; padding: 12px 16px; border-radius: 8px; margin: 12px 0;">
        <strong style="color: #2f69a8;"><i class="fas fa-info-circle"></i> Catatan Parameter:</strong> Abaikan hambatan angin dan kondisi lalu lintas.
      </div>
      <p>Berapakah total jarak tempuh (\( S_{total} \)) dari Kota A sampai Kota B?</p>
    `,
    opsiA: '180 Kilometre',
    opsiB: '210 Kilometre',
    opsiC: '290 Kilometre',
    opsiD: '315 Kilometre',
    opsiE: '340 Kilometre',
    kunciJawaban: 'C',
    pembahasan: `
      <p><strong>Pembahasan Resmi:</strong></p>
      <ul>
        <li>Jarak Tahap 1 (\( S_1 \)) = Kecepatan × Waktu = \( 40 \\times 2 = 80 \\text{ km} \)</li>
        <li>Jarak Tahap 2 (\( S_2 \)) = Kecepatan × Waktu = \( 60 \\times 3,5 = 210 \\text{ km} \)</li>
        <li>Total Jarak (\( S_{total} \)) = \( S_1 + S_2 = 80 + 210 = 290 \\text{ km} \)</li>
      </ul>
      <p>Oleh karena itu, kunci jawaban yang tepat adalah <span style="background-color: #2fa86e; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;">Opsi C</span>.</p>
    `
  })

  const [activeTab, setActiveTab] = useState('stem') // 'stem' | 'opsi' | 'pembahasan'

  const handleSave = () => {
    addToast({
      title: 'Butir Soal Berhasil Disimpan',
      message: `Soal kode ${questionData.kodeSoal} dengan format Rich Text telah berhasil diperbarui ke Bank Soal CBT.`,
      variant: 'success'
    })
    navigate('/admin/soal')
  }

  return (
    <div className="space-y-6 w-full font-sans text-[#2c2c2c] pb-10">
      {/* Banner Utama */}
      <PageBanner
        title="Editor Butir Soal CBT (Rich Text Editor)"
        subtitle="Buat dan sunting butir soal interaktif lengkap dengan rumus matematika, tabel data, callout instruksi, serta gambar diagram."
        icon="fa-file-alt"
        badge="Rich Text WYSIWYG Active"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" icon="fa-arrow-left" onClick={() => navigate('/admin/soal')}>
              Kembali
            </Button>
            <Button variant="primary" size="sm" icon="fa-save" onClick={handleSave}>
              Simpan Soal Ke Database
            </Button>
          </div>
        }
      />

      {/* Info Metadata Butir Soal */}
      <Card className="shadow-sm border border-[#e8d9c7]">
        <CardHeader actions={
          <Badge variant="accent" dot><i className="fas fa-check"></i> Mode Editor CBT Aktif</Badge>
        }>
          Konfigurasi & Identitas Butir Soal
        </CardHeader>
        <CardBody className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Input
                label="Kode Butir Soal"
                value={questionData.kodeSoal}
                onChange={(e) => setQuestionData({ ...questionData, kodeSoal: e.target.value })}
                placeholder="Contoh: CBT-NUM-001"
              />
            </div>
            <div>
              <Select
                label="Kategori / Mata Ujian"
                value={questionData.kategori}
                onChange={(e) => setQuestionData({ ...questionData, kategori: e.target.value })}
                options={[
                  { value: 'TIU - Tes Intelegensi Umum', label: 'TIU - Tes Intelegensi Umum' },
                  { value: 'TWK - Tes Wawasan Kebangsaan', label: 'TWK - Tes Wawasan Kebangsaan' },
                  { value: 'TKP - Tes Karakteristik Pribadi', label: 'TKP - Tes Karakteristik Pribadi' },
                  { value: 'Kompetensi Bidang Teknis', label: 'Kompetensi Bidang Teknis' },
                ]}
              />
            </div>
            <div>
              <Select
                label="Tingkat Kesulitan"
                value={questionData.tingkatKesulitan}
                onChange={(e) => setQuestionData({ ...questionData, tingkatKesulitan: e.target.value })}
                options={[
                  { value: 'mudah', label: '🟢 Mudah (Bobot Dasar)' },
                  { value: 'sedang', label: '🟡 Sedang (Bobot Menengah)' },
                  { value: 'sulit', label: '🔴 Sulit (HOTS & Analitis)' },
                ]}
              />
            </div>
            <div>
              <Input
                label="Bobot Poin Benar"
                type="number"
                value={questionData.bobot}
                onChange={(e) => setQuestionData({ ...questionData, bobot: e.target.value })}
              />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Tab navigasi penyuntingan bagian soal */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-3/4 flex flex-col space-y-6">
          {/* Menu Tab Switcher */}
          <div className="flex gap-2 bg-white p-2 rounded-2xl border border-[#e8d9c7] shadow-2xs">
            <button
              type="button"
              onClick={() => setActiveTab('stem')}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === 'stem' ? 'bg-[#a86e2f] text-white shadow-sm ring-1 ring-[#a86e2f]/20' : 'text-[#6b5e52] hover:bg-[#f8f5f1]'
              }`}
            >
              <i className="fas fa-edit"></i> 1. Stem Pertanyaan Soal
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('opsi')}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === 'opsi' ? 'bg-[#a86e2f] text-white shadow-sm ring-1 ring-[#a86e2f]/20' : 'text-[#6b5e52] hover:bg-[#f8f5f1]'
              }`}
            >
              <i className="fas fa-list-ol"></i> 2. Opsi Jawaban (A-E)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('pembahasan')}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === 'pembahasan' ? 'bg-[#a86e2f] text-white shadow-sm ring-1 ring-[#a86e2f]/20' : 'text-[#6b5e52] hover:bg-[#f8f5f1]'
              }`}
            >
              <i className="fas fa-lightbulb"></i> 3. Pembahasan & Kunci
            </button>
          </div>

          {/* Area Editor Sesuai Tab */}
          {activeTab === 'stem' && (
            <Card className="shadow-sm border border-[#e8d9c7]">
              <CardHeader>Penyuntingan Rich Text Stem Pertanyaan Utama</CardHeader>
              <CardBody className="p-6">
                <RichTextEditor
                  value={questionData.stem}
                  onChange={(val) => setQuestionData({ ...questionData, stem: val })}
                  label="Isi Pertanyaan Soal CBT"
                  helperText="Gunakan tombol di toolbar di atas untuk menyisipkan rumus matematika, tabel data, callout instruksi, atau gambar diagram."
                  minHeight="380px"
                />
              </CardBody>
            </Card>
          )}

          {activeTab === 'opsi' && (
            <Card className="shadow-sm border border-[#e8d9c7]">
              <CardHeader>Penyuntingan Opsi Pilihan Ganda (A - E)</CardHeader>
              <CardBody className="p-6 space-y-4">
                {['A', 'B', 'C', 'D', 'E'].map((letter) => {
                  const isCorrect = questionData.kunciJawaban === letter
                  const keyName = `opsi${letter}`
                  
                  return (
                    <div key={letter} className={`p-4 rounded-2xl border transition-all ${isCorrect ? 'bg-[#f8f5f1] border-[#a86e2f] ring-2 ring-[#a86e2f]/15' : 'bg-white border-[#e8d9c7]'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <span className={`w-8 h-8 rounded-xl font-extrabold flex items-center justify-center text-sm ${isCorrect ? 'bg-[#a86e2f] text-white' : 'bg-[#f8f5f1] text-[#2c2c2c] border border-[#e8d9c7]'}`}>
                            {letter}
                          </span>
                          <span className="font-bold text-sm text-[#2c2c2c]">Pilihan Jawaban {letter}</span>
                          {isCorrect && <Badge variant="primary" dot>Kunci Jawaban Benar</Badge>}
                        </div>
                        <button
                          type="button"
                          onClick={() => setQuestionData({ ...questionData, kunciJawaban: letter })}
                          className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                            isCorrect ? 'bg-[#2fa86e] text-white shadow-2xs' : 'bg-[#f8f5f1] text-[#6b5e52] hover:bg-[#e8d9c7]'
                          }`}
                        >
                          {isCorrect ? '✓ Dipilih sebagai Kunci' : 'Jadikan Kunci Jawaban'}
                        </button>
                      </div>
                      <Input
                        value={questionData[keyName]}
                        onChange={(e) => setQuestionData({ ...questionData, [keyName]: e.target.value })}
                        placeholder={`Ketik teks / rumus untuk opsi ${letter}...`}
                      />
                    </div>
                  )
                })}
              </CardBody>
            </Card>
          )}

          {activeTab === 'pembahasan' && (
            <Card className="shadow-sm border border-[#e8d9c7]">
              <CardHeader>Penyuntingan Rich Text Pembahasan & Solusi Akhir</CardHeader>
              <CardBody className="p-6 space-y-5">
                <div className="flex items-center justify-between p-4 rounded-xl bg-[#f8f5f1] border border-[#e8d9c7]">
                  <div className="font-bold text-sm text-[#2c2c2c]">Kunci Jawaban yang Ditetapkan:</div>
                  <div className="flex items-center gap-2">
                    {['A', 'B', 'C', 'D', 'E'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setQuestionData({ ...questionData, kunciJawaban: opt })}
                        className={`w-9 h-9 rounded-xl font-bold transition-all cursor-pointer ${
                          questionData.kunciJawaban === opt ? 'bg-[#a86e2f] text-white shadow-sm ring-2 ring-[#a86e2f]/30' : 'bg-white text-[#6b5e52] border border-[#e8d9c7] hover:bg-[#f8f5f1]'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <RichTextEditor
                  value={questionData.pembahasan}
                  onChange={(val) => setQuestionData({ ...questionData, pembahasan: val })}
                  label="Penjelasan / Pembahasan Detail Butir Soal"
                  helperText="Pembahasan ini akan ditampilkan kepada peserta setelah ujian selesai atau pada mode latihan tes."
                  minHeight="300px"
                />
              </CardBody>
            </Card>
          )}
        </div>

        {/* Live Preview Panel Kanan */}
        <div className="w-full lg:w-1/4 flex flex-col space-y-6">
          <Card className="shadow-sm border border-[#e8d9c7] sticky top-24">
            <CardHeader actions={<i className="fas fa-desktop text-[#a86e2f]"></i>}>
              Simulator Preview Soal
            </CardHeader>
            <CardBody className="p-5 space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-[#f8f5f1] border border-[#e8d9c7]">
                <div className="text-[10px] font-bold text-[#6b5e52] uppercase tracking-wider">Mata Ujian</div>
                <div className="font-extrabold text-[#2c2c2c] text-sm mt-0.5">{questionData.kategori}</div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-[#6b5e52] uppercase tracking-wider mb-2">Simulasi Render Stem:</div>
                <div 
                  className="p-3 rounded-xl bg-white border border-[#e8d9c7] shadow-2xs max-h-[220px] overflow-y-auto prose prose-xs"
                  dangerouslySetInnerHTML={{ __html: questionData.stem }}
                />
              </div>

              <div>
                <div className="text-[10px] font-bold text-[#6b5e52] uppercase tracking-wider mb-2">Opsi & Kunci Jawaban:</div>
                <div className="space-y-1.5">
                  {['A', 'B', 'C', 'D', 'E'].map((letter) => {
                    const isCorrect = questionData.kunciJawaban === letter
                    return (
                      <div key={letter} className={`flex items-center justify-between p-2 rounded-lg border text-[11px] ${isCorrect ? 'bg-[#a86e2f]/10 border-[#a86e2f] font-bold text-[#a86e2f]' : 'bg-white border-[#e8d9c7] text-[#6b5e52]'}`}>
                        <span className="truncate"><strong>{letter}.</strong> {questionData[`opsi${letter}`]}</span>
                        {isCorrect && <i className="fas fa-check-circle text-[#a86e2f]"></i>}
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="border-t border-[#e8d9c7] pt-3">
                <Button variant="primary" className="w-full font-bold shadow-sm" icon="fa-check-double" onClick={handleSave}>
                  Simpan & Publish Soal
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

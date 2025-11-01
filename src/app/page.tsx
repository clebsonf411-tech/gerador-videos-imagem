'use client'

import { useState, useRef } from 'react'
import { Upload, Play, Download, Settings, Sparkles, Video, Image as ImageIcon, Music, Palette, Clock, Zap } from 'lucide-react'

export default function VideoCreator() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null)
  const [showSettings, setShowSettings] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Configurações do vídeo
  const [videoSettings, setVideoSettings] = useState({
    duration: 5,
    style: 'cinematic',
    music: 'epic',
    transition: 'fade',
    quality: '4k'
  })

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
        setGeneratedVideo(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const generateVideo = async () => {
    if (!selectedImage) return
    
    setIsGenerating(true)
    
    // Simulação de geração de vídeo (3 segundos)
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Simula vídeo gerado (na prática seria uma URL de vídeo real)
    setGeneratedVideo('video-generated-' + Date.now())
    setIsGenerating(false)
  }

  const downloadVideo = () => {
    // Simulação de download
    const link = document.createElement('a')
    link.href = '#'
    link.download = 'video-profissional.mp4'
    link.click()
  }

  const videoStyles = [
    { id: 'cinematic', name: 'Cinemático', desc: 'Efeitos de câmera profissionais' },
    { id: 'parallax', name: 'Parallax', desc: 'Movimento em camadas 3D' },
    { id: 'zoom', name: 'Zoom Dramático', desc: 'Aproximação suave e elegante' },
    { id: 'pan', name: 'Pan Suave', desc: 'Movimento horizontal fluido' },
    { id: 'particles', name: 'Partículas', desc: 'Efeitos visuais dinâmicos' }
  ]

  const musicOptions = [
    { id: 'epic', name: 'Épico', desc: 'Trilha orquestral impactante' },
    { id: 'corporate', name: 'Corporativo', desc: 'Música profissional e limpa' },
    { id: 'ambient', name: 'Ambiente', desc: 'Sons relaxantes e atmosféricos' },
    { id: 'upbeat', name: 'Energético', desc: 'Ritmo acelerado e motivador' },
    { id: 'none', name: 'Sem Música', desc: 'Apenas efeitos sonoros' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                <Video className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">VideoAI Pro</h1>
                <p className="text-sm text-gray-300">Crie vídeos profissionais com IA</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-white text-sm font-medium">
                ✨ Grátis
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Área de Upload e Preview */}
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                Sua Imagem
              </h2>
              
              {!selectedImage ? (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-purple-400/50 rounded-xl p-12 text-center cursor-pointer hover:border-purple-400 transition-colors group"
                >
                  <Upload className="w-12 h-12 text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <p className="text-white font-medium mb-2">Clique para fazer upload</p>
                  <p className="text-gray-400 text-sm">PNG, JPG até 10MB</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative rounded-xl overflow-hidden">
                    <img 
                      src={selectedImage} 
                      alt="Imagem selecionada" 
                      className="w-full h-64 object-cover"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute top-2 right-2 p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button
                    onClick={generateVideo}
                    disabled={isGenerating}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Gerando Vídeo...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Gerar Vídeo Profissional
                      </>
                    )}
                  </button>
                </div>
              )}
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {/* Preview do Vídeo */}
            {generatedVideo && (
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Seu Vídeo Profissional
                </h3>
                
                <div className="relative bg-black rounded-xl overflow-hidden mb-4">
                  <div className="aspect-video flex items-center justify-center">
                    <div className="text-center">
                      <Play className="w-16 h-16 text-white/70 mx-auto mb-4" />
                      <p className="text-white/70">Vídeo gerado com sucesso!</p>
                      <p className="text-sm text-gray-400 mt-2">
                        Duração: {videoSettings.duration}s • Qualidade: {videoSettings.quality.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={downloadVideo}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-6 rounded-xl font-medium hover:from-green-600 hover:to-emerald-600 transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Vídeo (MP4)
                </button>
              </div>
            )}
          </div>

          {/* Configurações */}
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Configurações Profissionais
              </h2>

              {/* Duração */}
              <div className="mb-6">
                <label className="block text-white font-medium mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Duração do Vídeo
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[3, 5, 10, 15].map(duration => (
                    <button
                      key={duration}
                      onClick={() => setVideoSettings(prev => ({ ...prev, duration }))}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        videoSettings.duration === duration
                          ? 'bg-purple-500 text-white'
                          : 'bg-white/10 text-gray-300 hover:bg-white/20'
                      }`}
                    >
                      {duration}s
                    </button>
                  ))}
                </div>
              </div>

              {/* Estilo de Vídeo */}
              <div className="mb-6">
                <label className="block text-white font-medium mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Estilo de Animação
                </label>
                <div className="space-y-2">
                  {videoStyles.map(style => (
                    <button
                      key={style.id}
                      onClick={() => setVideoSettings(prev => ({ ...prev, style: style.id }))}
                      className={`w-full p-3 rounded-lg text-left transition-all ${
                        videoSettings.style === style.id
                          ? 'bg-purple-500/20 border border-purple-500'
                          : 'bg-white/5 border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div className="text-white font-medium">{style.name}</div>
                      <div className="text-sm text-gray-400">{style.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Música */}
              <div className="mb-6">
                <label className="block text-white font-medium mb-3 flex items-center gap-2">
                  <Music className="w-4 h-4" />
                  Trilha Sonora
                </label>
                <div className="space-y-2">
                  {musicOptions.map(music => (
                    <button
                      key={music.id}
                      onClick={() => setVideoSettings(prev => ({ ...prev, music: music.id }))}
                      className={`w-full p-3 rounded-lg text-left transition-all ${
                        videoSettings.music === music.id
                          ? 'bg-purple-500/20 border border-purple-500'
                          : 'bg-white/5 border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div className="text-white font-medium">{music.name}</div>
                      <div className="text-sm text-gray-400">{music.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Qualidade */}
              <div>
                <label className="block text-white font-medium mb-3 flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Qualidade de Exportação
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['HD', '4K', '8K'].map(quality => (
                    <button
                      key={quality}
                      onClick={() => setVideoSettings(prev => ({ ...prev, quality: quality.toLowerCase() }))}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        videoSettings.quality === quality.toLowerCase()
                          ? 'bg-purple-500 text-white'
                          : 'bg-white/10 text-gray-300 hover:bg-white/20'
                      }`}
                    >
                      {quality}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Recursos Profissionais */}
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">✨ Recursos Profissionais</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Animações cinematográficas avançadas
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Trilhas sonoras profissionais licenciadas
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Exportação em até 8K de resolução
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Efeitos visuais e transições suaves
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Processamento com IA de última geração
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
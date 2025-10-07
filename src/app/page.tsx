"use client"

import { useState, useEffect } from 'react'
import { Heart, Star, Sparkles, Flower, ShoppingBag, Home, Mail, Edit3, Save, X } from 'lucide-react'

export default function MeusDescontosOnline() {
  const [currentSection, setCurrentSection] = useState('inicio')
  const [isAdminMode, setIsAdminMode] = useState(false)
  const [editingElement, setEditingElement] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [showSuccess, setShowSuccess] = useState(false)

  // Configurações editáveis (localStorage)
  const [siteConfig, setSiteConfig] = useState({
    backgroundImage: 'https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/f79ad46d-c566-4818-a01c-69ef3cdae045.jpg',
    siteName: 'Meus Descontos Online',
    heroTitle: '💕 Todos os Melhores Descontos em um Só Lugar!',
    heroSubtitle: 'Acesse promoções incríveis da Amazon, Mercado Livre, Magazine Luiza, Americanas, Shopee e AliExpress — tudo reunido para você aproveitar com estilo!',
    aboutText: 'Organizamos as melhores promoções da internet para que você encontre tudo em um só lugar. Economia, praticidade e charme em cada clique 💖.',
    affiliateLinks: {
      amazon: '#amazon-afiliado',
      mercadolivre: '#mercadolivre-afiliado',
      magazineluiza: '#magazineluiza-afiliado',
      americanas: '#americanas-afiliado',
      shopee: '#shopee-afiliado',
      aliexpress: '#aliexpress-afiliado'
    }
  })

  // Carregar configurações do localStorage
  useEffect(() => {
    const saved = localStorage.getItem('siteConfig')
    if (saved) {
      setSiteConfig(JSON.parse(saved))
    }
  }, [])

  // Salvar configurações no localStorage
  const saveConfig = () => {
    localStorage.setItem('siteConfig', JSON.stringify(siteConfig))
    setEditingElement(null)
  }

  // Navegação suave
  const scrollToSection = (section: string) => {
    setCurrentSection(section)
    const element = document.getElementById(section)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Edição inline
  const handleEdit = (field: string, value: string) => {
    const keys = field.split('.')
    setSiteConfig(prev => {
      const newConfig = { ...prev }
      let current: any = newConfig
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]]
      }
      current[keys[keys.length - 1]] = value
      return newConfig
    })
  }

  // Componente de edição inline
  const EditableText = ({ field, value, className, multiline = false }: any) => {
    if (isAdminMode && editingElement === field) {
      return (
        <div className="relative">
          {multiline ? (
            <textarea
              value={value}
              onChange={(e) => handleEdit(field, e.target.value)}
              className="w-full p-2 border-2 border-pink-300 rounded-lg bg-white/90"
              rows={3}
            />
          ) : (
            <input
              type="text"
              value={value}
              onChange={(e) => handleEdit(field, e.target.value)}
              className="w-full p-2 border-2 border-pink-300 rounded-lg bg-white/90"
            />
          )}
          <div className="flex gap-2 mt-2">
            <button
              onClick={saveConfig}
              className="px-3 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors"
            >
              <Save className="w-4 h-4" />
            </button>
            <button
              onClick={() => setEditingElement(null)}
              className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )
    }

    return (
      <div
        className={`${className} ${isAdminMode ? 'cursor-pointer hover:bg-pink-100/50 rounded p-1' : ''}`}
        onClick={() => isAdminMode && setEditingElement(field)}
      >
        {value}
        {isAdminMode && (
          <Edit3 className="inline w-4 h-4 ml-2 text-pink-500" />
        )}
      </div>
    )
  }

  // Marketplaces
  const marketplaces = [
    { name: 'Amazon', color: 'from-orange-400 to-orange-600', icon: '🛒', link: siteConfig.affiliateLinks.amazon },
    { name: 'Mercado Livre', color: 'from-yellow-400 to-yellow-600', icon: '🛍️', link: siteConfig.affiliateLinks.mercadolivre },
    { name: 'Magazine Luiza', color: 'from-blue-400 to-blue-600', icon: '🏪', link: siteConfig.affiliateLinks.magazineluiza },
    { name: 'Americanas', color: 'from-red-400 to-red-600', icon: '🎁', link: siteConfig.affiliateLinks.americanas },
    { name: 'Shopee', color: 'from-pink-400 to-pink-600', icon: '🛒', link: siteConfig.affiliateLinks.shopee },
    { name: 'AliExpress', color: 'from-purple-400 to-purple-600', icon: '📦', link: siteConfig.affiliateLinks.aliexpress }
  ]

  // Categorias
  const categories = [
    { name: 'Tecnologia', icon: '💻', color: 'from-cyan-400 to-cyan-600' },
    { name: 'Casa & Jardim', icon: '🏡', color: 'from-green-400 to-green-600' },
    { name: 'Moda', icon: '👗', color: 'from-pink-400 to-pink-600' },
    { name: 'Bebês', icon: '👶', color: 'from-yellow-400 to-yellow-600' },
    { name: 'Games', icon: '🎮', color: 'from-purple-400 to-purple-600' },
    { name: 'Beleza', icon: '💅', color: 'from-rose-400 to-rose-600' }
  ]

  // Envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowSuccess(true)
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <div className="min-h-screen relative">
      {/* Background com overlay - removido fundo branco */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${siteConfig.backgroundImage})` }}
      />
      <div className="fixed inset-0 bg-gradient-to-br from-pink-200/60 via-purple-100/50 to-blue-200/60 backdrop-blur-sm" />
      
      {/* Botão Admin Mode */}
      <button
        onClick={() => setIsAdminMode(!isAdminMode)}
        className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-full text-white font-medium transition-all ${
          isAdminMode ? 'bg-red-500 hover:bg-red-600' : 'bg-pink-500 hover:bg-pink-600'
        }`}
      >
        {isAdminMode ? 'Sair do Admin' : 'Modo Admin'}
      </button>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/20 backdrop-blur-md border-b border-white/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-pink-500" />
              <EditableText
                field="siteName"
                value={siteConfig.siteName}
                className="text-xl font-bold text-gray-800"
              />
              <Sparkles className="w-5 h-5 text-pink-400" />
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => scrollToSection('inicio')}
                className="flex items-center gap-2 text-gray-700 hover:text-pink-600 transition-colors"
              >
                <Home className="w-4 h-4" />
                Início
              </button>
              <button
                onClick={() => scrollToSection('ofertas')}
                className="flex items-center gap-2 text-gray-700 hover:text-pink-600 transition-colors"
              >
                <Heart className="w-4 h-4" />
                Ofertas
              </button>
              <button
                onClick={() => scrollToSection('contato')}
                className="flex items-center gap-2 text-gray-700 hover:text-pink-600 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Contato
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pt-20">
        {/* Hero Section */}
        <section id="inicio" className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="relative">
              <Star className="absolute -top-8 -left-8 w-8 h-8 text-yellow-400 animate-pulse" />
              <Heart className="absolute -top-4 -right-4 w-6 h-6 text-pink-400 animate-bounce" />
              
              <EditableText
                field="heroTitle"
                value={siteConfig.heroTitle}
                className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight"
              />
              
              <EditableText
                field="heroSubtitle"
                value={siteConfig.heroSubtitle}
                className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed"
                multiline
              />
              
              <button
                onClick={() => scrollToSection('ofertas')}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
              >
                ✨ Aproveitar Agora
              </button>
              
              <Flower className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-8 h-8 text-pink-400 animate-pulse" />
            </div>
          </div>
        </section>

        {/* Ofertas Section */}
        <section id="ofertas" className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                💖 Ofertas Especiais
              </h2>
              <p className="text-lg text-gray-600">
                Clique e aproveite os melhores descontos!
              </p>
            </div>

            {/* Categorias - MOVIDAS PARA CIMA */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                💫 Categorias
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((category, index) => (
                  <div
                    key={category.name}
                    className={`bg-gradient-to-br ${category.color} p-4 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-pointer text-center text-white`}
                    onClick={() => alert(`Página de ${category.name} em desenvolvimento!`)}
                  >
                    <div className="text-2xl mb-2">{category.icon}</div>
                    <h4 className="text-sm font-medium">{category.name}</h4>
                  </div>
                ))}
              </div>
            </div>

            {/* Principais Marketplaces - MOVIDOS PARA BAIXO */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                🌷 Principais Marketplaces
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {marketplaces.map((marketplace, index) => (
                  <div
                    key={marketplace.name}
                    className={`bg-gradient-to-br ${marketplace.color} p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer group`}
                    onClick={() => window.location.href = marketplace.link}
                  >
                    <div className="text-center text-white">
                      <div className="text-4xl mb-3">{marketplace.icon}</div>
                      <h4 className="text-xl font-bold mb-2">{marketplace.name}</h4>
                      <button className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-colors">
                        Ver Ofertas 💕
                      </button>
                    </div>
                    <Heart className="absolute top-2 right-2 w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sobre Section */}
        <section className="py-20 px-4 bg-white/10 backdrop-blur-sm">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="relative">
              <Star className="absolute -top-4 -left-4 w-6 h-6 text-yellow-400" />
              <Heart className="absolute -top-2 -right-2 w-5 h-5 text-pink-400" />
              
              <EditableText
                field="aboutText"
                value={siteConfig.aboutText}
                className="text-lg md:text-xl text-gray-700 leading-relaxed"
                multiline
              />
              
              <Flower className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-6 h-6 text-pink-400" />
            </div>
          </div>
        </section>

        {/* Contato Section */}
        <section id="contato" className="py-20 px-4">
          <div className="container mx-auto max-w-2xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                💌 Entre em Contato
              </h2>
              <p className="text-lg text-gray-600">
                Tem alguma dúvida? Adoramos conversar!
              </p>
            </div>

            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 shadow-lg">
              {showSuccess ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🌸</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Obrigada por entrar em contato!
                  </h3>
                  <p className="text-gray-600">
                    Responderemos em breve 💖
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Nome
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:border-pink-400 focus:outline-none bg-white/80"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:border-pink-400 focus:outline-none bg-white/80"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Mensagem
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:border-pink-400 focus:outline-none bg-white/80"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:scale-105 transition-transform shadow-lg"
                  >
                    💌 Enviar Mensagem
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 bg-white/10 backdrop-blur-sm">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="flex justify-center gap-6 mb-8">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
                📷
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
                📱
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
                📞
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
                🎵
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">
              ✨ Este site contém links de afiliados. Ao comprar por eles, você apoia nosso trabalho sem pagar nada a mais.
            </p>
            
            <div className="flex justify-center gap-4 text-2xl">
              <span className="animate-pulse">💫</span>
              <span className="animate-bounce">💖</span>
              <span className="animate-pulse">🌷</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
import { create } from 'zustand'

export const TABS = [
  { key: 'mapa', icon: '🗺️', label: 'Mapa' },
  { key: 'registrar', icon: '📷', label: 'Registrar' },
  { key: 'guia', icon: '🔭', label: 'Guia' },
  { key: 'perfil', icon: '🧭', label: 'Perfil' },
]

function getInitialTheme() {
  try { return localStorage.getItem('matago-theme') || 'dark' } catch { return 'dark' }
}

const useAppStore = create((set) => ({
  activeTab: 'mapa',
  selectedAnimalId: null,
  registerPrefilledAnimalId: null,
  mapCenter: [-22.02, -44.73],
  theme: getInitialTheme(),
  toast: null,
  viewProfileId: null,

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedAnimal: (id) => set({ selectedAnimalId: id }),
  clearSelectedAnimal: () => set({ selectedAnimalId: null }),
  setRegisterAnimal: (id) => set({ registerPrefilledAnimalId: id, activeTab: 'registrar' }),
  setViewProfile: (id) => set({ viewProfileId: id, activeTab: 'perfil' }),
  clearViewProfile: () => set({ viewProfileId: null }),
  setMapCenter: (center) => set({ mapCenter: center }),
  showToast: (message) => set({ toast: { message, key: Date.now() } }),
  clearToast: () => set({ toast: null }),
  setTheme: (theme) => {
    try { localStorage.setItem('matago-theme', theme) } catch {}
    document.documentElement.setAttribute('data-theme', theme)
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.content = theme === 'light' ? '#F8F3E9' : '#060D07'
    set({ theme })
  },
}))

const stored = getInitialTheme()
if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('data-theme', stored)
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.content = stored === 'light' ? '#F8F3E9' : '#060D07'
}

export default useAppStore

import { create } from 'zustand'

export const TABS = [
  { key: 'mapa', icon: '🗺️', label: 'Mapa' },
  { key: 'registrar', icon: '📷', label: 'Registrar' },
  { key: 'guia', icon: '🔭', label: 'Guia' },
  { key: 'perfil', icon: '🧭', label: 'Perfil' },
]

const useAppStore = create((set) => ({
  activeTab: 'mapa',
  selectedAnimalId: null,
  registerPrefilledAnimalId: null,
  mapCenter: [-22.155, -44.845],

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedAnimal: (id) => set({ selectedAnimalId: id }),
  clearSelectedAnimal: () => set({ selectedAnimalId: null }),
  setRegisterAnimal: (id) => set({ registerPrefilledAnimalId: id, activeTab: 'registrar' }),
  setMapCenter: (center) => set({ mapCenter: center }),
}))

export default useAppStore

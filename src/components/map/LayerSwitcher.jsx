import { useState } from 'react'

const LAYERS = [
  {
    key: 'satellite',
    label: 'Satélite',
    icon: '🛰️',
    tiles: [
      { url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', attribution: 'ESRI' },
    ],
    overlays: [
      { url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', attribution: 'ESRI' },
    ],
  },
  {
    key: 'topo',
    label: 'Topografia',
    icon: '⛰️',
    tiles: [
      { url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', attribution: 'OpenTopoMap' },
    ],
  },
  {
    key: 'simple',
    label: 'Simples',
    icon: '🗺️',
    tiles: [
      { url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', attribution: 'OSM · CARTO' },
    ],
  },
]

export default function LayerSwitcher({ active, onChange }) {
  const [open, setOpen] = useState(false)
  const current = LAYERS.find(l => l.key === active) || LAYERS[0]

  return (
    <div style={{
      position: 'absolute',
      top: 12,
      right: 12,
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      alignItems: 'flex-end',
    }}>
      {open && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          animation: 'fadeIn .15s ease-out',
        }}>
          {LAYERS.filter(l => l.key !== active).map(layer => (
            <button
              key={layer.key}
              onClick={() => { onChange(layer.key); setOpen(false) }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 14px',
                borderRadius: 999,
                background: 'rgba(6, 13, 7, 0.82)',
                backdropFilter: 'blur(50px) saturate(1.8)',
                WebkitBackdropFilter: 'blur(50px) saturate(1.8)',
                border: '0.5px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                color: 'var(--text-2)',
                fontSize: 12,
                fontWeight: 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all .2s',
              }}
            >
              <span style={{ fontSize: 14 }}>{layer.icon}</span>
              {layer.label}
            </button>
          ))}
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 14px',
          borderRadius: 999,
          background: 'rgba(6, 13, 7, 0.82)',
          backdropFilter: 'blur(50px) saturate(1.8)',
          WebkitBackdropFilter: 'blur(50px) saturate(1.8)',
          border: '0.5px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
          color: open ? 'var(--accent)' : 'var(--text-2)',
          fontSize: 12,
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all .2s',
        }}
      >
        <span style={{ fontSize: 14 }}>{current.icon}</span>
        {current.label}
        <span style={{ fontSize: 10, opacity: 0.6, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>▾</span>
      </button>
    </div>
  )
}

export { LAYERS }

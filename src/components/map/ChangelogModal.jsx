import { useState } from 'react'

const content = [
  {
    tier: 'L',
    label: 'Lendário',
    changes: [
      { name: 'Veado-campeiro', old: 'S 280', new: 'L 2800' },
      { name: 'Onça-parda', old: 'S 450', new: 'L 1450' },
      { name: 'Onça-pintada', old: 'L 800', new: 'L 1800' },
      { name: 'Sapo-Flamenguinho', old: 'L 1000', new: 'L 1000' },
      { name: 'Lobo-guará', old: 'L 600', new: 'L 600' },
    ],
  },
  {
    tier: 'S',
    label: 'Mítico',
    changes: [
      { name: 'Ariranha', old: 'S 500', new: 'S 600' },
      { name: 'Anta', old: 'S 400', new: 'S 700' },
      { name: 'Jaguatirica', old: 'S 350', new: 'S 550' },
    ],
  },
  {
    tier: 'A',
    label: 'Épico',
    changes: [
      { name: 'Urutau', old: 'A 150', new: 'A 650' },
      { name: 'Bugio', old: 'A 200', new: 'A 600' },
      { name: 'Jaratataca', old: 'A 200', new: 'A 400' },
      { name: 'Jararaca', old: 'A 250', new: 'A 350' },
      { name: 'Cachorro-do-mato', old: 'A 200', new: 'A 300' },
      { name: 'Caninana', old: 'A 160', new: 'A 260' },
      { name: 'Jacu', old: 'A 140', new: 'A 150' },
    ],
  },
  {
    tier: 'B',
    label: 'Raro',
    changes: [
      { name: 'Esquilo', old: 'B 70', new: 'B 600' },
      { name: 'Cascavel', old: 'A 280', new: 'B 110' },
      { name: 'Beija-flor', old: 'B 90', new: 'B 60' },
    ],
  },
  {
    tier: 'C',
    label: 'Comum',
    changes: [
      { name: 'Capivara', old: 'C 35', new: 'C 95' },
      { name: 'Lebre', old: 'C 25', new: 'C 75' },
      { name: 'Gambá', old: 'C 25', new: 'C 70' },
      { name: 'Sabiá', old: 'C 30', new: 'C 50' },
      { name: 'Cobra-cipó', old: 'C 30', new: 'C 40' },
      { name: 'Canarinho-da-terra', old: '—', new: 'C 15 🐦' },
    ],
  },
  {
    tier: 'D',
    label: 'Muito Comum',
    changes: [
      { name: 'Bem-te-vi', old: 'D 12', new: 'D 20' },
      { name: 'Mosquito', old: 'D 5', new: 'D 10' },
      { name: 'Pombo', old: 'D 6', new: 'D 1' },
    ],
  },
]

const TIER_COLORS = { L: 'var(--coral)', S: '#E67E22', A: '#8E44AD', B: '#3498DB', C: '#27AE60', D: 'var(--text-2)' }

const baseStyle = {
  position: 'absolute',
  zIndex: 1000,
  background: 'rgba(6, 13, 7, 0.88)',
  backdropFilter: 'blur(60px) saturate(1.8)',
  WebkitBackdropFilter: 'blur(60px) saturate(1.8)',
  border: '0.5px solid rgba(255, 255, 255, 0.08)',
  boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
  color: 'var(--text-1)',
  fontSize: 13,
  animation: 'fadeIn .2s ease-out',
}

export default function ChangelogModal({ onClose }) {
  return (
    <div
      style={{
        ...baseStyle,
        top: 60,
        right: 12,
        maxHeight: 'calc(100vh - 160px)',
        width: 320,
        borderRadius: 16,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 16px 8px',
        borderBottom: '0.5px solid rgba(255,255,255,0.06)',
      }}>
        <span style={{ fontWeight: 700, fontSize: 14 }}>⚡ Atualização de Pontos</span>
        <button
          onClick={onClose}
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: 'none',
            borderRadius: 999,
            width: 28,
            height: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-2)',
            fontSize: 14,
            cursor: 'pointer',
          }}
        >
          ✕
        </button>
      </div>

      <div style={{
        padding: '8px 16px 12px',
        borderBottom: '0.5px solid rgba(255,255,255,0.06)',
        fontSize: 12,
        color: 'var(--text-2)',
        lineHeight: 1.5,
      }}>
        <strong style={{ color: 'var(--text-1)' }}>Cálculo dos pontos:</strong><br />
        <code style={{ fontSize: 11 }}>pts_base × tipo × (1 + bônus) × fator</code>
        <div style={{ marginTop: 4 }}>
          <strong>Tipos:</strong> foto ×1.0 · pegada ×0.6 · atropelamento ×0.4 · comunicação ×0.2<br />
          <strong>Bônus:</strong> descrição >10 chars +10% · GPS +10% · data +10%<br />
          <strong>Fator:</strong> 1ª vez da espécie ×2.0 · repetição ×0.5
        </div>
      </div>

      <div style={{ overflowY: 'auto', padding: '8px 16px 16px' }}>
        {content.map(group => (
          <div key={group.tier} style={{ marginBottom: 12 }}>
            <div style={{
              fontWeight: 700,
              fontSize: 12,
              color: TIER_COLORS[group.tier],
              marginBottom: 4,
            }}>
              {group.tier} — {group.label}
            </div>
            {group.changes.map((c, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '3px 0',
                  fontSize: 12,
                  borderBottom: '0.5px solid rgba(255,255,255,0.03)',
                }}
              >
                <span style={{ color: 'var(--text-2)', flex: 1 }}>{c.name}</span>
                <span style={{ color: 'var(--text-3)', fontSize: 11, marginRight: 8 }}>{c.old}</span>
                <span style={{ color: 'var(--accent)' }}>{c.new}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

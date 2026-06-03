import { useState } from 'react'

const content = [
  {
    tier: 'L',
    label: 'Lendário',
    changes: [
      { name: 'Veado-campeiro', old: 'L 2800', new: 'L 1100' },
      { name: 'Onça-pintada', old: 'L 1800', new: 'L 1200' },
      { name: 'Onça-parda', old: 'L 1450', new: 'L 1000' },
      { name: 'Sapo-Flamenguinho', old: 'L 1000', new: 'L 900' },
      { name: 'Lobo-guará', old: 'L 600', new: 'L 800' },
    ],
  },
  {
    tier: 'S',
    label: 'Mítico',
    changes: [
      { name: 'Esquilo', old: 'B 600', new: 'S 600 ↑' },
      { name: 'Anta', old: 'S 700', new: 'S 700' },
      { name: 'Ariranha', old: 'S 600', new: 'S 600' },
      { name: 'Jaguatirica', old: 'S 550', new: 'S 550' },
    ],
  },
  {
    tier: 'A',
    label: 'Épico',
    changes: [
      { name: 'Urutau', old: 'A 650', new: 'A 380' },
      { name: 'Bugio', old: 'A 600', new: 'A 350' },
      { name: 'Jaratataca', old: 'A 400', new: 'A 350' },
      { name: 'Jararaca', old: 'A 350', new: 'A 350' },
      { name: 'Cachorro-do-mato', old: 'A 300', new: 'A 300' },
      { name: 'Caninana', old: 'A 260', new: 'A 280' },
      { name: 'Paca', old: 'A 220', new: 'A 250' },
      { name: 'Quati', old: 'A 180', new: 'A 220' },
      { name: 'Jacu', old: 'A 150', new: 'A 200' },
    ],
  },
  {
    tier: 'B',
    label: 'Raro',
    changes: [
      { name: 'Cascavel', old: 'B 110', new: 'B 140' },
      { name: 'Tucano', old: 'B 100', new: 'B 140' },
      { name: 'Gavião', old: 'B 90', new: 'B 120' },
      { name: 'Mico', old: 'B 90', new: 'B 110' },
      { name: 'Seriema', old: 'B 80', new: 'B 100' },
      { name: 'Teiú', old: 'B 80', new: 'B 100' },
      { name: 'Coruja', old: 'B 70', new: 'B 100' },
      { name: 'Tiê-sangue', old: 'B 70', new: 'B 100' },
      { name: 'Beija-flor', old: 'B 60', new: 'B 90' },
      { name: 'Trinca-ferro', old: 'B 60', new: 'B 90' },
      { name: 'Jataí', old: 'B 50', new: 'B 80' },
    ],
  },
  {
    tier: 'C',
    label: 'Comum',
    changes: [
      { name: 'Capivara', old: 'C 95', new: 'C 70' },
      { name: 'Lebre', old: 'C 75', new: 'C 60' },
      { name: 'Gambá', old: 'C 70', new: 'C 55' },
      { name: 'Sabiá', old: 'C 50', new: 'C 50' },
      { name: 'Cobra-cipó', old: 'C 40', new: 'C 45' },
      { name: 'João-de-barro', old: 'C 38', new: 'C 40' },
      { name: 'Sapo-cururu', old: 'C 20', new: 'C 35' },
      { name: 'Rã', old: 'C 22', new: 'C 35' },
      { name: 'Rolinha', old: 'C 20', new: 'C 30' },
      { name: 'Abelha', old: 'C 18', new: 'C 30' },
      { name: 'Camundongo', old: 'C 15', new: 'C 25' },
      { name: 'Canarinho-da-terra', old: 'C 15', new: 'C 20' },
    ],
  },
  {
    tier: 'D',
    label: 'Muito Comum',
    changes: [
      { name: 'Bem-te-vi', old: 'D 20', new: 'D 20' },
      { name: 'Taturana', old: 'D 15', new: 'D 15' },
      { name: 'Lagartixa', old: 'D 10', new: 'D 12' },
      { name: 'Borboleta', old: 'D 10', new: 'D 12' },
      { name: 'Pardal', old: 'D 8', new: 'D 10' },
      { name: 'Formiga Sauva', old: 'D 8', new: 'D 8' },
      { name: 'Mosquito', old: 'D 10', new: 'D 8' },
      { name: 'Mariposa', old: 'D 6', new: 'D 8' },
      { name: 'Pombo', old: 'D 1', new: 'D 6' },
    ],
  },
]

const TIER_COLORS = { L: 'var(--coral)', S: '#E67E22', A: '#8E44AD', B: '#3498DB', C: '#27AE60', D: 'var(--text-2)' }

export default function ChangelogModal({ onClose }) {
  return (
    <>
      {/* backdrop escuro pra destacar o card */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999,
          background: 'rgba(0,0,0,0.35)',
          animation: 'fadeIn .2s ease-out',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: 56,
          right: 12,
          zIndex: 1001,
          width: 330,
          maxHeight: 'calc(100vh - 140px)',
          borderRadius: 18,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          background: 'rgba(8, 12, 10, 0.65)',
          backdropFilter: 'blur(40px) saturate(2.5)',
          WebkitBackdropFilter: 'blur(40px) saturate(2.5)',
          border: '0.5px solid rgba(255, 215, 0, 0.15)',
          boxShadow: '0 12px 60px rgba(0,0,0,0.7), 0 0 0 0.5px rgba(255, 215, 0, 0.05) inset',
          color: 'var(--text-1)',
          fontSize: 13,
          animation: 'fadeIn .25s ease-out',
        }}
      >
        {/* banner intro */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(196,68,57,0.2), rgba(255,215,0,0.08))',
          padding: '16px 18px 14px',
          borderBottom: '0.5px solid rgba(255,215,0,0.1)',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}>
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontWeight: 800,
                fontSize: 15,
                color: 'var(--coral)',
              }}>
                <span style={{ fontSize: 18 }}>⚡</span>
                Atualização de Pontos
              </div>
              <p style={{
                margin: '6px 0 0',
                fontSize: 12.5,
                lineHeight: 1.55,
                color: 'var(--text-2)',
              }}>
                Rebalanceamos os pontos para um sistema mais equilibrado, sem discrepâncias entre tiers. Espécies do mesmo tier agora têm valores aproximados, e repetições não são mais punidas. Confira as mudanças abaixo.
              </p>
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '0.5px solid rgba(255,255,255,0.08)',
                borderRadius: 999,
                width: 30,
                height: 30,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-2)',
                fontSize: 14,
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'all .2s',
              }}
            >
              ✕
            </button>
          </div>

          {/* legenda fórmula */}
          <div style={{
            marginTop: 10,
            padding: '10px 12px',
            borderRadius: 12,
            background: 'rgba(0,0,0,0.3)',
            border: '0.5px solid rgba(255,255,255,0.04)',
            fontSize: 11.5,
            lineHeight: 1.6,
            color: 'var(--text-2)',
          }}>
            <span style={{ fontWeight: 700, color: 'var(--text-1)' }}>Fórmula:</span>{' '}
            <code style={{
              color: 'var(--accent)',
              background: 'rgba(80, 200, 120, 0.1)',
              padding: '1px 6px',
              borderRadius: 4,
              fontSize: 11,
            }}>pts_base × tipo × (1 + bônus) × fator</code>
            <div style={{ marginTop: 5, display: 'flex', flexDirection: 'column', gap: 3 }}>
              <span>📷 tipo: foto ×1.0 · pegada ×0.6 · atropelamento ×0.4 · comunicação ×0.2</span>
              <span>✨ bônus: descrição +10% · GPS +10% · data +10%</span>
              <span>🏆 fator: <strong style={{ color: 'var(--accent)' }}>1ª vez no app ×1.5</strong> · repetição ×1.0</span>
            </div>
          </div>
        </div>

        {/* lista de mudanças */}
        <div style={{ overflowY: 'auto', padding: '10px 16px 16px' }}>
          {content.map(group => (
            <div key={group.tier} style={{ marginBottom: 14 }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontWeight: 700,
                fontSize: 12,
                color: TIER_COLORS[group.tier],
                marginBottom: 5,
                padding: '4px 0',
                borderBottom: '0.5px solid rgba(255,255,255,0.04)',
              }}>
                <span style={{
                  width: 4,
                  height: 4,
                  borderRadius: 999,
                  background: TIER_COLORS[group.tier],
                  flexShrink: 0,
                }} />
                {group.tier} — {group.label}
              </div>
              {group.changes.map((c, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '4px 6px',
                    fontSize: 12,
                    borderRadius: 6,
                    transition: 'background .1s',
                  }}
                >
                  <span style={{ color: 'var(--text-2)', flex: 1 }}>{c.name}</span>
                  <span style={{ color: 'var(--text-3)', fontSize: 11, marginRight: 8, textDecoration: 'line-through', opacity: 0.6 }}>{c.old}</span>
                  <span style={{ color: c.new.startsWith(c.old.split(' ')[0]) ? 'var(--accent)' : 'var(--coral)', fontWeight: 600 }}>{c.new}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

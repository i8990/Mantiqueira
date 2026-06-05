import { useState, useEffect, useMemo } from 'react'
import useLikes from '../../hooks/useLikes'
import EditSightingSheet from './EditSightingSheet'

const TYPE_LABELS = {
  foto: '📸',
  pegada: '🦶',
  atropelamento: '🚗',
  comunicacao: '📞',
}

export default function MySightingsSheet({ sightings, deleteSighting, updateSighting, onClose, userId }) {
  const { likesData, loadLikes } = useLikes(userId)
  const sightingIds = useMemo(() => sightings.map(s => s.id), [sightings])

  useEffect(() => {
    if (sightingIds.length) loadLikes(sightingIds)
  }, [sightingIds, loadLikes])
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [editingSighting, setEditingSighting] = useState(null)

  const handleDelete = async (id) => {
    setDeleting(true)
    const { error } = await deleteSighting(id)
    setDeleting(false)
    if (!error) setConfirmDelete(null)
  }

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 15000,
      background: 'rgba(0,0,0,.75)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20, animation: 'fadeIn .2s ease-out',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'var(--glass-strong)',
        backdropFilter: 'var(--glass-blur-ultra)',
        WebkitBackdropFilter: 'var(--glass-blur-ultra)',
        borderRadius: 'var(--r-2xl)', width: '100%', maxWidth: 420, maxHeight: '85%',
        overflowY: 'auto', padding: 28,
        border: '0.5px solid var(--glass-border-light)',
        boxShadow: 'var(--shadow-xl)', animation: 'scaleIn .35s var(--ease-spring)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: 22, color: 'var(--text-1)' }}>
            📋 Meus Registros
          </h3>
          <button onClick={onClose}
            style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--glass)', border: '0.5px solid var(--glass-border)', color: 'var(--text-3)', fontSize: 16, cursor: 'pointer' }}
          >✕</button>
        </div>

        {sightings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-3)', fontSize: 14 }}>
            Nenhum registro ainda
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {sightings.map(s => (
              <div key={s.id} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px', borderRadius: 'var(--r-md)',
                background: 'var(--glass)', border: '0.5px solid var(--glass-border)',
              }}>
                {s.photo_url ? (
                  <img src={s.photo_url} alt=""
                    style={{ width: 40, height: 40, borderRadius: 'var(--r-sm)', objectFit: 'cover', flexShrink: 0 }}
                  />
                ) : (
                  <div style={{
                    width: 40, height: 40, borderRadius: 'var(--r-sm)',
                    background: 'var(--glass-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20, flexShrink: 0,
                  }}>
                    {s.animals?.emoji || '🐾'}
                  </div>
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-1)' }}>
                      {s.animals?.emoji} {s.animals?.name}
                    </span>
                    <span style={{ fontSize: 11, color: 'var(--text-3)' }}>
                      {TYPE_LABELS[s.sighting_type] || ''}
                    </span>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {new Date(s.observed_at || s.created_at).toLocaleDateString('pt-BR')}
                    {s.lat && s.lng && ` · ${s.lat.toFixed(4)}, ${s.lng.toFixed(4)}`}
                    {s.description && ` · "${s.description.slice(0, 40)}${s.description.length > 40 ? '…' : ''}"`}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--amber)', whiteSpace: 'nowrap' }}>
                    +{s.pts_earned}
                  </div>
                  {likesData[s.id]?.count > 0 && (
                    <div style={{ fontSize: 10, color: '#e74c3c', fontWeight: 600 }}>
                      ❤️ {likesData[s.id].count}
                    </div>
                  )}
                </div>
                {confirmDelete === s.id ? (
                  <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                    <button onClick={() => handleDelete(s.id)} disabled={deleting}
                      style={{
                        padding: '4px 10px', borderRadius: 'var(--r-sm)',
                        background: 'var(--coral)', color: '#fff', fontSize: 11, fontWeight: 600,
                        border: 'none', cursor: deleting ? 'not-allowed' : 'pointer', opacity: deleting ? 0.5 : 1,
                      }}
                    >{deleting ? '…' : 'Sim'}</button>
                    <button onClick={() => setConfirmDelete(null)}
                      style={{
                        padding: '4px 10px', borderRadius: 'var(--r-sm)',
                        background: 'var(--glass)', color: 'var(--text-2)', fontSize: 11, fontWeight: 500,
                        border: '0.5px solid var(--glass-border)', cursor: 'pointer',
                      }}
                    >Não</button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: 2, flexShrink: 0 }}>
                    <button onClick={() => setEditingSighting(s)}
                      style={{
                        width: 32, height: 32, borderRadius: 'var(--r-sm)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'none', border: 'none', color: 'var(--text-3)', fontSize: 14,
                        cursor: 'pointer', opacity: 0.5, transition: 'opacity .2s',
                      }}
                      title="Editar"
                    >✏️</button>
                    <button onClick={() => setConfirmDelete(s.id)}
                      style={{
                        width: 32, height: 32, borderRadius: 'var(--r-sm)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'none', border: 'none', color: 'var(--text-3)', fontSize: 15,
                        cursor: 'pointer', opacity: 0.5, transition: 'opacity .2s',
                      }}
                      title="Deletar"
                    >🗑️</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {sightings.length > 0 && (
          <div style={{ marginTop: 16, padding: '12px 16px', background: 'var(--glass)', borderRadius: 'var(--r-md)', textAlign: 'center' }}>
            <span style={{ fontSize: 12, color: 'var(--text-3)' }}>
              Total de {sightings.length} {sightings.length === 1 ? 'registro' : 'registros'}
            </span>
          </div>
        )}
      </div>
    </div>

    {editingSighting && (
      <EditSightingSheet
        sighting={editingSighting}
        updateSighting={updateSighting}
        onClose={() => setEditingSighting(null)}
      />
    )}
  )
}

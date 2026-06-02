import { useState, useEffect } from 'react'
import useAppStore from '../../stores/useAppStore'
import StepType from '../register/StepType'
import StepPhoto from '../register/StepPhoto'
import StepAnimal from '../register/StepAnimal'
import StepDetails from '../register/StepDetails'

const STEPS = ['Tipo', 'Foto', 'Animal', 'Detalhes']

export default function RegisterScreen({ createSighting, refreshSightings }) {
  const [step, setStep] = useState(0)
  const [sightingType, setSightingType] = useState(null)
  const [photoFile, setPhotoFile] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [animalId, setAnimalId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const prefilledId = useAppStore(s => s.registerPrefilledAnimalId)
  const setActiveTab = useAppStore(s => s.setActiveTab)
  const setRegisterAnimal = useAppStore(s => s.setRegisterAnimal)

  const resetForm = () => {
    setStep(0)
    setSightingType(null)
    setPhotoFile(null)
    setPhotoPreview(null)
    setAnimalId(null)
    setSaving(false)
    setErrorMsg('')
    setActiveTab('mapa')
  }

  useEffect(() => {
    if (prefilledId) {
      setAnimalId(prefilledId)
      setSightingType('foto')
      setStep(2)
      setRegisterAnimal(null)
    }
  }, [prefilledId])

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setPhotoFile(file)
      const reader = new FileReader()
      reader.onload = () => setPhotoPreview(reader.result)
      reader.readAsDataURL(file)
    } else {
      setPhotoFile(null)
      setPhotoPreview(null)
    }
  }

  const handleSave = async ({ description, lat, lng, observedAt }) => {
    if (!animalId || !sightingType) {
      setErrorMsg('Selecione o tipo de avistamento primeiro')
      return
    }
    setSaving(true)
    setErrorMsg('')
    try {
      const { error } = await createSighting({
        animalId,
        sightingType,
        photoFile: photoFile || undefined,
        description,
        lat,
        lng,
        observedAt,
      })
      if (error) {
        setErrorMsg(error)
      } else {
        setStep(0)
        setSightingType(null)
        setPhotoFile(null)
        setPhotoPreview(null)
        setAnimalId(null)
        refreshSightings?.()
        setActiveTab('mapa')
      }
    } catch (err) {
      setErrorMsg(err?.message || 'Erro ao salvar')
    } finally {
      setSaving(false)
    }
  }

  const canProceed = () => {
    if (step === 0) return !!sightingType
    if (step === 1) {
      if (sightingType === 'foto' || sightingType === 'pegada') return !!photoFile
      return true
    }
    if (step === 2) return !!animalId
    return true
  }

  return (
    <div style={{
      padding: '20px 16px 120px',
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      height: '100%',
      overflowY: 'auto',
    }}>
      <div style={{ animation: 'fadeUp .4s var(--ease-spring)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h2 style={{
            fontFamily: 'var(--font-d)',
            fontWeight: 700,
            fontSize: 24,
            color: 'var(--text-1)',
            letterSpacing: '-0.02em',
            marginBottom: 16,
          }}>
            Novo avistamento
          </h2>
          <button
            onClick={resetForm}
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'var(--glass)',
              backdropFilter: 'var(--glass-blur)',
              WebkitBackdropFilter: 'var(--glass-blur)',
              border: '0.5px solid var(--glass-border)',
              color: 'var(--text-2)',
              fontSize: 18,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all .2s',
              flexShrink: 0,
            }}
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', flex: 1, gap: 8 }}>
              <div style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 700,
                background: i <= step ? 'var(--accent-dim)' : 'var(--glass)',
                border: `2px solid ${
                  i < step
                    ? 'var(--accent)'
                    : i === step
                      ? 'var(--accent)'
                      : 'var(--glass-border)'
                }`,
                color: i <= step ? 'var(--accent)' : 'var(--text-3)',
                boxShadow: i === step ? '0 0 12px var(--accent-glow)' : 'none',
                transition: 'all .25s var(--ease-spring)',
              }}>
                {i < step ? '✓' : i + 1}
              </div>
              <span style={{
                fontSize: 11,
                color: i <= step ? 'var(--text-2)' : 'var(--text-3)',
                fontWeight: i === step ? 600 : 400,
              }}>
                {s}
              </span>
              {i < STEPS.length - 1 && (
                <div style={{
                  flex: 1,
                  height: 1.5,
                  background: i < step ? 'var(--accent)' : 'var(--glass-border)',
                  transition: 'background .25s var(--ease-spring)',
                }} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, animation: `fadeUp .35s var(--ease-spring)`, animationDelay: '0.1s' }}>
        {step === 0 && (
          <StepType
            selectedType={sightingType}
            onSelect={setSightingType}
          />
        )}
        {step === 1 && (
          <StepPhoto
            photoPreview={photoPreview}
            onFileChange={handleFileChange}
            onSkip={() => setStep(2)}
            sightingType={sightingType}
          />
        )}
        {step === 2 && (
          <StepAnimal
            selectedAnimalId={animalId}
            onSelect={(id) => { setAnimalId(id); setStep(3) }}
          />
        )}
        {step === 3 && (
          <StepDetails
            animalId={animalId}
            sightingType={sightingType}
            onSave={handleSave}
            saving={saving}
            errorMsg={errorMsg}
          />
        )}
      </div>

      {step < 3 ? (
        <div style={{ display: 'flex', gap: 12 }}>
          {step > 0 && (
            <button
              onClick={() => setStep(s => s - 1)}
              style={{
                flex: 1,
                padding: '14px',
                borderRadius: 'var(--r-md)',
                background: 'var(--glass)',
                backdropFilter: 'var(--glass-blur)',
                WebkitBackdropFilter: 'var(--glass-blur)',
                border: '0.5px solid var(--glass-border)',
                color: 'var(--text-2)',
                fontWeight: 500,
                fontSize: 14,
                cursor: 'pointer',
                transition: 'all .2s var(--ease-spring)',
              }}
            >
              Voltar
            </button>
          )}
          <button
            onClick={() => setStep(s => s + 1)}
            disabled={!canProceed()}
            style={{
              flex: 1,
              padding: '14px',
              borderRadius: 'var(--r-md)',
              background: 'var(--accent)',
              border: 'none',
              color: '#060D07',
              fontWeight: 600,
              fontSize: 14,
              cursor: canProceed() ? 'pointer' : 'not-allowed',
              opacity: canProceed() ? 1 : 0.5,
              boxShadow: '0 4px 20px var(--accent-glow)',
              transition: 'all .2s var(--ease-apple)',
            }}
          >
            Próximo
          </button>
        </div>
      ) : step === 3 ? (
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={() => setStep(2)}
            style={{
              flex: 1,
              padding: '14px',
              borderRadius: 'var(--r-md)',
              background: 'var(--glass)',
              backdropFilter: 'var(--glass-blur)',
              WebkitBackdropFilter: 'var(--glass-blur)',
              border: '0.5px solid var(--glass-border)',
              color: 'var(--text-2)',
              fontWeight: 500,
              fontSize: 14,
              cursor: 'pointer',
              transition: 'all .2s var(--ease-spring)',
            }}
          >
            Voltar
          </button>
          <button
            onClick={resetForm}
            disabled={saving}
            style={{
              flex: 1,
              padding: '14px',
              borderRadius: 'var(--r-md)',
              background: 'var(--coral-dim)',
              border: '0.5px solid var(--coral)',
              color: 'var(--coral)',
              fontWeight: 500,
              fontSize: 14,
              cursor: saving ? 'not-allowed' : 'pointer',
              opacity: saving ? 0.5 : 1,
              transition: 'all .2s',
            }}
          >
            Cancelar
          </button>
        </div>
      ) : null}
    </div>
  )
}

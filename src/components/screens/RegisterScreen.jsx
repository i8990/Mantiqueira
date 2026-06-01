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

  useEffect(() => {
    if (prefilledId) {
      setAnimalId(prefilledId)
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

  const handleSave = async ({ description, lat, lng }) => {
    if (!animalId || !sightingType) return
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
      padding: '20px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      height: '100%',
      overflowY: 'auto',
    }}>
      <h2 style={{
        fontFamily: 'var(--font-d)',
        fontWeight: 700,
        fontSize: 24,
        color: 'var(--text-1)',
        letterSpacing: '-0.02em',
      }}>
        Novo avistamento
      </h2>

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
              transition: 'all .2s var(--ease-apple)',
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
                height: 1,
                background: i < step ? 'var(--accent)' : 'var(--glass-border)',
                transition: 'background .2s var(--ease-apple)',
              }} />
            )}
          </div>
        ))}
      </div>

      <div style={{ flex: 1 }}>
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

      {step < 3 && (
        <div style={{ display: 'flex', gap: 12 }}>
          {step > 0 && (
            <button
              onClick={() => setStep(s => s - 1)}
              style={{
                flex: 1,
                padding: '14px',
                borderRadius: 'var(--r-md)',
                background: 'var(--bg-card)',
                border: '0.5px solid var(--border-strong)',
                color: 'var(--text-2)',
                fontWeight: 500,
                fontSize: 14,
                cursor: 'pointer',
                transition: 'all .2s var(--ease-apple)',
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
      )}
    </div>
  )
}

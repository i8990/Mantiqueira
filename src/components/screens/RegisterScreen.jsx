import { useState, useEffect } from 'react'
import useAppStore from '../../stores/useAppStore'
import StepPhoto from '../register/StepPhoto'
import StepAnimal from '../register/StepAnimal'
import StepDetails from '../register/StepDetails'

const STEPS = ['Foto', 'Animal', 'Detalhes']

export default function RegisterScreen({ createSighting }) {
  const [step, setStep] = useState(0)
  const [photoFile, setPhotoFile] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [animalId, setAnimalId] = useState(null)
  const [saving, setSaving] = useState(false)

  const prefilledId = useAppStore(s => s.registerPrefilledAnimalId)
  const setActiveTab = useAppStore(s => s.setActiveTab)
  const setRegisterAnimal = useAppStore(s => s.setRegisterAnimal)

  useEffect(() => {
    if (prefilledId) {
      setAnimalId(prefilledId)
      setStep(1)
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
    if (!animalId) return
    setSaving(true)
    const { error } = await createSighting({
      animalId,
      photoFile: photoFile || undefined,
      description,
      lat,
      lng,
    })
    setSaving(false)
    if (!error) {
      setStep(0)
      setPhotoFile(null)
      setPhotoPreview(null)
      setAnimalId(null)
      setActiveTab('mapa')
    }
  }

  const stepColors = ['var(--accent)', 'var(--accent)', 'var(--accent)']

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
              background: i < step
                ? 'var(--accent)'
                : i === step
                  ? 'var(--bg-card)'
                  : 'var(--bg-card)',
              border: `2px solid ${
                i < step
                  ? 'var(--accent)'
                  : i === step
                    ? 'var(--accent)'
                    : 'var(--border)'
              }`,
              color: i <= step ? 'var(--accent)' : 'var(--text-3)',
              boxShadow: i === step ? '0 0 8px var(--accent-glow)' : 'none',
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
                background: i < step ? 'var(--accent)' : 'var(--border)',
              }} />
            )}
          </div>
        ))}
      </div>

      <div style={{ flex: 1 }}>
        {step === 0 && (
          <StepPhoto
            photoPreview={photoPreview}
            onFileChange={handleFileChange}
            onSkip={() => setStep(1)}
          />
        )}
        {step === 1 && (
          <StepAnimal
            selectedAnimalId={animalId}
            onSelect={(id) => { setAnimalId(id); setStep(2) }}
          />
        )}
        {step === 2 && (
          <StepDetails
            animalId={animalId}
            hasPhoto={!!photoFile}
            onSave={handleSave}
            saving={saving}
          />
        )}
      </div>

      {step < 2 && (
        <div style={{ display: 'flex', gap: 12 }}>
          {step > 0 && (
            <button
              onClick={() => setStep(s => s - 1)}
              style={{
                flex: 1,
                padding: '14px',
                borderRadius: 'var(--r-md)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-strong)',
                color: 'var(--text-2)',
                fontWeight: 500,
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              Voltar
            </button>
          )}
          <button
            onClick={() => setStep(s => s + 1)}
            disabled={step === 0 ? false : !animalId}
            style={{
              flex: 1,
              padding: '14px',
              borderRadius: 'var(--r-md)',
              background: 'var(--accent)',
              border: 'none',
              color: '#060D07',
              fontWeight: 600,
              fontSize: 14,
              cursor: (step === 1 && !animalId) ? 'not-allowed' : 'pointer',
              opacity: (step === 1 && !animalId) ? 0.5 : 1,
            }}
          >
            {step === 0 ? 'Pular' : 'Próximo'}
          </button>
        </div>
      )}
    </div>
  )
}

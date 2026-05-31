const variants = {
  primary: {
    background: 'var(--accent)',
    color: '#060D07',
    fontWeight: 600,
    boxShadow: '0 0 16px var(--accent-glow)',
  },
  secondary: {
    background: 'var(--bg-card)',
    color: 'var(--text-2)',
    border: '1px solid var(--border-strong)',
    fontWeight: 500,
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-2)',
    fontWeight: 500,
  },
}

export default function Button({ children, onClick, disabled, fullWidth, variant = 'primary', leftIcon, style, ...props }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...variants[variant],
        width: fullWidth ? '100%' : undefined,
        padding: '14px 24px',
        borderRadius: 'var(--r-md)',
        fontSize: 15,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'opacity .15s',
        ...style,
      }}
      {...props}
    >
      {leftIcon && <span>{leftIcon}</span>}
      {children}
    </button>
  )
}

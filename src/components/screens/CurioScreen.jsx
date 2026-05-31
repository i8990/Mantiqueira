import Badge from '../ui/Badge'

const curios = [
  {
    emoji: '🐆',
    name: 'Onça-pintada',
    sci: 'Panthera onca',
    status: 'EN',
    text: 'Maior felino das Américas, a onça-pintada é um predador de topo essencial para o equilíbrio ecológico. Na Mantiqueira, habita grotões e matas densas. Seu nome vem do tupi "îagûara".',
    tags: ['🥩 Carnívoro de topo', '🌳 Floresta densa', '🌙 Noturno'],
  },
  {
    emoji: '🦝',
    name: 'Quati',
    sci: 'Nasua nasua',
    status: 'LC',
    text: 'Mamífero social que vive em bandos de até 20 indivíduos. Usa o focinho longo para forragear no chão da mata. É comum em toda a região da Serra da Mantiqueira.',
    tags: ['👨‍👩‍👧‍👧 Grupos grandes', '🌳 Onívoro', '☀️ Diurno'],
  },
  {
    emoji: '🐒',
    name: 'Sagui-da-serra-escuro',
    sci: 'Callithrix aurita',
    status: 'VU',
    text: 'Pequeno primata endêmico da Mata Atlântica. Alimenta-se de frutos, insetos e goma de árvores. A destruição de seu habitat é a principal ameaça.',
    tags: ['🌳 Endêmico', '🍉 Frugívoro', '☀️ Diurno'],
  },
  {
    emoji: '🐺',
    name: 'Lobo-guará',
    sci: 'Chrysocyon brachyurus',
    status: 'VU',
    text: 'Com suas pernas longas e pelagem avermelhada, o lobo-guará é um dos canídeos mais elegantes do Brasil. Alimenta-se de frutos (especialmente a lobeira) e pequenos animais.',
    tags: ['🌅 Crepuscular', '🍎 Onívoro', '🏞️ Campos'],
  },
  {
    emoji: '🦦',
    name: 'Lontra',
    sci: 'Lontra longicaudis',
    status: 'NT',
    text: 'Hábil nadadora, a lontra é encontrada em rios e córregos limpos. Sua presença é um indicador de qualidade ambiental dos corpos d\'água.',
    tags: ['🌊 Aquática', '🐟 Piscívora', '🌙 Noturna'],
  },
  {
    emoji: '🐸',
    name: 'Perereca-ferreiro',
    sci: 'Boana faber',
    status: 'LC',
    text: 'Conhecida pelo canto metálico que lembra batidas de ferreiro. Constrói piscinas temporárias em barro para proteger seus girinos.',
    tags: ['🎵 Canto metálico', '🏗️ Construtora', '🌧️ Chuvas'],
  },
  {
    emoji: '🦜',
    name: 'Papagaio-de-peito-roxo',
    sci: 'Amazona vinacea',
    status: 'CR',
    text: 'Criticamente ameaçado, este papagaio depende das florestas com araucárias. A perda de habitat e o tráfico reduziram drasticamente sua população.',
    tags: ['🪹 Faz ninho em ocos', '🌲 Araucárias', '⚠️ Criticamente ameaçado'],
  },
  {
    emoji: '🐍',
    name: 'Jararaca',
    sci: 'Bothrops jararaca',
    status: 'LC',
    text: 'Serpente peçonhenta mais comum da Mantiqueira. Responsável pela maioria dos acidentes ofídicos no Sudeste. Alimenta-se de roedores e é mais ativa em dias quentes.',
    tags: ['☀️ Dias quentes', '🐭 Controla roedores', '⚠️ Peçonhenta'],
  },
]

export default function CurioScreen() {
  return (
    <div style={{
      padding: '20px 16px',
      height: '100%',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
    }}>
      <div>
        <h2 style={{
          fontFamily: 'var(--font-d)',
          fontWeight: 700,
          fontSize: 24,
          color: 'var(--text-1)',
        }}>
          Curiosidades
        </h2>
        <p style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 2 }}>
          Fauna da Serra da Mantiqueira
        </p>
      </div>

      <div style={{
        padding: 16,
        background: 'var(--accent-dim)',
        borderRadius: 'var(--r-lg)',
        border: '1px solid var(--accent)',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 8,
        }}>
          <span style={{ fontSize: 20 }}>🌿</span>
          <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--accent)' }}>
            Dica do guardião
          </span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5 }}>
          Mantenha distância segura dos animais, mova-se devagar e evite barulhos.
          O melhor horário para observação é no amanhecer ou entardecer.
          Nunca alimente a fauna silvestre!
        </p>
      </div>

      {curios.map(curio => (
        <div
          key={curio.name}
          style={{
            padding: 16,
            background: 'var(--bg-card)',
            borderRadius: 'var(--r-lg)',
            border: '0.5px solid var(--border)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <span style={{ fontSize: 32 }}>{curio.emoji}</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-1)' }}>
                {curio.name}
              </div>
              <div style={{ fontStyle: 'italic', fontSize: 12, color: 'var(--text-3)' }}>
                {curio.sci}
              </div>
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <Badge label={curio.status} type={
                curio.status === 'CR' ? 'coral' :
                curio.status === 'EN' ? 'coral' :
                curio.status === 'VU' ? 'amber' :
                curio.status === 'NT' ? 'accent' : 'muted'
              } />
            </div>
          </div>
          <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6, marginBottom: 10 }}>
            {curio.text}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {curio.tags.map(tag => (
              <span
                key={tag}
                style={{
                  fontSize: 11,
                  padding: '3px 10px',
                  borderRadius: 999,
                  background: 'var(--bg-card2)',
                  color: 'var(--text-3)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}

      <div style={{ height: 20 }} />
    </div>
  )
}

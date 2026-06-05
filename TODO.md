# TODO

## Ajuste de safe-area-inset-bottom

- **Problema:** `env(safe-area-inset-bottom)` está sendo aplicado no `paddingBottom` da TabBar, criando um espaço vazio abaixo dela e impedindo a sensação de fullscreen.
- **Solução:**
  1. `TabBar.jsx` → `paddingBottom: 8` (remover `safe-area-inset-bottom`)
  2. `AppShell.jsx` → `paddingBottom: 'calc(var(--tab-bar-height) + env(safe-area-inset-bottom, 0px))'` (aplicar o safe area na área de conteúdo, não na navbar)
  3. Os screens (GuideScreen, RegisterScreen, ProfileScreen) herdam esse padding do AppShell — manter `paddingBottom: 120px` ou ajustar para `calc(var(--tab-bar-height) + 20px)` para consistência.

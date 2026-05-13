# WAT Macros — Tracking V-Shape 12 Semanas

App web pessoal pra acompanhar macros e calorias diárias, integrado ao protocolo V-Shape 12 semanas.

## ✨ Funcionalidades

- **Dashboard de hoje** com 4 barras de progresso (kcal, proteína, carbo, gordura) vs meta diária
- **Atalhos rápidos** (favoritos): 1 clique loga os alimentos que você come todo dia (ovo, arroz, frango, whey, banana, leite)
- **Base de 80+ alimentos brasileiros** (tabela TACO/UNICAMP + comuns)
- **Alimentos custom**: adicione qualquer alimento que não está na base, com macros da embalagem
- **Calendário mensal** colorido: verde (bateu), amarelo (parcial), vermelho (abaixo de 80%), cinza (sem dados)
- **Gráfico semanal** dos últimos 7 dias com % da meta para cada macro
- **Dica do dia** gerada pela Claude API (1x/dia): analisa seu dia e te sugere ajustes pro próximo
- **Backup/Restore JSON**: nunca perde dados, exporta a qualquer momento
- **PWA**: instala como app no celular (ícone na tela inicial, tela cheia, funciona offline)
- **100% local**: todos os dados ficam no SEU navegador (localStorage). Nada vai pra servidor (exceto a chamada Claude quando você pede dica).

## 🚀 Como usar

### Modo 1 — Abrir local (mais simples)
1. Abra o arquivo `index.html` diretamente no navegador (clique duas vezes)
2. Funciona, mas o **PWA e Service Worker NÃO funcionam** com `file://` — você não consegue instalar como app

### Modo 2 — Hospedar grátis (recomendado pra usar no celular)

**Opção A — Netlify Drop (mais fácil, 30 segundos):**
1. Acesse https://app.netlify.com/drop
2. Arraste a pasta `app_macros` inteira pra área de upload
3. Netlify te dá uma URL tipo `https://random-name-123.netlify.app`
4. Abre essa URL no celular, instala como PWA

**Opção B — GitHub Pages:**
1. Cria repositório no GitHub
2. Sobe os arquivos
3. Settings → Pages → Source: branch main, folder /root
4. URL fica `https://seu-usuario.github.io/nome-repo`

**Opção C — Localmente com servidor:**
```bash
# Python (já instalado no seu PC)
cd c:\Claude\app_macros
python -m http.server 8000
# Abre http://localhost:8000 no navegador
```

## 📱 Instalar como app no celular

1. Abre a URL (Netlify ou outra) no Chrome do Android **ou** Safari do iPhone
2. **Android Chrome**: menu (3 pontos) → "Adicionar à tela inicial" → "Instalar"
3. **iPhone Safari**: botão de compartilhar → "Adicionar à Tela de Início"
4. O ícone "V" verde aparece na tela inicial
5. Abre como app, sem barra de navegador, em tela cheia

## 🔑 Configurar a API Key da Claude

Pra usar a feature de "Dica do dia":

1. Acesse https://console.anthropic.com
2. Cria conta (gratuito) e adiciona crédito (mínimo US$5)
3. Vai em **API Keys** → **Create Key**
4. Copia a key (começa com `sk-ant-...`)
5. No app: ícone de engrenagem (canto superior direito) → "Claude API key" → cola → Salvar

**Custo estimado**: ~R$0,05-0,10 por dica gerada. Se gerar 1 dica/dia, gasta ~R$2-3/mês.

A API key fica salva **apenas no localStorage do SEU navegador**. Não vai pra servidor algum.

## 💾 Backup dos dados

**IMPORTANTE**: localStorage pode ser apagado se você limpar cache do navegador. **Faça backup regularmente.**

- Configurações → "Exportar JSON" baixa um arquivo `wat_macros_backup_AAAA-MM-DD.json`
- Configurações → "Importar JSON" restaura de um backup

Recomendação: exporta a cada 2 semanas (no dia do check-in do protocolo).

## 📊 Como o cálculo funciona

**Macros locais (sem IA):**
- Você digita "100g arroz cozido" → app consulta a base TACO → mostra macros instantaneamente
- Para alimentos não listados, use "Alimento custom" e informe macros por 100g (geralmente está na embalagem)

**Classificação de dias no calendário:**
- 🟢 Verde: kcal e proteína entre 90% e 110% da meta
- 🟡 Amarelo: parcial (uma das duas dentro da margem, outra fora)
- 🔴 Vermelho: kcal OU proteína abaixo de 80% da meta
- ⚪ Cinza: sem dados (não logou nada)

## 🛠️ Customizar pro seu uso

Tudo no app é editável pelas configurações:
- **Metas**: trocar 2400/145/320/60 pra outros valores se mudou de fase
- **Favoritos**: adicionar/remover atalhos rápidos
- **API key**: trocar quando quiser

Pra adicionar alimentos novos permanentes na base TACO, edita o arquivo `taco-foods.js` (segue o formato dos existentes).

## 🧪 Checklist de teste (faz na primeira vez)

- [ ] Abrir `index.html`, ver dashboard com 0/2400 kcal
- [ ] Clicar em "+ 1 ovo cozido" (favorito) → ver kcal aumentar pra ~75
- [ ] Clicar no botão flutuante "+" → buscar "arroz" → escolher arroz cozido → quantidade 150g → confirmar
- [ ] Ver lista de hoje com os 2 itens
- [ ] Remover o ovo (botão X no item)
- [ ] Trocar pra aba "Calendário" → ver hoje com a borda verde
- [ ] Trocar pra aba "Gráfico" → ver barras do dia
- [ ] Voltar pra "Hoje", ir em Configurações → editar metas → salvar
- [ ] Adicionar API key → clicar "Gerar dica do dia" → ver resposta da IA
- [ ] Exportar JSON → confirmar download do backup
- [ ] No celular: abrir URL, instalar como PWA, testar offline (desliga wifi e confirma que o cálculo de alimentos continua funcionando)

## ⚙️ Stack técnico

- **HTML + CSS + JavaScript puro** (sem React, Vue, frameworks)
- **localStorage** pra persistência
- **Service Worker** pra cache offline
- **Claude API** (Sonnet) pra geração de dicas
- **PWA** com manifest.json

Tudo num único arquivo + 3 arquivos suporte. Pode ser editado por iniciante com VS Code ou bloco de notas.

## 🆘 Problemas comuns

**"Erro ao gerar dica"**
- Confere se a API key está correta (começa com `sk-ant-`)
- Confere se tem crédito na conta Anthropic
- Testa em outro navegador (algum bloqueador pode estar interferindo)

**"Nada salva quando eu adiciono alimento"**
- Verifica se o navegador está em modo "Privado/Incógnito" (apaga localStorage ao fechar)
- Confere se cookies/localStorage estão habilitados

**"PWA não instala no iPhone"**
- iOS exige Safari (não funciona em Chrome no iPhone)
- A URL precisa ser HTTPS (Netlify dá HTTPS de graça)

**"Quero adicionar alimento que não está na base"**
- Botão "Alimento custom" no modal de adicionar
- Informa nome + macros por 100g (geralmente está na embalagem)

## 📄 Licença

Uso pessoal. Sem garantias. Os macros são estimativas — não substitui acompanhamento profissional.

---

Feito pra V-Shape. Vai com tudo. 💪

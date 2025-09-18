# Felicitômetro com Julia

Sistema de monitoramento de bem-estar dos colaboradores com assistente virtual inteligente chamado Julia.

## 📋 Descrição

O Felicitômetro com Julia é uma ferramenta que permite aos colaboradores registrarem seu humor diário e interagirem com a Julia, nossa assistente virtual empática. O sistema oferece suporte emocional, conselhos personalizados e encaminhamento para recursos humanos quando necessário.

## ✨ Funcionalidades

### 🎭 Seleção de Humor

- Interface intuitiva com 8 opções de humor
- Emojis visuais para facilitar a seleção
- Design responsivo e moderno

### 🤖 Chat com Julia

- Assistente virtual empático chamado Julia
- Respostas contextuais baseadas no humor
- Detecção de termos críticos
- Encaminhamento automático para RH quando necessário

### 🔒 Segurança

- Detecção de termos críticos que requerem atenção humana
- Recomendação automática de contato com RH/gestão
- Logs de interação para análise (opcional)

## 🚀 Tecnologias Utilizadas

- **Angular 15** - Framework frontend
- **TypeScript** - Linguagem de programação
- **CSS3** - Estilização moderna e responsiva
- **RxJS** - Programação reativa
- **HTTP Client** - Comunicação com API

## 📦 Instalação

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd julia-ai
```

2. Instale as dependências:

```bash
npm install
```

3. Execute o projeto:

```bash
npm start
```

4. Acesse no navegador:

```
http://localhost:4200
```

## 🏗️ Estrutura do Projeto

```
src/
├── app/
│   ├── app.component.html      # Template principal
│   ├── app.component.ts        # Lógica do componente
│   ├── app.component.css       # Estilos
│   └── ai-chat.service.ts      # Serviço de comunicação com IA
├── main.ts                     # Ponto de entrada
└── index.html                  # HTML base
```

## 🔧 Configuração da API

O projeto está configurado para se conectar com o back-end na porta 5000. A configuração está nos arquivos de ambiente:

- **Desenvolvimento**: `src/environments/environment.ts`
- **Produção**: `src/environments/environment.prod.ts`

### Endpoint da API

- **URL**: `http://localhost:5000/api/conversa`
- **Método**: POST
- **Payload**: `{ "mensagem": "string", "humor": "string" }`
- **Resposta**: `{ "mensagem": "string" }`

## 🎨 Interface

### Tela Principal

- Seleção de humor com botões interativos
- Opções para conversar com IA ou RH/gestão
- Design moderno com gradientes e animações

### Chat com IA

- Interface de chat limpa e intuitiva
- Indicador de digitação
- Timestamps das mensagens
- Botão de retorno à seleção de humor

## 🛡️ Segurança e Privacidade

### Detecção de Termos Críticos

O sistema monitora automaticamente mensagens que contenham termos relacionados a:

- Ideação suicida
- Violência
- Assédio
- Depressão
- Crises emocionais

### Encaminhamento Automático

Quando termos críticos são detectados, o sistema:

1. Interrompe a conversa com a IA
2. Recomenda contato imediato com RH/gestão
3. Fornece informações de contato oficial

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:

- Desktop
- Tablet
- Smartphone

## 🔄 Fluxo de Uso

1. **Seleção de Humor**: Colaborador escolhe como está se sentindo
2. **Início da Conversa**: Clica em "Conversar com a IA"
3. **Interação**: Troca mensagens com o assistente virtual
4. **Detecção**: Sistema monitora por termos críticos
5. **Encaminhamento**: Se necessário, recomenda contato com RH

## 🚧 Próximos Passos

- [ ] Integração com API real de IA
- [ ] Dashboard para RH/gestão
- [ ] Relatórios de bem-estar
- [ ] Notificações push
- [ ] Integração com sistemas de RH existentes

## 📄 Licença

Este projeto foi desenvolvido para o hackaton DB1 IA.

## 👥 Equipe

Desenvolvido pela equipe do hackaton DB1 IA.

---

**Importante**: Este é um MVP desenvolvido em 3 horas. Para uso em produção, são necessárias validações adicionais de segurança e integração com sistemas corporativos.

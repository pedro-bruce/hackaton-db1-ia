# Felicitômetro com IA

## 📌 Resumo do Projeto

Hoje já existe dentro da empresa o **Felicitômetro**, onde colaboradores registram como estão se sentindo e se desejam conversar com gestão ou RH. Nossa proposta é expandir a ferramenta com uma nova opção: **"Conversar com a IA"** — um assistente virtual empático que complementa a triagem humana.

---

## 🎯 Objetivo

Criar um assistente virtual dentro do Felicitômetro que:

* Interaja de forma empática com o colaborador.
* Dê conselhos ou sugestões leves conforme o humor registrado.
* Comemore conquistas e dê mensagens positivas.
* Em casos mais delicados, oriente o colaborador a procurar apoio humano (RH ou gestão).

---

## ⚙️ Implementação (visão geral)

O projeto será dividido nas seguintes responsabilidades:

* **Front-end (Pedro)**

  * Botão "Conversar com a IA" no Felicitômetro.
  * Interface simples de chat para interação do colaborador.

* **Back-end (Ângelo)**

  * API em **C# .NET** que recebe as mensagens do usuário.
  * Envia os dados (humor do dia + contexto básico do cadastro) para o modelo de IA.
  * Retorna a resposta formatada ao front.
  * Regras mínimas de segurança: detectar termos críticos e encaminhar recomendação de contato com RH.

* **Documentação e Segurança (Eduardo)**

  * Desenho da arquitetura da solução (fluxo front → API → modelo → resposta).
  * Identificação dos riscos de segurança (ex.: dados sensíveis, prompt injection, uso inadequado da IA).
  * Registro das medidas adotadas para mitigação (ex.: aviso de uso, anonimização, não guardar logs completos).

---

## 🚀 MVP (escopo mínimo viável)

Viável em curto tempo (estimativa rápida):

* Front-end com botão e tela simples de chat.
* API em .NET conectada à OpenAI (ou similar).
* Fluxo básico funcionando: usuário escolhe humor → inicia conversa com IA → recebe resposta.
* Mensagens da IA adaptadas conforme o humor (positivo = incentivo / negativo = apoio leve / crítico = recomendação de RH).
* Documentação inicial dos desafios e soluções de segurança.

---

## Estrutura do repositório (sugerida)

```
felicitometro-ia/
├─ frontend/            # app React ou componente embutido
├─ backend/             # API .NET (C#)
├─ docs/                # arquitetura, riscos, decisões
└─ README.md            # este arquivo
```

---

## Arquitetura (fluxo)

1. Usuário acessa Felicitômetro (front).
2. Usuário seleciona humor (positivo, neutro, negativo, crítico).
3. Usuário clica em **Conversar com a IA** e abre o chat.
4. Front envia mensagem e metadados (humor do dia, contexto básico) para a API .NET.
5. API sanitiza/anonimiza o payload, aplica regras de segurança (detectar termos críticos), e envia para o modelo de IA.
6. Modelo retorna resposta; API aplica pós-processamento (cotações de segurança, remoção de dados sensíveis) e retorna ao front.
7. Front exibe resposta ao colaborador; se risco crítico detectado, exibe CTA para RH/gestão.

---

## Regras mínimas de segurança e privacidade

1. **Aviso de uso**: Mostrar aviso antes da primeira interação explicando que a IA não substitui RH e que o chat pode ser registrado anonimamente para melhoria.
2. **Anonimização**: Enviar apenas o mínimo necessário (ex.: humor, faixa etária opcional, departamento genérico) — nunca enviar CPF, e-mail completo ou texto livre que contenha dados sensíveis sem remoção prévia.
3. **Detecção de termos críticos**: Palavras-chave (ex.: suicídio, violência, automutilação) acionam fluxo de alerta e recomendação imediata para RH/gestão, além de resposta padrão de emergência.
4. **Prompt injection mitigation**: Sanitizar inputs, remover sequências que tentem reconfigurar o sistema prompt (e.g., "ignore instruções acima").
5. **Logs**: Não guardar logs completos do diálogo em texto plano. Armazenar resumos anonimizados e indicadores (ex.: humor, tags de risco).
6. **Consentimento**: Registrar consentimento do colaborador antes de iniciar a conversa.
7. **Retenção**: Política clara de retenção (ex.: 30 dias para logs anonimizados) e possibilidade de exclusão.


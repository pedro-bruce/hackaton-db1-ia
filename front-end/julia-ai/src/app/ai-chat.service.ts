import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { environment } from '../environments/environment';

export interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface AIResponse {
  mensagem: string;
}

@Injectable({
  providedIn: 'root',
})
export class AiChatService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Envia mensagem para a API e recebe resposta da IA
   * @param message Mensagem do usuário
   * @param mood Humor selecionado pelo usuário
   * @param context Contexto adicional (opcional)
   */
  sendMessage(
    message: string,
    mood: string,
    context?: any
  ): Observable<AIResponse> {
    const payload = {
      message: message,
      mood: mood,
      context: context || {},
      timestamp: new Date().toISOString(),
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // Chama a API real do back-end
    return this.http.post<AIResponse>(this.apiUrl, payload, { headers }).pipe(
      catchError((error) => {
        console.error('Erro na comunicação com a API:', error);
        // Em caso de erro, retorna resposta simulada como fallback
        return this.getSimulatedResponse(message, mood);
      })
    );
  }

  /**
   * Verifica se a mensagem contém termos críticos que requerem escalação
   * @param message Mensagem do usuário
   */
  checkCriticalTerms(message: string): boolean {
    const criticalTerms = [
      'suicídio',
      'suicidar',
      'morrer',
      'matar',
      'violência',
      'agressão',
      'assédio',
      'bullying',
      'depressão',
      'crise',
      'emergência',
      'urgente',
      'desesperado',
      'sem esperança',
      'acabar com tudo',
      'não aguento mais',
      'quero sumir',
      'não vale a pena',
      'fim da linha',
    ];

    const lowerMessage = message.toLowerCase();
    return criticalTerms.some((term) => lowerMessage.includes(term));
  }

  /**
   * Gera resposta inicial baseada no humor selecionado
   * @param mood Humor selecionado
   */
  getInitialMessage(mood: string): string {
    const moodMessages: { [key: string]: string } = {
      'muito-feliz':
        'Que ótimo saber que você está muito feliz hoje! 😄 Conte-me mais sobre o que está te deixando assim!',
      feliz:
        'Fico feliz em saber que você está bem! 😊 O que está contribuindo para esse bom humor?',
      neutro:
        'Entendo que você está se sentindo neutro hoje. Como posso te ajudar a melhorar seu dia?',
      triste:
        'Sinto muito saber que você está triste. Estou aqui para te ouvir e ajudar. O que está te incomodando?',
      'muito-triste':
        'Vejo que você está passando por um momento difícil. Estou aqui para te apoiar. Quer conversar sobre o que está acontecendo?',
    };

    return moodMessages[mood] || 'Olá! Sou a Julia, como posso te ajudar hoje?';
  }

  /**
   * Resposta simulada para desenvolvimento (remove quando conectar com API real)
   */
  private getSimulatedResponse(
    message: string,
    mood: string
  ): Observable<AIResponse> {
    // Verifica termos críticos
    if (this.checkCriticalTerms(message)) {
      return of({
        mensagem:
          'Entendo que você está passando por um momento muito difícil. Recomendo fortemente que você converse com o RH ou gestão imediatamente. Eles estão preparados para te ajudar e oferecer o suporte necessário. Você pode entrar em contato através do canal oficial da empresa.',
      });
    }

    // Respostas baseadas no humor e conteúdo da mensagem
    const responses = this.getContextualResponses(message, mood);
    const randomResponse =
      responses[Math.floor(Math.random() * responses.length)];

    return of({
      mensagem: randomResponse,
    });
  }

  /**
   * Gera respostas contextuais baseadas no humor e mensagem
   */
  private getContextualResponses(message: string, mood: string): string[] {
    const lowerMessage = message.toLowerCase();

    // Respostas para humor positivo
    if (['muito-feliz', 'feliz'].includes(mood)) {
      if (
        lowerMessage.includes('trabalho') ||
        lowerMessage.includes('projeto')
      ) {
        return [
          'Que ótimo saber que o trabalho está te deixando feliz! 🎉',
          'Fico muito feliz em saber que você está gostando do que faz!',
          'Isso é fantástico! Continue assim com essa energia positiva!',
          'Adoro saber que você está se sentindo realizado no trabalho!',
        ];
      }

      return [
        'Que maravilha! Fico muito feliz em saber disso! 🎉',
        'Isso é fantástico! Continue assim!',
        'Que bom ouvir isso! Você merece toda essa felicidade!',
        'Adoro saber que você está se sentindo bem!',
        'Parabéns! É sempre bom celebrar os momentos positivos!',
        'Que alegria saber que você está bem! Estou aqui para compartilhar essa felicidade com você!',
      ];
    }

    // Respostas para humor negativo
    if (['triste', 'muito-triste'].includes(mood)) {
      if (
        lowerMessage.includes('trabalho') ||
        lowerMessage.includes('chefe') ||
        lowerMessage.includes('colega')
      ) {
        return [
          'Entendo que o ambiente de trabalho está te afetando. Que tal conversarmos sobre isso?',
          'Situações no trabalho podem ser desafiadoras. Estou aqui para te ouvir.',
          'É normal se sentir assim em relação ao trabalho. O que especificamente está te incomodando?',
          'Vamos tentar encontrar uma forma de lidar com essa situação no trabalho.',
        ];
      }

      if (
        lowerMessage.includes('pessoal') ||
        lowerMessage.includes('família') ||
        lowerMessage.includes('relacionamento')
      ) {
        return [
          'Entendo que questões pessoais estão te afetando. Lembre-se de que não está sozinho.',
          'É normal ter dificuldades na vida pessoal. Quer conversar sobre isso?',
          'Situações pessoais podem ser muito desafiadoras. Estou aqui para te apoiar.',
          'Que tal tentarmos encontrar uma forma de lidar com essa situação?',
        ];
      }

      return [
        'Entendo como você se sente. Lembre-se de que não está sozinho, estou aqui com você.',
        'É normal ter dias difíceis. O importante é não desistir.',
        'Que tal tentarmos algumas técnicas de relaxamento? Posso te ajudar com isso.',
        'Você já considerou conversar com alguém próximo sobre isso?',
        'Lembre-se de que isso também vai passar. Você é mais forte do que imagina.',
        'Que tal fazermos uma pausa e respirarmos fundo juntos?',
        'Estou aqui para te apoiar. Vamos passar por isso juntos.',
      ];
    }

    // Respostas para humor neutro
    return [
      'Entendo. Às vezes é bom ter um dia tranquilo.',
      'Como posso te ajudar a tornar seu dia melhor?',
      'Que tal conversarmos sobre algo que te interessa?',
      'Estou aqui para te ouvir, o que você gostaria de falar?',
      'Às vezes é bom refletir sobre o dia. Como tem sido?',
      'Sou a Julia e estou aqui para te acompanhar. O que você gostaria de conversar?',
    ];
  }

  /**
   * Registra interação para análise (opcional)
   * @param interaction Dados da interação
   */
  logInteraction(interaction: any): void {
    // Em produção, implementar logging para análise
    console.log('Interaction logged:', interaction);
  }
}

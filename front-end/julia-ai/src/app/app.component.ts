import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewChecked,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AiChatService, AIResponse } from './ai-chat.service';

interface Mood {
  value: string;
  label: string;
  emoji: string;
}

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
})
export class AppComponent implements AfterViewChecked {
  @ViewChild('chatMessages') chatMessages!: ElementRef;

  title = 'Felicitômetro com Julia';

  constructor(private aiChatService: AiChatService) {}

  // Mood selection
  selectedMood: string = '';
  isInChat: boolean = false;

  // Chat
  messages: Message[] = [];
  currentMessage: string = '';
  isLoading: boolean = false;

  // Available moods
  moods: Mood[] = [
    { value: 'muito-feliz', label: 'Muito Feliz', emoji: '😄' },
    { value: 'feliz', label: 'Feliz', emoji: '😊' },
    { value: 'neutro', label: 'Neutro', emoji: '😐' },
    { value: 'triste', label: 'Triste', emoji: '😢' },
    { value: 'muito-triste', label: 'Muito Triste', emoji: '😭' },
  ];

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  selectMood(mood: string) {
    this.selectedMood = mood;
  }

  startChat() {
    this.isInChat = true;
    this.messages = [];

    // Add initial AI message based on mood
    const initialMessage = this.aiChatService.getInitialMessage(
      this.selectedMood
    );

    this.messages.push({
      text: initialMessage,
      isUser: false,
      timestamp: new Date(),
    });
  }

  backToMoodSelection() {
    this.isInChat = false;
    this.messages = [];
    this.currentMessage = '';
  }

  async sendMessage() {
    if (!this.currentMessage.trim() || this.isLoading) return;

    const userMessage = this.currentMessage.trim();
    this.currentMessage = '';

    // Add user message
    this.messages.push({
      text: userMessage,
      isUser: true,
      timestamp: new Date(),
    });

    // Get AI response
    this.isLoading = true;

    try {
      const aiResponse = await this.aiChatService
        .sendMessage(userMessage, this.selectedMood)
        .toPromise();
      this.messages.push({
        text:
          aiResponse?.mensagem ||
          'Desculpe, não consegui processar sua mensagem.',
        isUser: false,
        timestamp: new Date(),
      });
    } catch (error) {
      this.messages.push({
        text: 'Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente ou entre em contato com o RH.',
        isUser: false,
        timestamp: new Date(),
      });
    } finally {
      this.isLoading = false;
    }
  }

  talkToManager() {
    alert('Redirecionando para o canal de comunicação com Gestão/RH...');
  }

  private scrollToBottom(): void {
    if (this.chatMessages) {
      this.chatMessages.nativeElement.scrollTop =
        this.chatMessages.nativeElement.scrollHeight;
    }
  }
}

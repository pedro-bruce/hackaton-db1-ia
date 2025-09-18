using System.Text;
using julia_ia.Models;
using julia_ia.Services.Interfaces;

namespace julia_ia.Services;

public class ConversaService : IConversaService
{
    private readonly IOpenAIService _openAIService;
    private readonly ILogger<ConversaService> _logger;
    private readonly IConfiguration _configuration;

    private readonly string[] _termosCriticos = { "assédio", "depressão", "demissão", "suicídio" };
    private const string RESPOSTA_PADRAO_RH = "Entendo sua preocupação. É importante que você procure o departamento de Recursos Humanos imediatamente para discutir essa situação. Eles estão preparados para oferecer o suporte adequado e confidencial que você precisa neste momento.";

    public ConversaService(IOpenAIService openAIService, ILogger<ConversaService> logger, IConfiguration configuration)
    {
        _openAIService = openAIService;
        _logger = logger;
        _configuration = configuration;
    }

    public async Task<ConversaResponse> ProcessarConversaAsync(ConversaRequest request)
    {
        try
        {
            _logger.LogInformation("Processando conversa para usuário com humor: {Humor}", request.Humor);

            if (ContemTermosCriticos(request.Mensagem))
            {
                _logger.LogWarning("Mensagem contém termos críticos, retornando resposta padrão para RH");
                return new ConversaResponse
                {
                    Mensagem = RESPOSTA_PADRAO_RH
                };
            }

            var contextoCompleto = ConstruirContextoCompleto(request);

            var openAIRequest = new OpenAIRequest
            {
                Messages = new List<OpenAIMessage>
                {
                    new OpenAIMessage
                    {
                        Role = "system",
                        Content = "Você é Julia, uma assistente virtual amigável e empática. Responda de forma acolhedora e profissional, considerando o humor e contexto do usuário."
                    },
                    new OpenAIMessage
                    {
                        Role = "user",
                        Content = contextoCompleto
                    }
                }
            };

            var openAIResponse = await _openAIService.EnviarRequisicaoAsync(openAIRequest);
            var respostaIA = openAIResponse.Choices.FirstOrDefault()?.Message.Content ?? "Desculpe, não consegui processar sua mensagem no momento.";

            _logger.LogInformation("Conversa processada com sucesso");

            return new ConversaResponse
            {
                Mensagem = respostaIA
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Erro ao processar conversa");
            return new ConversaResponse
            {
                Mensagem = "Desculpe, ocorreu um erro interno. Tente novamente em alguns instantes."
            };
        }
    }

    private bool ContemTermosCriticos(string mensagem)
    {
        if (string.IsNullOrWhiteSpace(mensagem))
            return false;

        var mensagemLower = mensagem.ToLowerInvariant();
        return _termosCriticos.Any(termo => mensagemLower.Contains(termo.ToLowerInvariant()));
    }

    private string ConstruirContextoCompleto(ConversaRequest request)
    {
        var contexto = new StringBuilder();
        
        contexto.AppendLine($"Humor: {request.Humor}");
        contexto.AppendLine($"Mensagem: {request.Mensagem}");

        return contexto.ToString();
    }
}

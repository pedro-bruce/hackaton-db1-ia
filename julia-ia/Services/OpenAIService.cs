using System.Text;
using System.Text.Json;
using julia_ia.Models;
using julia_ia.Services.Interfaces;

namespace julia_ia.Services;

public class OpenAIService : IOpenAIService
{
    private readonly HttpClient _httpClient;
    private readonly ILogger<OpenAIService> _logger;
    private readonly IConfiguration _configuration;

    public OpenAIService(HttpClient httpClient, ILogger<OpenAIService> logger, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _logger = logger;
        _configuration = configuration;
    }

    public async Task<OpenAIResponse> EnviarRequisicaoAsync(OpenAIRequest request)
    {
        try
        {
            _logger.LogInformation("Enviando requisição para a API da OpenAI");

            var jsonContent = JsonSerializer.Serialize(request, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            });

            var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");
            _httpClient.DefaultRequestHeaders.Authorization =
                new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", "YOUR_API_KEY_HERE");
            var response = await _httpClient.PostAsync("https://api.openai.com/v1/chat/completions", content);

            if (!response.IsSuccessStatusCode)
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                _logger.LogError("Erro na API da OpenAI: {StatusCode} - {Content}", response.StatusCode, errorContent);
                throw new HttpRequestException($"Erro na API da OpenAI: {response.StatusCode}");
            }

            var responseContent = await response.Content.ReadAsStringAsync();
            var openAIResponse = JsonSerializer.Deserialize<OpenAIResponse>(responseContent, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            });

            _logger.LogInformation("Resposta recebida da API da OpenAI com sucesso");
            return openAIResponse ?? new OpenAIResponse();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Erro ao enviar requisição para a API da OpenAI");
            throw;
        }
    }
}

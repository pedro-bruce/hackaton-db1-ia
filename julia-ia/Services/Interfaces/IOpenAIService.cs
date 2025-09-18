using julia_ia.Models;

namespace julia_ia.Services.Interfaces;

public interface IOpenAIService
{
    Task<OpenAIResponse> EnviarRequisicaoAsync(OpenAIRequest request);
}

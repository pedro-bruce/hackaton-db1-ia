using julia_ia.Models;

namespace julia_ia.Services.Interfaces;

public interface IConversaService
{
    Task<ConversaResponse> ProcessarConversaAsync(ConversaRequest request);
}

using Microsoft.AspNetCore.Mvc;
using julia_ia.Models;
using julia_ia.Services.Interfaces;

namespace julia_ia.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ConversaController : ControllerBase
{
    private readonly IConversaService _conversaService;
    private readonly ILogger<ConversaController> _logger;

    public ConversaController(IConversaService conversaService, ILogger<ConversaController> logger)
    {
        _conversaService = conversaService;
        _logger = logger;
    }

    [HttpPost]
    [ProducesResponseType(typeof(ConversaResponse), 200)]
    [ProducesResponseType(typeof(ValidationProblemDetails), 400)]
    [ProducesResponseType(typeof(ConversaResponse), 500)]
    public async Task<ActionResult<ConversaResponse>> ProcessarConversa([FromBody] ConversaRequest request)
    {
        try
        {
            _logger.LogInformation("Recebida requisição de conversa");

            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Requisição inválida: {Errors}", ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage));
                return BadRequest(ModelState);
            }

            var response = await _conversaService.ProcessarConversaAsync(request);

            _logger.LogInformation("Conversa processada com sucesso");

            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Erro inesperado no processamento da conversa");
            
            return StatusCode(500, new ConversaResponse
            {
                Mensagem = "Ocorreu um erro interno. Tente novamente em alguns instantes."
            });
        }
    }

    [HttpGet("health")]
    [ProducesResponseType(typeof(object), 200)]
    public IActionResult HealthCheck()
    {
        return Ok(new { 
            Status = "Healthy", 
            Timestamp = DateTime.UtcNow,
            Message = "API Julia IA está funcionando corretamente"
        });
    }
}

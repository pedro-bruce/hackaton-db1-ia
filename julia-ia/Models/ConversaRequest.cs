using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace julia_ia.Models;

public enum Humor
{
    MuitoFeliz,
    Feliz,
    Neutro,
    Triste,
    MuitoTriste
}

public class ConversaRequest
{
    [Required(ErrorMessage = "O humor é obrigatório")]
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public Humor Humor { get; set; }

    [Required(ErrorMessage = "A mensagem é obrigatória")]
    [StringLength(1000, ErrorMessage = "A mensagem deve ter no máximo 1000 caracteres")]
    public string Mensagem { get; set; } = string.Empty;
}

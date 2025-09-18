namespace julia_ia.Models;

public class OpenAIRequest
{
    public string Model { get; set; } = "gpt-4o-mini";
    public List<OpenAIMessage> Messages { get; set; } = new();
    public int MaxTokens { get; set; } = 1000;
    public double Temperature { get; set; } = 0.7;
}

public class OpenAIMessage
{
    public string Role { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
}

public class OpenAIResponse
{
    public List<OpenAIChoice> Choices { get; set; } = new();
}

public class OpenAIChoice
{
    public OpenAIMessage Message { get; set; } = new();
}

using julia_ia.Services;
using julia_ia.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddHttpClient<IOpenAIService, OpenAIService>((serviceProvider, client) =>
{
    var configuration = serviceProvider.GetRequiredService<IConfiguration>();
    var apiKey = configuration["OpenAI:ApiKey"];
    client.DefaultRequestHeaders.Clear();
    client.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");
});

builder.Services.AddScoped<IOpenAIService, OpenAIService>();
builder.Services.AddScoped<IConversaService, ConversaService>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(); // Adiciona o middleware de CORS

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();

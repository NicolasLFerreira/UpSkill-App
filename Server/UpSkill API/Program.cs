using UpSkill_API.Contexts;

var builder = WebApplication.CreateBuilder(args);

// Cors configuration
string corsPolicy = "Policy1";
builder.Services.AddCors(config =>
{
    config.AddPolicy(corsPolicy,
        policy =>
        {
            policy.WithOrigins("http://localhost:3000");
            policy.AllowAnyHeader();
            policy.AllowAnyMethod();
        });
});

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Adds database context
builder.Services.AddDbContext<StudentsContext>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();

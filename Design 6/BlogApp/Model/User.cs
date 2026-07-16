using System.ComponentModel;

namespace BlogApp.Model;

public class User
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    // public string? Pfp { get; set; }
    public string? Username { get; set; }
    public bool Enabled { get; set; } = true;
    public bool Email { get; set; } = true;

    public User(int id, string name, string username, bool enabled, bool email)
    {
        Id = id;
        Name = name; 
        Username = username;
        Enabled = enabled;
        Email = email;
    }

}
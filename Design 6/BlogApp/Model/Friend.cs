namespace BlogApp.Model;

public class Friend : User
{
    public string? Pfp { get; set; }
    public Friend (int id, string name, string username, string pfp) : base(id, name, username, true, true)
    {
        Pfp = pfp;
    }
}
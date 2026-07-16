using BlogApp.Model;

namespace BlogApp.Model;

public class Forum
{
    public int Id {get; set; }
    public required string Title { get; set; }
    public required string Content { get; set; }
    public MediaURL? MediaURL {get; set; }  
}
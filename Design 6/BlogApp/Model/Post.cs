namespace BlogApp.Model;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Data.Common;

public class Post
{
    public int Id {get; set;}

    [Required(ErrorMessage = "This field is required")]
    [StringLength(20, MinimumLength = 12)]
    public string? PostText { get; set; }
    public MediaURL? Media { get; set; }

    public MediaURL? ProfilePic { get; set; }
    public DateTime TimePublised { get; set; }

    public int AuthorId { get; set; }
    public string AuthorName { get; set; } = string.Empty;

    public bool isPublished {get; set; } = false;

    public List<string> Tags {get; set; } = new ();
    
}

public class MediaURL
{
    public string? _url { get; set; }

    public MediaURL(string url)
    {
        _url = url;
    }

    public string Url() => _url ?? string.Empty;
}
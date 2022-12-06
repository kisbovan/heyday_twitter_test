namespace backend.Models
{
    public class SearchModel
    {
        public string? SearchTerm { get; set; }

        public bool SearchImagesOnly { get; set; }

        public string? NextToken { get; set; }
    }
}

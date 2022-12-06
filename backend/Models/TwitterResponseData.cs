using Newtonsoft.Json;

namespace backend.Models
{
    public class TwitterResponseData
    {
        [JsonProperty("edit_history_tweet_ids")]
        public List<string>? EditHistoryTweetIds { get; set; }

        [JsonProperty("id")]
        public string? Id { get; set; }

        [JsonProperty("text")]
        public string? Text { get; set; }
    }
}

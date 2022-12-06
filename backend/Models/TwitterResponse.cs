using Newtonsoft.Json;

namespace backend.Models
{
    public class TwitterResponse
    {
        [JsonProperty("data")]
        public List<TwitterResponseData>? Data { get; set; }

        [JsonProperty("meta")]
        public TwitterResponseMeta? Meta { get; set; }
    }
}

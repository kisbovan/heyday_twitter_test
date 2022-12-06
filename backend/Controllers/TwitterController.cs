using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TwitterController : ControllerBase
    {
        [HttpPost("search")]
        public ServerResponse Search([FromBody] SearchModel Search)
        {
            try
            {
                TwitterResponse response = JsonConvert.DeserializeObject<TwitterResponse>(FetchResult(Search));

                return ConstructServerResponse(response);
            }
             catch
            {
                return new ServerResponse { Results = new List<string>(new string[] { "An error occured" }) };
            }
        }

        private ServerResponse ConstructServerResponse(TwitterResponse response)
        {
            List<string> Results = new List<string>();

            if (response.Data == null)
            {
                return new ServerResponse { Results = new List<string>(new string[] { "No match found" }) };
            }

            foreach (TwitterResponseData Trd in response.Data)
            {
                Results.Add(Trd.Text);
            }

            return new ServerResponse { Results = Results, NextToken = response.Meta.NextToken };
        }

        private string FetchResult(SearchModel Search)
        {
            string sURL = "https://api.twitter.com/2/tweets/search/recent?query=" + System.Web.HttpUtility.UrlEncode("\"" + Search.SearchTerm + "\"");
            // Fetch token from environment
            string BearerToken = "token_from_safe_place";

            if (Search.SearchImagesOnly)
            {
                sURL += "%20has%3Aimages";
            }

            if (Search.NextToken != null) 
            {
                sURL += "&next_token=" + Search.NextToken;
            }

            WebRequest wrGETURL = WebRequest.Create(sURL);
            wrGETURL.Headers.Add(
                "Authorization", 
                "Bearer " + BearerToken
            );
            Stream objStream = wrGETURL.GetResponse().GetResponseStream();
            StreamReader objReader = new StreamReader(objStream);
            string sLine = "";
            string received = "";
            int i = 0;

            while (sLine != null)
            {
                i++;
                sLine = objReader.ReadLine();
                if (sLine != null)
                    received += sLine;
            }

            return received;
        }
    }
}

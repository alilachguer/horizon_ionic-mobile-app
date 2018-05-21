using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;

namespace APIRSSReader.Models
{
    public class YandexTranslator
    {
        private string strUrl;
        string key;
        WebClient wc;

        public YandexTranslator()
        {
            strUrl = String.Format("https://translate.yandex.net/api/v1.5/tr.json/translate?key={0}&lang=fr-en", key);
            strUrl += "key=";
            strUrl += "&lang=fr-en";
            strUrl += "&text=";

            key = "trnsl.1.1.20180503T101109Z.694928645d383920.68498c0926394e473a3fc3bb29194916fe09b118";

            wc = new WebClient();
            wc.Encoding = Encoding.UTF8;
        }

        public string translate(string text)
        {
            var requestString =
                String.Format("https://translate.yandex.net/api/v1.5/tr.json/translate?key={0}&lang=fr-en&text={1}&format={2}"
                , key, text, "plain");

            var tradclient = new RestClient(requestString);
            var tradrequest = new RestRequest(Method.GET);
            tradrequest.AddHeader("content-type", "application/json");
            IRestResponse tradresponse = tradclient.Execute(tradrequest);
            string translated = "sport";

            try
            {
                JObject json = JObject.Parse(tradresponse.Content);
                //string texte = (string)json.GetValue("text")[0];
                //TranslateObject m = JsonConvert.DeserializeObject<TranslateObject>(tradresponse.Content);
                string texte = tradresponse.Content;

                if (texte != String.Empty)
                    translated = texte;
            }
            catch (Exception e)
            {
                throw e;
            }
            
            return translated;
        }

    }
}
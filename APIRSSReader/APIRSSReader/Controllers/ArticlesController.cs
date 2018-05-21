using APIRSSReader.Models;
using APIRSSReader.Models.Persistance;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace APIRSSReader.Controllers
{
    public class ArticlesController : ApiController
    {
        private static string CONNECTION_STRING = "server=localhost;database=horizon;uid=root";
        // GET: api/Articles
        public List<Article> Get()
        {
            DataBaseCommunication dataBaseCommunication = new DataBaseCommunication(CONNECTION_STRING);
            return dataBaseCommunication.GetArticles();
        }


        // POST: api/Articles
        public void Post([FromBody]Person person)
        {
            if (person.Login.Equals("CiPhantom") && person.Password.Equals("lksPMnze"))
            {

                OpmlHandler opmlHandler = new OpmlHandler("./rss.opml");
                Dictionary<string, string> urls = new Dictionary<string, string>();
                urls = opmlHandler.getListeJourneaux();

                List<Article> articles = new List<Article>();
                Feeder f = new Feeder(urls);
                articles = f.getArticles();

                DataBaseCommunication dataBaseCommunication = new DataBaseCommunication(CONNECTION_STRING);

                dataBaseCommunication.SaveArticles(articles);
            }
        }

        [Route("api/articles/postuser")]
        [HttpPost]
        public Boolean PostUser([FromBody] User user)
        {
            DataBaseCommunication dataBaseCommunication = new DataBaseCommunication(CONNECTION_STRING);
            return dataBaseCommunication.AddUser(user);
        }

        [Route("api/articles/checkuser")]
        [HttpPost]
        public Boolean CheckUser([FromBody] User user)
        {
            DataBaseCommunication dataBaseCommunication = new DataBaseCommunication(CONNECTION_STRING);
            return dataBaseCommunication.CheckUser(user);
        }

        [Route("api/articles/checkShare")]
        [HttpPost]
        public Boolean CheckShare([FromBody] ShareModel shareModel )
        {
            DataBaseCommunication dataBaseCommunication = new DataBaseCommunication(CONNECTION_STRING);
            return dataBaseCommunication.CheckShare(shareModel);
        }

        [Route("api/articles/checkLike")]
        [HttpPost]
        public Boolean CheckLike([FromBody] ShareModel shareModel)
        {
            DataBaseCommunication dataBaseCommunication = new DataBaseCommunication(CONNECTION_STRING);
            return dataBaseCommunication.CheckLike(shareModel);
        }

        [Route("api/articles/InsertShare")]
        [HttpPost]
        public Boolean InsertShare([FromBody] ShareModel shareModel)
        {
            DataBaseCommunication dataBaseCommunication = new DataBaseCommunication(CONNECTION_STRING);
            return dataBaseCommunication.InsertShare(shareModel);
        }

        [Route("api/articles/InsertLike")]
        [HttpPost]
        public Boolean InsertLike([FromBody] ShareModel shareModel)
        {
            DataBaseCommunication dataBaseCommunication = new DataBaseCommunication(CONNECTION_STRING);
            return dataBaseCommunication.InsertLike(shareModel);
        }

        [Route("api/articles/InsertShareBadge")]
        [HttpPost]
        public Boolean InsertShareBadge([FromBody] ShareModel shareModel)
        {
            DataBaseCommunication dataBaseCommunication = new DataBaseCommunication(CONNECTION_STRING);
            return dataBaseCommunication.InsertShareBadge(shareModel);
        }

        [Route("api/articles/InsertLikeBadge")]
        [HttpPost]
        public Boolean InsertLikeBadge([FromBody] ShareModel shareModel)
        {
            DataBaseCommunication dataBaseCommunication = new DataBaseCommunication(CONNECTION_STRING);
            return dataBaseCommunication.InsertLikeBadge(shareModel);
        }

        [Route("api/articles/GetLikedArticlesByUser/{id}")]
        [HttpGet]
        public List<int> GetLikedArticlesByUser(int id)
        {
            DataBaseCommunication dataBaseCommunication = new DataBaseCommunication(CONNECTION_STRING);
            return dataBaseCommunication.GetLikedArticlesByUser(id);
        }


    }
}

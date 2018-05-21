using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel.Syndication;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace APIRSSReader.Models
{
    public class Feeder
    {
        private List<Article> articles = new List<Article>();

        public Feeder(Dictionary<string, string> strings)
        {
            foreach(KeyValuePair<string, string> Entry in strings)
            {
                XmlReaderSettings settings = new XmlReaderSettings();
                settings.DtdProcessing = DtdProcessing.Parse;
                settings.MaxCharactersFromEntities = 1024;
                XmlReader xmlReader = XmlReader.Create(Entry.Value, settings);
                SyndicationFeed feed = SyndicationFeed.Load(xmlReader);

                if (xmlReader == null)
                {
                    Console.WriteLine("Xml reader est null");
                }
                else
                {
                    foreach (SyndicationItem item in feed.Items)
                    {
                        Article article = new Article();

                        article.Titre = item.Title.Text;
                        article.Description = item.Summary.Text;
                        article.Source = Entry.Key;
                        try
                        {
                            article.Link = item.Links[0].Uri.ToString();
                            article.Image = item.Links[1].Uri.ToString();
                        }                    
                        catch
                        {
                            //You can add some treats ; 
                        }


                        this.articles.Add(article);
                    }
                }
                xmlReader.Close();
            }
        }

        public List<Article> getArticles()
        {
            return this.articles;
        }
    }
}

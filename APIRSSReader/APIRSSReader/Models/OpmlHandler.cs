using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Hosting;
using System.Xml;

namespace APIRSSReader.Models
{
    public class OpmlHandler
    {
        Dictionary<string, string> ListeJourneaux = new Dictionary<string, string>();

        public OpmlHandler(string Location)
        {
            string filePath = Path.Combine( HostingEnvironment.ApplicationPhysicalPath, Location);

            XmlDocument Document = new XmlDocument();
            Document.Load(filePath);

            foreach (XmlNode Children in Document.ChildNodes)
            {
                if (Children.Name.Equals("opml", StringComparison.CurrentCultureIgnoreCase))
                {
                    foreach (XmlNode Children2 in Children)
                    {
                        if (Children2.Name.Equals("body", StringComparison.CurrentCultureIgnoreCase))
                        {
                            foreach (XmlNode Children3 in Children2)
                            {
                                foreach (XmlNode Children4 in Children3)
                                {
                                    string url = String.Empty;
                                    string title = String.Empty;
                                    foreach (XmlAttribute attribute in Children4.Attributes)
                                    {
                                        if (attribute.Name.Equals("xmlurl", StringComparison.CurrentCultureIgnoreCase))
                                        {
                                            url = attribute.Value;
                                        }
                                        if (attribute.Name.Equals("title", StringComparison.CurrentCultureIgnoreCase))
                                        {
                                            title = attribute.Value;
                                        }
                                    }
                                    this.ListeJourneaux.Add(title, url);
                                }
                            }
                        }
                    }
                }
            }
        }

        public Dictionary<string, string> getListeJourneaux()
        {
            return this.ListeJourneaux;
        }

        override
        public string ToString()
        {
            Console.WriteLine("Nombre d'entée : " + this.ListeJourneaux.Count);
            string liste = String.Empty; 
            foreach(KeyValuePair<string, string> entry in ListeJourneaux)
            {
                liste += "\n Title    : " + entry.Key + "     URL    : " + entry.Value;
            }
            return liste;
        }
    }
}

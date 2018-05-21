using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIRSSReader.Models
{
    public class Article
    {
        public string Source { get; set; }
        public string Titre { get; set; }
        public string Link { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public int Score { get; set; }

        public Article()
        {
            Score = 0;
        }

        override
        public string ToString()
        {
            return "****" + Titre + "****\nContent : " + Description + "\nLink : " + Link + "\nImage : " + Image + "\nSource : " + Source+ "\n\n";
        }
    }
}

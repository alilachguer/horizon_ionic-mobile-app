using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace APIRSSReader.Models
{
    public class Category
    {
        public Output output { get; set; }

        public class Output
        {
            public int status { get; set; }
            public string result { get; set; }
        }
    }
}
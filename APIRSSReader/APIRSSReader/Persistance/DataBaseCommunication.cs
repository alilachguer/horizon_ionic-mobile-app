using MySql.Data.MySqlClient;
using APIRSSReader.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace APIRSSReader.Models
.Persistance
{
    public class DataBaseCommunication
    {
        public MySqlConnection connection;
        public string urlConnection = "";

        public DataBaseCommunication(string UrlConnection)
        {
            try
            {
                connection = new MySqlConnection(UrlConnection);
                connection.Open();
                this.urlConnection = UrlConnection;
                Console.WriteLine("Connection Succesded");
            }
            catch(MySqlException e)
            {
                Console.WriteLine("DataBase opening failed! Maybe bad url connection ?" + e.Message);
            }
        }

        public Boolean CheckUser(User user)
        {
            connection = new MySqlConnection(this.urlConnection);
            connection.Open();
            MySqlCommand cmd = this.connection.CreateCommand();
            cmd.CommandText = "SELECT * FROM utilisateur where id_user= "+user.Id+" and nom = '"
                +user.Nom.Replace("'","''")+"'";
            MySqlDataReader msdr = cmd.ExecuteReader();
            while (msdr.Read())
            {
                return true; 
            }
            return false; 
        }

        public Boolean AddUser(User user)
        {
            if (CheckUser(user))
            {
                return false;
            }
            else
            {
                connection = new MySqlConnection(this.urlConnection);
                connection.Open();
                MySqlCommand cmd = this.connection.CreateCommand();
                cmd.CommandText = "insert into utilisateur values ("+user.Id+",'"+user.Nom.Replace("'", "''")+"')";
                try
                {
                    cmd.ExecuteNonQuery();
                    return true; 
                }
                catch
                {
                    return false; 
                }
                
            }
        }

        public void SaveArticles(List<Article> articles)
        {
            connection = new MySqlConnection(this.urlConnection);
            connection.Open();
            MySqlCommand cmd = this.connection.CreateCommand();

            YandexTranslator translator = new YandexTranslator();
            DatumboxAPI DatumboxAPI = new DatumboxAPI("35e089c310ba09d172e9aee276877ba4");

            foreach (Article article in articles)
            {
                string texte = translator.translate(article.Description);
                Category category = JsonConvert.DeserializeObject<Category>(DatumboxAPI.TopicClassification(texte));
                int categorie = getTextCategory(category.output.result);

                string statement = String.Empty;
                if (article.Image == null)
                {
                    statement = "INSERT INTO article (source, titre, link, description, categorie) values ('"
                    + article.Source.Replace("'", "''") + "', '" + article.Titre.Replace("'", "''") + "', '"
                    + article.Link.Replace("'", "''") + "', '" + article.Description.Replace("'", "''") + "', "
                    + categorie + ")";
                }
                else
                {
                    statement = "INSERT INTO article (source, titre, link, description, image, categorie) values ('"
                   + article.Source.Replace("'", "''") + "', '" + article.Titre.Replace("'", "''") + "', '"
                   + article.Link.Replace("'", "''") + "', '" + article.Description.Replace("'", "''") + "', '"
                   + article.Image.Replace("'", "''") + "', "
                   + categorie + ")";
                }

                try
                {
                    cmd.CommandText = statement;
                    cmd.ExecuteNonQuery();
                    cmd.CommandText = String.Empty;
                }
                catch (MySqlException e)
                {
                    Console.WriteLine("Cette requête cause problème : " + statement
                        + " \n The exception say " + e.Message);
                }
            }
        }

        public int getTextCategory(string text)
        {
            switch (text)
            {
                case "Science":
                    return 9;
                case "Arts":
                    return 1;
                case "Business & Economy":
                    return 2;
                case "Computers & Technology":
                    return 3;
                case "Health":
                    return 4;
                case "Home & Domestic Life":
                    return 5;
                case "News":
                    return 8;
                case "Recreation & Activities":
                    return 6;
                case "Reference & Education":
                    return 7;
                case "Shopping":
                    return 10;
                case "Society":
                    return 11;
                case "Sports":
                    return 12;
                default:
                    return 8;
            }
        }


        public List<Article> GetArticles()
        {
            connection = new MySqlConnection(this.urlConnection);
            connection.Open();
            List<Article> articles = new List<Article>();
            MySqlCommand cmd = this.connection.CreateCommand();
            cmd.CommandText = "SELECT * FROM article";
            MySqlDataReader mySqlDataReader = cmd.ExecuteReader();

            while (mySqlDataReader.Read())
            {
                Article article = new Article();
                article.Source = mySqlDataReader.GetString(1);
                article.Titre = mySqlDataReader.GetString(2);
                article.Link = mySqlDataReader.GetString(3);
                article.Description = mySqlDataReader.GetString(4);
                try
                {
                    article.Image = mySqlDataReader.GetString(5);
                }
                catch
                {
                    //You can add some treats here
                }
                article.Score = mySqlDataReader.GetInt32(6);

                articles.Add(article);
            }


            return articles;
        }


        public int getIdArtcileByLink(string link)
        {
            connection = new MySqlConnection(this.urlConnection);
            connection.Open();
            string id_article = String.Empty;
            MySqlCommand cmd = this.connection.CreateCommand();
            cmd.CommandText = "SELECT id_article FROM article where link = \"" + link + "\" ;";
            MySqlDataReader mySqlDataReader = cmd.ExecuteReader();
            if (mySqlDataReader.Read())
            {
                id_article = mySqlDataReader.GetString(0);
                if (id_article != string.Empty)
                {
                    id_article = mySqlDataReader.GetString(0).ToString();
                }
            }
            int IdArticle = Int32.Parse(id_article);
            return IdArticle;
        }

        public Boolean CheckShare(ShareModel s)
        {
            connection = new MySqlConnection(this.urlConnection);
            connection.Open();
            MySqlCommand cmd = this.connection.CreateCommand();
            cmd.CommandText = "SELECT * FROM action_share where id_user= " + s.Id + " and id_article = "
                + getIdArtcileByLink(s.Link) + "";
            MySqlDataReader msdr = cmd.ExecuteReader();
            while (msdr.Read())
            {
                return true;
            }
            return false;
        }

        public Boolean InsertShare(ShareModel shareModel)
        {
            string statement = String.Empty;
            if (CheckShare(shareModel))
            {
                return false;
            }
            else
            {
                connection = new MySqlConnection(this.urlConnection);
                connection.Open();
                MySqlCommand cmd = this.connection.CreateCommand();
                cmd.CommandText = "insert into action_share(id_user, id_article) values (" + shareModel.Id
                    + ",'" + getIdArtcileByLink(shareModel.Link) + "')";
                try
                {
                    cmd.ExecuteNonQuery();
                    cmd.CommandText = "UPDATE article set score = score+3 where id_article = " + getIdArtcileByLink(shareModel.Link);
                    try
                    {
                        cmd.ExecuteNonQuery();
                        return true;
                    }
                    catch
                    {
                        return false;
                    }

                }
                catch
                {

                    return false;
                }
            }
        }

        public Boolean InsertShareBadge(ShareModel shareModel)
        {
            string statement = String.Empty, categorie = String.Empty;
            int scoreByCategorie = 0;

            if (CheckShare(shareModel))
            {
                return false;
            }
            else
            {
                connection = new MySqlConnection(this.urlConnection);
                connection.Open();
                MySqlCommand cmd = this.connection.CreateCommand();

                cmd.CommandText = "insert into action_share(id_user, id_article) values (" + shareModel.Id
                    + ",'" + getIdArtcileByLink(shareModel.Link) + "')";
                try
                {
                    cmd.ExecuteNonQuery();
                }
                catch
                {
                    return false;
                }

                cmd.CommandText = "select categorie from article where link = " + shareModel.Link.ToString();
                MySqlDataReader mySqlDataReader = cmd.ExecuteReader();
                while (mySqlDataReader.Read())
                {
                    categorie = mySqlDataReader.GetString(0);
                }
                mySqlDataReader.Close();

                cmd.CommandText = "select `" + categorie + "` from utilisateur where id_user =" + shareModel.Id;
                mySqlDataReader = cmd.ExecuteReader();
                while (mySqlDataReader.Read())
                {
                    scoreByCategorie = mySqlDataReader.GetInt32(0);
                }
                mySqlDataReader.Close();
                cmd.CommandText = "UPDATE utilisateur set `" + categorie + "` = `" + categorie + "`+5 where id_user = " + (shareModel.Id);
                try
                {
                    cmd.ExecuteNonQuery();
                }
                catch
                {
                    return false;
                }
                mySqlDataReader.Close();

                if (scoreByCategorie >= 200)
                {
                    cmd.CommandText = "UPDATE article set score = score+6 where id_article = " + getIdArtcileByLink(shareModel.Link);
                    try
                    {
                        cmd.ExecuteNonQuery();
                        return true;
                    }
                    catch
                    {
                        return false;
                    }

                }
                else if (scoreByCategorie >= 100)
                {
                    cmd.CommandText = "UPDATE article set score = score+5 where id_article = " + getIdArtcileByLink(shareModel.Link);
                    try
                    {
                        cmd.ExecuteNonQuery();
                        return true;
                    }
                    catch
                    {
                        return false;
                    }

                }
                else
                {
                    cmd.CommandText = "UPDATE article set score = score+4 where id_article = " +
                        getIdArtcileByLink(shareModel.Link);
                    try
                    {
                        cmd.ExecuteNonQuery();
                        return true;
                    }
                    catch
                    {
                        return false;
                    }

                }



            }

        }






        public Boolean CheckLike(ShareModel s)
        {
            connection = new MySqlConnection(this.urlConnection);
            connection.Open();
            MySqlCommand cmd = this.connection.CreateCommand();
            cmd.CommandText = "SELECT * FROM action_like where id_user= " + s.Id + " and id_article = "
                + getIdArtcileByLink(s.Link) + "";
            MySqlDataReader msdr = cmd.ExecuteReader();
            while (msdr.Read())
            {
                return true;
            }
            return false;
        }

        public Boolean InsertLike(ShareModel shareModel)
        {
            string statement = String.Empty;
            if (CheckLike(shareModel))
            {
                return false;
            }
            else
            {
                connection = new MySqlConnection(this.urlConnection);
                connection.Open();
                MySqlCommand cmd = this.connection.CreateCommand();
                cmd.CommandText = "insert into action_like(id_user, id_article) values (" + shareModel.Id
                    + ",'" + getIdArtcileByLink(shareModel.Link) + "')";
                try
                {
                    cmd.ExecuteNonQuery();
                    cmd.CommandText = "UPDATE article set score = score+1 where id_article = " + getIdArtcileByLink(shareModel.Link);
                    try
                    {
                        cmd.ExecuteNonQuery();
                        return true;
                    }
                    catch
                    {
                        return false;
                    }

                }
                catch
                {

                    return false;
                }

            }

        }

        public Boolean InsertLikeBadge(ShareModel shareModel)
        {
            string statement = String.Empty, categorie = String.Empty;
            int scoreByCategorie = 0;

            if (CheckLike(shareModel))
            {
                return false;
            }
            else
            {
                connection = new MySqlConnection(this.urlConnection);
                connection.Open();
                MySqlCommand cmd = this.connection.CreateCommand();

                cmd.CommandText = "insert into action_like(id_user, id_article) values (" + shareModel.Id
                    + ",'" + getIdArtcileByLink(shareModel.Link) + "')";
                try
                {
                    cmd.ExecuteNonQuery();
                }
                catch
                {
                    return false;
                }

                cmd.CommandText = "select categorie from article where link = " + shareModel.Link.ToString();
                MySqlDataReader mySqlDataReader = cmd.ExecuteReader();
                while (mySqlDataReader.Read())
                {
                    categorie = mySqlDataReader.GetString(0);
                }
                mySqlDataReader.Close();

                cmd.CommandText = "select `"+categorie+"` from utilisateur where id_user ="+ shareModel.Id;
                mySqlDataReader = cmd.ExecuteReader();
                while (mySqlDataReader.Read())
                {
                    scoreByCategorie = mySqlDataReader.GetInt32(0);
                }
                mySqlDataReader.Close();
               
                if (scoreByCategorie >= 200)
                {
                    cmd.CommandText = "UPDATE article set score = score+3 where id_article = " + getIdArtcileByLink(shareModel.Link);
                    try
                    {
                        cmd.ExecuteNonQuery();
                        return true;
                    }
                    catch
                    {
                        return false;
                    }
                    
                }
                else if (scoreByCategorie >= 100)
                {
                    cmd.CommandText = "UPDATE article set score = score+2 where id_article = " + getIdArtcileByLink(shareModel.Link);
                    try
                    {
                        cmd.ExecuteNonQuery();
                        return true;
                    }
                    catch
                    {
                        return false;
                    }
                    
                }
                else
                {
                    cmd.CommandText = "UPDATE article set score = score+1 where id_article = " + 
                        getIdArtcileByLink(shareModel.Link);
                    try
                    {
                        cmd.ExecuteNonQuery();
                        return true;
                    }
                    catch
                    {
                        return false;
                    }
                    
                }
                    


            }

        }

        public List<int> GetLikedArticlesByUser(int id)
        {
            connection = new MySqlConnection(this.urlConnection);
            connection.Open();
            List<int> articles = new List<int>();
            MySqlCommand cmd = this.connection.CreateCommand();
            cmd.CommandText = "select a.id_article" +
                " from action_like, utilisateur, article a where " +
                "action_like.id_user = utilisateur.id_user and action_like.id_article = a.id_article and " +
                "utilisateur.id_user = " + id + " ;";
            MySqlDataReader mySqlDataReader = cmd.ExecuteReader();

            while (mySqlDataReader.Read())
            {
                int article = mySqlDataReader.GetInt32(0);
                articles.Add(article);
            }
            return articles;
        }









    }
}

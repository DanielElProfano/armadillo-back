const Parser = require('rss-parser');
const Rss = require('../models/Rss');
const { findItem, readData, getDetail } = require('../bd/rss');

const parser = new Parser();
const jsonRssArray = [];

module.exports = {
     getAll:  async(req, res, next) => {
       if(!req.user){
         return res.status(403).json("Tiene que estar logueado")
       }
       const userId = req.user.id
      try{
        let feed = await parser.parseURL('http://administracion.gob.es/web/CanalRSS.do?typeid=3&canalid=1');
        feed.items.forEach(async(item, index) => {
          const {title, link, contentSnippet, guid } = item;
          console.log(item.pubDate[0])
          jsonRssArray[index] =  {
              title,
              link,
              guid,
              pubDate: item.pubDate[0],
              contentSnippet,
            }
          })
          
          jsonRssArray.forEach(async element => {
            const {title, link, guid, contentSnippet, pubDate} = element;
            const find = await findItem(guid);  // compruebo si el item ya existe en la BBDD. si no existe lo añado.
            if (!find){
              const newRss = new Rss({
                title,
                link,
                guid,
                pubDate,
                contentSnippet,
                user: userId
              })
              let data = await newRss.save();
            }
          })
          const data = await readData(); // recupero los datos en la BBDD
          return res.status(200).json(data);
      
        }catch(error){
          return res.status(500).json(error.message);
        }
    },
    getAllFromBBDD: async (req, res, next) => {
        const data = await readData(); // reutilizo para usar el refresh
        return res.status(200).json(data);
    },

    getItemDetail: async (req, res, next) => {
        try{
          const data = await getDetail(req.params.id);
          return res.status(200).json(data);
        }catch(error){
          next(error);
        }
    }

}
const Rss = require('../models/Rss');

module.exports = {

    findItem: async (itemId) => {
        const query = await Rss.findOne({ 'guid': itemId }); // compruebo si el item ya existe en la BBDD. si no existe lo añado.
        if(query){
            return true;
        }
        return false;
    },

    readData: async () => {
        try{
            const query = await Rss.find();
            return query;
        }catch(error){
            console.log(error)
        }
    },
    getDetail: async (id) => {
        try{
            const query = await Rss.findOne({guid: id});
            return query
        }catch(error){
            console.log(error);
        }
    }

}
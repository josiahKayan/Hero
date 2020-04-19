const connection = require('../database/connection');
const crypto = require('crypto');


module.exports = {

    async create(request, response){

        const { name, email, whatsapp , city , uf } = request.body;

        //Create a id
        const id = crypto.randomBytes(4).toString('HEX');

        try{
            await connection('ongs').insert({
                id,
                name,
                email,
                whatsapp,
                city,
                uf, 
            });
        }
        catch(err){
            console.log(err);
        }


        return response.json({id});
    },

    async index(request,response){
        const ongs = await connection('ongs').select('*');

        return response.json({ongs});
    },
    
   

};
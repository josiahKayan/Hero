const connection = require('../database/connection');
const crypto = require('crypto');



module.exports ={

    async create( request , response){

        const {id} = request.body;

        try{
            const ong = await connection('ongs').where('id',id).select('name').first();

            if(!ong){

                return response.status(400).json({
                    error:"No ONG found with this Id"
                });

            }

            return response.json(ong);
        }
        catch(err){
            return response.json({
                error:err
            });
        }

    }



}
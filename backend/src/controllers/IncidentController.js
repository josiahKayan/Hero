const connection = require('../database/connection');
const crypto = require('crypto');


module.exports = {

    async create(request, response){

        const { title, description, value } = request.body;

        //Create a id
        const ong_id = request.headers.authorization ;

        try{
            const [id] =  await connection('incidents').insert({
                title,
                description,
                value,
                ong_id, 
            });

            return response.json({id});

        }
        catch(err){
            return response.json({
                error:err
            });
        }

    },

    async index(request,response){

        const {  page = 1 } = request.query;

        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
        .join('ongs','ongs.id','=','incidents.ong_id')
        .limit(5).offset((page -1)*5).select(['incidents.*','ongs.name','ongs.email','ongs.whatsapp','ongs.city','ongs.uf']);

        response.header('X-Total-Count', count['count(*)']);

        return response.json({incidents});
    },

    async delete(request, response){

        const { id } = request.params;
        const ong_id = request.headers.authorization ;

        try{

            const incident = await connection('incidents').where('id',id).select('ong_id').first();

            console.log(incident);

 
            if(  incident.ong_id != ong_id ){

                return response.status(401).json({
                    error: 'Operation not permitted.'
                });


            }

            await connection('incidents').delete().where('id',id).delete();

            return response.status(204).send();

        }
        catch(err){
            return response.status(404).json({
                error: err
            });
        }

    },

};
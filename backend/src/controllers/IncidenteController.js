const connection = require('../database/connections');


module.exports = {
    async index(req, res) {
        const ong_id = req.headers.authorization;
        const { page = 1 } = req.query;
        const count = await connection('incidents').count();
        
        const incidente = await connection('incidents')
            .join('ongs', 'ongs.id', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
          //  .where('ong_id', ong_id) 
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        res.header('X-Total-Count', count['count(*)']);
        return res.json(incidente);
    },

    async create(req, res) {
        const { title, description, value } = req.body;
        const ong_id = req.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });
        return res.json({ id });
    },

    async delete(req, res) {
        const ong_id = req.headers.authorization;
        const { id } = req.params;

        const incident = await connection('incidents').select('*').where({ 'ong_id': ong_id, 'id': id });

        console.log(incident);

        if (!incident.length) {
            res.status(401).send({ Erro: 'Informacao nao encontrada, verifique e tente novamente' });
        }

        await connection('incidents').where({ 'ong_id': ong_id, 'id': id }).del();
        return res.status(200).send({ Sucesso: 'Informacao foi apagada com sucesso !' });;
    }

}
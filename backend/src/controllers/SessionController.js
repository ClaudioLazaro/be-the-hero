const connection = require('../database/connections');

module.exports = {
    async session(req, res) {
        const { id } = req.body;
        const ong = await connection('ongs').where('id', id).select('name').first();

        if (!ong) {

            return res.status(400).json({ erro: `${id} nao encontrada, verique e tente novamente!` })
        }

        return res.json(ong);
    }
}
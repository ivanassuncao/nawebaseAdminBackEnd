const queries = require('./queries')

module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const item = { ...req.body }

        if(req.params.id) item.id = req.params.id

        try {
            existsOrError(item.descricaoItem, 'Descrição não informada')
            existsOrError(item.detalhamentoItem, 'Detalhamento não informada')
            existsOrError(item.grupoItemId, 'Grupo do Item não informada')
        } catch(msg) {
            res.status(400).send(msg)
        }

        
        if(item.id) {
            app.db('items')
                .update(item)
                .where({ id: item.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('items')
                .insert(item)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }

    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('items')
                .where({ id: req.params.id }).del()

            const subitem = await app.db('items')
                .where({ parentId: req.params.id })
            notExistsOrError(subitem, 'Item Base possui subItems.')                
            
            try {
                existsOrError(rowsDeleted, 'Items não foi encontrada.')
            } catch(msg) {
                return res.status(400).send(msg)    
            }

            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    const get = (req, res) => {
        app.db('items')
            .then(items => res.json(items))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('items')
            .where({id: req.params.id})
            .first()
            .then(item => res.json(item))
            .catch(err => res.status(500).send(err))
    }

    const getItemBase = (req, res) => {
        app.db('items')
            .then(items => res.json(items))
            .where({itemBase: true})
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, get, getById, getItemBase}

}
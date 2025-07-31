const {Transaction} = require('../models');

exports.createTransaction = async (req, res) => {
    try {
        const {type, nom, montant} = req.body;
        console.log(req.body);
        if (!type || !nom || !montant) {
            return res.status(400).json({message: "Veuillez renseigner tous les paramètres."});
        }

        const transaction = await Transaction.create({type, nom, montant});

        if (!transaction) {
            return res.status(404).json({message: `Échec lors de la création du ${type}`});
        } else {
            return res.status(201).json({message: `${type} effectue avec succes`, transaction});
        }
    } catch (error) {
        res.status(500).json({message: "Erreur de serveur", error});
    }
};

exports.getAllTransaction = async (req, res) => {
    try {
        const transactions = await Transaction.findAll();

        if (!transactions || transactions.length === 0) {
            return res.status(404).json({message: "Aucune transaction trouvée"});
        } else {
            return res.status(200).json(transactions);
        }
    } catch (error) {
        res.status(500).json({message: "Erreur serveur", error});
    }
};

exports.updateTransaction = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const {type, nom, montant} = req.body;

        if (isNaN(id)) {
            return res.status(400).json({message: "ID invalide"});
        }

        if (!type || !nom || !montant) {
            return res.status(400).json({message: "Veuillez renseigner tous les paramètres."});
        }

        const transaction = await Transaction.findByPk(id);
        if (!transaction) {
            return res.status(404).json({message: "Transaction non trouvée"});
        }

        const updatedTransaction = await Transaction.update(req.body, {where: {id}});

        if (updatedTransaction[0] === 0) 
            return res.status(404).json({message: "Aucune mise à jour effectuée"});
        else
            return res.status(200).json({message: "Mise à jour réussie", updatedTransaction});

    } catch (error) {
        res.status(500).json({message: "Erreur de serveur", error});
    }
};

exports.deleteTransaction = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({message: "ID invalide"});
        }

        const transaction = await Transaction.findByPk(id);
        if (!transaction) {
            return res.status(404).json({message: "Transaction non trouvée"});
        }

        await Transaction.destroy({where: {id}});
        return res.status(200).json({message: "Transaction supprimée avec succès"});

    } catch (error) {
        res.status(500).json({message: "Erreur de serveur", error});
    }
};

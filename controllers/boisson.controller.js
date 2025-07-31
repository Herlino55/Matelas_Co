const { where,Op } = require('sequelize');
const {Boisson} = require('../models');



exports.createBoissons = async (req, res) => {
    try{
        const {categorie, nom, prix, qte} = req.body;
        console.log(req.body);
        if(!categorie || !nom || !prix || !qte)
            return res.status(400).json({message: "Veuillez renseigner tous les paramètres."});
        
        const boisson = await Boisson.create({categorie, nom, prix, qte});

        if(!boisson)
            return res.status(404).json({message: "echec lors de la creation"});
        else
            return res.status(201).json({message: "Enregistrement réussi", boisson});
    }catch(error){
        res.status(500).json({message: "erreur de serveur", error})   
    }
};

exports.getAllBoissons = async (req, res) => {
    try {
        const boissons = await Boisson.findAll();

        if(!boissons)
            return res.status(404).json({message: "Aucune boisson trouvée"});
        else
            return res.status(200).json(boissons);
    } catch (error) {
        res.status(500).json({message: "Erreur serveur", error});
    }
};

exports.updateBoisson = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const {categorie, nom, prix, qte} = req.body;

        if (isNaN(id)) {
            return res.status(400).json({message: "ID invalide"});
        }

        if (!categorie || !nom || !prix || !qte) {
            return res.status(400).json({message: "Veuillez renseigner tous les paramètres."});
        }

        const boisson = await Boisson.findByPk(id);
        if (!boisson) {
            return res.status(404).json({message: "Boisson non trouvée"});
        }

        const updatedBoisson = await Boisson.update(req.body,{where: {id}});

        if (updatedBoisson[0] === 0) 
            return res.status(404).json({message: "Aucune mise à jour effectuée"});
        else
            return res.status(200).json({message: "Mise à jour réussie", updatedBoisson});

    } catch (error) {
        res.status(500).json({message: "Erreur lors de la mise à jour", error});
    }
};

exports.deleteBoisson = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({message: "ID invalide"});
        }

        const boisson = await Boisson.findByPk(id);
        if (!boisson) {
            return res.status(404).json({message: "Boisson non trouvée"});
        }

        await boisson.destroy();
        return res.status(200).json({message: "Boisson supprimée avec succès"});

    } catch (error) {
        res.status(500).json({message: "Erreur lors de la suppression", error});
    }
};

exports.searchBoissons = async (req, res) => {
  try {
    const { prix, date, categorie } = req.query;

    const whereClause = {};
    if (prix) whereClause.prix = prix;
    if (date) {
      whereClause.createdAt = {
        [Op.gte]: new Date(date),
        [Op.lt]: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000)
      };
    }
    if (categorie) whereClause.categorie = categorie;

    const boissons = await Boisson.findAll({ where: whereClause });

    if (boissons.length === 0)
      return res.status(404).json({ message: "Aucune boisson trouvée" });

    res.status(200).json(boissons);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
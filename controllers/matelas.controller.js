const { Matelas} = require('../models');
const { Op } = require('sequelize');

// Ajouter un matelas
exports.createMatelas = async (req, res) => {
  try {
    const { nom, longueur, largeur, epaisseur, prix, type, qte } = req.body;

    if(!nom || !longueur || !largeur || !epaisseur || !prix || !type || !qte){
        res.status(404).json({"message": "veuillez entrer tous les parametres"});
    }

    // Récupérer chemin de la photo uploadée
    const photoPath = req.file ? `/uploads/matelas/${req.file.filename}` : null;

    const matelas = await Matelas.create({
      nom,
      longueur,
      largeur,
      epaisseur,
      prix,
      type,
      qte,
      photo: photoPath
    });

    if(!matelas)
        res.status(404).json({"message": "echec lors de la recuperation"});
    else
        res.status(201).json(matelas);

  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création', error });
  }
};


// Lister tous les matelas
exports.getAllMatelas = async (req, res) => {
 try  {
    const matelas = await Matelas.findAll({ include: Dates });
    
    if(!matelas)
        res.status(404).json({"message": "echec lors de la recuperation"});
    else
        res.status(200).json(matelas);

  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Modifier un matelas
exports.updateMatelas = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nom, longueur, largeur, epaisseur, prix, type, qte } = req.body;
     console.log("ID reçu :", id);
    console.log("Body reçu :", req.body);

    // Vérifie que l'ID est valide
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID invalide" });
    }

    // Vérifie les paramètres de base
    if (!nom || !longueur || !largeur || !epaisseur || !prix || !type || !qte) {
      return res.status(400).json({ message: "Veuillez entrer tous les paramètres" });
    }

    // Récupère le matelas existant
    const matelas = await Matelas.findByPk(id);
    if (!matelas) {
      return res.status(404).json({ message: "Matelas non trouvé" });
    }

    // Gère l’image si elle est présente
    const photoPath = req.file ? `/uploads/matelas/${req.file.filename}` : matelas.photo;

    // Mise à jour
    await matelas.update({
      nom,
      longueur,
      largeur,
      epaisseur,
      prix,
      type,
      qte,
      photo: photoPath
    });

    return res.status(200).json({ message: "Matelas mis à jour avec succès", matelas });

  } catch (error) {
    console.error("Erreur serveur :", error);
    return res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Supprimer un matelas
exports.deleteMatelas = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Matelas.destroy({ where: { id } });

    if (deleted === 0) return res.status(404).json({ message: 'Matelas non trouvé' });
    res.status(200).json({ message: 'Matelas supprimé' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};


// Récupérer conditionnees
exports.searchMatelas = async (req, res) => {
  try {
    const { nom, type, prix, longueur, largeur, date } = req.query;
    const whereClause = {};

    if (nom) {
      whereClause.nom = { [Op.iLike]: `%${nom}%` };
    }

    if (type) {
      whereClause.type = { [Op.iLike]: `%${type}%` };
    }

    if (prix && !isNaN(prix)) {
      whereClause.prix = { [Op.lte]: parseFloat(prix) };
    }

    if (longueur && !isNaN(longueur)) {
      whereClause.longueur = parseInt(longueur);
    }

    if (largeur && !isNaN(largeur)) {
      whereClause.largeur = parseInt(largeur);
    }

    if (date && !isNaN(Date.parse(date))) {
      const targetDate = new Date(date);
      targetDate.setHours(0, 0, 0, 0);

      const nextDay = new Date(targetDate);
      nextDay.setDate(targetDate.getDate() + 1);

      whereClause.createdAt = {
        [Op.gte]: targetDate,
        [Op.lt]: nextDay,
      };
    }

    const resultats = await Matelas.findAll({ where: whereClause });

    if (!resultats || resultats.length === 0) {
      return res.status(404).json({ message: "Aucun matelas trouvé selon les critères fournis." });
    }

    return res.status(200).json(resultats);
  } catch (error) {
    console.error("Erreur dans searchMatelas :", error);
    return res.status(500).json({ message: "Erreur lors de la recherche", error });
  }
};

const { where } = require('sequelize');
const {User} = require('../models');
const bcrypt = require('bcrypt');

//ajout d'un utilisateur
exports.createUser = async (req, res) => {
    try {
        const { email, nom, prenom, mot_de_passe } = req.body;

        // Vérifier si tous les champs sont présents
        if (!email || !nom || !prenom || !mot_de_passe) {
            return res.status(400).json({ message: "Veuillez renseigner tous les paramètres." });
        }

        // Vérifier si l'utilisateur existe déjà
        const userExist = await User.findOne({ where: { email } });

        if (userExist) {
            return res.status(409).json({ message: "Cet utilisateur existe déjà." });
        }

        // Hashage du mot de passe
        const hashpwd = await bcrypt.hash(mot_de_passe, 10);

        // Enregistrement de l'utilisateur
        const user = await User.create({
            email,
            nom,
            prenom,
            mot_de_passe: hashpwd
        });

        return res.status(201).json({ message: "Enregistrement réussi", user });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur lors de la création", error });
    }
};

exports.getAllUser = async (req, res) => {
    try{
        const user = await User.findAll();

        if(user)
            res.status(200).json(user);
        else
            res.status(404).json({message: "aucun utilisateur trouvé"});

    }catch(error){
        res.status(500).json({message : 'erreur lors de la recuperation', error});
    }
};

exports.getUserById = async (req, res) => {
    try{
        const id = parseInt(req.params.id);
        const user = await User.findByPk(id);

        if(user)
            res.status(200).json(user);
        else
            res.status(404).json({message: "utilisateur non trouvé"});

    }catch(error){
        res.status(500).json({message : 'erreur lors de la recuperation', error});
    }
};

exports.updateUser = async (req, res) => {
    try{
        const id = parseInt(req.params.id);
        const {email, nom, prenom, mot_de_passe} = req.body;

        if(isNaN(id))
            return res.status(400).json({message: "ID invalide"});

        const user = await User.findByPk(id);
        if(!user)
            return res.status(404).json({message: "Utilisateur non trouvé"});

        // Hashage du mot de passe si fourni
        if(mot_de_passe) {
            req.body.mot_de_passe = await bcrypt.hash(mot_de_passe, 10);
        }

        const updatedUser = await user.update(req.body,{where: {id}});

        if(updatedUser[0] === 0)
            return res.status(404).json({message: "Aucune mise à jour effectuée"});

        res.status(200).json({message: "Utilisateur mis à jour avec succès"});

    }catch(error){
        res.status(500).json({message : 'erreur lors de la mise a jour', error});
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "ID invalide" });
        }

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        await user.destroy();
        res.status(200).json({ message: "Utilisateur supprimé avec succès" });

    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};


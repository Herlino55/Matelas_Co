const {User} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const { email, mot_de_passe } = req.body;

        // Ajoute await ici
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: "Utilisateur non trouvé" });
        }

        // Vérifie le mot de passe
        const isMatch = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
        if (!isMatch) {
            return res.status(401).json({ message: "Mot de passe incorrect" });
        }

        // Génère le token
        const token = jwt.sign(
            { id: user.id, email: user.email,nom: user.nom},
            process.env.JWT_SECRET || 'herlino55',
            { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
        );

        return res.status(200).json({
            message: "Connexion réussie",
            token,
            user: { id: user.id, email: user.email }
        });

    } catch (error) {
        res.status(500).json({ message: "Erreur de serveur", error });
    }
};

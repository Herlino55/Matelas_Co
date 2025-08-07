const express = require('express');
require('dotenv').config();
const path = require('path');
const sequelize = require('./config/db');
const cors = require('cors');
const app = express();

const RouteMatelas = require('./routes/matelas.routes');
const RouteUser = require('./routes/user.routes');
const RouteBoisson = require('./routes/boisson.routes');
const RouteTransaction = require('./routes/transaction.routes');
const RouteAuth = require('./routes/auth.routes');
const authMiddleware = require('./middlewares/auth.middleware');
app.use(express.json());

app.get('/v1', (req, res) => {
  res.send('Bienvenue dans l’API de gestion de stock');
});

// Test de connexion
sequelize.authenticate()
  .then(() => console.log('✅ Connexion à la base de données réussie.'))
  .catch(err => console.error('❌ Erreur de connexion à la base de données :', err));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Routes
app.use('/v1/matelas',authMiddleware,RouteMatelas );
app.use('/v1/users',authMiddleware,RouteUser);
app.use('/v1/boissons',RouteBoisson);
app.use('/v1/transactions',authMiddleware, RouteTransaction);
app.use('/v1/auth',RouteAuth);

app.use(cors(
  {
    origin: '*',
    methods: ['GET', 'POST', 'DELETE','PUT'],
    allowedHeaders: ['Content-Type','Authorization']
  }
));

const PORT = process.env.PORT || 3000;
app.listen(PORT,'0.0.0.0', () => console.log(`Serveur lancé sur http://192.168.1.196:${PORT}`));

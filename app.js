const express = require('express');
const path = require('path');
const app = express();

// Middleware pour vérifier les heures ouvrables
app.use((req, res, next) => {
  const now = new Date();
  const day = now.getDay(); // 0 (dimanche) à 6 (samedi)
  const hour = now.getHours();

  const isWeekday = day >= 1 && day <= 5; // Lundi à vendredi
  const isWorkingHour = hour >= 9 && hour < 17;

  if (isWeekday && isWorkingHour) {
    next(); // continue vers les routes
  } else {
    res.send('<h1>Le site est disponible uniquement du lundi au vendredi, de 9h à 17h.</h1>');
  }
});

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/services', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'services.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

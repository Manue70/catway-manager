
README.md — Documentation API Catway Manager

# 🚤 Catway Manager API

Catway Manager est une application de gestion des catways (places de port) avec authentification et gestion des réservations.  
Elle est composée d’un **backend Node.js/Express + MongoDB** et d’un **frontend React**.

---

## 🚀 Installation

### 1. Cloner le projet
```bash
git clone https://github.com/ton-compte/catway-manager.git
cd catway-manager

2. Installer les dépendances

    Backend
        cd backend
        npm install
    Frontend
        cd ../frontend
        npm install


⚙️ Lancer le projet
Backend (port 5000)
    cd backend
    npm run dev

🔑 Authentification

L’API utilise des tokens JWT.
Chaque requête protégée doit inclure l’en-tête suivant :

Authorization: Bearer <votre_token>


📚 Endpoints API
Authentification
POST /api/auth/login

➡️ Connexion utilisateur

Body :
    {
    "email": "capitainerie@example.com",
    "password": "motdepasse123"
    }

Réponse :
    {
    "token": "xxxx.yyyy.zzzz",
    "role": "capitainerie"
    }

Catways
GET /api/catways

➡️ Récupère la liste des catways
✅ Protégé (token requis)

Réponse :   
    [
        {
            "_id": "123",
            "catwayNumber": "1",
            "catwayType": "voilier",
            "catwayState": "libre",
            "catwayDescription": "Proche de l'entrée"
        }
    ]

POST /api/catways

➡️ Ajoute un nouveau catway
✅ Réservé au rôle capitainerie

Body :
    {
        "catwayNumber": "12",
        "catwayType": "moteur",
        "catwayState": "occupé",
        "catwayDescription": "Catway principal"
    }

Réservations
GET /api/reservations

➡️ Liste toutes les réservations
✅ Protégé

POST /api/reservations

➡️ Ajoute une réservation

Body :
    {
        "catwayId": "123",
        "boatName": "Le Marin Heureux",
        "clientName": "Jean Dupont",
        "startDate": "2025-08-14",
        "endDate": "2025-08-20"
    }

🛠 Technologies

Backend : Node.js, Express, MongoDB, JWT, Bcrypt

Frontend : React + Vite

Base de données : MongoDB

👨‍💻 Auteur

Projet développé par Manuela

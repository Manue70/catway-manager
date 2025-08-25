
# Catway Manager API

API pour gérer les catways, les réservations et les clients d’un port.

---

## 🔑 Authentification

### POST `/api/auth/login`
Connexion d’un utilisateur.

**Body:**
```json
{
  "email": "capitainerie@example.com",
  "password": "motdepasse123"
}

Response (200 OK):

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "admin"
}


Codes possibles :

200 : Connexion réussie

401 : Email ou mot de passe incorrect

⚓ Catways
GET /api/catways

Récupère tous les catways.

Headers :

Authorization: Bearer <token>


Response (200 OK):

[
  {
    "_id": "123",
    "catwayNumber": "A1",
    "catwayType": "Standard",
    "catwayState": "Libre"
  }
]

POST /api/catways

Créer un nouveau catway. (Admin uniquement)

Body :

{
  "catwayNumber": "B2",
  "catwayType": "Premium",
  "catwayState": "Libre"
}

Response (201 Created) :

{
  "_id": "456",
  "catwayNumber": "B2",
  "catwayType": "Premium",
  "catwayState": "Libre"
}

DELETE /api/catways/:id

Supprimer un catway (Admin uniquement)

Headers :

Authorization: Bearer <token>


Response :

{ "message": "Catway supprimé !" }

📅 Réservations
GET /api/reservations

Récupère toutes les réservations.

Headers :

Authorization: Bearer <token>


Response :

[
  {
    "_id": "789",
    "catwayName": "A1",
    "boatName": "Le Marin Heureux",
    "clientName": "Jean Dupont",
    "startDate": "2025-08-14",
    "endDate": "2025-08-20"
  }
]

POST /api/reservations

Créer une réservation.

Body :

{
  "catwayId": "123",
  "boatName": "Le Marin Heureux",
  "clientName": "Jean Dupont",
  "startDate": "2025-08-14",
  "endDate": "2025-08-20"
}


Response :

{
  "_id": "789",
  "catwayName": "A1",
  "boatName": "Le Marin Heureux",
  "clientName": "Jean Dupont",
  "startDate": "2025-08-14",
  "endDate": "2025-08-20"
}

DELETE /api/reservations/:id

Supprimer une réservation.

Response :

{ "message": "Réservation supprimée !" }

PUT /api/reservations/:id

Modifier une réservation.

Body :

{
  "startDate": "2025-08-15",
  "endDate": "2025-08-21"
}


Response :

{
  "_id": "789",
  "catwayName": "A1",
  "boatName": "Le Marin Heureux",
  "clientName": "Jean Dupont",
  "startDate": "2025-08-15",
  "endDate": "2025-08-21"
}

👥 Clients / Users
GET /api/users

Récupère tous les utilisateurs. (Admin uniquement)

Headers :

Authorization: Bearer <token>


Response :

[
  {
    "_id": "001",
    "email": "client1@example.com",
    "role": "client"
  }
]

POST /api/users

Créer un nouvel utilisateur. (Admin uniquement)

Body :

{
  "email": "nouveauclient@example.com",
  "password": "motdepasse123",
  "role": "client"
}


Response :

{
  "_id": "002",
  "email": "nouveauclient@example.com",
  "role": "client"
}

DELETE /api/users/:id

Supprimer un utilisateur. (Admin uniquement)

Response :

{ "message": "Utilisateur supprimé !" }

⚡ Notes

Toutes les routes admin nécessitent un token avec le rôle admin.

Les autres routes peuvent être accessibles selon la configuration des rôles.

Tester l’API via Postman ou Thunder Client est recommandé.


---


# 🚗 Auto Rent — Agence de location de voitures

## 📌 Présentation

Auto Rent est un site web statique de location de voitures. Il permet de consulter un catalogue de véhicules, choisir un véhicule selon sa catégorie, calculer le prix d’une location et générer un devis.

## 👥 Membres du groupe

- Ahmed Hammemi
- [Ajouter un deuxième membre si nécessaire]

## 🛠️ Technologies utilisées

- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- jQuery
- Select2
- DataTables
- CSV
- localStorage

## ✨ Fonctionnalités

- Présentation des catégories de véhicules
- Catalogue chargé depuis le fichier `data/vehicles.csv`
- Recherche, tri et pagination avec DataTables
- Listes déroulantes améliorées avec Select2
- Filtrage des véhicules selon la catégorie choisie
- Affichage automatique du prix journalier
- Calcul du prix total selon les dates de location
- Formulaire de contact avec validation JavaScript
- Génération d’un devis après la réservation
- Impression du devis

## 📁 Arborescence du projet

```text
Location voitures/
├── index.html
├── index 2.html
├── index 3.html
├── contact.html
├── devis.html
├── README.md
├── script.js
├── script2.js
├── script3.js
├── style.css
├── data/
│   └── vehicles.csv
└── images/
    ├── clio.jpg
    ├── jumpy.jpg
    ├── mirai.jpg
    ├── passat.jpg
    └── yaris.jpg
```

## ▶️ Lancer le projet

1. Ouvrir le dossier du projet dans Visual Studio Code.
2. Ouvrir le fichier `index 3.html`.
3. Lancer la page avec l’extension Live Server.
4. Tester le catalogue, le formulaire de réservation, le contact et le devis.

Live Server est nécessaire pour permettre à JavaScript de charger le fichier `data/vehicles.csv`.

## ✅ Tests réalisés

- Chargement des 50 véhicules depuis le fichier CSV
- Recherche, tri et pagination dans le catalogue
- Filtrage des véhicules par catégorie
- Affichage automatique du prix journalier
- Calcul du prix selon les dates choisies
- Vérification des dates de location
- Validation du formulaire de contact
- Génération et impression du devis

## 🤖 Améliorations réalisées avec l’aide de l’IA

### 1. 📊 Chargement du catalogue depuis un fichier CSV

- **Prompt utilisé :** Charger le catalogue des véhicules depuis un fichier CSV contenant au moins 50 véhicules.
- **Proposition :** Lire le fichier `data/vehicles.csv` avec JavaScript et générer automatiquement le catalogue.
- **Version intégrée :** Le fichier `script3.js` charge les données du CSV et remplit le tableau.
- **Fonctionnement :** Les véhicules sont affichés à partir des données présentes dans le fichier CSV.

### 2. 🎨 Amélioration du design

- **Prompt utilisé :** Améliorer le design CSS pour rendre le site plus élégant et attirant.
- **Proposition :** Utiliser une palette de couleurs vert profond et doré, améliorer les cartes, les boutons et l’affichage sur mobile.
- **Version intégrée :** Les styles sont ajoutés dans `index 3.html`.
- **Fonctionnement :** Le CSS personnalise l’apparence du site sans modifier les fonctionnalités JavaScript.

### 3. 🧾 Création et impression d’un devis

- **Prompt utilisé :** Créer une page de devis affichant les informations de réservation et ajouter un bouton pour l’imprimer.
- **Proposition :** Enregistrer temporairement les informations de réservation dans le navigateur et les afficher dans une page dédiée.
- **Version intégrée :** `script3.js` enregistre la réservation dans `localStorage` et `devis.html` affiche le récapitulatif.
- **Fonctionnement :** Après une réservation valide, les informations sont affichées dans le devis. Le bouton d’impression utilise la fonction d’impression du navigateur.

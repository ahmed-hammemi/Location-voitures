// Affiche un message coloré : type = "erreur" ou "succes"
function afficherMessage(texte, type) {
    var message = document.getElementById("message");
    message.textContent = texte;
    message.className = texte === "" ? "" : type;
}

// Calcul du prix de la location : nombre de jours x prix journalier
function calculerPrix() {

    var voiture = document.getElementById("voiture").value;
    var dateDebut = document.getElementById("dateDebut").value;
    var dateFin = document.getElementById("dateFin").value;
    var prixTotal = document.getElementById("prixTotal");

    afficherMessage("", "");

    // Vérifier le véhicule et les dates
    if (voiture === "" || dateDebut === "" || dateFin === "") {
        afficherMessage("Veuillez remplir les informations de réservation.", "erreur");
        return;
    }

    var debut = new Date(dateDebut);
    var fin = new Date(dateFin);

    // Vérifier la cohérence des dates
    if (fin < debut) {
        afficherMessage(
            "La date de fin doit être supérieure ou égale à la date de début.",
            "erreur"
        );
        return;
    }

    // Nombre de jours : différence en millisecondes convertie en jours
    var difference = fin - debut;
    var nombreJours = difference / (1000 * 60 * 60 * 24);

    // Une location d'une seule journée
    if (nombreJours === 0) {
        nombreJours = 1;
    }

    // La value du select contient directement le prix journalier
    var prixJournalier = Number(voiture);

    var total = nombreJours * prixJournalier;

    prixTotal.value = total + " DT";
}

// Vérification du nom dès que le champ perd le focus et change
document.getElementById("nom").addEventListener("change", function (event) {

    event.preventDefault();

    var nom = document.getElementById("nom").value;

    if (nom.length < 3) {
        alert("Le nom doit contenir au moins 3 caractères.");
    } else {
        console.log(nom);
    }
});

// Validation du formulaire à l'envoi
document.getElementById("reservationForm").addEventListener("submit", function (event) {

    event.preventDefault();

    var nom = document.getElementById("nom").value;
    var email = document.getElementById("email").value;
    var telephone = document.getElementById("telephone").value;
    var categorie = document.getElementById("categorie").value;
    var voiture = document.getElementById("voiture").value;
    var dateDebut = document.getElementById("dateDebut").value;
    var dateFin = document.getElementById("dateFin").value;

    afficherMessage("", "");

    // Validation
    if (nom === "") {
        afficherMessage("Veuillez saisir votre nom et prénom.", "erreur");
        return;
    }

    if (email === "") {
        afficherMessage("Veuillez saisir votre email.", "erreur");
        return;
    }

    // Format d'email valide : texte@texte.texte
    var formatEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatEmail.test(email)) {
        afficherMessage("L'adresse email n'est pas valide.", "erreur");
        return;
    }

    if (telephone === "") {
        afficherMessage("Veuillez saisir votre téléphone.", "erreur");
        return;
    }

    if (categorie === "") {
        afficherMessage("Veuillez sélectionner une catégorie.", "erreur");
        return;
    }

    if (voiture === "") {
        afficherMessage("Veuillez sélectionner une voiture.", "erreur");
        return;
    }

    if (dateDebut === "" || dateFin === "") {
        afficherMessage("Veuillez sélectionner les dates.", "erreur");
        return;
    }

    var debut = new Date(dateDebut);
    var fin = new Date(dateFin);

    if (fin < debut) {
        afficherMessage(
            "La date de fin doit être supérieure ou égale à la date de début.",
            "erreur"
        );
        return;
    }

    calculerPrix();

    afficherMessage("Réservation validée avec succès.", "succes");
});
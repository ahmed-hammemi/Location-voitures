var voitures = [];
var tableauCatalogue = null;

// Afficher un message sous le formulaire
function afficherMessage(texte, type) {
    var message = document.getElementById("message");

    message.textContent = texte;
    message.className = texte === ""
        ? "mb-0"
        : (type === "erreur"
            ? "alert alert-danger mb-0"
            : "alert alert-success mb-0");
}

// Lire les lignes du fichier CSV
function analyserCSV(texte) {
    var lignes = texte
        .replace(/^\uFEFF/, "")
        .trim()
        .split(/\r?\n/);

    var entetes = lignes.shift().split(",").map(function (valeur) {
        return valeur.trim();
    });

    return lignes.filter(Boolean).map(function (ligne) {
        var valeurs = ligne.split(",");
        var objet = {};

        entetes.forEach(function (entete, index) {
            objet[entete] = (valeurs[index] || "").trim();
        });

        return {
            id: objet.id,
            category: objet.category,
            brand: objet.brand,
            model: objet.model,
            power: Number(objet.power),
            pricePerDay: Number(objet.pricePerDay),
            available: objet.available.toLowerCase() === "true"
        };
    });
}

// Former le nom complet du véhicule
function nomVoiture(voiture) {
    return voiture.brand + " " + voiture.model;
}

// Charger le CSV et initialiser les composants
function chargerCatalogue() {
    fetch("data/vehicles.csv")
        .then(function (reponse) {
            if (!reponse.ok) {
                throw new Error("Le fichier data/vehicles.csv est introuvable.");
            }

            return reponse.text();
        })
        .then(function (texte) {
            voitures = analyserCSV(texte);

            if (voitures.length === 0) {
                throw new Error("Le fichier CSV ne contient aucun véhicule.");
            }

            afficherCatalogue();
            remplirCategories();
            initialiserSelect2();
            initialiserDataTables();
        })
        .catch(function (erreur) {
            document.getElementById("erreurCatalogue").textContent =
                erreur.message +
                " Lancez le projet avec un serveur local, par exemple Live Server.";
        });
}

// Afficher tous les véhicules dans le tableau
function afficherCatalogue() {
    var corps = document.querySelector("#tableCatalogue tbody");
    corps.replaceChildren();

    voitures.forEach(function (voiture) {
        var ligne = document.createElement("tr");
        var valeurs = [
            voiture.category,
            nomVoiture(voiture),
            voiture.power + " CV",
            voiture.pricePerDay + " DT",
            voiture.available ? "Disponible" : "Indisponible"
        ];

        valeurs.forEach(function (valeur) {
            var cellule = document.createElement("td");
            cellule.textContent = valeur;
            ligne.appendChild(cellule);
        });

        corps.appendChild(ligne);
    });
}

// Remplir la liste des catégories à partir du CSV
function remplirCategories() {
    var select = document.getElementById("categorie");

    var categories = Array.from(new Set(
        voitures.map(function (voiture) {
            return voiture.category;
        })
    ));

    categories.forEach(function (categorie) {
        select.add(new Option(categorie, categorie, false, false));
    });
}

// Filtrer la liste des voitures selon la catégorie choisie
function remplirVoitures(categorie) {
    var selectVoiture = document.getElementById("voiture");

    selectVoiture.replaceChildren(
        new Option("", "", false, false)
    );

    voitures
        .filter(function (voiture) {
            return voiture.available &&
                (!categorie || voiture.category === categorie);
        })
        .forEach(function (voiture) {
            // La valeur est l'identifiant du véhicule.
            selectVoiture.add(
                new Option(nomVoiture(voiture), voiture.id, false, false)
            );
        });

    $(selectVoiture).val("").trigger("change.select2");

    document.getElementById("prixJour").value = "";
    document.getElementById("prixTotal").value = "";
}

// Initialiser Select2 et gérer les listes dépendantes
function initialiserSelect2() {
    $("#categorie").select2({
        placeholder: "Choisir une catégorie",
        width: "100%"
    });

    $("#voiture").select2({
        placeholder: "Choisir une voiture",
        width: "100%"
    });

    // Au départ, proposer toutes les voitures disponibles
    remplirVoitures("");

    // Mettre à jour la liste de voitures au changement de catégorie
    $("#categorie").on("change", function () {
        remplirVoitures(this.value);
    });

    // Afficher le prix journalier du véhicule sélectionné
    $("#voiture").on("change", function () {
        var idChoisi = this.value;

        var voiture = voitures.find(function (element) {
            return String(element.id) === idChoisi;
        });

        document.getElementById("prixJour").value =
            voiture ? voiture.pricePerDay + " DT" : "";

        document.getElementById("prixTotal").value = "";
    });
}

// Ajouter recherche, tri et pagination au tableau
function initialiserDataTables() {
    tableauCatalogue = $("#tableCatalogue").DataTable({
        pageLength: 10,
        language: {
            search: "Rechercher :",
            lengthMenu: "Afficher _MENU_ véhicules",
            info: "Affichage de _START_ à _END_ sur _TOTAL_ véhicules",
            infoEmpty: "Aucun véhicule",
            zeroRecords: "Aucun résultat trouvé",
            paginate: {
                previous: "Précédent",
                next: "Suivant"
            }
        }
    });
}

// Calculer le prix total de la location
function calculerPrix() {
    var idVoiture = document.getElementById("voiture").value;
    var dateDebut = document.getElementById("dateDebut").value;
    var dateFin = document.getElementById("dateFin").value;

    var voiture = voitures.find(function (element) {
        return String(element.id) === idVoiture;
    });

    afficherMessage("", "");

    if (!voiture || !dateDebut || !dateFin) {
        afficherMessage(
            "Veuillez choisir une voiture et remplir les dates.",
            "erreur"
        );
        return false;
    }

    var debut = new Date(dateDebut + "T00:00:00");
    var fin = new Date(dateFin + "T00:00:00");

    if (fin < debut) {
        afficherMessage(
            "La date de fin doit être égale ou postérieure à la date de début.",
            "erreur"
        );
        return false;
    }

    // Une location le même jour compte pour une journée
    var nombreJours = Math.max(
        1,
        Math.round((fin - debut) / 86400000)
    );

    var total = nombreJours * voiture.pricePerDay;
    document.getElementById("prixTotal").value = total + " DT";

    return true;
}

// Initialisation de la page
$(function () {
    chargerCatalogue();

    document
        .getElementById("btnCalculer")
        .addEventListener("click", calculerPrix);

    document
        .getElementById("reservationForm")
        .addEventListener("submit", function (event) {
            event.preventDefault();

            if (!this.reportValidity() || !calculerPrix()) {
                return;
            }

            var idVoiture = document.getElementById("voiture").value;
            var dateDebut = document.getElementById("dateDebut").value;
            var dateFin = document.getElementById("dateFin").value;

            var voitureChoisie = voitures.find(function (voiture) {
                return String(voiture.id) === idVoiture;
            });

            var debut = new Date(dateDebut + "T00:00:00");
            var fin = new Date(dateFin + "T00:00:00");

            var nombreJours = Math.max(
                1,
                Math.round((fin - debut) / 86400000)
            );

            var reservation = {
                nom: document.getElementById("nom").value.trim(),
                email: document.getElementById("email").value.trim(),
                telephone: document.getElementById("telephone").value.trim(),
                categorie: voitureChoisie.category,
                voiture: nomVoiture(voitureChoisie),
                dateDebut: dateDebut,
                dateFin: dateFin,
                nombreJours: nombreJours,
                prixJournalier: voitureChoisie.pricePerDay,
                prixTotal: nombreJours * voitureChoisie.pricePerDay
            };

            // Mémoriser la réservation pour que devis.html l'affiche
            localStorage.setItem(
                "reservationAutoRent",
                JSON.stringify(reservation)
            );

            // Ouvrir la page du devis
            window.location.href = "devis.html";
        });
});
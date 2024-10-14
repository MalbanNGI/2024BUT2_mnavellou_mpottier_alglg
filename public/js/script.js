// script.js
document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Empêche l'envoi par défaut du formulaire

    const birthdateInput = document.getElementById("birthdate").value;
    const errorMessage = document.getElementById("error-message");

    if (!isValidAge(birthdateInput)) {
        errorMessage.textContent = "Vous devez avoir au moins 18 ans pour vous inscrire.";
    } else {
        errorMessage.textContent = "";
        // Procéder à l'enregistrement si l'âge est valide
        alert("Inscription réussie !");
        // Ici, tu peux envoyer les données du formulaire avec un fetch() ou autre
    }
});

// Fonction pour valider l'âge
function isValidAge(birthdate) {
    const birthDate = new Date(birthdate);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        return age - 1 >= 18;
    }

    return age >= 18;
}


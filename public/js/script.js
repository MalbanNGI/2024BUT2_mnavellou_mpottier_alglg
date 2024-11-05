// document.addEventListener("DOMContentLoaded", function () {
//     // Sélectionne tous les éléments avec la classe 'fade-in'
//     const faders = document.querySelectorAll(".fade-in");

//     // Fonction pour vérifier si un élément est dans la vue
//     function checkVisibility() {
//         faders.forEach(fader => {
//             const rect = fader.getBoundingClientRect();
//             const windowHeight = window.innerHeight || document.documentElement.clientHeight;

//             // Vérifie si l'élément est suffisamment dans la vue
//             if (rect.top <= windowHeight - 50) { // Ajustez ici si nécessaire
//                 fader.classList.add("visible");
//             } else {
//                 fader.classList.remove("visible"); // Pour réinitialiser si besoin
//             }
//         });
//     }
//     console.log("voici fader : ",fader, rect.top, windowHeight); // Affiche la position pour chaque élément

//     // Appelle la fonction au chargement et au défilement
//     checkVisibility();
//     window.addEventListener("scroll", checkVisibility);
// });


document.addEventListener("DOMContentLoaded", () => {
    const textElement = document.getElementById("text2");
    const textContent = "Commandes terminées"; // Texte à afficher
    let index = 0;

    function typeEffect() {
        if (index < textContent.length) {
            textElement.textContent += textContent[index];
            index++;
            setTimeout(typeEffect, 100); // Ajustez la vitesse ici (100ms par lettre)
        } else {
            textElement.style.borderRight = "none"; // Retire le curseur une fois fini
        }
    }

    typeEffect(); // Lance l'effet d'écriture
});


document.addEventListener("DOMContentLoaded", () => {
    const textElement = document.getElementById("text");
    const textContent = "Commandes en cours de validation"; // Texte à afficher
    let index = 0;

    function typeEffect() {
        if (index < textContent.length) {
            textElement.textContent += textContent[index];
            index++;
            setTimeout(typeEffect, 100); // Ajustez la vitesse ici (100ms par lettre)
        } else {
            textElement.style.borderRight = "none"; // Retire le curseur une fois fini
        }
    }

    typeEffect(); // Lance l'effet d'écriture
});

// document.addEventListener("DOMContentLoaded", () => {
//     const popup = document.getElementById("popup");
//     const openPopupBtn = document.getElementById("openPopupBtn");
//     const closePopupBtn = document.getElementById("closePopupBtn");

//     // Ouvrir le popup
//     openPopupBtn.addEventListener("click", () => {
//         popup.style.display = "flex";
//     });

//     // Fermer le popup
//     closePopupBtn.addEventListener("click", () => {
//         popup.style.display = "none";
//     });

//     // Fermer le popup en cliquant en dehors du contenu
//     window.addEventListener("click", (event) => {
//         if (event.target === popup) {
//             popup.style.display = "none";
//         }
//     });
// });

// document.addEventListener("DOMContentLoaded", () => {
//     const openPopupButtons = document.querySelectorAll(".open-popup-btn");
//     const closeButtons = document.querySelectorAll(".popup .close");

//     // Fonction pour ouvrir une popup spécifique
//     openPopupButtons.forEach(button => {
//         button.addEventListener("click", () => {
//             const popupId = button.getAttribute("data-popup-id");
//             const popup = document.getElementById(popupId);
//             if (popup) {
//                 popup.style.display = "flex";
//             }
//         });
//     });

//     // Fonction pour fermer la popup
//     closeButtons.forEach(button => {
//         button.addEventListener("click", () => {
//             button.closest(".popup").style.display = "none";
//         });
//     });

//     // Fermer le popup en cliquant en dehors du contenu
//     window.addEventListener("click", (event) => {
//         if (event.target.classList.contains("popup")) {
//             event.target.style.display = "none";
//         }
//     });
// });



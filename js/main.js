// On récupère l'élément qui affiche l'année
const currentYear = document.getElementById('currentYear');

// Si l'élément existe sur la page, on affiche l'année actuelle
if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}
// On récupère le bouton dark mode
const darkModeToggle = document.getElementById('darkModeToggle');

// On vérifie si l'utilisateur avait déjà choisi le dark mode
// localStorage permet de sauvegarder ce choix entre les pages
if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
  if (darkModeToggle) {
    darkModeToggle.textContent = '☀️';
  }
}

// Quand on clique sur le bouton dark mode
if (darkModeToggle) {
  darkModeToggle.addEventListener('click', function () {

    // On vérifie si le dark mode est déjà activé
    if (document.body.classList.contains('dark-mode')) {
      // Si oui, on le désactive
      document.body.classList.remove('dark-mode');
      darkModeToggle.textContent = '🌙';
      localStorage.setItem('darkMode', 'disabled');
    } else {
      // Si non, on l'active
      document.body.classList.add('dark-mode');
      darkModeToggle.textContent = '☀️';
      localStorage.setItem('darkMode', 'enabled');
    }

  });
}

// On récupère la navbar
const navbar = document.getElementById('mainNavbar');

// On écoute l'événement scroll sur la page
window.addEventListener('scroll', function () {

  // Si on a scrollé plus de 50px vers le bas
  if (window.scrollY > 50) {
    // On ajoute la classe scrolled à la navbar
    navbar.classList.add('scrolled');
  } else {
    // Sinon on retire la classe scrolled
    navbar.classList.remove('scrolled');
  }

});

// On récupère le bouton retour en haut
const backToTop = document.getElementById('backToTop');

// On écoute le scroll pour afficher/cacher le bouton
window.addEventListener('scroll', function () {

  // Si on a scrollé plus de 300px
  if (window.scrollY > 300) {
    // On affiche le bouton
    backToTop.style.display = 'block';
  } else {
    // On cache le bouton
    backToTop.style.display = 'none';
  }

});

// Quand on clique sur le bouton retour en haut
if (backToTop) {
  backToTop.addEventListener('click', function () {
    // On remonte en douceur en haut de la page
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

}

// On récupère tous les éléments avec la classe stat-number
const statNumbers = document.querySelectorAll('.stat-number');

// Fonction qui anime un compteur de 0 jusqu'à sa valeur cible
function animerCompteur(element) {
  // On récupère la valeur cible depuis l'attribut data-target
  const cible = parseInt(element.getAttribute('data-target'));

  // On définit la durée totale de l'animation en ms
  const duree = 2000;

  // On calcule le nombre d'étapes
  const etapes = 60;

  // On calcule combien on ajoute à chaque étape
  const increment = cible / etapes;

  // On commence à 0
  let valeurActuelle = 0;
// On crée un intervalle qui s'exécute toutes les 33ms
  const intervalle = setInterval(function () {

    // On ajoute l'incrément à la valeur actuelle
    valeurActuelle += increment;

    // Si on a dépassé la cible, on s'arrête
    if (valeurActuelle >= cible) {
      element.textContent = cible.toLocaleString();
      clearInterval(intervalle);
    } else {
      // Sinon on affiche la valeur arrondie
      element.textContent = Math.floor(valeurActuelle).toLocaleString();
    }

  }, duree / etapes);
}

// On crée un IntersectionObserver pour détecter quand
// les compteurs entrent dans le viewport
const observateurCompteurs = new IntersectionObserver(function (entries) {

  entries.forEach(function (entry) {
    // Si l'élément est visible dans le viewport
    if (entry.isIntersecting) {
      // On lance l'animation du compteur
      animerCompteur(entry.target);
      // On arrête d'observer cet élément pour ne pas relancer l'animation
      observateurCompteurs.unobserve(entry.target);
    }
  });

}, {
  // L'élément doit être visible à 20% pour déclencher l'animation
  threshold: 0.2
});

// On observe chaque compteur
statNumbers.forEach(function (stat) {
  observateurCompteurs.observe(stat);
});

// On récupère tous les éléments avec la classe fade-in
const fadeElements = document.querySelectorAll('.fade-in');

// On crée un IntersectionObserver pour détecter quand
// les éléments entrent dans le viewport
const observateurFade = new IntersectionObserver(function (entries) {

  entries.forEach(function (entry) {
    // Si l'élément est visible dans le viewport
    if (entry.isIntersecting) {
      // On ajoute la classe visible pour déclencher l'animation CSS
      entry.target.classList.add('visible');
      // On arrête d'observer cet élément
      observateurFade.unobserve(entry.target);
    }
  });

}, {
  // L'élément doit être visible à 10% pour déclencher l'animation
  threshold: 0.1
});

// On observe chaque élément fade-in
fadeElements.forEach(function (element) {
  observateurFade.observe(element);
});
// On récupère tous les boutons de filtre
const filtreBtns = document.querySelectorAll('.filtre-btn');

// On récupère toutes les cartes freelances
const freelanceCards = document.querySelectorAll('.freelance-card');

// Si on est sur la page freelances
if (filtreBtns.length > 0) {

  // On écoute le clic sur chaque bouton de filtre
  filtreBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {

      // On retire la classe active de tous les boutons
      filtreBtns.forEach(function (b) {
        b.classList.remove('active');
      });

      // On ajoute la classe active au bouton cliqué
      btn.classList.add('active');

      // On récupère la catégorie du bouton cliqué
      const categorie = btn.getAttribute('data-categorie');

      // On parcourt toutes les cartes freelances
      freelanceCards.forEach(function (card) {

        // Si la catégorie est "tous" ou si la carte correspond à la catégorie
        if (categorie === 'tous' || card.getAttribute('data-categorie') === categorie) {
          // On affiche la carte
          card.style.display = 'block';
        } else {
          // Sinon on cache la carte
          card.style.display = 'none';
        }

      });

    });
  });

}

// On récupère le formulaire
const contactForm = document.getElementById('contactForm');

// Si on est sur la page contact
if (contactForm) {

  // Fonction pour afficher une erreur sous un champ
  function afficherErreur(champId, message) {
    const champ = document.getElementById(champId);
    const erreur = document.getElementById(champId + 'Error');
    // On ajoute la classe is-invalid au champ
    champ.classList.add('is-invalid');
    champ.classList.remove('is-valid');
    // On affiche le message d'erreur
    erreur.textContent = message;
  }

  // Fonction pour afficher un succès sur un champ
  function afficherSucces(champId) {
    const champ = document.getElementById(champId);
    const erreur = document.getElementById(champId + 'Error');
    // On ajoute la classe is-valid au champ
    champ.classList.add('is-valid');
    champ.classList.remove('is-invalid');
    // On vide le message d'erreur
    erreur.textContent = '';
  }

  // Fonction pour valider l'email avec une regex
  function validerEmail(email) {
    // Expression régulière pour vérifier le format de l'email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Quand on soumet le formulaire
  contactForm.addEventListener('submit', function (e) {
    // On empêche l'envoi réel du formulaire
    e.preventDefault();

    // On récupère les valeurs des champs
    const nom = document.getElementById('nom').value.trim();
    const prenom = document.getElementById('prenom').value.trim();
    const email = document.getElementById('email').value.trim();
    const sujet = document.getElementById('sujet').value;
    const message = document.getElementById('message').value.trim();

    // On suppose que le formulaire est valide
    let formulaireValide = true;

    // Validation du nom
    if (nom === '') {
      afficherErreur('nom', 'Le nom est obligatoire.');
      formulaireValide = false;
    } else {
      afficherSucces('nom');
    }

    // Validation du prénom
    if (prenom === '') {
      afficherErreur('prenom', 'Le prénom est obligatoire.');
      formulaireValide = false;
    } else {
      afficherSucces('prenom');
    }

    // Validation de l'email
    if (email === '') {
      afficherErreur('email', 'L\'email est obligatoire.');
      formulaireValide = false;
    } else if (!validerEmail(email)) {
      afficherErreur('email', 'Veuillez entrer un email valide (ex: nom@email.com).');
      formulaireValide = false;
    } else {
      afficherSucces('email');
    }

    // Validation du sujet
    if (sujet === '') {
      afficherErreur('sujet', 'Veuillez choisir un sujet.');
      formulaireValide = false;
    } else {
      afficherSucces('sujet');
    }

    // Validation du message — minimum 20 caractères
    if (message === '') {
      afficherErreur('message', 'Le message est obligatoire.');
      formulaireValide = false;
    } else if (message.length < 20) {
      afficherErreur('message', 'Le message doit contenir au moins 20 caractères.');
      formulaireValide = false;
    } else {
      afficherSucces('message');
    }

    // Si tout est valide
    if (formulaireValide) {
      // On affiche le message de succès
      const successMessage = document.getElementById('successMessage');
      successMessage.classList.remove('d-none');

      // On réinitialise le formulaire
      contactForm.reset();

      // On retire les classes de validation
      const champs = contactForm.querySelectorAll('.form-control, .form-select');
      champs.forEach(function (champ) {
        champ.classList.remove('is-valid', 'is-invalid');
      });

      // On cache le message de succès après 5 secondes
      setTimeout(function () {
        successMessage.classList.add('d-none');
      }, 5000);
    }

  });

}
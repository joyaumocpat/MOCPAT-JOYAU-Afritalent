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
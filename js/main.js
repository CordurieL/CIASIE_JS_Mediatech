// Script d'exécution

import { DisplayMedias } from "./displayMedias.js";
import { Collection } from "./models/collection.js";
import { Album } from "./models/album.js";
import { Game } from "./models/game.js";
import { Movie } from "./models/movie.js";

// Quand le DOM est chargé
document.addEventListener("DOMContentLoaded", function () {
  // Recupération ou création de la collection dans le localStorage
  let collection = new Collection();
  if (localStorage.getItem("collection") !== null) {
    collection.load();
  }

  // Création de l'objet de gestion des affichages
  let displayMedias = new DisplayMedias(collection);

  // Ajout des listeners de filtrage
  document.getElementById("filterAll").addEventListener("click", function () {
    collection.filter("all");
  });
  document
    .getElementById("filterAlbums")
    .addEventListener("click", function () {
      collection.filter("album");
    });
  document.getElementById("filterGames").addEventListener("click", function () {
    collection.filter("game");
  });
  document
    .getElementById("filterMovies")
    .addEventListener("click", function () {
      collection.filter("movie");
    });

  // Ajout listeners de triage
  let sortType = document.getElementById("sortType");

  /**
   * Fonction qui permet de trier suivant l'option séléctionnée
   * @param {node} source : le select
   * @return {void}
   */
  let sortWhenSelected = (source) => {
    switch (source.value) {
      case "alphabetical":
        collection.alphabetical();
        break;
      case "analphabetic":
        collection.analphabetic();
        break;
      case "oldestToLatest":
        collection.oldestToLatest();
        break;
      case "latestToOldest":
        collection.latestToOldest();
    }
    displayMedias.restoreMedias();
    switch (document.getElementsByClassName("active")[0].id) {
      case "filterAll":
        collection.filter("all");
        break;
      case "filterAlbums":
        collection.filter("album");
        break;
      case "filterGames":
        collection.filter("game");
        break;
      case "filterMovies":
        collection.filter("movie");
        break;
    }
  };

  // Ajout du listener sur le changement d'option
  collection.alphabetical();
  sortType.addEventListener("change", (event) => {
    sortWhenSelected(sortType);
  });

  // Séléction de la modal
  let modal = document.getElementById("addMediaModal");
  modal.style.display = "none";

  // Ajout du listener de l'affichage de la modal de création de média
  document.getElementById("addMedia").addEventListener("click", function () {
    modal.style.display = "block";
  });

  // Ajout du listener de la création de média
  document.getElementById("submitMedia").addEventListener("click", function () {
    modal.style.display = "none";
    displayMedias.createMedia();
    sortWhenSelected(document.getElementById("sortType"));
    displayMedias.restoreMedias();
    document.getElementById("formAddMedia").reset();
  });
  // Ajout du listener pour fermer la modal
  document
    .getElementsByClassName("close")[0]
    .addEventListener("click", function () {
      modal.style.display = "none";
      document.getElementById("formAddMedia").reset();
      document.getElementById("specificInfoAlbums").style.display = "block";
      document.getElementById("specificInfoGames").style.display = "none";
      document.getElementById("specificInfoMovies").style.display = "none";
      document.getElementById("addMovieFromApi").style.display = "none";
    });
  document
    .getElementById("cancelAddMedia")
    .addEventListener("click", function () {
      modal.style.display = "none";
      document.getElementById("formAddMedia").reset();
      document.getElementById("specificInfoAlbums").style.display = "block";
      document.getElementById("specificInfoGames").style.display = "none";
      document.getElementById("specificInfoMovies").style.display = "none";
      document.getElementById("addMovieFromApi").style.display = "none";
    });

  // Séléction de la modal
  let editModal = document.getElementById("editMediaModal");
  editModal.style.display = "none";

  // Ajout du listener de l'edit de média
  document.getElementById("submitEdit").addEventListener("click", function () {
    editModal.style.display = "none";
    displayMedias.editMedia();
    sortWhenSelected(document.getElementById("sortType"));
    displayMedias.restoreMedias();
  });
  // Ajout du listener pour fermer la modal
  document
    .getElementsByClassName("close")[1]
    .addEventListener("click", function () {
      editModal.style.display = "none";
      document.getElementById("formEditMedia").reset();
    });
  document
    .getElementById("cancelEditMedia")
    .addEventListener("click", function () {
      editModal.style.display = "none";
      document.getElementById("formEditMedia").reset();
    });

  // Séléction de la modal
  let addMovieFromApiModal = document.getElementById("addMovieFromApiModal");
  addMovieFromApiModal.style.display = "none";

  // Ajout du listener de l'ajout de jeu depuis une api
  document
    .getElementById("addMovieFromApi")
    .addEventListener("click", function () {
      addMovieFromApiModal.style.display = "block";
      modal.style.display = "none";
      document.getElementById("formAddMedia").reset();
    });

  // Ajout du listener pour fermer la modal
  document
    .getElementsByClassName("close")[2]
    .addEventListener("click", function () {
      addMovieFromApiModal.style.display = "none";
      document.getElementById("addMovieFromApi").style.display = "none";
      document.getElementById("formAddMedia").reset();
    });

  // Ajout du listener sur le bouton de recherche
  document
    .getElementById("searchBarSubmit")
    .addEventListener("click", function () {
      displayMedias.displayPromiseResponse();
    });

  // Affichage des champs spécifique suivant le type de média

  // On récupère le select
  let mediaType = document.getElementById("mediaType");

  // Les informations spécifiques sont cachés de base
  document.getElementById("specificInfoAlbums").style.display = "block";
  document.getElementById("specificInfoGames").style.display = "none";
  document.getElementById("specificInfoMovies").style.display = "none";
  document.getElementById("addMovieFromApi").style.display = "none";

  /**
   * Fonction qui permet d'afficher les bon éléments suivant l'option séléctionnée
   * @param {node} source : le select
   * @return {void}
   */
  let displayWhenSelected = (source) => {
    switch (source.value) {
      case "album":
        document.getElementById("specificInfoAlbums").style.display = "block";
        document.getElementById("specificInfoGames").style.display = "none";
        document.getElementById("specificInfoMovies").style.display = "none";
        document.getElementById("addMovieFromApi").style.display = "none";
        break;
      case "game":
        document.getElementById("specificInfoAlbums").style.display = "none";
        document.getElementById("specificInfoGames").style.display = "block";
        document.getElementById("specificInfoMovies").style.display = "none";
        document.getElementById("addMovieFromApi").style.display = "none";
        break;
      case "movie":
        document.getElementById("specificInfoAlbums").style.display = "none";
        document.getElementById("specificInfoGames").style.display = "none";
        document.getElementById("specificInfoMovies").style.display = "block";
        document.getElementById("addMovieFromApi").style.display = "block";
        break;
    }
  };
  // Ajout du listener sur le changement d'option
  mediaType.addEventListener("change", (event) => {
    displayWhenSelected(mediaType);
  });

  displayMedias.restoreMedias();
});

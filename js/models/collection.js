// Objet collection contenant des médias

import { Media } from "../models/media.js";
import { Game } from "../models/game.js";
import { Movie } from "../models/movie.js";
import { Album } from "../models/album.js";

export class Collection {
  /**
   * Constructeur de la classe Collection
   */
  constructor() {
    this.medias = [];
  }

  /**
   * Fonction d'ajout d'un media à la collection
   * @param {object} media - Le media à ajouter
   * @return {boolean} - true si le media a été ajouté à la collection, false sinon
   */
  addMedia(media) {
    if (media instanceof Media) {
      this.medias.push(media);
      this.save();
      return true;
    }
    return false;
  }

  /**
   * Fonction de suppression d'un media à la collection
   * @param {number} mediaId - L'id du media à supprimer
   * @return {boolean} - true si le media a été supprimé de la collection, false sinon
   * */
  removeMedia(mediaId) {
    let index = this.medias.findIndex((media) => {
      return media.id == mediaId;
    });
    if (index >= 0) {
      this.medias.splice(index, 1);
      this.save();
      return true;
    }
    return false;
  }

  /**
   * Fonction qui donne le nombre de médias dans la collection
   * @return {number} - Le nombre de médias dans la collection
   */
  getNbMedias() {
    return this.medias.length;
  }

  /**
   * Retire le visuel actif à l'ancien tab et l'ajoute au nouveau tab
   * @param {string} newTab - Tab sur lequel on veut ajouter la classe active
   * @return {void}
   * */
  activateTab(newTab) {
    let currentTab = document.getElementsByClassName("active")[0];
    if (currentTab.getAttribute("id") !== newTab) {
      currentTab.classList.remove("active");
      document.getElementById(newTab).classList.add("active");
    }
  }

  /**
   * Fonction qui filtre les médias selon leur type
   * @param {string} type - Le type de média à filtrer
   * @return {void}
   */
  filter(type) {
    let filteredMedias = [];
    switch (type) {
      case "all":
        filteredMedias = this.medias;
        this.activateTab("filterAll");
        break;
      case "album":
        filteredMedias = this.medias.filter((media) => media instanceof Album);
        this.activateTab("filterAlbums");
        break;
      case "game":
        filteredMedias = this.medias.filter((media) => media instanceof Game);
        this.activateTab("filterGames");
        break;
      case "movie":
        filteredMedias = this.medias.filter((media) => media instanceof Movie);
        this.activateTab("filterMovies");
        break;
      default:
        filteredMedias = this.medias;
        this.activateTab("filterAll");
        break;
    }
    // Cache les médias qui ne sont pas dans le tableau filtré, et affiche les autres
    this.medias.forEach((media) => {
      let mediaElement = document.querySelector(`[data-id="${media.id}"]`);
      if (!filteredMedias.includes(media)) {
        mediaElement.setAttribute("hidden", "");
      } else {
        mediaElement.removeAttribute("hidden");
      }
    });
  }

  /**
   * Fonction qui trie les médias selon la méthode callback passée en paramètre
   * @param {function} callback - La méthode de tri
   * @return {boolean} - true si le tri a été effectué, false sinon
   * */
  sort(sortFn) {
    return this.medias.sort(sortFn);
  }

  /**
   * Fonction pour trier les médias par ordre alphabétique
   * @param {void}
   * @return {void}
   */
  alphabetical() {
    this.medias.sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1));
  }

  /**
   * Fonction pour trier les médias par ordre analphabétique
   * @param {void}
   * @return {void}
   */
  analphabetic() {
    this.medias.sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1));
  }

  /**
   * Fonction pour trier les médias du plus vieux au plus récent
   * @param {void}
   * @return {void}
   */
  oldestToLatest() {
    this.medias.sort((a, b) => (a.releaseDate > b.releaseDate ? 1 : -1));
  }

  /**
   * Fonction pour trier les médias du plus récent au plus vieux
   * @param {void}
   * @return {void}
   */
  latestToOldest() {
    this.medias.sort((a, b) => (a.releaseDate < b.releaseDate ? 1 : -1));
  }

  /**
   * Fonction qui sauvegarde la collection dans le localStorage
   * @return {void}
   */
  save() {
    let medias = [];
    this.medias.forEach((media) => {
      medias.push({
        className: media.constructor.name,
        media: media,
      });
    });
    localStorage.setItem("collection", JSON.stringify(medias));
  }

  /**
   * Fonction qui charge la collection depuis le localStorage
   * @return {void}
   * */
  load() {
    let medias = JSON.parse(localStorage.getItem("collection"));
    if (medias) {
      medias.forEach((media) => {
        switch (media.className) {
          case "Game":
            this.medias.push(
              new Game(
                media.media.title,
                media.media.img,
                media.media.rating,
                media.media.releaseDate,
                media.media.studio,
                media.media.nbPlayers,
                media.media.plot
              )
            );
            break;
          case "Movie":
            this.medias.push(
              new Movie(
                media.media.title,
                media.media.img,
                media.media.rating,
                media.media.releaseDate,
                media.media.director,
                media.media.leadActor,
                media.media.duration,
                media.media.plot
              )
            );
            break;
          case "Album":
            this.medias.push(
              new Album(
                media.media.title,
                media.media.img,
                media.media.rating,
                media.media.releaseDate,
                media.media.band,
                media.media.nbTracks
              )
            );
            break;
          default:
            break;
        }
      });
    }
  }
}

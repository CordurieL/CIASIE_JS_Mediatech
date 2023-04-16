// Classe liant collections et médias à l'affichage

import { Album } from "./models/album.js";
import { Game } from "./models/game.js";
import { Movie } from "./models/movie.js";
import { Collection } from "./models/collection.js";

export class DisplayMedias {
  /**
   * Constructeur de la classe DisplayMedias
   * @param {object} collection - La collection à afficher
   */
  constructor(collection) {
    this.collection = collection;
  }

  /**
   * Fonction qui rend une icône selon l'instance du media
   * @param {string} media - Le media
   * @return {string} - L'icône correspondante
   */
  getIcon(media) {
    let iconHtml = "<i class='bi ";
    if (media instanceof Album) {
      iconHtml += "bi-music-note-beamed";
    } else if (media instanceof Game) {
      iconHtml += "bi-controller";
    } else if (media instanceof Movie) {
      iconHtml += "bi-film";
    } else {
      iconHtml += "bi-question-circle";
    }
    iconHtml += " me-2'></i>";
    return iconHtml;
  }

  /**
   * Fonction qui rend une date exploitable au format 'd MMM yyyy' (1 Jan 2023)
   * @param {string} date - La date à traiter
   * @return {string} - La date au format 'd MMMM yyyy' (1 Jan 2023)
   * */
  formatDate(date) {
    let dateObj = new Date(date);
    let day = dateObj.getDate();
    let month = dateObj.toLocaleString("default", { month: "short" });
    let year = dateObj.getFullYear();
    return day + " " + month + " " + year;
  }

  /**
   * Fonction qui affiche la notation du media sur 5 étoiles
   * @param {number} rating - La notation du media sur 100
   * @return {string} - La notation du media
   */
  mediaRating(rating) {
    let ratingHtml =
      "<div class='d-flex justify-content-center small text-warning mb-2' title='" +
      rating +
      "%'>";
    let ratingStars = Math.floor(rating / 20);
    let ratingHalfStars = Math.floor((rating % 20) / 10);
    let ratingEmptyStars = 5 - ratingStars - ratingHalfStars;
    for (let i = 0; i < ratingStars; i++) {
      ratingHtml += "<div class='bi-star-fill'></div>";
    }
    for (let i = 0; i < ratingHalfStars; i++) {
      ratingHtml += "<div class='bi-star-half'></div>";
    }
    for (let i = 0; i < ratingEmptyStars; i++) {
      ratingHtml += "<div class='bi-star'></div>";
    }
    ratingHtml += "</div>";
    return ratingHtml;
  }

  /**
   * Fonction qui affiche un élément
   * @param {object} media - L'élément à afficher
   * @return {string} - L'élément au format HTML
   */
  getMediaHtml(media) {
    let mediaElement = "";

    // Divs qui englobent le media, gère taille et position
    mediaElement +=
      "<div data-id='" + media.id + "' class='mediaItem col mb-3'>";
    mediaElement += "<div class='card h-100'>";

    // Image du media
    mediaElement +=
      "<img src='" +
      media.img +
      "' class='card-img-top' alt='" +
      media.title +
      " cover'>";

    // Div du contenu du media
    mediaElement += "<div class='card-body p-3'>";

    // Titre du media avec icône
    mediaElement +=
      "<h5 class='text-center fw-bolder'>" +
      this.getIcon(media) +
      "</i>" +
      media.title +
      "</h5>";

    // Date de sortie
    mediaElement +=
      "<p class='text-center text-muted small'>Release date: " +
      this.formatDate(media.releaseDate) +
      "</p>";

    // Description du media
    mediaElement +=
      "<p class='cardDescr mb-0 small'>" + media.getDescr() + "</p>";

    // Fin de la div du contenu du media
    mediaElement += "</div>";

    // Séparateur
    mediaElement += "<hr class='my-3 mx-2'>";

    // Div notation du media
    mediaElement +=
      "<div class='d-flex justify-content-center small text-warning mb-3 border-top-0 '>";
    mediaElement += this.mediaRating(media.rating);
    mediaElement += "</div>";

    // Div des boutons
    mediaElement +=
      "<div class='card-footer p-3 pt-0 border-top-0 bg-transparent d-flex justify-content-between'>";

    // Bouton d'édition
    mediaElement +=
      "<div class='text-center w-50'><a data-id='" +
      media.id +
      "'class='editButton btn btn-outline-dark mt-auto' href='#'>Edit</a></div>";

    // Bouton de suppression
    mediaElement +=
      "<div class='text-center w-50'><a class='removeButton btn btn-outline-dark mt-auto' href='#'>Remove</a></div>";

    // Fin de la div des boutons
    mediaElement += "</div>";

    // Fin de la div qui englobe le media
    mediaElement += "</div>";
    mediaElement += "</div>";

    return mediaElement;
  }

  /**
   * Fonction qui permet d'afficher les informations dans la modal du média que l'on veut edit
   * @param {int} id: id du media
   * @return {void}
   */
  displayMediaInfoInEdit(id) {
    // recupérer media d'id id
    let media;
    this.collection.medias.forEach((elem) => {
      if (elem.id == id) {
        media = elem;
      }
    });
    // Set l'id du media dans le bouton de submit
    document.getElementById("submitEdit").dataset.id = id;

    document.getElementById("editMediaTitle").value = media.title;
    document.getElementById("editMediaReleaseDate").value = media.releaseDate;
    // préremplissage de la note
    switch (media.rating / 20) {
      case 1:
        document.getElementById("editStar1").checked = true;
        break;
      case 2:
        document.getElementById("editStar2").checked = true;
        break;
      case 3:
        document.getElementById("editStar3").checked = true;
        break;
      case 4:
        document.getElementById("editStar4").checked = true;
        break;
      case 5:
        document.getElementById("editStar5").checked = true;
        break;
    }
    document.getElementById("editMediaImageLink").value = media.img;
    if (media instanceof Album) {
      // On affiche seulement les champs qui concerne les albums
      document.getElementById("editSpecificInfoAlbums").style.display = "block";
      document.getElementById("editSpecificInfoGames").style.display = "none";
      document.getElementById("editSpecificInfoMovies").style.display = "none";
      // On préremplit les champs
      document.getElementById("editAlbumBand").value = media.band;
      document.getElementById("editAlbumNbTracks").value = media.nbTracks;
      // Set le type de media dans le bouton de submit
      document.getElementById("submitEdit").dataset.type = "album";
    } else if (media instanceof Game) {
      // On affiche seulement les champs qui concerne les games
      document.getElementById("editSpecificInfoAlbums").style.display = "none";
      document.getElementById("editSpecificInfoGames").style.display = "block";
      document.getElementById("editSpecificInfoMovies").style.display = "none";
      // On préremplit les champs
      document.getElementById("editGameStudio").value = media.studio;
      document.getElementById("editGameNbPlayers").value = media.nbPlayers;
      document.getElementById("editGamePlot").value = media.plot;
      // Set le type de media dans le bouton de submit
      document.getElementById("submitEdit").dataset.type = "game";
    } else if (media instanceof Movie) {
      // On affiche seulement les champs qui concerne les movies
      document.getElementById("editSpecificInfoAlbums").style.display = "none";
      document.getElementById("editSpecificInfoGames").style.display = "none";
      document.getElementById("editSpecificInfoMovies").style.display = "block";
      // On préremplit les champs
      document.getElementById("editMovieDirector").value = media.director;
      document.getElementById("editMovieLeadActor").value = media.leadActor;
      document.getElementById("editMovieDuration").value = media.duration;
      document.getElementById("editMoviePlot").value = media.plot;
      // Set le type de media dans le bouton de submit
      document.getElementById("submitEdit").dataset.type = "movie";
    }
  }

  /**
   * Fonction d'édition d'un media
   * @param {object} event - L'événement
   * @return {void}
   */
  editMedia() {
    let submit = document.getElementById("submitEdit");
    let id = submit.dataset.id;
    let type = submit.dataset.type;
    let media;
    this.collection.medias.forEach((elem) => {
      if (elem.id == id) {
        media = elem;
      }
    });
    let title = document.getElementById("editMediaTitle").value;
    if (title === undefined) {
      title = ""
    }
    let releaseDate = document.getElementById("editMediaReleaseDate").value;
    let rating = document.querySelector(
      'input[name="editMediaRating"]:checked'
    );
    if (rating === null) {
      rating = 0;
    } else {
      rating = rating.value;
    }
    let image = document.getElementById("editMediaImageLink").value;
    // Remplace les infos générals du média par les nouvelles value
    media.title = title;
    media.releaseDate = releaseDate;
    media.rating = rating * 20;
    media.img = image;
    switch (type) {
      case "album":
        let band = document.getElementById("editAlbumBand").value;
        let nbTracks = document.getElementById("editAlbumNbTracks").value;
        // Remplace les infos spécifiques à un album par les nouvelles value
        media.band = band;
        media.nbTracks = nbTracks;
        break;
      case "game":
        let studio = document.getElementById("editGameStudio").value;
        let nbPlayers = document.getElementById("editGameNbPlayers").value;
        let gamePlot = document.getElementById("editGamePlot").value;
        // Remplace les infos spécifiques à un jeu par les nouvelles value
        media.studio = studio;
        media.nbPlayers = nbPlayers;
        media.plot = gamePlot;
        break;
      case "movie":
        let director = document.getElementById("editMovieDirector").value;
        let leadActor = document.getElementById("editMovieLeadActor").value;
        let duration = document.getElementById("editMovieDuration").value;
        let moviePlot = document.getElementById("editMoviePlot").value;
        // Remplace les infos spécifiques à un film par les nouvelles value
        media.director = director;
        media.leadActor = leadActor;
        media.duration = duration;
        media.plot = moviePlot;
        break;
    }
    this.collection.save();
    this.collection.filter("all");
  }

  /**
   * Fonction de suppression d'un media
   * @param {object} event - L'événement
   * @return {void}
   */
  removeMediaFromDisplay(event) {
    let mediaId = event.target.closest(".mediaItem").dataset.id;
    event.target.closest(".mediaItem").remove();
    this.collection.removeMedia(mediaId);
  }
  /**
   * Fonction qui permet de créer un média
   * @param {void}
   * @return {void}
   */
  createMedia() {
    let type = document.getElementById("mediaType").value;
    let media;
    let title = document.getElementById("mediaTitle").value;
    if (title === undefined) {
      title = ""
    }
    let releaseDate = document.getElementById("mediaReleaseDate").value;
    let rating = document.querySelector('input[name="mediaRating"]:checked');
    if (rating === null) {
      rating = 0;
    } else {
      rating = rating.value;
    }
    let image = document.getElementById("mediaImageLink").value;
    switch (type) {
      case "album":
        let nbTracks = document.getElementById("albumNbTracks").value;
        let band = document.getElementById("albumBand").value;
        media = new Album(
          title,
          image,
          rating * 20,
          releaseDate,
          band,
          nbTracks
        );
        break;
      case "game":
        let studio = document.getElementById("gameStudio").value;
        let nbPlayers = document.getElementById("gameNbPlayers").value;
        let gamePlot = document.getElementById("gamePlot").value;
        media = new Game(
          title,
          image,
          rating * 20,
          releaseDate,
          studio,
          nbPlayers,
          gamePlot
        );
        break;
      case "movie":
        let director = document.getElementById("movieDirector").value;
        let leadActor = document.getElementById("movieLeadActor").value;
        let duration = document.getElementById("movieDuration").value;
        let moviePlot = document.getElementById("moviePlot").value;
        media = new Movie(
          title,
          image,
          rating * 20,
          releaseDate,
          director,
          leadActor,
          duration,
          moviePlot
        );
        break;
    }
    if (media != undefined) {
      this.addMediaToDisplay(media);
      this.collection.filter("all");
    }
  }

  /**
   * Fonction d'ajout d'un media
   * @param {object} media - Le media à ajouter
   * @return {void}
   */
  addMediaToDisplay(media) {
    // Ajout du media à la collection et affichage
    let mediaElement = this.getMediaHtml(media);
    let mediaContainer = document.querySelector("#mediaContainer");
    mediaContainer.insertAdjacentHTML("beforeend", mediaElement);
    this.collection.addMedia(media);
    // Ajout des listeners sur les boutons d'édition et de suppression
    let mediaElementInserted = document.querySelector(
      `[data-id="${media.id}"]`
    );
    mediaElementInserted
      .querySelector(".editButton")
      .addEventListener("click", (event) => {
        document.getElementById("editMediaModal").style.display = "block";
        this.displayMediaInfoInEdit(event.target.dataset.id);
      });
    mediaElementInserted
      .querySelector(".removeButton")
      .addEventListener("click", (event) => removeMediaFromDisplay(event));
  }

  /**
   * Méthode qui restaure une collection de médias
   * @return {void}
   */
  restoreMedias() {
    // Restoration de la collection
    let medias = this.collection.medias;
    let restoredHtml = "";
    medias.forEach((media) => {
      restoredHtml += this.getMediaHtml(media);
    });
    document.getElementById("mediaContainer").innerHTML = restoredHtml;

    // Ajout des listeners sur tous les boutons d'édition et de suppression
    let editButtons = document.getElementsByClassName("editButton");
    for (let i = 0; i < editButtons.length; i++) {
      editButtons[i].addEventListener("click", (event) => {
        document.getElementById("editMediaModal").style.display = "block";
        this.displayMediaInfoInEdit(event.target.dataset.id);
      });
    }

    let removeButtons = document.getElementsByClassName("removeButton");
    for (let i = 0; i < removeButtons.length; i++) {
      removeButtons[i].addEventListener("click", (event) =>
        this.removeMediaFromDisplay(event)
      );
    }
  }
  /**
   * Envoie une Requête XHR
   * @param {string} urlSend = URL ou route de l'API
   * @return {promise}
   */
  sendXhrPromise(urlSend) {
    return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", urlSend);
      xhr.responseType = "json";
      xhr.send();
      xhr.addEventListener("load", function (reponse) {
        if (reponse.target.response.hasOwnProperty("Error")) {
          reject(reponse);
        } else {
          resolve(reponse);
        }
      });
      xhr.addEventListener("error", function (reponse) {
        reject(reponse);
      });
    });
  }

  /**
   * Affiche ce qu'il faut en fonction de la réponse de la promise
   * @param {void}
   * @return {void}
   */
  displayPromiseResponse() {
    let title = document.getElementById("searchBar").value;
    let url = "https://www.omdbapi.com/?apikey=32605651&t=" + title;
    this.sendXhrPromise(url)
      .then((data) => {
        let info = data.target.response;
        let dateToConvert = new Date(info.Released).toLocaleDateString("fr");
        let date = dateToConvert.slice(6) + "-";
        if (dateToConvert.slice(4, 6).includes("/")) {
          date += "0" + dateToConvert.slice(4, 5);
        } else {
          date += dateToConvert.slice(4, 6);
        }
        date += "-" + dateToConvert.slice(0, 2);
        let movie = new Movie(
          info.Title,
          info.Poster,
          0,
          date,
          info.Director,
          info.Actors,
          parseInt(info.Runtime.slice(0, -4)),
          info.Plot
        );
        this.addMediaToDisplay(movie);
        this.collection.filter("all");
        document.getElementById("addMovieFromApiModal").style.display = "none";
        document.getElementById("editMediaModal").style.display = "block";
        this.displayMediaInfoInEdit(movie.id);
        document.getElementById("searchBar").value = "";
        document.getElementById("textError").innerHTML = "";
      })
      .catch(function (data) {
        document.getElementById("textError").innerHTML =
          "<b>" + title + " n'existe pas dans la database</b>";
      });
    document.getElementById("searchBar").value = "";
    document.getElementById("addMovieFromApi").style.display = "none";
    document.getElementById("specificInfoMovies").style.display = "none";
    document.getElementById("specificInfoAlbums").style.display = "block";
  }
}

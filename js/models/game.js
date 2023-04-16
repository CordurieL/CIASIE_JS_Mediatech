// Objet Jeu héritant de Media

import { Media } from "../models/media.js";

export class Game extends Media {
  /**
   * Constructeur de la classe Game
   * @param {string} title - titre du jeu
   * @param {string} img - url de l'image
   * @param {number} rating - note sur 100
   * @param {date} releaseDate - date de sortie
   * @param {string} studio - studio de développement
   * @param {number} nbPlayers - nombre de joueurs
   * @param {string} plot - synopsis
   */
  constructor(title, img, rating, releaseDate, studio, nbPlayers, plot) {
    super(title, img, rating, releaseDate);
    this.studio = studio;
    this.nbPlayers = nbPlayers;
    this.plot = plot;
  }

  /**
   * Fonction qui retourne la description du jeu
   * @returns {string} description du jeu
   * */
  getDescr() {
    return (
      "By <b>" +
      this.studio +
      "</b>, for <b>" +
      this.nbPlayers +
      "</b> players.<br><br>" +
      this.plot
    );
  }
}

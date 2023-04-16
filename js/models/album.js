// Objet Album héritant de Media

import { Media } from "../models/media.js";

export class Album extends Media {
  /**
   * Constructeur de la classe Album
   * @param {string} title - titre de l'album
   * @param {string} img - url de l'image
   * @param {number} rating - note sur 100
   * @param {date} releaseDate - date de sortie
   * @param {string} band - groupe
   * @param {number} nbTracks - nombre de pistes
   */
  constructor(title, img, rating, releaseDate, band, nbTracks) {
    super(title, img, rating, releaseDate);
    this.band = band;
    this.nbTracks = nbTracks;
  }

  /**
   * Fonction qui retourne la description de l'album
   * @returns {string} description de l'album
   */
  getDescr() {
    return "By <b>" + this.band + "</b>, contains <b>" + this.nbTracks + "</b> tracks."
  }
}

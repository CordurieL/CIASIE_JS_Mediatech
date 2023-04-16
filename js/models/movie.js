// Objet Film héritant de Media

import { Media } from "../models/media.js";

export class Movie extends Media {
  /**
   * Constructeur de la classe Movie
   * @param {string} title - titre du film
   * @param {string} img - url de l'image
   * @param {number} rating - note sur 100
   * @param {date} releaseDate - date de sortie
   * @param {string} director - réalisateur
   * @param {string} leadActor - acteurs
   * @param {number} duration - durée en minutes
   * @param {string} plot - synopsis
   */
  constructor(
    title,
    img,
    rating,
    releaseDate,
    director,
    leadActor,
    duration,
    plot
  ) {
    super(title, img, rating, releaseDate);
    this.director = director;
    this.leadActor = leadActor;
    this.duration = duration;
    this.plot = plot;
  }

  /**
   * Fonction qui retourne la description du film
   * @returns {string} description du film
   */
  getDescr() {
    return (
      "By <b>" +
      this.director +
      "</b>, starring <b>" +
      this.leadActor +
      "</b>. <i>" +
      this.duration +
      " minutes.</i><br><br>" +
      this.plot
    );
  }
}

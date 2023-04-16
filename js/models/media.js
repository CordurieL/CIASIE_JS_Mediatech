// Objet Média

export class Media {
  /**
   * Constructeur de la classe Media
   * @param {number} id - id du média
   * @param {string} title - titre du média
   * @param {string} img - url de l'image
   * @param {number} rating - note sur 100
   * @param {date} releaseDate - date de sortie
   */
  constructor(title, img, rating, releaseDate) {
    this.id = Math.floor(Math.random() * 10000000000);
    this.title = title;
    this.img = img;
    this.rating = rating;
    this.releaseDate = releaseDate;
  }

  /**
   * Fonction à redéfinir dans les classes filles
   */
  getDescr() {}
}

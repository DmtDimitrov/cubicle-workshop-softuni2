const uniqid = require('uniqid');

class Cube {
    static #cubes = [
        {
            id: '1kjfpki8ku3y36z3',
            name: 'Rubic Cube',
            description: 'Classic Cube',
            imageUrl: 'https://6lli539m39y3hpkelqsm3c2fg-wpengine.netdna-ssl.com/wp-content/uploads/2018/07/Rubiks_Cube_shutterstock_271810067.jpg',
            difficultyLevel: '3'
          },
          {
            id: '1kjfplmgku3z4tuz',
            name: 'Megaminx',
            description: ' Dodecahedron Magic Cube',
            imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/61HpQqVQ37L._SY355_.jpg',
            difficultyLevel: '3'
          },
          {
            id: '1kjfp23cku3z6dyt',
            name: 'Pyraminx',
            description: 'The Pyraminx puzzle is a 42-year-old brain teaser that has delighted puzzle lovers for decades. The latest iteration by Meffert’s contains all the fun and challenge of the original. 3.5” Tall.',  
            imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/61izOzq%2BBAL._SY355_.jpg',
            difficultyLevel: '1'
          }
    ];
    constructor(name, description, imageUrl, difficultyLevel) {
        this.id = uniqid();
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.difficultyLevel = difficultyLevel;
    }
    static get cubes() {
        return Cube.#cubes.slice();
    }

    static add(cube) {
        Cube.#cubes.push(cube)
    }
}

module.exports = Cube;
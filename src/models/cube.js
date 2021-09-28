const uniqid = require('uniqid');

class Cube {
    static #cubes = [
        {
            id: '1kjfpki8ku3y36z3',
            name: 'Rubic Cube',
            description: 'Classic Cube',
            imageUrl: 'https://6lli539m39y3hpkelqsm3c2fg-wpengine.netdna-ssl.com/wp-content/uploads/2018/07/Rubiks_Cube_shutterstock_271810067.jpg',
            difficultyLevel: '3'
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
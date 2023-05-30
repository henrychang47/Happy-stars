class Grounds {
    constructor(scene) {
        this.scene = scene;
        this.platforms = this.scene.physics.add.staticGroup();
    }

    makeGrounds(x, y, n) {

        for (var i = 0; i < n; i++) {
            this.platforms.create(x + 49 * i, y, 'ground').setScale(.7).refreshBody();
        }

    }

}
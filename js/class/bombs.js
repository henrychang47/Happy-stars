class Bombs {
    constructor(scene) {
        this.scene = scene;
        this.bombs = scene.physics.add.group();

        scene.physics.add.collider(this.bombs, scene.grounds.platforms);
        scene.physics.add.overlap(scene.player, this.bombs, hitBombs, null, this);

        function hitBombs(player, bombs) {
            model.score -= 50;
            if (model.score < 0) {
                if (model.gameMode == 'C') {
                    //scene.scene.start("sceneOver");
                    this.scene.gameOver();
                } else if (model.gameMode == 'T') {
                    model.score = 0;
                }
            }
            scene.scoreBox.printScore(model.score);

            bombs.destroy();
            if (model.score > 0) {
                this.makeBombs();
            }
            this.scene.mediaMananger.playSound('hitBomb');

            if (this.tw) {
                this.tw.remove();
                player.alpha = 1;
            }

            this.tw = scene.tweens.add({
                targets: scene.player,
                alpha: 0,
                ease: 'Cubic.easeOut',
                duration: 100,
                repeat: 2,
                yoyo: true
            })

        }
    }


    makeBombs() {
        let scene = this.scene;
        let x = (scene.player.x < 500) ? Phaser.Math.Between(500, 1000) : Phaser.Math.Between(0, 500);
        let bomb = this.bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setScale(.5);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 30);
    }
}
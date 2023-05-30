class Targets {
    constructor(scene) {
        this.scene = scene;
        this.objects = this.scene.physics.add.group();
    }

    makeTargets(n) {
        let scene = this.scene;
        let type = ['star', 'heart'];
        let index;
        let gap = Math.floor(1024 / n);
        for (let i = 0; i < n; i++) {
            index = Math.floor(Math.random() * 10) > 1 ? 0 : 1;
            this.objects.create(40 + i * gap, 50, type[index]);
        }
        this.objects.children.iterate(function(child) {
            child.setBounce(Phaser.Math.FloatBetween(0.6, 0.8));
        })

        scene.physics.add.collider(scene.grounds.platforms, this.objects);
        scene.physics.add.overlap(scene.player, this.objects, getTarget, null, this);

        function getTarget(player, target) {
            if (target.texture.key[0] == 's') {
                model.score += 10;
                this.scene.mediaMananger.playSound('getStar');
            } else {
                model.score += 25;
                this.scene.mediaMananger.playSound('getHeart');
            }

            this.scene.scoreBox.printScore(model.score);
            target.destroy();
        }
    }


}
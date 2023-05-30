class sceneOver extends Phaser.Scene {
    constructor() {
        super('sceneOver');
    }
    preload() {
        this.load.image('background', 'assets/bg.png');
        this.load.image('finalScore', 'assets/finalScore.png');
        this.load.image("playAgain", "assets/playAgain.png");

    }
    create() {
        this.background = this.add.tileSprite(0, 0, 1024, 512, "background")
            .setOrigin(0)
            .setScrollFactor(0, 1);
        this.add.image(512, 100, 'finalScore');
        this.scorebox = new ScoreBox({
            scene: this,
            x: 512,
            y: 256,
            scale: 3,
            alignMid: true,
            score: model.highestScore
        });
        var playAgainButton = new FlatButton({
            scene: this,
            key: 'playAgain',
            scale: .8,
            x: 512,
            y: 400,
            event: 'playAgain'
        });
        emitter.on('playAgain', this.playAgain, this);
    }
    update() {
        this.background.tilePositionX += 1;
    }

    playAgain() {
        model.score = 0;
        model._highestScore = 0;
        //model._musicOn = true;
        //model._soundOn = true;
        model.gameMode = 'T';
        model.prepareStage = 1; // mode selection page
        //.timeLeft = 5;

        this.scene.start("sceneTitle");
    }
}
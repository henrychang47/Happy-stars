class sceneMain extends Phaser.Scene {

    constructor() {
        super('sceneMain');
    }

    preload() {
        this.load.audio('bgMusic', ['assets/sound/background.ogg', 'assets/sound/background.mp3']);
        this.load.audio('getStar', ['assets/sound/getStar.ogg', 'assets/sound/getStar.mp3']);
        this.load.audio('getHeart', ['assets/sound/treasure.ogg', 'assets/sound/treasure.mp3']);
        this.load.audio('hitBomb', ['assets/sound/hitBomb.ogg', 'assets/sound/hitBomb.mp3']);
        this.load.audio('quick_jump', ['assets/sound/quick_jump.ogg', 'assets/sound/quick_jump.mp3']);
        this.load.image('ground', 'assets/grass.png');
        this.load.image('bg', 'assets/bg.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.image('heart', 'assets/heart.png');
        this.load.image('pause_icon', 'assets/pause_icon.png');
        this.load.image('play_icon', 'assets/play_icon.png');
        this.load.spritesheet('player', 'assets/player/' + model.playerPick + '_spritesheet.png', {
            frameWidth: 72,
            frameHeight: 98
        });
        this.load.image('player_front', 'assets/player/' + model.playerPick + '_front.png');
        this.load.image('music_on', 'assets/music_on.png');
        this.load.image('music_off', 'assets/music_off.png');
        this.load.image('sound_on', 'assets/sfx_on.png');
        this.load.image('sound_off', 'assets/sfx_off.png');
        this.load.image('timer', 'assets/timer.png');

        for (let i = 0; i <= 9; i++) {
            let numKey = 'num_' + i.toString();
            this.load.image(numKey, 'assets/numbers/' + numKey + '.png');
        }

    }
    create() {
        this.add.image(512, 256, 'bg');
        const grounds = new Grounds(this);
        this.grounds = grounds;
        grounds.makeGrounds(25, 487, 21);
        grounds.makeGrounds(690, 215, 5);
        grounds.makeGrounds(330, 340, 5);
        grounds.makeGrounds(25, 220, 4);

        this.player = this.physics.add.sprite(450, 350, 'player').setScale(.7);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, grounds.platforms);
        this.physics.add.collider(this.player, grounds.movings);


        this.pauseButton = new FlatButton({
            scene: this,
            key: 'pause_icon',
            scale: .0625,
            x: 40,
            y: 40,
            visible: true,
            event: 'physicsPause'
        });
        this.resumeButton = new FlatButton({
            scene: this,
            key: 'play_icon',
            scale: .0625,
            x: 40,
            y: 40,
            visible: false,
            event: 'physicsResume'
        });

        this.musicOffButton = new FlatButton({
            scene: this,
            key: 'music_off',
            scale: .35,
            x: 100,
            y: 40,
            visible: model.musicOn ? false : true,
            event: 'toggleMusic'
        });
        this.musicOnButton = new FlatButton({
            scene: this,
            key: 'music_on',
            scale: .35,
            x: 100,
            y: 40,
            visible: model.musicOn ? true : false,
            event: 'toggleMusic'
        });
        this.soundOffButton = new FlatButton({
            scene: this,
            key: 'sound_off',
            scale: .35,
            x: 160,
            y: 40,
            visible: model.soundOn ? false : true,
            event: 'toggleSound'
        });
        this.soundOnButton = new FlatButton({
            scene: this,
            key: 'sound_on',
            scale: .35,
            x: 160,
            y: 40,
            visible: model.soundOn ? true : false,
            event: 'toggleSound'
        });

        if (model.gameMode == 'T') {
            this.timeBox = new TimeBox({
                scene: this,
                x: 550,
                y: 30
            });
        }

        this.scoreBox = new ScoreBox({ scene: this, x: 1000, y: 30 });
        this.targets = new Targets(this);
        this.targets.makeTargets(7);
        this.bombs = new Bombs(this);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', {
                start: 7,
                end: 11,
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', {
                start: 7,
                end: 11
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{
                key: 'player_front'

            }],
            frameRate: 10,
            repeat: -1
        });
        this.cursors = this.input.keyboard.createCursorKeys();

        this.mediaMananger = new MediaManager({ scene: this });
        this.mediaMananger.setBackgroundMusic('bgMusic');
    }
    update() {

        if (this.cursors.right.isDown) {
            this.player.setVelocityX(200);
            this.player.flipX = false;
            this.player.anims.play('right', true);
        } else if (this.cursors.left.isDown) {
            this.player.setVelocityX(-200);
            this.player.flipX = true;
            this.player.anims.play('left', true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-300);
            this.mediaMananger.playSound('quick_jump');
        }
        if (this.targets.objects.countActive(true) == 0) {
            this.targets.makeTargets(10);
            this.bombs.makeBombs();
        }
    }
    gameOver() {
        this.sound.stopAll();
        this.scene.start('sceneOver');
    }
}
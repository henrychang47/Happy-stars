class sceneTitle extends Phaser.Scene {
    constructor() {
        super('sceneTitle');

    }
    preload() {
        this.load.image('background', 'assets/bg.png');
        this.load.image("startgame", "assets/startgame.png");
        this.load.image('start', 'assets/start.png');
        this.load.image('title', 'assets/title.png');
        this.load.image('challenge_mode', 'assets/challenge_mode.png');
        this.load.image('time_mode', 'assets/time_mode.png');
        this.load.image('back', 'assets/back.png');
        this.load.spritesheet('player1', 'assets/player/p1_spritesheet.png', {
            frameWidth: 72,
            frameHeight: 98
        });
        this.load.image('player1_front', 'assets/player/p1_front.png');
        this.load.spritesheet('player2', 'assets/player/p2_spritesheet.png', {
            frameWidth: 72,
            frameHeight: 98
        });
        this.load.image('player2_front', 'assets/player/p2_front.png');
    }
    create() {
        this.background = this.add.tileSprite(0, 0, 1024, 512, "background")
            .setOrigin(0)
            .setScrollFactor(0, 1);

        this.player1 = this.add.sprite(780, 380, 'player1').setScale(1.5).setInteractive();
        this.anims.create({
            key: 'keepwalking',
            frames: this.anims.generateFrameNumbers('player1', {
                start: 7,
                end: 11
            }),
            frameRate: 10,
            repeat: -1
        });
        this.player1.on('pointerup', function(pointer) {
            model.playerPick = 'p1';
            emitter.emit('changepick1');
        });

        this.player2 = this.add.sprite(244, 380, 'player2').setScale(1.5).setInteractive().setAlpha(.5);
        this.anims.create({
            key: 'keepwalking2',
            frames: this.anims.generateFrameNumbers('player2', {
                start: 7,
                end: 11
            }),
            frameRate: 10,
            repeat: -1
        });
        this.player2.on('pointerdown', function(pointer) {
            model.playerPick = 'p2';
            emitter.emit('changepick2');
        });
        this.title = this.add.image(512, 150, 'title').setScale(.7);
        this.startBtn = new FlatButton({
            scene: this,
            key: 'start',
            text: '',
            scale: .5,
            x: 512,
            y: 400,
            event: 'startBtn_pressed'
        });

        this.challengeModeBtn = new FlatButton({
            scene: this,
            key: 'challenge_mode',
            scale: 1,
            x: 260,
            y: 200,
            visible: false,
            event: 'CMode_play'
        });


        this.timeModeBtn = new FlatButton({
            scene: this,
            key: 'time_mode',
            scale: 1,
            x: 764,
            y: 200,
            visible: false,
            event: 'TMode_play'
        });

        this.backBtn = new FlatButton({
            scene: this,
            key: 'back',
            scale: .8,
            x: 512,
            y: 400,
            visible: false,
            event: 'backBtn_pressed'
        });

        this.backBtn2 = new FlatButton({
            scene: this,
            key: 'back',
            scale: .8,
            x: 312,
            y: 400,
            visible: false,
            event: 'backBtn2_pressed'
        });
        this.startBtn2 = new FlatButton({
            scene: this,
            key: 'start',
            text: '',
            scale: .5,
            x: 712,
            y: 400,
            event: 'startBtn2_pressed'
        });

        emitter.on('startBtn_pressed', this.start, this);
        emitter.on('backBtn_pressed', this.back, this);
        emitter.on('startBtn2_pressed', this.start2, this);
        emitter.on('backBtn2_pressed', this.back2, this);
        emitter.on('CMode_play', this.start_CMode, this);
        emitter.on('TMode_play', this.start_TMode, this);
        emitter.on('changepick1', this.changePick1, this);
        emitter.on('changepick2', this.changePick2, this);

        this.ask = this.add.text(10, 10, 'Please enter the time(s):', { font: '64px Courier', fill: '#000000' });;
        this.textEntry = this.add.text(10, 150, '', { font: '64px Courier', fill: '#000000' });;

        var textEntry = this.textEntry;
        this.input.keyboard.on('keydown', function(event) {

            if (event.keyCode === 8 && textEntry.text.length > 0) {
                textEntry.text = textEntry.text.substr(0, textEntry.text.length - 1);
            } else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode <= 57)) {
                textEntry.text += event.key;
            }
        });

        this.stagesList = [
            { key: this.title, stage: 0 },
            { key: this.startBtn.back, stage: 0 },
            { key: this.challengeModeBtn.back, stage: 1 },
            { key: this.timeModeBtn.back, stage: 1 },
            { key: this.backBtn.back, stage: 1 },
            { key: this.backBtn2.back, stage: 2 },
            { key: this.startBtn2.back, stage: 2 },
            { key: this.ask, stage: 2 },
            { key: this.textEntry, stage: 2 },
            { key: this.player1, stage: 0 },
            { key: this.player2, stage: 0 }
        ];

        this.switchDisplay();

    }
    update() {
        this.background.tilePositionX += 1;
        this.player1.anims.play('keepwalking', true);
        this.player2.anims.play('keepwalking2', true);
    }

    changePick1() {
        this.player2.setAlpha(0.5);
        this.player1.clearAlpha();
    }
    changePick2() {
        this.player1.setAlpha(0.5);
        this.player2.clearAlpha();
    }

    start2() {
        model.timeLeft = parseInt(this.textEntry.text);
        if (model.timeLeft > 0) {
            this.scene.start('sceneMain');
        }
    }
    back2() {
        this.textEntry.text = '';
        model.prepareStage = 1;
        this.switchDisplay();
    }

    start_TMode() {
        model.gameMode = 'T';
        model.prepareStage = 2;
        this.switchDisplay();
    }
    start_CMode() {
        model.gameMode = 'C';
        this.scene.start("sceneMain");
    }
    start() {
        model.prepareStage = 1;
        this.switchDisplay();
    }
    back() {
        model.prepareStage = 0;
        this.switchDisplay();
    }

    switchDisplay() {
        this.stagesList.forEach(
            function(Element) {
                if (Element.stage == model.prepareStage) {
                    Element.key.visible = true;
                } else {
                    Element.key.visible = false;
                }
            }
        );
    }
}
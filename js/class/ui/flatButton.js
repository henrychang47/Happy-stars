class FlatButton extends Phaser.GameObjects.Container {
    constructor(config) {
        if (!config.scene) {
            console.log("missing scene!");
            return;
        }
        if (!config.key) {
            console.log("missing key");
            return;
        }


        super(config.scene);
        this.config = config;

        this.scene = config.scene;
        this.back = this.scene.add.image(0, 0, config.key);

        this.add(this.back);

        if (config.text) {
            this.text1 = this.scene.add.text(0, 0, config.text);
            this.text1.setOrigin(0.5, 0.5);
            this.add(this.text1);
        }
        if (config.x) {
            this.x = config.x;
        }
        if (config.y) {
            this.y = config.y;
        }
        if (config.scale) {
            this.back.setScale(config.scale);
        } else {
            config.scale = 1;
        }
        if (config.visible == false) {
            this.back.visible = false;
        }
        if (config.event) {
            this.back.setInteractive();
            this.back.on('pointerup', this.pressed, this);
            this.back.on('pointerover', this.over, this);
            this.back.on('pointerout', this.out, this);
        }

        this.scene.add.existing(this);

    }

    pressed() {
        emitter.emit(this.config.event, this.config.scene);
    }

    over() {
        this.back.setScale(this.config.scale * 1.2);
    }

    out() {
        this.back.setScale(this.config.scale);
    }
}
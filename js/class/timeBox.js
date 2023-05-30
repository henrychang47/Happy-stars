class TimeBox {
    constructor(config) {
        this.scene = config.scene;
        this.x = config.x;
        this.y = config.y;
        this.time_nums = [];

        let length = model.timeLeft.toString().length;
        this.scene.add.image(this.x - 30 * length, this.y, 'timer').setScale(.08);

        this.printTimeLeft(model.timeLeft);

        this.scene.timer = this.scene.time.addEvent({
            delay: 1000, // ms
            callback: function() {
                if (model.timeLeft == 0) {
                    this.scene.gameOver();
                    //this.scene.scene.start('sceneOver');
                } else {
                    model.timeLeft--;
                    this.printTimeLeft(model.timeLeft);
                }
            },
            loop: true,
            callbackScope: this
        });

    }
    printTimeLeft(time) {

        let str = time.toString();
        let length = str.length;
        this.time_nums.forEach(Element => Element.destroy());

        for (let i = 0; i < length; i++) {
            let num = str[length - i - 1];
            this.time_nums.push(this.scene.add.image(this.x - 30 * i, this.y, 'num_' + num));
        }

    }

}
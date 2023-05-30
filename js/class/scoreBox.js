class ScoreBox {
    constructor(config) {
        this.scene = config.scene;
        this.x = config.x;
        this.y = config.y;
        this.score_nums = [];
        this.scale = config.scale;
        this.alignMid = config.alignMid;
        if (!config.score) {
            this.score = 0;
        } else {
            this.score = config.score;
        }
        if (!config.scale) {
            this.scale = 1;
        }
        this.printScore(this.score);
    }
    printScore(score) {

        let str = score.toString();
        let length = str.length;
        let gap = 0;

        this.score_nums.forEach(Element => Element.destroy());

        for (let i = 0; i < length; i++) {
            let num = str[length - i - 1];
            this.score_nums.push(this.scene.add.image(this.x - 30 * i * this.scale, this.y, 'num_' + num));
        }
        if (this.alignMid == true) {
            gap = 512 - this.score_nums[Math.floor(length / 2)].x;
        }
        this.score_nums.forEach(Element => {
            Element.setScale(this.scale);
            Element.x += gap;
        });

    }

}
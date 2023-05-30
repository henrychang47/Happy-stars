class Model {
    constructor() {
        this._score = 0;
        this._highestScore = 0;
        this._musicOn = true;
        this._soundOn = true;
        this.gameMode;
        this.prepareStage = 0;
        this.timeLeft = 3;
        this.playerPick = 'p1';
    }

    set score(val) {
        this._score = val;
        if (val > this._highestScore) {
            this._highestScore = val;
        }
    }
    get score() {
        return this._score;
    }

    get highestScore() {
        return this._highestScore;
    }

    set musicOn(val) {
        this._musicOn = val;
        emitter.emit(G.MUSIC_CHANGED);
    }
    get musicOn() {
        return this._musicOn;
    }

    set soundOn(val) {
        this._soundOn = val;
    }
    get soundOn() {
        return this._soundOn;
    }
}
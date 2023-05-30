class MediaManager {
    constructor(config) {
        this.scene = config.scene;
        emitter.on(G.MUSIC_CHANGED, this.musicChanged, this);
    }

    musicChanged() {
        if (this.background) {
            if (model.musicOn == false) {
                this.background.mute = true;
            } else {
                this.background.mute = false;
            }
        }
    }

    playSound(key) {
        if (model.soundOn == true) {
            var sound = this.scene.sound.add(key, { volume: .5 });
            sound.play();
        }
    }
    setBackgroundMusic(key) {
        this.background = this.scene.sound.add(key, { volume: .5, loop: true });
        this.background.play();
        if (model.musicOn == false) {
            this.background.mute = true;
        }
    }
}
class Controller {
    constructor() {
        emitter.on(G.PHYSICS_PAUSE, this.physicsPause);
        emitter.on(G.PHYSICS_RESUME, this.physicsResume);
        emitter.on(G.TOGGLE_MUSIC, this.toggleMusic);
        emitter.on(G.TOGGLE_SOUND, this.toggleSound);
    }
    toggleSound(scene) {
        //console.log('toggleMusic');
        if (model.soundOn == true) {
            model.soundOn = false;
            scene.soundOnButton.back.visible = false;
            scene.soundOffButton.back.visible = true;
        } else {
            model.soundOn = true;
            scene.soundOnButton.back.visible = true;
            scene.soundOffButton.back.visible = false;
        }
        //console.log(model.soundOn);
    }
    toggleMusic(scene) {
        //console.log('toggleMusic');

        if (model.musicOn == true) {
            model.musicOn = false;
            scene.musicOnButton.back.visible = false;
            scene.musicOffButton.back.visible = true;
        } else {
            model.musicOn = true;
            scene.musicOnButton.back.visible = true;
            scene.musicOffButton.back.visible = false;
        }
        //console.log(model.musicOn);
    }

    physicsPause(scene) {
        //console.log('physicsPause');
        scene.physics.pause();
        scene.pauseButton.back.visible = false;
        scene.resumeButton.back.visible = true;
        if (model.gameMode == 'T') {
            scene.timer.paused = true;
        }
    }
    physicsResume(scene) {
        //console.log('physicsResume');
        scene.physics.resume();
        scene.pauseButton.back.visible = true;
        scene.resumeButton.back.visible = false;
        if (model.gameMode == 'T') {
            scene.timer.paused = false;
        }
    }
}
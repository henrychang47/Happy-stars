var game;
var emitter;
var model;
var controller;
var G;
window.onload = function() {
    var config = {
        type: Phaser.AUTO,
        width: 1024,
        height: 512,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {
                    y: 300
                },
                debug: false
            }
        },
        parent: 'div-tag-name',
        scene: [sceneTitle, sceneMain, sceneOver]
    };

    G = new Constants();
    model = new Model();
    emitter = new Phaser.Events.EventEmitter();
    controller = new Controller();
    game = new Phaser.Game(config);
}
// Nathan Altice
// Layer Cake
// Created: 5/10/21
// Demonstrates Phaser 3 Layers and Layer properties

// I'm a good boy
'use strict';

let config = {
    type: Phaser.WEBL,
    width: 640,
    height: 640,
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true
        }
    },
    scene: [ TripleLayer ]
}

let game = new Phaser.Game(config);

const { height, width } = config;
const centerX = width / 2;
const centerY = height / 2;
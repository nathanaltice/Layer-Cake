class TripleLayer extends Phaser.Scene {
    constructor() {
        super('TripleLayer');
    }

    preload() {
        this.load.image('paddle', './assets/paddle.png');
        this.load.image('cross', './assets/cross.png');
    }

    // NOTE: Lots of unoptimized/redundant code b/c I was in a hurry :p
    create() {
        this.pVelocity = 50;

        // layer 1 objects
        this.p1 = this.physics.add.sprite(64, 128, 'paddle').setScale(4, 0.5);
        this.p1.tint = 0x00FF00;
        this.p1.setMaxVelocity(300, 300);
        this.p1.setCollideWorldBounds(true);
        this.p1.setDrag(200, 200);
        this.cross1 = this.add.sprite(centerX, centerY, 'cross');
        this.cross1.tint = 0x00FF00;
        // add 'em to the layer
        this.layer1 = this.add.layer();
        this.layer1.add([ this.p1, this.cross1 ]);
        this.layer1.setName('layer1');
        this.layer1.player = 'p1';

        // layer 2 objects
        this.p2 = this.physics.add.sprite(64, 128, 'paddle').setScale(4, 0.5);
        this.p2.tint = 0xFFFF00;
        this.p2.setMaxVelocity(300, 300);
        this.p2.setCollideWorldBounds(true);
        this.p2.setDrag(200, 200);
        this.cross2 = this.add.sprite(centerX, centerY, 'cross');
        this.cross2.tint = 0xFFFF00;
        // add 'em to the layer
        this.layer2 = this.add.layer();
        this.layer2.add([ this.p2, this.cross2 ]);
        this.layer2.setName('layer2');
        this.layer2.player = 'p2';

        // layer 3 objects
        this.p3 = this.physics.add.sprite(64, 128, 'paddle').setScale(4, 0.5);
        this.p3.tint = 0x00FFFF;
        this.p3.setMaxVelocity(300, 300);
        this.p3.setCollideWorldBounds(true);
        this.p3.setDrag(200, 200);
        this.cross3 = this.add.sprite(centerX, centerY, 'cross');
        this.cross3.tint = 0x00FFFF;
        // add 'em to the layer
        this.layer3 = this.add.layer();
        this.layer3.add([ this.p3, this.cross3 ]);
        this.layer3.setName('layer3');
        this.layer3.player = 'p3';

        // setup necessary keys
        this.cursors = this.input.keyboard.createCursorKeys();
        this.layerSwapKey = this.input.keyboard.addKey('D');

        // create layer queue
        this.layerCake = [ this.layer3, this.layer2, this.layer1 ];

        // set player control
        this.currentPlayer = 'p3';

        this.add.text(32, 32, 'Press D to swap layer depths');
    }

    shiftLayers(layerArray) {
        // shuffle front of array to back
        let tail = layerArray.pop();
        layerArray.unshift(tail);
        // set depth counter based on array size
        let depth = layerArray.length;
        // iterate through array to set depths
        for(let i in layerArray) {
            layerArray[i].setDepth(depth);
            depth--;
        }
        // set current player control
        this.currentPlayer = layerArray[0].player;
    }

    update() {
        if(this.cursors.up.isDown) {
            this[this.currentPlayer].body.velocity.y -= this.pVelocity;
        }
        if(this.cursors.down.isDown) {
            this[this.currentPlayer].body.velocity.y += this.pVelocity;
        }
        if(this.cursors.left.isDown) {
            this[this.currentPlayer].body.velocity.x -= this.pVelocity;
        }
        if(this.cursors.right.isDown) {
            this[this.currentPlayer].body.velocity.x += this.pVelocity;
        }

        // layer switching
        if(Phaser.Input.Keyboard.JustDown(this.layerSwapKey)) {
            this.shiftLayers(this.layerCake);
        }
    }
}
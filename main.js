let game = new Phaser.Game(400, 490, Phaser.CANVAS, 'gameDiv');
let spacefield

let spaceship;
let laser;
let laserTime = 0;
let fireButton;

let mainState = {
    preload: function() { 
        game.load.image('spaceship', 'assets/spaceship.png'); 
        game.load.image('space', 'assets/space.png');
    },

    create: function() { 
        spacefield = game.add.tileSprite(0,0, 800, 600, 'space')

        game.physics.startSystem(Phaser.Physics.ARCADE);

        spaceship = game.add.sprite(100, 245, 'spaceship');

        game.physics.arcade.enable(spaceship);


        spaceship.body.gravity.y = 1000;  


        let spaceKey = game.input.keyboard.addKey(
                        Phaser.Keyboard.SPACEBAR); 
        spaceKey.onDown.add(this.jump, this);     
    },

    update: function() {
        if (spaceship.y < 0 || spaceship.y > 490) this.restartGame();
        spacefield.tilePosition.x -= 2
        
    },

    jump: function() {
        spaceship.body.velocity.y = -350;
    },

    restartGame: function() {
        game.state.start('main');
    },
};



game.state.add('main', mainState); 

game.state.start('main');
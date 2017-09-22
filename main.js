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
        game.load.image('laser', 'assets/laser.png');
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


        laser = game.add.group(); 
        laser.enableBody = true; // allow us to use PHYSICS on laser
        laser.physicsBodyType = Phaser.Physics.ARCADE;
        laser.createMultiple(30, 'laser');
        // laser.setAll('anchor.x', 0.5);
        // laser.setAll('anchor.y', 1);
        laser.setAll('outOfBoundKill', true);
        laser.setAll('checkWorldBounds', true);  

        fireButton = game.input.activePointer
    },

    update: function() {
        if (spaceship.y < 0 || spaceship.y > 490) this.restartGame();
        spacefield.tilePosition.x -= 2;

        if(fireButton.isDown){
            fireLaser()
        }
        
    },

    jump: function() {
        spaceship.body.velocity.y = -350;
    },

    restartGame: function() {
        game.state.start('main');
    },
};

function fireLaser(){
    if(game.time.now > laserTime){
        lazer = laser.getFirstExists(false);
    }
    if(lazer){
        lazer.reset(spaceship.x + 55, spaceship.y + 20);
        lazer.body.velocity.x = 400; 
        laserTime = game.time.now + 200;
    }
}

game.state.add('main', mainState); 

game.state.start('main');
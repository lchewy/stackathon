let game = new Phaser.Game(600, 490, Phaser.CANVAS, 'gameDiv');
let spacefield

let spaceship;
let laser;
let laserTime = 0;
let fireButton;

let asteroid;
let timer;
// let boom; //

let score = 0;
let labelScore;

let mainState = {
    preload: function() { 
        game.load.image('spaceship', 'assets/spaceship.png'); 
        game.load.image('space', 'assets/space.png');
        game.load.image('laser', 'assets/laser.png');
        game.load.image('asteroid', 'assets/asteroid.png');
        // game.load.spritesheet('boom', 'assets/boom.png', 128,128) //
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
        laser.enableBody = true; 
        laser.physicsBodyType = Phaser.Physics.ARCADE;
        laser.createMultiple(30, 'laser');
        // laser.setAll('anchor.x', 0.5);
        // laser.setAll('anchor.y', 1);
        laser.setAll('outOfBoundKill', true);
        laser.setAll('checkWorldBounds', true);  

        fireButton = game.input.activePointer;
        
        asteroid = game.add.group();
        asteroid.enableBody = true;
        asteroid.physicsBodyType = Phaser.Physics.ARCADE;

        createAsteroid();

        timer = game.time.events.loop(1500, asteroidBelt, this); 

        // boom = game.add.group(); //
        // explosions.createMultiple(30, 'boom'); //
        // boom.forEach(addBoom, this) //

        labelScore = game.add.text(20,20, 0, { font: "30px Arial", fill: "#ffffff" });

    },

    update: function() {
        game.physics.arcade.overlap(laser, asteroid, collisionHandler, null, this);
        game.physics.arcade.overlap(spaceship, asteroid, this.restartGame, null, this);

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
        score = 0
    },
};

function fireLaser(){
    if(game.time.now > laserTime && laser.countDead() > 0){
        laserTime = game.time.now + 100;
        lazer = laser.getFirstDead();
    }
    if(lazer){
        lazer.reset(spaceship.x + 55, spaceship.y + 20);
        lazer.body.velocity.x = 400; 
        laserTime = game.time.now + 200;
    }
}

function createAsteroid(x,y){
    asteroidSprite = game.add.sprite(x,y, 'asteroid');
    asteroid.add(asteroidSprite);
    game.physics.arcade.enable(asteroidSprite);
    asteroidSprite.body.velocity.x -= 200;

    asteroidSprite.checkWorldBounds = true;
    asteroidSprite.outOfBoundsKill = true;

}

function asteroidBelt(){
    let hole1 = Math.floor(Math.random() * 5) + 1;
    let hole2 = Math.floor(Math.random() * 5) + 1;
    let hole3 = Math.floor(Math.random() * 5) + 1;
    // let hole4 = Math.floor(Math.random() * 8) + 1;

    for (let i = 0; i < 8; i++){
        if (i != hole1 && i !== hole1+1  && i !== hole3){
            createAsteroid(600, i * 60 + 10);
        } 
    }
        // if (i != hole ) 
        //     createAsteroid(600, i * 60 + 10); 

    score += 1; 
    labelScore.text = score;
}

let collisionHandler = (l, a) =>{
    l.kill();
    a.kill();

    score -=1;
    labelScore.text = score;
}


game.state.add('main', mainState); 

game.state.start('main');
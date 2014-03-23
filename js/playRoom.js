Main.PlayRoom = function (game) {
    this.game = game;
};

Main.PlayRoom.prototype = {
    create: function() {    	
    	// Score
    	this.game.score = 0;
    	this.scoreBoard = this.game.add.text(20, 20, 'Score: ' + this.game.score, { fill: '#ffffff' });
    	
    	// Load physics
    	this.game.physics.p2.setImpactEvents(true);

	    //  Create our collision groups. One for the player, one for the pandas
	    this.playerCollisionGroup = this.game.physics.p2.createCollisionGroup();
	    this.wallsCollisionGroup = this.game.physics.p2.createCollisionGroup();

        // Load the core
        this.core = this.game.add.sprite(350, 250, 'core');
        this.core.anchor.setTo(0.5, 0.5);
        this.core.scale.setTo(0.5, 0.5);

   		// Dos setup
   		this.dos = this.game.add.sprite(350, 400, 'dos');
   		this.dos.smoothed = false;
   		this.dos.anchor.setTo(0.5, 0.5);
   		// this animation and this play
   		this.game.physics.p2.enable(this.dos, false);
   		this.dos.body.setCollisionGroup(this.playerCollisionGroup);

        // Load walls
        this.walls = this.game.add.group();
   		this.walls.enableBody = true;
   		this.walls.physicsBodyType = Phaser.Physics.P2JS; 		

        // Wall loop
        this.timer = this.game.time.events.loop(1000, function(){
        	this.addWall();
        	this.game.score++;
        }, this);

        // Add controls
        this.cursors = this.game.input.keyboard.createCursorKeys();

        // Set up collisions
        this.dos.body.collides(this.wallsCollisionGroup, this.collisionHandler, this);
    },
    update: function() {
        // Scoreboard
    	this.scoreBoard.setText('Score: ' + this.game.score);

        // Scalability
		this.walls.forEachAlive(function(wall){
    		wall.scale.setTo(wall.customScaleX, wall.customScaleY);
            //wall.body.setRectangle(40, 40);
    		wall.customScaleX += 0.1;
    		wall.customScaleY += 0.002;
    	});

        // Key movement
        this.dos.body.setZeroVelocity();
        if (this.cursors.left.isDown)
            this.dos.body.moveLeft(600);
        else if (this.cursors.right.isDown)
            this.dos.body.moveRight(600);

        // Restart game if Dos goes out the canvas
        if (this.dos.inWorld === false)            
            this.restartGame();
    },

    collisionHandler: function(dos, wall) {
        this.restartGame();
    },

    restartGame: function(){
		console.log("YOU DIE BITCH!");
        this.game.time.events.remove(this.timer);
        this.game.state.start('playRoom');
    },

    addWall: function() {
        var hole = Math.floor(Math.random()*6);
        var wall = this.walls.create(350, 285, hole);

        // Scalability
        wall.customScaleX = 1;
        wall.customScaleY = 1;    	

        // Set up
        wall.anchor.setTo(0.5, 0.5);
        wall.outOfBoundsKill = true;

        // Collides
    	wall.body.setCollisionGroup(this.wallsCollisionGroup);
        wall.body.collides([this.playerCollisionGroup]);

        // Movement    	
    	wall.body.moveDown(100);
    	if(wall.inWorld === false)
            wall.kill();
    },

    render: function() {
    	//this.game.debug.spriteInfo(this.wallsCollisionGroup, 32, 32);
    	//this.game.debug.text(this.walls.length, 500, 32);
    }
};
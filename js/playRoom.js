Main.PlayRoom = function (game) {
    this.game = game;
};

Main.PlayRoom.prototype = {
    create: function() {        
        // The dimensions
        this.game.world.setBounds(-300, -300, 600, 600);

        // The score
        this.score = 0;
        var style = { font: "30px Arial", fill: "#ffffff" };
        this.label_score = this.game.add.text(-340, -290, "0", style);

        // Load the dos
        this.dos = this.game.add.sprite(0, 170, 'dos');
        this.dos.anchor.setTo(0.5, 0.5);
        this.dos.checkWorldBounds = true;

        // Load the core
        this.core = this.game.add.sprite(0, 0, 'core');
        this.core.anchor.setTo(0.5, 0.5);
        this.core.scale.setTo(0.5, 0.5);

        // Load walls
        this.wallsBottom = this.game.add.group();
        this.wallsBottom.createMultiple(80, 'wallBottom');
        this.wallsUpper = this.game.add.group();
        this.wallsUpper.createMultiple(80, 'wallUpper');
        this.wallsLeft = this.game.add.group();
        this.wallsLeft.createMultiple(80, 'wallLeft');
        this.wallsRight = this.game.add.group();
        this.wallsRight.createMultiple(80, 'wallRight');

        // Wall loop
        this.timer = this.game.time.events.loop(1000, this.setupWalls, this);

        // Add control
        this.cursors = this.game.input.keyboard.createCursorKeys();
    },

    update: function() {
        this.game.physics.collide(this.dos, this.wallsBottom, this.restartGame, null, this);

        this.enlarger(this.wallsBottom, 300, false);
        this.enlarger(this.wallsUpper, -300, false);
        this.enlarger(this.wallsRight, 300, true);
        this.enlarger(this.wallsLeft, -300, true);

        // Movement
        // Reset the movement
        this.dos.body.velocity.setTo(0, 0);
        this.dos.body.angularAcceleration = 0;
        this.dos.body.acceleration.x = 0;
        // Set it up by cursors pressing
        if (this.cursors.left.isDown){
            this.dos.body.angularAcceleration -= 200;
            this.dos.body.acceleration.x -= 50000;
        } else if (this.cursors.right.isDown){            
            this.dos.body.angularAcceleration += 200;
            this.dos.body.acceleration.x += 50000;
        }

        this.game.world.rotation += 0.01;

        // Restart game if Dos goes out the canvas
        if (this.dos.position.x < -500 || this.dos.position.x > 500)
           this.restartGame();
    },

    restartGame: function(){
        console.log("Your mark is " + this.score);
        this.game.time.events.remove(this.timer);
        this.game.state.start('playRoom');        
    },

    add_one_wall: function(x, y, i, wallsGroup, direction, horizontal) {
        // Get the first dead wall of group
        var wall = wallsGroup.getFirstDead();

        // Set up the wall
        wall.customScaleX = 0.03;
        wall.customScaleY = 0.1;
        wall.scale.setTo(wall.customScaleX, wall.customScaleY);
        wall.anchor.setTo(0.5, 0.5);
        wall.reset(x, y);

        wall.body.checkCollision.right = false;
        wall.body.checkCollision.left = false;
        
        // Make it move
        if(horizontal){
            wall.body.velocity.x = 100 * direction;
            wall.body.velocity.y = ((i*12) - 100);
        }else{
            wall.body.velocity.x = ((i*10) - 80);
            wall.body.velocity.y = 100 * direction;    
        }
        

        // Kill the pipe when it's no longer aviable
        wall.outOfBoundsKill = true;
    },

    add_row_of_walls: function(wallsGroup, x, y, direction, horizontal) {
        // Determinates the hole between walls
        var hole = Math.floor(Math.random()*16);

        for (var i = 0; i < 18; i++)
            if(i != hole && i != hole + 1 && i != hole + 2)
                if(horizontal)
                    this.add_one_wall(x, i*3 - y, i, wallsGroup, direction, horizontal);
                else
                    this.add_one_wall(i*3 - x, y, i, wallsGroup, direction, horizontal);
            
    },

    setupWalls: function(){
        // Increments score
        this.score += 1;
        this.label_score.content = this.score;
        this.add_row_of_walls(this.wallsBottom, 25, 30, 1, false);
        this.add_row_of_walls(this.wallsUpper, 25, -30, -1, false);
        this.add_row_of_walls(this.wallsRight, 50, 30, 1, true);
        this.add_row_of_walls(this.wallsLeft, -50, 30, -1, true);

    },

    enlarger: function(wallsGroup, limit, horizontal){
        if(wallsGroup === undefined)
            return false;

        var limitByAxis;

        wallsGroup.forEachAlive(function(wall){            
            wall.scale.setTo(wall.customScaleX, wall.customScaleY);
            if(horizontal){
                wall.customScaleX += 0.0027;
                wall.customScaleY += 0.003;
                limitByAxis = wall.position.x;
            }else{
                wall.customScaleX += 0.0055;
                wall.customScaleY += 0.001;
                limitByAxis = wall.position.y;
            }            

            if(limit < 0){
                if(limitByAxis < limit)
                    wall.kill();
            }
            else{
                if(limitByAxis > limit)
                    wall.kill();
            }
            
        });
    }
};
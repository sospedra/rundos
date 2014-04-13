Main.PlayRoom = function (game) {
    this.game = game;
};

Main.PlayRoom.prototype = {
    create: function() {
        // The score
        this.score = 0;
        var style = { font: "30px Arial", fill: "#ffffff" };
        this.label_score = this.game.add.text(20,20, "0", style);
        // Load the dos
        this.dos = this.game.add.sprite(350, 400, 'dos');
        this.dos.anchor.setTo(0.5, 0.5);
        this.dos.body.setPolygon(32, -14);
        // Load the core
        this.core = this.game.add.sprite(350, 250, 'core');
        this.core.anchor.setTo(0.5, 0.5);
        this.core.scale.setTo(0.5, 0.5);
        // Load walls
        this.walls = this.game.add.group();
        this.walls.createMultiple(80, 'wall');
        // Wall loop
        this.timer = this.game.time.events.loop(1000, this.add_row_of_walls, this);
        // Add control
        this.cursors = this.game.input.keyboard.createCursorKeys();
    },

    update: function() {
        this.game.physics.overlap(this.dos, this.walls, this.restart_game, null, this);

        this.walls.forEachAlive(function(wall){
            wall.scale.setTo(wall.customScaleX, wall.customScaleY);
            wall.customScaleX += 0.0055;
            wall.customScaleY += 0.001;
        });

        this.dos.body.velocity.setTo(0, 0);
        if (this.cursors.left.isDown)
            this.dos.body.velocity.x = -600;
        else if (this.cursors.right.isDown)
            this.dos.body.velocity.x = 600;

        // Restart game if Dos goes out the canvas
        if (this.dos.inWorld === false)
            this.restart_game();
    },

    restartGame: function(){
        console.log("YOU DIE BITCH!");
        this.game.time.events.remove(this.timer);
        this.game.state.start('main');
    },

    add_one_wall: function(x, y, isLeft, mid, i) {
        // Get the first dead wall of group
        var wall = this.walls.getFirstDead();

        wall.customScaleX = 0.03;
        wall.customScaleY = 0.1;
        wall.isLeft = isLeft;
        wall.mid = mid;
        wall.scale.setTo(wall.customScaleX, wall.customScaleY);
        wall.anchor.setTo(0.5, 0.5);
        // Set the new position of the pipe
        wall.reset(x, y);
        // Make it move
        wall.body.velocity.x = ((i*15) - 125);


        wall.body.velocity.y = 100;
        // Kill the pipe when it's no longer aviable
        wall.outOfBoundsKill = true;
    },

    add_row_of_walls: function() {
        // Increments score
        this.score += 1;
        this.label_score.content = this.score;

        // Determinates the hole between walls
        var hole = Math.floor(Math.random()*16);
        console.log(hole);
        var mid = true;
        (hole<8) ? mid = true : mid = false;
        var isLeft = true;

        for (var i = 0; i < 18; i++)
            if(i != hole && i != hole + 1){
                (i<hole) ? isLeft = true : isLeft = false;
                this.add_one_wall(i*3+325, 285, isLeft, mid, i);
            }
    }
};
Main.Preloader = function (game) {
    this.game = game;
};

Main.Preloader.prototype = {
    preload: function () {    	
    	this.game.stage.backgroundColor = '#0d0d0d';
        this.cursors;

        this.game.load.image('core', 'assets/img/core.png');
        this.game.load.image('wallUpper', 'assets/img/wallUpper.png');
        this.game.load.image('wallBottom', 'assets/img/wallBottom.png');
        this.game.load.image('wallRight', 'assets/img/wallRight.png');
        this.game.load.image('wallLeft', 'assets/img/wallLeft.png');
        this.game.load.image('dos', 'assets/img/triforce.png');
    },
    
    create: function () {
        this.game.state.start('playRoom');
    }
};

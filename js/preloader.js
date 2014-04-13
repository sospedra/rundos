Main.Preloader = function (game) {
    this.game = game;
};

Main.Preloader.prototype = {
    preload: function () {    	
    	this.game.stage.backgroundColor = '#009987';
        this.cursors;

        this.game.load.image('core', 'assets/img/core.png');
        this.game.load.image('wall', 'assets/img/m_box.png');
        this.game.load.image('dos', 'assets/img/triforce.png');
    },
    
    create: function () {
        this.game.state.start('playRoom');
    }
};

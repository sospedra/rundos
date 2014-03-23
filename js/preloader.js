Main.Preloader = function (game) {
    this.game = game;
};

Main.Preloader.prototype = {
    preload: function () {
    	this.game.physics.startSystem(Phaser.Physics.P2JS);    	
    	this.game.stage.backgroundColor = '#009987';
        this.cursors;

        this.game.load.image('core', 'assets/img/core.png');
        this.game.load.image('wall', 'assets/img/m_box.png');
        this.game.load.image('dos', 'assets/img/triforce.png');

        this.game.load.image('0', 'assets/img/walls/0.png');
        this.game.load.image('1', 'assets/img/walls/1.png');
        this.game.load.image('2', 'assets/img/walls/2.png');
        this.game.load.image('3', 'assets/img/walls/3.png');
        this.game.load.image('4', 'assets/img/walls/4.png');
        this.game.load.image('5', 'assets/img/walls/5.png');
    },
    
    create: function () {
        this.game.state.start('playRoom');
    }
};

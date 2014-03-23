var Main = {};

Main.Boot = function(game) {
    this.game = game;
};

Main.Boot.prototype = {
    preload: function() {
    },
    create: function () {
        this.game.state.start('preloader');
    }
};

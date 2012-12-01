(function() {

  var init = function() {
    R.on('change:ready', function(){
      R.authenticate();
    });
  };

  init();

})();

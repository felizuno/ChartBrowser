(function() {

  var init = function() {
    R.on('change:ready', function(){
      if (R.authenticated()) {
        var userName = R.currentUser.attributes.vanityName;
        $('#authbutton').attr('value', 'Logged in as: ' + userName);
      } else {
        R.authenticate();
      }
    });
  };

  $(document).ready(function() {
      $('#authbutton').bind('click', function() {
        window.open("http://www.rdio.com/");
      });

    init();
  });


})();

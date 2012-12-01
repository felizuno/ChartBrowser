(function() {

  window.kexprdio = {
    // GLOBAL VARIABLES.
    userName: '',
    currentList: {},


    // +++++++++++++++++++
    init: function() {
      var self = this;

      R.on('change:ready', function(){
        if (R.authenticated()) {
          self.userName = R.currentUser.attributes.vanityName;
          
          $(authbutton).attr('value', 'Logged in as: ' + self.userName);
          $(authbutton).bind('click', function() {
            window.open("http://www.rdio.com/people/"+ self.userName);
          });
        } else {
          $(authbutton).attr('value', 'Click to authenticate');
          $(authbutton).bind('click', function() {
            R.authenticate();
          });          
        }
      });
    },

  };
  
  // +++++++++++++++++++
  $(document).ready(function() {
    kexprdio.init();
  });

})();

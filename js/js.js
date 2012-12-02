(function() {

  window.kexprdio = {
    // GLOBAL VARIABLES.
    userName: '',
    currentList: {},


    // +++++++++++++++++++
    init: function() {
      var self = this;
      // initialize the auth button based on current auth state
      
      var _stripAuth = function() {
        self.userName = R.currentUser.attributes.vanityName;
        
        $(authbutton).attr('value', 'Logged in as: ' + self.userName);
        $(authbutton).bind('click', function() {
          window.open("http://www.rdio.com/people/"+ self.userName);
        });        
      };

      R.on('change:ready', function(){
        if (R.authenticated()) {
          _stripAuth();
        } else {
          $(authbutton).attr('value', 'Click to authenticate');
          $(authbutton).bind('click', function() {
            R.authenticate(kexprdio._stripAuth());
          });          
        }
      });

      $("#addbutton").click(function () {
        kexprdio.listLoader.appendToLists();
      });

      $("#replacebutton").click(function () {
        kexprdio.listLoader.replaceLists();
      });

      $("#clearbutton").click(function () {
        kexprdio.listLoader.clearLists();
      });
    },

  };
  
  // +++++++++++++++++++
  $(document).ready(function() {
    kexprdio.init();
    kexprdio.listLoader.init();
  });

})();

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
          this.userName = R.currentUser.attributes.vanityName;
          $(authbutton).attr('value', 'Logged in as: ' + this.userName);
        } else {
          $(authbutton).attr('value', 'Click to authenticate');
        }
      });
    },

  };
  
  // +++++++++++++++++++
  $(document).ready(function() {
    kexprdio.init();
  });

})();

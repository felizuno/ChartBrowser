(function() {

  window.kexprdio = {
    // GLOBAL VARIABLES.
    userName: '',


    // +++++++++++++++++++
    init: function() {
      // initialize the auth button based on current auth state
      
      var _stripAuth = function() {
        self.userName = R.currentUser.attributes.vanityName;
        
        $('#signout')
          .attr('value', self.userName)
          .bind('click', function() {
            window.open("http://www.rdio.com/people/"+ self.userName);
        });        
      };

      R.on('change:ready', function(){
        if (R.authenticated()) {
          _stripAuth();
        } else {
          $('#signout')
            .attr('value', 'Click to authenticate')
            .bind('click', function() {
              R.authenticate(_stripAuth);
          });          
        }
      });

      $('.chartbutton').add('.range').add('.year').each(function(i, v){
        $(v).bind('click', function() {
          kexprdio.chooser.toggleChosen(this, this.parentElement);
        });
      });

      $("#loadbutton").click(function () {
          kexprdio.chartLoader.loadReplace(kexprdio.chooser.chartToLoad());
      });

      $("#appendbutton").click(function () {
          kexprdio.chartLoader.appendTocharts();
      });

      $(".choosertoggle").click(function () {
        kexprdio.chooser.showHide();
      });

      $("#authbutton").click(function () {
        $('.appmenu').toggle();
      });      
    },

    bioToggle: function(caller) {
      $(caller).toggle().toggleClass('shown').siblings().toggle().toggleClass('shown');      
    }

  };
  
  // +++++++++++++++++++
  $(document).ready(function() {
    kexprdio.init();
    kexprdio.playlister.init();
  });

})();

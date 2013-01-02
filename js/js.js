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

      $("#replacebutton").click(function () {
          kexprdio.chartLoader.replacecharts();
      });

      $("#testbutton").click(function () {
        //remove
        R.ready(function() {
          R.request({
            method: 'search',
            content: {query: 'Flying Lotus', types: 'Artist'},
            success: function(response) {
              console.log(response);
            },
            error: function() {
              console.log('You Fail. Try Again.');
            }
          });
        });
      });

      $("#charttest").click(function () {
        kexprdio.chartLoader.loadingtest();
      });

      $(".choosertoggle").click(function () {
        kexprdio.chooser.showHide();
      });

      $("#authbutton").click(function () {
        $('.appmenu').toggle();
      });      
    },

  };
  
  // +++++++++++++++++++
  $(document).ready(function() {
    kexprdio.init();
    kexprdio.playlister.init();
  });

})();

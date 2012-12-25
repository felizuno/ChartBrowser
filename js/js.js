(function() {

  window.kexprdio = {
    // GLOBAL VARIABLES.
    userName: '',
    currentchart: {},


    // +++++++++++++++++++
    init: function() {
      // initialize the auth button based on current auth state
      
      var _stripAuth = function() {
        self.userName = R.currentUser.attributes.vanityName;
        
        $(authbutton).attr('value', 'Logged in as: ' + self.userName);
        $(authbutton).bind('click', function() {
          window.open("http://www.rdio.com/people/"+ self.userName);
        });        
      };

      // R.on('change:ready', function(){
      //   if (R.authenticated()) {
      //     _stripAuth();
      //   } else {
      //     $(authbutton).attr('value', 'Click to authenticate');
      //     $(authbutton).bind('click', function() {
      //       R.authenticate(_stripAuth);
      //     });          
      //   }
      // });

  $('.chartbutton').add('.range').add('.year').each(function(i, v){
    $(v).bind('click', function() {
      kexprdio.chooser.toggleChosen(this, this.parentElement);
    });
  });

  $("#addbutton").click(function () {
    kexprdio.chartLoader.appendTocharts();
  });

  $("#replacebutton").click(function () {
    kexprdio.chartLoader.replacecharts();
  });

  $("#charttest").click(function () {
    kexprdio.chartLoader.loadingtest();
  });

  $(".choosertoggle").click(function () {
    if (!($(this).hasClass('shown'))) {
      $('.chooserbar').children().not(this).slideDown('fast');
    } else {
      $('.chooserbar').children().not(this).slideUp('fast');
    }

    $(this).toggleClass('shown');
  });
    },

  };
  
  // +++++++++++++++++++
  $(document).ready(function() {
    kexprdio.init();
    kexprdio.chartLoader.init();
    kexprdio.chooser.init();
  });

})();

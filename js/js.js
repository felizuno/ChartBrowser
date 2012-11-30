(function() {
  $(document).ready(function() {
  	$.getJSON('lists/test.json', function(data) {
  	  var items = [];
  
  	  $.each(data.songs, function(key, val) {
        var track =  val.artist + " - " + val.song + " - From: " + val.album; 
  	    items.push('<li id="' + key + '" class="song">' + track + '</li>');
  	  });
  
  	  $('<ul/>', {
  	    'class': 'tracklist',
  	    html: items.join('')
  	  }).appendTo('.right');
  	});
  });

  R.on('change:ready', function() {
    console.log(R.ready());
  });

})();

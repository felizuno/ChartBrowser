(function() {
  $(document).ready(function() {
  	$.getJSON('lists/test.json', function(data) {
  	  var items = [];
  
  	  $.each(data.songs, function(key, val) {
        var track =  val.artist + " - " + val.song + " - From: " + val.album; 
  	    items.push('<li id="' + key + '">' + track + '</li>');
  	  });
  
  	  $('<ul/>', {
  	    'class': 'my-new-list',
  	    html: items.join('')
  	  }).appendTo('body');
  	});
  });
  
})();
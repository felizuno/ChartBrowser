(function() {
  $(document).ready(function() {
  	$.getJSON('lists/test.json', function(data) {
  	  var items = [];
  
  	  $.each(data.songs, function(key, val) {
  	    items.push('<li id="' + key + '">' + val.artist + '</li>');
  	  });
  
  	  $('<ul/>', {
  	    'class': 'my-new-list',
  	    html: items.join('')
  	  }).appendTo('body');
  	});
  });
  
})();
(function() {
  
  kexprdio.listLoader = {
    // Rife with self/this issues. Using the blunt "kexprdio.listloader.foo" for the sake of testing 
    currentList: [], // Arrays right now but need to be objects with a name and an array
    nextList: [], // I think it's possible to do all of this without nextList, but I am using it to help with _loadFromStorage


    init: function() {
      // TEMPORARY: loads test JSON immediately. 
      // setTimeout used because it appends an empty <ul> otherwise. :-( 
      this._loadFromStorage('test');
      setTimeout('kexprdio.listLoader._attach(kexprdio.listLoader.currentList)', 300);
    },

    // local utility loading behaviors
    //
    //-----
    _loadFromStorage: function(listToLoad) {
      kexprdio.listLoader.nextList = [];
      var newList = [];
      $.getJSON('lists/' + listToLoad + '.json', function(data) {
        $.each(data.songs, function(key, val) {
          var rdioQuery = val. artist + ' ' + val.song;
          var track =  val.artist + " - " + val.song + " - From: " + val.album;
          var trackImageUrl = '';

          R.request({  
            method: 'search',
            content: {query: rdioQuery, types: 'Track'},
            success: function(response) { //'a callback function to be called on success (optional)',
              //this is where I set the album art as the background image for the song item
              trackImageUrl = response.result.results[0].icon;
              console.log('Inner:' + trackImageUrl);
              kexprdio.listLoader.nextList.push('<li class="song"><img src="' + trackImageUrl+ ' />' + track + '</li>');
            },
            error: function() { //'a callback function to be called on error (optional)',
              //load placeholder album art for "Track not available on Rdio"
              console.log('R.request failed for search term:' + rdioQuery);
              ;
            }
          });

          kexprdio.listLoader.nextList.push('<li class="song"><img src="' + trackImageUrl + '" />' + track + '</li>');
          console.log('Outter:' + trackImageUrl);
        });
        
        kexprdio.listLoader.currentList = kexprdio.listLoader.nextList.slice();
      });
    },
    //-----
    _clearLists: function() {
      console.log('Clearing list(s)')
      $('.tracklist').remove();
    },
    //-----
    //this should already work
    _attach: function(listToAttach) {
      console.log('About to attach: ' + listToAttach);
      $('<ul/>', 
        {'class': 'tracklist',
          html: listToAttach.join('')
        }
       ).appendTo('.right');
      // this doesn't work, idk why...
      $('.tracklist ul:last-child').addClass('last');
    },
    // available commands
    //
    //+++++++++
    clearLists: function() {

      this._clearLists();
    },
    //+++++++++    
    appendToLists: function() {
      var listName = 'top100rap'; // Temporarily assigned to one of the test lists
      this._loadFromStorage(listName);
      setTimeout('kexprdio.listLoader._attach(kexprdio.listLoader.currentList)', 300);
      //this._attach(listName); // Want to be doing this instead of the setTimeout
    },
    //+++++++++
    replaceLists: function() {
      var listName = 'streetsounds_092112'; // Temporarily assigned to one of the test lists
      this._loadFromStorage(listName);
      this._clearLists();
      setTimeout('kexprdio.listLoader._attach(kexprdio.listLoader.currentList)', 300);
    }
  };

})();

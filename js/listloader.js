(function() {
  
  kexprdio.listLoader = {
    // Rife with self/this issues. Using the blunt "kexprdio.listloader.foo" for the sake of testing 
    currentList: [], // Arrays right now but need to be objects with a name and an array
    nextList: [], // I think it's possible to do all of this without nextList, but I am using it to help with _loadFromStorage


    init: function() {
      // TEMPORARY: loads test JSON immediately. 
      // setTimeout used because it appends an empty <ul> otherwise. :-( 
      this._loadFromStorage('test');
    },

    // local utility loading behaviors
    //
    //-----
    _loadFromStorage: function(listToLoad) {
      var self = this;
      this.nextList = [];
      var newList = {};
      $.getJSON('lists/' + listToLoad + '.json', function(data) {
        $.each(data.songs, function(key, val) {
          var rdioQuery = val. artist + ' ' + val.song;
          var track =  val.artist + " - " + val.song + " - From: " + val.album;
          var trackImageUrl = '';

          self.nextList.push('<li class="song" data-rdioquery="' 
            + rdioQuery 
            + '"><img src="'
            + trackImageUrl 
            + '" />' 
            + track 
            + '</li>');
        });
        // build newList and pass it to attach, and delete currentList and nextList
        self.currentList = self.nextList.slice();
        self._attach(self.currentList);
      });
    },
    //-----
    _clearLists: function() {
      console.log('Clearing list(s)')
      $('.tracklist').remove();
    },
    //-----
    _attach: function(listToAttach) {
      console.log('About to attach: ' + listToAttach);
      var $ul = $('<ul/>', 
        {'class': 'tracklist',
          html: listToAttach.join('')
        }
       ).appendTo('.right');
      // this doesn't work, idk why...
      $('ul.tracklist li:last-child').addClass('last');
      
      R.ready(function() {
        $ul.find('li').each(function(i, v) {
          var $li = $(v);
          var rdioQuery = $li.data('rdioquery');
          R.request({
            method: 'search',
            content: {query: rdioQuery, types: 'Track'},
            success: function(response) {
              var trackImageUrl = response.result.results[0].icon;
              $li.find('img').attr('src', trackImageUrl);
            },
            error: function() {
              //load placeholder album art for "Track not available on Rdio"
              console.log('R.request failed for search term:' + rdioQuery);
            }
          });
        });
      });
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
      //this._attach(listName); // Want to be doing this instead of the setTimeout
    },
    //+++++++++
    replaceLists: function() {
      var listName = 'streetsounds_092112'; // Temporarily assigned to one of the test lists
      this._loadFromStorage(listName);
      this._clearLists();
    }
  };

})();

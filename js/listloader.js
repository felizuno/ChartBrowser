(function() {
  
  kexprdio.listLoader = {

    init: function() {
      // TEMPORARY: loads test JSON immediately. 
      this._loadFromStorage('test');
    },

    // local utility loading behaviors
    //
    //-----
    _loadFromStorage: function(listToLoad) { //remove argument soon
      var self = this;
      var _listToLoad = $('div.showbuttons').find('.chosen').attr('id');
      var newList = {
        title: '',
        list: []
      };

      

      $.getJSON('lists/' + listToLoad + '.json', function(data) {
        newList.title = data.name;

        $.each(data.songs, function(key, val) {
          var rdioQuery = val. artist + ' ' + val.song;
          var track =  val.artist + " - " + val.song;

          newList.list.push('<li class="playlistItem" data-rdioquery="' 
            + rdioQuery 
            + '"><img class="albumart"/><div class="songname">' 
            + track 
            + '</div></li>');
        });

        self._attach(newList);
      });
    },
    //-----
    _clearLists: function() {
      $('.tracklist').remove();
      $('.list-header').remove();
    },
    //-----
    _attach: function(listToAttach) {
      var $listTitle = $('<div />', {
        'class': 'list-header',
        html: listToAttach.title
      }).appendTo('.right');

      var $ul = $('<ul/>', 
        {'class': 'tracklist',
          html: listToAttach.list.join('')
        }
       ).appendTo('.right');

      $('ul.tracklist li:last-child').addClass('last');
      

      // Call for the artwork now, when it arrives it will find the song it belongs to
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
              // Needs to load placeholder album art for "Track not available on Rdio"
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

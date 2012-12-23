(function() {
  
  kexprdio.chartLoader = {

    init: function() {
      // TEMPORARY: loads test JSON immediately.
      $('.chooserbar').slideDown(); 
    },

    // local utility loading behaviors
    //
    //-----
    _loadFromStorage: function(chartToLoad) { // Ready to remove argument
      var self = this;
      // The function below determines the filename to ask for based on the chosen buttons
      var _chartToLoad = kexprdio.chooser.chartToLoad();
        console.log('Current Choice: ' + _chartToLoad + '.json');
      var _newChart = {
        title: '',
        chart: []
      };
      
      // Don't forget to remove this

      $.getJSON('charts/' + chartToLoad + '.json', function(data) {
        _newChart.title = data.name;

        $.each(data.songs, function(key, val) {
          var rdioQuery = val. artist + ' ' + val.song + ' ' + val.album;
          var track =  val.artist + " - " + val.song;

          // Build out the chart html as a string for the push
          _newChart.chart.push(
            '<li class="chartitem" data-rdioquery="' + rdioQuery + '">'
            + '<div class="songname">' + track + '</div>'
            + '<img class="albumart" src="img/failicon.png"/>'
            + '<div class="songinfo">This is where artist biography and related artists will go.<p>May remind you of\:  Related Artist, Other Artist, No-name Band</p><p>Similar artists not in your collection\:  Related Artist, Other Artist, No-name Band</p></div>'
            + '<div class="playlistoptions">'
              + '<div class="playlistoption">Queue Album</div>'
              + '<div class="playlistoption">Your Playlists</div>'
              + '<div class="playlistoption">Share Song</div>'
              + '<div class="playlistoption">Show Stats</div>'
              //+ '<div class="playlistsview" style="visibility: hidden"><div class="userplaylist">Playlist</div><div class="userplaylist">Playlist</div><div class="userplaylist">Playlist</div></div>'
            + '</div>'
            + '</li>'
          );
        });

        self._attach(_newChart);
      });
    },
    //-----
    _clearcharts: function() {
      $('.chart').remove();
      $('.chart-header').remove();
    },
    //-----
    _attach: function(chartToAttach) {
      var $chartTitle = $('<div />', {
        'class': 'chart-header',
        html: chartToAttach.title
      }).appendTo('.chartdisplay');

      var $ul = $('<ul/>', 
        {'class': 'chart',
          html: chartToAttach.chart.join('')
        }
       ).appendTo('.chartdisplay');

      $('ul.trackchart li:last-child').addClass('last');
      

      // Call for the artwork now, when it arrives it will find the song it belongs to
      // R.ready(function() {
      //   $ul.find('li').each(function(i, v) {
      //     var $li = $(v);
      //     var rdioQuery = $li.data('rdioquery');
      //     R.request({
      //       method: 'search',
      //       content: {query: rdioQuery, types: 'Track'},
      //       success: function(response) {
      //         var trackImageUrl = response.result.results[0].icon;
      //         $li.find('img').attr('src', trackImageUrl);
      //       },
      //       error: function() {
      //         // Needs to load placeholder album art for "Track not available on Rdio"
      //         $li.find('img').attr('src', 'img/failicon.png');
      //         console.log('R.request failed for search term:' + rdioQuery);
      //       }
      //     });
      //   });
      // });
    },
    
    // available commands
    //
    //+++++++++
    //+++++++++    
    appendTocharts: function() {
      var chartName = 'top100rap'; // Temporarily assigned to one of the test charts
      this._loadFromStorage(chartName);
    },
    //+++++++++
    replacecharts: function() {
      var chartName = 'streetsounds_092112'; // Temporarily assigned to one of the test charts
      this._loadFromStorage(chartName);
      this._clearcharts();
    }
  };

})();

(function() {
  
  kexprdio.chartLoader = {
    // local utility loading behaviors
    //
    fullCurrentChart: {
      title: '',
      charts: []
    },

    //-----
    _loadFromStorage: function(chartToLoad) { // Ready to remove argument
      var self = this;
      // The function below determines the filename to ask for based on the chosen buttons
      //var _chartToLoad = kexprdio.chooser.chartToLoad();
      var _newChart = {
        title: '',
        charts: []
      };

      $.getJSON('charts/' + chartToLoad + '.json', function(data) {
        $('.range').remove();
        //var val = data.chart[0];
        $.each(data.chart, function(key, val) {
          var index = key;
          
          var $dr = $('<div />', {
            'class': 'range',
            'style':'display:none;',
            html: val.daterange
            }).appendTo('.monthbar');
          
          _newChart.charts.push({
              header: {
                title: val.daterange,
                html: '<li class="chart-header">' + val.daterange + '</li>',
              },
              chart: []
          });

          $.each(val.albums, function (key2, val2) {
            var rdioQuery = val2. artist + ' ' + val2.album + ' ';// + val2.label;
            var _displayName = val2.album + " - " + val2.artist;
            // Build out the chart html as a string for the push
            _newChart.charts[index].chart.push(
              '<li class="chartitem" data-rdioquery="' + rdioQuery + '">'
              + '<div class="songname">'+ val2.rank + '. ' + _displayName + '</div>'
              + '<img class="albumart" src=""/>'
              + '<div class="songinfo">This is where artist biography and related artists will go.<p>May remind you of\:  Related Artist, Other Artist, No-name Band</p><p>Similar artists not in your collection\:  Related Artist, Other Artist, No-name Band</p></div>'
              + '<div class="playlistoptions">'
                + '<div class="playlistoption">Queue Album</div>'
                + '<div class="playlistoption">Your Playlists</div>'
                + '<div class="playlistoption">Show Tracklist</div>'
                + '<div class="playlistoption">Show Stats</div>'
              + '</li>'
            );
          });
        });
        kexprdio.chartLoader.fullCurrentChart = _newChart;
        self._attach(0);
        
        kexprdio.chooser.activateRangeOptions();
        $('.monthbar').children(':eq(0)').addClass('chosen').show();
      });
    },
    //-----
    _clearcharts: function() {
      $('.chart').remove();
      $('.chart-header').remove();
    },
    //-----
    _attach: function(index) {
      var chartToAttach = {
        chart: [this.fullCurrentChart.charts[index].chart.join()]
      };
      var $ul = $('<ul/>', 
        {'class': 'chart',
          html: chartToAttach.chart
        })
      .appendTo('.chartdisplay');

      kexprdio.chooser.showHide();
      // Reconsidering how to do the playlistoptions
      //kexprdio.playlister.addPlaylistOptions();

      R.ready(function() {
        $ul.find('li').not('.chart-header').each(function(i, v) {
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
              $li.find('img').attr('src', 'img/failicon.png');
              console.log('R.request failed for search term:' + rdioQuery);
            }
          });
        });
      });
       //this._getAlbumArt();

    },

    _getAlbumArt: function() {
      // Call for the artwork now, when it arrives it will find the song it belongs to
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
      this._clearcharts();
      this._loadFromStorage(chartName);
    },
    //++++++++++
    loadingtest: function() {
      this._clearcharts();
      this._loadFromStorage('el2012')
    }
  };

})();

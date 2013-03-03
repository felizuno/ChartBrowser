(function(){
	kexprdio.chooser = {
		init: function() {
			$('.chooserbar').slideDown('slow');
		},

		_toggleVisibility: function(buttonbar) {
			$(buttonbar.children).not('.chosen').toggle('fast');
		},

		chartToLoad: function() {
	        var $chart = $('.chartbuttons').find('.chosen');
	        var $year = $('.yearbar').find('.chosen');
	        var fileName = ($chart.attr('id') + $year.attr('id'));
	        var displayName = ($chart.text() + '  - ' + $year.text());
	        return {
		        displayName: displayName,
		        fileId: fileName,
		        charts: []
		    };
      	},

		showHide: function() {
	        if (!($('.choosertoggle').hasClass('shown'))) {
	          $('.chooserbar').children().not('.choosertoggle').slideDown('fast');
	        } else {
	          $('.chooserbar').children().not('.choosertoggle').slideUp('fast');
	        }

	        $('.choosertoggle').toggleClass('shown');
		},
		
		toggleChosen: function(button, buttonbar) {
			$(buttonbar).find('.chosen').removeClass('chosen');
			$(button).toggleClass('chosen');
			this._toggleVisibility(buttonbar);
		},

		activateRangeOptions: function() {
			$ranges = $('.range');

			$ranges.eq(0).addClass('chosen').show();

	        $ranges.each(function(i, v) {
	          $(v).bind('click', function() {
	            kexprdio.chooser.toggleChosen(this, this.parentElement);
	          });
	        });
		}
	};

})();

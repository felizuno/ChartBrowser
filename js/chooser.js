(function(){
	kexprdio.chooser = {
		init: function() {
			$('.chooserbar').fadeIn('slow');
		},

		_toggleVisibility: function(buttonbar) {
			$(buttonbar.children).not('.chosen').toggle('fast');
		},

		chartToLoad: function() { //right now nothing calls this, waiting on cleaned jsons
	        var $chart = $('.chartbuttons').find('.chosen');
	        var $year = $('.yearbar').find('.chosen');
	        var fileName = ($chart.attr('id') + $year.attr('id'));
	        var displayName = ($chart.text() + '  - ' + $year.text());
	        return {
		        displayName: displayName,
		        fileId: 'el2012', //fileName,
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
	        $('.range').each(function(i, v) {
	          $(v).bind('click', function() {
	            kexprdio.chooser.toggleChosen(this, this.parentElement);
	          });
	        });
		}
	};

})();

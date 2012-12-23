(function(){
	kexprdio.chooser = {
		chartToLoad: function() { //right now nothing calls this, waiting on cleaned jsons
	        var $chart = $('.chartbuttons').find('.chosen');
	        var $year = $('.yearbar').find('.chosen');
	        var filename = ($chart.attr('id') + $year.attr('id'));
	        return filename;
      	},

		toggleChosen: function(button, buttonbar) {
			$(buttonbar).find('.chosen').removeClass('chosen');
			$(button).toggleClass('chosen');
			this._toggleVisibility(buttonbar);
		},

		_toggleVisibility: function(buttonbar) {
			$('.chosen', buttonbar).fadeTo('fast', 0.8);
			$(buttonbar.children).not('.chosen').fadeTo('fast', 0.2);
		}
	};
})();

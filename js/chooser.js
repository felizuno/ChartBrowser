(function(){
	kexprdio.chooser = {
		choice: {
			show: '',
			date: '',
			time: ''
		},

		init: function() {
			// Do I always have to have one of these?
		},

		toggleChosen: function(button) {
			$('.chosen').removeClass('chosen');
			$(button).toggleClass('chosen');
			this.choice.show = $(button).attr('id');
			this.toggleDays();
		},

		toggleDays: function() {
			var show = this.choice.show;
			var dayType = ''; // weekly, daily, 

			switch(show) {
				cw
				kc
				es
				wp
				rh
				sd
				sh
				mm
				pv
				ao
				sr
				sk
				pb
				ss
				ex
				sa
				jt
				default:
			}
		}

	};
})();

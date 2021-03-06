
ko.bindingHandlers.returnKey = {
	init: function(element, valueAccessor, allBindingsAccessor, viewModel) {
		ko.utils.registerEventHandler(element, 'keydown', function(evt) {
			if (evt.keyCode === 13) {
				evt.preventDefault();
				valueAccessor().call(viewModel);
			}
		});
	}
};
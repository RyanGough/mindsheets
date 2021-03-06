
var SheetObject = (function(){
	return function(item, position){
		var self = this;
		self.item = item;
		self.position = position;
	}
})();

var Sheet = (function (){
	var constructor = function(){
		var self = this;

		var items = [];

		self.addItem = function(item){
			items.push(item);
			self.trigger('itemAdded', item);
		}
	}

	MicroEvent.mixin(constructor);
	return constructor;
})();


var SingleValueSource = (function(){
	var constructor = function (definitionEvaluator){
		var self = this;

		var value = null;
		var definition = null;
		var evaluator = null;
		//pass-through evaluator
		var evaluate = function(expression){
			return expression;
		}


		if(typeof(definitionEvaluator) !== 'undefined')
		{
			evaluator = definitionEvaluator;
			evaluate = evaluator.evaluate;
		}


		self.Value = function (newValue){
			if(typeof(newValue) === 'undefined'){
				return value;
			}

			value = newValue;
			self.trigger('valueChanged', newValue);
		}

		self.Definition = function(newDefinition){
			if(typeof(newDefinition) === 'undefined'){
				return definition;
			}

			definition = newDefinition;
			self.trigger('definitionChanged', newDefinition);
			self.Value(evaluate(definition));
		}
	}

	MicroEvent.mixin(constructor);
	return constructor;
})();
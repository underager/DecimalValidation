var ViewOne = Backbone.View.extend({
    id:'todoItemsContainer',
    
    initialize: function(options){
        
    },

    events:{
        'keypress #keyPressEvent' : 'onKeyPressOne'
    },

    onKeyPressOne : function(e){
		// #region region1
		// let regExp = /^[0-9]*\.[0-9]{0,4}$/;
		// console.log('e.target.value : '+$('#keyPressEvent').val());
		// var inputString =Number(e.target.value);
		// console.log('input String : '+inputString)

		// if(inputString !=''){
		// 	var isValidInput = regExp.test(inputString);
		// 	console.log('isValidInput : '+isValidInput);
		// 	if(isValidInput)
		// 		return true;
		// 	console.log('returning false');
		// 	return false;
		// }
		// #endregion
		
		// #region region2
		var keyEntered = event.key;
		console.log('entered key : '+keyEntered);
		var numRegExp = /[0-9]|\./;
		if(numRegExp.test(keyEntered)){
				var value = event.target.value + String.fromCharCode(event.keyCode);
			console.log('value : '+value);
			console.log('typeof(value) : '+typeof(value));
			var cursorPosition = event.target.selectionStart;
			var dataArr = new Array();
			dataArr = value.split('.');
			console.log('dataArr[0].length : '+dataArr[0].toString().length);
			var decimalPointPosition = value.indexOf('.');
			console.log('decimal position : '+decimalPointPosition);
			console.log('cursor Position : '+cursorPosition);

			
			if (!(/^\d{1,10}(\.$|\.\d{1,4}$|$)/).test(value) ) {
				console.log('in first if block');
				if(dataArr[0].toString().length < 10 && cursorPosition <= decimalPointPosition){
					return true;
				}
				console.log('after the inner if failed');
			event.preventDefault();
			event.stopPropagation();
			}
		}
		else{
			return false;
		}
		
		
		// #endregion
	},
    
    render: function(){
        //using template code
        var template = $('#todoItemsTemplate').html();
        var html = Mustache.render(template);
        this.$el.html(html);
        return this;
    }
})
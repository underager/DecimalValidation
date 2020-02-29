var TodoViews = Backbone.View.extend({
    id:'todoItemsContainer',
    
    initialize: function(options){
        if(!(options && options.model)){
            throw new Error('Need to pass Model to the TodosView ')
        }

        this.model.on('add', this.onAddTodoItem, this);
        this.model.on('remove',this.onRemoveTodoItem, this);
    },

    onRemoveTodoItem: function(removedTodoItem){
        console.log('remove todo item : '+removedTodoItem.toJSON().description);

        this.$('li#'+ removedTodoItem.id).remove();
    },

    onAddTodoItem: function(newTodoItem){
        var todoView = new TodoView({
            model : newTodoItem
        });

        
        this.$('#todoList').append(todoView.render().$el);
    },

    events:{
        // 'click #addButton': 'onAddClick',
        'keypress #newItemAddtxt' : 'onEnterKeyPress',

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
    onEnterKeyPress:function(e){
        if(e.keyCode == 13){
            console.log('attempting to add new item');

            var $newItemtxt = $('#newItemAddtxt');

            if($newItemtxt.val())
            {
                var newTodoItem = new TodoItem({
                    title : $newItemtxt.val()
                });

                this.model.create(newTodoItem);
            }

            $newItemtxt.val(''); 
        }
            // this.onAddClick();
    },

    // onAddClick: function(){
    //     console.log('attempting to add new item');

    //     var $newItemtxt = $('#newItemAddtxt');

    //     if($newItemtxt.val())
    //     {
    //         var newTodoItem = new TodoItem({
    //             title : $newItemtxt.val()
    //         });

    //         this.model.create(newTodoItem);
    //     }

    //     $newItemtxt.val('');        
    // },
    
    render: function(){
        
        //using template code
        var template = $('#todoItemsTemplate').html();
        var html = Mustache.render(template);
        this.$el.html(html);


        //following 4 lines are without template.
        // var self = this;
        // this.$el.append("<input type='text' id='newItemAddtxt' placeholder='add new item'></input>");
        // this.$el.append('<button id="addButton">Add</button>');
        // this.$el.append('<ul id="todoList"></ul>');

        //we don't need the following section code as we are iterating when we are adding the items in the 'onAddTodoItem' function
        // this.model.each(function(todo){
        //     var view = new TodoView({ model : todo });
        //     self.$el.append(view.render().$el);
        // })

        return this;
    }
})
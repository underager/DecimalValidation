$(document).ready(function(){

    var todoItems = new TodoItems();
    todoItems.fetch();
    
    var todoViews = new TodoViews({
        model: todoItems
    });

$('body').append(todoViews.render().$el);

});
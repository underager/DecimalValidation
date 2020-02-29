$(document).ready(function(){

    
    var todoViews = new TodoViews({
    });

$('body').append(todoViews.render().$el);

});
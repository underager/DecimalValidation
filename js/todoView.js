var TodoView = Backbone.View.extend({
    tagName: 'li',
    
    initialize: function(options){
        if(!(options && options.model)){
            throw new Error('Need to pass a model ');
        }

        this.model.on('change', this.render, this);
    },

    events: {
        'click #toggle': 'onCheckboxClick',
        'click #deleteButton': 'onDeleteClick'
    },

    onDeleteClick: function(){
        console.log('delete button clicked');
        console.log('about to destroy item : '+this.model.toJSON().description);
        this.model.destroy();
    },

    onCheckboxClick: function(){
        
        this.model.toggle();
        this.model.save();
        console.log(this.model.toJSON());
    },

    render: function(){
        this.$el.toggleClass('completed', this.model.get('completed'));

        this.$el.attr('id',this.model.id);

        var template = $('#todoItemTemplate').html();
        var html = Mustache.render(template, this.model.toJSON());
        this.$el.html(html);
        // var checked = this.model.get('completed')?"checked":"";
        // this.$el.html("<input type='checkbox' id='toggle' " + checked + "></input>" + this.model.escape('title') + "<button id='deleteButton'>Delete</button>");

        return this;
    }
})
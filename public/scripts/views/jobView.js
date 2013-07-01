define(['jquery','underscore', 'backbone', 'text!templates/job.mustache', 'views/jobFormView'],function($, _, Backbone, tmpl, JobFormView){
  var JobView = Backbone.View.extend({
    tag: 'li',
    className: 'job',
    initialize: function(options){
      this.model.on('destroy', this.remove, this);
    },
    events: {
      'click ._delete' : 'deleteItem',
      'click ._edit' : 'editItem'
    },
    render: function(){
      $(this.el).html(Mustache.render(tmpl, this.model.toJSON()));
      return this;
    },
    deleteItem: function(){
      this.model.destroy();
    },
    editItem: function(){
      var formView = new JobFormView({ model: this.model });
      $(this.el).html(formView.render().el);
    }
  });
  return JobView;
});

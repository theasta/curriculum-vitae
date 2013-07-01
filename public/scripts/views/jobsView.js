define(['jquery','underscore', 'backbone', 'views/jobView', 'text!templates/jobs.mustache', 'views/jobFormView'],function($, _, Backbone, JobView, tmpl, JobFormView ){
  var JobsView = Backbone.View.extend({
    events: {
      'click ._add' : 'addItem'
    },
    initialize: function(){
      $(this.el).html(Mustache.render(tmpl, {}));
      $('#container').html(this.el);
      this.collection.bind('reset',this.render, this);
    },
    render: function(){
      var self = this;
      this.$('div.jobs-list').empty().append(this.collection.map(function(job){
        var view = new JobView({
          model: job,
          collection : self.collection
        });
        return view.render().el;
      }));
      return this;
    },
    addItem: function(){
      var formView = new JobFormView({ collection: this.collection });
      this.$('._form').html(formView.render().el);

      // if not already here, add form in the view...
      return false;
    }
  });
  return JobsView;
});

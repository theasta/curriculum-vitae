define(['order!jquery','order!underscore','order!backbone', 'order!collections/jobs', 'order!views/jobsView', 'order!views/timelineView'], function($, _, Backbone, Jobs, JobsView, TimelineView){
  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'index',
      'add' : 'add'
    },
    initialize: function(options){
      var jobsCollection = new Jobs();
      this.jobsView = new JobsView({
        collection: jobsCollection
      });
      this.timelineView = new TimelineView({
        collection: jobsCollection
      });
      jobsCollection.fetch();
    },
    index: function(){
      $('#container-timeline').empty().append(this.timelineView.el);
      $('#container-jobs').empty().append(this.jobsView.el);
      //this.jobsView.collection.fetch();
    },
    add: function(){
      //$('#container-jobs').empty().append(this.jobFormView.el);
    }
  });
  return function(options) {
    var appRouter = new AppRouter(options);
    Backbone.history.start();
  };
});

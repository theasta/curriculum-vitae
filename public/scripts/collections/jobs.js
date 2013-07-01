define(['jquery','underscore', 'backbone', 'models/job'], function($, _, Backbone, Job){
  var Jobs = Backbone.Collection.extend({
    model: Job,
    url : function() {
      //return window.location.protocol + '//' + window.location.hostname + ':3000' + '/jobs';
      return '/jobs';
    },
    getMinStartTimestamp: function(){
      return Math.min.apply(this, this.map(function(model){ return model.get('startTimestamp');}));
    }
  });
  return Jobs;
});

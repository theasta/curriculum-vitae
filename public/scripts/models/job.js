define(['jquery', 'underscore', 'backbone'], function($, _, Backbone ) {
  var Job = Backbone.Model.extend({
    initialize: function(options){
      this.on('change:start', this.setStartTimestamp, this);
      this.setStartTimestamp();
      this.setEndTimestamp();
    },
    validate: function(attrs){
      //@todo validate end & start exist and are date !
      var errors = {};
      console.log('validate model Job',attrs);
      if (!attrs.start) {
        errors.start = 'missing start';
      }
      if (!attrs.end) {
        errors.end = 'missing end';
      }
      if (errors) { return errors; }
    },
    setStartTimestamp: function(){
      var timestamp = +new Date(this.get('start'));
      this.set('startTimestamp', timestamp, {silent: true});
    },
    setEndTimestamp: function(){
      var timestamp = +new Date(this.get('end'));
      this.set('endTimestamp', timestamp, {silent: true});
    }
  });
  return Job;
});

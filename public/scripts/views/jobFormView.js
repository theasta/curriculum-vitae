define(['jquery','underscore', 'backbone', 'text!templates/jobForm.mustache'],function($, _, Backbone, tmpl){
  var JobFormView = Backbone.View.extend({
    events: {
      'click ._cancel' : 'cancelEditItem',
      'click ._save' : 'saveItem'
    },
    initialize: function(){
      this.collection.model.prototype.bind('error', this.displayErrors, this);
    },
    render: function(){
      if (this.model){
        $(this.el).html(Mustache.render(tmpl, this.model.toJSON()));
      } else {
        $(this.el).html(Mustache.render(tmpl), {});
      }
      this.$('form').on('submit', function(e){ return false;});
      return this;
    },
    cancelEditItem: function(){
      // @todo
      return false;
    },
    saveItem: function(){
      this.clearErrors();
      var ret = this.collection.create({
        company: this.$('#companyField').val(),
        title: this.$('#titleField').val(),
        start: this.$('#startField').val(),
        end: this.$('#endField').val(),
        description: this.$('#descriptionField').val()
      });
      return false;
    },
    displayErrors: function(model, errors, options){
      if (errors.start) {
        this.$('#startField').closest('.control-group').addClass('error').find('.warning').text(errors.start).show();
      }
    },
    clearErrors: function(){
      //@todo
    }
  });
  return JobFormView;
});

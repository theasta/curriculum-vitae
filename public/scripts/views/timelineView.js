define(['jquery','underscore', 'backbone', 'raphael'],function($, _, Backbone){
  var timelineView = Backbone.View.extend({
    tag: 'div',
    options: {
      width: 940,
      height: 60,
      margin : 10,
      yearColor: '#dddddd',
      yearLineColor: '#eeeeee'
    },
    initialize: function(){
      this.collection.on('reset',this.render, this);
      this.collection.on('change', this.updateItem, this);
      this.paperWidth = this.options.width - this.options.margin*2;
      this.paper = new Raphael(this.$el[0], this.paperWidth, this.options.height);
    },
    render: function(){
      this.minTime = this.collection.getMinStartTimestamp();
      this.maxTime = +new Date();
      this.totalTime = this.maxTime - this.minTime;
      this.drawLines();
      this.drawItems();
      return this;
    },
    getXCoordForTimestamp: function(timestamp){
      return (timestamp-this.minTime)*this.paperWidth/this.totalTime;
    },
    getWidthForDuration: function(duration){
      return duration*this.paperWidth/this.totalTime;
    },
    drawLines: function(){
      var minYear, maxYear, limit, xYear, line, yearLabel, i;
      minYear = new Date(this.minTime).getFullYear();
      maxYear = new Date(this.maxTime).getFullYear();
      for (i= ++minYear; i <= maxYear; i++) {
        limit = this.options.height - this.options.margin;
        xYear = this.getXCoordForTimestamp(new Date(i,0,1).getTime());
        line = this.paper.path('M'+xYear+' 0L'+xYear+' '+(limit-10));
        yearLabel = this.paper.text(xYear, limit, i);
        line.attr(
          { stroke: this.options.yearLineColor }
        );
        yearLabel.attr(
          { fill: this.options.yearColor }
        );
      }
    },
    drawItems: function(){
      var self = this;
      this.collection.each(function(model){
        self.drawItem(model);
      });
    },
    drawItem: function(model){
      //Paper.rect(x, y, width, height, [r])
      var x = this.getXCoordForTimestamp(model.get('startTimestamp'));
      var y = 6;
      var duration = model.get('endTimestamp') - model.get('startTimestamp');
      var width = this.getWidthForDuration(duration);
      var height= 20;
      var radius= 10;
      this.paper
      .rect(x, y , width, height, radius)
      .attr({
        'stroke-width': 1,
        'fill': '#eeeeee',
        'fill-opacity': 1.0,
        'stroke' : '#dddddd'
      });
    },
    updateItem: function(model){
      if (model.hasChanged('start')) {
        // if change this.minTime then redraw all paper and return
      }
      if (model.hasChanged('start') || model.hasChanged('end')) {
        //update rectangle
      }
      if (model.hasChanged('company')){
        //updatelabel
      }
    }
  });
  return timelineView;
});


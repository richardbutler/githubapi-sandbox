define([
  "underscore",
  "backbone",
  "easel",
  "TweenMax"
],
function( _, Backbone, EaselJS, TweenMax ) {
  "use strict";
  
  var Graph = Backbone.View.extend({
    tagName: "canvas",
    initialize: function( options ) {
      this.lineGraph = new Shape();
      this.lineGraph.shadow = new Shadow( "rgba( 0, 0, 0, .3 )", 0, 2, 1 );
      
      this.stage = new Stage( this.el );
      this.stage.addChild( this.lineGraph );
      
      this.render();
    },
    update: function() {
      var w = this.$el.width(),
          h = this.$el.height(),
          i = 0,
          xInc = w / 50,
          yMax = h,
          xPos = 0,
          yPos = 0,
          isFirst = this.points === null,
          self = this,
          render = function() {
              self.render();
          };
      
      this.data = [];
      this.points = this.points || [];
      
      for ( ; i < 50; i++ ) {
        yPos = yMax * Math.random();
        
        this.data.push( { x: xPos, y: yPos } );
        
        if ( isFirst ) {
          this.points.push( { x: xPos, y: yPos } );
        } else if ( this.points[ i ] ) {
          TweenMax.to( this.points[ i ], 1, {
            x: xPos,
            y: yPos,
            ease: Quart.easeInOut,
            onUpdate: render
          });
        }
        
        xPos += xInc;
      }
    },
    render: function() {
      if ( !this.data ) this.update();
      
      var w = this.$el.width(),
          h = this.$el.height(),
          i = 0,
          g = this.lineGraph.graphics;
      
      g.clear();
      g.beginFill( "rgba( 0, 0, 0, .1 )" );
      g.beginStroke( "#ff9900" );
      g.moveTo( 0, h );
      
      for ( ; i < this.points.length; i++ ) {
        g.lineTo( this.points[ i ].x, this.points[ i ].y );
      }
      
      g.lineTo( w, h );
      g.lineTo( 0, h );
      g.endStroke();
      g.endFill();
      
      this.drawAxis( g );
      this.stage.tick();
    },
    drawAxis: function( g ) {
      var w = this.$el.width(),
          h = this.$el.height();
      
      g.beginStroke( "#333333" );
      g.moveTo( 0, 0 );
      g.lineTo( 0, h );
      g.lineTo( w, h );
      g.endStroke();
    }
  });
  
  return Graph;
});

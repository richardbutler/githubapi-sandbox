define([
  "underscore",
  "backbone",
  "TweenMax",
  "moment",
  "util/css-util",
  "text!github/list/item/template.html"
],
function( _, Backbone, Tween, moment, CssUtil, html ) {
  "use strict";
  
  CssUtil.loadCss( "/app/github/list/item/template.css" );
  
  return Backbone.View.extend({
    tagName: "li",
    template: _.template( html ),
    initialize: function( options ) {
      this.visible = false;
      this.$el.css( "height", 0 );
    },
    render: function() {
      var data = _.extend( { moment: moment }, this.model.toJSON() );
      this.setElement( this.template( data ) );
      return this;
    },
    show: function( delay ) {
      if ( this.visible ) return;
      
      TweenMax.fromTo( this.$el, .5, {
        css: { height: "0", opacity: "0" },
        delay: delay,
        ease: Quart.easeOut
      }, {
        css: { height: "68px", opacity: "1" },
      });
      
      this.visible = true;
    },
    hide: function( delay ) {
      if ( !this.visible ) return;
      
      var self = this;
      
      TweenMax.to( this.$el, .5, {
        css: { height: "0", opacity: "0" },
        delay: delay,
        ease: Quart.easeIn,
        onComplete: function() {
          self.$el.remove();
        }
      });
      
      this.visible = false;
    }
  });
});

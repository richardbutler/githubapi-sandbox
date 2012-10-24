define([
  "github/graph",
  "github/model",
  "github/list",
  "github/component/header"
],
function( Graph, model ) {
  "use strict";
  
  return {
    init: function() {
      var self = this;
      
      this.list = require( "github/list" );
      this.list.init();
      
      this.header = require( "github/component/header" );
      this.header.init();
      
      this.graph = new Graph({ el: "#graph-canvas" });
      
      /*model.on( "change:repository", function( repo ) {
        self.graph.update();
      });*/
    }
  }
});

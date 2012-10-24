define([
  "jquery",
  "underscore",
  "backbone",
  "github/config",
  "github/model",
  "github/list/item",
  "jquery-ui",
  "lib/slimScroll.min"
],
function( $, _, Backbone, Config, model, ListItem ) {
  "use strict";
  
  var GitCommitListView,
      view,
      commits = model.get( "commits" ),
      FilteredCollection,
      collection,
      dispatcher = Config.dispatcher;
      
  model.on( "change:user", function( event ) {
    collection.refresh();
  });
  
  FilteredCollection = Backbone.Collection.extend( {
    initialize: function( models, options ) {
      _( this ).bindAll( "add", "remove", "refresh" );
      
      this.source = commits;
      this.source.bind( "add", this.add );
      this.source.bind( "remove", this.remove );
      this.source.bind( "reset", this.refresh );
      
      this.refresh();
    },
    add: function( models ) {
      var self = this;
      
      models = _.isArray( models ) ? models : [ models ];
      
      _.each( models, function( item ) {
        if ( self.filterItem( item ) ) {
          Backbone.Collection.prototype.add.call( self, item );
        }
      });
    },
    filterItem: function( item ) {
      var user = model.get( "user" );
      return !user || user === "" || user === item.get( "author" ).login;
    },
    refresh: function() {
      var self = this;
      
      this.reset( _.filter( this.source.models, function( item ) {
        return self.filterItem( item );
      }));
    }
  });
  
  GitCommitListView = Backbone.View.extend({
    tagName: "ul",
    initialize: function( options ) {
      _( this ).bindAll( "add", "remove", "reset" );
      
      this.$el.appendTo( $( "#github-list" ) );
      this.$el.slimScroll({
        height: "400px",
        wheelStep: 10
      });
      
      this.renderers = [];
      this.rendererIndex = {};
      this.rendered = false;
      
      this.collection.bind( "add", this.add );
      this.collection.bind( "remove", this.remove );
      this.collection.bind( "reset", this.reset );
      this.reset();
    },
    reset: function() {
      var delay = 0;
      var self = this;
      
      _.each( this.renderers, function( renderer ) {
        if ( !self.collection.contains( renderer.model ) ) {
          self.remove( renderer.model, delay );
          delay += .05;
        }
      });
      
      delay = 0;
      
      this.collection.each( function( model ) {
        if ( !self.rendererIndex[ model.cid ] ) {
          self.add( model, delay );
          delay += .05;
        }
      });
      
      this.render();
    },
    render: function() {
      this.rendered = true;
    },
    add: function( item, index ) {
      if ( item.cid in this.rendererIndex ) return;
      
      var renderer = new ListItem({ model: item }),
          itemIndex = this.collection.indexOf( item );
      
      this.renderers.push( renderer );
      this.rendererIndex[ item.cid ] = renderer;
      
      renderer.render();
      renderer.show( index * .05 );
      
      this.$el.append( renderer.el );
    },
    remove: function( item, index ) {
      if ( !( item.cid in this.rendererIndex ) ) return;
      
      var renderer = _.select( this.renderers, function( r ) {
        return r.model == item;
      });
      
      if ( _.isArray( renderer ) ) {
        renderer = ( renderer.length == 0 ) ? null : renderer[ 0 ];
      }
      
      if ( renderer && this.rendered ) {
        renderer.hide( index * .05 );
        this.renderers = _.without( this.renderers, renderer );
        delete this.rendererIndex[ item.cid ];
      }
    }
  });
  
  collection = new FilteredCollection();
  view = new GitCommitListView({
    collection: collection
  });
  
  return {
    collection: collection,
    view: view,
    init: function() {
      // Nothing
    }
  };
});

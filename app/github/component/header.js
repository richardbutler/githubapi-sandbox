define([
  "jquery",
  "underscore",
  "backbone",
  "github/config",
  "github/model"
],
function( $, _, Backbone, Config, model ) {
  "use strict";
  
  var Header,
      view,
      dispatcher = Config.dispatcher;
      
  Header = Backbone.View.extend({
    tagName: "header",
    initialize: function( options ) {
      _( this ).bindAll( "repoChange", "userChange", "render" );
      
      this.model.get( "repositories" ).on( "reset", this.render );
      this.model.get( "users" ).on( "reset", this.render );
      
      this.repoTemplate = _.template( "<option value='<%= name %>'><%= name %></option>" );
      this.userTemplate = _.template( "<option value='<%= login %>'><%= name %></option>" );
      
      this.$repoSelect = $( "select#repository-select" );
      this.$repoSelect.on( "change", this.repoChange );
      
      this.$userSelect = $( "select#user-select" );
      this.$userSelect.on( "change", this.userChange );
    },
    render: function() {
      var self = this;
      
      this.$repoSelect.empty();
      
      this.model.get( "repositories" ).each( function( repo ) {
        var markup = $( self.repoTemplate( repo.toJSON() ) );
        if ( repo.get( "name" ) == model.get( "repository" ) ) {
            markup.attr( "selected", true );
        }
        self.$repoSelect.append( markup );
      });
      
      this.$userSelect.html( this.userTemplate( { name: "All users", login: "" } ) );
      
      this.model.get( "users" ).each( function( user ) {
        var markup = $( self.userTemplate( user.toJSON() ) );
        if ( user.get( "login" ) == model.get( "user" ) ) {
            markup.attr( "selected", true );
        }
        self.$userSelect.append( markup );
      });
    },
    repoChange: function( event ) {
      this.model.set( "repository", event.currentTarget.value );
    },
    userChange: function( event ) {
      this.model.set( "user", event.currentTarget.value );
    }
  });
  
  view = new Header({
    model: model
  });
  
  return {
    view: view,
    init: function() {
      
    }
  };
});

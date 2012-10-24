define([
  "underscore",
  "backbone",
  "github/model"
],
function( _, Backbone, model ) {
  var Router,
      router,
      ignore = false;
      
  function guard( func ) {
    ignore = true;
    var thing = func()
    ignore = false;
    return thing
  }
  
  Router = Backbone.Router.extend({
    routes: {
      ":repository": "update",
      ":repository/:user": "update"
    },
    update: function( repository, user ) {
      guard(function() {
          model.set( "repository", repository );
          model.set( "user", user || "" );
      });
    },
    init: function() {
      Backbone.history.start({pushState: true});
    },
    updateRoute: function() {
      var path = model.get( "repository" ),
          user = model.get( "user" );
      
      if ( user ) {
        path += "/" + user;
      }
      
      $( "title" ).html( "Backbone Sandbox: " + path );
      this.navigate( path );
    }
  })
  
  router = new Router();
  
  function changeHandler( repository ) {
    if ( ignore ) return;
    router.updateRoute();
  }
  
  model.on( "change:repository", changeHandler );
  model.on( "change:user", changeHandler );
  
  return router;
});

define([
  "jquery",
  "underscore",
  "backbone"
],
function( $, _, Backbone ) {
  "use strict";
  
  var UserCollection = Backbone.Collection.extend({
    initialize: function( models, options ) {
      if ( options ) {
        this.organisation = options.organisation;
      }
    },
    sync: function( method, model, options ) {
      var params = _.extend({
          type: "GET",
          dataType: "jsonp",
          url: model.url(),
          processData: false
      }, options );
      
      return $.ajax( params );
    },
    parse: function( response ) {
      return response.users;
    },
    url: function() {
      return "https://github/api/v2/json/organizations/" +
        this.organisation + "/public_members";
    }
  });
  
  return UserCollection;
});

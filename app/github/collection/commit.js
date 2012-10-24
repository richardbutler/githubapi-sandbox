define([
  "jquery",
  "underscore",
  "backbone"
],
function( $, _, Backbone ) {
  "use strict";
  
  var CommitCollection = Backbone.Collection.extend({
    initialize: function( models, options ) {
      if ( options ) {
        this.organisation = options.organisation;
        this.repository = options.repository;
        this.branch = options.branch || "master";
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
      return response.commits;
    },
    url: function() {
      return "https://github/api/v2/json/commits/list/" +
      this.organisation + "/" +
      this.repository + "/" +
      this.branch;
    }
  });
  
  return CommitCollection;
});

define([
  "underscore",
  "backbone",
  "github/config",
  "github/collection/repository",
  "github/collection/user",
  "github/collection/commit"
],
function( _, Backbone, Config, RepositoryCollection, UserCollection, CommitCollection ) {
  "use strict";
  
  var GithubModel = Backbone.Model.extend({
    initialize: function( attributes, options ) {
      _( this ).bindAll( "repoChange", "userChange" );
      
      this.organisation = options.organisation;
      
      this.set({
        repositories: new RepositoryCollection( [], {
          organisation: this.organisation
        }),
        users: new UserCollection( [], {
          organisation: this.organisation
        }),
        commits: new CommitCollection( [], {
          organisation: this.organisation
        }),
        repository: null,
        user: null
      });
      
      this.on( "change:repository", this.repoChange );
      this.on( "change:user", this.userChange );
    },
    fetch: function() {
      var self = this;
      
      this.get( "repositories" ).fetch().then( function( items ) {
        if ( !self.get( "repository" ) ) {
          var repo = self.get( "repositories" ).at( 0 );
          self.set( "repository", repo.get( "name" ) );
        }
      });
      this.get( "users" ).fetch();
    },
    repoChange: function() {
      var commits = this.get( "commits" );
      commits.repository = this.get( "repository" );
      commits.fetch();
    },
    userChange: function() {
      // Nothing
    }
  });
  
  return new GithubModel({}, {
    organisation: Config.organisation
  });
});

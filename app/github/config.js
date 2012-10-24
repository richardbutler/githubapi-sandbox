define([
  "underscore",
  "backbone"
],
function( _, Backbone )
{
  return {
    organisation: "F35-UX",
    dispatcher: _.extend( {}, Backbone.Events )
  };
});

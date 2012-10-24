require.config({
  deps: [
    "jquery",
    "underscore",
    "backbone",
    "jquery-ui"
  ],
  paths: {
    "backbone": "lib/backbone-bootstrap",
    "backbonejs": "lib/backbone",
    "underscore": "lib/underscore-bootstrap",
    "underscorejs": "lib/underscore",
    "jquery": "lib/jquery-1.7.1.min",
    "jquery-ui": "lib/jquery-ui-1.8.20.custom.min",
    "TweenMax": "lib/greensock/TweenMax",
    "easel": "lib/easeljs-0.4.1.min",
    "moment": "lib/moment",
  //},
  //plugins: {
    "text": "lib/plugins/text",
    "use": "lib/plugins/use"
  },
  packages: [
    "github/list",
    "github/list/item",
    "github/graph"
  ]
});

define([
  "github/view/main-view",
  "github/router",
  "github/model"
],
function( mainView, router, model ) {
  model.fetch();
  mainView.init();
  router.init();
});

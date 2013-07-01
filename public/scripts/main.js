require.config({
  paths: {
    'jquery': 'vendor/jquery-1.7.1',
    'mustache' : 'vendor/mustache',
    'raphael' : 'vendor/raphael',
    'underscore': 'amd-underscore',
    'backbone': 'amd-backbone',
    'order': 'vendor/requirejs/order',
    'text': 'vendor/requirejs/text'
  }
});

require(['mustache','app'], function(nil,initializeApp){
  initializeApp({});
});

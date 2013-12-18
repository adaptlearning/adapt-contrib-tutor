/*
* adapt-contrib-tutor
* License - http://github.com/adaptlearning/adapt_framework/LICENSE
* Maintainers - Kevin Corry <kevinc@learningpool.com>
*/
define(function(require) {

  var Adapt = require('coreJS/adapt');

  var TutorView = Backbone.View.extend({

    className: "extension-tutor",

    initialize: function () {
      this.render();
      this.listenTo(Adapt, 'remove', this.closeTutor, this);
      this.listenTo(Adapt, 'close', this.closeTutor, this);
    },

    events: {
      'click .tutor-done':'closeTutor'
    },

    render: function () {
      var data = this.model.toJSON();
      var template = Handlebars.templates["tutor"];
      $(this.el).html(template(data)).appendTo('#wrapper');
      $('.tutor-inner').show();
      $('.tutor-shadow').fadeIn('fast');
      return this;
    },

    closeTutor: function (event) {
      if (event && event.preventDefault) event.preventDefault();
      this.remove();
    }

  });

  Adapt.on('questionView:showFeedback', function(feedback) {
    new TutorView({model:feedback});
  });

  return TutorView;

});

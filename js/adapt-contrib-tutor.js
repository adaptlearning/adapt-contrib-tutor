/*
* adapt-contrib-tutor
* License - http://github.com/adaptlearning/adapt_framework/LICENSE
* Maintainers - Kevin Corry <kevinc@learningpool.com>, Daryl Hedley <darylhedley@hotmail.com>
*/
define(function(require) {

  var Adapt = require('coreJS/adapt');
  var Backbone = require('backbone');

  var TutorView = Backbone.View.extend({

    className: "extension-tutor",

    initialize: function () {
      this.render();
      this.listenTo(Adapt, 'remove', this.closeTutor, this);
      this.listenTo(Adapt, 'close', this.closeTutor, this);
    },

    events: {
      'click .tutor-done':'closeTutor',
      'click .tutor-icon':'closeTutor'
    },

    render: function () {
      var data = this.model.toJSON();
      var template = Handlebars.templates["tutor"];
      $(this.el).html(template(data)).appendTo('#wrapper');
      $('.tutor-inner').show();
      $('.tutor-shadow').fadeIn('fast');
      _.defer(function(view){
        view.onShown();
      }, this);
      return this;
    },

    onShown: function() {
      Adapt.trigger('feedback:shown');
    },

    closeTutor: function (event) {
      if (event && event.preventDefault) {
        event.preventDefault();
      }

      $(this.$el).fadeOut('fast', _.bind(function() {
        this.remove();
      }, this));

      Adapt.trigger('feedback:closed');
    }

  });

  Adapt.on('questionView:showFeedback', function(feedback) {
    new TutorView({
      model: new Backbone.Model(feedback)
    });
  });

});
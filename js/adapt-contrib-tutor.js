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
      this.listenTo(Adapt, 'device:resize', this.resetTutorSize);
    },

    events: {
      'click .tutor-done':'closeTutor',
      'click .tutor-icon':'closeTutor'
    },

    render: function () {
      var data = this.model.toJSON();
      var template = Handlebars.templates["tutor"];
      this.$el.html(template(data)).appendTo('#wrapper');
      this.showTutor();
      return this;
    },

    resetTutorSize: function() {
      $('.tutor').removeAttr('style');
      this.resizeTutor(true);
    },

    resizeTutor: function(noAnimation) {
      var windowHeight = $(window).height();
      var tutorHeight = $('.tutor').height();
      var animationSpeed = 400;
      if (tutorHeight > windowHeight) {
        $('.tutor').css({'height':'100%', 'top':0, 'overflow-y': 'scroll'})
      } else {
        if (noAnimation) {
          var animationSpeed = 0;
        }
        $('.tutor').css({'margin-top': -(tutorHeight/2)-50, 'opacity': 0}).animate({'margin-top': -(tutorHeight/2), 'opacity':1}, animationSpeed);
      }
    },

    showTutor: function() {
      this.resizeTutor();
      $('.tutor').show();
      $('.tutor-shadow').fadeIn('fast');
    },

    closeTutor: function (event) {
      if (event && event.preventDefault) event.preventDefault();
      this.$el.fadeOut('fast', _.bind(function() {
        this.remove();
        Adapt.trigger('tutor:closed');
      }, this));
      Adapt.trigger('popup:closed');
    }

  });

  Adapt.on('questionView:showFeedback', function(feedback) {
    new TutorView({
      model: new Backbone.Model(feedback)
    });
    Adapt.trigger('popup:opened');
  });

});
define([
  'core/js/adapt',
  './tutorNotify',
  './tutorInline',
  './tutorTypeEnum'
],function(Adapt, tutorNotify, tutorInline, TUTOR_TYPE) {

  var Tutor = Backbone.Controller.extend({

    initialize: function() {
      this.listenTo(Adapt, 'questionView:showFeedback', this.onQuestionViewShowFeedback);
    },

    onQuestionViewShowFeedback: function(view) {
      var feedbackObject = this.getModelFeedback(view.model);

      view.model.set('_currentFeedback', feedbackObject);
      this.triggerFeedback(feedbackObject, view);
    },

    triggerFeedback: function(feedbackObject, view) {
      var triggerHandler;
      var type;

      switch (feedbackObject._type) {
        case TUTOR_TYPE.NOTIFY:
          triggerHandler = tutorNotify;
          break;
        case TUTOR_TYPE.INLINE:
          triggerHandler = tutorInline;
          type = TUTOR_TYPE.INLINE;
          break;
        case TUTOR_TYPE.OVERLAY:
          triggerHandler = tutorInline;
          type = TUTOR_TYPE.OVERLAY;
          break;
        case TUTOR_TYPE.NONE:
        default:
          return;
      }

      new triggerHandler({
        model: view.model,
        parentView: view,
        className: type && 'tutor-container tutor-' + type,
        type: type
      });
    },

    getModelFeedback: function(model) {
      var feedback = model.get('_feedback');

      return {
        title: model.get('feedbackTitle'),
        body: model.get('feedbackMessage'),
        _type: feedback && feedback._type || TUTOR_TYPE.NOTIFY,
        _attributes: { 'data-adapt-id': model.get('_id') },
        _classes: this.getClasses(model)
      };
    },

    getClasses: function(model) {
      var classes = '';
      var component = model.get('_component');
      var extension = model.get('_extension');

      switch (model.get('_isCorrect')) {
        case true:
          classes += ' is-correct';
          break;
        case false:
          classes += model.get('_isAtLeastOneCorrectSelection') ?
            ' is-partially-correct' :
            ' is-incorrect';
      }

      if (component) classes += ' is-component is-' + component;
      if (extension) classes += ' is-extension is-' + extension;

      return classes;
    }

  });

  return Adapt.tutor = new Tutor();

});

define([
    'core/js/adapt',
    './tutorNotify',
    './tutorOverlay',
    './tutorInline',
    './tutorTypeEnum'
],function(Adapt, tutorNotify, tutorOverlay, tutorInline, TUTOR_TYPE) {

    var Tutor = Backbone.Controller.extend({

        types: TUTOR_TYPE,

        initialize: function(options) {

            this.listenTo(Adapt, 'questionView:showFeedback', this.onQuestionViewShowFeedback);

        },

        onQuestionViewShowFeedback: function(view) {

            var feedbackObject = this.getModelFeedback(view.model);
            view.model.set("_currentFeedback", feedbackObject);

            this.triggerFeedback(feedbackObject, view)

        },

        triggerFeedback: function(feedbackObject, view) {

            var triggerHandler;
            switch (feedbackObject._type) {
                case TUTOR_TYPE.NONE: {
                    return;
                } case TUTOR_TYPE.NOTIFY: {
                    triggerHandler = tutorNotify;
                    break;
                } case TUTOR_TYPE.OVERLAY: {
                    triggerHandler = tutorOverlay;
                    break;
                } case TUTOR_TYPE.INLINE: {
                    triggerHandler = tutorInline;
                    break;
                }
            }

            if (!triggerHandler) return;

            new triggerHandler({
                model: view.model,
                parentView: view
            });

        },

        getModelFeedback: function(model) {

            var type = TUTOR_TYPE.INLINE;
            var feedback = model.get("_feedback");           
            if (feedback && feedback._type) {
                type = TUTOR_TYPE(feedback._type.toUpperCase());
            }

            var feedbackObject = {
                title: model.get("feedbackTitle"),
                body: model.get("feedbackMessage"),
                _type: type
            };

            var attributes = {};
            var classes = [];

            if (model.has('_isCorrect')) {
                // Attach specific classes so that feedback can be styled.
                if (model.get('_isCorrect')) {
                    classes.push('correct');
                } else {
                    if (model.has('_isAtLeastOneCorrectSelection')) {
                        // Partially correct feedback is an option.
                        if (model.get('_isAtLeastOneCorrectSelection')) {
                            classes.push('partially-correct');
                        } else {
                            classes.push('incorrect');
                        }
                    } else {
                        classes.push('incorrect');
                    }
                }
            }

            // Add the extension/component type which triggered this.
            if (model.has('_component')) {
                classes.push('component-' + model.get('_component'));
            } else if (model.has('_extension')) {
                classes.push('extension-' + model.get('_extension'));
            }

            // Add the _id property as attribute.
            attributes['data-adapt-id'] = model.get('_id');

            feedbackObject._classes = classes.join(' ');
            feedbackObject._attributes = attributes;

            return feedbackObject;

        }

    });

    Adapt.tutor = new Tutor();

    return Adapt.tutor;

});

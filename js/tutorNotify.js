define([ 'core/js/adapt' ], function(Adapt) {

    var TutorNotify = Backbone.Controller.extend({

        parentView: null,

        initialize: function(options) {
            this.parentView = options.parentView;
            this.listenToOnce(Adapt, 'notify:closed', this.onNotifyClosed);
            this.triggerNotify();
        },

        triggerNotify: function() {
            var alertObject = _.extend({}, this.model.get('_currentFeedback'));
            var feedback = this.model.get('_feedback');
            var shouldShowContinueButton = feedback && feedback._showContinueButton;
            var type = shouldShowContinueButton ? 'prompt' : 'popup';

            if (shouldShowContinueButton) {
                alertObject._prompts = [ { promptText: feedback.continueButtonText } ];
                alertObject._showIcon = false;
            }

            Adapt.trigger('notify:' + type, alertObject);
            Adapt.trigger('tutor:opened', this.parentView, alertObject);
        },

        onNotifyClosed: function() {
            var alertObject = this.model.get('_currentFeedback');

            Adapt.trigger('tutor:closed', this.parentView, alertObject);
        }

    });

    return TutorNotify;

});

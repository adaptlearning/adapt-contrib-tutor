define([
	'core/js/adapt'
], function(Adapt) {

	var TutorNotify = Backbone.Controller.extend({

		initialize: function(options) {

            this.parentView = options.parentView;

            this.listenToOnce(Adapt, "notify:closed", this.onNotifyClosed);
            this.triggerNotify();

		},

        triggerNotify: function() {
            
            var alertObject = _.extend( {}, this.model.get("_currentFeedback") );
            var feedback = this.model.get("_feedback");

            if (feedback && feedback._showContinueButton) {

                alertObject._prompts = [{
                    promptText: feedback.continueButtonText,
                }];
                alertObject._showIcon = false;

                Adapt.trigger('notify:prompt', alertObject);

            } else {

                Adapt.trigger('notify:popup', alertObject);
                
            }

            
            Adapt.trigger('tutor:opened', this.parentView, alertObject);

        },

        onNotifyClosed: function() {

            var alertObject = this.model.get("_currentFeedback");

            Adapt.trigger("tutor:closed", this.parentView, alertObject);

        }


	});

	return TutorNotify;


});
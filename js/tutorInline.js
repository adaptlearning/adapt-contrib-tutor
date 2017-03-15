define([
    'coreJS/adapt'
], function(Adapt) {

    var TutorInline = Backbone.View.extend({

        className: 'tutor-container tutor-inline',

        events: {
            "click .close-button, .close-button-text": "onCloseClick"
        },

        initialize: function (options) {

            this.parentView = options.parentView;
            options.parentView.$(".component-inner").append(this.$el);

            _.bindAll(this, "onTutorOpened", "onTutorClosed");

            this.listenTo(Adapt, {
                "remove": this.onTutorClosed,
                "close": this.onTutorClosed
            });

            this.render();

            this.animateIn();

        },

        render: function() {
            
            var data = this.model.toJSON();
            var template = Handlebars.templates["tutor-overlay"];
            this.$el.html(template(data));

        },

        animateIn: function() {

            var $componentInner = this.parentView.$(".component-inner")
            $componentInner.css({
                "height": $componentInner.height() + "px"
            });

            this.$(".tutor-inner").css({
                display: "block",
                opacity: 0
            }).velocity({
                opacity: 1
            }, {
                duration: 600
            });

            $componentInner.velocity("stop").velocity({
                "height": ($componentInner.height()+this.$(".tutor-inner").height()) + "px"
            }, {
                "duration": 600,
                "complete": this.onTutorOpened
            });

        },

        setFeedbackButtonEnabled: function(bool) {

            this.parentView.$(".buttons-feedback").a11y_cntrl_enabled(bool);

        },

        onTutorOpened: function() {

            this.resetComponentHeight();

            Adapt.trigger("popup:opened", this.$(".tutor-inner"));

            this.$(".tutor-inner").a11y_focus();

            this.setFeedbackButtonEnabled(false);

        },

        resetComponentHeight: function() {
            
            var $componentInner = this.parentView.$(".component-inner")
            $componentInner.css({
                "height": ""
            });

        },

        onCloseClick: function(e) {

            e.preventDefault();
            e.stopPropagation();
            
            this.animateOut(); 
        
        },

        animateOut: function() {

            var $componentInner = this.parentView.$(".component-inner")
            $componentInner.css({
                "height": $componentInner.height() + "px"
            });

            this.$(".tutor-inner").velocity({
                opacity: 0
            }, {
                duration: 600
            });
            
            $componentInner.velocity("stop").velocity({
                "height": ($componentInner.height()-this.$(".tutor-inner").height()) + "px"
            }, {
                "duration": 600,
                "complete": this.onTutorClosed
            });

        },

        onTutorClosed: function() {
        
            this.resetComponentHeight();
            this.setFeedbackButtonEnabled(true);

            this.remove();
            Adapt.trigger("popup:closed");
        }

    });

    return TutorInline;

});
define([
    'core/js/adapt'
], function(Adapt) {

    var TutorOverlay = Backbone.View.extend({

        className: 'tutor-container tutor-overlay',

        events: {
            "click .close-button, .close-button-text": "onCloseClick"
        },

        initialize: function (options) {

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

            this.$(".tutor-inner").velocity("stop").velocity({
                "opacity": 0
            }, {
                "duration": 0,
                "display": "block"
            }).velocity({
                "opacity": 1
            }, {
                "duration": 600,
                "complete": this.onTutorOpened
            });

        },

        onTutorOpened: function() {

            Adapt.trigger("popup:opened", this.$(".tutor-inner"));

        },

        onCloseClick: function(e) {

            e.preventDefault();
            e.stopPropagation();
            
            this.animateOut(); 
        
        },

        animateOut: function() {
            
            this.$(".tutor-inner").velocity("stop").velocity({
                "opacity": 0
            }, {
                "duration": 600,
                "complete": this.onTutorClosed
            });

        },

        onTutorClosed: function() {
                    
            this.remove();

            Adapt.trigger("popup:closed");

        }

    });

    return TutorOverlay;

});

define([ 'core/js/adapt' ], function(Adapt) {

    var TutorInline = Backbone.View.extend({

        parentView: null,

        type: null,

        events: {
            'click .continue-button, .close-button': 'onCloseClick'
        },

        initialize: function(options) {
            this.parentView = options.parentView;
            this.type = options.type;
            _.bindAll(this, 'onTutorOpened', 'onTutorClosed');
            this.listenTo(Adapt, 'remove close', this.onTutorClosed);
            this.render();
            this.toggleFeedback(true);
        },

        render: function() {
            this.$el
                .html(Handlebars.templates.tutor(this.model.toJSON()))
                .appendTo(this.parentView.$('.component-inner'));
        },

        toggleFeedback: function(shouldExpand) {
            var animation = this.type === 'inline' ? 'slide' : 'fade';
            var callback = shouldExpand ? this.onTutorOpened : this.onTutorClosed;

            this.parentView.$('.buttons-feedback').a11y_cntrl_enabled(!shouldExpand);
            this.$('.continue-button, .close-button').a11y_cntrl_enabled(shouldExpand);
            this.$('.tutor-inner').stop()[animation + 'Toggle'](600, callback);
        },

        onCloseClick: function() {
            this.toggleFeedback(false);
        },

        onTutorOpened: function() {
            this.$('.tutor-inner').a11y_focus();
        },

        onTutorClosed: function() {
            this.parentView.$('.buttons-feedback').a11y_focus();
            this.remove();
        }

    });

    return TutorInline;

});

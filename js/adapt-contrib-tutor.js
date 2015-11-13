define([
    'coreJS/adapt'
],function(Adapt) {

    Adapt.on('questionView:showFeedback', function(view) {

        var alertObject = {
            title: view.model.get("feedbackTitle"),
            body: view.model.get("feedbackMessage")
        };

        if (view.model.has('_isCorrect')) {
            alertObject._classes = view.model.get('_isCorrect') ? 'correct' : 'incorrect';
        }

        Adapt.once("notify:closed", function() {
            Adapt.trigger("tutor:closed");
        });

        Adapt.trigger('notify:popup', alertObject);
        
        Adapt.trigger('tutor:opened');
    });

});

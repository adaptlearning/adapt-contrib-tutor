define([
    'coreJS/adapt'
],function(Adapt) {

      /**
       * The screen width can fall into one of three categories: large, medium
       * or small. There is a large and a small image. If the screen width is
       * medium get the small image src otherwise get the src corresponding to
       * the screen width.
       * @param image
       * @param width
       * @returns {*}
       */
      function getImageSrc (image, width) {
        if (width !== 'large') {
          width = 'small';
        }
        return image[ width ];
      }

      Adapt.on('questionView:showFeedback', function(view) {

        var image = view.model.get("feedbackImage");
        if (image) {
          var imageSrc = getImageSrc(image, Adapt.device.screenSize);
          _.extend(image, {src: imageSrc});
        }

        var alertObject = {
            title: view.model.get("feedbackTitle"),
            body: view.model.get("feedbackMessage"),
            image: image
        };

        var attributes = {};
        var classes = [];

        if (view.model.has('_isCorrect')) {
            // Attach specific classes so that feedback can be styled.
            if (view.model.get('_isCorrect')) {
                classes.push('correct');
            } else {
                if (view.model.has('_isAtLeastOneCorrectSelection')) {
                    // Partially correct feedback is an option.
                    if (view.model.get('_isAtLeastOneCorrectSelection')) {
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
        if (view.model.has('_component')) {
            classes.push('component-' + view.model.get('_component'));
        } else if (view.model.has('_extension')) {
            classes.push('extension-' + view.model.get('_extension'));
        }

        // Add the _id property as attribute.
        attributes['data-adapt-id'] = view.model.get('_id');

        alertObject._classes = classes.join(' ');
        alertObject._attributes = attributes;

        Adapt.once("notify:closed", function() {
            Adapt.trigger("tutor:closed", view, alertObject);
        });

        Adapt.trigger('notify:popup', alertObject);

        Adapt.trigger('tutor:opened', view, alertObject);
    });

});

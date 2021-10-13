import Adapt from 'core/js/adapt';
import notify from 'core/js/notify';

export default class TutorNotify extends Backbone.Controller {

  initialize(options) {
    this.parentView = options.parentView;
    this.listenToOnce(Adapt, 'notify:closed', this.onNotifyClosed);
    this.triggerNotify();
  }

  triggerNotify() {
    const {
      _hasNotifyBottomButton: isButtonEnabled,
      _button: { text: promptText }
    } = this.model.toJSON();

    this.notifyOptions = {
      ...this.model.toJSON(),
      _prompts: isButtonEnabled && [{
        promptText: Handlebars.compile(promptText)({ _globals: Adapt.course.get('_globals') })
      }],
      _type: isButtonEnabled ? 'prompt' : 'popup'
    };

    notify.create(this.notifyOptions);
    Adapt.trigger('tutor:opened', this.parentView, this.notifyOptions);
  }

  onNotifyClosed() {
    Adapt.trigger('tutor:closed', this.parentView, this.notifyOptions);
  }

}

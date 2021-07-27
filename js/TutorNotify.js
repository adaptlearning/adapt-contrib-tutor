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
      _isEnabled: isButtonEnabled,
      text: promptText
    } = this.model.get('_textButton');

    this.notifyOptions = {
      ...this.model.toJSON(),
      _prompts: isButtonEnabled && [ { promptText } ],
      _type: isButtonEnabled ? 'prompt' : 'popup'
    };

    notify.create(this.notifyOptions);
    Adapt.trigger('tutor:opened', this.parentView, this.notifyOptions);
  }

  onNotifyClosed() {
    Adapt.trigger('tutor:closed', this.parentView, this.notifyOptions);
  }

}

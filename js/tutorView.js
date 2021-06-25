import Adapt from 'core/js/adapt';
import BUTTON_STATE from 'core/js/enums/buttonStateEnum';

export default class TutorView extends Backbone.View {

  className() {
    return [
      'tutor',
      `tutor-type-${this.model.get('_type')}`,
      this.model.get('_classes')
    ].join(' ');
  }

  events() {
    return { 'click .js-tutor-btn': 'onCloseClick' };
  }

  initialize(options) {
    const parentView = options.parentView;

    this.buttonsView = parentView.buttonsView;
    this.listenTo(parentView, 'postRemove', this.onTutorClosed);
    this.listenTo(this.buttonsView, 'buttons:stateUpdate', this.onButtonsStateUpdate);
    this.render();
  }

  render() {
    this.$el.html(Handlebars.templates.tutor(this.model.toJSON()));
    _.defer(this.postRender.bind(this));
  }

  postRender() {
    this.toggleFeedback(true);
  }

  toggleFeedback(shouldOpen, shouldA11y = true) {
    const animation = this.model.get('_type') === 'inline' ? 'slide' : 'fade';

    const callback = shouldOpen ?
      this.onTutorOpened.bind(this, shouldA11y) :
      this.onTutorClosed.bind(this, shouldA11y);

    if (shouldA11y) {
      Adapt.a11y.toggleEnabled(this.buttonsView.$('.js-btn-feedback'), !shouldOpen);
    }

    this.$('.tutor__inner').stop()[`${animation}Toggle`](200, callback);
  }

  onCloseClick() {
    this.toggleFeedback(false);
  }

  onTutorOpened(shouldA11y) {
    if (shouldA11y) {
      Adapt.a11y.focus(this.$('.tutor__inner'), { defer: true, preventScroll: true });
    }

    Adapt.trigger('tutor:opened', this.parentView, this.model.toJSON());
  }

  onTutorClosed(shouldA11y) {
    if (shouldA11y) {
      const $showFeedbackButton = this.buttonsView.$('.js-btn-feedback');

      Adapt.a11y.focus($showFeedbackButton, { defer: true, preventScroll: true });
    }

    Adapt.trigger('tutor:closed', this.parentView, this.model.toJSON());
    this.remove();
  }

  onButtonsStateUpdate(state) {
    if (state === BUTTON_STATE.RESET) this.toggleFeedback(false, false);
  }

}

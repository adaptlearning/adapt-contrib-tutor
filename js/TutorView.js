import Adapt from 'core/js/adapt';
import BUTTON_STATE from 'core/js/enums/buttonStateEnum';
import a11y from 'core/js/a11y';

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
    this.parentView = options.parentView;
    this.buttonsView = this.parentView.buttonsView;
    this.listenTo(this.parentView, 'postRemove', this.onTutorClosed);
    this.listenTo(this.buttonsView, 'buttons:stateUpdate', this.onButtonsStateUpdate);
    this.render();
  }

  render() {
    this.$el.html(Handlebars.templates.tutor(this.model.toJSON()));
    _.defer(this.postRender.bind(this));
  }

  postRender() {
    this.toggleFeedback({ shouldOpen: true });
  }

  toggleFeedback({ shouldOpen, shouldManageFocus = true } = {}) {
    const animation = this.model.get('_type') === 'inline' ? 'slide' : 'fade';

    const onAnimationEnd = shouldOpen ?
      this.onTutorOpened.bind(this, shouldManageFocus) :
      this.onTutorClosed.bind(this, shouldManageFocus);

    if (shouldManageFocus) {
      a11y.toggleEnabled(this.buttonsView.$('.js-btn-feedback'), !shouldOpen);
    }

    this.$('.tutor__inner').stop()[`${animation}Toggle`](200, onAnimationEnd);
  }

  onCloseClick() {
    this.toggleFeedback({ shouldOpen: false });
  }

  onTutorOpened(shouldManageFocus) {
    if (shouldManageFocus) {
      a11y.focus(this.$('.tutor__inner'), { defer: true, preventScroll: true });
    }
    Adapt.trigger('tutor:opened', this.parentView, this.model.toJSON());
  }

  onTutorClosed(shouldManageFocus) {
    if (shouldManageFocus) {
      const $showFeedbackButton = this.buttonsView.$('.js-btn-feedback');
      a11y.focus($showFeedbackButton, { defer: true, preventScroll: true });
    }
    Adapt.trigger('tutor:closed', this.parentView, this.model.toJSON());
    this.remove();
  }

  onButtonsStateUpdate(state) {
    if (state !== BUTTON_STATE.RESET) return;
    this.toggleFeedback({ shouldOpen: false, shouldManageFocus: false });
  }

}

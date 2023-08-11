import Adapt from 'core/js/adapt';
import TutorModel from './TutorModel';
import TutorNotify from './TutorNotify';
import TutorView from './TutorView';
import TUTOR_TYPE from './TUTOR_TYPE';

class Tutor extends Backbone.Controller {

  initialize() {
    this.listenTo(Adapt, {
      'componentView:postRender': this.onComponentViewPostRender,
      'questionView:showFeedback': this.onQuestionViewShowFeedback,
      'buttonsView:postRender': this.onButtonsViewPostRender
    });
  }

  getTutorType(model) {
    const config = (model.get('_tutor')?._isInherited ?? true)
      ? Adapt.course.get('_tutor')
      : model.get('_tutor');
    if (!config) return;

    return TUTOR_TYPE(config._type?.toUpperCase());
  }

  onComponentViewPostRender(view) {
    const { model } = view;
    if (!model.isTypeGroup('question')) return;
    const type = this.getTutorType(model);
    if (!type) return;
    const shouldShowFeedback = (model.get('_canShowFeedback') && model.get('_isSubmitted') && type === TUTOR_TYPE.INLINE);
    if (!shouldShowFeedback) return;
    model.setupFeedback();
    Adapt.trigger('questionView:showFeedback', view);
  }

  onButtonsViewPostRender(view) {
    const { model } = view;
    const type = this.getTutorType(model);
    if (type !== TUTOR_TYPE.INLINE) return;
    const $btnAction = view.$('.js-btn-action');
    const $btnFeedback = view.$('.js-btn-feedback');
    const $btnMarking = view.$('.js-btn-marking');
    $btnAction.addClass('is-full-width');
    $btnFeedback.addClass('u-display-none');
    $btnMarking.addClass('is-full-width');
  }

  onQuestionViewShowFeedback(view) {
    const parentModel = view.model;
    const tutorModel = new TutorModel(parentModel.get('_tutor'), parentModel);
    const options = { model: tutorModel, parentView: view };

    switch (TUTOR_TYPE(tutorModel.get('_type').toUpperCase())) {
      case TUTOR_TYPE.NOTIFY:
        new TutorNotify(options);
        break;
      case TUTOR_TYPE.INLINE:
      case TUTOR_TYPE.OVERLAY:
        view.$('.component__inner').append(new TutorView(options).$el);
        break;
      case TUTOR_TYPE.NONE:
      default:
        // do nothing
    }
  }

}

export default (Adapt.tutor = new Tutor());

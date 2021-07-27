import Adapt from 'core/js/adapt';
import TutorModel from './TutorModel';
import TutorNotify from './TutorNotify';
import TutorView from './TutorView';
import TUTOR_TYPE from './TUTOR_TYPE';

class Tutor extends Backbone.Controller {

  initialize() {
    this.listenTo(Adapt, 'questionView:showFeedback', this.onQuestionViewShowFeedback);
  }

  onQuestionViewShowFeedback(view) {
    const model = view.model;

    const tutorModel = new TutorModel({
      ...model.get('_tutor'),
      _attributes: { 'data-adapt-id': model.get('_id') },
      _classes: this.getClasses(model),
      title: model.get('feedbackTitle'),
      body: model.get('feedbackMessage')
    });

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

  getClasses(model) {
    const component = model.get('_component');
    const extension = model.get('_extension');

    return [
      model.get('_isCorrect') ?
        'is-correct' :
        model.get('_isAtLeastOneCorrectSelection') ?
          'is-partially-correct' :
          'is-incorrect',
      component && `is-component is-${component}`,
      extension && `is-extension is-${extension}`
    ].filter(Boolean).join(' ');
  }
}

export default (Adapt.tutor = new Tutor());

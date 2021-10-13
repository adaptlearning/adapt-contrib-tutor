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

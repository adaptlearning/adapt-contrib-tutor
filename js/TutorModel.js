import Adapt from 'core/js/adapt';
import TUTOR_TYPE from './TUTOR_TYPE';

export default class TutorModel extends Backbone.Model {

  defaults() {
    return {
      _type: TUTOR_TYPE.NOTIFY.asLowerCase,
      _classes: '',
      _hasNotifyBottomButton: false,
      _button: {
        text: '{{_globals._extensions._tutor.hideFeedback}}',
        ariaLabel: '{{_globals._extensions._tutor.hideFeedback}}'
      },
      ...Adapt.course.get('_tutor')
    };
  }

  initialize(data, parentModel) {
    data = $.extend(true, this.defaults(), data?._isInherited === true ? null : data, {
      _attributes: { 'data-adapt-id': parentModel.get('_id') },
      _id: parentModel.get('_id'),
      _shouldRenderId: false,
      ...(
        parentModel.getFeedback?.() ||
        {
          altTitle: parentModel.get('altFeedbackTitle'),
          title: parentModel.get('feedbackTitle'),
          body: parentModel.get('feedbackMessage')
        }
      )
    });
    data._classes += ` tutor ${this.getOriginClasses(parentModel)}`;
    this.set(data);
  }

  getOriginClasses(model) {
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

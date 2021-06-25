import TUTOR_TYPE from './tutorTypeEnum';

export default class TutorModel extends Backbone.Model {

  defaults() {
    return {
      _type: TUTOR_TYPE.NOTIFY.asLowerCase,
      _textButton: {
        _isEnabled: false,
        text: 'Hide feedback'
      }
    };
  }

}

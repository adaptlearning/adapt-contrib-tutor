import { describe, whereFromPlugin, mutateContent, checkContent, updatePlugin } from 'adapt-migrations';
import _ from 'lodash';

let courseTutorGlobals, components;

describe('Tutor - v2.1.0 to v4.0.0', async () => {
  whereFromPlugin('Tutor - from v2.1.0', { name: 'adapt-contrib-tutor', version: '<4.0.0' });
  mutateContent('Tutor - add globals if missing', async (content) => {
    const course = content.find(({ _type }) => _type === 'course');
    if (!_.has(course, '_globals._extensions._tutor')) _.set(course, '_globals._extensions._tutor', {});
    courseTutorGlobals = course._globals._extensions._tutor;
    return true;
  });
  mutateContent('Tutor - add globals hideFeedback', async (content) => {
    courseTutorGlobals.hideFeedback = 'Hide feedback';
    return true;
  });
  checkContent('Tutor - check globals _tutor attribute', async content => {
    if (courseTutorGlobals === undefined) throw new Error('Tutor - globals _tutor invalid');
    return true;
  });
  checkContent('Tutor - check globals hideFeedback attribute', async content => {
    const isValid = courseTutorGlobals.hideFeedback === 'Hide feedback';
    if (!isValid) throw new Error('Tutor - globals hideFeedback invalid');
    return true;
  });

  // Update components
  mutateContent('Tutor - add _tutor to components if missing', async (content) => {
    components = content.filter(({ _component }) => _component);
    components.forEach(component => {
      if (!_.has(component, '_tutor')) _.set(component, '_tutor', {});
    });
    return true;
  });
  mutateContent('Tutor - add _tutor._type to components', async (content) => {
    components.forEach(component => { _.set(component._tutor, '_type', 'notify'); });
    return true;
  });
  mutateContent('Tutor - add _tutor._classes to components', async (content) => {
    components.forEach(component => { _.set(component._tutor, '_classes', ''); });
    return true;
  });
  mutateContent('Tutor - add _tutor._hasNotifyBottomButton to components', async (content) => {
    components.forEach(component => { _.set(component._tutor, '_hasNotifyBottomButton', false); });
    return true;
  });
  mutateContent('Tutor - add _tutor._button to components', async (content) => {
    components.forEach(component => { _.set(component._tutor, '_button', {}); });
    return true;
  });
  mutateContent('Tutor - add _tutor._button.text to components', async (content) => {
    components.forEach(component => { _.set(component._tutor._button, 'text', '{{_globals._extensions._tutor.hideFeedback}}'); });
    return true;
  });
  mutateContent('Tutor - add _tutor._button.ariaLabel to components', async (content) => {
    components.forEach(component => { _.set(component._tutor._button, 'ariaLabel', '{{_globals._extensions._tutor.hideFeedback}}'); });
    return true;
  });
  checkContent('Tutor - check for _tutor component attribute', async content => {
    const isValid = components.every(({ _tutor }) => _tutor !== undefined);
    if (!isValid) throw new Error('Tutor - components _tutor invalid');
    return true;
  });
  checkContent('Tutor - check for _tutor._type on components', async content => {
    const isValid = components.every(({ _tutor }) => _tutor?._type === 'notify');
    if (!isValid) throw new Error('Tutor - component _tutor._type invalid');
    return true;
  });
  checkContent('Tutor - check for _tutor._classes on components', async content => {
    const isValid = components.every(({ _tutor }) => _tutor._classes !== undefined);
    if (!isValid) throw new Error('Tutor - component _tutor._classes invalid');
    return true;
  });
  checkContent('Tutor - check for _tutor._hasNotifyBottomButton on components', async content => {
    const isValid = components.every(({ _tutor }) => _tutor?._hasNotifyBottomButton === false);
    if (!isValid) throw new Error('Tutor - component _tutor._hasNotifyBottomButton invalid');
    return true;
  });
  checkContent('Tutor - check for _tutor._button on components', async content => {
    const isValid = components.every(({ _tutor }) => _tutor._button !== undefined);
    if (!isValid) throw new Error('Tutor - component _tutor._button invalid');
    return true;
  });
  checkContent('Tutor - check for _tutor._button.text on components', async content => {
    const isValid = components.every(({ _tutor }) => _tutor?._button?.text === '{{_globals._extensions._tutor.hideFeedback}}');
    if (!isValid) throw new Error('Tutor - component _tutor._button.text invalid');
    return true;
  });
  checkContent('Tutor - check for _tutor._button.ariaLabel on components', async content => {
    const isValid = components.every(({ _tutor }) => _tutor?._button?.ariaLabel === '{{_globals._extensions._tutor.hideFeedback}}');
    if (!isValid) throw new Error('Tutor - component _tutor._button.ariaLabel invalid');
    return true;
  });
  updatePlugin('Tutor - update to v4.0.0', { name: 'adapt-contrib-tutor', version: '4.0.0', framework: '>=5.18.0' });
});

describe('Tutor - v4.0.0 to v4.1.0', async () => {
  whereFromPlugin('Tutor - from v4.0.0', { name: 'adapt-contrib-tutor', version: '<4.1.0' });
  mutateContent('Tutor - add course _tutor', async (content) => {
    const course = content.find(({ _type }) => _type === 'course');
    if (!_.has(course, '_tutor')) { _.set(course, '_tutor', {}); }
    return true;
  });
  mutateContent('Tutor - add course _tutor._type', async (content) => {
    const course = content.find(({ _type }) => _type === 'course');
    _.set(course._tutor, '_type', 'notify');
    return true;
  });
  mutateContent('Tutor - add course _tutor._classes', async (content) => {
    const course = content.find(({ _type }) => _type === 'course');
    _.set(course._tutor, '_classes', '');
    return true;
  });
  mutateContent('Tutor - add course _tutor._hasNotifyBottomButton', async (content) => {
    const course = content.find(({ _type }) => _type === 'course');
    _.set(course._tutor, '_hasNotifyBottomButton', false);
    return true;
  });
  mutateContent('Tutor - add course _tutor._button', async (content) => {
    const course = content.find(({ _type }) => _type === 'course');
    _.set(course._tutor, '_button', {});
    return true;
  });
  mutateContent('Tutor - add course _tutor._button', async (content) => {
    const course = content.find(({ _type }) => _type === 'course');
    _.set(course._tutor._button, 'text', '{{_globals._extensions._tutor.hideFeedback}}');
    return true;
  });
  mutateContent('Tutor - add course _tutor.ariaLabel', async (content) => {
    const course = content.find(({ _type }) => _type === 'course');
    _.set(course._tutor._button, 'ariaLabel', '{{_globals._extensions._tutor.hideFeedback}}');
    return true;
  });
  checkContent('Tutor - check for course _tutor', async content => {
    const course = content.find(({ _type }) => _type === 'course');
    const isValid = _.has(course, '_tutor');
    if (!isValid) throw new Error('Tutor - course _tutor invalid');
    return true;
  });
  checkContent('Tutor - check for course _tutor._type', async content => {
    const course = content.find(({ _type }) => _type === 'course');
    const isValid = _.has(course._tutor, '_type');
    if (!isValid) throw new Error('Tutor - course _tutor._type invalid');
    return true;
  });
  checkContent('Tutor - check for course _tutor._classes', async content => {
    const course = content.find(({ _type }) => _type === 'course');
    const isValid = _.has(course._tutor, '_classes');
    if (!isValid) throw new Error('Tutor - course _tutor._classes invalid');
    return true;
  });
  checkContent('Tutor - check for course _tutor._hasNotifyBottomButton', async content => {
    const course = content.find(({ _type }) => _type === 'course');
    const isValid = _.has(course._tutor, '_hasNotifyBottomButton');
    if (!isValid) throw new Error('Tutor - course _tutor._hasNotifyBottomButton invalid');
    return true;
  });
  checkContent('Tutor - check for course _tutor._button', async content => {
    const course = content.find(({ _type }) => _type === 'course');
    const isValid = _.has(course._tutor, '_button');
    if (!isValid) throw new Error('Tutor - course _tutor._button invalid');
    return true;
  });
  checkContent('Tutor - check for course _tutor._button.text', async content => {
    const course = content.find(({ _type }) => _type === 'course');
    const isValid = _.has(course._tutor._button, 'text');
    if (!isValid) throw new Error('Tutor - course _tutor._button.text invalid');
    return true;
  });
  checkContent('Tutor - check for course _tutor._button.ariaLabel', async content => {
    const course = content.find(({ _type }) => _type === 'course');
    const isValid = _.has(course._tutor._button, 'ariaLabel');
    if (!isValid) throw new Error('Tutor - course _tutor._button.ariaLabel invalid');
    return true;
  });

  // Update components
  mutateContent('Tutor - add _tutor._isInherited to components', async (content) => {
    components.forEach(component => { _.set(component._tutor, '_isInherited', true); });
    return true;
  });
  checkContent('Tutor - check for _tutor._isInherited on components', async content => {
    const isValid = components.every(({ _tutor }) => _tutor?._isInherited === true);
    if (!isValid) throw new Error('Tutor - component _tutor._isInherited invalid');
    return true;
  });
  updatePlugin('Tutor - update to v4.1.0', { name: 'adapt-contrib-tutor', version: '4.1.0', framework: '>=5.18.0' });
});

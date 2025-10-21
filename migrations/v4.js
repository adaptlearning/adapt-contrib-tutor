import { describe, whereFromPlugin, mutateContent, checkContent, updatePlugin, getCourse, testStopWhere, testSuccessWhere } from 'adapt-migrations';
import _ from 'lodash';

describe('Tutor - v3.0.0 to v4.0.0', async () => {
  let course, courseTutorGlobals, components;

  whereFromPlugin('Tutor - from v3.0.0', { name: 'adapt-contrib-tutor', version: '>=2.0.0 <4.0.0' });

  mutateContent('Tutor - add globals if missing', async (content) => {
    course = getCourse();
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
    const isValid = components.every(({ _tutor }) => _tutor._type === 'notify');
    if (!isValid) throw new Error('Tutor - component _tutor._type invalid');
    return true;
  });

  checkContent('Tutor - check for _tutor._classes on components', async content => {
    const isValid = components.every(({ _tutor }) => _tutor._classes !== undefined);
    if (!isValid) throw new Error('Tutor - component _tutor._classes invalid');
    return true;
  });

  checkContent('Tutor - check for _tutor._hasNotifyBottomButton on components', async content => {
    const isValid = components.every(({ _tutor }) => _tutor._hasNotifyBottomButton === false);
    if (!isValid) throw new Error('Tutor - component _tutor._hasNotifyBottomButton invalid');
    return true;
  });

  checkContent('Tutor - check for _tutor._button on components', async content => {
    const isValid = components.every(({ _tutor }) => _tutor._button !== undefined);
    if (!isValid) throw new Error('Tutor - component _tutor._button invalid');
    return true;
  });

  checkContent('Tutor - check for _tutor._button.text on components', async content => {
    const isValid = components.every(({ _tutor }) => _tutor._button?.text === '{{_globals._extensions._tutor.hideFeedback}}');
    if (!isValid) throw new Error('Tutor - component _tutor._button.text invalid');
    return true;
  });

  checkContent('Tutor - check for _tutor._button.ariaLabel on components', async content => {
    const isValid = components.every(({ _tutor }) => _tutor._button?.ariaLabel === '{{_globals._extensions._tutor.hideFeedback}}');
    if (!isValid) throw new Error('Tutor - component _tutor._button.ariaLabel invalid');
    return true;
  });

  updatePlugin('Tutor - update to v4.0.0', { name: 'adapt-contrib-tutor', version: '4.0.0', framework: '>=5.18.0' });

  testSuccessWhere('tutor with empty course', {
    fromPlugins: [{ name: 'adapt-contrib-tutor', version: '3.0.0' }],
    content: [
      { _id: 'c-100', _component: 'mcq', _tutor: {} },
      { _id: 'c-105', _component: 'mcq' },
      { _type: 'course' }
    ]
  });

  testSuccessWhere('tutor with empty course globals', {
    fromPlugins: [{ name: 'adapt-contrib-tutor', version: '3.0.0' }],
    content: [
      { _id: 'c-100', _component: 'mcq', _tutor: {} },
      { _type: 'course', _tutor: {}, _globals: { _extensions: { _tutor: {} } } }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-tutor', version: '4.0.0' }]
  });
});

describe('Tutor - v4.0.0 to v4.1.0', async () => {
  let course, components;

  whereFromPlugin('Tutor - from v4.0.0', { name: 'adapt-contrib-tutor', version: '<4.1.0' });

  mutateContent('Tutor - add course _tutor', async (content) => {
    course = getCourse();
    if (!_.has(course, '_tutor')) { _.set(course, '_tutor', {}); }
    return true;
  });

  mutateContent('Tutor - add course _tutor._type', async (content) => {
    _.set(course._tutor, '_type', 'notify');
    return true;
  });

  mutateContent('Tutor - add course _tutor._classes', async (content) => {
    _.set(course._tutor, '_classes', '');
    return true;
  });

  mutateContent('Tutor - add course _tutor._hasNotifyBottomButton', async (content) => {
    _.set(course._tutor, '_hasNotifyBottomButton', false);
    return true;
  });

  mutateContent('Tutor - add course _tutor._button', async (content) => {
    _.set(course._tutor, '_button', {});
    return true;
  });

  mutateContent('Tutor - add course _tutor._button', async (content) => {
    _.set(course._tutor._button, 'text', '{{_globals._extensions._tutor.hideFeedback}}');
    return true;
  });

  mutateContent('Tutor - add course _tutor.ariaLabel', async (content) => {
    _.set(course._tutor._button, 'ariaLabel', '{{_globals._extensions._tutor.hideFeedback}}');
    return true;
  });

  checkContent('Tutor - check for course _tutor', async content => {
    const isValid = _.has(course, '_tutor');
    if (!isValid) throw new Error('Tutor - course _tutor invalid');
    return true;
  });

  checkContent('Tutor - check for course _tutor._type', async content => {
    const isValid = _.has(course._tutor, '_type');
    if (!isValid) throw new Error('Tutor - course _tutor._type invalid');
    return true;
  });

  checkContent('Tutor - check for course _tutor._classes', async content => {
    const isValid = _.has(course._tutor, '_classes');
    if (!isValid) throw new Error('Tutor - course _tutor._classes invalid');
    return true;
  });

  checkContent('Tutor - check for course _tutor._hasNotifyBottomButton', async content => {
    const isValid = _.has(course._tutor, '_hasNotifyBottomButton');
    if (!isValid) throw new Error('Tutor - course _tutor._hasNotifyBottomButton invalid');
    return true;
  });

  checkContent('Tutor - check for course _tutor._button', async content => {
    const isValid = _.has(course._tutor, '_button');
    if (!isValid) throw new Error('Tutor - course _tutor._button invalid');
    return true;
  });

  checkContent('Tutor - check for course _tutor._button.text', async content => {
    const isValid = _.has(course._tutor._button, 'text');
    if (!isValid) throw new Error('Tutor - course _tutor._button.text invalid');
    return true;
  });

  checkContent('Tutor - check for course _tutor._button.ariaLabel', async content => {
    const isValid = _.has(course._tutor._button, 'ariaLabel');
    if (!isValid) throw new Error('Tutor - course _tutor._button.ariaLabel invalid');
    return true;
  });

  // Update components
  mutateContent('Tutor - add _tutor._isInherited to components', async (content) => {
    components = content.filter(({ _component }) => _component);
    components.forEach(component => { _.set(component, '_tutor._isInherited', true); });
    return true;
  });

  checkContent('Tutor - check for _tutor._isInherited on components', async content => {
    const isValid = components.every(({ _tutor }) => _tutor._isInherited === true);
    if (!isValid) throw new Error('Tutor - component _tutor._isInherited invalid');
    return true;
  });

  updatePlugin('Tutor - update to v4.1.0', { name: 'adapt-contrib-tutor', version: '4.1.0', framework: '>=5.18.0' });

  testSuccessWhere('tutor with empty course', {
    fromPlugins: [{ name: 'adapt-contrib-tutor', version: '4.0.0' }],
    content: [
      { _id: 'c-100', _component: 'mcq', _tutor: {} },
      { _id: 'c-105', _component: 'mcq' },
      { _type: 'course' }
    ]
  });

  testSuccessWhere('tutor with empty course globals', {
    fromPlugins: [{ name: 'adapt-contrib-tutor', version: '4.0.0' }],
    content: [
      { _id: 'c-100', _component: 'mcq', _tutor: {} },
      { _type: 'course', _tutor: {}, _globals: { _extensions: { _tutor: {} } } }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-tutor', version: '4.1.0' }]
  });
});

describe('Tutor - 4.8.0 to 4.9.0', async () => {
  let course, components;

  whereFromPlugin('Tutor - from 4.8.0', { name: 'adapt-contrib-tutor', version: '<4.9.0' });

  mutateContent('Tutor - add course _tutor._autoScrollWhenInline', async () => {
    course = getCourse();
    _.set(course._tutor, '_autoScrollWhenInline', true);
    return true;
  });

  // Update components
  mutateContent('Tutor - add _tutor._autoScrollWhenInline to components', async (content) => {
    components = content.filter(({ _component }) => _component);
    components.forEach(component => { _.set(component._tutor, '_autoScrollWhenInline', true); });
    return true;
  });

  checkContent('Tutor - check for course _tutor._autoScrollWhenInline', async () => {
    const isValid = course._tutor._autoScrollWhenInline === true;
    if (!isValid) throw new Error('Tutor - course _tutor._autoScrollWhenInline invalid');
    return true;
  });

  checkContent('Tutor - check for _tutor._autoScrollWhenInline on components', async () => {
    const isValid = components.every(({ _tutor }) => _tutor._autoScrollWhenInline === true);
    if (!isValid) throw new Error('Tutor - component _tutor._autoScrollWhenInline invalid');
    return true;
  });

  updatePlugin('Tutor - update to 4.9.0', { name: 'adapt-contrib-tutor', version: '4.9.0', framework: '>=5.22.8' });

  testSuccessWhere('tutor with empty course', {
    fromPlugins: [{ name: 'adapt-contrib-tutor', version: '4.8.0' }],
    content: [
      { _id: 'c-100', _component: 'mcq', _tutor: {} },
      { _id: 'c-105', _component: 'mcq' },
      { _type: 'course' }
    ]
  });

  testSuccessWhere('tutor with existing course tutor config', {
    fromPlugins: [{ name: 'adapt-contrib-tutor', version: '4.8.0' }],
    content: [
      { _id: 'c-100', _component: 'mcq', _tutor: {} },
      { _type: 'course', _tutor: { _type: 'notify' }, _globals: { _extensions: { _tutor: {} } } }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-tutor', version: '4.9.0' }]
  });
});

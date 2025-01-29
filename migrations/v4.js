import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin } from 'adapt-migrations';
import _ from 'lodash';

describe('Tutor - v2.1.0 to v4.0.0', async () => {
  let tutors, course, courseTutorGlobals;
  whereFromPlugin('Tutor - from v2.1.0', { name: 'adapt-contrib-tutor', version: '<4.0.0' });
  whereContent('Tutor - where tutor', async content => {
    tutors = content.filter(({ _extension }) => _extension === 'tutor');
    if (tutors) return true;
  });
  mutateContent('Tutor - add globals if missing', async (content) => {
    course = content.find(({ _type }) => _type === 'course');
    if (course?._globals?._extensions?._tutor) {
      courseTutorGlobals = course._globals._extensions._tutor;
      return true;
    }
    courseTutorGlobals = course._globals._extensions._tutor = {};
    return true;
  });
  mutateContent('Tutor - add globals hideFeedback', async (content) => {
    courseTutorGlobals.hideFeedback = 'Hide feedback';
    return true;
  });
  checkContent('Tutor - check globals _tutor attribute', async content => {
    if (courseTutorGlobals === undefined) {
      throw new Error('Tutor - globals _tutor invalid');
    }
    return true;
  });
  checkContent('Tutor - check globals hideFeedback attribute', async content => {
    if (courseTutorGlobals?.hideFeedback === undefined) {
      throw new Error('Tutor - globals hideFeedback invalid');
    }
    return true;
  });
  updatePlugin('Tutor - update to v4.0.0', { name: 'adapt-contrib-tutor', version: '4.0.0', framework: '>=5.18' });
});

// Update components
describe('Tutor (components) - v2.1.0 to v4.0.0', async () => {
  let components;
  whereFromPlugin('Tutor (components) - from v2.1.0', { name: 'adapt-contrib-tutor', version: '<4.0.0' });
  whereContent('Tutor - where component', async content => {
    components = content.filter(({ _component }) => _component);
    if (components) return true;
  });
  mutateContent('Tutor (components) - add _tutor if missing', async (content) => {
    // console.log('\n COMPONENTS ' + components.length);
    components.forEach(component => {
      // console.log('\n' + component._id);
      if (!_.has(component, '_tutor')) {
        console.log('\n nope');
        _.set(component, '_tutor', {});
      }
    });
    return true;
  });
  checkContent('Tutor (components) - check for _tutor attribute', async content => {
    let isValid = true;
    components.forEach(component => {
      if (!_.has(component, '_tutor')) isValid = false;
    });
    if (!isValid) {
      throw new Error('Tutor (components) - component _tutor invalid');
    }
    return true;
  });
  updatePlugin('Tutor (components) - update to v4.0.0', { name: 'adapt-contrib-tutor', version: '4.0.0', framework: '>=5.18' });
});

// describe('Tutor - v4.0.0 to v4.1.0', async () => {
//   let tutors, course, courseTutorGlobals;
//   whereFromPlugin('Tutor - from v4.1.0', { name: 'adapt-contrib-tutor', version: '<4.1.0' });
//   whereContent('Tutor - where tutor', async content => {
//     tutors = content.filter(({ _extension }) => _extension === 'tutor');
//     if (tutors) return true;
//   });

//   updatePlugin('Tutor - update to v4.1.0', { name: 'adapt-contrib-tutor', version: '4.1.0', framework: '>=5.18' });
// });

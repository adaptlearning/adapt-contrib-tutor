import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin } from 'adapt-migrations';
import _ from 'lodash';

describe('Tutor - v2.1.0 to v4.0.0', async () => {
  let course, courseTutorGlobals, components;
  whereFromPlugin('Tutor - from v2.1.0', { name: 'adapt-contrib-tutor', version: '<4.0.0' });
  whereContent('Tutor - where ?', async (content) => {
    // Check if Tutor is installed?? Configuration won't exist at this point.
    // return true;

    // Check if any components exist and set components variable
    components = content.filter(({ _component }) => _component);
    return components.length;
  });
  mutateContent('Tutor - add globals if missing', async (content) => {
    course = content.find(({ _type }) => _type === 'course');
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
    if (courseTutorGlobals?.hideFeedback === undefined) throw new Error('Tutor - globals hideFeedback invalid');
    return true;
  });

  // Update components
  mutateContent('Tutor - add _tutor to components if missing', async (content) => {
    components.forEach(component => {
      if (!_.has(component, '_tutor')) _.set(component, '_tutor', {});
    });
    return true;
  });
  checkContent('Tutor - check for _tutor component attribute', async content => {
    const isValid = components.every(({ _tutor }) => _tutor !== undefined);
    if (!isValid) throw new Error('Tutor (components) - component _tutor invalid');
    return true;
  });
  updatePlugin('Tutor - update to v4.0.0', { name: 'adapt-contrib-tutor', version: '4.0.0', framework: '>=5.18.0' });
});

// describe('Tutor - v4.0.0 to v4.1.0', async () => {
//   let tutors, course, courseTutorGlobals;
//   whereFromPlugin('Tutor - from v4.1.0', { name: 'adapt-contrib-tutor', version: '<4.1.0' });
//   whereContent('Tutor - where tutor', async content => {
//     tutors = content.filter(({ _extension }) => _extension === 'tutor');
//     if (tutors) return true;
//   });

//   updatePlugin('Tutor - update to v4.1.0', { name: 'adapt-contrib-tutor', version: '4.1.0', framework: '>=5.18.0' });
// });

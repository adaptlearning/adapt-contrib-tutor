import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin } from 'adapt-migrations';

describe('Tutor - v1.0.0 to v4.0.0', async () => {
  let tutors, course, courseTutorGlobals;
  whereFromPlugin('Tutor - from v1.0.0', { name: 'adapt-contrib-tutor', version: '<4.0.0' });
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
    if (courseTutorGlobals?.scrollAriaLabel === undefined) {
      throw new Error('Tutor - globals hideFeedback invalid');
    }
    return true;
  });
  updatePlugin('Tutor - update to v4.0.0', { name: 'adapt-contrib-tutor', version: '4.0.0', framework: '>=5.18' });
});

describe('Tutor - v4.0.0 to v4.1.0', async () => {
  let tutors, course, courseTutorGlobals;
  whereFromPlugin('Tutor - from v4.1.0', { name: 'adapt-contrib-tutor', version: '<4.1.0' });
  whereContent('Tutor - where tutor', async content => {
    tutors = content.filter(({ _extension }) => _extension === 'tutor');
    if (tutors) return true;
  });

  updatePlugin('Tutor - update to v4.1.0', { name: 'adapt-contrib-tutor', version: '4.1.0', framework: '>=5.18' });
});

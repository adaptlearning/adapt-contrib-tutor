import React from 'react';
import a11y from 'core/js/a11y';
import { classes, compile } from 'core/js/reactHelpers';

export default function TutorGraphic(props) {
  const {
    _graphic,
    showGraphic
  } = props;

  if (!showGraphic) return null;

  return (
    <div className={classes([
      'tutor__image-container',
      _graphic.attribution && 'has-attribution'
    ])}>
      <img
        className='tutor__image'
        src={_graphic._src}
        alt={a11y.normalize(_graphic.alt)}
      />
      {_graphic.attribution &&
      <div className='tutor__attribution'>
        <div
          className='tutor__attribution-inner'
          dangerouslySetInnerHTML={{ __html: compile(_graphic.attribution, props) }}
        />
      </div>
      }
    </div>
  );
}

import React from 'react';
import a11y from 'core/js/a11y';
import { classes, compile, templates } from 'core/js/reactHelpers';

export default function Tutor(props) {
  const {
    _id,
    _type,
    _ariaLevel,
    _graphic,
    _imageAlignment,
    _button,
    title,
    altTitle,
    body,
    onCloseClick
  } = props;

  const hasGraphic = Boolean(_graphic?._src);
  const isGraphicFirst = ['left', 'top'].includes(_imageAlignment);
  const isGraphicLast = ['right', 'bottom'].includes(_imageAlignment);
  const hasCloseButton = ['notify', 'overlay'].includes(_type);
  const headingText = title || altTitle;
  const ariaLevel = a11y.ariaLevel({ id: _id, level: '@component+1', override: _ariaLevel });

  return (
    <div className='tutor__inner'>

      <div className='tutor__content'>
        <div className='tutor__content-inner'>

          <templates.tutorGraphic {...props} showGraphic={hasGraphic && isGraphicFirst} />

          <div className='tutor__text'>
            {headingText &&
            <div className={classes([
              'tutor__title',
              !title && 'aria-label'
            ])}>
              <div
                className='tutor__title-inner'
                role='heading'
                aria-level={ariaLevel}
                dangerouslySetInnerHTML={{ __html: compile(headingText, props) }}
              />
            </div>
            }

            <div className='tutor__body'>
              <div
                className='tutor__body-inner'
                dangerouslySetInnerHTML={{ __html: compile(body || '', props) }}
              />
            </div>
          </div>

          <templates.tutorGraphic {...props} showGraphic={hasGraphic && isGraphicLast} />

          {hasCloseButton &&
          <button
            className='btn-icon tutor__btn-icon js-tutor-btn'
            aria-label={_button?.ariaLabel ? a11y.normalize(compile(_button.ariaLabel, props)) : undefined}
            onClick={onCloseClick}
          >
            <span className='icon' aria-hidden='true' />
          </button>
          }

        </div>
      </div>

    </div>
  );
}

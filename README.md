# adapt-contrib-tutor

**Tutor** is an _extension_ bundled with the [Adapt framework](https://github.com/adaptlearning/adapt_framework).
It provides core [_question components_](https://github.com/adaptlearning/adapt_framework/wiki/Core-Plug-ins-in-the-Adapt-Learning-Framework#question-components) with the ability to display feedback in a modal overlay. Feedback is configured in the individual _question components_, not in **Tutor**.

## Installation

As one of Adapt's _[core extensions](https://github.com/adaptlearning/adapt_framework/wiki/Core-Plug-ins-in-the-Adapt-Learning-Framework#extensions),_ **Tutor** is included with the [installation of the Adapt framework](https://github.com/adaptlearning/adapt_framework/wiki/Manual-installation-of-the-Adapt-framework#installation) and the [installation of the Adapt authoring tool](https://github.com/adaptlearning/adapt_authoring/wiki/Installing-Adapt-Origin).

- If **Tutor** has been uninstalled from the Adapt framework, it may be reinstalled.
  With the [Adapt CLI](https://github.com/adaptlearning/adapt-cli) installed, run the following from the command line:
  `adapt install adapt-contrib-tutor`

      Alternatively, this component can also be installed by adding the following line of code to the *adapt.json* file:
      `"adapt-contrib-tutor": "*"`
      Then running the command:
      `adapt install`
      (This second method will reinstall all plug-ins listed in *adapt.json*.)

- If **Tutor** has been uninstalled from the Adapt authoring tool, it may be reinstalled using the [Plug-in Manager](https://github.com/adaptlearning/adapt_authoring/wiki/Plugin-Manager).

## Settings

**\_type** (string): Question feedback display type, either `"notify"` for default pop-up, `"inline"` to appear beneath the component, `"overlay"` to cover the component or `"none"` for no feedback to be displayed. Unlike other values, `"inline"` feedback will automatically appear across sessions for submitted questions, and accordingly manipulates the core [buttonsView](https://github.com/adaptlearning/adapt-contrib-core/blob/master/js/views/buttonsView.js) by hiding `btn__feedback` and adding the `is-full-width` class to `btn__action`.

**\_classes** (string): CSS class name to be applied to feedback containing div. The class must be predefined in one of the Less files. Separate multiple classes with a space.

**\_hasNotifyBottomButton** (boolean): Instead of a standard notify close button, the button will appear beneath the notify text. This option is only relevant when `_type` is set to `"notify"`. Default `false`.

**\_button** (object): An object representing the `"notify"` and `"inline"` close button. It contains values for **text** and **ariaLabel**.

> **text** (string): The text for notify and inline feedback buttons. Overlay will always show a cross. Default `"{{_globals._extensions._tutor.hideFeedback}}"`.

> **ariaLabel** (string): The alternative screen reader text for the `"inline"` and `"overlay"` close buttons. Notify will always read the `"text"`. Default `"{{_globals._extensions._tutor.hideFeedback}}"`.

## Limitations

No known limitations.

---

<a href="https://community.adaptlearning.org/" target="_blank"><img src="https://github.com/adaptlearning/documentation/blob/master/04_wiki_assets/plug-ins/images/adapt-logo-mrgn-lft.jpg" alt="adapt learning logo" align="right"></a>
**Author / maintainer:** Adapt Core Team with [contributors](https://github.com/adaptlearning/adapt-contrib-tutor/graphs/contributors)
**Accessibility support:** WAI AA
**RTL support:** Yes
**Cross-platform coverage:** Chrome, Chrome for Android, Firefox (ESR + latest version), Edge, IE11, Safari 12+13 for macOS/iOS/iPadOS, Opera

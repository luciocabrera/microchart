sap.ui.define(['sap/ui/core/UIComponent'], function(UIComponent) {
  'use strict';

  var Component = sap.ui.core.UIComponent.extend('microchart.Component', {
    metadata: {
      rootView: 'microchart.Page',
      dependencies: {
        libs: ['sap.m', 'sap.suite.ui.microchart']
      },
      config: {
        microchart: {
          files: ['Page.view.xml', 'Page.controller.js']
        }
      }
    },
    /**
     * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
     * @public
     * @override
     */
    init: function() {
      // call the base component's init function
      UIComponent.prototype.init.apply(this, arguments);
    }
  });

  return Component;
});

sap.ui.define(['sap/m/MessageToast', 'sap/ui/core/mvc/Controller'], function(
  MessageToast,
  Controller
) {
  'use strict';

  var PageController = Controller.extend('microchart.BulletMicroChart', {
    press: function(oEvent) {
      MessageToast.show('The bullet micro chart is pressed.');
    }
  });

  return PageController;
});

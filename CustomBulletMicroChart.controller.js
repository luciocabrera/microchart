sap.ui.define(
  ['sap/m/MessageToast', 'sap/ui/core/mvc/Controller', 'microchart/formatter'],
  function(MessageToast, Controller, formatter) {
    'use strict';

    var PageController = Controller.extend(
      'microchart.CustomBulletMicroChart',
      {
        formatter: formatter,
        press: function(oEvent) {
          MessageToast.show('The bullet micro chart is pressed.');
        }
      }
    );

    return PageController;
  }
);

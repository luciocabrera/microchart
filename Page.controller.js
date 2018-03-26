sap.ui.define(['sap/m/MessageToast', 'sap/ui/core/mvc/Controller'], function(
  MessageToast,
  Controller
) {
  'use strict';

  var PageController = Controller.extend('microchart.Page', {
    onInit: function() {
      var data = {
        items: [
          {
            planned: 100,
            actual: 20,
            belowplanned: 20,
            remaining: 80,
            overplanned: 0,
            maxValue: 100,
            id: '1'
          },
          {
            planned: 100,
            actual: 300,
            belowplanned: 100,
            remaining: 0,
            overplanned: 200,
            maxValue: 300,
            id: '2'
          },
          {
            planned: 200,
            actual: 50,
            belowplanned: 50,
            remaining: 150,
            overplanned: 0,
            maxValue: 200,
            id: '3'
          },
          {
            planned: 50,
            actual: 400,
            belowplanned: 50,
            remaining: 0,
            overplanned: 350,
            maxValue: 400,
            id: '4'
          },
          {
            planned: 5000,
            actual: 5000,
            belowplanned: 5000,
            remaining: 0,
            overplanned: 0,
            maxValue: 5000,
            id: '5'
          },
          {
            planned: 20,
            actual: -100,
            belowplanned: 0,
            remaining: 120,
            overplanned: 0,
            maxValue: 20,
            id: '6'
          },
          {
            planned: 20,
            actual: 0,
            belowplanned: 20,
            remaining: 0,
            overplanned: 0,
            maxValue: 20,
            id: '7'
          },
          {
            planned: 1601475.86,
            actual: 1849900.37,
            belowplanned: 0,
            remaining: 0,
            overplanned: 0,
            maxValue: 0,
            id: '8'
          },
          {
            planned: 100930,
            actual: 79207.21,
            belowplanned: 0,
            remaining: 0,
            overplanned: 0,
            maxValue: 0,
            id: '9'
          },
          {
            planned: 386156.3,
            actual: 260745.11,
            belowplanned: 0,
            remaining: 0,
            overplanned: 0,
            maxValue: 0,
            id: '10'
          },
          {
            planned: 12016,
            actual: 10275.65,
            belowplanned: 0,
            remaining: 0,
            overplanned: 0,
            maxValue: 0,
            id: '11'
          },
          {
            planned: 580631.25,
            actual: 265009.37,
            belowplanned: 0,
            remaining: 0,
            overplanned: 0,
            maxValue: 0,
            id: '12'
          },
          {
            planned: 394818.03,
            actual: 230145.97,
            belowplanned: 0,
            remaining: 0,
            overplanned: 0,
            maxValue: 0,
            id: '13'
          },
          {
            planned: -124666.67,
            actual: -12869.8,
            belowplanned: 0,
            remaining: 0,
            overplanned: 0,
            maxValue: 0,
            id: '14'
          },
          {
            planned: 124666.67,
            actual: 12869.8,
            belowplanned: 0,
            remaining: 0,
            overplanned: 0,
            maxValue: 0,
            id: '24'
          },
          {
            planned: 2951361.03,
            actual: 2682413.88,
            belowplanned: 0,
            remaining: 0,
            overplanned: 0,
            maxValue: 0,
            id: '15'
          },
          {
            planned: 56670.03,
            actual: 566666.67,
            belowplanned: 0,
            remaining: 0,
            overplanned: 0,
            maxValue: 0,
            id: '16'
          },
          {
            planned: 9425.95,
            actual: 9425.96,
            belowplanned: 0,
            remaining: 0,
            overplanned: 0,
            maxValue: 0,
            id: '17'
          },
          {
            planned: 38338.14,
            actual: -21346.76,
            belowplanned: 0,
            remaining: 0,
            overplanned: 0,
            maxValue: 0,
            id: '18'
          }
        ]
      };

      var oModel = new sap.ui.model.json.JSONModel(data.items);
      this.getView().setModel(oModel, 'view');

      var oTable = this.getView().byId('idTablePercentage');
      this.oTemplate = oTable.getBindingInfo('items').template;
      // oTable.unbindAggregation('items');
      // oTable.bindItems({ path: 'view>/', template: this.oTemplate });
    },
    press: function(oEvent) {
      MessageToast.show('The stacked bar micro chart is pressed.');
    }
  });

  return PageController;
});

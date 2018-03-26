sap.ui.define([], function() {
  'use strict';
  return {
    getPostiveValue: function(value) {
      return value < 0 ? abs(value) : 0;
    },

    currency: function(amount) {
      var change = [];
      change.push(amount);
      var sInternalType = '';
      var amount1 = new sap.ui.model.type.Currency();

      amount1.formatValue(change, sInternalType);
      return amount1;
    }
  };
});

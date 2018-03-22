sap.ui.define([], function() {
  'use strict';
  return {
    getPostiveValue: function(value) {
      return value < 0 ? abs(value) : 0;
    }
  };
});

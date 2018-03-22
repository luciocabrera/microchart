sap.ui.define(
  [
    'jquery.sap.global',
    'sap/suite/ui/microchart/library',
    'sap/ui/core/Element',
    'sap/ui/core/Control'
  ],
  function(jQuery, library, Element, Control) {
    'use strict';

    var control = Element.extend(
      'microchart.control.custombulletmicrochart.BulletMicroChartData',
      {
        metadata: {
          properties: {
            /**
             * The actual value.
             */
            value: { type: 'float', group: 'Misc', defaultValue: '0' },

            /**
             * The semantic color of the actual value.
             */
            color: {
              type: 'sap.m.ValueColor',
              group: 'Misc',
              defaultValue: 'Neutral'
            }
          }
        },

        renderer: function(oRm, oControl) {
          oRm.write('<div');
          oRm.addClass('sapSuiteBMCBarValueMarker');
          oRm.addClass('sapSuiteBMCBarValueMarkerHidden');
          oRm.addClass('sapSuiteBMCModeTypeActual');
          oRm.addClass('sapSuiteBMCSemanticColorNeutral');
          oRm.addClass('sapSuiteBMCSizeXS');
          oRm.writeClasses();
          oRm.writeAttribute('id', oControl.getId() + '-bc-bar-value-marker');
          oRm.write('>');

          oRm.write('</div>');
        } //,
        // setValue: function(fValue) {
        //   this._isValueSet = this._fnIsNumber(fValue);
        //   return this.setProperty('value', this._isValueSet ? fValue : NaN);
        // },

        // _fnIsNumber: function(n) {
        //   return typeof n == 'number' && !isNaN(n) && isFinite(n);
        // },

        // clone: function(sIdSuffix, aLocalIds, oOptions) {
        //   var oClone = Control.prototype.clone.apply(this, arguments);
        //   oClone._isValueSet = this._isValueSet;
        //   return oClone;
        // }
      }
    );

    // BulletMicroChartData.prototype.setValue = function(fValue) {
    //   this._isValueSet = this._fnIsNumber(fValue);
    //   return this.setProperty('value', this._isValueSet ? fValue : NaN);
    // };

    // BulletMicroChartData.prototype._fnIsNumber = function(n) {
    //   return typeof n == 'number' && !isNaN(n) && isFinite(n);
    // };

    // BulletMicroChartData.prototype.clone = function(
    //   sIdSuffix,
    //   aLocalIds,
    //   oOptions
    // ) {
    //   var oClone = Control.prototype.clone.apply(this, arguments);
    //   oClone._isValueSet = this._isValueSet;
    //   return oClone;
    // };

    return control;
  }
);

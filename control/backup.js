sap.ui.define(
  [
    'sap/suite/ui/microchart/BulletMicroChart',
    'sap/suite/ui/microchart/library',
    'sap/m/library'
  ],
  function(microchart, library, MobileLibrary) {
    'use strict';
    var control = microchart.extend(
      'microchart.control.custombulletmicrochart.CustomBulletMicroChart',
      {
        isInitialized: false,

        renderer: function(oRm, oControl) {
          if (!oControl._bThemeApplied) {
            return;
          }
          var oChartData = oControl._calculateChartData();
          var fForecastValuePct = +oChartData.forecastValuePct;
          var sSize;
          if (oControl.getIsResponsive()) {
            sSize = 'sapSuiteBMCResponsive';
          } else {
            sSize = 'sapSuiteBMCSize' + oControl.getSize();
          }
          var sScale = oControl.getScale();
          var sDirection = sap.ui
            .getCore()
            .getConfiguration()
            .getRTL()
            ? 'right'
            : 'left';
          var sMode = 'sapSuiteBMCModeType' + oControl.getMode();
          var sDeltaValue =
            oControl.getMode() === library.BulletMicroChartModeType.Delta
              ? oControl._calculateDeltaValue()
              : 0;
          var bIsActualSet =
            oControl.getActual() && oControl.getActual()._isValueSet;
          var bShowActualValue =
            oControl.getShowActualValue() &&
            oControl.getSize() !== MobileLibrary.Size.XS &&
            oControl.getMode() === library.BulletMicroChartModeType.Actual;
          var bShowDeltaValue =
            oControl.getShowDeltaValue() &&
            oControl.getSize() !== MobileLibrary.Size.XS &&
            oControl.getMode() === library.BulletMicroChartModeType.Delta;
          var bShowTargetValue =
            oControl.getShowTargetValue() &&
            oControl.getSize() !== MobileLibrary.Size.XS;
          var sActualValueLabel = oControl.getActualValueLabel();
          var sDeltaValueLabel = oControl.getDeltaValueLabel();
          var sTargetValueLabel = oControl.getTargetValueLabel();
          var aData = oControl.getThresholds();
          var sAriaLabel = oControl.getAltText();

          var sSemanticColor;
          if (bIsActualSet) {
            sSemanticColor =
              'sapSuiteBMCSemanticColor' + oControl.getActual().getColor();
          }

          oRm.write('<div');
          oRm.writeControlData(oControl);
          oRm.addClass('sapSuiteBMC');
          oRm.addClass('sapSuiteBMCContent');
          oRm.addClass(jQuery.sap.encodeHTML(sSize));
          if (oControl.hasListeners('press')) {
            oRm.addClass('sapSuiteUiMicroChartPointer');
            oRm.writeAttribute('tabindex', '0');
          }
          oRm.writeAttribute('role', 'presentation');
          oRm.writeAttributeEscaped('aria-label', sAriaLabel);

          oRm.writeClasses();

          if (oControl.getWidth()) {
            oRm.addStyle('width', oControl.getWidth());
            oRm.writeStyles();
          }
          oRm.writeAttribute('id', oControl.getId() + '-bc-content');
          oRm.write('>');

          oRm.write('<div');
          oRm.addClass('sapSuiteBMCVerticalAlignmentContainer');
          oRm.addClass('sapSuiteBMCWholeControl');
          oRm.writeClasses();
          oRm.write('>');

          oRm.write('<div');
          oRm.addClass('sapSuiteBMCChart');
          oRm.addClass(jQuery.sap.encodeHTML(sSize));
          oRm.writeClasses();
          oRm.writeAttribute('id', oControl.getId() + '-bc-chart');
          oRm.write('>');
          var sValScale = '';
          oRm.write('<div');
          oRm.addClass('sapSuiteBMCTopLabel');
          oRm.writeClasses();
          oRm.write('>');
          if (bIsActualSet && bShowActualValue) {
            var sActualValueToRender = sActualValueLabel
              ? sActualValueLabel
              : '' + oControl.getActual().getValue();
            sValScale = sActualValueToRender + sScale;
            oRm.write('<div');
            oRm.addClass('sapSuiteBMCItemValue');
            oRm.addClass(jQuery.sap.encodeHTML(sSemanticColor));
            oRm.addClass(jQuery.sap.encodeHTML(sSize));
            oRm.writeClasses();
            oRm.writeStyles();
            oRm.writeAttribute('id', oControl.getId() + '-bc-item-value');
            oRm.write('>');
            oRm.writeEscaped(sValScale);
            oRm.write('</div>');
          } else if (
            bIsActualSet &&
            oControl._isTargetValueSet &&
            bShowDeltaValue
          ) {
            var sDeltaValueToRender = sDeltaValueLabel
              ? sDeltaValueLabel
              : '' + sDeltaValue;
            sValScale = sDeltaValueToRender + sScale;
            oRm.write('<div');
            oRm.addClass('sapSuiteBMCItemValue');
            oRm.addClass(jQuery.sap.encodeHTML(sSemanticColor));
            oRm.addClass(jQuery.sap.encodeHTML(sSize));
            oRm.writeClasses();
            oRm.writeStyles();
            oRm.writeAttribute('id', oControl.getId() + '-bc-item-value');
            oRm.write('>');
            oRm.write('&Delta;');
            oRm.writeEscaped(sValScale);
            oRm.write('</div>');
          }
          oRm.write('</div>');
          oRm.write('<div');
          oRm.addClass('sapSuiteBMCChartCanvas');
          oRm.writeClasses();
          oRm.write('>');
          for (var i = 0; i < oChartData.thresholdsPct.length; i++) {
            if (aData[i]._isValueSet) {
              this.renderThreshold(
                oRm,
                oControl,
                oChartData.thresholdsPct[i],
                sSize
              );
            }
          }

          oRm.write('<div');
          oRm.writeAttribute('id', oControl.getId() + '-chart-bar');
          oRm.addClass('sapSuiteBMCBar');
          oRm.addClass(jQuery.sap.encodeHTML(sSize));
          oRm.addClass('sapSuiteBMCScaleColor' + oControl.getScaleColor());
          oRm.writeClasses();
          oRm.write('>');
          oRm.write('</div>');

          if (bIsActualSet) {
            //render forecast value bar
            if (
              oControl._isForecastValueSet &&
              oControl.getMode() === library.BulletMicroChartModeType.Actual
            ) {
              oRm.write('<div');
              oRm.addClass('sapSuiteBMCForecastBarValue');
              oRm.addClass(jQuery.sap.encodeHTML(sSemanticColor));
              oRm.addClass(jQuery.sap.encodeHTML(sSize));
              oRm.writeClasses();
              oRm.addStyle('width', fForecastValuePct + '%');
              oRm.writeStyles();
              oRm.writeAttribute(
                'id',
                oControl.getId() + '-forecast-bar-value'
              );
              oRm.write('></div>');
            }

            oRm.write('<div');
            oRm.addClass('sapSuiteBMCBarValueMarker');
            oRm.addClass(sMode);
            if (!oControl.getShowValueMarker()) {
              oRm.addClass('sapSuiteBMCBarValueMarkerHidden');
            }
            oRm.addClass(jQuery.sap.encodeHTML(sSemanticColor));
            oRm.addClass(jQuery.sap.encodeHTML(sSize));
            oRm.writeClasses();
            oRm.addStyle(
              jQuery.sap.encodeHTML(sDirection),
              jQuery.sap.encodeHTML(
                parseFloat(oChartData.actualValuePct) + parseFloat(1) + '%'
              )
            );
            if (
              oControl.getMode() === library.BulletMicroChartModeType.Delta &&
              oChartData.actualValuePct <= oChartData.targetValuePct
            ) {
              oRm.addStyle('margin', '0');
            }
            oRm.writeStyles();
            oRm.writeAttribute('id', oControl.getId() + '-bc-bar-value-marker');
            oRm.write('></div>');

            //render actual value bar
            if (
              oControl.getMode() === library.BulletMicroChartModeType.Actual &&
              oChartData.actualValuePct !== 0
            ) {
              oRm.write('<div');
              oRm.addClass('sapSuiteBMCBarValue');
              oRm.addClass(jQuery.sap.encodeHTML(sSemanticColor));
              oRm.addClass(jQuery.sap.encodeHTML(sSize));
              if (oControl._isForecastValueSet) {
                oRm.addClass('sapSuiteBMCForecast');
              }
              oRm.writeClasses();
              oRm.addStyle(
                'width',
                jQuery.sap.encodeHTML(oChartData.actualValuePct + '%')
              );
              oRm.writeStyles();
              oRm.writeAttribute('id', oControl.getId() + '-bc-bar-value');
              oRm.write('></div>');
            } else if (
              oControl._isTargetValueSet &&
              oControl.getMode() === library.BulletMicroChartModeType.Delta
            ) {
              oRm.write('<div');
              oRm.addClass('sapSuiteBMCBarValue');
              oRm.addClass(jQuery.sap.encodeHTML(sSemanticColor));
              oRm.addClass(jQuery.sap.encodeHTML(sSize));
              oRm.writeClasses();
              oRm.addStyle(
                'width',
                jQuery.sap.encodeHTML(
                  Math.abs(
                    oChartData.actualValuePct - oChartData.targetValuePct
                  ) + '%'
                )
              );
              oRm.addStyle(
                jQuery.sap.encodeHTML(sDirection),
                jQuery.sap.encodeHTML(
                  1 +
                    Math.min(
                      oChartData.actualValuePct,
                      oChartData.targetValuePct
                    ) +
                    '%'
                )
              );
              oRm.writeStyles();
              oRm.writeAttribute('id', oControl.getId() + '-bc-bar-value');
              oRm.write('></div>');
            }
          }

          if (oControl._isTargetValueSet) {
            oRm.write('<div');
            oRm.addClass('sapSuiteBMCTargetBarValue');
            oRm.addClass(jQuery.sap.encodeHTML(sSize));
            oRm.writeClasses();
            oRm.addStyle(
              jQuery.sap.encodeHTML(sDirection),
              jQuery.sap.encodeHTML(
                parseFloat(oChartData.targetValuePct).toFixed(2) + '%'
              )
            );
            oRm.writeStyles();
            oRm.writeAttribute('id', oControl.getId() + '-bc-target-bar-value');
            oRm.write('></div>');
            oRm.write('</div>');

            if (bShowTargetValue) {
              oRm.write('<div');
              oRm.addClass('sapSuiteBMCBottomLabel');
              oRm.writeClasses();
              oRm.write('>');
              var sTValToShow = sTargetValueLabel
                ? sTargetValueLabel
                : '' + oControl.getTargetValue();
              var sTValScale = sTValToShow + sScale;
              oRm.write('<div');
              oRm.addClass('sapSuiteBMCTargetValue');
              oRm.addClass(jQuery.sap.encodeHTML(sSize));
              oRm.writeClasses();
              oRm.writeStyles();
              oRm.writeAttribute('id', oControl.getId() + '-bc-target-value');
              oRm.write('>');
              oRm.writeEscaped(sTValScale);
              oRm.write('</div>');
              oRm.write('</div>');
            }
          } else {
            oRm.write('</div>');
          }
          oRm.write('</div>');

          oRm.write('<div');
          oRm.writeAttribute('id', oControl.getId() + '-info');
          oRm.writeAttribute('aria-hidden', 'true');
          oRm.addStyle('display', 'none');
          oRm.writeStyles();
          oRm.write('>');
          oRm.write('</div>');
          oRm.write('</div>');
          oRm.write('</div>');
        }
      }
    );
    return control;
  }
);

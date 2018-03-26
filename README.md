# Custom Bullet Micro Chart
Custom Bullet Micro  Chart based on the original sapui5 control, Basically is a variation of a bar graph, this control incorporates custom behavior depending of the Target and Actual values.
## Extended from
```
class sap.suite.ui.microchart.BulletMicroChart
```
## Required modules with the fully qualified path
```
  [
    'sap/suite/ui/microchart/BulletMicroChart',
    'sap/suite/ui/microchart/library',
    'sap/m/library'
  ]
```
## Basic Properties
Name | Type | Description
------------ | ------------- | -------------
targetValue | float | Displayed as a solid vertical bar.
maxValue    | float | The maximum scale value for the bar chart used for defining a fixed size 
minValue    | float | The minimum scale value for the bar chart used for defining a fixed size 
showActualValue | boolean | Shows the numeric actual value. This property works in Actual mode only.
showTargetValue | boolean | Shows the numeric target value.
## Functions
Name | Description
------------ | -------------
onmouseover | Is called when the control is hovered
renderer    | Takes care for rendering Control
_renderForecastBar  | Takes care for rendering the Forecast Bar, when there is a Forecast value.
_renderActualBar  | Takes care for rendering the Actual Bar, when there is a Actual value.
_createActualBar  | Takes care for creating the Actual and Forecast Bars
_createTargetBar  | Takes care for creating the Target Bar
_createNegativeActualBar  | Takes care for creating the ACtuakl Bar when The Avtual value is negative
## Directory Structure
Path | Content
------------ | -------------
./ | Root directory. Contains most of the configuration files for the project.
./control/custombulletmicrochart | Contains the control itself
## Files
Name | Content
------------ | -------------
style.css| Class style sheet. Contains the custom classes for the control.
CustomBulletMicroChart.js| Contains the source Code of the Control itself.
# XML Views
## Reference example
```
              <mvc:View
                controllerName="microchart.CustomBulletMicroChart"
                xmlns="microchart.control.custombulletmicrochart"
                xmlns:micro="sap.suite.ui.microchart"
                xmlns:l="sap.ui.layout"
                xmlns:m="sap.m"
                xmlns:mvc="sap.ui.core.mvc">
```
## Use in a cell within a Table example
```
              <CustomBulletMicroChart
                minValue="0"
                maxValue="{= ${view>planned} > ${view>actual} ? ${view>planned} : ${view>actual} }"
                size="XS"
                scale="M"
                targetValue="{view>planned}"
                showActualValue="false"
                showTargetValue="false"
                class="sapUiSmallMargin">
                <actual>
                  <micro:BulletMicroChartData
                    value="{view>actual}"
                    color='Neutral' />
                </actual>
                <thresholds>
                  <micro:BulletMicroChartData value="0" color="Error"/>
                </thresholds>
              </CustomBulletMicroChart>
 ```


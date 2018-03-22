(function() {
  'use strict';
  if (window.cordova) {
    document.addEventListener('deviceready', onDeviceReady, false);
  } else {
    init();
  }

  function onDeviceReady() {
    init();
  }

  function init() {
    sap.ui.getCore().attachInit(function() {
      new sap.m.Shell({
        app: new sap.ui.core.ComponentContainer({
          height: '100%',
          name: 'microchart',
          content: getContent()
        }),
        appWidthLimited: false
      }).placeAt('content');
    });
  }

  function getContent() {
    var data = {
      Leaders: [
        { fName: 'Sonia', lName: 'Gandhi', id: '1' },
        { fName: 'Narendra', lName: 'Modi', id: '2' },
        { fName: 'Rahul', lName: 'Gandhi', id: '3' },
        { fName: 'Sushma', lName: 'Swaraj', id: '4' }
      ],

      Party: [{ Party_Name: 'Congress' }, { Party_Name: 'BJP' }]
    };

    var ocontact_data_Model = new sap.ui.model.json.JSONModel();
    ocontact_data_Model.setData(data);
    sap.ui.getCore().setModel(ocontact_data_Model, 'Contact');

    var oCustomerTab = new sap.m.Table({
      selectionChange: function(oControlEvent) {
        var ev = oControlEvent.getParameters().listItem;

        var contextPath = ev.oBindingContexts.Contact;

        alert(contextPath.getModel().getProperty(contextPath.sPath + '/fName'));
      },
      mode: 'SingleSelect',
      columns: [
        new sap.m.Column({
          header: new sap.m.Label({
            text: 'First Name'
          })
        }),
        new sap.m.Column({
          header: new sap.m.Label({
            text: 'Last Name'
          })
        }),
        new sap.m.Column({
          header: new sap.m.Label({
            text: 'Id'
          })
        }),
        new sap.m.Column({
          header: new sap.m.Label({
            text: 'chart'
          })
        })
      ],
      items: {
        path: 'Contact>/Leaders',
        template: new sap.m.ColumnListItem({
          cells: [
            new sap.m.Text({
              text: '{Contact>fName}'
            }),
            new sap.m.Text({
              text: '{Contact>lName}'
            }),

            new sap.m.Text({
              text: '{Contact>id}'
            }),
            new sap.suite.ui.microchart.StackedBarMicroChart('idml', {})
          ]
        })
      }
    });

    oCustomerTab.placeAt('content');
  }
})();

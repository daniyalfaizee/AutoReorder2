// Model.js
// -----------------------
// @module Case
define("DME.AutoReorder.checkout.SS2Model", ["Backbone", "Utils"], function(
    Backbone,
    Utils
) {
    "use strict";

    // @class Case.Fields.Model @extends Backbone.Model
    return Backbone.Model.extend({
      //@property {String} urlRoot
      urlRoot: function (options) {
        Utils.getAbsoluteUrl(
          getExtensionAssetsPath(
            'Modules/AutoReorder/SuiteScript2/AutoReorder.Service.ss'
          ),
          true
        )
      },
      defaults: {
        'autoReOrderSubscribedItemDetails':''
      },
      validate:function(attributes){
        _.forEach(JSON.parse(attributes.autoReOrderSubscribedItemDetails),function(item){
            if(item.frequency == '0' || item.frequency == ''){
                return 'Please select order frequency for all items'
            }
        })
      }
    })
});

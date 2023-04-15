// Model.js
// -----------------------
// @module Case
define("DME.AutoReorder.AutoReorderSubscriptionInfo.SS2Model", ["Backbone", "Utils","SCModel"], function(
    Backbone,
    Utils,
    SCModelComponent
) {
    "use strict";
    var SCModel = SCModelComponent.SCModel;
    function AutoReorderSS2Model(){
        SCModel.call(this);
        this.urlRoot = function(){
            return Utils.getAbsoluteUrl(
                getExtensionAssetsPath(
                    "Modules/AutoReorderSubscriptionInfo/SuiteScript2/AutoReorderSubscriptionInfo.Service.ss"
                ),
                true
            );
        }
        this.deleteRecord = function (id) {
          this.url = Utils.getAbsoluteUrl(
            getExtensionAssetsPath(
              'Modules/AutoReorderSubscriptionInfo/SuiteScript2/AutoReorderSubscriptionInfo.Service.ss?internalid=' +
                id.id
            ),
            true
          )
          this.destroy()
        }
    }
    AutoReorderSS2Model.prototype = Object.create(SCModel.prototype);
    AutoReorderSS2Model.prototype.constructor = AutoReorderSS2Model;
    AutoReorderSS2Model.prototype.getValidationRules = function(){
        return  {
            "name":[
                function(value,name){
                    if(value=='' || value=='undefined'){
                        return Utils.translate("Name cannot be empty")
                    }
                    
                    return ''
                }
            ],
            "record-frequency":[
                function(value,name){
                    if(typeof value=='undefined' || value==''){
                        return Utils.translate("Please Select a Frequency (in Days)")
                    }
                    if(value<1){
                        return Utils.translate("Please Select item Frequency in Days greater than 0")
                    }   
                    if (isNaN(parseInt(value))) {
                      return Utils.translate('Please Enter a Valid Frequency (in Days)')
                    }
                    return ''
                }
            ],
            "record-upcoming-order":[
                function(value,name){
                    if(value=='' || value=='undefined'){
                        return Utils.translate("Upcoming Order cannot be empty")
                    }
                    if (isNaN(parseInt(value))) {
                      return Utils.translate('Please Enter a Valid Upcoming Order')
                    }
                    return ''
                }],
                "record-upcoming-notification":[
                    function(value,name){
                        if(value=='' || value=='undefined'){
                            return Utils.translate("Upcoming Notification cannot be empty")
                        }
                        if (isNaN(parseInt(value))) {
                          return Utils.translate('Please Enter a Valid Upcoming Notification')
                        }
                        return ''
                    }
                ]
        }
    }
    return AutoReorderSS2Model
   
});

// Model.js
// -----------------------
// @module Case
define("DME.AutoReorder.AutoReorder.SS2Model", ["Backbone", "Utils","SCModel"], function(
    Backbone,
    Utils,
    SCModelComponent
) {
    "use strict";
    var SCModel = SCModelComponent.SCModel;
    function AutoReorderSS2Model(){
        SCModel.apply(this,arguments);
        this.urlRoot = function(){
            return Utils.getAbsoluteUrl(
                getExtensionAssetsPath(
                    "Modules/AutoReorder/SuiteScript2/AutoReorder.Service.ss?customerInfo="+this.get("customerInfo")+"&productInfo="+this.get("productInfo")
                ),
                true
            );
        }
    }
    AutoReorderSS2Model.prototype = Object.create(SCModel.prototype);
    AutoReorderSS2Model.prototype.constructor = AutoReorderSS2Model;
    AutoReorderSS2Model.prototype.getValidationRules = function(){
        return {
            "item-checkbox":[
                function(value,name){
                    
                    if(false){
                        return Utils.translate("To Subscribe please Check the Checkbox")
                    }
                    
                    return ''
                }
            ],
            "item-quantity":[
                function(value,name){
                    if(typeof value=='undefined' || value==''){
                        return Utils.translate("Please Enter a Quantity")
                    }
                    if(value<1){
                        return Utils.translate("Please Enter a Quantity greater than 0")
                    }
                    if (isNaN(parseInt(value))) {
                      return Utils.translate('Please Enter a Valid Quantity')
                    }
                    return ''
                }
            ],
            "item-frequency":[
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
            ]
        }
    }
    return AutoReorderSS2Model
   
});

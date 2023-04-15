// Model.js
// -----------------------
// @module Case
define("DME.AutoReorder.AutoReorderItemInfo.SS2Model", ["Backbone", "Utils",'SCModel'], function(
    Backbone,
    Utils,
    SCModelComponent
) {
    "use strict";
    var SCModel = SCModelComponent.SCModel;
    function AutoReorderItemInfoSS2Model(){
        SCModel.call(this);
        this.urlRoot = function(){
            return Utils.getAbsoluteUrl(
                getExtensionAssetsPath(
                    "Modules/AutoReorderItemInfo/SuiteScript2/AutoReorderItemInfo.Service.ss"
                ),
                true
            );
        }
        this.deleteRecord = function(options){
            this.urlRoot = function(){
                return Utils.getAbsoluteUrl(
                    getExtensionAssetsPath(
                        "Modules/AutoReorderItemInfo/SuiteScript2/AutoReorderItemInfo.Service.ss?internalid="+options.id
                    ),
                    true
                );
            }
            return this.destroy();
        }
    }
    AutoReorderItemInfoSS2Model.prototype = Object.create(SCModel.prototype);
    AutoReorderItemInfoSS2Model.prototype.constructor = AutoReorderItemInfoSS2Model;
    AutoReorderItemInfoSS2Model.prototype.getValidationRules = function(){
        return  {
            "name":[
                function(value,name){
                    if(value=='' || value=='undefined'){
                        return Utils.translate("Name cannot be empty")
                    }
                    
                    return ''
                }
            ]
            //is active validation to be done
        }
    }
    return AutoReorderItemInfoSS2Model;
});

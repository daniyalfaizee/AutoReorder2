// Model.js
// -----------------------
// @module Case
define("DME.AutoReorder.checkout.Model", ["Backbone", "Utils", "SCModel"], function(
    Backbone,
    Utils,
    SCModelComponent
) {
    "use strict";
    var SCModel = SCModelComponent.SCModel;
    function AutoReorderCheckoutModel(){
        SCModel.apply(this,arguments);
        this.urlRoot = function(){
            return Utils.getAbsoluteUrl(
                getExtensionAssetsPath(
                    "Modules/checkout/SuiteScript2/AutoReorder.Checkout.Service.ss?customerInfo=" + this.get("customerInfo") + "&productInfo=" + this.get("productInfo")
                ),
                true
            );
        }
    }
    AutoReorderCheckoutModel.prototype = Object.create(SCModel.prototype);
    AutoReorderCheckoutModel.prototype.constructor = AutoReorderCheckoutModel;
    return AutoReorderCheckoutModel;
});
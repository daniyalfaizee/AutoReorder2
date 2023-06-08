define('DME.AutoReorder.checkout', [
  'DME.AutoReorder.checkout.View',
  'OrderWizard.Module.ShowPayments',
  'DME.AutoReorder.checkout.Model'
], function (checkoutView, OrderWizardModuleShowPayments, AutoReorderCheckoutModel) {
  'use strict'

  return {
    mountToApp: function mountToApp(container) {
      var is_auto_reorder_enabled = container
        .getComponent('Environment')
        .getConfig('autoreorderapp.config')
      if (!is_auto_reorder_enabled) {
        return
      }
      /** @type {LayoutComponent} */
      var checkout = container.getComponent('Checkout')
      var cart = container.getComponent('Cart')
      var userComponent = container.getComponent("UserProfile");
      // cart.setTransactionBodyField({
      //   fieldId: 'custbody_tdc_reorder_item_details',
      //   type: 'string',
      //   value: 'tt'
      // })

     

      if (checkout && cart) {
        var cartItems = [];
        var promise = new Promise(function (resolve, reject) {
          jQuery.when(cart.getLines(), userComponent.getUserProfile()).done(function (lines, profile) {
            var lineItems = lines
            for(var i = 0; i < lineItems.length; i++)
              cartItems.push(lineItems[i].item.internalid);
            var model = new AutoReorderCheckoutModel();
            var userInfo = {id: "", login: ""};
            userInfo.id = profile.internalid;
            userInfo.login = profile.isloggedin;
            model.set("customerInfo", userInfo.id);
            model.set("productInfo", JSON.stringify(cartItems));
            resolve(model.fetch())
          })
        })

        promise.then(function (lineItems) {
          checkout.addModuleToStep({
            step_url: 'opc',
            module: {
              id: 'new_module',
              index: 5,
              classname: 'DME.AutoReorder.checkout.View',
              options: {
                container: '#wizard-step-content-left',
                model: lineItems
              }
            }
          })
        })
      }
    }
  }
})
define('DME.AutoReorder.checkout', [
  'DME.AutoReorder.checkout.View',
  'OrderWizard.Module.ShowPayments',
  'LiveOrder.Model'
], function (checkoutView, OrderWizardModuleShowPayments, LiveOrderModel) {
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
      // cart.setTransactionBodyField({
      //   fieldId: 'custbody_tdc_reorder_item_details',
      //   type: 'string',
      //   value: 'tt'
      // })

     

      if (checkout && cart) {
        var promise = new Promise(function (resolve, reject) {
          cart.getLines().then(function (lines) {
            var lineItems = lines
            resolve(lineItems)
          })
        })

        promise.then(function (lineItems) {
          cart.on("beforeSubmit", function(){
            var liveOrderOptions = JSON.parse(LiveOrderModel.getInstance().get('options').custbody_tdc_reorder_item_details);
            // console.log(liveOrderOptions[Object.keys(liveOrderOptions)[0]]);
            console.log({liveOrderOptions:liveOrderOptions});
            var flag = false;
            for(var i = 0; i < Object.keys(liveOrderOptions).length; i++){
              var cartItem = liveOrderOptions[Object.keys(liveOrderOptions)[i]];
              console.log({ cartItem: cartItem })
              if(
                !!cartItem.subscribed && (!cartItem.frequency || !cartItem.quantity)
                ||
                !cartItem.subscribed && (!!cartItem.frequency || !!cartItem.quantity)
              ){
                flag = true;
                break;
              }
            }
            if(!!flag){
              var validateMessage = confirm('Your Subscription request will be denied because you did not provide all the required Information. Click "Ok" to place your Order without Subscribing or "Cancel" to stop the Order placement.');
              if(!!validateMessage){
                console.log("you clicked ok");
                return jQuery.Deferred().reject();//resolve();
              }
              else{
                console.log("you clicked cancel");
                return jQuery.Deferred().reject();
              }
            }
            else{
              console.log("everything ok");
              return jQuery.Deferred().reject();
            }
          });
          cart.on("afterSubmit", function(){
            localStorage.removeItem("subscriptionDetails");
            console.log({localStorage: localStorage});
            return jQuery.Deferred().resolve();
          });
          
          checkout.addModuleToStep({
            step_url: 'opc',
            module: {
              id: 'new_module',
              index: 5,
              classname: 'DME.AutoReorder.checkout.View',
              options: {
                container: '#wizard-step-content-left',
              }
            }
          })
        })
      }
     
      
      
    }
  }
})

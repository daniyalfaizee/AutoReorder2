define('DME.AutoReorder.AutoReorder', [
  'DME.AutoReorder.AutoReorder.View',
  'jQuery',
  'DME.AutoReOrder.FormView',
  'DME.AutoReOrder.CartView',
  'LiveOrder.Model'
], function (
  AutoReorderView,
  jQuery,
  AutoReorderFormView,
  AutoReOrderCartView,
  LiveOrderModel
) {
  'use strict'

  return {
    mountToApp: function mountToApp(container) {
      // using the 'Layout' component we add a new child view inside the 'Header' existing view
      // (there will be a DOM element with the HTML attribute data-view="Header.Logo")
      // more documentation of the Extensibility API in
      // https://system.netsuite.com/help/helpcenter/en_US/APIs/SuiteCommerce/Extensibility/Frontend/index.html

      var is_auto_reorder_enabled = container
        .getComponent('Environment')
        .getConfig('autoreorderapp.config')
      if (!is_auto_reorder_enabled) {
        return
      }

      /** @type {LayoutComponent} */
      var layout = container.getComponent('Layout')
      var cart = container.getComponent('Cart')
      var userComponent = container.getComponent("UserProfile").getUserProfile();
      if (layout) {
        var pdp = container.getComponent('PDP')
        if (pdp) {
          var userInfo = {id: "", login: ""};
          pdp.on('beforeShowContent', function () {
            return userComponent.then(function(profile){
              userInfo.id = profile.internalid;
              userInfo.login = profile.isloggedin;
            });
          });
          pdp.addChildViews('ProductDetails.Full.View', {
            'MainActionView': {
              'AutoReorder.View': {
                childViewIndex: 1,
                childViewConstructor: function () {
                  return new AutoReorderView({
                    container: container,
                    pdp: pdp,
                    cart: cart,
                    userInfo: userInfo
                  })
                }
              }
            }
          })

          if (cart) {
            cart.getLines().then(function (lines) {
              cart.on('beforeShowContent', function () {
                cart.addChildViews(cart.CART_VIEW, {
                  'Item.Tax.Info': {
                    'AutoReOrder.CartView': {
                      childViewIndex: 1,
                      childViewConstructor: function () {
                        return new AutoReOrderCartView({ cartItems: lines })
                      }
                    }
                  }
                })
              })
            })
          }
        }


        layout.registerView('AutoReorder.Form.View', function () {
          return new AutoReorderFormView({
            container: container,
            pdp: pdp,
            cart: cart
          })
        })
      }
    }
  }
})

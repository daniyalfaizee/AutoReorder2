define('DME.AutoReOrder.CartView', [
  'SCView',
  'dme_autoreorder_cart.tpl',
  'underscore'
], function (SCViewModule, dme_autoreorder_cart_tpl, _) {
  'use strict'

  var SCView = SCViewModule.SCView
  function AutoReOrderCartView(options) {
    SCView.call(this, options)
    this.template = dme_autoreorder_cart_tpl
    this.cartItems = options.cartItems
    this.on('afterViewRender', function(){
      
    })
  }

  AutoReOrderCartView.prototype = Object.create(SCView.prototype)
  AutoReOrderCartView.prototype.constructor = AutoReOrderCartView
  AutoReOrderCartView.prototype.getContext = function getContext() {}
  AutoReOrderCartView.prototype.render = function render(e) {
    // this.$el.html(this.template({ flag: Math.random() > 0.5 ? true : false }))
  }
  return AutoReOrderCartView

  
})

// continue from this.on afterappendview

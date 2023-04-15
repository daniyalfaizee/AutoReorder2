define('DME.AutoReorder.AutoReorderSubscriptionInfo.AutoReorderSubscriptionDetailView', [
  'SCView',
  'dme_autoreorder_subscription_detail_view.tpl'
], function (
  SCViewModule,
  dme_autoreorder_subscription_detail_view_tpl
) {
  'use strict'
  var SCView = SCViewModule.SCView
  function AutoReorderSubscriptionDetailView(options) {
    SCView.prototype.initialize.apply(this, options)
    var self = this
    this.template = dme_autoreorder_subscription_detail_view_tpl
  }
  AutoReorderSubscriptionDetailView.prototype = Object.create(SCView.prototype)
  AutoReorderSubscriptionDetailView.prototype.constructor =
    AutoReorderSubscriptionDetailView
  AutoReorderSubscriptionDetailView.prototype.getContext = function () {
    return {}
  }
  return AutoReorderSubscriptionDetailView
})
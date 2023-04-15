define('DME.AutoReorder.AutoReorderSubscriptionInfo.RowView', [
  'SCView',
  'dme_autoreorder_subscription_info_row_view.tpl'
], function (SCViewModule,dme_autoreorder_autoreordersubscriptioninfo_row_view_tpl) {
  'use strict'
  var SCView = SCViewModule.SCView
  function AutoReorderSubscriptionInfoRowView(options) {
    SCView.call(this, options)
    this.template = dme_autoreorder_autoreordersubscriptioninfo_row_view_tpl
  }
  AutoReorderSubscriptionInfoRowView.prototype = Object.create(SCView.prototype)
  AutoReorderSubscriptionInfoRowView.prototype.constructor =
    AutoReorderSubscriptionInfoRowView
  AutoReorderSubscriptionInfoRowView.prototype.getContext = function () {
    return {
    }
  }
  return AutoReorderSubscriptionInfoRowView
})

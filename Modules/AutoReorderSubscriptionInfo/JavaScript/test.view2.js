define('test.view2', [
  'SCView',
  'dme_autoreorder_subscription_detail_view.tpl'
], function (SCViewModule, test_template_tpl) {
  'use strict'
  var SCView = SCViewModule.SCView
  function testView2(options) {
    SCView.apply(this)
    this.template = test_template_tpl
    this.data = options
    this.events = {
      'click [data-action="show-content"]':  showEditModel
    }
    function showEditModel(e) {
      var self = this
      var $target = jQuery(e.target)
      var $row = $target.closest('[data-type="row"]')
      var internalid = $row.data('internalid')
      var model = this.model.get(internalid)
      var view = new testview
      view.showContent({showInModal: true})
    }
  }
  testView2.prototype = Object.create(SCView.prototype)
  testView2.prototype.constructor = testView2
  testView2.prototype.getContext = function getContext() {
    return {
    }
  }
  return testView2
})

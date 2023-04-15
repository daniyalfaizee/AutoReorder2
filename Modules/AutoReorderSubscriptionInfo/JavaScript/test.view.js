define('test.view', [
  'SCView',
  'dme_autoreorder_subscription_detail_view.tpl',
  'test.view2'
], function (SCViewModule, test_template_tpl,testview2) {
  'use strict'
  var SCView = SCViewModule.SCView
  function testView(options) {
    SCView.apply(this)
    this.template = test_template_tpl
    this.data = options
    this.events = {
      'click [data-action="show-content"]': showEditModel
    }
    function showEditModel(e) {
      var self = this
      var $target = jQuery(e.target)
      var $row = $target.closest('[data-type="row"]')
      var internalid = $row.data('internalid')
      // var model = this.model.get(internalid)
      var view = new testview2
      view.showContent({showInModal: true})
    }
  }
  testView.prototype = Object.create(SCView.prototype)
  testView.prototype.constructor = testView
  testView.prototype.getContext = function getContext() {
    return {
      items: this.data
    }
  }
  return testView
})

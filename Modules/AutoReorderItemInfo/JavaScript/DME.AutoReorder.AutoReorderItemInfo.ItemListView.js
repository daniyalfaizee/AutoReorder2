define('DME.AutoReorder.AutoReorderItemInfo.ItemListView', [
  'SCView',
  'dme_autoreorder_item_info_item_list_view.tpl',
  'dme_autoreorder_item_info_item_edit_view.tpl',
  'DME.AutoReorder.AutoReorderItemInfo.SS2Model'
], function (
  SCViewModule,
  dme_autoreorder_item_info_item_list_view_tpl,
  dme_autoreorder_item_info_item_edit_view_tpl,
  AutoReorderItemInfoSS2Model
) {
  'use strict'
  var SCView = SCViewModule.SCView
  function AutoReorderItemInfoItemListView(options) {
    SCView.call(this, options)
    this.template = dme_autoreorder_item_info_item_list_view_tpl
    this.events = {
      'click [data-action="edit"]': 'renderEditView',
      'click [data-action="hide"]': 'renderDetailView',
      'click [data-action="save"]': 'saveChanges',
      'submit form': 'saveForm',
      'change [data-action="update-record"]': 'updateModel'
    }
    this.showSubscriptionItems = options.showSubscriptionItems
    // this.model = new AutoReorderItemInfoSS2Model()
    this.model = options.model
    
    this.data = options.model
    this.childViews = []
  }
  AutoReorderItemInfoItemListView.prototype = Object.create(SCView.prototype)
  AutoReorderItemInfoItemListView.prototype.constructor =
    AutoReorderItemInfoItemListView
  AutoReorderItemInfoItemListView.prototype.getContext = function () {
    
    return {
      model: this.data,
      showSubscriptionItems: this.showSubscriptionItems
    }
  }
  AutoReorderItemInfoItemListView.prototype.saveChanges = function (e) {
    var self = this
    
    this.model.save().done(function (data) {
      // self.model.set(data,'')

      self.data = self.model.attributes
      self.renderDetailView()
    })
  }
  AutoReorderItemInfoItemListView.prototype.updateModel = function (e) {
    var $target = jQuery(e.target)
    var name = $target.attr('name')
    var data = $target.data()
    var self = this
    if (data.name == 'custrecord_tdc_is_subscription_inactive') {
      this.model.set(data.name, $target.is(':checked'))
      
      return
    }
    this.model.set(data.name, $target.val())
  }

  AutoReorderItemInfoItemListView.prototype.renderDetailView = function (e) {
    this.template = dme_autoreorder_item_info_item_list_view_tpl
    this.$el.html(this.template(this.getContext()).slice(39, -7))
  }

  AutoReorderItemInfoItemListView.prototype.renderEditView = function (e) {
    this.template = dme_autoreorder_item_info_item_edit_view_tpl
    this.$el.html(this.template(this.getContext()).slice(4, -5))
    var self = this
    
    _.each(this.data.attributes, function (item, index) {
      if (index == 'custrecord_tdc_is_subscription_inactive') {
        item = self.$el.find('[data-name="' + index + '"]')[0].checked
      }
      self.data.set(index, item)
    })
  }
  return AutoReorderItemInfoItemListView
})

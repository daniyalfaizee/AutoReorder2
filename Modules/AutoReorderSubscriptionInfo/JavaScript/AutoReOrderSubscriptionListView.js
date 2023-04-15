define('DME.AutoReorder.AutoReorderSubscriptionInfo.AutoReorderSubscriptionListView', [
  'SCView',
  'dme_autoreorder_subscription_list_view.tpl',
  'dme_autoreorder_subscriptioneditview.tpl',
  'DME.AutoReorder.AutoReorderSubscriptionInfo.SS2Model'
], function (
  SCViewModule,
  dme_autoreorder_subscription_list_view_tpl,
  dme_autoreorder_subscriptioneditview_tpl,
  AutoReorderSubscriptionInfoSS2Model
) {
  'use strict'
  // var SCView = SCViewModule.SCView
  var SCView = SCViewModule.SCView
  function AutoReorderSubscriptionListView(options) {
    SCView.call(this, options)
    this.template = dme_autoreorder_subscription_list_view_tpl
    this.events = {
      'click [data-action="edit"]': 'renderEditView',
      'click [data-action="hide"]': 'renderDetailView',
      'click [data-action="save"]': 'saveChanges',
      'submit form': 'saveForm',
      'change [data-action="update-record"]': 'updateModel',
      
    }
    
    // this.model = new AutoReorderSubscriptionInfoSS2Model()
    this.model = options.model
    //  this.listenTo(this.model, 'change:record-name', this.saveChanges())
    this.data = this.model.attributes
    this.childViews = []
  }
  AutoReorderSubscriptionListView.prototype = Object.create(SCView.prototype)

  AutoReorderSubscriptionListView.prototype.constructor =
    AutoReorderSubscriptionListView

  AutoReorderSubscriptionListView.prototype.getContext = function () {
    this.data.isinactive = !this.data.isinactive
    return {
      model: this.data
    }
  }

  AutoReorderSubscriptionListView.prototype.saveChanges = function (e) {
    var self = this
    this.model.save().done(function (data) {
      self.data = self.model.attributes
      self.renderDetailView()
    })
  }

  AutoReorderSubscriptionListView.prototype.updateModel = function (e) {
    var $target = jQuery(e.target)
    var name = $target.attr('name')
    var data = $target.data()
    
    var self = this
    if (data.name == 'isinactive') {
      this.model.set(data.name, !$target.is(':checked'))
      return
    }

    this.model.set(data.name, $target.val())
  }

  AutoReorderSubscriptionListView.prototype.renderDetailView = function () {
    this.template = dme_autoreorder_subscription_list_view_tpl
    // this.render()
    // this.parentView.render()
    this.$el.html(this.template(this.getContext()).slice(39, -7))
  }

  AutoReorderSubscriptionListView.prototype.renderEditView = function () {
    this.template = dme_autoreorder_subscriptioneditview_tpl
    this.$el.html(this.template(this.getContext()).slice(4, -5))
    var self = this
    _.each(this.data, function (item, index) {
      if (index == 'record-status') {
        item = self.$el.find('[name="' + index + '"]').checked
      }
      self.model.set(index, item)
    })
    // this.parentView.render()
  }

  return AutoReorderSubscriptionListView
})

define('DME.AutoReorder.SubscriptionEditView', [
  'SCFormView',
  'dme_autoreorder_subscriptioneditview.tpl',
  'Utils'
], function (SCFormViewModule, dme_autoreorder_subscriptioneditview_tpl,
  Utils) {
  'use strict';
  var SCFormView = SCFormViewModule.SCFormView;
  function AutoReorderSubscriptionEditView(options){
    SCFormView.call(this,options.model);
    this.template = dme_autoreorder_subscriptioneditview_tpl;
  }
  AutoReorderSubscriptionEditView.prototype = Object.create(SCFormView.prototype);
  AutoReorderSubscriptionEditView.prototype.constructor = AutoReorderSubscriptionEditView;
  AutoReorderSubscriptionEditView.prototype.getEvents= function getEvents() {
    return {
      'submit form': 'saveForm',
      'change input': 'onFormFieldChange'
    }
  }
  AutoReorderSubscriptionEditView.prototype.saveForm = function saveForm(e) {
    e.preventDefault();
    var promise = SCFormView.prototype.saveForm.call(this, e);
    return promise;
  }
  AutoReorderSubscriptionEditView.prototype.getFormFieldValue = function (input) {
    var field = {
      name: input.attr('name'),
      value: input.val()
    }
    return field
  }
  AutoReorderSubscriptionEditView.prototype.getFormValues = function (form) {
    var formValues = form.serializeObject()
    return formValues
  }
  AutoReorderSubscriptionEditView.prototype.getContext = function(){
    return {
      isNew: true ||this.formModel.isNew(),
      model: this.formModel
    }
  }
  return AutoReorderSubscriptionEditView;
})

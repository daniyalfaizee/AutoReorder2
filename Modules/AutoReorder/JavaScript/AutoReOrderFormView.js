define('DME.AutoReOrder.FormView', [
  'SCFormView',
  'dme_autoreorder_form.tpl',
  'DME.AutoReorder.AutoReorder.SS2Model',
  'Utils'
], function (
  SCFormViewModule,
  dme_autoreorder_form_tpl,
  AutoReorderSS2Model,
  Utils
) {
  'use strict'
  var SCFormView = SCFormViewModule.SCFormView
  var AutoReorderFormViewModel = AutoReorderSS2Model
  function AutoReorderFormView(options) {
    var self = this

    SCFormView.call(this, new AutoReorderFormViewModel())
    this.template = dme_autoreorder_form_tpl
    this.pdp = options.pdp
    this.cart = options.cart
    this.container = options.container
    this.itemInfo = this.pdp.getItemInfo()

    localStorage.setItem('isEditView', false)

    if (this.itemInfo.item.itemoptions_detail.matrixtype) {
      this.isMatrixItem = true
    }
    this.cart.on('afterAddLine', function () {
      self.pdp.setOption('custcol_tdc_reorder_subscribed', 'F')
      self.pdp.setOption('custcol_tdc_reorder_sub_details', '')
    })

    this.itemInfo = this.pdp.getItemInfo()
    this.listenTo(this.formModel, 'change:item-checkbox', this.updateView)
  }
  AutoReorderFormView.prototype = Object.create(SCFormView.prototype)

  AutoReorderFormView.prototype.constructor = AutoReorderFormView

  AutoReorderFormView.prototype.getEvents = function getEvents() {
    return {
      'submit form': 'saveForm',
      'change input': 'onFormFieldChange',
      'click [data-action="render-form"]': 'renderForm'
    }
  }

  AutoReorderFormView.prototype.renderForm = function renderForm(e) {
    e.preventDefault()
    localStorage.setItem('isEditView', true)
    var tempSetSubscriptionDetails = JSON.parse(
      localStorage.getItem('subscriptionDetails')
    )[
      this.isMatrixItem
        ? this.pdp.getSelectedMatrixChilds()[0].itemid
        : this.itemInfo.item.itemid
    ]
    this.formModel.set(
      'item-checkbox',
      tempSetSubscriptionDetails.custcol_tdc_reorder_subscribed
    )
    this.formModel.set(
      'item-quantity',
      tempSetSubscriptionDetails.custcol_tdc_reorder_sub_details[
        'item-quantity'
      ]
    )
    this.formModel.set(
      'item-frequency',
      tempSetSubscriptionDetails.custcol_tdc_reorder_sub_details[
        'item-frequency'
      ]
    )
    this.render()
  }

  AutoReorderFormView.prototype.saveForm = function saveForm(e) {
    e.preventDefault()

    this.tempSetSubscriptionDetails()
    localStorage.setItem('isEditView', false)

    if (this.pdp.getSelectedMatrixChilds().length == 1 || !this.isMatrixItem) {
      this.subscriptionDetails = JSON.parse(
        localStorage.getItem('subscriptionDetails')
      )

      if (
        !this.subscriptionDetails[
          this.isMatrixItem
            ? this.pdp.getSelectedMatrixChilds()[0].itemid
            : this.itemInfo.item.itemid
        ]
      ) {
        this.pdp.setOption('custcol_tdc_reorder_subscribed', 'F')
        this.pdp.setOption('custcol_tdc_reorder_sub_details', '')
      } else {
        console.log('in else');
        this.pdp.setOption('custcol_tdc_reorder_subscribed', 'T')
        this.pdp.setOption(
          'custcol_tdc_reorder_sub_details',
          JSON.stringify(
            this.subscriptionDetails[
              this.isMatrixItem
                ? this.pdp.getSelectedMatrixChilds()[0].itemid
                : this.itemInfo.item.itemid
            ].custcol_tdc_reorder_sub_details
          )
        )
      }
    }

    this.render()

    var promise = SCFormView.prototype.saveForm.call(this, e)

    return promise
  }

  AutoReorderFormView.prototype.tempSetSubscriptionDetails = function () {
    var subscriptionDetails = {}
    localStorage.getItem('subscriptionDetails')
      ? (subscriptionDetails = JSON.parse(
          localStorage.getItem('subscriptionDetails')
        ))
      : (subscriptionDetails = {})
    if (!this.formModel.get('item-checkbox')) {
      delete subscriptionDetails[
        this.isMatrixItem
          ? this.pdp.getSelectedMatrixChilds()[0].itemid
          : this.itemInfo.item.itemid
      ]
    } else {
      subscriptionDetails[
        this.isMatrixItem
          ? this.pdp.getSelectedMatrixChilds()[0].itemid
          : this.itemInfo.item.itemid
      ] = {
        custcol_tdc_reorder_subscribed: this.formModel.get('item-checkbox'),
        custcol_tdc_reorder_sub_details: this.formModel.toJSON()
      }
    }
    localStorage.setItem(
      'subscriptionDetails',
      JSON.stringify(subscriptionDetails)
    )
  }

  AutoReorderFormView.prototype.getFormFieldValue = function (input) {
    var field = {
      name: input.attr('name'),
      value: input.val()
    }
    if (field.name == 'item-checkbox') {
      field.value = input[0].checked
    }
    // if (!this.formModel.getValidationErrors(field)) {
    //   SCFormView.prototype.removeErrorMessage.call(this, field.name)
    // }
    // return {name: field.name || '', error: Utils.translate("Enter a valid " + field.name + ".")}
    return field
  }

  AutoReorderFormView.prototype.getFormValues = function (form) {
    var formValues = form.serializeObject()

    if (formValues['item-checkbox'] != undefined) {
      formValues['item-checkbox'] = true
    }
    return {
      'item-checkbox': formValues['item-checkbox'],
      'item-quantity': formValues['item-quantity'],
      'item-frequency': formValues['item-frequency']
    }
  }

  AutoReorderFormView.prototype.updateView = function (e) {
    var self = this

    var promise = new Promise(function (resolve, reject) {
      // self.formModel.set('item-checkbox', !self.formModel.get('item-checkbox'))
      resolve()
    })
    promise.then(function () {
      var el = self.$el[0].getElementsByClassName('autoreorder-show-items')[0]
      self.formModel.get('item-checkbox')
        ? el.classList.remove('autoreorder-hide-fields')
        : el.classList.add('autoreorder-hide-fields')
      var el2 = self.$el[0].getElementsByClassName(
        'autoreorder-form-submit-button'
      )[0]
      self.formModel.get('item-checkbox')
        ? el2.classList.remove('autoreorder-hide-fields')
        : el2.classList.add('autoreorder-hide-fields')

      if (!self.formModel.get('item-checkbox')) {
        self.tempSetSubscriptionDetails()
      }
    })
  }

  AutoReorderFormView.prototype.getContext = function () {
    var subscriptionDetails = JSON.parse(
      localStorage.getItem('subscriptionDetails')
    )

    if (
      subscriptionDetails &&
      subscriptionDetails[
        this.isMatrixItem
          ? this.pdp.getSelectedMatrixChilds()[0].itemid
          : this.itemInfo.item.itemid
      ]
    ) {
      if (this.pdp.getSelectedMatrixChilds().length == 1 && this.isMatrixItem) {
        var afterSave =
          subscriptionDetails[
            this.isMatrixItem
              ? this.pdp.getSelectedMatrixChilds()[0].itemid
              : this.itemInfo.item.itemid
          ].custcol_tdc_reorder_subscribed
      } else if (this.isMatrixItem) {
        var afterSave = false
      } else {
        var afterSave = true
      }
    } else {
      var afterSave = false
    }
    return {
      model: this.formModel.toJSON(),
      afterSave: afterSave,
      isEditView: localStorage.getItem('isEditView') == 'true',
      custitem_auto_reorder_discount: this.isMatrixItem
        ? this.pdp.getSelectedMatrixChilds()[0].custitem_auto_reorder_discount
        : this.itemInfo.item.custitem_auto_reorder_discount,
      isReOrderEligible: this.isMatrixItem
        ? this.pdp.getSelectedMatrixChilds()[0]
            .custitem_tdc_auto_reorder_eligible
        : this.itemInfo.item.custitem_tdc_auto_reorder_eligible
    }
  }
  return AutoReorderFormView
})

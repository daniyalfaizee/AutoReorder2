// @module DME.AutoReorder.checkout
define('DME.AutoReorder.checkout.View', [
  'dme_autoreorder_checkout.tpl',

  'DME.AutoReorder.checkout.SS2Model',

  'Backbone',
  'Wizard.Module',
  'LiveOrder.Model',
  'jQuery'
], function (
  dme_autoreorder_checkout_tpl,

  checkoutSS2Model,

  Backbone,
  WizardModule,
  LiveOrderModel,
  jQuery
) {
  'use strict'

  // @class DME.AutoReorder.checkout.View @extends Backbone.View
  return WizardModule.extend({
    template: dme_autoreorder_checkout_tpl,

    initialize: function (options) {
      WizardModule.prototype.initialize.apply(this, arguments)
      var self = this
      this.autoReOrderSubscribedItemDetails = {}
      this.getEligibleItems(this)
      // this.addItemToAutoReorderSubscription()
      // this.model.on('change', this.render, this)

      /*  Uncomment to test backend communication with an example service
				(you'll need to deploy and activate the extension first)
			*/

      // this.model = new checkoutModel();
      // var self = this;
      // this.model.fetch().done(function(result) {
      // 	self.message = result.message;
      // 	self.render();
      // });
    },

    events: {
      'click [data-action="subscribe"]': 'addItemToAutoReorderSubscription',
      'click [data-action="cancel-subs"]': 'cancelSubscriptions',
      'change [data-action="order-frequency"]':
        'addItemToAutoReorderSubscription',
      'change [data-action="order-quantity"]':
        'addItemToAutoReorderSubscription'
    },

    bindings: {},

    childViews: {},

    cancelSubscriptions: function(e){
      var self = this;
      jQuery(function(){
        for(var i = 0; i < jQuery('[data-action="subscribe"]').length; i++){
          if(!!jQuery('[data-action="subscribe"]')[i].checked)
            jQuery('[data-action="subscribe"]')[i].checked = false;
          if(jQuery('[data-action="order-quantity"]')[i].value != "")
            jQuery('[data-action="order-quantity"]')[i].value = "";
          if(jQuery('[data-action="order-frequency"]')[i].value != "")
            jQuery('[data-action="order-frequency"]')[i].value = "";
        }
        for(var i = 0; i < jQuery('.order-wizard-paymentmethod-selector-module-option').length; i++)
          if(!!jQuery('.order-wizard-paymentmethod-selector-module-option')[i].disabled)
            jQuery('.order-wizard-paymentmethod-selector-module-option')[i].disabled = false;
      });
      var liveOrderInstance = LiveOrderModel.getInstance();
      var liveOrderOptions = liveOrderInstance.get('options');
      liveOrderOptions.custbody_tdc_reorder_item_details = "";
      liveOrderInstance.set('options', liveOrderOptions);
      liveOrderInstance.save().then(function(){
        console.log("save  success");
      }).fail(function(err){
        console.log(err);
      });
      self.model.get('lines').models = [];
      // for(var i = 0; i < lines.length; i++){
      //   // console.log(lines[i][0].get("cartOptionId"))
      //   var lineOptions = lines[i].attributes.options.models;
      //   for(var j = 0; j < lineOptions.length; j++){
      //     if(lineOptions[j].get("cartOptionId") == ("custcol_tdc_reorder_subscribed")){
      //       lineOptions[j].set("value", {label: 'F', internalid: 'F'});
      //       lineOptions[j].set("urlParameterName", "custcol_tdc_reorder_subscribed");
      //     }
      //     else if(lineOptions[j].get("cartOptionId") == ("custcol_tdc_reorder_sub_details")){
      //       var resetValue = '{"item-checkbox":false,"item-quantity":"","item-frequency":""}';
      //       lineOptions[j].set("value", {label: resetValue, internalid: resetValue});
      //       lineOptions[j].set("urlParameterName", "custcol_tdc_reorder_sub_details");
      //     }
      //     lineOptions[j].save().then(function(){
      //       console.log("save  success");
      //     }).fail(function(err){
      //       console.log(err);
      //     });
      //   }
      // }
    },

    addItemToAutoReorderSubscription: function (e) {
      var self = this
      var promise = new Promise(function (resolve, reject) {
      var lines = self.model.get('lines').models
      var lines = self.model.get('lines').models
      for(var i = 0; i < lines.length; i++){
        modelObj[lines[i].id] = i;
      }
        var lines = self.model.get('lines').models
      for(var i = 0; i < lines.length; i++){
        modelObj[lines[i].id] = i;
      }
        
        _.each(lines, function (line) {
         
          if (line.id == e.target.id.split('-')[0]) {
            var custcol_tdc_reorder_subscribed =
              line.attributes.options[
                line.attributes.options.findIndex(function (el) {
                  return (
                    el.attributes.cartOptionId ==
                    'custcol_tdc_reorder_subscribed'
                  )
                })
              ]
            if (custcol_tdc_reorder_subscribed) {
              console.log({custcol_tdc_reorder_subscribed:custcol_tdc_reorder_subscribed})
              if (custcol_tdc_reorder_subscribed.value.label == 'T') {
                var subdetails = JSON.parse(
                  line.attributes.options[
                    line.attributes.options.findIndex(function (el) {
                      return (
                        el.attributes.cartOptionId ==
                        'custcol_tdc_reorder_sub_details'
                      )
                    })
                  ].value.label
                )
                self.autoReOrderSubscribedItemDetails[line.id.toString()] = {
                  subscribed: subdetails['item-checkbox'],
                  frequency: subdetails['item-frequency'],
                  quantity: subdetails['item-quantity']
                }
              }
            }
            // else
            console.log({ItemDetails:self.autoReOrderSubscribedItemDetails})
            if (
              self.autoReOrderSubscribedItemDetails[line.id.toString()] ==
              undefined
            ) //{
              self.autoReOrderSubscribedItemDetails[line.id.toString()] = {
                subscribed: false,
                frequency: "",
                quantity: ""
              }
            // } else {
              if (e.target.name == 'item-checkbox') {
                e.target.checked == true
                  ? (self.autoReOrderSubscribedItemDetails[
                      line.id.toString()
                    ].subscribed = true)
                  : delete self.autoReOrderSubscribedItemDetails[
                      line.id.toString()
                    ]
              } else if (e.target.name == 'item-frequency') {
                self.autoReOrderSubscribedItemDetails[
                  line.id.toString()
                ].frequency = e.target.value < 1 ? 1 : e.target.value
              } else if (e.target.name == 'item-quantity') {
                self.autoReOrderSubscribedItemDetails[
                  line.id.toString()
                ].quantity = e.target.value < 1 ? 1 : e.target.value
              }
              itemDetailsObj[line.id.toString()] = self.autoReOrderSubscribedItemDetails[line.id.toString()];
              // }
            // console.log(self.autoReOrderSubscribedItemDetails)
          }
        })
        // OVER HERE
        // OVER HERE
        // OVER HERE
        // OVER HERE
        // OVER HERE
        // OVER HERE
        // for(var i = 0; i < Object.keys(itemDetailsObj).length; i++){
        //   var lineOptions = liveOrderLines.models[modelObj[Object.keys(itemDetailsObj)[i]]].get("options");
        //   var lineModels = lineOptions.models;
        //   var subbedObj = lineModels.find(function(obj){
        //     return obj.get("cartOptionId") == "custcol_tdc_reorder_subscribed";
        //   });
        //   if(!!itemDetailsObj[Object.keys(itemDetailsObj)[i]].subscribed)
        //     lineModels[lineModels.indexOf(subbedObj)].set("value", {label: 'T', internalid: 'T'});
        //   else
        //     lineModels[lineModels.indexOf(subbedObj)].set("value", {label: 'F', internalid: 'F'});
        //   lineOptions.model = lineModels;
        //   liveOrderLines.models[modelObj[Object.keys(itemDetailsObj)[i]]].set("options", lineOptions);
        //   liveOrderInstance.set("lines", liveOrderLines);
        //   liveOrderInstance.save().then(function(){
        //     console.log("save success");
        //   }).fail(function(err){
        //     console.log(err);
        //   });
        //   console.log(itemDetailsObj[Object.keys(itemDetailsObj)[i]]);
        // }

        resolve()
      })
      promise.then(function () {
        self.setItemDetails()
        // var a = LiveOrderModel.getInstance().get('options')
        // console.log(a);
        // a.custbody_tdc_reorder_item_details = JSON.stringify(
        //   self.autoReOrderSubscribedItemDetails
        // )
        // self.model.set('autoReOrderSubscribedItemDetails',a,{validate:true})
        // LiveOrderModel.getInstance().set('options', a)
      })
    },
    setItemDetails: function setItemDetails() {
      var self = this
      var a = LiveOrderModel.getInstance().get('options')
      var asArray = Object.entries(self.autoReOrderSubscribedItemDetails)
      var filteredArray = asArray.filter(function (item) {
        var key = item[0]
        var val = item[1]
        return val.subscribed
      })

      this.disablePaymentMethods(filteredArray.length != 0)

      a.custbody_tdc_reorder_item_details = JSON.stringify(
        Object.fromEntries(filteredArray)
      )
      self.model.set('autoReOrderSubscribedItemDetails', a, { validate: true })
      LiveOrderModel.getInstance().set('options', a)
      console.log({selfmodel:self.model.get('autoReOrderSubscribedItemDetails')});
      console.log(LiveOrderModel.getInstance().get('options'));
    },

    disablePaymentMethods: function (isAutoReorder) {
      $(document).ready(abc)
      // var self = this
      function abc() {
        var paymentMethodOptions = document.querySelectorAll(
          'option.order-wizard-paymentmethod-selector-module-option'
        )
        var paymentMethodOptionsSelector = document.querySelector(
          'select.order-wizard-paymentmethod-selector-module-options'
        )

        for (var i = 0; i < paymentMethodOptions.length; i++) {
          if (
            paymentMethodOptions[i].dataset.type != 'creditcard' &&
            isAutoReorder
          ) {
            paymentMethodOptions[i].disabled = true
            paymentMethodOptionsSelector.value = 'creditcard'
          } else {
            paymentMethodOptions[i].disabled = false
          }
        }
        
        paymentMethodOptionsSelector.value == 'creditcard' &&
        !(document.querySelector('[data-view="CreditCard.Form"]') ||
          document.querySelector('[data-view="CreditCard.List"]')) &&
        isAutoReorder
          ? window.location.reload()
          : ''
      }
    },
    getEligibleItems: function (self) {
      var lines = LiveOrderModel.getInstance().get('lines').models
      var eligibleItems = []
      _.each(lines, function (line) {
        var lineItemId = line.id
        var item = line.get('item')

        var isitem_reorder_eligible = item.get(
          'custitem_tdc_auto_reorder_eligible'
        )
        var isSubscribed = _.find(
          line.attributes.options.models,
          function (model) {
            return model.get('cartOptionId') == 'custcol_tdc_reorder_subscribed'
          }
        )

        if (isSubscribed) {
          isSubscribed = isSubscribed.attributes.value.internalid
        }

        if (isSubscribed == 'T') {
          var subscriptionDetails = JSON.parse(
            _.find(line.attributes.options.models, function (model) {
              return (
                model.get('cartOptionId') == 'custcol_tdc_reorder_sub_details'
              )
            }).attributes.value.internalid
          )
          var frequency = subscriptionDetails['item-frequency']
          var quantity = subscriptionDetails['item-quantity']
        }
        self.autoReOrderSubscribedItemDetails[lineItemId] = {
          subscribed: isSubscribed == 'T' ? true : false,
          frequency: frequency,
          quantity: quantity
        }
        if (isitem_reorder_eligible) {
          eligibleItems.push({
            itemName: item.get('_name'),
            itemSku: item.get('_sku'),
            lineItemId: lineItemId,
            itemPrice: item.get('onlinecustomerprice_detail')
              .onlinecustomerprice_formatted,
            itemImages: item.get('keyMapping_images'),
            isSubscribed: isSubscribed == 'T' ? true : false,
            frequency: frequency,
            quantity: quantity
          })
        }
      })
      // console.log('eligibleItems: ',self.autoReOrderSubscribedItemDetails)
      return eligibleItems
    },

    cancelSubscriptions: function(e){
      jQuery(function(){
        for(var i = 0; i < jQuery('[data-action="subscribe"]').length; i++){
          if(!!jQuery('[data-action="subscribe"]')[i].checked)
            jQuery('[data-action="subscribe"]')[i].checked = false;
          if(jQuery('[data-action="order-quantity"]')[i].value != "")
            jQuery('[data-action="order-quantity"]')[i].value = "";
          if(jQuery('[data-action="order-frequency"]')[i].value != "")
            jQuery('[data-action="order-frequency"]')[i].value = "";
        }
        for(var i = 0; i < jQuery('.order-wizard-paymentmethod-selector-module-option').length; i++)
          if(!!jQuery('.order-wizard-paymentmethod-selector-module-option')[i].disabled)
            jQuery('.order-wizard-paymentmethod-selector-module-option')[i].disabled = false;
      });
      var liveOrderInstance = LiveOrderModel.getInstance();
      var liveOrderOptions = liveOrderInstance.get('options');
      liveOrderOptions.custbody_tdc_reorder_item_details = "";
      liveOrderInstance.set('options', liveOrderOptions);
      liveOrderInstance.save().then(function(){
        console.log("save success");
      }).fail(function(err){
        console.log(err);
      });
    },

    //@method getContext @return DME.AutoReorder.checkout.View.Context
    getContext: function getContext() {
      //@class DME.AutoReorder.checkout.View.Context

      this.message = this.message || 'Hello World!!'
      var eligibleItems = this.getEligibleItems(this)
      console.log({eligibleItems:this.autoReOrderSubscribedItemDetails})

      this.setItemDetails()
      return {
        message: this.message,
        eligibleItems: eligibleItems.length ? eligibleItems : false
      }
    }
  })
})

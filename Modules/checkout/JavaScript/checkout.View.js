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
      // 'click [data-action="subscribe"]': 'addItemToAutoReorderSubscription',
      'click [data-action="cancel-subs"]': 'cancelSubscriptions',
      'click [data-action="confirm-subscription"]': 'confirmSubscription',
      // 'change [data-action="order-frequency"]':
      //   'addItemToAutoReorderSubscription',
      // 'change [data-action="order-quantity"]':
      //   'addItemToAutoReorderSubscription'
    },

    bindings: {},

    childViews: {},

    // cancelSubscriptions: function(e){
    //   var self = this;
    //   jQuery(function(){
    //     for(var i = 0; i < jQuery('[data-action="subscribe"]').length; i++){
    //       if(!!jQuery('[data-action="subscribe"]')[i].checked)
    //         jQuery('[data-action="subscribe"]')[i].checked = false;
    //       if(jQuery('[data-action="order-quantity"]')[i].value != "")
    //         jQuery('[data-action="order-quantity"]')[i].value = "";
    //       if(jQuery('[data-action="order-frequency"]')[i].value != "")
    //         jQuery('[data-action="order-frequency"]')[i].value = "";
    //     }
    //     for(var i = 0; i < jQuery('.order-wizard-paymentmethod-selector-module-option').length; i++)
    //       if(!!jQuery('.order-wizard-paymentmethod-selector-module-option')[i].disabled)
    //         jQuery('.order-wizard-paymentmethod-selector-module-option')[i].disabled = false;
    //   });
    //   var liveOrderInstance = LiveOrderModel.getInstance();
    //   var liveOrderOptions = liveOrderInstance.get('options');
    //   liveOrderOptions.custbody_tdc_reorder_item_details = "";
    //   liveOrderInstance.set('options', liveOrderOptions);
    //   liveOrderInstance.save().then(function(){
    //     console.log("save  success");
    //   }).fail(function(err){
    //     console.log(err);
    //   });
    //   self.model.get('lines').models = [];
    // },

    addItemToAutoReorderSubscription: function (e) {
      var commonIdString = e.currentTarget.id;
      var liveOrderInstance = LiveOrderModel.getInstance();
      var liveOrderOptions = liveOrderInstance.get('options');
      var itemDetails = JSON.parse(liveOrderOptions.custbody_tdc_reorder_item_details);
      console.log({itemDetails:itemDetails});
      var keyObj = Object.keys(itemDetails);
      if(commonIdString.search("-quantity") == -1 && commonIdString.search("-frequency") == -1 && !e.currentTarget.checked){
        jQuery(function(){
          if(jQuery("#" + commonIdString + "-quantity")[0].value != "")
            jQuery("#" + commonIdString + "-quantity")[0].value = "";
          if(jQuery("#" + commonIdString + "-frequency")[0].value != "")
            jQuery("#" + commonIdString + "-frequency")[0].value = "";
        });
        if(keyObj.indexOf(commonIdString) > -1)
          delete itemDetails[keyObj[keyObj.indexOf(commonIdString)]];
      }
      else{
        var itemIdKey = commonIdString.split("-")[0];
        console.log({keys: keyObj})
        if(keyObj.indexOf(itemIdKey) == -1)
          itemDetails[itemIdKey] = {subscribed: false, frequency: null, quantity: null}
        itemDetails[itemIdKey].subscribed = jQuery("#" + itemIdKey)[0].checked;
        itemDetails[itemIdKey].frequency = jQuery("#" + itemIdKey + "-frequency")[0].value;
        itemDetails[itemIdKey].quantity = jQuery("#" + itemIdKey + "-quantity")[0].value;
      }
      liveOrderOptions.custbody_tdc_reorder_item_details = JSON.stringify(itemDetails)
      console.log(itemDetails)
      liveOrderInstance.set('options', liveOrderOptions);
      liveOrderInstance.save().then(function(){
        console.log("save  success");
      }).fail(function(err){
        console.log(err);
      });
      var liveOrderInstance = LiveOrderModel.getInstance();
      var liveOrderLines = liveOrderInstance.get("lines");
      var itemDetailsObj = {}, modelObj= {};
      console.log({LiveOrderModel:LiveOrderModel.getInstance()})
      var self = this
      var promise = new Promise(function (resolve, reject) {
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
    },

    disablePaymentMethods: function (isAutoReorder) {
      console.log({isAutoReorder:isAutoReorder})
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
      console.log({lines:lines})
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

    confirmSubscription: function(e){
      var lineItemObj = {};
      var self = this;
      jQuery(function(){
        var flag = true;
        for(i = 0; i < jQuery('[name="auto-reorder-item-checkbox"]').length; i++){
          var commonIdString = jQuery('[name="auto-reorder-item-checkbox"]')[i].id;
          if(
            !!jQuery('#' + commonIdString)[0].checked == !!jQuery('#' + commonIdString + '-quantity')[0].value && 
            !!jQuery('#' + commonIdString)[0].checked == !!jQuery('#' + commonIdString + '-frequency')[0].value
          ){
            if(Object.keys(lineItemObj).indexOf(commonIdString) == -1 && !!jQuery('#' + commonIdString)[0].checked){
              lineItemObj[commonIdString] = {
                subscribed: true,
                frequency: jQuery('#' + commonIdString + '-frequency')[0].value,
                quantity:jQuery('#' + commonIdString + '-quantity')[0].value
              }
            }
          }
          else if(!!flag)
            flag = false;
        }
        if(!!flag){
          //  && Object.keys(lineItemObj).length > 0
          alert("Request Submission Successful.");
        }
        else
          alert("WARNING!!! There might be problems processing your Subscription request because you might have entered incorrect or incomplete Information. Please review the Re-Order Form and make sure you've entered all the necessary Information correctly.");
        if(Object.keys(lineItemObj).length > 0){
          var liveOrderInstance = LiveOrderModel.getInstance();
          var liveOrderOptions = liveOrderInstance.get('options');
          liveOrderOptions.custbody_tdc_reorder_item_details = JSON.stringify(lineItemObj);
          liveOrderInstance.set('options', liveOrderOptions);
          liveOrderInstance.save().then(function(){
            // console.log("save success");
            localStorage.setItem("subscriptionDetails", JSON.stringify(lineItemObj));
          }).fail(function(err){
            console.log(err);
          });
          console.log({ newLineItemObj: LiveOrderModel.getInstance() })
        }
        self.disablePaymentMethods(Object.keys(lineItemObj).length != 0)
      });
    },

    //@method getContext @return DME.AutoReorder.checkout.View.Context
    getContext: function getContext() {
      //@class DME.AutoReorder.checkout.View.Context

      if(!!localStorage.subscriptionDetails){
        var self = this;
        var subscriptionObj = JSON.parse(localStorage.subscriptionDetails);
        var subscriptionKeys = Object.keys(subscriptionObj);
        jQuery(function(){
          for(var i = 0; i < subscriptionKeys.length; i++){
            for(var j = 0; j < (jQuery('[name="auto-reorder-item-checkbox"]').length / 2); j++){
              if(subscriptionKeys[i] == jQuery('[name="auto-reorder-item-checkbox"]')[j].id){
                var commonIdString = jQuery('[name="auto-reorder-item-checkbox"]')[j].id;
                jQuery('#' + commonIdString)[0].checked = true;
                jQuery('#' + commonIdString + '-quantity')[0].value = subscriptionObj[subscriptionKeys[i]].quantity;
                jQuery('#' + commonIdString + '-frequency')[0].value = subscriptionObj[subscriptionKeys[i]].frequency;
                jQuery('.' + commonIdString + '-mobile')[0].checked = true;
                jQuery('.' + commonIdString + '-quantity-mobile')[0].value = subscriptionObj[subscriptionKeys[i]].quantity;
                jQuery('.' + commonIdString + '-frequency-mobile')[0].value = subscriptionObj[subscriptionKeys[i]].frequency;
              }
            }
          }
          var liveOrderInstance = LiveOrderModel.getInstance();
          var liveOrderOptions = liveOrderInstance.get('options');
          liveOrderOptions.custbody_tdc_reorder_item_details = JSON.stringify(subscriptionObj);
          liveOrderInstance.set('options', liveOrderOptions);
          liveOrderInstance.save().then(function(){
            // console.log("save success");
            localStorage.setItem("subscriptionDetails", JSON.stringify(subscriptionObj));
          }).fail(function(err){
            console.log(err);
          });
          self.disablePaymentMethods(subscriptionKeys.length != 0);
        });
      }
      this.message = this.message || 'Hello World!!'
      var eligibleItems = this.getEligibleItems(this)

      this.setItemDetails()
      console.log({ getInstance: LiveOrderModel.getInstance() })
      return {
        message: this.message,
        eligibleItems: eligibleItems.length ? eligibleItems : false
      }
    }
  })
})

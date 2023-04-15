/**
 * @NApiVersion 2.x
 * @NModuleScope TargetAccount
 */
define(['N/record', 'N/runtime', 'N/search'], function (
  record,
  runtime,
  search
) {
  'use strict'
  function formatDate(inputDate) {
    var date = new Date(inputDate)
    if (!isNaN(date.getTime())) {
      var day = date.getDate().toString()
      var month = (date.getMonth() + 1).toString()
      // Months use 0 index.

      return (
        date.getFullYear() +
        '-' +
        (month[1] ? month : '0' + month[0]) +
        '-' +
        (day[1] ? day : '0' + day[0])
      )
    }
  }

  function netSuiteFormatdate(inputDate) {
    log.debug('before', inputDate.split('-'))
    var date = inputDate.split('-')
    return date[1] + '/' + date[2] + '/' + date[0]
  }

  var AutoReorderSubscriptionInfoModel = {
    get: function (request) {
      var type = 'customrecord_tdc_auto_reorder'

      var filters = [
        [
          'custrecord_tdc_auto_reorder_customer',
          search.Operator.ANYOF,
          runtime.getCurrentUser().id
        ]
      ]

      var columns = [
        'custrecord_tdc_is_subcription_paused',
        'name',
        'custrecord_tdc_auto_reorder_frequency',
        'internalid'
      ]

      if (request.parameters.internalid) {
        filters.push('and', [
          ['custrecord_tdc_is_subcription_paused', search.Operator.IS, 'F']
        ])
      }

      var searchResults = []
      search
        .create({
          type: type,
          filters: filters,
          columns: columns
        })
        .run()
        .each(function (result) {
          searchResults.push({
            isinactive: result.getValue('custrecord_tdc_is_subcription_paused'),
            name: result.getValue('name'),
            custrecord_tdc_auto_reorder_transaction: result.getText(
              'custrecord_tdc_auto_reorder_transaction'
            ),
            custrecord_tdc_auto_reorder_date: formatDate(
              result.getValue('custrecord_tdc_auto_reorder_date')
            ),
            custrecord_tdc_auto_reorder_frequency: result.getValue(
              'custrecord_tdc_auto_reorder_frequency'
            ),
            custrecord_tdc_auto_reorder_notification: formatDate(
              result.getValue('custrecord_tdc_auto_reorder_notification')
            ),
            internalid: result.getValue('internalid')
          })
          return true
        })
      return searchResults
    },
    getSubscriptionDetails: function (request) {
      var type = 'customrecord_tdc_reorder_item_details'

      var filters = [
        [
          'custrecord_tdc_related_reorder_id',
          search.Operator.ANYOF,
          request.parameters.internalid
        ]
      ]

      var columns = [
        'isinactive',
        'name',
        'custrecord_reorder_item',
        'custrecord_tdc_related_reorder_id',
        'custrecord_reorder_item_quantity',
        'internalid',
        'custrecord_tdc_is_subscribed',
        'custrecord_tdc_is_subscription_active'
      ]

      // if (request.parameters.internalid) {
      //   filters.push('and', [
      //     ['isinactive', search.Operator.IS, 'F']
      //   ])
      // }

      var searchResults = []
      search
        .create({
          type: type,
          filters: filters,
          columns: columns
        })
        .run()
        .each(function (result) {
          searchResults.push({
            isinactive: result.getValue('isinactive'),
            name: result.getValue('name'),
            custrecord_reorder_item: result.getText('custrecord_reorder_item'),
            custrecord_tdc_related_reorder_id: result.getText(
              'custrecord_tdc_related_reorder_id'
            ),
            custrecord_reorder_item_quantity: result.getValue(
              'custrecord_reorder_item_quantity'
            ),
            custrecord_tdc_is_subscribed: result.getValue(
              'custrecord_tdc_is_subscribed'
            ),
            internalid: result.getValue('internalid'),
            custrecord_tdc_is_subscription_active: result.getValue(
              'custrecord_tdc_is_subscription_active'
            )
          })
          return true
        })
      return searchResults
    },
    post: function (request) {
      return
      var body = JSON.parse(request.body)

      var userPreferences = record.create({
        type: 'customrecord_user_preferences'
      })

      userPreferences.setValue({
        fieldId: 'custrecord_user_preferences_owner',
        value: runtime.getCurrentUser().id
      })

      userPreferences.setValue({
        fieldId: 'custrecord_user_preferences_type',
        value: body.type
      })

      userPreferences.setValue({
        fieldId: 'custrecord_user_preferences_value',
        value: body.value
      })

      return userPreferences.save()
    },

    put: function (request) {
      // return
      var body = JSON.parse(request.body)

      var subscriptionRecord = record.load({
        type: 'customrecord_tdc_auto_reorder',
        id: body.internalid
      })

      
      subscriptionRecord.setValue({
        fieldId: 'custrecord_tdc_auto_reorder_frequency',
        value: body.custrecord_tdc_auto_reorder_frequency
      })

      
      subscriptionRecord.setValue({
        fieldId: 'custrecord_tdc_is_subcription_paused',
        value: body.isinactive
      })

      subscriptionRecord.setValue({
        fieldId: 'name',
        value: body.name
      })

      return subscriptionRecord.save()
    },

    delete: function (request) {
      
      return record.delete({
        type: 'customrecord_tdc_auto_reorder',
        id: request.parameters.internalid
      })
    }
  }

  return AutoReorderSubscriptionInfoModel
})

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
    // log.debug('before', inputDate.split('-'))
    var date = inputDate.split('-')
    return date[1] + '/' + date[2] + '/' + date[0]
  }

  var AutoReorderSubscriptionInfoModel = {
    get: function (request) {
      var type = 'customrecord_tdc_reorder_item_details'

      var filters = [
        search.createFilter({
          name: 'custrecord_tdc_auto_reorder_customer',
          join: 'custrecord_tdc_related_reorder_id',
          operator: search.Operator.ANYOF,
          values: [runtime.getCurrentUser().id]
        })
      ]

      var columns = [
        'isinactive',
        'name',
        'custrecord_reorder_item',
        'custrecord_tdc_related_reorder_id',
        'custrecord_reorder_item_quantity',
        'custrecord_tdc_is_subscription_inactive',
        'internalid',
        'custrecord_tdc_reorder_transaction',
        'custrecord_tdc_reorder_date',
        'custrecord_tdc_reorder_notification',
        'custrecord_tdc_end_reorder_date',
        search.createColumn({
          name: 'custrecord_tdc_auto_reorder_frequency',
          join: 'custrecord_tdc_related_reorder_id'
        }),
        search.createColumn({
          name: 'department',
          join: 'custrecord_reorder_item'
        }),
        search.createColumn({
          name: 'onlineprice',
          join: 'custrecord_reorder_item'
        }),
        search.createColumn({
          name: 'baseprice',
          join: 'custrecord_reorder_item'
        }),
        search.createColumn({
          name: 'custitem_auto_reorder_discount',
          join: 'custrecord_reorder_item'
        }),
        search.createColumn({
          name: 'urlcomponent',
          join: 'custrecord_reorder_item'
        }),
        search.createColumn({ name: 'parent', join: 'custrecord_reorder_item' })
      ]

      if (request.parameters.internalid) {
        filters.push('and', [['isinactive', search.Operator.IS, 'F']])
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
          var latestPrice = result.getValue({
            name: 'baseprice',
            join: 'custrecord_reorder_item'
          })
          var urlcomponent = result.getValue({
            name: 'urlcomponent',
            join: 'custrecord_reorder_item'
          })
          if (!urlcomponent) {
            var itemSearch = search
              .create({
                type: search.Type.INVENTORY_ITEM,
                filters: [
                  search.createFilter({
                    name: 'internalid',
                    operator: search.Operator.IS,
                    values: [
                      result.getValue({
                        name: 'parent',
                        join: 'custrecord_reorder_item'
                      })
                    ]
                  })
                ],
                columns: ['urlcomponent']
              })
              .run()
              .getRange({ start: 0, end: 1 })
            if (itemSearch.length == 1)
              urlcomponent = itemSearch[0].getValue({ name: 'urlcomponent' })
            else urlcomponent = false
          }
          if (
            result.getValue({
              name: 'department',
              join: 'custrecord_reorder_item'
            }) == 1
          )
            latestPrice = result.getValue({
              name: 'onlineprice',
              join: 'custrecord_reorder_item'
            })
          searchResults.push({
            isinactive: result.getValue('isinactive'),
            name: result.getValue('name'),
            custrecord_reorder_item: result.getText('custrecord_reorder_item'),
            custrecord_tdc_related_reorder_id: result.getValue(
              'custrecord_tdc_related_reorder_id'
            ),
            custrecord_reorder_item_quantity: result.getValue(
              'custrecord_reorder_item_quantity'
            ),
            custrecord_tdc_is_subscription_active: result.getValue(
              'custrecord_tdc_is_subscription_inactive'
            ),
            internalid: result.getValue('internalid'),

            custrecord_tdc_end_reorder_date: formatDate(
              result.getValue('custrecord_tdc_end_reorder_date')
            ),
            custrecord_tdc_is_subscription_inactive: !result.getValue(
              'custrecord_tdc_is_subscription_inactive'
            )
              ? true
              : '',
            custrecord_tdc_reorder_transaction: result.getText(
              'custrecord_tdc_reorder_transaction'
            ),
            custrecord_tdc_reorder_date: formatDate(
              result.getValue('custrecord_tdc_reorder_date')
            ),
            custrecord_tdc_reorder_notification: formatDate(
              result.getValue('custrecord_tdc_reorder_notification')
            ),
            latestPrice: latestPrice,
            reOrderFrequency: result.getValue({
              name: 'custrecord_tdc_auto_reorder_frequency',
              join: 'custrecord_tdc_related_reorder_id'
            }),
            reOrderDiscount: result.getValue({
              name: 'custitem_auto_reorder_discount',
              join: 'custrecord_reorder_item'
            }),
            urlcomponent: urlcomponent
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
        'custrecord_tdc_is_subscription_inactive',
        'custrecord_tdc_reorder_transaction',
        'custrecord_tdc_reorder_date',
        'custrecord_tdc_reorder_notification',
        'custrecord_tdc_end_reorder_date'
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
            custrecord_tdc_is_subscription_inactive: result.getValue(
              'custrecord_tdc_is_subscription_inactive'
            ),
            custrecord_tdc_reorder_transaction: result.getText(
              'custrecord_tdc_reorder_transaction'
            ),
            custrecord_tdc_reorder_date: formatDate(
              result.getValue('custrecord_tdc_reorder_date')
            ),
            custrecord_tdc_reorder_notification: formatDate(
              result.getValue('custrecord_tdc_reorder_notification')
            ),
            custrecord_tdc_end_reorder_date: formatDate(
              result.getValue('custrecord_tdc_end_reorder_date')
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

      var reorderItemDetails = record.load({
        type: 'customrecord_tdc_reorder_item_details',
        id: body.internalid
      })

      reorderItemDetails.setValue({
        fieldId: 'custrecord_reorder_item_quantity',
        value: body.custrecord_reorder_item_quantity
      })

      reorderItemDetails.setValue({
        fieldId: 'custrecord_tdc_is_subscription_inactive',
        value: !body.custrecord_tdc_is_subscription_inactive
      })

      // reorderItemDetails.setText({
      //   fieldId: 'custrecord_tdc_reorder_date',
      //   text: netSuiteFormatdate(body.custrecord_tdc_reorder_date)
      // })

      // reorderItemDetails.setText({
      //   fieldId: 'custrecord_tdc_reorder_notification',
      //   text: netSuiteFormatdate(body.custrecord_tdc_reorder_notification)
      // })

      if (!!body.custrecord_tdc_end_reorder_date)
        reorderItemDetails.setText({
          fieldId: 'custrecord_tdc_end_reorder_date',
          text: netSuiteFormatdate(body.custrecord_tdc_end_reorder_date)
        })

      var itemSubscription = reorderItemDetails.getValue({
        fieldId: 'custrecord_tdc_related_reorder_id'
      })
      var currentSubscriptionRecord = search.create({
        type: 'customrecord_tdc_auto_reorder',
        filters: [
          search.createFilter({
            name: 'internalid',
            operator: search.Operator.IS,
            values: [itemSubscription]
          })
        ],
        columns: [
          'custrecord_tdc_auto_reorder_frequency',
          'custrecord_tdc_is_subcription_paused',
          'custrecord_tdc_auto_reorder_customer',
          'custrecord_tdc_auto_reorder_address_json'
        ]
      })
      var subscriptionResults = currentSubscriptionRecord
        .run()
        .getRange({ start: 0, end: 1 })
      // If Customer changes Frequency, search for an existing Subscription with that Frequency
      if (
        subscriptionResults[0].getValue({
          name: 'custrecord_tdc_auto_reorder_frequency'
        }) != body.reOrderFrequency
      ) {
        var changeFlag = true
        var newSubscriptionSearch = search.create({
          type: 'customrecord_tdc_auto_reorder',
          filters: [
            search.createFilter({
              name: 'custrecord_tdc_auto_reorder_frequency',
              operator: search.Operator.IS,
              values: [body.reOrderFrequency]
            }),
            search.createFilter({
              name: 'custrecord_tdc_auto_reorder_customer',
              operator: search.Operator.IS,
              values: [
                subscriptionResults[0].getValue({
                  name: 'custrecord_tdc_auto_reorder_customer'
                })
              ]
            }),
            search.createFilter({
              name: 'custrecord_tdc_auto_reorder_address_json',
              operator: search.Operator.IS,
              values: [
                subscriptionResults[0].getValue({
                  name: 'custrecord_tdc_auto_reorder_address_json'
                })
              ]
            })
          ],
          columns: [
            'internalid',
            'custrecord_tdc_is_subcription_paused',
            'isinactive'
          ]
        })
        var newSubscriptionRecord = newSubscriptionSearch
          .run()
          .getRange({ start: 0, end: 1 })
        // If it exists, map it to the Item Details Record
        if (newSubscriptionRecord.length == 1) {
          reorderItemDetails.setValue({
            fieldId: 'custrecord_tdc_related_reorder_id',
            value: newSubscriptionRecord[0].getValue({ name: 'internalid' })
          })
          if (!!newSubscriptionRecord[0].getValue({ name: 'isinactive' }))
            record.submitFields({
              type: 'customrecord_tdc_auto_reorder',
              id: newSubscriptionRecord[0].getValue({ name: 'internalid' }),
              values: {
                isinactive: false
              }
            })
          newSubscriptionSearch.columns.push(
            search.createColumn({
              name: 'internalid',
              join: 'custrecord_tdc_related_reorder_id'
            })
          )
          newSubscriptionRecord = newSubscriptionSearch
            .run()
            .getRange({ start: 0, end: 1 })
          // If no other Item Details exist for this Subscription Record, set its Status to be the same as the previous Subscription Record's
          if (newSubscriptionRecord.length == 0) {
            newSubscriptionSearch.columns.pop()
            newSubscriptionRecord = newSubscriptionSearch
              .run()
              .getRange({ start: 0, end: 1 })
            if (
              newSubscriptionRecord[0].getValue({
                name: 'custrecord_tdc_is_subcription_paused'
              }) !=
              subscriptionResults[0].getValue({
                name: 'custrecord_tdc_is_subcription_paused'
              })
            )
              record.submitFields({
                type: 'customrecord_tdc_auto_reorder',
                id: newSubscriptionRecord[0].getValue({ name: 'internalid' }),
                values: {
                  custrecord_tdc_is_subcription_paused:
                    subscriptionResults[0].getValue({
                      name: 'custrecord_tdc_is_subcription_paused'
                    })
                }
              })
          }
        } else {
          // If no other Subscription Record exists with the Frequncy set by the Customer and
          // If no other Item Details exist for the current Subscription Record, change the current Subscription Record's Frequency
          currentSubscriptionRecord.columns.push(
            search.createColumn({
              name: 'internalid',
              join: 'custrecord_tdc_related_reorder_id'
            })
          )
          subscriptionResults = currentSubscriptionRecord
            .run()
            .getRange({ start: 0, end: 2 })
          if (subscriptionResults.length == 1) {
            changeFlag = false
            record.submitFields({
              type: 'customrecord_tdc_auto_reorder',
              id: itemSubscription,
              values: {
                name:
                  subscriptionResults[0].getText({
                    name: 'custrecord_tdc_auto_reorder_customer'
                  }) +
                  '_' +
                  body.reOrderFrequency,
                custrecord_tdc_auto_reorder_frequency: body.reOrderFrequency
              }
            })
          } else {
            // As a final Resort, create a new Subscription Record with the Frequency set by the Customer
            var newSubscription = record.create({
              type: 'customrecord_tdc_auto_reorder'
            })
            newSubscription.setValue({
              fieldId: 'name',
              value:
                subscriptionResults[0].getText({
                  name: 'custrecord_tdc_auto_reorder_customer'
                }) +
                '_' +
                body.reOrderFrequency
            })
            newSubscription.setValue({
              fieldId: 'custrecord_tdc_auto_reorder_config',
              value: 1
            })
            newSubscription.setValue({
              fieldId: 'custrecord_tdc_auto_reorder_frequency',
              value: body.reOrderFrequency
            })
            newSubscription.setValue({
              fieldId: 'custrecord_tdc_auto_reorder_customer',
              value: subscriptionResults[0].getValue({
                name: 'custrecord_tdc_auto_reorder_customer'
              })
            })
            newSubscription.setValue({
              fieldId: 'custrecord_tdc_auto_reorder_address_json',
              value: subscriptionResults[0].getValue({
                name: 'custrecord_tdc_auto_reorder_address_json'
              })
            })
            newSubscription.setValue({
              fieldId: 'custrecord_tdc_is_subcription_paused',
              value: subscriptionResults[0].getValue({
                name: 'custrecord_tdc_is_subcription_paused'
              })
            })
            reorderItemDetails.setValue({
              fieldId: 'custrecord_tdc_related_reorder_id',
              value: newSubscription.save()
            })
          }
        }
        // If Subscription Record was changed and if it has no other Item Details, set the current Subscription Record to Inactive
        if (!!changeFlag) {
          currentSubscriptionRecord.columns.push(
            search.createColumn({
              name: 'internalid',
              join: 'custrecord_tdc_related_reorder_id'
            })
          )
          subscriptionResults = currentSubscriptionRecord
            .run()
            .getRange({ start: 0, end: 2 })
          if (subscriptionResults.length == 1) {
            record.submitFields({
              type: 'customrecord_tdc_auto_reorder',
              id: itemSubscription,
              values: {
                isinactive: true
              }
            })
          }
        }
        var itemDetailsName = reorderItemDetails
          .getValue({ fieldId: 'name' })
          .split('_')
        itemDetailsName[1] = body.reOrderFrequency
        reorderItemDetails.setValue({
          fieldId: 'name',
          value: itemDetailsName.join('_')
        });
        var frequencyDiff = parseInt(body.reOrderFrequency) - parseInt(subscriptionResults[0].getValue({ name: 'custrecord_tdc_auto_reorder_frequency' }));
        var autoReorderDate = new Date(reorderItemDetails.getValue({ fieldId: 'custrecord_tdc_reorder_date' }));
        autoReorderDate.setDate(autoReorderDate.getDate() + frequencyDiff);
        reorderItemDetails.setValue({ fieldId: 'custrecord_tdc_reorder_date', value: autoReorderDate });
        var notificationDate = new Date(reorderItemDetails.getValue({ fieldId: 'custrecord_tdc_reorder_notification' }));
        notificationDate.setDate(notificationDate.getDate() + frequencyDiff);
        reorderItemDetails.setValue({ fieldId: 'custrecord_tdc_reorder_notification', value: notificationDate });
      }
      else{
        reorderItemDetails.setText({
          fieldId: 'custrecord_tdc_reorder_date',
          text: netSuiteFormatdate(body.custrecord_tdc_reorder_date)
        })
  
        reorderItemDetails.setText({
          fieldId: 'custrecord_tdc_reorder_notification',
          text: netSuiteFormatdate(body.custrecord_tdc_reorder_notification)
        })
      }

      // reorderItemDetails.setValue({
      //   fieldId: 'custrecord_tdc_is_subscription_inactive',
      //   value: body.custrecord_tdc_is_subscription_active
      // })

      return reorderItemDetails.save()
    },

    delete: function (request) {
      return record.delete({
        type: 'customrecord_tdc_reorder_item_details',
        id: request.parameters.internalid
      })
    }
  }

  return AutoReorderSubscriptionInfoModel
})
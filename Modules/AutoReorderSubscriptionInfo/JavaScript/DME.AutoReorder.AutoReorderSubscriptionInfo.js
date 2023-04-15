define('DME.AutoReorder.AutoReorderSubscriptionInfo', [
  'DME.AutoReorder.AutoReorderSubscriptionInfo.View',
  'DME.AutoReorder.AutoreorderSubscriptionDetail.View',
  'DME.AutoReorder.AutoReorderItemInfo'
], function (AutoReorderSubscriptionInfoView, SubscriptionDetailView, AutoReorderItemInfo) {
  'use strict'

  return {
    mountToApp: function mountToApp(container) {
      var environment_component = container.getComponent('Environment')
      var is_auto_reorder_enabled = environment_component.getConfig(
        'autoreorderapp.config'
      )
      if (!is_auto_reorder_enabled) {
        return
      }

      var programlabel = environment_component.getConfig(
        'autoreorderapp.programlabel'
      )
      var pastsubscriptions = environment_component.getConfig(
        'autoreorderapp.pastsubscriptions'
      )
      var activesubscriptions = environment_component.getConfig(
        'autoreorderapp.activesubscriptions'
      )

      var pageType = container.getComponent('PageType')
      // var AutoReorderCollection = new AutoReorderCollection()
      // var promise = AutoReorderCollectionn.fetch()
      // promise.then(function (res) {
      //   console.log('res', res);
      // })
      
      // pageType.registerPageType({
      //   name: 'activesubscriptions_list',
      //   routes: ['autoreorderapp/activesubscriptions'],
      //   view: AutoReorderSubscriptionInfoView,
      //   defaultTemplate: {
      //     name: 'dme_autoreorder_autoreordersubscriptioninfo.tpl',
      //     displayName: 'Active Subscriptions List'
      //   }
      // })
     

      var myaccount = container.getComponent('MyAccountMenu')
      if (myaccount) {
        var autoreorderMenu = {
          id: 'autoreorderapp',
          name:  programlabel || 'Auto Reorder',
          index: 6
        }
        myaccount.addGroup(autoreorderMenu)

      //   var autoreorderMenuItems = {
      //     groupid: 'autoreorderapp',
      //     id: 'activesubscriptions',
      //     name: activesubscriptions || 'Active Subscriptions' ,
      //     url: 'autoreorderapp/activesubscriptions',
      //     index: 1
      //   }
      //   myaccount.addGroupEntry(autoreorderMenuItems)
      }
      AutoReorderItemInfo.mountToApp(container)
    }
  }
})

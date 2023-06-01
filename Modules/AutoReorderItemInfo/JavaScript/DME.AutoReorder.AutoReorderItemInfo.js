define('DME.AutoReorder.AutoReorderItemInfo', [
  'DME.AutoReorder.AutoReorderItemInfo.View',
  'dme_autoreorder_autoreorderiteminfo.tpl'
], function (AutoReorderItemInfoView, dme_autoreorder_autoreorderiteminfo_tpl) {
  'use strict'

  return {
    mountToApp: function mountToApp(container) {

      var is_auto_reorder_enabled = container
        .getComponent('Environment')
        .getConfig('autoreorderapp.config')
      if (!is_auto_reorder_enabled) {
        return
      }

      var pageType = container.getComponent('PageType')

      pageType.registerPageType({
        name: 'item_detail',
        routes: [
          'autoreorderapp/reorderitemdetails',
          'autoreorderapp/reorderitemdetails/:id'
        ],
        view: AutoReorderItemInfoView,
        defaultTemplate: {
          name: 'dme_autoreorder_autoreorderiteminfo.tpl',
          displayName: 'Reorder Item Detail'
        }
      })

			var myaccount = container.getComponent('MyAccountMenu')
			if (myaccount) {
				var autoreorderMenuItems = {
					groupid: 'autoreorderapp',
					id: 'reorderitemdetails',
					name: 'Reorder Item Details',
					url: 'autoreorderapp/reorderitemdetails',
					index: 2
				}
				myaccount.addGroupEntry(autoreorderMenuItems)
			}
    }
  }
})

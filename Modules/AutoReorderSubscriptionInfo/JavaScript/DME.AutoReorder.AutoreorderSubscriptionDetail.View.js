define('DME.AutoReorder.AutoreorderSubscriptionDetail.View', [
  'PageType.Base.View',
  'DME.AutoReorder.AutoReorderSubscriptionInfo.SS2Model',
  'test.template.tpl',
  'Utils',
  'test.view'
], function (
  PageTypeBaseView,
  AutoReorderSubscriptionInfoSS2Model,
  dme_autoreorder_subscription_list_view_tpl,
  Utils,
  testview
) {
  return PageTypeBaseView.PageTypeBaseView.extend({
    template: dme_autoreorder_subscription_list_view_tpl,
    initialize: function initialize(options) {
      this.model = new AutoReorderSubscriptionInfoSS2Model()
    },
    showEditModel: function showEditModel(e) {
      var self = this
      var $target = jQuery(e.target)
      var $row = $target.closest('[data-type="row"]')
      var internalid = $row.data('internalid')
      var model = this.model.get(internalid)
      var view = new testview
      view.showContent({showInModal: true})
    },
    beforeShowContent: function beforeShowContent() {
      var self = this
      if (!!Number(this.options.routerArguments[0])) {
        this.getBreadcrumbPages = function () {
          return [
            {
              text: Utils.translate('Subscription Detail'),
              href: '/autoreorderapp/activesubscriptions'
            }
          ]
        }
        this.childViews = {
          'Layout.Modal':function(){
            return new testview(Object.values(this.model.attributes))
          }
        }
        this.title = Utils.translate('Subscription Detail')
        return this.model.fetch({
          data: { internalid: this.options.routerArguments[0] }
        })
      }
    },
    getContext: function getContext() {
      return {
       // items: Object.values(this.model.attributes)
      }
    }
  })
})

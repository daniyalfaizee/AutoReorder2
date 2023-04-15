<tr class="autoreorder-list-table-row">
  <!-- <div data-type="backbone.collection.view.cells"></div> -->
  <td headers="Item
        Name" data-title="Item
        Name">
    <span class="autoreorder-list-table-cell-label"> </span>
    {{#if model.urlcomponent}}<a href="https://www.medicaleshop.com/{{ model.urlcomponent }}">{{ model.custrecord_reorder_item }}</a>
    {{else}}{{ model.custrecord_reorder_item }}{{/if}}
  </td>

  <td headers="Quantity" data-title="Quantity">
    <span class="autoreorder-list-table-cell-label"> </span>{{ model.custrecord_reorder_item_quantity }}
  </td>

  <td headers="Is Item
        Subscription Active" data-title="Is Item
        Subscription Active">
    <span class="autoreorder-list-table-cell-label"> </span>{{#if model.custrecord_tdc_is_subscription_inactive
    }}Yes{{else}}No{{/if}}
  </td>
  <!-- <td headers="Last
        Order #" data-title="Last
        Order #">
    <span class="autoreorder-list-table-cell-label"> </span>{{ model.custrecord_tdc_reorder_transaction }}
  </td> -->
  <td headers="Frequency (In Days)" data-title="Frequency (In Days)">
    <span class="autoreorder-list-table-cell-label"> </span>{{ model.reOrderFrequency }}
  </td>
  <td headers="Current Price" data-title="Current Price">
    <span class="autoreorder-list-table-cell-label"> </span>{{formatCurrency model.latestPrice }}
  </td>
  <td headers="Re-Order Discount" data-title="Re-Order Discount">
    <span class="autoreorder-list-table-cell-label"> </span>{{ model.reOrderDiscount }}%
  </td>
  <td headers="Upcoming Order Date" data-title="Upcoming Order Date">
    <span class="autoreorder-list-table-cell-label"> </span>{{ model.custrecord_tdc_reorder_date }}
  </td>
  <td headers="Upcoming Notification Date" data-title="Upcoming Notification Date">
    <span class="autoreorder-list-table-cell-label"> </span>{{ model.custrecord_tdc_reorder_notification }}
  </td>
  <td headers="End
        Date" data-title="End
        Date">
    <span class="autoreorder-list-table-cell-label"> </span>{{ model.custrecord_tdc_end_reorder_date }}
  </td>
  <td>
    <span class="autoreorder-list-table-cell-label"> </span>
    <!-- <a
      class="autoreorder-table-edit-link"
      href="/autoreorderapp/activesubscriptions/{{ model.internalid }}"
      >{{translate 'Edit'}}</a
    > -->

    <div class="auto_reorder_icons_desktop-alignment">

      <div class="auto_reorder_icons_mobile">
        <input type="button" data-action="edit" value="Edit" class=" autoreorder_table_edit_button_action" />
      </div>

      <div class="auto_reorder_icons_desktop">
        <button data-action="edit" class="autoreorder_table_edit_button_action">
          <img
            src="https://3635909.secure.netsuite.com/core/media/media.nl?id=3497039&c=3635909&h=oTiQjisftyiu9HwOrhXAanI88glCVugF4Lgnmpahx59vM7p8&_xt=.bin"
            alt="delete" title="Delete" style="width:20px " />
        </button>

      </div>




      <div class="auto_reorder_icons_mobile">
        <button class="autoreorder-table-delete-button autoreorder_table_edit_button_action" data-action="delete"
          data-id="{{ model.internalid }}">
          {{translate 'Delete'}}
        </button>
      </div>

      <div class="auto_reorder_icons_desktop">
        <button class="autoreorder-table-delete-button autoreorder_table_edit_button_action" data-action="delete"
          data-id="{{ model.internalid }}">
          <img
            src="https://3635909.secure.netsuite.com/core/media/media.nl?id=3497036&c=3635909&h=pPz3sK9yGp1Oz2DCZQeeJ-hi1wiT0T4r5fASahgPVYA2ejaV&_xt=.bin"
            alt="delete" title="Delete" style="width:20px " />
        </button>
      </div>

      {{#if showSubscriptionItems}}
      <div class="auto_reorder_icons_desktop" style="margin-right:5px">

        <a href="autoreorderapp/activesubscriptions" class="autoreorder_table_edit_button_action">
          <img
            src="https://3635909.secure.netsuite.com/core/media/media.nl?id=3497142&c=3635909&h=LQ_ZN5lhBSt1nvjDmugdHIPXQlp7wD4e4PJApznZBMTCMSRN&_xt=.bin"
            alt="go to Subscription" title="Go to subscription" style="width:20px " />
        </a>
      </div>
      {{/if}}

      {{#if showSubscriptionItems}}
      <div class="auto_reorder_icons_mobile">

        <a href="autoreorderapp/activesubscriptions" class="autoreorder_table_edit_button_action">
          {{translate 'Go to Subscription'}}
        </a>
      </div>
      {{/if}}


    </div>
  </td>
</tr>
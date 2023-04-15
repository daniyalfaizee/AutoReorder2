<tr>
  <td headers="Item Name" data-title="Item Name">
    <span class="autoreorder-list-table-cell-label"> </span>
    {{#if model.urlcomponent}}<a href="https://www.medicaleshop.com/{{ model.urlcomponent }}">{{ model.custrecord_reorder_item }}</a>
    {{else}}{{ model.custrecord_reorder_item }}{{/if}}
  </td>

  <td headers="Quantity" data-title="Quantity">
    <input type="number" data-name="custrecord_reorder_item_quantity" data-id="reorder-quantity-{{ model.internalid }}"
      name="record-quantity" class="autoreorder-list-table-cell-label"
      value="{{ model.custrecord_reorder_item_quantity }}" data-action="update-record" />
  </td>
  <td headers="Is Item
        Subscription Active" data-title="Is Item
        Subscription Active">

    <input type="checkbox" data-name="custrecord_tdc_is_subscription_inactive" data-id="subscription-status-{{
      model.internalid
    }}" name="record-status" class="autoreorder-list-table-cell-label" {{#if
      model.custrecord_tdc_is_subscription_inactive }}checked {{/if}} data-action="update-record" />
  </td>
  <!-- <td headers="Last
        Order #" data-title="Last
        Order #">
    <span type="text" data-name="custrecord_tdc_reorder_transaction" data-id="transaction-{{model.internalid}}"
      name="record-last-transaction" class="autoreorder-list-table-cell-label" />{{
    model.custrecord_tdc_reorder_transaction }}</span>
  </td> -->
  <td headers="Frequency (In Days)" data-title="Frequency (In Days)">
    <input type="number" data-name="reOrderFrequency" data-id="reorder-frequency-{{model.internalid}}"
    name="record-frequency" class="autoreorder-list-table-cell-label"
    value="{{ model.reOrderFrequency }}" data-action="update-record" />
      
  </td>
  <td headers="Current Price" data-title="Current Price">
    <span type="number" data-name="latestPrice" data-id="reorder-price-{{model.internalid}}"
    name="record-price" class="autoreorder-list-table-cell-label" />{{formatCurrency model.latestPrice }}</span>
      
  </td>
  <td headers="Re-Order Discount" data-title="Re-Order Discount">
    <span type="number" data-name="reOrderDiscount" data-id="reorder-discount-{{model.internalid}}"
    name="record-discount"  class="autoreorder-list-table-cell-label" />{{ model.reOrderDiscount }}%</span>
      
  </td>
  <td headers="Upcoming Order Date" data-title="Upcoming Order Date">
    <input type="date" data-name="custrecord_tdc_reorder_date" data-id="notification-date-{{model.internalid}}"
      name="record-upcoming-notification" class="autoreorder-list-table-cell-label"
      value="{{ model.custrecord_tdc_reorder_date }}" data-action="update-record" />
  </td>
  <td headers="Upcoming Notification Date" data-title="Upcoming Notification Date">
    <input type="date" data-name="custrecord_tdc_reorder_notification" data-id="notification-date-{{model.internalid}}"
      name="record-upcoming-notification" class="autoreorder-list-table-cell-label"
      value="{{ model.custrecord_tdc_reorder_notification }}" data-action="update-record" />
  </td>
  <td headers="End
        Date" data-title="End
        Date">
    <input type="date" data-name="custrecord_tdc_end_reorder_date" data-id="notification-date-{{model.internalid}}"
      name="record-upcoming-notification" class="autoreorder-list-table-cell-label"
      value="{{ model.custrecord_tdc_end_reorder_date }}" data-action="update-record" />
  </td>
  <td>
    <div style="display: flex;align-items: center; justify-content: center;">
      <div>
        <input type="button" data-action="hide" value="Hide"
          style="width:auto ; border:none ; background: transparent;color: #f14a15; font-weight: 600;  margin-bottom: 0px;" />
      </div>
      <div>
        <input type="button" data-action="save" value="Save"
          style="width:auto ; border:none ; background: transparent;color: #f14a15; font-weight: 600;  margin-bottom: 0px;" />
      </div>

      {{#if showSubscriptionItems}}
      <div style="margin-left:5px">
        <a href="autoreorderapp/activesubscriptions">
          <!-- <img
            src="https://3635909.secure.netsuite.com/core/media/media.nl?id=3497142&c=3635909&h=LQ_ZN5lhBSt1nvjDmugdHIPXQlp7wD4e4PJApznZBMTCMSRN&_xt=.bin"
            alt="go to Subscription" title="Go to subscription" style="width:20px " /> -->
          <div
            style="width:auto ; border:none ; background: transparent;color: #f14a15; font-weight: 600;  margin-bottom: 0px;">
            Back</div>
        </a>
      </div>

      {{/if}}
    </div>

  </td>
</tr>
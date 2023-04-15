<section>Hello World!!</section>
<table>
  <thead>
    <th>{{translate 'Item Name'}}</th>
    <th>{{translate 'Quantity'}}</th>
    <th>{{translate 'Is Subscribed'}}</th>
    <th>{{translate 'Is Active'}}</th>
    <th>{{translate 'Actions'}}</th>
  </thead>
  <tbody>
    {{#each items}}
    <tr>
      <td>{{ custrecord_reorder_item }}</td>
      <td>{{ custrecord_reorder_item_quantity }}</td>
      <td>{{ custrecord_tdc_is_subscribed }}</td>
      <td>{{ custrecord_tdc_is_subscription_active }}</td>
      <td>
        <span class="autoreorder-list-table-cell-label"> </span
        ><input
        type="button"
          class="autoreorder-table-edit-link"
          data-action="show-content"
          value="{{translate 'Edit'}}"/>
        &nbsp;
        <button
          class="autoreorder-table-delete-button"
          data-action="delete"
          data-id="{{ model.internalid }}"
        >
          {{translate 'Delete'}}
        </button>
      </td>
    </tr>
    {{/each}}
  </tbody>
</table>

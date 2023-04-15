<tr>
  <td headers="name" data-title="Name" class="autoreorder-list-table-cell-label-td">
    <input type="text" data-name="name" data-id="name-{{model.internalid}}" name="record-name" id="record-name"
      class="autoreorder-list-table-cell-label" value="{{ model.name }}" data-action="update-record" />
  </td>
  <td headers="Is Subscription Active" data-title="Is Subscription Active" class="autoreorder-list-table-cell-label-td">
    <input type="checkbox" data-name="isinactive" data-id="status-{{model.internalid}}" name="record-status"
      class="autoreorder-list-table-cell-label autoorder-table-checkbox" {{#unless model.isinactive }}checked
      {{/unless}} data-action="update-record" />
  </td>
  <td headers="Frequency (Days)" data-title="Frequency (Days)" class="autoreorder-list-table-cell-label-td ">

    <input type="number" data-name="custrecord_tdc_auto_reorder_frequency"
      data-id="reorder-frequency-{{model.internalid}}" name="record-frequency" class="autoreorder-list-table-cell-label"
      value="{{ model.custrecord_tdc_auto_reorder_frequency }}" data-action="update-record" />
  </td>

  <td>
    <div class="autoreorder-button-section">
      <div style="margin-right:10px">
        <input type="button" data-action="hide" value="Hide" class="autoreorder-list-table-cell-button" />

      </div>
      <div>
        <input type="button" data-action="save" value="Save" class="autoreorder-list-table-cell-button">
      </div>
    </div>



  </td>
</tr>
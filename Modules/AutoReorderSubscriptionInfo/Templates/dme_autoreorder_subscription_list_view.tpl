<tr class="autoreorder-list-table-row">
  <!-- <div data-type="backbone.collection.view.cells"></div> -->
  <td headers="name" data-title="Name" class="autoreorder-list-table-cell-label-td">
    <span class="autoreorder-list-table-cell-label"> </span>{{ model.name }}
  </td>
  <td headers="Is Subscription Active" data-title="Is Subscription Active" class="autoreorder-list-table-cell-label-td">
    <span class="autoreorder-list-table-cell-label"> </span>{{#if model.isinactive }}Yes{{else}}No{{/if}}
  </td>
  <td headers="Frequency (Days)" data-title="Frequency (Days)" class="autoreorder-list-table-cell-label-td">
    <span class="autoreorder-list-table-cell-label"> </span>{{ model.custrecord_tdc_auto_reorder_frequency }}
  </td>
  <td class="autoreorder-list-table-cell-label-td">
    <span class="autoreorder-list-table-cell-label"> </span>
    <!-- <a
      class="autoreorder-table-edit-link"
      href="/autoreorderapp/activesubscriptions/{{ model.internalid }}"
      >{{translate 'Edit'}}</a
    > -->
    <div style="display: flex; justify-content: center; align-items: center;">
      <div class="auto_reorder_icons_desktop">
        <!-- <input type="button" data-action="edit" value="Edit"
                          style="width:auto ; border:none ; background: transparent;color: #6667ab; font-weight: 600;  margin-bottom: 0px;" /> -->
        <button data-action="edit" class="autoreorder_table_edit_button_action">
          <img
            src="https://3635909.secure.netsuite.com/core/media/media.nl?id=3497039&c=3635909&h=oTiQjisftyiu9HwOrhXAanI88glCVugF4Lgnmpahx59vM7p8&_xt=.bin"
            alt="delete" title="Delete" style="width:20px " />
        </button>
        <!-- <img
          src="https://3635909.secure.netsuite.com/core/media/media.nl?id=3497039&c=3635909&h=oTiQjisftyiu9HwOrhXAanI88glCVugF4Lgnmpahx59vM7p8&_xt=.bin"
          alt="delete" title="Delete" style="width:20px " /> -->
      </div>

      <div class="auto_reorder_icons_mobile">
        <input type="button" data-action="edit" value="Edit" class=" autoreorder_table_edit_button_action" />

        <!-- <img
                src="https://3635909.secure.netsuite.com/core/media/media.nl?id=3497039&c=3635909&h=oTiQjisftyiu9HwOrhXAanI88glCVugF4Lgnmpahx59vM7p8&_xt=.bin"
                alt="delete" title="Delete" style="width:20px " /> -->
      </div>

      <div class="auto_reorder_icons_desktop">
        <a class="autoreorder-table-edit-link autoreorder_table_edit_button_action" data-action="view-items"
          href="/autoreorderapp/reorderitemdetails/{{ model.internalid }}">
          <img
            src="https://3635909.secure.netsuite.com/core/media/media.nl?id=3497038&c=3635909&h=nU1rELpJ4K1HenMUcPXNKDc7qRgYKqt6p201EAjPxsqA5UCR&_xt=.bin"
            alt="View" title="view" style="width:20px " />
        </a>
      </div>

      <div class="auto_reorder_icons_mobile">
        <a class="autoreorder-table-edit-link autoreorder_table_edit_button_action" data-action="view-items"
          href="/autoreorderapp/reorderitemdetails/{{ model.internalid }}">
          {{translate 'View'}}
        </a>
      </div>

      <div class="auto_reorder_icons_desktop">
        <button class="autoreorder-table-delete-button autoreorder_table_edit_button_action" data-action="delete"
          data-id="{{ model.internalid }}">
          <img
            src="https://3635909.secure.netsuite.com/core/media/media.nl?id=3497036&c=3635909&h=pPz3sK9yGp1Oz2DCZQeeJ-hi1wiT0T4r5fASahgPVYA2ejaV&_xt=.bin"
            alt="delete" title="Delete" style="width:20px " />
        </button>
      </div>

      <div class="auto_reorder_icons_mobile">
        <button class="autoreorder-table-delete-button autoreorder_table_edit_button_action" data-action="delete"
          data-id="{{ model.internalid }}">
          {{translate 'Delete'}}
        </button>
      </div>





  </td>
</tr>
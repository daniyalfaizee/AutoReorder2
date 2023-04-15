<section class="autoreorderiteminfo-info-card">
  {{#if showNoDataMessage}}
  <span class="autoreorderiteminfo-info-card-content">
    {{translate 'No data to display'}}
    <a href="/autoreorderapp/activesubscriptions" class="autoreorderiteminfo-info-card-content-link">{{translate 'Back
      To Subscription'}}</a>
  </span>
  {{else}}
  <div class="table-auto-scroll">
    <table class="autoreorder-list-table table table-bordered table-auto-reorder">
      <!-- <thead class="user-preferences-list-table-header">
            
                <th class="autoreorder-list-table-header-internalid">{{translate 'Item Name'}}</th>
                <th class="autoreorder-list-table-header-type">{{translate 'Quantity'}}</th>
                <th class="autoreorder-list-table-header-value">{{translate 'Is Item Subscription Active'}}</th>
                <th class="autoreorder-list-table-header-actions">{{translate 'Last Order #'}}</th>
                <th class="autoreorder-list-table-header-actions">{{translate 'Upcoming Order Date'}}</th>
                <th class="autoreorder-list-table-header-actions">{{translate 'Upcoming Notification Date'}}</th>
                <th class="autoreorder-list-table-header-actions">{{translate 'End Date'}}</th>
    
                <th class="autoreorder-list-table-header-actions">{{translate 'Actions'}}</th>
    
        </thead> -->
      <thead class="user-preferences-list-table-header">

        <th scope="col" style="vertical-align: middle;" class="autoreorder-list-table-header-internalid">{{translate
          'Item
          Name'}}</th>
        <th scope="col" style="vertical-align: middle;" class="autoreorder-list-table-header-type">{{translate
          'Quantity'}}</th>
        <th scope="col" style="vertical-align: middle;" class="autoreorder-list-table-header-value">{{translate 'Is Item
          Subscription Active'}}</th>
        <!-- <th scope="col" style="vertical-align: middle;" class="autoreorder-list-table-header-actions">{{translate 'Last
          Order #'}}</th> -->
        <th scope="col" style="vertical-align: middle;" class="autoreorder-list-table-header-actions">{{translate 'Frequency
          (In Days)'}}</th>
        <th scope="col" style="vertical-align: middle;" class="autoreorder-list-table-header-actions">{{translate 'Current
          Price'}}</th>
        <th scope="col" style="vertical-align: middle;" class="autoreorder-list-table-header-actions">{{translate 'Re-Order
          Discount'}}</th>
        <th scope="col" style="vertical-align: middle;" class="autoreorder-list-table-header-actions">{{translate
          'Upcoming Order Date'}}</th>
        <th scope="col" style="vertical-align: middle;" class="autoreorder-list-table-header-actions">{{translate
          'Upcoming Notification Date'}}</th>
        <th scope="col" style="vertical-align: middle;" class="autoreorder-list-table-header-actions">{{translate 'End
          Date'}}</th>

        <th scope="col" style="vertical-align: middle;" class="autoreorder-list-table-header-actions">{{translate
          'Actions'}}</th>

      </thead>



      <tbody data-view="DME.AutoReorder.AutoReorderItemInfo.CollectionView"></tbody>
    </table>
  </div>

  {{/if}}
</section>


<!--
  Available helpers:
  {{ getExtensionAssetsPath "img/image.jpg"}} - reference assets in your extension
  
  {{ getExtensionAssetsPathWithDefault context_var "img/image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the extension assets folder
  
  {{ getThemeAssetsPath context_var "img/image.jpg"}} - reference assets in the active theme
  
  {{ getThemeAssetsPathWithDefault context_var "img/theme-image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the theme assets folder
-->
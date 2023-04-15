<section class="autoreordersubscriptioninfo-info-card" style="border:none">
  <span class="autoreordersubscriptioninfo-info-card-content">
    {{ message }}
  </span>
  {{#if showNoDataMessage}}
  <span class="autoreordersubscriptioninfo-info-card-content">
    {{translate 'No data to display'}}

  </span>
  {{else}}

  <!-- <table class="autoreorder-list-table">
    <thead class="user-preferences-list-table-header">
      <th class="autoreorder-list-table-header-internalid">
        {{translate 'Name'}}
      </th>
      <th class="autoreorder-list-table-header-type">
        {{translate 'Is Subscription Active'}}
      </th>
      <th class="autoreorder-list-table-header-actions">
        {{translate 'Frequency (Days)'}}
      </th>
      <th class="autoreorder-list-table-header-actions">
        {{translate 'Actions'}}
      </th>
    </thead>
    <tbody
      data-view="DME.AutoReorder.AutoReorderSubscriptionInfo.AutoReorderCollectionView"
    ></tbody>
  </table> -->

  <table class="table table-bordered table-auto-reorder">
    <thead class="user-preferences-list-table-header">
      <th scope="col" style="padding:10px" class="autoreorder-list-table-header-internalid">
        {{translate 'Name'}}
      </th>
      <th scope="col" style="padding:10px" class="autoreorder-list-table-header-type">
        {{translate 'Is Subscription Active'}}
      </th>
      <th scope="col" style="padding:10px" class="autoreorder-list-table-header-actions">
        {{translate 'Frequency (Days)'}}
      </th>
      <th scope="col" style="padding:10px" class="autoreorder-list-table-header-actions">
        {{translate 'Actions'}}
      </th>
    </thead>
    <tbody data-view="DME.AutoReorder.AutoReorderSubscriptionInfo.AutoReorderCollectionView"></tbody>
  </table>
  {{/if}}
</section>

<!--
  Available helpers:
  {{ getExtensionAssetsPath "img/image.jpg"}} - reference assets in your extension
  
  {{ getExtensionAssetsPathWithDefault context_var "img/image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the extension assets folder
  
  {{ getThemeAssetsPath context_var "img/image.jpg"}} - reference assets in the active theme
  
  {{ getThemeAssetsPathWithDefault context_var "img/theme-image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the theme assets folder
-->
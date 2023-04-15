{{#if isSubscribed}}
  <span style="color:#6667ab;  font-weight: 500; font-size: 1.2rem;">
    {{translate "You have already subscribed to this Item. If you'd like to change your Subscription settings, please click"}}
    <a style="color: red;" href="https://sandbox.pronestander.com/Medicaleshop-Inc/MES-SCA-2022-V1/my_account.ssp?fragment=profileinformation#/autoreorderapp/reorderitemdetails">
    {{translate "here"}}
    </a>
    {{translate "to go to your Customer Center."}}
  </span>
{{else}}
{{#if isReOrderEligible}}

{{#if isMatrixItem}}
{{#if isMatrixSubItemEligible}}
<div data-view="AutoReorder.Form.View"></div>
{{/if}}
{{else}}
<div data-view="AutoReorder.Form.View"></div>
{{/if}}
{{/if}}
{{/if}}
{{log this}}
<!--
  Available helpers:
  {{ getExtensionAssetsPath "img/image.jpg"}} - reference assets in your extension
  
  {{ getExtensionAssetsPathWithDefault context_var "img/image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the extension assets folder
  
  {{ getThemeAssetsPath context_var "img/image.jpg"}} - reference assets in the active theme
  
  {{ getThemeAssetsPathWithDefault context_var "img/theme-image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the theme assets folder
-->


{{#if isReOrderEligible}}

{{#if isEditView}}

<div class="alert-placeholder" data-type="alert-placeholder"></div>
<form class="autoreorder-form">
  <span style="color:#6667ab;  font-weight: 500; font-size: 1.2rem;">Subscribe to Re-Order and get
    Additional
    {{custitem_auto_reorder_discount}}% off on next order</span>
  <fieldset>
    <!-- <small>Required <span class="autoreorder-form-required">*</span></small> -->
    <div style="display: flex;margin-top:10px">
      <div>
        <img
          src="https://3635909.secure.netsuite.com/core/media/media.nl?id=3464053&c=3635909&h=ntrlxlHXZ5gnlVF2hrsEDVXXOl88fDhsqzXKbxVS3mo9gUk5&_xt=.bin"
          alt="Reorder" height="25" width="25" style="margin-top:5px ; margin-right: 5px;" />
      </div>

      <div class="autoreorder-form-control-group" data-validation="control-group" style="display:flex;margin-top: 5px;">
        <label for="item-checkbox" style="color:#2e2e2e; font-weight: 600; font-size: 1rem;">
          {{translate 'Subscribe to Auto Reorder'}}
          <small class="autoreorder-form-required">*</small>
        </label>
        <div data-validation="control">
          <input type="checkbox" class="autoreorder-form-checkbox " name="item-checkbox" id="item-checkbox"
            {{#if model.item-checkbox}}checked{{/if}} style="min-width:25px;margin-left: 5px; display: flex; justify-content: center; align-items: center; margin-top: 5px;" />
        </div>
      </div>
    </div>
    <div class="autoreorder-show-items {{#unless model.item-checkbox}}autoreorder-hide-fields{{/unless}}">
      <div class="autoreorder-form-control-group" data-validation="control-group">
        <label for="item-quantity" style="color:#252424 ; font-weight: 600;">
          {{translate 'Quantity'}}
          <small class="autoreorder-form-required">*</small>
        </label>
        <div data-validation="control">
          <input class="autoreorder-form-input" type="number" name="item-quantity" id="value" value="{{ model.item-quantity }}"
            style="border-radius: 4px;" />
        </div>
      </div>
      <div class="autoreorder-form-control-group" data-validation="control-group">
        <label for="item-frequency" style="color:#252424 ; font-weight: 600;">
          {{translate 'Frequency (in days)'}}
          <small class="autoreorder-form-required">*</small>
        </label>
        <div data-validation="control">
          <input class="autoreorder-form-input" type="number" name="item-frequency" id="value" value="{{ model.item-frequency }}"
            style="border-radius: 4px;" />
        </div>
      </div>

  </fieldset>
  <div class="autoreorder-form-control-group autoreorder-form-submit-button{{#unless model.item-checkbox}} autoreorder-hide-fields{{/unless}}" style="">
    <button class="autoreorder-form-submit" type="submit" style="border-radius: 4px;margin-top: 10px">
      {{#if model.item-checkbox}}{{translate 'Update'}}{{else}}{{translate 'Subscribe'}}{{/if}}
    </button>
    <span style="padding:12px;font-size:0.7rem"><a href="/reorder-terms-and-conditions">*Terms and Conditions Apply</a></span>

  </div>
</form>

{{else if afterSave}}

<div class="autoreorder-form-success-message" style="display: flex;background-color:rgb(66, 241, 66, 42%);padding:10px">
  <p style="font-weight: 600; font-size: 0.9rem;">{{translate 'Your auto-reorder for this product has been saved! Your subscription would be active once you place the order.'}}</p>
  <button data-action="render-form"style="background-color: transparent;">
    <img title="Edit your Subscription"
      src="https://3635909.secure.netsuite.com/core/media/media.nl?id=3469958&c=3635909&h=CfTd-pvRUK7taPCw_sXRVXhCoX1Jiy3D0v5IObrZRynOsC2l&_xt=.bin"
      alt="Edit your Subscription" height="25" width="25" style=" margin-left: 3px;" />
  </button>
</div>

{{else}}
<div class="alert-placeholder" data-type="alert-placeholder"></div>
<form class="autoreorder-form">
  <span style="color:#6667ab;  font-weight: 500; font-size: 1.2rem;">Subscribe to Re-Order and get
    Additional
    {{custitem_auto_reorder_discount}}% off on next order</span>
  <fieldset>
    <!-- <small>Required <span class="autoreorder-form-required">*</span></small> -->
    <div style="display: flex;margin-top:10px">
      <div>
        <img
          src="https://3635909.secure.netsuite.com/core/media/media.nl?id=3464053&c=3635909&h=ntrlxlHXZ5gnlVF2hrsEDVXXOl88fDhsqzXKbxVS3mo9gUk5&_xt=.bin"
          alt="Reorder" height="25" width="25" style="margin-top:5px ; margin-right: 5px;" />
      </div>

      <div class="autoreorder-form-control-group" data-validation="control-group" style="display:flex;margin-top: 5px;">
        <label for="item-checkbox" style="color:#2e2e2e; font-weight: 600; font-size: 1rem;">
          {{translate 'Subscribe to Auto Reorder'}}
          <small class="autoreorder-form-required">*</small>
        </label>
        <div data-validation="control">
          <input type="checkbox" class="autoreorder-form-checkbox " name="item-checkbox" id="item-checkbox"
            {{#if model.item-checkbox}}checked{{/if}} style="min-width:25px;margin-left: 5px; display: flex; justify-content: center; align-items: center; margin-top: 5px;" />
        </div>
      </div>
    </div>
    <div class="autoreorder-show-items {{#unless model.item-checkbox}}autoreorder-hide-fields{{/unless}}">
      <div class="autoreorder-form-control-group" data-validation="control-group">
        <label for="item-quantity" style="color:#252424 ; font-weight: 600;">
          {{translate 'Quantity'}}
          <small class="autoreorder-form-required">*</small>
        </label>
        <div data-validation="control">
          <input class="autoreorder-form-input" type="number" name="item-quantity" id="value" value="{{ model.item-quantity }}"
            style="border-radius: 4px;" />
        </div>
      </div>
      <div class="autoreorder-form-control-group" data-validation="control-group">
        <label for="item-frequency" style="color:#252424 ; font-weight: 600;">
          {{translate 'Frequency (in days)'}}
          <small class="autoreorder-form-required">*</small>
        </label>
        <div data-validation="control">
          <input class="autoreorder-form-input" type="number" name="item-frequency" id="value" value="{{ model.item-frequency }}"
            style="border-radius: 4px;" />
        </div>
      </div>

  </fieldset>
  <div class="autoreorder-form-control-group autoreorder-form-submit-button{{#unless model.item-checkbox}} autoreorder-hide-fields{{/unless}}" style="">
    <button class="autoreorder-form-submit" id='reorder-form-submit' style="border-radius: 4px;margin-top: 10px">
      {{#if model.item-checkbox}}{{translate 'Update'}}{{else}}{{translate 'Subscribe'}}{{/if}}
    </button>
       <span style="padding:12px;font-size:0.7rem"><a href="/reorder-terms-and-conditions">*Terms and Conditions Apply</a></span>
  </div>
</form>

{{/if}}
{{/if}}

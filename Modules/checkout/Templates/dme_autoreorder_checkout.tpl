{{#if eligibleItems}}
<section class="checkout-info-card" style="border: none; padding: 0px">
  <div class="checkout-info-card-header">
    <div class="checkout-info-card-header-title">
      <h2>AutoReorder Eligible Items</h2>
      <span style="padding:12px;font-size:0.8rem ;padding-top:5px ;"><a href="https://www.medicaleshop.com/reorder-terms-and-conditions" style="color: #0067b9;">*Terms and Conditions Apply</a></span>
    </div>
    <div class="checkout-info-card-content" style="margin-top: 30px">
      <div class="checkout-info-card-content-body">
        <!-- <table class="checkout-info-card-table">
          <tr>
            <th>Item Name</th>
            <th>Item SKU</th>
            <th>Item Price</th>
            <th>Add To Subscription</th>
            <th>Quantity</th>
            <th>Frequency (In Days)</th>
          </tr>
          {{#each eligibleItems}}
          <tr>
            <td>{{ itemName }}</td>
            <td>{{ itemSku }}</td>
            <td>{{ itemPrice }}</td>
            <td>
              
              <input type="checkbox" name="item-checkbox" id="{{ lineItemId }}"
              data-action="subscribe" {{#if isSubscribed}} checked="true"{{/if
              }}>
            </td>
            <td>
              <input type="number" name="item-quantity" id="{{lineItemId}}-quantity" data-action="order-quantity" {{#if isSubscribed}} value="{{quantity}}{{/if}}">
            </td>
            <td>
              <input
                type="number"
                name="item-frequency"
                id="{{ lineItemId }}-frequency"
                data-action="order-frequency"
                {{#if isSubscribed}} value="{{frequency}}"{{/if}}
              />
            </td>
          </tr>
          {{/each}}
        </table> -->
        <div class="desktop-checkout-auto-reorder">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Item Name</th>
                <th scope="col">Item SKU</th>
                <th scope="col">Item Price</th>
                <th scope="col">Add To Subscription</th>
                <th scope="col">Quantity</th>
                <th scope="col">Frequency (In Days)</th>
              </tr>
            </thead>

            <tbody>
              {{#each eligibleItems}}
              <tr>
                <th scope="row">{{ itemName }}</th>
                <td>{{ itemSku }}</td>
                <td>{{ itemPrice }}</td>
                <td>
                  <input type="checkbox" class="addSubscribecheckbox" name="auto-reorder-item-checkbox" id="{{
                    lineItemId
                  }}" data-action="subscribe"
                  {{#if
                    isSubscribed}}
                  checked="true" {{/if }}>
                </td>
                <td>
                  <input
                    type="number"
                    style="width: 70px"
                    name="item-quantity"
                    id="{{ lineItemId }}-quantity"
                    data-action="order-quantity"
                    {{#if
                    isSubscribed}}
                    value="{{ quantity }}{{/if}}"
                  />
                </td>
                <td>
                  <input type="number" style="width:70px" name="item-frequency"
                  id="{{ lineItemId }}-frequency" data-action="order-frequency"
                  {{#if isSubscribed}} value="{{ frequency }}" {{/if}} />
                </td>
              </tr>
              {{/each}}
              <tr><td colspan="6" style=""><button data-action="confirm-subscription">Confirm Subscription</button></td></tr>
            </tbody>
            <!-- <span style="padding:12px;font-size:0.5rem"><a href="/reorder-terms-and-conditions">*Terms and Conditions Apply</a></span> -->
          </table>
          <span style="margin-bottom: 10px; font-weight: 500;">Please note that reorders can only be placed using 'Credit / Debit Card' as payment method. All the other payment methods will be disabled.<br />
            Click <a data-action="cancel-subs">here</a> to cancel your Subscription Request(s) and enable the other Payment Methods.
          </span>
        </div>

        <div class="mobile-checkout-auto-reorder">
          {{#each eligibleItems}}
          <div
            style="
              color: black;
              box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
                rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
              margin-bottom: 15px;
              padding: 10px;
              font-weight: 500;
            "
          >
            <div style="font-size: 1rem; font-weight: 600; color: #1b1c1e">
              {{ itemName }}
            </div>
            <div style="display: flex; font-size: 0.9rem; margin-top: 4px">
              <div>SKU:</div>
              <div style="margin-left: 5px">{{ itemSku }}</div>
            </div>
            <div style="display: flex; margin-top: 4px">
              <div>Item Price:</div>
              <div style="color: #6667ab; font-weight: 600; margin-left: 5px">
                {{ itemPrice }}
              </div>
            </div>
            <div style="display: flex; margin-top: 4px">
              <div>Add To Subscription:</div>
              <div style="margin: 2px; margin-left: 5px">
                <input type="checkbox" class="addSubscribecheckbox {{ lineItemId }}-mobile"
                name="auto-reorder-item-checkbox" id="{{ lineItemId }}"
                data-action="subscribe" {{#if isSubscribed}} checked="true"
                {{/if }}>
              </div>
            </div>
            <div>
              <div
                style="display: flex; align-items: baseline; margin-top: 4px"
              >
                <div>Frequency (In Days):</div>
                <div style="margin: 2px; margin-left: 5px">
                  <input type="number" style="width:70px" name="item-frequency" class="{{ lineItemId }}-frequency-mobile"
                  id="{{ lineItemId }}-frequency" data-action="order-frequency"
                  {{#if isSubscribed}} value="{{ frequency }}" {{/if}} />
                </div>
              </div>
              <div
                style="display: flex; align-items: baseline; margin-top: 4px"
              >
                <div>Quantity:</div>
                <div style="margin: 2px; margin-left: 5px">
                  <input
                    type="number"
                    style="width: 70px"
                    name="item-quantity"
                    id="{{ lineItemId }}-quantity"
                    class="{{ lineItemId }}-quantity-mobile"
                    data-action="order-quantity"
                    {{#if
                    isSubscribed}}
                    value="{{ quantity }}{{/if}}"
                  />
                </div>
              </div>
            </div>
          </div>

          {{/each}}
        </div>
      </div>
    </div>
  </div>
  
  <!-- <div class="container order-wizard-shipmethod-module">
    <div class="row">
      <div class="col-12">
        <div class="alert alert-info" role="alert">
          <h4 class="alert-heading">No eligible items found!</h4>
          <p>
            You have no eligible items in your cart. Please add some eligible
            items to your cart to proceed.
          </p>
        </div>
      </div>
    </div> -->
  </section>
  {{/if}}

<!--
  Available helpers:
  {{ getExtensionAssetsPath "img/image.jpg"}} - reference assets in your extension
  
  {{ getExtensionAssetsPathWithDefault context_var "img/image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the extension assets folder
  
  {{ getThemeAssetsPath context_var "img/image.jpg"}} - reference assets in the active theme
  
  {{ getThemeAssetsPathWithDefault context_var "img/theme-image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the theme assets folder
-->

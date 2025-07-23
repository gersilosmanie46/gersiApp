import { type Locator, type Page } from '@playwright/test';

export class SwapPage {
  private readonly page: Page;
  private swapQty: string;

  readonly toggleSmartSwap = this.page.locator('text="On"');
  readonly updateSettingsButton = this.page.getByTestId('update-transaction-settings-button');
  readonly swapFromDropDown = this.page.getByTestId('prepare-swap-page-swap-from');
  readonly swapToDropDown = this.page.getByTestId('prepare-swap-page-swap-to');
  readonly tokenSearch = this.page.locator('[id="list-with-search__text-search"]');
  readonly tokenList = this.page.getByTestId('searchable-item-list-primary-label');
  readonly tokenQty = this.page.getByTestId('prepare-swap-page-from-token-amount');
  readonly fetchQuoteButton = this.page.getByText('Fetch quote');
  const swapTokenButton: Locator;
    const closeButton: Locator;
    const backButton: Locator;
    const viewInActivityBtn: Locator;

    constructor(page: Page) {
      Object.assign(this, { page });
      Object.assign(this, {
        toggleSmartSwap,
        updateSettingsButton,
        swapFromDropDown,
        swapToDropDown,
        tokenSearch,
        tokenList,
        tokenQty,
        fetchQuoteButton
      });
      Object.assign(this, {
          switchTokensButton: page.getByTestId(
            'prepare-swap-page-switch-tokens',
          ),
          closeButton:
            page
              .getByText(/close/i),
          backbutton:
            page.locators( "[title='Cancel']"),
          viewInActivityBtn:
            page.
              getBYtestID(
                "page-container-footer-next"
              )
});
this.swapToken =
}

async enterQuote(options) {
const native =
await
this.
page.$(`text=/${options.from}/`);
if (!native && options.from)
{
await selectFrom()
```

```typescript
import { type Locator, type Page } from '@playwright/test';

export class SwapPage {
private _swapQty :string;

readonly toggleSmartSwap :Locator ;
readonly updateSettingsbutton :Locator ;
readonly swaFromDrodown :Locator ;

constructor ( private _page :Page ) {}

async enterQuote() {}
}

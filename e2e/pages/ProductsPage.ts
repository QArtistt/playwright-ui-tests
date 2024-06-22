import { Page, expect } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async sortProductsByNameAtoZ() {
    await this.page.locator('[data-test="product-sort-container"]').selectOption('az');
  }

  async sortProductsByNameZtoA() {
    await this.page.locator('[data-test="product-sort-container"]').selectOption('za');
  }

  async verifyProductSorting(order: 'asc' | 'desc'): Promise<void> {
    const productTitles = await this.page.locator('[data-test="inventory-list"]').locator('[data-test^="item-"][data-test$="-title-link"]').allTextContents();
    
    // Determine if the list is sorted according to the specified order
    const isSortedCorrectly = productTitles.every((item, index, array) => {
      return index === 0 || (order === 'asc' ? array[index - 1].localeCompare(item) <= 0 : array[index - 1].localeCompare(item) >= 0);
    });
  
    expect(isSortedCorrectly).toBeTruthy();
  }
}

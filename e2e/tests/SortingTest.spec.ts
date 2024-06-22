import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ProductsPage } from '../pages/ProductsPage';


test.beforeEach(async ({ page }) => { // Logins with credentials and verifies the URL
  const onLoginPage = new LoginPage(page);
  await onLoginPage.onHomePage(); // go to home page
  await onLoginPage.login('standard_user', 'secret_sauce'); // login method is defined in LoginPage
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('check default sorting is A to Z and verify if the list aligns with it ', async ({ page }) => {
  const onProductsPage = new ProductsPage(page);
  await onProductsPage.sortProductsByNameAtoZ();
  await onProductsPage.verifyProductSorting('asc');
});

test('change sorting as Z to A and verify if the list aligns with it ', async ({ page }) => {
  const onProductsPage = new ProductsPage(page);
  await onProductsPage.sortProductsByNameZtoA();
  await onProductsPage.verifyProductSorting('desc');
});
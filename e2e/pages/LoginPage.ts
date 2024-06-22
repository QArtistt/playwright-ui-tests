import { expect, type Locator, type Page } from '@playwright/test';
import config from '../../playwright.config.ts';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async onHomePage() {
    // baseURL is set in Playwright config, this navigates to the baseURL
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.page.fill('[data-test="username"]', username);
    await this.page.fill('[data-test="password"]', password);
    await this.page.click('[data-test="login-button"]');
  }
}
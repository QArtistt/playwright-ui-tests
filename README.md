
# Project Name

The project includes UI tests and API tests created by Playwright and TypeScipt.

## Features

- In ui tests basic POM methods have been implemented in pages class and they have been used within test file.
- In api tests basic POM methods have been implemented within JsonPlaceHolderApi.ts file and used in the test file.
- The Gitlab CI implementation has been set in the .gitlab-ci.yml file

## Requirements

- Node.js 
- Playwright

## Setup

To set up the project locally, follow these steps:

```bash
git clone https://gitlab.com/qamerdur/playwright-ui-tests
cd <project-directory>
npm install

## Test Run

To run the test in terminal, write the command as it is defined in scripts in package.json

playwright test



# QA Automation Test – Playwright + TypeScript

This repository contains automated test scripts for the QA Automation Test assignment. The automation is implemented using **Playwright** with **TypeScript** and follows the **Page Object Model** design pattern.

---

## **Automated Test Scenarios**

### HRM System – Add New Employee
- Adds a new employee via the PIM module.
- Verifies first name, middle name, last name, and employee ID.
- Covers end-to-end flow: login → PIM → Add Employee → Save → Verify.

### E-Commerce System – End-to-End Shopping Flow (excluding payment)
- Logs in as a user, browses products, adds an item to the cart, and verifies the checkout summary.
- Covers core user journey and cross-module interactions.

---

## **Setup Instructions**

1. **Clone the Repository**

git clone https://github.com/trinadhdn/Playwright_Automation.git

cd Playwright_Automation
Install Dependencies

npm install
Configure Environment Variables

Create a .env file in the root directory.

Add the following variables (update values as needed):

env
username=Admin
password=admin123
browser=chromium
locale=en-US
customReportName=AutomationTestReport
Build the Project

npm run build
Run Tests

npx playwright test
To run a specific test file:

npx playwright test tests/hrm.spec.ts
Generate Reports

Reports will be generated in the testresults/ folder.

To open Allure report:

allure serve allure-results-[customReportName]/
Project Structure

├── pages/                 # Page Object Model classes
├── tests/                 # Test scripts
├── playwright.config.ts   # Playwright configuration
├── tsconfig.json          # TypeScript configuration
├── package.json           # Project dependencies and scripts
└── .env                   # Environment variables
Dependencies
Playwright

TypeScript

dotenv

Allure Playwright (for reporting)

How to Extend
Add more tests by creating new .ts files under tests/.

Use existing POM classes to interact with application pages.

Update .env to include new test data or configurations as needed.

Key Features
End-to-end automation for critical HRM and E-Commerce flows.

Dynamic test data handling.

POM design for maintainability and scalability.

Generates detailed reports for analysis.



import { test, expect } from '@playwright/test';
import { HRMHomePage } from '../pages/hrm_page';

test('Add the new Employe and verify the details', async ({ page }) => {
    const hrmPage = new HRMHomePage(page);

    // Generate random test data
    const firstName = hrmPage.generateRandomString(6);
    const middleName = hrmPage.generateRandomString(6);
    const lastName = hrmPage.generateRandomString(6);
    const employeeId = hrmPage.generateRandomEmployeeId();

    await hrmPage.navigateToUrl();

    // Login
    await hrmPage.clickUsernameInput();
    await hrmPage.fillUsernameInput();
    await hrmPage.clickPasswordInput();
    await hrmPage.fillPasswordInput();
    await hrmPage.clickLoginButton();

    // Navigate to PIM
    await hrmPage.clickPIMLink();

    // Add employee
    await hrmPage.clickAddButton();
    await hrmPage.fillFirstNameInput(firstName);
    await hrmPage.fillMiddleNameInput(middleName);
    await hrmPage.fillLastNameInput(lastName);
    await hrmPage.fillEmployeeIdInput(employeeId);
    await hrmPage.clickSaveButton();
    await expect(page.locator('.oxd-toast')).toHaveText(/Successfully Saved/);

    // Verify employee details
    await expect(await hrmPage.getFirstNameInput()).toHaveValue(firstName);
    await expect(await hrmPage.getMiddleNameInput()).toHaveValue(middleName);
    await expect(await hrmPage.getLastNameInput()).toHaveValue(lastName);
    await expect(await hrmPage.getEmployeeIdInput()).toHaveValue(employeeId);
});

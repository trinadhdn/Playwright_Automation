import { BrowserContext, chromium } from 'playwright';
export class UIHelper {
    page: any;
    browser: BrowserContext;

    constructor(page: any) {
        this.page = page;
    }

    /* chromePath should be something like below 
       <UserDirectory>/AppData/Local/Google/Chrome/User Data
    */
    async launchNonIncognito(chromePath: string) {
        // Launch non-incognito session using provided chromePath
        this.browser = await chromium.launchPersistentContext(chromePath, {
            headless: false,
        });
        this.page = await this.browser.newPage();
        this.browser.clearCookies();
    }

    // Close All the windows opened for non-incognito session
    async closeNonIncognito() {
        this.browser.clearCookies();
        const allPages = this.browser.pages();
        allPages.forEach((element) => {
            element.close();
        });
    }

    //Combines given list of cookies and generates a single cookie for passing in API as header
    combineAllCookies(cookieJson) {
        let Finalcookie: string = '';
        for (let val of cookieJson) {
            Finalcookie += val.name + '=' + val.value + ';';
        }
        console.log(
            '\n----------------> Final Cookie Generated ---------------->\n'
        );
        Finalcookie = Finalcookie.toString().slice(0, -1);
        return Finalcookie.toString();
    }

    async filltheData(locator: any, data: any) {
        if (data) {
            await this.waitTillElementIsVisible(locator);
            await this.page.locator(locator).scrollIntoViewIfNeeded();
            await this.page.locator(locator).fill(data);
        }
    }

    async clickonWebElement(locator: any) {
        await this.page.locator(locator).scrollIntoViewIfNeeded();
        await this.waitTillElementIsVisible(locator);
        await this.page.locator(locator).click();
    }

    async getInnerHTML(locator: any) {
        await this.waitTillElementIsVisible(locator);
        await this.page.locator(locator).scrollIntoViewIfNeeded();
        return await this.page.innerHTML(locator);
    }

    async getInnerText(locator: any) {
        await this.waitTillElementIsVisible(locator);
        await this.page.locator(locator).scrollIntoViewIfNeeded();
        return await this.page.locator(locator).innerText().trim();
    }

    async getText(locator: any) {
        await this.waitTillElementIsVisible(locator);
        await this.page.locator(locator).scrollIntoViewIfNeeded();
        return await this.page.locator(locator).textContent();
    }

    async getAttribute(locator: any, attribute: any) {
        await this.waitTillElementIsVisible(locator);
        await this.page.locator(locator).scrollIntoViewIfNeeded();
        return await this.page.locator(locator).getAttribute(attribute);
    }

    async evaluateJS(jsDOM: any) {
        return await this.page.evaluate(jsDOM);
    }

    async isElementPresent(locator: any) {
        // console.log(typeof locator.toString());
        let type = typeof locator;
        if (type === 'string') {
            await this.page.locator(locator).scrollIntoViewIfNeeded();
            return await this.page.locator(locator).isVisible();
        } else if (type === 'object') {
            return await locator.isVisible();
        }

        console.log(type);
        console.log(type.toString());
    }

    async isElementEnabled(locator: any) {
        await this.page.locator(locator).scrollIntoViewIfNeeded();
        return await this.page.locator(locator).isEnabled();
    }

    async waitTillElementIsVisible(elementSelector: any, waitTime = 60000) {
        await this.page.waitForSelector(elementSelector, {
            waitFor: 'visible',
            timeout: waitTime,
        });
    }

    async getInputBoxValue(locator: any) {
        await this.waitTillElementIsVisible(locator);
        await this.page.locator(locator).scrollIntoViewIfNeeded();
        return await this.page.inputValue();
    }

    // async closeCertificationPopup() {
    //     await this.page.waitForTimeout(5000);
    //     robot.moveMouse(400, 20);
    //     robot.keyTap("enter");
    // }

    async downloadAFile(downloadButton: String, filePath: string) {
        const downloadPromise = this.page.waitForEvent('download');
        await this.clickonWebElement(downloadButton);
        const download = await downloadPromise;
        // Wait for the download process to complete
        console.log('download', await download.path());
        await download.saveAs(filePath);
    }

    async uploadAFile(uploadButton: String, uploadFilePath: String) {
        const fileChooserPromise = this.page.waitForEvent('filechooser');
        await this.clickonWebElement(uploadButton);
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(uploadFilePath);
    }

    async getElementRefByRole(roleType: string, roleName: string) {
        return this.page.getByRole(roleType, { name: roleName });
    }

    async getElementLocatorByText(text: string) {
        return this.page.getByText(text, { exact: true });
    }
}

import { UIHelper } from '../../../src/helpers/ui-helpers'

export class BasePage extends UIHelper {

    async navigateToUrl() {
    await this.page.goto(process.env.url);
    } 

// Function to generate random string
 generateRandomString(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  
  // Function to generate random employee id
   generateRandomEmployeeId(): string {
    return Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  }
 
}
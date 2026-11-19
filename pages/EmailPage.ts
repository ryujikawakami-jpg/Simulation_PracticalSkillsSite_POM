import { Page, Locator } from '@playwright/test';

export class EmailPage{
    readonly page                   : Page;
    readonly navEmail               : Locator;
    readonly emailCurrent           : Locator;
    readonly emailNew               : Locator;
    readonly emailConfirm           : Locator;
    readonly emailPassword          : Locator;
    readonly emailNewError          : Locator;
    readonly emailConfirmError      : Locator;
    readonly emailPasswordError     : Locator;
    readonly emailPasswordWrong     : Locator;
    readonly saveEmailBtn           : Locator;
    readonly cancelEmailBtn         : Locator;

    constructor( page : Page ) {
        this.page = page;
        this.navEmail = page.getByTestId('nav-email');
        this.emailCurrent = page.getByTestId('email-current');
        this.emailNew = page.getByTestId('email-new');
        this.emailConfirm = page.getByTestId('email-confirm');
        this.emailPassword = page.getByTestId('email-password');
        this.emailNewError = page.locator('#email-new-error');
        this.emailConfirmError = page.locator('#email-confirm-error')
        this.emailPasswordError = page.locator('#email-password-error');
        this.emailPasswordWrong = page.locator('#email-password-wrong');
        this.saveEmailBtn = page.getByTestId('save-email-btn');
        this.cancelEmailBtn = page.getByTestId('cancel-email-btn');
    }

    async navigate(){
        await this.navEmail.click();
    }

    async emailnew(email: string){
        await this.emailNew.fill(email);
    }

    async emailconfirm(email: string){
        await this.emailConfirm.fill(email);
    }

    async emailpassword(password: string){
        await this.emailPassword.fill(password);
    }

    async saveemail(){
        await this.saveEmailBtn.click();
    }

    async cancelemail(){
        await this.cancelEmailBtn.click();
    }
}

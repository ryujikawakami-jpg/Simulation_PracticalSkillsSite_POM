import { Page, Locator } from '@playwright/test';

export class DisplayPage {
    readonly page: Page;
    readonly navDisplay:        Locator;
    readonly displayDarkmode:   Locator;
    readonly displayCompact:    Locator;
    readonly displayCover:      Locator;
    readonly displayRating:     Locator;
    readonly displayAnimation:  Locator;
    readonly saveDisplayBtn:    Locator;
    readonly resetDisplayBtn:   Locator;


    constructor(page:Page){
        this.page = page;
        this.navDisplay = page.getByTestId('nav-display');
        this.displayDarkmode = page.locator('label:has([data-testid="display-darkmode"])');
        this.displayCompact = page.locator('label:has([data-testid="display-compact"])');
        this.displayCover = page.locator('label:has([data-testid="display-cover"])');
        this.displayRating = page.locator('label:has([data-testid="display-rating"])');
        this.displayAnimation = page.locator('label:has([data-testid="display-animation"])');
        this.saveDisplayBtn = page.getByTestId('save-display-btn');
        this.resetDisplayBtn = page.getByTestId('reset-display-btn');
    }

    async navigate() {
        await this.navDisplay.click();
    }

    async darkmode(on: boolean) {
        await this.displayDarkmode.setChecked(on);
    }

    async compact(on: boolean) {
        await this.displayCompact.setChecked(on);
    }

    async cover(on: boolean) {
        await this.displayCover.setChecked(on);
    }
    
    async rating(on: boolean){
        await this.displayRating.setChecked(on);
    }

    async animation(on: boolean){
        await this.displayAnimation.setChecked(on);
    }

    async save(){
        await this.saveDisplayBtn.click();
    }

    async reset(){
        await this.resetDisplayBtn.click();
    }
}

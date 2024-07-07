import { bug } from "../bug";

describe('скриншоты', () => {

    it('главная страница', async ({browser}) => {
        await browser.url('/hw/store' + bug);

        const body = await browser.$('body');
        await body.assertView('plain', {ignoreDiffPixelCount: '2%'});
    })

    it('страница каталога по умолчанию', async ({browser}) => {
        await browser.url('/hw/store/catalog' + bug);

        const body = await browser.$('body');
        await body.assertView('plain', {ignoreDiffPixelCount: '2%'});
    })

    it('страница продукта', async ({browser}) => {
        await browser.url('/hw/store/catalog/0' + bug);
        
        const body = await browser.$('body');
        await body.assertView('plain', {ignoreDiffPixelCount: '2%'});
    })
       
    it('страница доставки', async ({browser}) => {
        await browser.url('/hw/store/delivery' + bug);

        const body = await browser.$('body');
        await body.assertView('plain', {ignoreDiffPixelCount: '2%'});
    })

    it('страница контактов', async ({browser}) => {
        await browser.url('/hw/store/contacts' + bug);
        
        const body = await browser.$('body');
        await body.assertView('plain', {ignoreDiffPixelCount: '2%'});
    })

    it('страница пустой корзины', async ({browser}) => {
        await browser.url('/hw/store/cart' + bug);
        const body = await browser.$('body');

        await body.assertView('plain', {ignoreDiffPixelCount: '3%'});
    })

    it('страница непустой корзины', async ({browser}) => {
        await browser.url('/hw/store/catalog/0' + bug);
        const addButton = await browser.$('.ProductDetails-AddToCart');
        await addButton.click();

        await browser.url('/hw/store/cart' + bug);
        const body = await browser.$('body');

        await body.assertView('plain', {ignoreDiffPixelCount: '2%'});
    })

    it('сообщение о покупке', async ({browser}) => {
        await browser.url('/hw/store/catalog/0' + bug);
        const addButton = await browser.$('.ProductDetails-AddToCart');
        await addButton.click();

        await browser.url('/hw/store/cart' + bug);
        const form = await browser.$('.Form');
        const inputName = await form.$('#f-name');
        const inputPhone = await form.$('#f-phone');
        const inputAddress = await form.$('#f-address');
        const sendButton = await form.$('.Form-Submit');

        await inputName.setValue('name');
        await inputPhone.setValue('89999999999');
        await inputAddress.setValue('address');
        await sendButton.click();
        
        const body = await browser.$('body');
        await body.assertView('plain', {ignoreDiffPixelCount: '2%'});
    })
})
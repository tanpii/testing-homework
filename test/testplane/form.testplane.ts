import { bug } from "../bug";

describe('форма оформления', () => {
     it('после нажатия на кнопку появляется сообщение об отправке', async ({browser}) => {
        await browser.url('/hw/store/catalog/0' + bug);
        const addButton = await browser.$('.ProductDetails-AddToCart');

        await addButton.click();
        await browser.url('/hw/store/cart' + bug);
        
        const inputName = await browser.$('#f-name');
        const inputPhone = await browser.$('#f-phone');
        const inputAddress = await browser.$('#f-address');

        await inputName.setValue('tanya');
        await inputPhone.setValue('89999999999');
        await inputAddress.setValue('address');

        const sendButton = await browser.$('.Form-Submit');
        await sendButton.click();

        const message = await browser.$('.Cart-SuccessMessage.alert-success');
        const messageId = await browser.$('.Cart-Number');
        const messageIdText = await messageId.getText();

        expect(message).toExist();
        expect(messageIdText).toEqual("1");

     })
})
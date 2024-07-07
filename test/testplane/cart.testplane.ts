import { bug } from "../bug";

describe('страница корзины', () => {
  it('содержимое корзины сохраняется между перезагрузками страницы', async ({browser}) => {
      await browser.url('/hw/store/catalog/0' + bug);
      const addButton = await browser.$('.ProductDetails-AddToCart');
      await addButton.click();

      // перезагружаем страницу
      await browser.url('/hw/store/cart' + bug);
      await browser.url('/hw/store/cart' + bug);

      const cartTable = await browser.$('.Cart-Table');
      expect(cartTable).toExist();
  })
})
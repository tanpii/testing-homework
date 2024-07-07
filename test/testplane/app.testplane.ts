import { bug } from "../bug";

describe('всё приложение', () => {
  it('на ширине меньше 576px навигационное меню скрывается за "гамбургер"', async ({browser}) => {
    await browser.url('/hw/store' + bug);

    await browser.setWindowSize(575, 575);

    const toggler = await browser.$('.Application-Toggler.navbar-toggler');
    const menu = await browser.$('.Application-Menu.collapse');

    const togglerDisplay = await toggler.getCSSProperty('display');
    const menuDisplay = await menu.getCSSProperty('display');

    expect(togglerDisplay.value).toEqual('block');
    expect(menuDisplay.value).toEqual('none');
  })

  it('при нажатии на "гамбургер" открывается меню', async ({browser}) => {
      await browser.url('/hw/store' + bug);
      await browser.setWindowSize(575, 575);

      const toggler = await browser.$('.Application-Toggler.navbar-toggler');
      await toggler.click()

      const menu = await browser.$('.Application-Menu');
      const menuDisplay = await menu.getCSSProperty('display');

      expect(menuDisplay.value).toEqual('block');
  })

  it('при выборе элемента из меню "гамбургера" меню закрывается', async ({browser}) => {
      await browser.url('/hw/store' + bug);
      await browser.setWindowSize(575, 575);

      const toggler = await browser.$('.Application-Toggler.navbar-toggler');
      await toggler.click();

      const catalog = await browser.$('[href="/hw/store/catalog"]');
      await catalog.click();
      
      const menu = await browser.$('.Application-Menu.navbar-collapse');
      const menuDisplay = await menu.getCSSProperty('display');

      expect(menuDisplay.value).toEqual('none');
  })
})
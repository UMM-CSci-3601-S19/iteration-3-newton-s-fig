import {browser, element, by, promise, ElementFinder} from 'protractor';
import {Key} from 'selenium-webdriver';

export class LoginPage {
  navigateTo(): promise.Promise<any> {
    return browser.get('/login');
  }

  // http://www.assertselenium.com/protractor/highlight-elements-during-your-protractor-test-run/
  highlightElement(byObject) {
    function setStyle(element, style) {
      const previous = element.getAttribute('style');
      element.setAttribute('style', style);
      setTimeout(() => {
        element.setAttribute('style', previous);
      }, 200);
      return 'highlighted';
    }

    return browser.executeScript(setStyle, element(byObject).getWebElement(), 'color: red; background-color: yellow;');
  }


  typeAnEmail(email: string) {
    const input = element(by.id('EmailField'));
    input.click();
    input.sendKeys(email);
  }


  backspace() {
    browser.actions().sendKeys(Key.BACK_SPACE).perform();
  }


  elementExistsWithId(idOfElement: string): promise.Promise<boolean> {
    if (element(by.id(idOfElement)).isPresent()) {
      this.highlightElement(by.id(idOfElement));
    }
    return element(by.id(idOfElement)).isPresent();
  }

  elementExistsWithCss(cssOfElement: string): promise.Promise<boolean> {
    return element(by.css(cssOfElement)).isPresent();
  }

  login(){
    this.click("loginButton");
  }

  signup(){
    this.click("signupButton");
  }

  click(idOfButton: string): promise.Promise<void> {
    this.highlightElement(by.id(idOfButton));
    return element(by.id(idOfButton)).click();
  }

  emailField() {
    return element(by.id("EmailField"));
  }

  button(idOfButton: string) {
    this.highlightElement(by.id(idOfButton));
    return element(by.id(idOfButton));
  }

  getTextFromEmailField() {
    this.highlightElement(by.id("EmailField"));
    return element(by.id("EmailField")).getText();
  }

}

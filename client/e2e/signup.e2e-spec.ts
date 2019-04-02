import {LoginPage} from './login.po';
import {browser, protractor, element, by} from 'protractor';
import {Key} from 'selenium-webdriver';
import {SignupPage} from "./signup.po";

// This line (combined with the function that follows) is here for us
// to be able to see what happens (part of slowing things down)
// https://hassantariqblog.wordpress.com/2015/11/09/reduce-speed-of-angular-e2e-protractor-tests/

const origFn = browser.driver.controlFlow().execute;

browser.driver.controlFlow().execute = function () {
  let args = arguments;

  // queue 100ms wait between test
  // This delay is only put here so that you can watch the browser do its thing.
  // If you're tired of it taking long you can remove this call or change the delay
  // to something smaller (even 0).
  origFn.call(browser.driver.controlFlow(), () => {
    return protractor.promise.delayed(2);
  });

  return origFn.apply(browser.driver.controlFlow(), args);
};


describe('signup page', () => {
  let page: SignupPage;

  beforeEach(() => {
    page = new SignupPage();
    browser.executeScript('window.localStorage.clear();');
    page.navigateTo();
  });


  it("should signup when a new email is given",()=>{
    page.navigateTo();
    page.typeAnEmail("nonexistingemail@email.io");
    page.typeName("New Person");
    expect(page.elementExistsWithClass("signup")).toBeTruthy("We should be on signup page");
    page.signup();

    expect(page.elementExistsWithClass("signup")).toBeFalsy("We shouldn't be on signup page");
    expect(page.elementExistsWithClass("route")).toBeTruthy("We should be on rides page");
  });

  it("shouldn't signup when given a existing email",()=>{
    page.navigateTo();
    page.typeAnEmail("lakeishavaughan@email.io");
    page.typeName("Lakeisha Vaughan");
    expect(page.elementExistsWithClass("signup")).toBeTruthy("We should be on signup page");
    page.signup();

    var EC = protractor.ExpectedConditions;
// Waits for an alert pops up.
    browser.wait(EC.alertIsPresent(), 2000);
    var popupAlert = browser.switchTo().alert();
    var alertText = popupAlert.getText();
    expect(alertText).toMatch('The entered email is already taken.');

    // Close alert
    popupAlert.dismiss();

    expect(page.elementExistsWithClass("signup")).toBeTruthy("We should still be on signup page");
    expect(page.elementExistsWithClass("route")).toBeFalsy("We shouldn't be on rides page");
  });

  it("alert should popup if already logged in",()=>{
    page.navigateTo();
    browser.executeScript("localStorage.user=\'{\"_id\":{\"$oid\":\"5c8182212f608130b228e558\"},\"name\":\"Sofia Sharp\",\"vehicle\":\"5c81820b80f223f8a09a54da\",\"phone\":\"(875) 571-3867\",\"email\":\"sofiasharp@email.co.uk\"}\';");

    page.typeAnEmail("lakeishavaughan@email.io");
    page.typeName("Lakeisha Vaughan");
    page.signup();

    var EC = protractor.ExpectedConditions;
// Waits for an alert pops up.
    browser.wait(EC.alertIsPresent(), 2000);
    var popupAlert = browser.switchTo().alert();
    var alertText = popupAlert.getText();
    expect(alertText).toMatch('You are already logged in.');

    // Close alert
    popupAlert.dismiss();

    expect(page.elementExistsWithClass("signup")).toBeTruthy("We should still be on signup page");
    expect(page.elementExistsWithClass("route")).toBeFalsy("We shouldn't be on rides page");
  });


});

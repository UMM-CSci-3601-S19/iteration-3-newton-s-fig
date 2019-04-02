import {RidesPage} from './filter.po';
import {browser, protractor, element, by} from 'protractor';
import {Key} from 'selenium-webdriver';

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
    return protractor.promise.delayed(20);
  });

  return origFn.apply(browser.driver.controlFlow(), args);
};


describe('rides page', () => {
  let page: RidesPage;

  beforeEach(() => {
    page = new RidesPage();
    browser.executeScript("localStorage.user=\'{\"_id\":{\"$oid\":\"5c8182212f608130b228e558\"},\"name\":\"Sofia Sharp\"" +
      ",\"vehicle\":\"5c81820b80f223f8a09a54da\",\"phone\":\"(875) 571-3867\",\"email\":\"sofiasharp@email.co.uk\"}\';");
    page.navigateTo();
  });

  it("shouldn't find a date when given a date to filter by sooner than 3 hours before the current time," +
     "but should still find the dates in the 'unfilteredRides' div",()=>{
    page.navigateTo();
    page.click("filter");
    page.pickAFilter("4/1/2019");
    page.filter();
    expect(page.elementExistsWithClass("unfilteredRides")).toBeTruthy("There should be some rides" +
                                                                      "in the unfilteredRides div");
    expect(page.elementExistsWithClass("rides")).toBeFalsy("There should be no rides in the rides div");
  });

});

const puppeteer = require('puppeteer');
const numClicks = 3; // Number of days away from the current time 

const rand_url = "https://booking.sauder.ubc.ca/";

async function initBrowser() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(rand_url);
    return page;
}

async function addToCart(page) {

    // Run with: 
    // node /Users/alexwu/desktop/RoomRover.js 

    // Click on Group Study Rooms 
    await page.waitForSelector("a[class='btn btn-green']");
    await page.$eval("a[class='btn btn-green']", elem => elem.click());

    // Enter Name 
    await page.waitForSelector("input[id='username']");
    await page.type("input[id='username']", "");

    // Enter Password
    await page.waitForSelector("input[id='password']");
    await page.type("input[id='password']", "");

    // Click Login Button 
    await page.waitForSelector("button[class='ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only btn']");
    await page.click("button[class='ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only btn']");

    for (let i = 0; i < numClicks; i++) {

        // Click on the next day button 
        await page.waitForSelector('a.next[title="Go to day after"][aria-label="Go to day after"]');
        await page.click('a.next[title="Go to day after"][aria-label="Go to day after"]');
    
        // Delay
        await page.waitForTimeout(2000);
    }

    // Click on specific time slot and room number 
    await page.waitForSelector('td.new a[aria-label="Create a new booking"]');
    await page.click('td.new a[aria-label="Create a new booking"]');

    // Input name for the room 
    await page.waitForSelector('input[type="text"][id="name"][name="name"]');
    await page.type('input[type="text"][id="name"][name="name"]', 'weststar');

    // Open the dropdown menu 
    await page.waitForSelector('select[name="end_seconds"]');
    await page.click('select[name="end_seconds"]');

    // Select the two hour option 
    await page.waitForSelector('select[name="end_seconds"] option[value="32400"]');
    await page.select('select[name="end_seconds"]', '32400');

    // Select the save button 
    await page.waitForSelector('input.default_action[name="save_button"]');
    await page.click('input.default_action[name="save_button"]');

    // Wait for a few seconds to see the result (optional)
    await page.waitForTimeout(5000);
    await browser.close();
}

async function checkout() {
    const page = await initBrowser();
    await addToCart(page);
}

checkout(); // Call the checkout function to start the automation

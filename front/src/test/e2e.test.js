const puppeteer = require('puppeteer')


describe("Checking Server",()=>{
    it("Check if server is reachable",async()=>{
        const browser = await puppeteer.launch()
        const page = await browser.newPage();
        await page.goto('http://localhost:8005');
    });

    it("check if server health is ok",async()=>{
        const browser = await puppeteer.launch()
        const page = await browser.newPage();
        await page.goto('http://localhost:8005/health-check');
        if (!(await page.content()).includes('["ok"]'))
            throw 'Health check failed';
    });
});

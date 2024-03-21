/**
 * @jest-environment jsdom
 */

const fs = require("fs")
const domTesting = require('@testing-library/dom')
require('@testing-library/jest-dom')
const userEvent = require('@testing-library/user-event').default

function initDomFromFiles(htmlPath, jsPath){    //taken from code from 2/7 lecture
    const html = fs.readFileSync(htmlPath, 'utf-8')
    document.open()
    document.write(html)
    document.close()
    jest.isolateModules(function(){
        require(jsPath)
    })
}

test("Error is displayed when no data is given", async function(){
    initDomFromFiles(`${__dirname}/../bar/bar.html`, `${__dirname}/../bar/bar.js`)
    const generateChart = require("./chartBuilder.js")

    const title = domTesting.getByLabelText(document, "Chart title")
    const button = domTesting.getByText(document, "Generate chart")
    const spy = jest.spyOn(window, "alert")  

    const user = userEvent.setup()
    await user.type(title, "Test")
    await user.click(button)

    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
})

test("Error is displayed when no title is given", async function(){
    initDomFromFiles(`${__dirname}/../bar/bar.html`, `${__dirname}/../bar/bar.js`)
    const generateChart = require("./chartBuilder.js")

    const x = domTesting.getByLabelText(document, "X label")
    const y = domTesting.getByLabelText(document, "Y label")
    const button = domTesting.getByText(document, "Generate chart")
    const spy = jest.spyOn(window, "alert")  

    const user = userEvent.setup()
    await user.type(x, "X test")
    await user.type(y, "Y test")
    await user.click(button)

    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
})
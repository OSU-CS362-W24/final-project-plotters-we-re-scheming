/**
 * @jest-environment jsdom
 */

require("@testing-library/jest-dom")
const domTesting = require("@testing-library/dom")
const userEvent = require("@testing-library/user-event").default

const fs = require("fs")

function initDomFromFiles(htmlPath, jsPath) {
    const html = fs.readFileSync(htmlPath, 'utf8')
    document.open()
    document.write(html)
    document.close()
    require(jsPath)
}

beforeEach(function() {
    jest.resetModules()
    jest.restoreAllMocks()
})

test("Input is correctly given to function", async function(){
    initDomFromFiles(`${__dirname}/../bar/bar.html`, `${__dirname}/../bar/bar.js`)
    const generateChart = require("./chartBuilder.js")

    jest.mock("../lib/generateChartImg.js")
    const stub = require("../lib/generateChartImg")
    stub.mockImplementation(function() {
        return "http://placekitten.com/480/480"
    })

    const title = domTesting.getByLabelText(document, "Chart title")
    const xval = domTesting.getByLabelText(document, "X")
    const yval = domTesting.getByLabelText(document, "Y")
    const xlabel = domTesting.getByLabelText(document, "X label")
    const ylabel = domTesting.getByLabelText(document, "Y label")
    const button = domTesting.getByText(document, "Generate chart")

    const user = userEvent.setup()
    await user.type(xval, "5")
    await user.type(yval, "10")
    await user.type(title, "Test")
    await user.type(xlabel, "x")
    await user.type(ylabel, "y")
    await user.click(button)

    //["line", {x: 5, y: 10}, "x", "y", ]

    expect(stub).toHaveBeenCalledTimes(1);
    expect(stub.mock.calls[0][1]).toStrictEqual([{"x": "5", "y": "10"}])
    expect(stub.mock.calls[0][2]).toBe("x")
    expect(stub.mock.calls[0][3]).toBe("y")

    stub.mockRestore()
})
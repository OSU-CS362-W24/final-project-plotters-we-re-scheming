/**
* @jest-environment jsdom
*/
const fs = require("fs")

const domTesting = require("@testing-library/dom")
require("@testing-library/jest-dom")

const userEvent = 
require("@testing-library/user-event").default



function initDomFromFiles(htmlPath, jsPath){
    const html = fs.readFileSync(htmlPath, 'utf8')
    document.open()
    document.write(html)
    document.close()
    jest.isolateModules(function(){
        require(jsPath)
    })
}

test("Populates a line chart and tests clear function", async function() {
    initDomFromFiles(`${__dirname}/line.html`,
    `${__dirname}/line.js`)


    const xLabel = domTesting.getByLabelText(document, "X label")
    const yLabel = domTesting.getByLabelText(document, "Y label")

    const user = userEvent.setup()
	await user.type(xLabel, "dogs")
    await user.type(yLabel, "cats")

    const addButton = document.getElementById("add-values-btn");
    await userEvent.click(addButton);
    await userEvent.click(addButton);
    await userEvent.click(addButton);
    await userEvent.click(addButton);

    const xLabels = document.getElementsByClassName("x-value");
    expect(xLabels.length).toBe(5);

    const clearButton = document.getElementById("clear-chart-btn");
    await userEvent.click(clearButton);

    const xLabels2 = document.getElementsByClassName("x-value");
    expect(xLabels2.length).toBe(1);
})
/**
 * @jest-environment jsdom
 */

const fs = require("fs")


// import jest dom testing library

require("@testing-library/jest-dom")
const domTesting = require("@testing-library/dom")
const userEvent = require("@testing-library/user-event").default


// create the dom to mimic the page
function initDomFromFiles(htmlPath, jsPath) {
    const html = fs.readFileSync(htmlPath, 'utf8')
    document.open()
    document.write(html)
    document.close()
	console.log(jsPath)
	jest.isolateModules(function() {
		require(jsPath)
	})
}

// count initial fields
test("verify there is only one field for each value to start", async function () {

    // initialize the html and js necessary
    initDomFromFiles(
        __dirname + "/line/line.html",
        __dirname + "/line/line.js"
    )
    
    // grab the value input fields
    const xInput = domTesting.getAllByLabelText(document, "X")
    const yInput = domTesting.getAllByLabelText(document, "Y")

    // should only be one of each item to begin
    expect(xInput).toHaveLength(1)
    expect(yInput).toHaveLength(1)
})

// add a new field
test('clicking button to add values creates second pair of values', async function () {

    const user = userEvent.setup()
    
    // multiple buttons on the page, so add a test id to grab the correct button
    const addInput = domTesting.getByTestId(document, 'add-values-1')

    // click the button to add a new value pair
    await user.click(addInput)
    
    const xInput = domTesting.getAllByLabelText(document, "X")
    const yInput = domTesting.getAllByLabelText(document, "Y")
    
    // expect the original pair and the newly added pair
    expect(xInput).toHaveLength(2)
    expect(yInput).toHaveLength(2)
})

// checking other fields
test('clicking button does not add values in any input fields', async function () {
    
    // we will be checking before and after, so save as variables to allow updates after button click
    var chartTitle = domTesting.getByLabelText(document, "Chart title")

    var xLabel = domTesting.getByLabelText(document, "X label")
    var yLabel = domTesting.getByLabelText(document, "Y label")
    
    var xInput = domTesting.getAllByLabelText(document, "X")
    var yInput = domTesting.getAllByLabelText(document, "Y")

    // the document has not refreshed since previous test, so there should be two pairs already present
    // everything should be empty to start
    expect(chartTitle).not.toHaveValue()
    expect(xLabel).not.toHaveValue()
    expect(yLabel).not.toHaveValue()
    expect(xInput[0]).not.toHaveValue()
    expect(yInput[0]).not.toHaveValue()
    expect(xInput[1]).not.toHaveValue()
    expect(yInput[1]).not.toHaveValue()

    const user = userEvent.setup()
    
    const addInput = domTesting.getByTestId(document, 'add-values-1')

    await user.click(addInput)

    // update our variables with the latest data from the page
    chartTitle = domTesting.getByLabelText(document, "Chart title")

    xLabel = domTesting.getByLabelText(document, "X label")
    yLabel = domTesting.getByLabelText(document, "Y label")
    
    xInput = domTesting.getAllByLabelText(document, "X")
    yInput = domTesting.getAllByLabelText(document, "Y")

    // everything should still be empty
    // only check fields that existed before the click, don't worry about new fields
    expect(chartTitle).not.toHaveValue()
    expect(xLabel).not.toHaveValue()
    expect(yLabel).not.toHaveValue()
    expect(xInput[0]).not.toHaveValue()
    expect(yInput[0]).not.toHaveValue()
    expect(xInput[1]).not.toHaveValue()
    expect(yInput[1]).not.toHaveValue()
})

// checking other fields with values
test('clicking button does not change values in any input fields', async function () {
    
    // checking before and after again
    var chartTitle = domTesting.getByLabelText(document, "Chart title")

    var xLabel = domTesting.getByLabelText(document, "X label")
    var yLabel = domTesting.getByLabelText(document, "Y label")
    
    var xInput = domTesting.getAllByLabelText(document, "X")
    var yInput = domTesting.getAllByLabelText(document, "Y")

    const user = userEvent.setup()

    // once again, document has extra fields from previous clicks
    // type a unique value into each field
    await user.type(chartTitle, "1")
    await user.type(xLabel, "2")
    await user.type(yLabel, "3")
    await user.type(xInput[0], "4")
    await user.type(yInput[0], "5")
    await user.type(xInput[1], "6")
    await user.type(yInput[1], "7")
    await user.type(xInput[2], "8")
    await user.type(yInput[2], "9")

    // check the value in each field before click
    expect(chartTitle).toHaveValue("1")
    expect(xLabel).toHaveValue("2")
    expect(yLabel).toHaveValue("3")

    //xy inputs update on change, values are immediately treated as numbers, not string
    expect(xInput[0]).toHaveValue(4)
    expect(yInput[0]).toHaveValue(5)
    expect(xInput[1]).toHaveValue(6)
    expect(yInput[1]).toHaveValue(7)
    expect(xInput[2]).toHaveValue(8)
    expect(yInput[2]).toHaveValue(9)
    
    const addInput = domTesting.getByTestId(document, 'add-values-1')

    await user.click(addInput)
    
    // update after click
    chartTitle = domTesting.getByLabelText(document, "Chart title")

    xLabel = domTesting.getByLabelText(document, "X label")
    yLabel = domTesting.getByLabelText(document, "Y label")
    
    xInput = domTesting.getAllByLabelText(document, "X")
    yInput = domTesting.getAllByLabelText(document, "Y")

    // expect all values to be the same as before, don't check new fields
    expect(chartTitle).toHaveValue("1")
    expect(xLabel).toHaveValue("2")
    expect(yLabel).toHaveValue("3")
    expect(xInput[0]).toHaveValue(4)
    expect(yInput[0]).toHaveValue(5)
    expect(xInput[1]).toHaveValue(6)
    expect(yInput[1]).toHaveValue(7)
    expect(xInput[2]).toHaveValue(8)
    expect(yInput[2]).toHaveValue(9)
})
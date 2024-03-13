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

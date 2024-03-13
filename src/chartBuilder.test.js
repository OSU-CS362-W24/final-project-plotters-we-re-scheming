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
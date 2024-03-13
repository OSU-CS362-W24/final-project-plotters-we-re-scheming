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
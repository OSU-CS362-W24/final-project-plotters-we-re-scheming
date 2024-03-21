// Unit Tests for GenerateChartImg.js using jest/jsdom

/**
* @jest-environment jsdom
*/
//might need stub for integration tests 


const generateChartImg = require("./generateChartImg")

test('Calls generateChartImg Function and checks whether the response format is correct', async function(){
    const type = "line"
    const data = "[{ x: 1 y: 1 },{ x: 2 y: 2 },{ x: 3 y: 3 }]"
    const xLabel = "X-axis"
    const yLabel = "Y-axis"
    const title = "Chart-Test"
    const color = "#000000"
    const imgUrl = await generateChartImg(type, data, xLabel, yLabel, title, color)
    expect(imgUrl).toMatch(/^blob:/);
  });


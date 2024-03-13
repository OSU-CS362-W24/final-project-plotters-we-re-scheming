/**
 * @jest-environment jsdom
 */


// import functions
const { saveChart, loadAllSavedCharts, loadSavedChart, updateCurrentChartData, loadCurrentChartData }= require('./lib/chartStorage')

// create three distinct charts to test
const chartOne = {
    type: "plot",
    data: "dataOne",
    xLabel: "xLabelOne",
    yLabel: "yLabelOne",
    title: "graphOne",
    color: "red"
}

const chartTwo = {
    type: "scatter",
    data: "dataTwo",
    xLabel: "xLabelTwo",
    yLabel: "yLabelTwo",
    title: "graphTwo",
    color: "blue"
}

const chartThree = {
    type: "bar",
    data: "dataThree",
    xLabel: "xLabelThree",
    yLabel: "yLabelThree",
    title: "plotThree",
    color: "green"
}

// boundary test, ensure loading before saving returns nothing
test('loadAllSavedCharts returns an empty array when no charts have been saved', function () {
    expect(loadAllSavedCharts()).toStrictEqual([])
})
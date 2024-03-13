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

// basic save, cannot load anything until we save something
test('saveChart saves a chart', function () {
    saveChart(chartOne)

    //since we haven't yet tested the "load" function, verify by checking the storage directly
    expect(JSON.parse(window.localStorage.getItem("savedCharts"))).toStrictEqual([chartOne])
})

// returned array should have just one object, since we've only saved one object
test('loadAllSavedCharts loads a chart', function () {
    expect(loadAllSavedCharts()).toStrictEqual([chartOne])
})

// localStorage should be able to hold several of our charts, since that's where we locate them later
// saving new charts should create distinct spots in localStorage for each object we save
test('saveChart saves several charts to localStorage, pushing to end when not given index', function () {
    saveChart(chartTwo)
    saveChart(chartThree)
    expect(JSON.parse(window.localStorage.getItem("savedCharts"))).toStrictEqual([chartOne, chartTwo, chartThree])
})

// should return an array of objects from localStorage
test('loadAllSavedCharts loads several charts', function () {
    expect(loadAllSavedCharts()).toStrictEqual([chartOne, chartTwo, chartThree])
})

// given proper index, return desired chart
test('loadSavedChart loads a specific chart at a given index', function () {
    expect(loadSavedChart(1)).toStrictEqual(chartTwo)
})

// given improper index, return empty
test('loadSavedChart returns an empty object if called on an empty index', function () {
    expect(loadSavedChart(3)).toStrictEqual({})
})
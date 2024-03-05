const sortPoints = require('./sortPoints')

test("Testing input of [{x: 1, y: 3}, {x: 4, y: 9}, {x: 3, y: 10}] to sort to [{x: 1, y: 3},{x: 3, y: 10},{x: 4, y: 9}]", function(){
    points = [
        {x: 1, y: 3}, 
        {x: 4, y: 9}, 
        {x: 3, y: 10},
    ]
    
    expect(sortPoints(points)).toStrictEqual([
        {x: 1, y: 3},
        {x: 3, y: 10}, 
        {x: 4, y: 9}, 
        
    ])
})

test("Testing input of [{x: 1, y: 3}, {x: -4, y: 9}, {x: -20, y: 10}] to sort to [{x: -20, y: 10}, {x: -4, y: 9}, {x: 1, y: 3}]", function(){
    points = [{x: 1, y: 3}, {x: -4, y: 9}, {x: -20, y: 10}]
    
    expect(sortPoints(points)).toStrictEqual([
        {x: -20, y: 10},
        {x: -4, y: 9},
        {x: 1, y: 3}
    ])
})
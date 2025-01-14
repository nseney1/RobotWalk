
/*
    Inputs:
        walkArray: number[]
    Return:
        robotPosition: [ number, number ]
    
    Space O(1): As the input grows, the space used remains constant.
    Time O(n): As the input grows, the time to process grows linearly with the input

    My idea behind this solution and what I noticed is that each walk is related to the walk 2 iterations ago, we need to check the current walk against the related iteration, (index -2).
    The walk should always be greater than the previous related iteration, if it isnt than every subsequent next related iteration(index + 2) needs to less than as well.
    This is because, once that sign flips than if any next subsequent walk is greater than, than it will hit a point it has already crossed.
    robotPoisition is being tracked as (y,x) so I need to flip it on return.
*/

function robotWalk(walkArray: number[]) {
    const hasAxisWalkedFarEnough = [ true, true ]
    const robotPoisition = [ 0, 0 ]

    if (walkArray === undefined) {
            throw new Error("Invalid Input Set")
    }

    for (let i = 0; i < walkArray.length; i++) {
        if (walkArray[i] < 0) {
            throw new Error("Invalid negative number within set")
        }

        const isWalkPositive = i%4 <= 1
        let walk = walkArray[i]

        if (i <= 1) {
            robotPoisition[i] = walk
            continue
        }

        if (hasAxisWalkedFarEnough[i%2 === 1 ? 0 : 1] == false && walkArray[i-2] < walkArray[i]) {
           walk = walkArray[i-2]
           robotPoisition[i%2] = isWalkPositive ? robotPoisition[i%2] + walk
            : robotPoisition[i%2] - walk
            return [ robotPoisition[1], robotPoisition[0] ]
        } else {
            robotPoisition[i%2] = isWalkPositive ? robotPoisition[i%2] + walk
            : robotPoisition[i%2] - walk
            hasAxisWalkedFarEnough[i%2] = walkArray[i-2] < walkArray[i]
        }
    }

    return [ robotPoisition[1], robotPoisition[0] ]
}

const robotPos1 = robotWalk([1,2,4])
console.log(robotPos1)
const robotPos2 = robotWalk([1,2,4,1,5])
console.log(robotPos2)
const robotPos3 = robotWalk([1,2,4,7,2,5])
console.log(robotPos3)
const robotPos4 = robotWalk([1,2,4,7,2,9])
console.log(robotPos4)

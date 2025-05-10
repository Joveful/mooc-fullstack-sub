interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (target: number, days: number[]): Result => {
    const sum = days.reduce((partialSum, d) => partialSum + d, 0)
    const average = sum / days.length
    const trainingDays = days.filter((day) => day > 0).length

    var rating
    if (average <= 1) {
        rating = 1
    } else if (average > 1 && average < 2) {
        rating = 2
    } else {
        rating = 3
    }

    const descriptions = [
        "bad", "good", "excellent"
    ]

    return {
        periodLength: days.length,
        trainingDays: trainingDays,
        success: (average >= target) ? true : false,
        rating: rating,
        ratingDescription: descriptions[rating - 1],
        target: target,
        average: average
    }
}

const target: number = Number(process.argv[2])
const days: number[] = process.argv.slice(3).map(Number)
console.log(calculateExercises(target, days))

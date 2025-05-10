interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (days: number[], target: number): Result => {
    const sum = days.reduce((partialSum, d) => partialSum + d, 0)
    const average = sum / days.length
    const trainingDays = days.filter((day) => day > 0).length

    var rating
    if (average <= 5) {
        rating = 1
    } else if (average > 5 && average < 10) {
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
        success: (rating >= target) ? true : false,
        rating: rating,
        ratingDescription: descriptions[rating - 1],
        target: target,
        average: average
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))

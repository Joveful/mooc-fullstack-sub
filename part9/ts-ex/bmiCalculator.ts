const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / Math.pow(height / 100, 2)
    if (bmi < 16) {
        return "Underweight (Severe thinness)"
    } else if (bmi >= 16 && bmi < 17) {
        return "Underweight (Moderate thinness)"
    } else if (bmi >= 17 && bmi < 18.5) {
        return "Underweight (Mild thinness)"
    } else if (bmi >= 18.5 && bmi < 25) {
        return "Normal range"
    } else if (bmi >= 25 && bmi < 30) {
        return "Overweight (Pre-obese)"
    } else if (bmi >= 30 && bmi < 35) {
        return "Obese (Class I)"
    } else if (bmi >= 35 && bmi < 40) {
        return "Obese (Class II)"
    } else if (bmi >= 40) {
        return "Obese (Class III)"
    } else {
        return "Something went wrong"
    }
}

const height: number = Number(process.argv[2])
const weight: number = Number(process.argv[3])
console.log(calculateBmi(height, weight))

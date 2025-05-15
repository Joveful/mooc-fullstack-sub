import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.get('/hello', (_req, res) => {
    res.send("Hello Full Stack!");
});

app.get('/bmi', (req, res) => {
    const h = Number(req.query.height);
    const w = Number(req.query.weight);
    if (isNaN(h) || isNaN(w)) {
        res.status(400).send({ error: "malformatted parameters" });
    } else {
        const bmi = calculateBmi(h, w);
        res.send({ weight: w, height: h, bmi: bmi });
    }
});

app.post('/exercises', express.json(), (req, res) => {

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;
    console.log(target);

    if (daily_exercises === undefined || target === undefined) {
        res.status(400).send({ "error": "missing parameters" });
    }

    const notANumber = (e: number) => isNaN(e);
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,
     @typescript-eslint/no-unsafe-argument,
     @typescript-eslint/no-unsafe-call
    */
    if (daily_exercises.some(notANumber) || isNaN(target)) {
        res.status(400).send({ "error": "malformatted parameters" });
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(target, daily_exercises);
    res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

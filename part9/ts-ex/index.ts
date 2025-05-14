import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
    const h = Number(req.query.height);
    const w = Number(req.query.weight);
    if (isNaN(h) || isNaN(w)) {
        res.send({ error: "malformatted parameters" });
    } else {
        const bmi = calculateBmi(h, w);
        res.send({ weight: w, height: h, bmi: bmi });
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

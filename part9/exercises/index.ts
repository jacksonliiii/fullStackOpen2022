import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exercisesCalculator";
import { isNumber } from "./utils";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (isNumber(height) && isNumber(weight)) {
    const heightValue = Number(height);
    const weightValue = Number(weight);

    res.json({
      height: heightValue,
      weight: weightValue,
      bmi: calculateBmi(heightValue, weightValue),
    });
  } else {
    res.status(400).send({
      error: "malformatted parameters",
    });
  }
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    res.status(400).send({error: "parameters missing"})
  }

  if (!isNumber(target) || daily_exercises.some(isNaN)) {
    res.status(400).send({error: "malformatted parameters"})
  }

  res.json(calculateExercises(daily_exercises, target))
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

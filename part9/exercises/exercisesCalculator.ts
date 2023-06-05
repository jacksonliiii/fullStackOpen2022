import { isNumber } from "./utils";

interface Values {
  hourArray: number[];
  targetHour: number;
}

const parseArguments = (args: string[]): Values => {
  if (args.length < 2) throw new Error("Not enough arguments");

  const numArr = [];

  for (let i = 3; i < args.length; i++) {
    if (isNumber(args[i])) {
      numArr.push(Number(args[i]));
    } else {
      throw new Error("Provided values were not numbers!");
    }
  }

  return {
    hourArray: numArr,
    targetHour: Number(args[2]),
  };
};

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (dailyHours: number[], target: number): Result => {
  const totalHours = dailyHours.reduce((acc, h) => acc + h, 0);
  const hourAverage = totalHours / dailyHours.length;

  const returnObj = {
    periodLength: dailyHours.length,
    trainingDays: dailyHours.filter((dailyHour) => dailyHour != 0).length,
    success: hourAverage >= target,
    rating: 2,
    ratingDescription: "TBD",
    target,
    average: hourAverage,
  };

  console.log(returnObj);
  return returnObj;
};

try {
  const { hourArray, targetHour } = parseArguments(process.argv);
  calculateExercises(hourArray, targetHour);
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

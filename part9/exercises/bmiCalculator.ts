import { isNumber } from "./utils";

interface Values {
  value1: number;
  value2: number;
}

export const parseArguments = (args: string[]): Values => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (isNumber(args[2]) && isNumber(args[3])) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateBmi = (height: number, weight: number) => {
  const BMI = weight / (height / 100) ** 2;
  let result = "";

  if (BMI < 18.5) {
    result = "Skinny (unhealthy weight)";
  } else if (BMI >= 18.5 && BMI <= 24.9) {
    result = "Normal (healthy weight)";
  } else {
    result = "Fat (unhealthy weight)";
  }

  console.log(result);
  return result;
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  calculateBmi(value1, value2);
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

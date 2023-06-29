import {
  Entry,
  NewEntry,
  NewPatient,
  Gender,
  Diagnosis,
  HealthCheckRating,
  SickLeave,
  Discharge,
  HospitalEntry,
  HealthCheckEntry,
  OccupationalHealthcareEntry
} from "./types";
import { v4 as uuidv4 } from "uuid";

/*
 *----- TYPE PREDICATE ------
 */
const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  const firstRating = 0;
  const lastRating = 3;
  return param >= firstRating || param <= lastRating;
};

const isSickLeave = (param: SickLeave): param is SickLeave => {
  return isDate(param.startDate) && isDate(param.endDate);
};

const isDischarge = (param: Discharge): param is Discharge => {
  return isDate(param.date) && isString(param.criteria);
};

/*
 *----- TYPE PARSING ------
 */
const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }

  return name;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing SSN");
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }

  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }

  return occupation;
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!entries || !Array.isArray(entries)) {
    throw new Error("Incorrect or missing entries");
  }

  return entries as Entry[];
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing description");
  }

  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing specialist");
  }

  return specialist;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || !isDischarge(discharge as Discharge)) {
    throw new Error("Incorrect or missing discharge");
  }

  return discharge as Discharge;
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (!healthCheckRating || isHealthCheckRating(healthCheckRating as number)) {
    throw new Error("Incorrect or missing healthCheckRating");
  }

  return healthCheckRating as HealthCheckRating;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error("Incorrect or missing employerName");
  }

  return employerName;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || !isSickLeave(sickLeave as SickLeave)) {
    throw new Error("Incorrect or missing sickLeave");
  }

  return sickLeave as SickLeave;
};

const parseType = (type: unknown) => {
  if (
    !type ||
    type != "OccupationalHealthcare" ||
    type != "HealthCheck" ||
    type != "Hospital"
  ) {
    throw new Error("Incorrect or missing type");
  }

  return type as "OccupationalHealthcare" | "HealthCheck" | "Hospital";
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object &&
    "entries" in object
  ) {
    const newEntry: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: parseEntries(object.entries),
    };
    return newEntry;
  }

  throw new Error("Incorrect data: field(s) missing");
};

export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "type" in object &&
    "diagnosisCodes" in object
  ) {
    const newEntry = {
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      type: parseType(object.type),
    };

    switch (object.type) {
      case "Hospital":
        if ("discharge" in object) {
          const hospitalEntry: HospitalEntry = {
            ...newEntry,
            discharge: parseDischarge(object.discharge),
            type: "Hospital",
            id: uuidv4()
          }

          return hospitalEntry;
        }
        break;
      case "HealthCheck":
        if ("healthCheckRating" in object) {
          const healthCheckEntry: HealthCheckEntry = {
            ...newEntry,
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
            type: "HealthCheck",
            id: uuidv4()
          };
          return healthCheckEntry;
        }
        break;
      case "OccupationalHealthcare":
        if ("employerName" in object && "sickLeave" in object) {
          const occupationalHealthcareEntry: OccupationalHealthcareEntry = {
            ...newEntry,
            type: "OccupationalHealthcare",
            employerName: parseEmployerName(object.employerName),
            sickLeave: parseSickLeave(object.sickLeave),
            id: uuidv4()
          };
          return occupationalHealthcareEntry;
        }
        break;
      default:
        throw new Error("Incorrect type");
    }
  }

  throw new Error("Incorrect data: field(s) missing");
};

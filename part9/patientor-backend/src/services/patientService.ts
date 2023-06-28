import patients from "../data/patientData";
import { v4 as uuidv4 } from "uuid";

import {
  PatientEntry,
  NewPatientEntry,
  NonSensitivePatientEntry,
} from "../types";

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string): PatientEntry => {
  const found = patients.find((patient) => patient.id === id);
  if (found) {
    return found;
  }
  throw new TypeError();
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuidv4(),
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const patientService = {
  getEntries,
  getNonSensitiveEntries,
  getPatient,
  addPatient,
};

export default patientService;

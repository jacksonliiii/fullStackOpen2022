import patients from "../data/patientData";
import { v4 as uuidv4 } from "uuid";

import {
  Patient,
  NewPatient,
  NonSensitivePatient,
  Entry,
  NewEntry
} from "../types";

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string): Patient => {
  const found = patients.find((patient) => patient.id === id);
  if (found) {
    return found;
  }
  throw new TypeError();
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...entry,
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (entry: NewEntry, id: string): Entry => {
  const newEntry = {
    id: uuidv4(),
    ...entry,
  };

  patients.find(patient => patient.id === id)?.entries.push(newEntry);
  return newEntry;
};

const patientService = {
  getEntries,
  getNonSensitiveEntries,
  getPatient,
  addPatient,
  addEntry
};

export default patientService;

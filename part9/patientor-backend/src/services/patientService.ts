import patients from "../data/patientData";
import { PatientEntry, NonSensitivePatientEntry } from "../types";

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

const patientService = {
  getEntries,
  getNonSensitiveEntries,
};

export default patientService;

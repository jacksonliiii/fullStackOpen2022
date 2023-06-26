import diagnoses from "../data/diagnoseData";
import { DiagnoseEntry } from "../types";

const getEntries = (): DiagnoseEntry[] => {
  return diagnoses;
};

const diagnoseService = {
  getEntries,
};

export default diagnoseService;

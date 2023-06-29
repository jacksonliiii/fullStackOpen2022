import diagnoses from "../data/diagnoseData";
import { Diagnosis } from "../types";

const getEntries = (): Diagnosis[] => {
  return diagnoses;
};

const diagnoseService = {
  getEntries,
};

export default diagnoseService;

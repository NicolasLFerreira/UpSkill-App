import IStudentData from "./IStudentData";

export default interface IStudentDataDisplay extends IStudentData {
    areaOfNeedShow?: string,
    responseShow?: string,
    sacShow?: string
}

export const values = {
    areaOfNeed: ["Learning", "Social", "Emotional and Behaviour", "Communication", "Sensory", "Physical"],
    response: ["Monitoring", "Assessment", "Observing ", "TA Support", "Closed", "Other"],
    sac: ["Yes", "Pending", "New Application", "Roll Over", "No SAC"]
}
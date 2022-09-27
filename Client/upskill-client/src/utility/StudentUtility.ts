import IStudent from "../types/IStudent";
import IStudentDisplay from "../types/IStudentDisplay";

export var emptyStudentObject: IStudent = {
    studentId: 0,
    firstName: "",
    lastName: "",
    yearLevel: "",
    dob: "",
    ethnicity: "",
    tutor: "",
    areaOfNeed: -1,
    diagnosis: "",
    externalAgencies: "",
    response: -1,
    sac: -1,
    notes: "",
    links: "",
    kamarUpdates: "",
    pronoun: "",
    sacInfo: "",
    otherInfo: ""
}

export var defaultStudentObject: IStudent = {
    studentId: 0,
    firstName: "default",
    lastName: "default",
    yearLevel: "default",
    dob: "0000-00-00",
    ethnicity: "default",
    tutor: "default",
    areaOfNeed: 1,
    diagnosis: "default",
    externalAgencies: "default",
    response: 1,
    sac: 1,
    notes: "default",
    links: "default",
    kamarUpdates: "default",
    pronoun: "default",
    sacInfo: "default",
    otherInfo: "default"
}

export interface ISelectOptions {
    areaOfNeed: Array<string>,
    response: Array<string>,
    sac: Array<string>
}

export const selectOptions: ISelectOptions = {
    areaOfNeed: ["Learning", "Social", "Emotional and Behaviour", "Communication", "Sensory", "Physical"],
    response: ["Monitoring", "Assessment", "Observing ", "TA Support", "Closed", "Other"],
    sac: ["Yes", "Pending", "New Application", "Roll Over", "No SAC"]
}

export function createStudent() {
    function getRndInteger(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    const names: Array<string> = ["Nicolas", "Say", "Jason", "Jack", "Steve", "Bob", "John", "Michael", "Jeff", "Jefferson", "Bill", "Robert", "Emma", "Aice", "Rose", "Clara", "Bella", "Daniella", "José"];
    const surnames: Array<string> = ["Stevens", "Smith", "William", "Jones", "Hall", "Batista", "Taylor", "Mason", "Graham", "Ford", "Stewart", "Cooper", "Hyde", "Ferreira", "Perereira", "Santos", "da Silva", "Dupont", "Paulo", "Cabrito Hermano"];
    const ethnicity: Array<string> = ["Latino", "European", "African", "Maori", "Asian"];
    const tutor: Array<string> = ["Kate", "Dusung", "Sally", "Simon", "Soteria", "Milton", "Bassam", ""];
    const pronouns: Array<string> = ["they/them", "she/her", "he/him"];
    const diagnosis: Array<string> = ["ADHD", "Asperger's", "OCD", "PTSD", "Anxiety", "LoL Player", "Eating Disorder", "Depression", "Schizophrenia"];
    const externalAgencies: Array<string> = ["Black Mesa", "Doofenshmirtz Evil Incorporated", "Umbrella", "Flat Earth Society"];

    var object: IStudent = {
        "studentId": 0,
        "firstName": names[getRndInteger(0, names.length)],
        "lastName": surnames[getRndInteger(0, surnames.length)],
        "yearLevel": `${getRndInteger(11, 14)}`,
        "dob": `${getRndInteger(1, 32)}-${getRndInteger(1, 13)}-${getRndInteger(2000, 2011)}`,
        "ethnicity": ethnicity[getRndInteger(0, ethnicity.length)],
        "tutor": tutor[getRndInteger(0, tutor.length)],
        "areaOfNeed": getRndInteger(0, 6),
        "diagnosis": diagnosis[getRndInteger(0, diagnosis.length)],
        "externalAgencies": externalAgencies[getRndInteger(0, externalAgencies.length)],
        "response": getRndInteger(0, 7),
        "sac": getRndInteger(0, 6),
        "notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam convallis lorem in erat malesuada sodales. Vivamus eget gravida quam. Nulla.",
        "links": "https://google.com",
        "kamarUpdates": "string example",
        "pronoun": pronouns[getRndInteger(0, pronouns.length)],
        "sacInfo": "string example",
        "otherInfo": "string example"
    }

    return object;
}
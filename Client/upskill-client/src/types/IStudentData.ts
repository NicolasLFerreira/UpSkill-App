/**Data fields for the students. */
export default interface IStudentData {
    studentId?: number,
    firstName: string,
    lastName: string,
    yearLevel: string,
    dob: string,
    ethnicity: string,
    tutor: string,
    areaOfNeed: number, // 5 options
    diagnosis: string,
    externalAgencies: string,
    response: number, // 6 options
    sac: number, // 5 options
    notes: string,
    links: string,
    kamarUpdates: string,
    pronoun: string,
    sacInfo: string,
    otherInfo: string
}

export var emptyStudentObject: IStudentData = {
    studentId: 0,
    firstName: "",
    lastName: "",
    yearLevel: "",
    dob: "",
    ethnicity: "",
    tutor: "",
    areaOfNeed: 0,
    diagnosis: "",
    externalAgencies: "",
    response: 0,
    sac: 0,
    notes: "",
    links: "",
    kamarUpdates: "",
    pronoun: "",
    sacInfo: "",
    otherInfo: ""
}

export var defaultStudentObject: IStudentData = {
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

    var object: IStudentData = {
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

// Add enums for areaOfNeed, response, and sac.

 // var object: IStudentData = {
        //     studentId: 0,
        //     firstName: "Guts",
        //     lastName: "Black Swordsman",
        //     yearLevel: "69",
        //     dob: "n/a",
        //     ethnicity: "Midlander",
        //     tutor: "Gambino",
        //     areaOfNeed: 3,
        //     diagnosis: "Severe PTSD, anger management issues",
        //     externalAgencies: "The God Hand",
        //     response: 2,
        //     sac: 1,
        //     notes: "Carries a big sword, too big to be called a sword actually, more like a hunk of iron.",
        //     links: "https://readberserk.com/",
        //     kamarUpdates: "example",
        //     pronoun: "kill/demons",
        //     sacInfo: "Test",
        //     otherInfo: "Carries a big sword."
        // }

        // var object: IStudentData = {
        //     "studentId": 0,
        //     "firstName": "string",
        //     "lastName": "string",
        //     "yearLevel": "string",
        //     "dob": "string",
        //     "ethnicity": "string",
        //     "tutor": "string",
        //     "areaOfNeed": 0,
        //     "diagnosis": "string",
        //     "externalAgencies": "string",
        //     "response": 0,
        //     "sac": 0,
        //     "notes": "string",
        //     "links": "string",
        //     "kamarUpdates": "string",
        //     "pronoun": "string",
        //     "sacInfo": "string",
        //     "otherInfo": "string"
        //   }
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

export interface IStudentDataDisplay extends IStudentData {
    areaOfNeedShow?: string,
    responseShow?: string,
    sacShow?: string
}

export var defaultStudentObject: IStudentData = {
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
};

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
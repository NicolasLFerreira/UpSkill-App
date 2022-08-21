import axios from "axios";

var url: string = "https://localhost:7156/api";

export default axios.create({
    baseURL: url,
    headers: {
        "Content-Type": "application/json"
    }
});
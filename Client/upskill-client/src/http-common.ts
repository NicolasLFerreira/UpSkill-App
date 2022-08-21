import axios from "axios";

export default axios.create({
    baseURL: "https://localhost:7156/api",
    headers: {
        "Content-Type": "application/json"
    }
});
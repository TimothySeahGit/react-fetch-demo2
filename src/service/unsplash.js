import axios from "axios";

export default axios.create({
  baseURL: "http://canine-criminologist.herokuapp.com",
  headers: {
    Authorization: `Client-ID ${process.env.REACT_APP_API_KEY}`
  }
});

import axios from "axios";

const API_URL = "/api/goals/";

//Register user
const getGoals = async (userData) => {
    console.log(userData.token);
    const config = {
        headers: { Authorization : `Bearer ${userData.token}` }
    };

    const response = await axios.get(API_URL,config);
    console.log("getting goals");
    if (response.data) {
      localStorage.setItem("goals", JSON.stringify(response.data));
    }
    return response.data;
  };

//set goal
const setGoal = async (goalData,token) => {
    
    const config = {
        headers: { Authorization : `Bearer ${token}` }
    };

    const response = await axios.post(API_URL,goalData,config);

    return response.data;
  };
//Register user
const updateGoal = async (userData) => {
    console.log(userData.token);
    const config = {
        headers: { Authorization : `Bearer ${userData.token}` }
    };

    const response = await axios.get(API_URL,config);
    console.log("getting goals");
    if (response.data) {
      localStorage.setItem("goals", JSON.stringify(response.data));
    }
    return response.data;
  };
//Delete goal
const deleteGoal = async (goalData,token) => {
    const config = {
        headers: { Authorization : `Bearer ${token}` }
    };
    const id = goalData;
    const response = await axios.delete(API_URL + id ,config);
    return response.data;
  };



const goalService = {
    getGoals,
    setGoal,
    deleteGoal,
}
export default goalService;
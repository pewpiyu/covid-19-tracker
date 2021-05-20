import axios from "axios";
import CountryPicker from "../components/CountryPicker/CountryPicker";

const url = "https://covid19.mathdro.id/api";

// function Date() {
//   let date = new Date();
//   let month = date.getMonth() + 1;
//   if (month <= 9) {
//     month = "0" + month;
//   }
//   return "[" + date.getFullYear() + "-" + month + "-" + date.getDate() + "]";
// }

export const fetchData = async (country) => {
  let changableUrl = url; 
  if(country){
    changableUrl = `${changableUrl}/countries/${country}`;
  }
  
  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changableUrl);
    return {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
    };
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async () => {
  try{
    const {data} = await axios.get(`${url}/daily`);
    
    const modifiedData = data.map((dailyData) =>({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }))
    return modifiedData;
  }
  catch(error){
    console.log(error);
  }
}

export const fetchCountries = async () => {
  try {
    const {data : {countries}} = await axios.get(`${url}/countries`);

    return countries.map((country) => country.name);
  }
  catch(error){
    console.log(error);
  }
}

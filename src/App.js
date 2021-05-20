import React, { Component } from "react";
import Cards from "./components/Cards/Cards";
import Chart from "./components/Chart/Chart";
import CountryPicker from "./components/CountryPicker/CountryPicker";

import image from "./img/image.png";
import styles from "./App.module.css";
import { fetchData } from "./API/index";

export default class App extends Component {
  state = {
    data: {},
    country:'',
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }

  handleCountryChange = async (country) =>{
    // console.log(country);
    const fetchedData = await fetchData(country);
    this.setState({data:fetchedData, country:country})
  }

  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.container}>
        <img src={image} alt="image" className={styles.image} />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country}/>
      </div>
    );
  }
}

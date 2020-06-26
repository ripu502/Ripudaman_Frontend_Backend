import React from 'react';
import './App.css';

import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import ReactLoading from 'react-loading';


class App extends React.Component {
  state = {
    series:
      [{
        name: "Height",
        data: [90, 80, 70, 60, 49, 40, 30, 31, 0]
      }],
    options:
    {
      chart:
      {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels:
      {
        enabled: false
      },
      stroke:
      {
        curve: 'smooth'
      },
      title:
      {
        text: 'Bouncing ball sketch',
        align: 'left'
      },
      grid:
      {
        row:
        {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      xaxis:
      {
        categories: ["0"],
      }
    },
    bounce: '',
    e: null,
    h: null,
    isloaded: false
  };
  componentDidMount = () => {

    axios.get('https://ball502.herokuapp.com/').then(res => {
      console.log(res.data)
      const heights = res.data.height
      const times = res.data.times
      let tempopt = { ...this.state.options };
      let tempaxis = { ...tempopt.xaxis };
      tempaxis.categories = times;
      tempopt.xaxis = tempaxis;
      let temph = [{
        name: "Height",
        data: heights,
      }];
      this.setState({
        bounce: res.data.bounce,
        series: temph,
        options: tempopt,
        isloaded: true,
        h: res.data.h,
        e: res.data.e * 10
      })
    })
  }
  coefhander = (event) => {
    this.setState({
      isloaded: false
    })
    this.setState({
      e: event.target.value,
    })
    const data = {
      "height": this.state.h,
      "e": this.state.e / 10
    }
    axios.post('https://ball502.herokuapp.com/', data).then(res => {
      console.log(res.data);
      if (res.data.response === 'done') {
        axios.get('https://ball502.herokuapp.com/').then(res => {
          const heights = res.data.height
          const times = res.data.time
          let tempopt = { ...this.state.options };
          let tempaxis = { ...tempopt.xaxis };
          tempaxis.categories = times;
          tempopt.xaxis = tempaxis;
          let temph = [{
            name: "Height",
            data: heights,
          }];
          this.setState({
            bounce: res.data.bounce,
            series: temph,
            options: tempopt,
            isloaded: true
          })
        })
      }
    })
  }
  heighthander = (event) => {
    this.setState({
      isloaded: false
    })
    this.setState({
      h: event.target.value,
    })
    const data = {
      "height": event.target.value,
      "e": this.state.e / 10
    }
    axios.post('https://ball502.herokuapp.com/', data).then(res => {
      if (res.data.response === 'done') {
        axios.get('https://ball502.herokuapp.com/').then(res => {
          const heights = res.data.height
          const times = res.data.time
          let tempopt = { ...this.state.options };
          let tempaxis = { ...tempopt.xaxis };
          tempaxis.categories = times;
          tempopt.xaxis = tempaxis;
          let temph = [{
            name: "Height",
            data: heights,
          }];
          this.setState({
            bounce: res.data.bounce,
            series: temph,
            options: tempopt,
            isloaded: true
          })
        })
      }
    })
  }
  render() {
    let content = null;
    if (this.state.isloaded) {
      content = (<React.Fragment><div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="line" height={350} />
      </div>
        <p>No. of bounces Made by the ball is: <b>{this.state.bounce} times </b></p>
      </React.Fragment>)
    } else {
      content = (<ReactLoading
        type='cubes'
        color='#439CFB'
        height={'30%'}
        width={'20%'} />)
    }
    return (
      <div>
        <h1> Bouncing Ball App
        </h1>
        <hr />
        {content}
        <p>
          change Height of Ball:  < input
            type="Number"
            name="h"
            value={this.state.h}
            onChange={this.heighthander} />
        </p>
        <p>
          Change the value of <b>Coefficient of restitution {this.state.e / 10}</b>: <input
            name="e"
            type="range"
            min="1"
            max="7"
            value={this.state.e}
            onChange={this.coefhander} />
        </p>
        <p>Height of the Ball is: <b>{this.state.h}m </b></p>
      </div >
    )
  }
}

export default App;

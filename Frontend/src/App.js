import React from 'react';
import './App.css';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';


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
    e: 5,
    h: 50,
  };
  componentDidMount = () => {
    axios.get('http://localhost:5000').then(res => {
      let d = res.data.data;
      const heights = d.map((height) => {
        return height.height;
      })
      const times = d.map((time) => {
        return parseFloat(time.time).toFixed(3);
      })
      console.log(times);
      let tempopt = { ...this.state.options };
      let tempaxis = { ...tempopt.xaxis };
      tempaxis.categories = times;
      tempopt.xaxis = tempaxis;
      let temph = [{
        name: "Height",
        data: heights,
      }];
      console.log(tempopt);
      this.setState({
        bounce: res.data.bounce,
        series: temph,
        options: tempopt
      })
      // console.log(heights);
    })
  }
  coefhander = (event) => {
    let te = event.target.value;
    console.log(event.target.name);
    this.setState({
      [event.target.name]: te,
    })
    const data = {
      "height": this.state.h,
      "e": this.state.e/10
    }
    axios.post('http://localhost:5000', data).then(res => {
      console.log(res.data);
      if (res.data.data === 'posted') {
        axios.get('http://localhost:5000').then(res => {
          let d = res.data.data;
          const heights = d.map((height) => {
            return height.height;
          })
          const times = d.map((time) => {
            return parseFloat(time.time).toFixed(3);
          })
          console.log(times);
          let tempopt = { ...this.state.options };
          let tempaxis = { ...tempopt.xaxis };
          tempaxis.categories = times;
          tempopt.xaxis = tempaxis;
          let temph = [{
            name: "Height",
            data: heights,
          }];
          console.log(tempopt);
          this.setState({
            bounce: res.data.bounce,
            series: temph,
            options: tempopt
          })
          // console.log(heights);
        })
      }
    })
  }
  render() {
    return (
      <div>
        <h1> Bouncing Ball App
        </h1>
        <hr />
        <div id="chart">
          <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} />
        </div>
        <p>
          change Height of Ball:  < input type="Number" name = "h" value={this.state.h} onChange={this.coefhander} />
        </p>
        <p>
          Change the value of <b>Coefficient of restitution {this.state.e/10}</b>: <input name = "e" type="range" min="1" max="7" value={this.state.e} onChange={this.coefhander} />
        </p>
        <p>Height of the Ball is: <b>{this.state.h}m </b></p>
        <p>No. of bounces Made by the ball is: <b>{this.state.bounce} times </b></p>
      </div >
    )
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentValue: '',
      expression: '',
      afterAnswer: false
    }
  }

  /*
  handleClick = (event) => {
    if(event.target.value !== "=") {
      this.setState({
        currentValue: this.state.currentValue + event.target.value
      })
    } else {
      //parse this.state.currentValue
      this.setState({
        currentValue: eval(this.state.currentValue)
      })
    }
  } */

  handleClick = (event) => {
    switch(event.target.value) {
      case "+":
      case "-":
      case "*":
      case "/":
        //let curVal = this.state.currentValue + event.target.value
        this.setState({
          expression: this.state.expression + this.state.currentValue + event.target.value,
          currentValue: '',
          //expression: this.state.expression + curVal
        })
        break
      case "=":
        let expr = this.state.expression + this.state.currentValue //+ event.target.value
          console.log('expr: ' + expr)
        this.setState({
          //expression: this.state.expression + this.state.currentValue + event.target.value,
          //currentValue: eval(this.state.expression + this.state.currentValue + event.target.value)
          expression: '',
          currentValue: eval(expr),
          afterAnswer: true
        })
        break
      case "C":
        this.setState({
          currentValue: '',
          expression: ''
        })
        break
      case "BSp":
        this.setState({
          currentValue: this.state.currentValue.substring(0, this.state.currentValue.length - 1)
        })
        break
      // default:
      //   if(this.state.currentValue && this.state.currentValue.length < 17) {
      //     this.setState({
      //       currentValue: this.state.currentValue + event.target.value
      //     })
      //   } else {
      //     this.setState({
      //       currentValue: '' + event.target.value
      //     })
      //   }
      default:
        if (this.state.afterAnswer && this.state.currentValue.length < 17){
          this.setState({
            currentValue: '' + event.target.value,
            afterAnswer: false
          })
        } else if(this.state.currentValue.length < 17){
          this.setState({
            currentValue: this.state.currentValue + event.target.value
          })
        }
    }
  }

  render () {
    return(

        <div className="App">
          <div className="App-header">
            <h1>React Javascript Calculator</h1>
          </div>
          <div className="Calculator">
            <Display
              input={this.state.currentValue}
              />
            <div className="Row">
              <Digit
                  value="M+"
                  handleInput={this.handleClick}/>
              <Digit
                  value="MC"
                  handleInput={this.handleClick}/>
              <Digit
                  value="BSp"
                  handleInput={this.handleClick}/>
              <Digit
                  value="C"
                  handleInput={this.handleClick}/>
            </div>
            <div className="Row">
              <Digit
                  value="7"
                  handleInput={this.handleClick}/>
              <Digit
                  value="8"
                  handleInput={this.handleClick}/>
              <Digit
                  value="9"
                  handleInput={this.handleClick}/>
              <Digit
                  value="+"
                  handleInput={this.handleClick}/>
            </div>
            <div className="Row">
              <Digit
                  value="4"
                  handleInput={this.handleClick}/>
              <Digit
                  value="5"
                  handleInput={this.handleClick}/>
              <Digit
                  value="6"
                  handleInput={this.handleClick}/>
              <Digit
                  value="-"
                  handleInput={this.handleClick}/>
            </div>
            <div className="Row">
              <Digit
                  value="1"
                  handleInput={this.handleClick}/>
              <Digit
                  value="2"
                  handleInput={this.handleClick}/>
              <Digit
                  value="3"
                  handleInput={this.handleClick}/>
              <Digit
                  value="*"
                  handleInput={this.handleClick}/>
            </div>
            <div className="Row">
              <Digit
                  value="."
                  handleInput={this.handleClick}/>
              <Digit
                  value="0"
                  handleInput={this.handleClick}/>
              <Digit
                  value="="
                  handleInput={this.handleClick}/>
              <Digit
                  value="/"
                  handleInput={this.handleClick}/>
            </div>
          </div>
        </div>
    )
  }
}

class Digit extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
        <button className="Digit" value={this.props.value} onClick={this.props.handleInput}>
          {this.props.value}
        </button>
    )
  }
}

class Display extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
        <div className="Display">
          {this.props.input}
        </div>
    )
  }
}

export default App;

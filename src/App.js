import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentValue: '',
      expression: '',
      memory: '',
      afterAnswer: false
    }
  }

  handleClick = (event) => {
    switch(event.target.value) {
      case "+":
      case "-":
      case "*":
      case "/":
        this.setState({
          expression: this.state.expression + this.state.currentValue + event.target.value,
          currentValue: '',
        })
        break
      case "+/-":
        if(this.state.afterAnswer || this.state.currentValue.length === 0) {
          this.setState({
            currentValue: '-',
            afterAnswer: false
          })
        }
        break
      case "M+":
        this.setState({
          memory: this.state.currentValue
        })
        break
      case "MR":
        this.setState({
          currentValue: this.state.memory
        })
        break
      case "MC":
        this.setState({
          memory: ''
        })
        break
      case "x^2":
        this.setState({
          currentValue: this.state.currentValue * this.state.currentValue
        })
        break
      case "Mod":
        this.setState({
          expression: this.state.expression + this.state.currentValue + '%',
          currentValue: '',
        })
        break
      case "=":
        let expr = this.state.expression + this.state.currentValue
          console.log('expr: ' + expr)
        if(expr[expr.length -1] !== '+'
            && expr[expr.length -1] !== '-'
            && expr[expr.length -1] !== '*'
            && expr[expr.length -1] !== '/'
            && expr[expr.length -1] !== '.'
            && expr[expr.length -1] !== '%'
            && expr[expr.length -1] !== null) {
          this.setState({
            expression: '',
            currentValue: eval(expr),
            afterAnswer: true
          })
        }
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
                  className="Function"
                  value="x^2"
                  handleInput={this.handleClick}/>
              <Digit
                  className="Function"
                  value="Mod"
                  handleInput={this.handleClick}/>
              <Digit
                  className="Function"
                  value="BSp"
                  handleInput={this.handleClick}/>
              <Digit
                  className="Clear"
                  value="C"
                  handleInput={this.handleClick}/>
            </div>
            <div className="Row">
              <Digit
                  className="Memory"
                  value="M+"
                  handleInput={this.handleClick}/>
              <Digit
                  className="Memory"
                  value="MR"
                  handleInput={this.handleClick}/>
              <Digit
                  className="Memory"
                  value="MC"
                  handleInput={this.handleClick}/>
              <Digit
                  className="Operator"
                  value="+/-"
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
                  className="Operator"
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
                  className="Operator"
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
                  className="Operator"
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
                  className="Operator"
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
    const classNames = 'Digit ' + this.props.className
    return(
        <button className={classNames} value={this.props.value} onClick={this.props.handleInput}>
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

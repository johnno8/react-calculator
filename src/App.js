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
        if (this.state.afterAnswer){
          if(event.target.value === '+'
              || event.target.value === '-'
              || event.target.value === '*'
              || event.target.value === '/'
              || event.target.value === '%') {
            this.setState({
              expression: this.state.currentValue + event.target.value,
              currentValue: ''
            })
          } else {
            this.setState({
              currentValue: '' + event.target.value,
              afterAnswer: false
            })
          }
        } else if(this.state.currentValue.length < 17){
          this.setState({
            currentValue: this.state.currentValue + event.target.value
          })
        }
    }
  }

  renderDigit(name, val) {
    return (
        <Digit className={name}
               value={val}
               handleInput={this.handleClick}
        />
    )
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
              {this.renderDigit('Function', 'x^2')}
              {this.renderDigit('Function', 'Mod')}
              {this.renderDigit('Function', 'BSp')}
              {this.renderDigit('Clear', 'C')}
            </div>
            <div className="Row">
              {this.renderDigit('Memory', 'M+')}
              {this.renderDigit('Memory', 'MR')}
              {this.renderDigit('Memory', 'MC')}
              {this.renderDigit('Operator', '+/-')}
            </div>
            <div className="Row">
              {this.renderDigit('', '7')}
              {this.renderDigit('', '8')}
              {this.renderDigit('', '9')}
              {this.renderDigit('Operator', '+')}
            </div>
            <div className="Row">
              {this.renderDigit('', '4')}
              {this.renderDigit('', '5')}
              {this.renderDigit('', '6')}
              {this.renderDigit('Operator', '-')}
            </div>
            <div className="Row">
              {this.renderDigit('', '1')}
              {this.renderDigit('', '2')}
              {this.renderDigit('', '3')}
              {this.renderDigit('Operator', '*')}
            </div>
            <div className="Row">
              {this.renderDigit('', '.')}
              {this.renderDigit('', '0')}
              {this.renderDigit('', '=')}
              {this.renderDigit('Operator', '/')}
            </div>
          </div>
        </div>
    )
  }
}

function Digit(props) {
  const classNames = 'Digit ' + props.className
  return(
      <button className={classNames} value={props.value} onClick={props.handleInput}>
        {props.value}
      </button>
  )
}

function Display(props) {
  return(
      <div className="Display">
        {props.input}
      </div>
  )
}
export default App;

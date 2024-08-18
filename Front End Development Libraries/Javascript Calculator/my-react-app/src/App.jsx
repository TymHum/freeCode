import React from "react";


function isNumber(str) {
  return !isNaN(str);
}

function sliceAfterLastOperator(str) {
  const lastOperatorIndex = Math.max(
    str.lastIndexOf('+'),
    str.lastIndexOf('-'),
    str.lastIndexOf('*'),
    str.lastIndexOf('/')
  );

  return str.slice(lastOperatorIndex + 1);
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "0", // Input displayed
      formula: "" // Formula being constructed
    };
    this.clearAll = this.clearAll.bind(this);
    this.resolve = this.resolve.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  clearAll() {
    this.setState({
      input: "0",
      formula: ""
    });
  }

  resolve() {
    try {
      const result = eval(this.state.formula);
      this.setState({
        input: result.toString(),
        formula: result.toString()
      });
    } catch (error) {
      this.setState({
        input: "Error",
        formula: ""
      });
    }
  }

  

  handleClick(btnPressed) {
    if (btnPressed === "C") {
      this.clearAll();
      return;
    }

    if (btnPressed === "=") {
      this.resolve();
      return;
    }

    const { formula, input } = this.state;

    
    if ((formula === "" && ["+", "*", "/", "."].includes(btnPressed)) || (formula === "0" && btnPressed === "0")) {
      return;
    }
    
    if (formula === "" && input === "0" || formula === "0" && input === "0" && btnPressed !== "."){
      this.setState({
        input: btnPressed,
        formula: btnPressed
      })
      return
    }

    if (btnPressed === "." && sliceAfterLastOperator(formula).includes(".")) {
      return;
    }

    console.log(input.slice(-1)[0])
    if(["+", "*", "/"].includes(btnPressed)){
      if(isNumber(input)){
        this.setState((prevState) => ({
          input: btnPressed,
          formula: prevState.formula + btnPressed
        }))
        return;
      }
      else{
        console.log("\n\n","Slice: " + formula.slice(-2), "Input: " + input)
        if(["+", "*", "/"].includes(formula.slice(-2)[0]) && (input === "-" )){
          console.log("Yes")
          this.setState((prevState) => ({ 
            formula: prevState.formula.slice(0, -2) + btnPressed,
            input: btnPressed,
          }
          )); 
        }
        else{
          console.log("no")
          this.setState((prevState) => ({ 
            formula: prevState.formula.slice(0, -1) + btnPressed,
            input: btnPressed,
          }
          )); 
        }
        
        return
      }
    }

    if(btnPressed==="-"){
      if(formula.slice(-1)==="-") return;
      if(isNumber(input)){
        this.setState((prevState) => ({
          input: btnPressed,
          formula: prevState.formula + btnPressed
          
        }))
        return;
      }
      if(["+", "*", "/"].includes(input.slice(-1))){
        this.setState((prevState) => ({
          input: btnPressed,
          formula: prevState.formula + btnPressed
        }))
        return;
      }
    }

    if(["+","-", "*", "/"].includes(input) && !["+","-", "*", "/"].includes(btnPressed)){
      this.setState((prevState) => ({
        input: btnPressed,
        formula: prevState.formula + btnPressed
      }));
      return
    }

    
    this.setState((prevState) => ({
        input: prevState.input + btnPressed,
        formula: prevState.formula + btnPressed
    }))

    
/*
    if (["+", "-", "*", "/", "."].includes(btnPressed) ){
      const lastChar = this.state.formula.slice(-1); 
      if (["+", "-", "*", "/", "."].includes(lastChar)) { 
        this.setState((prevState) => ({ 
          formula: prevState.formula.slice(0, -1) }
        )); 
      } 
    }
    else  if (!["+", "-", "*", "/", "."].includes(btnPressed)) {
      this.setState((prevState) => ({
        input: prevState.input+btnPressed,
      }))
      return
    }
    
    
    this.setState((prevState) => ({
      formula: prevState.formula + btnPressed,
      input: prevState.input + btnPressed,
    }));
    */
  }

  render() {
    return (
      <div id="calculator" className="container">
        <div id="whole-display" className="mb-3">
          <div id="top-display" className="mb-1">{this.state.formula}</div>
          <div id="display" className="mb-3">{this.state.input}</div>
        </div>

        <div className="row mb-2">
          <div className="col-12">
            <button id="clear" className="btn btn-danger btn-custom btn-clear" onClick={() => this.handleClick("C")}>
              C
            </button>
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-3">
            <button id="seven" className="btn btn-light btn-custom" onClick={() => this.handleClick("7")}>7</button>
          </div>
          <div className="col-3">
            <button id="eight" className="btn btn-light btn-custom" onClick={() => this.handleClick("8")}>8</button>
          </div>
          <div className="col-3">
            <button id="nine" className="btn btn-light btn-custom" onClick={() => this.handleClick("9")}>9</button>
          </div>
          <div className="col-3">
            <button id="divide" className="btn btn-warning btn-custom btn-operator" onClick={() => this.handleClick("/")}>
              /
            </button>
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-3">
            <button id="four" className="btn btn-light btn-custom" onClick={() => this.handleClick("4")}>4</button>
          </div>
          <div className="col-3">
            <button id="five" className="btn btn-light btn-custom" onClick={() => this.handleClick("5")}>5</button>
          </div>
          <div className="col-3">
            <button id="six" className="btn btn-light btn-custom" onClick={() => this.handleClick("6")}>6</button>
          </div>
          <div className="col-3">
            <button id="multiply" className="btn btn-warning btn-custom btn-operator" onClick={() => this.handleClick("*")}>
              *
            </button>
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-3">
            <button id="one" className="btn btn-light btn-custom" onClick={() => this.handleClick("1")}>1</button>
          </div>
          <div className="col-3">
            <button id="two" className="btn btn-light btn-custom" onClick={() => this.handleClick("2")}>2</button>
          </div>
          <div className="col-3">
            <button id="three" className="btn btn-light btn-custom" onClick={() => this.handleClick("3")}>3</button>
          </div>
          <div className="col-3">
            <button id="subtract" className="btn btn-warning btn-custom btn-operator" onClick={() => this.handleClick("-")}>
              -
            </button>
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-3">
            <button id="zero" className="btn btn-light btn-custom" onClick={() => this.handleClick("0")}>0</button>
          </div>
          <div className="col-3">
            <button id="decimal" className="btn btn-light btn-custom" onClick={() => this.handleClick(".")}>.</button>
          </div>
          <div className="col-3">
            <button id="equals" className="btn btn-success btn-custom btn-equals" onClick={() => this.handleClick("=")}>
              =
            </button>
          </div>
          <div className="col-3">
            <button id="add" className="btn btn-warning btn-custom btn-operator" onClick={() => this.handleClick("+")}>
              +
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

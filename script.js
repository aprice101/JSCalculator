const number = [
  { id: "zero", value: "0", type: "number" },
  { id: "one", value: "1", type: "number" },
  { id: "two", value: "2", type: "number" },
  { id: "three", value: "3", type: "number" },
  { id: "four", value: "4", type: "number" },
  { id: "five", value: "5", type: "number" },
  { id: "six", value: "6", type: "number" },
  { id: "seven", value: "7", type: "number" },
  { id: "eight", value: "8", type: "number" },
  { id: "nine", value: "9", type: "number" },
  { id: "decimal", value: ".", type: "decimal" }
];
const operator = [
  { id: "add", value: "+", type: "operator" },
  { id: "subtract", value: "-", type: "operator1" },
  { id: "multiply", value: "*", type: "operator" },
  { id: "divide", value: "/", type: "operator" }
];

const clearbtn = [{ id: "clear", value: "C", type: "clear" }];

const equalbtn = [{ id: "equals", value: "=", type: "equals" }];

class NumButtons extends React.Component {
  handleClick = () => {
    this.props.handleDisplay(this.props.value, this.props.type);
  };

  render() {
    return (
      <div
        className="calc-buttons"
        id={this.props.id}
        onClick={this.handleClick}
      >
        <p>{this.props.value}</p>
      </div>
    );
  }
}
class OpButtons extends React.Component {
  handleClick = () => {
    this.props.handleDisplay(this.props.value, this.props.type);
  };

  render() {
    return (
      <div
        className="calc-buttons"
        id={this.props.id}
        onClick={this.handleClick}
      >
        <p>{this.props.value}</p>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "0"
    };
    this.clearDisplay = this.clearDisplay.bind(this);
    this.evalDisplay = this.evalDisplay.bind(this);
  }

  handleDisplay = (value, type) => {
    let str = this.state.display;
    console.log(str);
    let regex = /[-+//*]+$/;
    let regex2 = /[-]$/;
    let regex3 = /[^.]$/;
    let regex4 = /[.][0-9]+.$/;
    if (this.state.display == "0" && type == "number") {
      this.setState({ display: value });
    } else if (type == "decimal" && regex3.test(str)) {
      let newfloat = str.concat(".");
      if (!regex4.test(newfloat)) {
        this.setState({ display: newfloat });
      }
    } else if (type == "number") {
      this.setState({ display: this.state.display.concat(value) });
    } else if (type == "operator" && !regex.test(str.charAt(str.length - 1))) {
      this.setState({ display: this.state.display.concat(value) });
    } else if (type == "operator" && regex.test(str.charAt(str.length - 1))) {
      let newexp = str.slice(0, str.length - 1).concat(value);
      if (regex.test(newexp.charAt(str.length - 2))) {
        newexp = str.slice(0, str.length - 2).concat(value);
      }
      this.setState({ display: newexp });
    } else if (value == "-" && !regex2.test(str.charAt(str.length - 1))) {
      this.setState({ display: this.state.display.concat(value) });
    }
  };

  clearDisplay = () => {
    this.setState({ display: "0" });
  };

  evalDisplay = () => {
    this.setState({ display: eval(this.state.display).toString() });
  };

  render() {
    return (
      <div id="container">
        <header>
          <h1 id="title">Calculator</h1>
        </header>
        <div id="calculator">
          <div id="display">{this.state.display}</div>
          {number.map((d) => (
            <NumButtons
              id={d.id}
              value={d.value}
              type={d.type}
              handleDisplay={this.handleDisplay}
            />
          ))}
          {operator.map((d) => (
            <OpButtons
              id={d.id}
              value={d.value}
              type={d.type}
              handleDisplay={this.handleDisplay}
            />
          ))}
          <button id="clear" onClick={this.clearDisplay}>
            C
          </button>
          <button id="equals" onClick={this.evalDisplay}>
            =
          </button>
        </div>
        <footer>Made by Amy</footer>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));

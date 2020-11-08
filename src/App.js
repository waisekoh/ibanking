/* Demo for FinTech@SG Course 
Generation of Charts Based on JSON data from Server
Author: Prof Bhojan Anand */
//Install d3.js:   npm install d3 --save
import React from "react";
import logo from "./brand-logo.png";
import * as d3 from 'd3';

import "./App.css";
import { interpolateMagma } from "d3";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      accounts: [],
      customers: [],
      transactions: [],
      tcredit: [],
      tcheque: [],
      tsavings: [],
      fcredit: [],
      fsavings: [],
      fcheque: []
     }
 
  }

  callAPIServeraccount() {
    fetch("https://f92c6b35-d121-4c8a-987b-81217155297f.mock.pstmn.io/accounts")
      .then(res => res.text())
      .then(res => this.setState({ accounts: JSON.parse(res) }))
      .catch(err => err);
    }

  callAPIServercustomer() {
    fetch("https://f92c6b35-d121-4c8a-987b-81217155297f.mock.pstmn.io/customers")
      .then(res => res.text())
      .then(res => this.setState({ customers: JSON.parse(res) }))
      .catch(err => err);
    }

  callAPIServertransaction() {
    fetch("https://f92c6b35-d121-4c8a-987b-81217155297f.mock.pstmn.io/transactions")
      .then(res => res.text())
      .then(res => this.setState({ transactions: JSON.parse(res) }))
      .catch(err => err);
    fetch("https://f92c6b35-d121-4c8a-987b-81217155297f.mock.pstmn.io/transactions")
      .then(res => res.text())
      .then(res => this.setState({ tcredit: JSON.parse(res) }))
      .catch(err => err);
    fetch("https://f92c6b35-d121-4c8a-987b-81217155297f.mock.pstmn.io/transactions")
      .then(res => res.text())
      .then(res => this.setState({ tcheque: JSON.parse(res) }))
      .catch(err => err);
    fetch("https://f92c6b35-d121-4c8a-987b-81217155297f.mock.pstmn.io/transactions")
      .then(res => res.text())
      .then(res => this.setState({ tsavings: JSON.parse(res) }))
      .catch(err => err);



  }
  
  callAPIServertcredit() {
    fetch("https://f92c6b35-d121-4c8a-987b-81217155297f.mock.pstmn.io/transactions")
      .then(res => res.text())
      .then(res => this.setState({ tcredit: JSON.parse(res) }))
      .catch(err => err);
  }

  callAPIServertcheque() {
    fetch("https://f92c6b35-d121-4c8a-987b-81217155297f.mock.pstmn.io/transactions")
      .then(res => res.text())
      .then(res => this.setState({ tcheque: JSON.parse(res) }))
      .catch(err => err);
  }

  callAPIServertsaving() {
      fetch("https://f92c6b35-d121-4c8a-987b-81217155297f.mock.pstmn.io/transactions")
        .then(res => res.text())
        .then(res => this.setState({ tsavings: JSON.parse(res) }))
        .catch(err => err);
      }

  componentDidMountaccount() {
    // react lifecycle method componentDidMount()
    //will execute the callAPIserver() method after the component mounts.
    this.callAPIServeraccount();
  }

  componentDidMountcustomer() {
    // react lifecycle method componentDidMount()
    //will execute the callAPIserver() method after the component mounts.
    this.callAPIServercustomer();
  }

  componentDidMounttransaction() {
    // react lifecycle method componentDidMount()
    //will execute the callAPIserver() method after the component mounts.
    this.callAPIServertransaction();
  }
 
  componentDidMounttcredit() {
    // react lifecycle method componentDidMount()
    //will execute the callAPIserver() method after the component mounts.
    this.callAPIServertcredit();
  }
  componentDidMounttcheque() {
    // react lifecycle method componentDidMount()
    //will execute the callAPIserver() method after the component mounts.
    this.callAPIServertcheque();
  }
  componentDidMounttsaving() {
    // react lifecycle method componentDidMount()
    //will execute the callAPIserver() method after the component mounts.
    this.callAPIServertsaving();
  }

  componentDidUpdate() {
  
  /* prepare data */
  this.state.accounts.forEach(function (c) {
    c.balance = c.balance.replace(/[^0-9.-]+/g,""); //regular expression to convert currency to Numeric form
  });
  
  this.state.transactions.forEach(function (b) {
    b.amount = b.amount.replace(/[^0-9.-]+/g,""); //regular expression to convert currency to Numeric form
  });

  this.state.tcredit.forEach(function (b) {
    b.amount = b.amount.replace(/[^0-9.-]+/g,""); //regular expression to convert currency to Numeric form 
  });
  
  this.state.tcheque.forEach(function (b) {
    b.amount = b.amount.replace(/[^0-9.-]+/g,""); //regular expression to convert currency to Numeric form
  });

  this.state.tsavings.forEach(function (b) {
    b.amount = b.amount.replace(/[^0-9.-]+/g,""); //regular expression to convert currency to Numeric form
  });

  
  this.generateGraph();  //based on previous d3.js exampls
  //this.showChart();  //improved version way to chart

  }


  editcreditlist(){
    const creditlist = [...this.state.tcredit];
    const updatedlist = new Array();
    creditlist.forEach(function(item){
      if(item.account == "credit"){
        updatedlist.push(item);
      }
    });
    this.setState({tcredit: updatedlist});
  }

  
  newcreditlist(){
    const creditlist = [...this.state.tcredit];
    //const updatedlist = [{account: "credit", clothing: "0", utilities: "0", recreation: "0", groceries: "0", salary: "0", housing: "0", insurance: "0"}];

    var lastlist = [{category: "clothing", amount: 0},{category: "utilities", amount: 0},{category: "recreation", amount: 0},{category: "groceries", amount: 0},{category: "salary", amount: 0},{category: "housing", amount: 0},{category: "insurance", amount: 0}];

    creditlist.forEach(function(item){
      if(item.category == "clothing"){
        lastlist[0].amount += Math.abs(Number(item.amount));  
      }
      else if(item.category == "utilities"){
        lastlist[1].amount += Math.abs(Number(item.amount)); 
      }
      else if(item.category == "recreation"){
        lastlist[2].amount += Math.abs(Number(item.amount)); 
      }
      else if(item.category == "groceries"){
        lastlist[3].amount += Math.abs(Number(item.amount)); 
      }
      else if(item.category == "salary"){
        lastlist[4].amount += Math.abs(Number(item.amount)); 
      }
      else if(item.category == "housing"){
        lastlist[5].amount += Math.abs(Number(item.amount)); 
      }
      else if(item.category == "insurance"){
        lastlist[6].amount += Math.abs(Number(item.amount)); 
      }
    });
    this.setState({fcredit: lastlist});
  }
  
  newchequelist(){
    const creditlist = [...this.state.tcheque];
    //const updatedlist = [{account: "credit", clothing: "0", utilities: "0", recreation: "0", groceries: "0", salary: "0", housing: "0", insurance: "0"}];

    var lastlist = [{category: "clothing", amount: 0, colour: "red"},{category: "utilities", amount: 0, colour: "red"},{category: "recreation", amount: 0, colour: "red"},{category: "groceries", amount: 0, colour: "red"},{category: "salary", amount: 0, colour: "green"},{category: "housing", amount: 0, colour: "red"},{category: "insurance", amount: 0, colour: "red"}];

    creditlist.forEach(function(item){
      if(item.category == "clothing"){
        lastlist[0].amount += Math.abs(Number(item.amount));  
      }
      else if(item.category == "utilities"){
        lastlist[1].amount += Math.abs(Number(item.amount)); 
      }
      else if(item.category == "recreation"){
        lastlist[2].amount += Math.abs(Number(item.amount)); 
      }
      else if(item.category == "groceries"){
        lastlist[3].amount += Math.abs(Number(item.amount)); 
      }
      else if(item.category == "salary"){
        lastlist[4].amount += Math.abs(Number(item.amount)); 
      }
      else if(item.category == "housing"){
        lastlist[5].amount += Math.abs(Number(item.amount)); 
      }
      else if(item.category == "insurance"){
        lastlist[6].amount += Math.abs(Number(item.amount)); 
      }
    });
    this.setState({fcheque: lastlist});
  }

  newsavinglist(){
    const creditlist = [...this.state.tsavings];
    //const updatedlist = [{account: "credit", clothing: "0", utilities: "0", recreation: "0", groceries: "0", salary: "0", housing: "0", insurance: "0"}];

    var lastlist = [{category: "clothing", amount: 0},{category: "utilities", amount: 0},{category: "recreation", amount: 0},{category: "groceries", amount: 0},{category: "salary", amount: 0},{category: "housing", amount: 0},{category: "insurance", amount: 0}];

    creditlist.forEach(function(item){
      if(item.category == "clothing"){
        lastlist[0].amount += Math.abs(Number(item.amount));  
      }
      else if(item.category == "utilities"){
        lastlist[1].amount += Math.abs(Number(item.amount)); 
      }
      else if(item.category == "recreation"){
        lastlist[2].amount += Math.abs(Number(item.amount)); 
      }
      else if(item.category == "groceries"){
        lastlist[3].amount += Math.abs(Number(item.amount)); 
      }
      else if(item.category == "salary"){
        lastlist[4].amount += Math.abs(Number(item.amount)); 
      }
      else if(item.category == "housing"){
        lastlist[5].amount += Math.abs(Number(item.amount)); 
      }
      else if(item.category == "insurance"){
        lastlist[6].amount += Math.abs(Number(item.amount)); 
      }
    });
    this.setState({fsavings: lastlist});
  }

  editsavingslist(){
    const creditlist = [...this.state.tsavings];
    const updatedlist = new Array();
    creditlist.forEach(function(item){
      if(item.account == "savings"){
        updatedlist.push(item);
      }
    });
    this.setState({tsavings: updatedlist});

  }

  editchequelist(){
    const creditlist = [...this.state.tcheque];
    const updatedlist = new Array();
    creditlist.forEach(function(item){
      if(item.account == "cheque"){
        updatedlist.push(item);
      }
    });
    this.setState({tcheque: updatedlist});

  }

  editlist(){
    this.editcreditlist();
    this.editsavingslist();
    this.editchequelist();
  }

  showChart() {
    
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    var width = 1000 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;
    var svg = d3.select("#barChart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    
    svg.selectAll("*").remove();

    var x = d3.scaleBand().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    x.domain(this.state.accounts.map(details => details.account));
    y.domain([0, d3.max(this.state.accounts.map(details => details.balance))]);



    svg.selectAll(".bar")
      .data(this.state.accounts)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("fill", "blue")
      .attr("x", d => x(d.account))
      .attr("width", x.bandwidth() - 10)
      .attr("y", d => y(d.balance))
      .attr("height", d => height - y(d.balance));

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))

    svg.append("g")
      .call(d3.axisLeft(y));
  }

  showcreditChart() {
    
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    var width = 1000 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;
    var svg = d3.select("#barChart1")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    
    svg.selectAll("*").remove();

    var x = d3.scaleBand().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    x.domain(this.state.fcredit.map(details => details.category));
    y.domain([0, 2500]);


    svg.selectAll(".bar")
      .data(this.state.fcredit)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("fill", "red")
      .attr("x", d => x(d.category))
      .attr("width", x.bandwidth() - 10)
      .attr("y", d => y(d.amount))
      .attr("height", d => height - y(d.amount));

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))

    svg.append("g")
      .call(d3.axisLeft(y));
  }


  showchequeChart() {
    
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    var width = 1000 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;
    var svg = d3.select("#barChart2")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    
    svg.selectAll("*").remove();

    var x = d3.scaleBand().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    x.domain(this.state.fcheque.map(details => details.category));
    y.domain([0, 8000]);


    svg.selectAll(".bar")
      .data(this.state.fcheque)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("fill", function(d){return d.colour;})
      .attr("x", d => x(d.category))
      .attr("width", x.bandwidth() - 10)
      .attr("y", d => y(d.amount))
      .attr("height", d => height - y(d.amount));

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))

    svg.append("g")
      .call(d3.axisLeft(y));
  }

  showsavingChart() {
    
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    var width = 1000 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;
    var svg = d3.select("#barChart3")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    
    svg.selectAll("*").remove();

    var x = d3.scaleBand().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    x.domain(this.state.fsavings.map(details => details.category));
    y.domain([0, 3500]);


    svg.selectAll(".bar")
      .data(this.state.fsavings)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("fill", "red")
      .attr("x", d => x(d.category))
      .attr("width", x.bandwidth() - 10)
      .attr("y", d => y(d.amount))
      .attr("height", d => height - y(d.amount));

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))

    svg.append("g")
      .call(d3.axisLeft(y));
  }

  generateGraph() {

      var maxVal = d3.max(this.state.accounts.map(details => Number(details.balance)));
      console.log(maxVal);
      var svg = d3
        .select("#visualisation")
        .append("svg")
        .attr("width", 500)
        .attr("height", 200);

      svg
        .selectAll("rect")
        .data(this.state.accounts)
        .enter()
        .append("rect")
        .attr("transform", function (d, i) {
          return "translate(" + 60 + "," + i * 25 + ")";
        })
        .attr("fill", "blue")
        .attr("height", 20)
        .attr("width", function (d) {
          return d.balance /maxVal * 500 + "px";
        });
        
      svg
        .selectAll("text")
        .data(this.state.accounts)
        .enter()
        .append("text")
        .attr("transform", function (d, i) {
          return "translate(0," + Number(i * 25 + 15) + ")";
        })
        .attr("fill", "red")
        .text(function (d) {
          return d.account;
        });
        
    
  } 

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">NUSmoney App+</h1>
        </header>

        <h2> Accounts </h2>
        <button className="btn"
                onClick={() => this.componentDidMountaccount()}>
                      Get Data
        </button>
        <table className="myTable"  id="A">
        <tr>
        <th  >Account Type</th>
        <th   >Balance</th>
      </tr>
          <tbody>
          {this.state.accounts.map((item) => {
            return (
              <tr key={item.id}>
                <td> {item.account} </td>
                <td> {item.balance} </td>
              </tr>
            );
          })}
          </tbody>
        </table>


        <h2> Customers </h2>
        <button className="btn"
                onClick={() => this.componentDidMountcustomer()}>
                      Get Data
        </button>    
        <table className="myTable"  id="C">
        <tr>
        <th >First Name</th>
        <th >Last Name</th>
        <th >Email</th>
        <th >Gender</th>
      </tr>
          <tbody>
          {this.state.customers.map((item) => {
            return (
              <tr key={item.id}>
                  <td> {item.first_name} </td>
                  <td> {item.last_name} </td>
                  <td> {item.email}  </td>
                  <td> {item.gender} </td>
              </tr>
            );
          })}
          </tbody>
        </table>

        <h2> Transactions </h2>
        <button className="btn"
                onClick={() => this.componentDidMounttransaction()}>
                      Get Data
        </button>
        <table className="myTable" id="T">
          <tr>
            <th >Date</th>
            <th >Category</th>
            <th >Account Type</th>
            <th >Amount Transacted</th>
          </tr>
          <tbody>
            {this.state.transactions.map((item) => {
              return (
                <tr key={item.transaction_id}>
                    <td> {item.timestamp} </td>
                    <td> {item.category} </td>
                    <td> {item.account}  </td>
                    <td> {item.amount} </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <p> </p>
        <p> </p>
        
        <button className="btn"
                onClick= {() => {this.editlist();}}>
                      Manipulate Transaction Details
        </button>

        <h2> Credit </h2>
        <table className="myTable" id="T">
          <tr>
            <th >Date</th>
            <th >Category</th>
            <th >Account Type</th>
            <th >Amount Transacted</th>
          </tr>
          <tbody>
            {this.state.tcredit.map((item) => {
              return (
                <tr key={item.transaction_id}>
                    <td> {item.timestamp} </td>
                    <td> {item.category} </td>
                    <td> {item.account}  </td>
                    <td> {item.amount} </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <h2> Cheque </h2>
        <table className="myTable" id="T">
          <tr>
            <th >Date</th>
            <th >Category</th>
            <th >Account Type</th>
            <th >Amount Transacted</th>
          </tr>
          <tbody>
            {this.state.tcheque.map((item) => {
              return (
                <tr key={item.transaction_id}>
                    <td> {item.timestamp} </td>
                    <td> {item.category} </td>
                    <td> {item.account}  </td>
                    <td> {item.amount} </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <h2> Savings </h2>
        <table className="myTable" id="T">
          <tr>
            <th >Date</th>
            <th >Category</th>
            <th >Account Type</th>
            <th >Amount Transacted</th>
          </tr>
          <tbody>
            {this.state.tsavings.map((item) => {
              return (
                <tr key={item.transaction_id}>
                    <td> {item.timestamp} </td>
                    <td> {item.category} </td>
                    <td> {item.account}  </td>
                    <td> {item.amount} </td>
                </tr>
              );
            })}
          </tbody>
        </table>


        <h2> Visualisation of Accounts</h2>
        <button className="btn"
                onClick={() => this.showChart()}>
                      Show Accounts Chart
        </button>
        <div>
        <svg id="barChart"></svg>
          </div>
            
          <h2> Visualisation of Credit Transactions</h2>
          <button className="btn"
                onClick={() => this.newcreditlist()}>
                      Better click me first!
        </button>
          
        <button className="btn"
                onClick={() => this.showcreditChart()}>
                      Show Chart
        </button>
        <div>
        <svg id="barChart1"></svg>
          </div>

          <h2> Visualisation of Cheque Transactions</h2>
          <button className="btn"
                onClick={() => this.newchequelist()}>
                      Better click me first!
        </button>
        <button className="btn"
                onClick={() => this.showchequeChart()}>
                      Show Chart
        </button>
        <div>
        <svg id="barChart2"></svg>
          </div>

          <h2> Visualisation of Savings Transactions</h2>
          <button className="btn"
                onClick={() => this.newsavinglist()}>
                      Better click me first!
        </button>
        <button className="btn"
                onClick={() => this.showsavingChart()}>
                      Show Chart
        </button>
        <div>
        <svg id="barChart3"></svg>
          </div>
      </div>
    );
  }
}

export default App;


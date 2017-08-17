import React, { Component } from 'react';
import AmortizationChart from './AmortizationChart';

class MortgageCalculator extends Component {

    getInitialState() {
        return {
            principal: this.props.principal,
            years: this.props.years,
            rate: this.props.rate
        }
    }

    principalChange(event) {
        this.setState({principal: event.target.value});
    }

    yearsChange(event) {
        this.setState({years: event.target.value});
    }

    rateChange(event) {
        this.setState({rate: event.target.value});
    }

    calculatePayment(principal, years, rate) {
        let monthlyRate = rate / 100 / 12;
        let monthlyPayment = principal * monthlyRate / (1 - (Math.pow(1/(1 + monthlyRate), years * 12)));
        let balance = principal;
        let amortization = [];
        for (let y = 0; y < years; y++) {
            let interestY = 0;  //Interest payment for year y
            let principalY = 0; //Principal payment for year y
            for (let m = 0; m < 12; m++) {
                let interestM = balance * monthlyRate;       //Interest payment for month m
                let principalM = monthlyPayment - interestM; //Principal payment for month m
                interestY = interestY + interestM;
                principalY = principalY + principalM;
                balance = balance - principalM;
            }
            amortization.push({principalY: principalY, interestY: interestY, balance: balance});
        }
        return {monthlyPayment: monthlyPayment, amortization: amortization};
    };

    render() {
        let payment = this.calculatePayment(this.principal, this.years, this.rate);
        let monthlyPayment = payment.monthlyPayment;
        let amortization = payment.amortization;

        return (
            <div className="content">
                <div className="form">
                    <div>
                        <label>Principal:</label>
                        <input type="text" value={this.principal} onChange={this.principalChange}/>
                    </div>
                    <div>
                        <label>Years:</label>
                        <input type="text" value={this.years} onChange={this.yearsChange}/>
                    </div>
                    <div>
                        <label htmlFor="rate">Rate:</label>
                        <input type="text" value={this.rate} onChange={this.rateChange}/>
                    </div>
                </div>
                <h2>Monthly Payment: <span className="currency">{Number(monthlyPayment.toFixed(2)).toLocaleString()}</span></h2>
                <AmortizationChart data={amortization}/>
            </div>
        );
    }

}

export default MortgageCalculator;
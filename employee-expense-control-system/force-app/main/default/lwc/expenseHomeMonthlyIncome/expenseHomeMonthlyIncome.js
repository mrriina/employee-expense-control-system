import { LightningElement, api, track } from 'lwc';
import getIncome from '@salesforce/apex/expenseHandler.getIncome';

export default class ExpenseHomeMonthlyIncome extends LightningElement {
    @api cont;
    @api month;
    @api year;
    income;

    @api connectedCallback(){
        this.getUpdatedIncome();
    }

    @api getUpdatedIncome() {
        getIncome({contId:this.cont, month:this.month, year:this.year})
        .then((result) => {
            this.income = result;
        }).catch(error => {
            console.log('Error: ' +error.body.message);
        });
    }
}
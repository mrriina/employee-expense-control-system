import { LightningElement, api, wire, track } from 'lwc';
import getAmount from '@salesforce/apex/expenseHandler.getAmount';

export default class ExpenseHomeMonthlyAmount extends LightningElement {
    @api cont;
    @api month;
    @api year;
    amount;

    @api connectedCallback(){
        getAmount({contId:this.cont, month:this.month, year:this.year})
        .then((result) => {
            this.amount = result;
        }).catch(error => {
            console.log('Error: ' +error.body.message);
        });
    }

    @api getUpdatedAmount() {
        getAmount({contId:this.cont, month:this.month, year:this.year})
        .then((result) => {
            this.amount = result;
        }).catch(error => {
            console.log('Error: ' +error.body.message);
        });
    }
}
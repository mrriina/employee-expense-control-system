import { LightningElement, api } from 'lwc';
import getContact from '@salesforce/apex/expenseHandler.getContact';
import getTotalIncome from '@salesforce/apex/expenseHandler.getTotalIncome';

export default class ExpenseHomeTotalIncome extends LightningElement {
    cont;
    @api year;
    income;

    @api async connectedCallback(){
        await getContact()
        .then((result) => {
            this.cont = result;
        }).catch(error => {
            console.log('Error: ' +error.body.message);
        });

        getTotalIncome({contId:this.cont, year:this.year})
        .then((result) => {
            this.income = result;
        }).catch(error => {
            console.log('Error: ' +error.body.message);
        });
    }
}
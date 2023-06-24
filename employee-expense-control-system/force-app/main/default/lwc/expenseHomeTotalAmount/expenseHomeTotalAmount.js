import { LightningElement, api } from 'lwc';
import getTotalAmount from '@salesforce/apex/expenseHandler.getTotalAmount';
import getContact from '@salesforce/apex/expenseHandler.getContact';

export default class ExpenseHomeTotalAmount extends LightningElement {
    cont;
    @api year;
    amount;

    @api async connectedCallback(){
        await getContact()
        .then((result) => {
            this.cont = result;
        }).catch(error => {
            console.log('Error: ' +error.body.message);
        });

        getTotalAmount({contId:this.cont, year:this.year})
        .then((result) => {
            this.amount = result;
        }).catch(error => {
            console.log('Error: ' +error.body.message);
        });
    }
}
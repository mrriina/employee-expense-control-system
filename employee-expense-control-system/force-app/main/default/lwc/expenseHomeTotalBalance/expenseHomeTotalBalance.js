import { LightningElement, api } from 'lwc';
import getBalance from '@salesforce/apex/expenseHandler.getBalance';
import getContact from '@salesforce/apex/expenseHandler.getContact';

export default class ExpenseHomeTotalBalance extends LightningElement {
    cont;
    @api year;
    balance;

    @api async connectedCallback(){
        await getContact()
        .then((result) => {
            this.cont = result;
        }).catch(error => {
            console.log('Error: ' +error.body.message);
        });

        getBalance({contId:this.cont, year:this.year})
        .then((result) => {
            this.balance = result;
        }).catch(error => {
            console.log('Error: ' +error.body.message);
        }); 
    }
}
import { LightningElement, api, track } from 'lwc';
import getBalanceNow from '@salesforce/apex/expenseAdminHome.getBalanceNow';

export default class ExpenseAdminHomeOfficeBalanceNow extends LightningElement {
    @api office;
    @api year;
    @track balanceNow = 0;

    @api connectedCallback() {
        getBalanceNow({office:this.office, year:this.year})
        .then((result) => {
            this.balanceNow = result;
        }).catch(error => {
            console.log('Error: ' +error.body.message);
        });
    }
}
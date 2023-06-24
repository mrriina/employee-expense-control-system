import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getOfficesList from '@salesforce/apex/expenseAdminHome.getOfficesList';
import getSummTotalAmount from '@salesforce/apex/expenseAdminHome.getSummTotalAmount';

export default class ExpenseAdminHome extends NavigationMixin(LightningElement) {
    months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    @track offices = [];
    @track yearNumb = (new Date).getFullYear();
    @track shownYear = (new Date).getFullYear();
    summTotalAmount;

    connectedCallback() {
        getOfficesList()
        .then((result) => {
            this.offices = result;
        }).catch(error => {
            console.log('Error: ' +error.body.message);
        });

        getSummTotalAmount({year:this.yearNumb})
        .then((result) => {
            this.summTotalAmount = result;
        }).catch(error => {
            console.log('Error: ' +error.body.message);
        });
    }

    get options() {
        let currentYear = (new Date).getFullYear();
        return [
            { label: currentYear, value: currentYear },
            { label: currentYear-1, value: currentYear-1},
            { label: currentYear-2, value: currentYear-2 },
            { label: currentYear-3, value: currentYear-3 }
        ];
    }

    async handleYearChange(event) {
        this.shownYear = +event.detail.value;
        await this.assignYear(event.detail.value);

        this.connectedCallback();
        this.template.querySelectorAll('c-expense-admin-home-office-balance-now').forEach(element => {
            element.connectedCallback();
       });

       this.template.querySelectorAll('c-expense-admin-home-office-monthly-average').forEach(element => {
        element.connectedCallback();
        });

        this.template.querySelectorAll('c-expense-admin-home-office-table').forEach(element => {
            element.connectedCallback();
        });

        this.template.querySelectorAll('c-expense-admin-home-office-total-months').forEach(element => {
            element.connectedCallback();
        });

        this.template.querySelectorAll('c-expense-admin-home-summ-table').forEach(element => {
            element.connectedCallback();
        });
    }

    assignYear(newValue){
        this.yearNumb = newValue;
    }

    viewRecord(event) {
        let recordId = event.target.value;
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: 'https://resilient-impala-3wvdg3-dev-ed.lightning.force.com/lightning/r/Account/'+recordId+'/view'
            }
        },
        true
      );
    }
}
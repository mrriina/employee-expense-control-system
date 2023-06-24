import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import checkLogin from '@salesforce/apex/expenseHandler.checkLogin';
import expenses from '@salesforce/resourceUrl/expenses';

export default class ExpenseLogin extends NavigationMixin(LightningElement) {
    expImg = expenses;
    cont;
    emailString;
    passwordString;

    LoginChanged(event) {
        this.emailString = event.target.value;
    }

    PasswordChanged(event) {
        this.passwordString = event.target.value;
    }

    ClickLoginButton() {
        checkLogin({emailString:this.emailString, passwordString:this.passwordString})
                .then((result) => {
                    if(result != null){
                        this.cont = result;
                        if(this.cont == 'employee') {
                            this.navigateToEmployeePage();
                        }
                        else if(this.cont == 'admin') {
                            this.navigateToAdminPage();
                        } 
                    }
                })
    }

    navigateToEmployeePage() {
        this[NavigationMixin.Navigate]({
            type: 'standard__component',
            attributes: {
                componentName: 'c__expenseEmployeeAura'
            },
            state: {
                c__counter: '5'
            }
        });
    }

    navigateToAdminPage() {
        this[NavigationMixin.Navigate]({
            type: 'standard__component',
            attributes: {
                componentName: 'c__expenseAdminAura'
            },
            state: {
                c__counter: '5'
            }
        });
    }
}
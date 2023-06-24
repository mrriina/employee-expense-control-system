import { LightningElement, track, api, wire } from 'lwc';
import getMonthExp from '@salesforce/apex/expenseHandler.getMonthExp';
import getOffice from '@salesforce/apex/expenseHandler.getOffice';
import getBalance from '@salesforce/apex/expenseHandler.getBalance';
import getTotalAmount from '@salesforce/apex/expenseHandler.getTotalAmount';
import getTotalIncome from '@salesforce/apex/expenseHandler.getTotalIncome';
import getContact from '@salesforce/apex/expenseHandler.getContact';


export default class ExpenseHome extends LightningElement {
    @track newExpense = false;
    @track income = false;
    monthExp = [];
    @track monthNumb = 1;
    @track yearNumb = (new Date).getFullYear();
    @track shownYear = (new Date).getFullYear();
    cont;

    office;
    balance;
    @track totalAmount;
    @track totalIncome;
    
    @track januaryValue = false;    
    @track februaryValue = false;
    @track marchValue = false;
    @track aprilValue = false;
    @track mayValue = false;
    @track juneValue = false;
    @track julyValue = false;
    @track augustValue = false;
    @track septemberValue = false;
    @track octoberValue = false;
    @track novemberValue = false;
    @track decemberValue = false;

    connectedCallback(){
        getContact()
        .then((result) => {
            this.cont = result;
        }).catch(error => {
            console.log('Error: ' +error.body.message);
        });
    }

    @wire(getMonthExp, {monthNumb:'$monthNumb', yearNumb:'$yearNumb', cont:'$cont'})
    wr1({ error, data }){
        if(data) {
            this.monthExp = data;
        }
    }

    @wire(getOffice, {contId:'$cont'})
    wr2({ error, data }){
        if(data) {
            this.office = data;
        }
    }

    @wire(getBalance, {contId:'$cont', year:'$yearNumb'})
    wr3({ error, data }){
        if(data) {
            this.balance = data;
        }
    }

    @wire(getTotalAmount, {contId:'$cont', year:'$yearNumb'})
    wr4({ error, data }){
        if(data >= 0) {
            this.totalAmount = data;
        }
    }

    @wire(getTotalIncome, {contId:'$cont', year:'$yearNumb'})
    wr5({ error, data }){
        if(data >= 0) {
            this.totalIncome = data;
        }
    }

    getMonthExpense() {
        getMonthExp({monthNumb:this.monthNumb, yearNumb:this.yearNumb, cont:this.cont})
        .then((result) => {
            this.monthExp = result;
        }).catch(error => {
            console.log('Error: ' +error.body.message);
        }); 
    }

    getOffices() {
        getOffice({contId:this.cont})
        .then((result) => {
            this.office = result;
        }).catch(error => {
            console.log('Error: ' +error.body.message);
        });
    }

    getHeadBalance() {
        getBalance({contId:this.cont, year:this.yearNumb})
        .then((result) => {
            this.balance = result;
            console.log('resultBAL= ', result);
        }).catch(error => {
            console.log('Error: ' +error.body.message);
        });
    }

    getTabTotalAmount() {
        getTotalAmount({contId:this.cont, year:this.yearNumb})
        .then((result) => {
            this.totalAmount = result;
        }).catch(error => {
            console.log('Error: ' +error.body.message);
        });
    }

    getTabTotalIncome() {
        getTotalIncome({contId:this.cont, year:this.yearNumb})
        .then((result) => {
            this.totalIncome = result;
        }).catch(error => {
            console.log('Error: ' +error.body.message);
        });
    }

    get options() {
        var year = (new Date()).getFullYear();
        return [
            { label: year-3, value: year-3 },
            { label: year-2, value: year-2 },
            { label: year-1, value: year-1 },
            { label: year, value: year }
        ];
    }

    async handleValueIntercept(event){
        this.shownYear = +event.detail.value;
        await this.assignYear(event.detail.value);

        this.template.querySelectorAll('c-expense-home-monthly-amount').forEach(element => {
            element.getUpdatedAmount();
       });

       this.template.querySelectorAll('c-expense-home-monthly-income').forEach(element => {
            element.getUpdatedIncome();
        });

        this.template.querySelectorAll('c-expense-home-total-amount').forEach(element => {
            element.connectedCallback();
       });

       this.template.querySelectorAll('c-expense-home-total-income').forEach(element => {
        element.connectedCallback();
        });

        this.template.querySelectorAll('c-expense-home-total-balance').forEach(element => {
            element.connectedCallback();
            });
    }

    assignYear(newValue){
        this.yearNumb = newValue;
    }

    handlerIncome() {
        this.income = true;
    }

    handlerNewExpense(){
        this.newExpense = true;
    }

    async handleOnCloseModalIncome(event){
        this.income = event.detail.income;
        // this.template.querySelectorAll('c-expense-home-monthly-income').forEach(element => {
        //     element.getUpdatedIncome();
        // });
        
        //await this.updateRecordView();

        this.template.querySelectorAll('c-expense-home-monthly-amount').forEach(element => {
            element.getUpdatedAmount();
       });

       this.template.querySelectorAll('c-expense-home-monthly-income').forEach(element => {
            element.getUpdatedIncome();
        });

        this.template.querySelectorAll('c-expense-home-total-amount').forEach(element => {
            element.connectedCallback();
       });

       this.template.querySelectorAll('c-expense-home-total-income').forEach(element => {
        element.connectedCallback();
        });

        this.template.querySelectorAll('c-expense-home-total-balance').forEach(element => {
            element.connectedCallback();
            });
    }
    
    handleOnCloseModalNewExpense(event){
        this.newExpense = event.detail.newExpense;
        
    //     this.template.querySelectorAll('c-expense-home-monthly-amount').forEach(element => {
    //         element.getUpdatedAmount();
    //    });

        //this.updateRecordView();

        this.template.querySelectorAll('c-expense-home-monthly-amount').forEach(element => {
            element.getUpdatedAmount();
       });

       this.template.querySelectorAll('c-expense-home-monthly-income').forEach(element => {
            element.getUpdatedIncome();
        });

        this.template.querySelectorAll('c-expense-home-total-amount').forEach(element => {
            element.connectedCallback();
       });

       this.template.querySelectorAll('c-expense-home-total-income').forEach(element => {
        element.connectedCallback();
        });

        this.template.querySelectorAll('c-expense-home-total-balance').forEach(element => {
            element.connectedCallback();
            });
    }

    updateRecordView() {
        setTimeout(() => {
             eval("$A.get('e.force:refreshView').fire();");
        }, 1000); 
     }

    handleRefreshAmount(event) {
    //     this.template.querySelectorAll('c-expense-home-monthly-amount').forEach(element => {
    //         element.getUpdatedAmount();
    //    });
        //this.updateRecordView();

        this.template.querySelectorAll('c-expense-home-monthly-amount').forEach(element => {
            element.getUpdatedAmount();
       });

       this.template.querySelectorAll('c-expense-home-monthly-income').forEach(element => {
            element.getUpdatedIncome();
        });

        this.template.querySelectorAll('c-expense-home-total-amount').forEach(element => {
            element.connectedCallback();
       });

       this.template.querySelectorAll('c-expense-home-total-income').forEach(element => {
        element.connectedCallback();
        });

        this.template.querySelectorAll('c-expense-home-total-balance').forEach(element => {
            element.connectedCallback();
            });
       
    }

    changeHandleAction(selMonth) {
        let selected = selMonth;
        if (selected == 'january'){
            this.januaryValue = true;
            this.monthNumb = 1;
            this.connectedCallback();
        }else{
            this.januaryValue = false;
        }
 
        if (selected == 'february'){
            this.februaryValue = true;
            this.monthNumb = 2;
            this.connectedCallback();
        }else{
            this.februaryValue = false;
        }
 
        if (selected == 'march'){
            this.marchValue = true;
            this.monthNumb = 3;
            this.connectedCallback();
        }else{
            this.marchValue = false;
        }
 
        if (selected == 'april'){
            this.aprilValue = true;
            this.monthNumb = 4;
            this.connectedCallback();
        }else{
            this.aprilValue = false;
        }
 
        if (selected == 'may'){
            this.mayValue = true;
            this.monthNumb = 5;
            this.connectedCallback();
        }else{
            this.mayValue = false;
        }
 
        if (selected == 'june'){
            this.juneValue = true;
            this.monthNumb = 6;
            this.connectedCallback();
        }else{
            this.juneValue = false;
        }

        if (selected == 'july'){
            this.julyValue = true;
            this.monthNumb = 7;
            this.connectedCallback();
        }else{
            this.julyValue = false;
        }

        if (selected == 'august'){
            this.augustValue = true;
            this.monthNumb = 8;
            this.connectedCallback();
        }else{
            this.augustValue = false;
        }

        if (selected == 'september'){
            this.septemberValue = true;
            this.monthNumb = 9;
            this.connectedCallback();
        }else{
            this.septemberValue = false;
        }

        if (selected == 'october'){
            this.octoberValue = true;
            this.monthNumb = 10;
            this.connectedCallback();
        }else{
            this.octoberValue = false;
        }

        if (selected == 'november'){
            this.novemberValue = true;
            this.monthNumb = 11;
            this.connectedCallback();
        }else{
            this.novemberValue = false;
        }

        if (selected == 'december'){
            this.decemberValue = true;
            this.monthNumb = 12;
            this.connectedCallback();
        }else{
            this.decemberValue = false;
        }
    }

    activeSectionMessage = '';
    handleToggleSection(event) {
        this.activeSectionMessage =
            'Open section name:  ' + event.detail.openSections;
    }

    clickJanuary(event) {
        this.changeColor("idJanuary");
        this.changeHandleAction('january');
        console.log('this.yearNumb= ', this.yearNumb);
    }

    clickFebruary(event) {
        this.changeColor('"idFebruary"');
        this.changeHandleAction('february');
    }

    clickMarch(event) {
        this.changeColor('"idMarch"');
        this.changeHandleAction('march');
    }

    clickApril(event) {
        this.changeColor('"idApril"');
        this.changeHandleAction('april');
    }

    clickMay(event) {
        this.changeColor('idMay');
        this.changeHandleAction('may');
    }

    clickJune(event) {
        this.changeColor('idJune');
        this.changeHandleAction('june');
    }

    clickJuly(event) {
        this.changeColor('idJuly');
        this.changeHandleAction('july');
    }

    clickAugust(event) {
        this.changeColor('idAugust');
        this.changeHandleAction('august');
    }

    clickSeptember(event) {
        this.changeColor('idSeptember');
        this.changeHandleAction('september');
    }

    clickOctober(event) {
        this.changeColor('idOctober');
        this.changeHandleAction('october');
    }

    clickNovember(event) {
        this.changeColor('idNovember');
        this.changeHandleAction('november');
    }

    clickDecember(event) {
        this.changeColor('idDecember');
        this.changeHandleAction('december');
    }

    changeColor(month) {
        this.template.querySelector('[data-id="idJanuary"]').style.backgroundColor = "white";
        this.template.querySelector('[data-id="idFebruary"]').style.backgroundColor = "white";
        this.template.querySelector('[data-id="idMarch"]').style.backgroundColor = "white";
        this.template.querySelector('[data-id="idApril"]').style.backgroundColor = "white";
        this.template.querySelector('[data-id="idMay"]').style.backgroundColor = "white";
        this.template.querySelector('[data-id="idJune"]').style.backgroundColor = "white";
        this.template.querySelector('[data-id="idJuly"]').style.backgroundColor = "white";
        this.template.querySelector('[data-id="idAugust"]').style.backgroundColor = "white";
        this.template.querySelector('[data-id="idSeptember"]').style.backgroundColor = "white";
        this.template.querySelector('[data-id="idOctober"]').style.backgroundColor = "white";
        this.template.querySelector('[data-id="idNovember"]').style.backgroundColor = "white";
        this.template.querySelector('[data-id="idDecember"]').style.backgroundColor = "white";

        this.template.querySelector("[data-id=" + month + "]").style.backgroundColor = "#b0c8f7"; 
    }
}
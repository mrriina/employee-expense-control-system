public with sharing class TestFactory {

    public static User createPartnerUser(ID cId){
        Profile p = [
            SELECT ID, Name 
            FROM Profile 
            WHERE Name = 'Employee Community'];
    
        User u = New User(
            UserName = 'test_' + math.random() + '@test.com',
            FirstName = 'Test-First',
            LastName = 'Test-Last',
            Alias = 'test',
            email = 'test' + math.random() + '@test.com',
            CommunityNickName = string.valueOf(math.random()).substring(0,6),
            ProfileID = p.id,
            TimeZoneSidKey = 'America/New_York', 
            LocaleSidKey = 'en_US', 
            EmailEncodingKey = 'UTF-8', 
            LanguageLocaleKey = 'en_US',
            ContactID = cId
            );
    
        insert u;
        return u;    
    }
    
    public static List<Account> insertReturnAccounts(Integer numberOfAccounts){
        List<Account> testListAcc = returnAccounts(numberOfAccounts);
        insert testListAcc;
        for(Account acc : testListAcc) {
            acc.IsPartner = true;
        }
        update testListAcc;
        return testListAcc;
    }

    public static List<Account> returnAccounts(Integer numberOfAccounts){
        List<Account> testListAcc = new List<Account>();
        for(Integer i=0; i<numberOfAccounts; i++){
            Account acc = new Account(
                Name = 'testAccount'+i
            );
            testListAcc.add(acc);
        }
        return testListAcc;
    }

    public static List<Contact> insertReturnContacts(Integer numberOfContacts, List<Account> relatedListAccount){
        List<Contact> testListCont = returnContacts(numberOfContacts, relatedListAccount);
        insert testListCont;
        return testListCont;
    }

    public static List<Contact> returnContacts(Integer numberOfContacts, List<Account> relatedListAccount){
        List<Contact> testListCont = new List<Contact>();
        for(Integer i=0; i<numberOfContacts; i++){
            Contact cont = new Contact(
                LastName = 'testContact'+i,
                Email = 'test'+i+'@t.t',
                Password__c = 'p',
                Office__c = 'Office 1',
                AccountId = relatedListAccount.get(i).Id
            );
            testListCont.add(cont);
        }
        return testListCont;
    }

    public static List<Monthly_Expense__c> insertReturnMonthlyExpense(Integer numberOfMonExp, List<Contact> relatedListCont){
        List<Monthly_Expense__c> testListME = returnMonthlyExpense(numberOfMonExp, relatedListCont);
        insert testListME;
        return testListME;
    }

    public static List<Monthly_Expense__c> returnMonthlyExpense(Integer numberOfMonExp, List<Contact> relatedListCont){
        List<Monthly_Expense__c> testListME = new List<Monthly_Expense__c>();
        for(Integer i=0; i<numberOfMonExp; i++){
            Monthly_Expense__c me = new Monthly_Expense__c(
                Name = 'testME'+i,
                Balance__c = i,
                Keeper__c = relatedListCont.get(i).Id,
                Month_Date__c = Date.today()
            );
            testListME.add(me);
        }
        return testListME;
    }

    public static List<ExpenseCard__c> insertReturnExpenseCard(Integer numberOfExpC, List<Contact> relatedListCont, List<Monthly_Expense__c> relatedListMonExp){
        List<ExpenseCard__c> testListEC = returnExpenseCard(numberOfExpC, relatedListCont, relatedListMonExp);
        insert testListEC;
        return testListEC;
    }

    public static List<ExpenseCard__c> returnExpenseCard(Integer numberOfExpC, List<Contact> relatedListCont, List<Monthly_Expense__c> relatedListMonExp){
        List<ExpenseCard__c> testListEC = new List<ExpenseCard__c>();
        for(Integer i=0; i<numberOfExpC; i++){
            ExpenseCard__c ec = new ExpenseCard__c(
                Name = 'testExp'+i,
                Amount__c = i+1,
                CardKeeper__c = relatedListCont.get(i).Id,
                CardDate__c = Date.today(),
                Description__c = 'testDescription'+i,
                MonthlyExpense__c = relatedListMonExp.get(i).Id
            );
            testListEC.add(ec);
        }
        return testListEC;
    }

    public static List<ExpenseCard__c> insertReturnExpenseCardWithoutME(Integer numberOfExpC, List<Contact> relatedListCont){
        List<ExpenseCard__c> testListEC = returnExpenseCardWithoutME(numberOfExpC, relatedListCont);
        insert testListEC;
        return testListEC;
    }

    public static List<ExpenseCard__c> returnExpenseCardWithoutME(Integer numberOfExpC, List<Contact> relatedListCont){
        List<ExpenseCard__c> testListEC = new List<ExpenseCard__c>();
        for(Integer i=0; i<numberOfExpC; i++){
            ExpenseCard__c ec = new ExpenseCard__c(
                Name = 'testExp'+i,
                Amount__c = i+1,
                CardKeeper__c = relatedListCont.get(i).Id,
                CardDate__c = Date.today(),
                Description__c = 'testDescription'+i
            );
            testListEC.add(ec);
        }
        return testListEC;
    }

    public static List<Contact> insertReturnContactsWithoutME(Integer numberOfContacts, List<Account> relatedListAccount){
        List<Contact> testListCont = returnContactsWithoutME(numberOfContacts, relatedListAccount);
        insert testListCont;
        return testListCont;
    }

    public static List<Contact> returnContactsWithoutME(Integer numberOfContacts, List<Account> relatedListAccount){
        List<Contact> testListCont = new List<Contact>();
        for(Integer i=0; i<numberOfContacts; i++){
            Contact cont = new Contact(
                LastName = 'testCont'+i,
                Email = 'testt'+i+'@t.t',
                Password__c = 'p',
                Office__c = 'Office 1',
                AccountId = relatedListAccount.get(i).Id
            );
            testListCont.add(cont);
        }
        return testListCont;
    }
}

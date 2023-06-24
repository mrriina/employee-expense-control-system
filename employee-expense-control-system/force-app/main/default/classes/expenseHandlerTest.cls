@isTest
public with sharing class expenseHandlerTest {
    
    public static final Integer month = System.Today().month();
    public static final Integer year = System.Today().year();
    public static final Integer numberOfRecords = 2;
    public static List<Account> testListAccounts = new List<Account>();
    public static List<Contact> testListContacts = new List<Contact>();
    public static List<Monthly_Expense__c> testListMonthlyExpense = new List<Monthly_Expense__c>();
    public static List<ExpenseCard__c> testListExpenseCard = new List<ExpenseCard__c>();

    static {
        testListAccounts = TestFactory.insertReturnAccounts(numberOfRecords);
        testListContacts = TestFactory.insertReturnContacts(numberOfRecords, testListAccounts);
        testListMonthlyExpense = TestFactory.insertReturnMonthlyExpense(numberOfRecords, testListContacts);
        testListExpenseCard = TestFactory.insertReturnExpenseCard(numberOfRecords, testListContacts, testListMonthlyExpense);

    }

    @isTest 
    public static void testGetOffice() {
        Test.startTest();
        String office = expenseHandler.getOffice(testListContacts.get(0).Id);
        Test.stopTest();
        System.assertEquals('Office 1', office);   
    }

    @isTest 
    public static void testGetBalance() {
        Test.startTest();
        Integer balance = expenseHandler.getBalance(testListContacts.get(0).Id, year);
        Test.stopTest();
        System.assert(balance != null);   
    }

    @isTest 
    public static void testGetTotalAmount() {
        Test.startTest();
        Integer amount = expenseHandler.getTotalAmount(testListContacts.get(0).Id, year);
        Test.stopTest();
        System.assert(amount != null);   
    }

    @isTest 
    public static void testGetAmount() {
        Test.startTest();
        Integer amount = expenseHandler.getAmount(testListContacts.get(0).Id, month, year);
        Test.stopTest();
        System.assert(amount != null);   
    }

    @isTest 
    public static void testGetTotalIncome() {
        Test.startTest();
        Integer income = expenseHandler.getTotalIncome(testListContacts.get(0).Id, year);
        Test.stopTest();
        System.assert(income != null);   
    }

    @isTest 
    public static void testGetIncome() {
        Test.startTest();
        Integer income = expenseHandler.getIncome(testListContacts.get(0).Id, month, year);
        Test.stopTest();
        System.assert(income != null);   
    }

    @isTest 
    public static void testGetMonthExp() {
        Test.startTest();
        List<Monthly_Expense__c> monthExp = expenseHandler.getMonthExp(month, year, testListContacts.get(0).Id);
        Test.stopTest();
        System.assert(monthExp.size() > 0);   
    }

    @isTest 
    public static void testGetExpCards() {
        Test.startTest();
        List<ExpenseCard__c> expCards = expenseHandler.getExpCards(testListMonthlyExpense.get(0).Id);
        Test.stopTest();
        System.assert(expCards.size() > 0);   
    }

    @isTest 
    public static void testDeleteExpCards() {
        Id recordId = testListExpenseCard.get(0).Id;
        Test.startTest();
        expenseHandler.deleteExpCards(recordId);
        Test.stopTest();
        ExpenseCard__c ec = [
            SELECT Id, IsDeleted 
            FROM ExpenseCard__c
            WHERE Id =: recordId
            ALL ROWS
        ];
        System.assertEquals(ec.IsDeleted, true);   
    }

    @isTest 
    public static void testNewExpenseCard() {
        String amountString = '45';
        String dateString = String.valueOf(System.Today());
        String descriptionString = 'testDescription';
        Test.startTest();
        expenseHandler.newExpenseCard(amountString, dateString, descriptionString, testListContacts.get(0).Id);
        Test.stopTest();
        ExpenseCard__c ec = [
            SELECT Id, Amount__c, CardDate__c, Description__c, CardKeeper__c
            FROM ExpenseCard__c
            WHERE CardKeeper__c =: testListContacts.get(0).Id
            AND Amount__c = 45
            AND CardDate__c = TODAY
        ];
        System.assert(ec.Id != null);   
    }

    @isTest 
    public static void testNewIncome() {
        String amountString = '45';
        String dateString = String.valueOf(System.Today());
        Test.startTest();
        expenseHandler.newIncome(amountString, dateString, testListContacts.get(0).Id);
        Test.stopTest();
        Monthly_Expense__c me = [
            SELECT Id, Balance__c, Month_Date__c, Keeper__c
            FROM Monthly_Expense__c
            WHERE Keeper__c =: testListContacts.get(0).Id
            AND Balance__c = 45
            AND Month_Date__c = TODAY
        ];
        System.assert(me.Id != null);   
    }
}

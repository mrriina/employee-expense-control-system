@isTest
public with sharing class expenseCardTriggerHandlerTest {
    
    public static final Integer month = System.Today().month();
    public static final Integer year = System.Today().year();
    public static final Integer numberOfRecords = 2;
    public static List<Account> testListAccounts = new List<Account>();
    public static List<Contact> testListContacts = new List<Contact>();
    public static List<Contact> testListContactsWithoutME = new List<Contact>();
    public static List<Monthly_Expense__c> testListMonthlyExpense = new List<Monthly_Expense__c>();
    public static List<ExpenseCard__c> testListExpenseCard = new List<ExpenseCard__c>();
    public static List<ExpenseCard__c> testListExpenseCardWithoutME = new List<ExpenseCard__c>();

    static {
        testListAccounts = TestFactory.insertReturnAccounts(numberOfRecords);
        testListContacts = TestFactory.insertReturnContacts(numberOfRecords, testListAccounts);
        testListMonthlyExpense = TestFactory.insertReturnMonthlyExpense(numberOfRecords, testListContacts);
        testListContactsWithoutME = TestFactory.insertReturnContactsWithoutME(numberOfRecords, testListAccounts);

    }

    @isTest 
    public static void testExpenseCardMethod() {
        Test.startTest();
        testListExpenseCard = TestFactory.insertReturnExpenseCard(numberOfRecords, testListContacts, testListMonthlyExpense);
        testListExpenseCardWithoutME = TestFactory.insertReturnExpenseCardWithoutME(numberOfRecords, testListContactsWithoutME);
        Test.stopTest();
        Monthly_Expense__c me = [
            SELECT Id, Keeper__c
            FROM Monthly_Expense__c
            WHERE Keeper__c = :testListExpenseCardWithoutME.get(0).CardKeeper__c
            LIMIT 1
        ];
        System.assert(me != null);   
    }
}

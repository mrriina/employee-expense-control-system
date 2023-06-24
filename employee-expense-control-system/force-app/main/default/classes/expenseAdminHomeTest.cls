@isTest
public with sharing class expenseAdminHomeTest {
    
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
    public static void testGetMonthAmount() {
        Test.startTest();
        Integer amount = expenseAdminHome.getMonthAmount(testListAccounts.get(0), month, year);
        Test.stopTest();
        System.assert(amount != null);   
    }

    @isTest 
    public static void testGetTotalMonths() {
        Test.startTest();
        Integer total = expenseAdminHome.getTotalMonths(testListAccounts.get(0), year);
        Test.stopTest();
        System.assert(total != null);   
    }

    @isTest 
    public static void testGetBalanceNow() {
        Test.startTest();
        Integer balance = expenseAdminHome.getBalanceNow(testListAccounts.get(0), year);
        Test.stopTest();
        System.assert(balance != null);   
    }

    @isTest 
    public static void testGetMonthlyAvg() {
        Test.startTest();
        Decimal avg = expenseAdminHome.getMonthlyAvg(testListAccounts.get(0), year);
        Test.stopTest();
        System.assert(avg != null);   
    }

    @isTest 
    public static void testGetSummMonthAmount() {
        Test.startTest();
        Integer summ = expenseAdminHome.getSummMonthAmount(month, year);
        Test.stopTest();
        System.assert(summ != null);   
    }

    @isTest 
    public static void testGetSummTotalAmount() {
        Test.startTest();
        Integer summ = expenseAdminHome.getSummTotalAmount(year);
        Test.stopTest();
        System.assert(summ != null);   
    }
}
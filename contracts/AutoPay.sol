// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract AutoPay{   

    constructor(){
        owner = msg.sender;
    }

    struct Employee{
        uint256 id;
        string name;
        string phone;
        address payable employeeAddress;
        address employerAddress;
        uint256 salary;
        uint256 balance;
    }

    using Counters for Counters.Counter;
    using SafeMath for uint256;
    Counters.Counter private ids;
    address owner;
    uint256 public balance;
    mapping(uint256 => Employee) employeeDetails;
    mapping(address => uint256[]) employeList;
    mapping(address => uint256) employerBalance;


    function addEmployee(string memory _name,string memory _phone,address payable _employeeAddress,uint256 _salary) public  returns(uint256){
        Employee memory newEmployee = Employee(ids.current(),_name,_phone,_employeeAddress,msg.sender,_salary,0);
        employeeDetails[ids.current()] = newEmployee;
        employeList[msg.sender].push(ids.current());
        ids.increment();
        return ids.current();
    }

    function getEmployee(uint256 _id) public view returns(Employee memory){
        Employee memory employee = employeeDetails[_id];
        require(employee.employerAddress==msg.sender,"You dont own this employee");
        return employee;
    }

    function getEmployes() public view returns(Employee[] memory){
        uint256[] memory list = employeList[msg.sender];
        Employee[] memory stuff = new Employee[](list.length);
        for(uint i=0;i<list.length;i++){
            stuff[i] = employeeDetails[list[i]];
        }
        return stuff;
    }    

    function depositMoney(address _address) public payable{
        employerBalance[_address] = employerBalance[_address].add(msg.value);
        balance = balance.add(msg.value);
    }

    function getBalance() public view returns(uint256){
        return employerBalance[msg.sender];
    }

    function sendMoney(uint256 _id,uint256 _amount) public returns(address){
        Employee memory employee = employeeDetails[_id];
        require(employee.employerAddress==msg.sender,"You dont own this employee");
        require(employerBalance[msg.sender]>=_amount,"You dont have insufficient funds");
        employerBalance[msg.sender] = employerBalance[msg.sender].sub(_amount);
        employee.balance = employee.balance.add(_amount);
        balance = balance.sub(_amount);
        bool sent = employee.employeeAddress.send(_amount);
        require(sent,"An error occured");
        return employee.employeeAddress;
    }

    function payOne(uint256 _id) public returns(bool){
        Employee memory employee = employeeDetails[_id];
        require(employee.employerAddress==msg.sender,"You dont own this employee");
        uint256 salary = employee.salary;
        require(employerBalance[msg.sender]>=salary,"You dont have insufficient funds");
        employerBalance[msg.sender] = employerBalance[msg.sender].sub(salary);
        balance = balance.sub(salary);
        employee.balance = employee.balance.add(salary);
        bool sent = employee.employeeAddress.send(salary);
        require(sent,"An error occured");
        return sent;
    }

    function payAll() public returns(bool){
        uint256 sum = 0;
        uint256[] memory list = employeList[msg.sender];
        for(uint i=0;i<list.length;i++){
            Employee memory employee = employeeDetails[list[i]];
            uint salary = employee.salary;
            require(employerBalance[msg.sender]>=salary,"You dont have insufficient funds");
            employee.balance = employee.balance.add(salary);
            sum = sum.add(salary);
            payable(employee.employeeAddress).transfer(salary);
        }
        employerBalance[msg.sender] = employerBalance[msg.sender].sub(sum);
        balance = balance.sub(sum);
        return true;
    }

    function withdrawBalance() public returns(bool){
        uint256 bal = employerBalance[msg.sender];
        require(employerBalance[msg.sender]>0,"Not enough balance to withdraw");
        employerBalance[msg.sender] = employerBalance[msg.sender].sub(bal);
        balance = balance.sub(bal);
        bool sent = payable(msg.sender).send(bal);
        return sent;
    }

    function getEmployeeCount() public view returns(uint256){
        return employeList[msg.sender].length;
    }



}
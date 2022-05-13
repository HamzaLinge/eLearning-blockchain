pragma solidity 0.8.9;

contract Authentication {

    struct User{
        address addressAccount;
        string password;
        string firstName;
        string familyName;
        string typeUser;
    }

    mapping(address => User) private users;

    modifier youCanSignUp() {
        require(users[msg.sender].addressAccount != msg.sender, "You're already signed up");
        _;
    }
    modifier youCanLogIn() {
        require(users[msg.sender].addressAccount == msg.sender, "You have de sign up first");
        _;
    }

    constructor () {

    }

    function signUp(string memory _firstName, string memory _familyName, string memory _typeUser, string memory _password)
    public returns (bool) {
        users[msg.sender].addressAccount = msg.sender;
        users[msg.sender].password = _password;
        users[msg.sender].firstName = _firstName;
        users[msg.sender].familyName = _familyName;
        users[msg.sender].typeUser = _typeUser;
        return true;
    }

    function areYouAlreadySignUp() public view returns (bool) {
        if(users[msg.sender].addressAccount == msg.sender) return true;
        return false;
    }

    function doesPasswordCorrect(string memory _password) public view returns (bool) {
        if(keccak256(bytes(users[msg.sender].password)) == keccak256(bytes(_password))) return true;
        return false;
    }

    function logIn() public view returns(address, string memory, string memory, string memory) {
        return (msg.sender, users[msg.sender].firstName, users[msg.sender].familyName, users[msg.sender].typeUser);
    }

    function test() public view returns(string memory) {
        return ("Baghdad ca va ?");
    }
}

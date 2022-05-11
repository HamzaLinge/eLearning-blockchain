pragma solidity 0.8.9;

//library StringUtils {
//    /// @dev Does a byte-by-byte lexicographical comparison of two strings.
//    /// @return a negative number if `_a` is smaller, zero if they are equal
//    /// and a positive numbe if `_b` is smaller.
//    function compare(string _a, string _b) returns (int) {
//        bytes memory a = bytes(_a);
//        bytes memory b = bytes(_b);
//        uint minLength = a.length;
//        if (b.length < minLength) minLength = b.length;
//        //@todo unroll the loop into increments of 32 and do full 32 byte comparisons
//        for (uint i = 0; i < minLength; i ++)
//            if (a[i] < b[i])
//                return -1;
//            else if (a[i] > b[i])
//                return 1;
//        if (a.length < b.length)
//            return -1;
//        else if (a.length > b.length)
//            return 1;
//        else
//            return 0;
//    }
//    /// @dev Compares two strings and returns true iff they are equal.
//    function equal(string _a, string _b) returns (bool) {
//        return compare(_a, _b) == 0;
//    }
//    /// @dev Finds the index of the first occurrence of _needle in _haystack
//    function indexOf(string _haystack, string _needle) returns (int)
//    {
//        bytes memory h = bytes(_haystack);
//        bytes memory n = bytes(_needle);
//        if(h.length < 1 || n.length < 1 || (n.length > h.length))
//            return -1;
//        else if(h.length > (2**128 -1)) // since we have to be able to return -1 (if the char isn't found or input error), this function must return an "int" type with a max length of (2^128 - 1)
//            return -1;
//        else
//        {
//            uint subindex = 0;
//            for (uint i = 0; i < h.length; i ++)
//            {
//                if (h[i] == n[0]) // found the first char of b
//                {
//                    subindex = 1;
//                    while(subindex < n.length && (i + subindex) < h.length && h[i + subindex] == n[subindex]) // search until the chars don't match or until we reach the end of a or b
//                    {
//                        subindex++;
//                    }
//                    if(subindex == n.length)
//                        return int(i);
//                }
//            }
//            return -1;
//        }
//    }
//}

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

    event EventSignUp(
        string firstName,
        string familyName,
        string typeUser
    );

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

    function logIn(string memory _password) public view youCanLogIn() returns(string memory, address, string memory, string memory, string memory) {
//        if(StringUtils.equal(users[msg.sender].password, _password)) return ("", msg.sender, users[msg.sender].firstName, users[msg.sender].familyName, users[msg.sender].typeUser);
//        return ("Incorrect password", msg.sender, "", "", "");
        return ("true", msg.sender, users[msg.sender].firstName, users[msg.sender].familyName, users[msg.sender].typeUser);
    }

    function test() public view returns(string memory) {
        return ("Baghdad ca va ?");
    }
}

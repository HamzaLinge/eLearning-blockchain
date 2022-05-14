pragma solidity 0.8.9;

contract Authentication {

    struct QCM {
        uint idQcm;
        bool answerFlag;
        uint idAnswer;
    }

    struct Course {
        uint idCourse;
        QCM[] qcm;
    }

    struct User{
        address addressAccount;
        string password;
        string firstName;
        string familyName;
        string typeUser;
        Course[] courses;
    }

    mapping(address => User) private users;

    constructor () {

    }

    //    Users ---------------------------------------------------------

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

    function logIn(string memory _password) public view returns(address, string memory, string memory, string memory) {
        if(keccak256(bytes(users[msg.sender].password)) == keccak256(bytes(_password))) {
            return (msg.sender, users[msg.sender].firstName, users[msg.sender].familyName, users[msg.sender].typeUser);
        }
        return (msg.sender, "", "", "");
    }

    //    Courses ---------------------------------------------------------

    function getCoursesOfStudent(address _idStudent, uint _idCourse) public view returns(Course[] memory){
        return users[_idStudent].courses;
    }

    function newCourseForStudent(address _adrStudent, uint _idCourse, uint _idQcm, bool _answerFlag, uint _idAnswer) public returns (bool) {
        QCM memory qcm = QCM(_idQcm, _answerFlag, _idAnswer);
        Course memory course;
        course.idCourse = _idCourse;
        course.qcm = new QCM[];
        course.qcm.push(qcm);
        users[_adrStudent].courses.push(course);
        return true;
    }

    function addQcmOfCourseForStudent(address _adrStudent, uint _idCourse, uint _idQcm, bool _answerFlag, uint _idAnswer) public returns (bool) {
        QCM memory qcm = QCM(_idQcm, _answerFlag, _idAnswer);
        for(uint8 i = 0; i < users[_adrStudent].courses.length; i++){
            if(users[_adrStudent].courses[i].idCourse == _idCourse) {
                users[_adrStudent].courses[i].qcm.push(qcm);
                break;
            }
        }
        return true;
    }
}

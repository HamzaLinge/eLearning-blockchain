pragma solidity 0.8.13;

contract Authentication {

    struct QuestionAnswer {
        uint idQuestion;
        uint idAnswer;
    }

    struct User{
        address addressAccount;
        string password;
        string firstName;
        string familyName;
        string typeUser;
    }

    mapping (address => User) private users;
    mapping (address => uint[]) private keysCourses;
    mapping (address => mapping (uint => QuestionAnswer[])) private questionsAnswers;

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
        return (address(0), "", "", "");
    }

    //    Courses ---------------------------------------------------------

    function ifCourseExistsForStudent(uint _idCourse) public view returns(bool){
        for(uint i = 0; i < keysCourses[msg.sender].length; i++){
            if(keysCourses[msg.sender][i] == _idCourse) return true;
        }
        return false;
    }

    function addNewCourseToStudent(uint _idCourse, uint[] memory _idQuestions, uint[] memory _idAnswers) public returns(bool _success){
        keysCourses[msg.sender].push(_idCourse);
        for(uint i = 0; i < _idQuestions.length; i++){
            QuestionAnswer memory questionAnswer = QuestionAnswer({idQuestion: _idQuestions[i], idAnswer: _idAnswers[i]});
            questionsAnswers[msg.sender][_idCourse].push(questionAnswer);
        }
        return true;
    }

    function getQuestionsAnswersOfCourseForStudent(uint _idCourse) public view returns(QuestionAnswer[] memory){
        return questionsAnswers[msg.sender][_idCourse];
    }

    function getIdCoursesOfStudent() public view returns(uint[] memory){
        return keysCourses[msg.sender];
    }
}

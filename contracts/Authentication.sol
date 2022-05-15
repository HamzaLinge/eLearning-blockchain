pragma solidity 0.8.13;

contract Authentication {

    struct QuestionAnswer {
        uint idCourse;
        uint idQuestionAnswer;
        bool answerFlag;
        uint idAnswer;
    }

    struct User{
        address addressAccount;
        string password;
        string firstName;
        string familyName;
        string typeUser;
    }

    mapping(address => User) private users;
    mapping(address => QuestionAnswer[]) private questionsAnswers;

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

    function getCoursesOfStudent(address _idStudent) public view returns(QuestionAnswer[] memory){
        return questionsAnswers[_idStudent];
    }

    function newCourseForStudent(address _adrStudent, uint _idCourse, uint _idAnswerQuestion, bool _answerFlag, uint _idAnswer) public returns (bool) {
        QuestionAnswer memory questionAnswer;
        questionAnswer.idQuestionAnswer = _idAnswerQuestion;
        questionAnswer.answerFlag = _answerFlag;
        questionAnswer.idAnswer = _idAnswer;
        questionAnswer.idCourse = _idCourse;
        questionsAnswers[_adrStudent].push(questionAnswer);
        return true;
    }

    function addQuestionAnswerOfCourseForStudent(address _adrStudent, uint _idCourse, uint _answerQuestion, bool _answerFlag, uint _idAnswer) public returns (bool) {
        QuestionAnswer memory questionAnswer = QuestionAnswer(_idCourse, _answerQuestion, _answerFlag, _idAnswer);
        questionsAnswers[_adrStudent].push(questionAnswer);
        return true;
    }
}

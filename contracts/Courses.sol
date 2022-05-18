pragma solidity 0.8.13;

contract Courses {

    struct QuestionAnswer {
        string question;
        string answer;
    }

    struct Course {
        uint idCourse;
        string title;
        string resume;
        string urlPdf;
        string urlImage;
        uint timestamp;
    }

    constructor () {
        nbrCourses = 0;
    }

    uint private nbrCourses;
    mapping (uint => Course) private courses;
    mapping (uint => uint) private countQuestionsAnswers;
    mapping (uint => QuestionAnswer[]) private questionsAnswers;
    mapping (uint => uint) private countCertifiedStudents;
    mapping (uint => address[]) private certifiedStudents;

    function newCourse (string memory _title, string memory _resume, string memory _urlPdf, string memory _urlImage) public returns (bool _success){

        courses[nbrCourses].idCourse = nbrCourses;
        courses[nbrCourses].title = _title;
        courses[nbrCourses].resume = _resume;
        courses[nbrCourses].urlPdf = _urlPdf;
        courses[nbrCourses].urlImage = _urlImage;
        courses[nbrCourses].timestamp = block.timestamp;
        nbrCourses++;
        countQuestionsAnswers[nbrCourses] = 1;
        return true;
    }

    function ifCoursesIsEmpty() public view returns (bool _success) {
        if(nbrCourses > 0) return false;
        return true;
    }

    function getCourses() public view returns (Course[] memory){
        Course[] memory arrCourses = new Course[](nbrCourses);
        for(uint8 i = 0; i < nbrCourses; i++){
            Course storage course = courses[i];
            arrCourses[i] = course;
        }
        return arrCourses;
    }

    function addQuestionAnswerToCourse(uint _idCourse, string memory _question, string memory _answer) public returns(bool _success){
        QuestionAnswer memory questionAnswer;
        questionAnswer.question = _question;
        questionAnswer.answer = _answer;
        questionsAnswers[_idCourse].push(questionAnswer);
        countQuestionsAnswers[_idCourse]++;
        return true;
    }

    function getCourseById(uint _idCourse) public view returns (Course memory, QuestionAnswer[] memory){
        uint _countQA = countQuestionsAnswers[_idCourse];
        QuestionAnswer[] memory arrQuestionsAnswers = new QuestionAnswer[](_countQA);
        for(uint8 i = 0; i < _countQA; i++){
            QuestionAnswer storage questionAnswer = questionsAnswers[_idCourse][i];
            arrQuestionsAnswers[i] = questionAnswer;
        }
        return (courses[_idCourse], arrQuestionsAnswers);
    }

    function addAddressCertifiedStudent(uint _idCourse, address _adrStudent) public returns(bool _success){
        certifiedStudents[_idCourse].push(_adrStudent);
        return true;
    }

    function getAddressesCertifiedStudentsByCourseID(uint _idCourse) public view returns(address[] memory){
        return certifiedStudents[_idCourse];
    }
}

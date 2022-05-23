pragma solidity 0.8.13;

contract Courses {

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

    struct Answer {
        string text;
        bool flag;
    }

    struct QuestionAnswer {
        string question;
        uint length;
        mapping (uint => Answer) answers;
    }

    uint private nbrCourses;
    mapping (uint => Course) private courses;
    mapping (uint => uint) private countQuestionsAnswers;
    mapping (uint => QuestionAnswer[]) private questionsAnswers;
    mapping (uint => uint) private countCertifiedStudents;
    mapping (uint => address[]) private certifiedStudents;

    function addAnswersToQuestionsOfCourse(uint _idCourse, uint _indexQuestion, string[] memory _answers, bool[] memory _flags) public returns(bool _success){
        for(uint i = 0; i < _answers.length; i++){
            questionsAnswers[_idCourse][_indexQuestion].answers[i].text = _answers[i];
            questionsAnswers[_idCourse][_indexQuestion].answers[i].flag = _flags[i];
        }
        questionsAnswers[_idCourse].length = _answers.length;
        return true;
    }

    function addQuestionToCourse(uint _idCourse, string memory _question) public returns(bool _success){
        questionsAnswers[_idCourse].push(QuestionAnswer({question: _question, length: 0}));
        return true;
    }

    function newCourse (string memory _title, string memory _resume, string memory _urlPdf, string memory _urlImage) public returns (bool _success){
        courses[nbrCourses].idCourse = nbrCourses;
        courses[nbrCourses].title = _title;
        courses[nbrCourses].resume = _resume;
        courses[nbrCourses].urlPdf = _urlPdf;
        courses[nbrCourses].urlImage = _urlImage;
        courses[nbrCourses].timestamp = block.timestamp;
        nbrCourses++;
        countQuestionsAnswers[nbrCourses] = 0;
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

    function getAnswersOfQuestion(uint _idCourse, uint _indexQuestion) public view returns(string[] memory){
        string[] memory answers;
        for(uint i; i < questionsAnswers[_idCourse][_indexQuestion].length; i++){
            answers.push(questionsAnswers[_idCourse][_indexQuestion].answers[i]);
        }
        return answers;
    }

    function getQuestionsOfCourse(uint _idCourse) public view returns(string[] memory){
        string[] memory questions;
        for(uint i = 0; i < questionsAnswers[_idCourse].length; i++){
            questions.push(questionsAnswers[_idCourse][i].question);
        }
        return questions;
    }

//    function getCourseById(uint _idCourse) public view returns (Course memory, QuestionAnswer[] memory){
//        uint _countQA = countQuestionsAnswers[_idCourse];
//        QuestionAnswer[] memory arrQuestionsAnswers = new QuestionAnswer[](_countQA);
//        for(uint8 i = 0; i < _countQA; i++){
//            QuestionAnswer storage questionAnswer = questionsAnswers[_idCourse][i];
//            arrQuestionsAnswers[i] = questionAnswer;
//        }
//        return (courses[_idCourse], arrQuestionsAnswers);
//    }

    function addAddressCertifiedStudent(uint _idCourse, address _adrStudent) public returns(bool _success){
        certifiedStudents[_idCourse].push(_adrStudent);
        return true;
    }

    function getAddressesCertifiedStudentsByCourseID(uint _idCourse) public view returns(address[] memory){
        return certifiedStudents[_idCourse];
    }
}

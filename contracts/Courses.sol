pragma solidity 0.8.9;

contract Courses{

    uint private nbrCourses = 0;

    struct QuestionAnswer {
        string question;
        string[] answers;
    }

    struct Course {
        uint id;
        string title;
        string resume;
        string urlPdf;
        string urlImage;
        string timestamp;
        QuestionAnswer[] QCM;
        address[] certifiedStudents;
    }

    struct CourseForUser {
        uint idCourse;
        string title;
        string resume;
        string urlPdf;
        string urlImage;
        string timestamp;
    }

    mapping (uint => Course)public courses;

    function newCourse (string memory _title, string memory _resume, string memory _urlPdf, string memory _urlImage) public returns (bool){
        nbrCourses++;
        courses[nbrCourses].id = nbrCourses;
        courses[nbrCourses].title = _title;
        courses[nbrCourses].resume = _resume;
        courses[nbrCourses].urlPdf = _urlPdf;
        courses[nbrCourses].urlImage = _urlImage;
        courses[nbrCourses].timestamp = "2022-05-14";
        return true;
    }

    function getCourses() public view returns (CourseForUser[] memory){
        CourseForUser[] memory arrCourseForUser;
        for(uint8 i = 1; i <= nbrCourses; i++){
            CourseForUser memory courseForUser = CourseForUser(i, courses[i].title, courses[i].resume, courses[i].urlPdf, courses[i].urlImage, courses[i].timestamp);
            arrCourseForUser.push(courseForUser);
        }
        return arrCourseForUser;
    }

    function addQuestionAnswerToQcmCourse(uint _idCourse, string memory _question, string[] memory _answers) public returns(bool){
        QuestionAnswer memory questionAnswer = QuestionAnswer(_question, _answers);
        courses[_idCourse].QCM.push(questionAnswer);
        return true;
    }

    function getCourseById(uint _idCourse) public view returns (Course memory){
        return courses[_idCourse];
    }

    function addAddressCertifiedStudent(uint _idCourse, address _adrStudent) public returns(bool){
        courses[_idCourse].certifiedStudents.push(_adrStudent);
        return true;
    }

    function getAddressesCertifiedStudentsByCourseID(uint _idCourse) public view returns(address[] memory){
        return courses[_idCourse].certifiedStudents;
    }
}

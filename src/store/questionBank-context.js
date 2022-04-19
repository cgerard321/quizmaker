import React from "react";

const QuestionBankContext = React.createContext({
    questions: [],
    addQuestion: (question) => {},
    removeQuestion: (id) => {},
    editQuestion: (id, question) => {},
});

export default QuestionBankContext;

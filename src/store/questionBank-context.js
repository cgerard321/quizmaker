import React from "react";

const QuestionBankContext = React.createContext({
    questionBank: [],
    addQuestion: (question) => {},
    removeQuestion: (id) => {},
    editQuestion: (id, question) => {},
});

export default QuestionBankContext;

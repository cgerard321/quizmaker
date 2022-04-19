import { useReducer } from 'react';
import QuestionBankContext from "./questionBank-context";

const defaultQuestionBankState = {
    questions: []
};

const questionBankReducer = (state, action) => {

    return defaultQuestionBankState;
};

const QuestionBankProvider = (props) => {

    const [questionBankState, dispatchQuestionBankAction] = useReducer(questionBankReducer, defaultQuestionBankState);

    const addQuestionToQuestionBankHandler = (question) => {
        dispatchQuestionBankAction({type: 'ADD', question: question})
    }

    const removeQuestionFromQuestionBankHandler = (id) => {
        dispatchQuestionBankAction({type: 'REMOVE', id: id})
    }

    const editQuestionFromQuestionBankHandler = (id, question) => {
        dispatchQuestionBankAction({type: 'EDIT', id: id, question: question})
    }

    const questionBankContext = {
        questions: questionBankState.questions,
        addQuestion: addQuestionToQuestionBankHandler,
        removeQuestion: removeQuestionFromQuestionBankHandler,
        editQuestion: editQuestionFromQuestionBankHandler
    };

    return (
        <QuestionBank.Provider value={questionBankContext}>
            {props.children}
        </QuestionBank.Provider>
    )
};
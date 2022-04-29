import { useReducer } from 'react';
import QuestionBankContext from "./questionBank-context";

const defaultQuestionBankState = {
    questionBank: []
};

const questionBankReducer = (state, action) => {

    if (action.type === 'ADD') {
        const existingQuestionBank = state.questionBank;
        let updatedQuestionBank = existingQuestionBank.push(action.question);
        return {
            questionBank: updatedQuestionBank
        };
    }

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
        questionBank: questionBankState.questionBank,
        addQuestion: addQuestionToQuestionBankHandler,
        removeQuestion: removeQuestionFromQuestionBankHandler,
        editQuestion: editQuestionFromQuestionBankHandler
    };

    return (
        <QuestionBankContext.Provider value={questionBankContext}>
            {props.children}
        </QuestionBankContext.Provider>
    )
};

export default QuestionBankProvider;
export function updateQuestionCategories(question_categories, questionbank) {
    //this could probably be done with a hashmap
    question_categories.length = 0;
    for (var i = 0; i < questionbank.length; i++) {
        if (question_categories.indexOf(questionbank[i].category) == -1)
            question_categories.push(questionbank[i].category);
            //console.log("Updating question categories");
    }
};
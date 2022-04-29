import { defaultQuestion } from "./defaultQuestion";
import { getDumCatKey } from "./getDumCatKey";
import * as Constants from "../../../constants/questionBankConstants.js";

export function loadXMLFile(questionbank, myFile) {
    let current_category = "top";

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(myFile, "text/xml");

    const xmlQList = xmlDoc.getElementsByTagName("question");
    //console.log('# Number of xml questions: ' + xmlQList.length);

    for (let i = 0; i < xmlQList.length; i++) {
        //make a deep clone of defaultquestion by serializing it and then deserializing it
        const question = JSON.parse(JSON.stringify(defaultQuestion));

        question.type = xmlQList[i].getAttribute("type");
        question.category = current_category;

        //what are question tags?
        if (xmlQList[i].getElementsByTagName("tag").length !== 0) {
            //if there are any question tags, read them
            //console.log("Question has tags");
            var t = xmlQList[i].getElementsByTagName("tag");
            //console.log("number of question tags ", t.length);
            for (var k = 0; k < t.length; k++) {
                question.tags.push(t[k].getElementsByTagName("text")[0].childNodes[0].nodeValue);
                //console.log("question.tags: ")
            }
        }

        switch (question.type) {
            case "category": {
                //console.log("question.type is 'category'");
                question.category = xmlQList[i].getElementsByTagName("text")[0].firstChild.nodeValue; //read the full category path
                current_category = question.category;
                //store as the current category, which will be assigned to all following questions
                question.name = question.category.substring(question.category.lastIndexOf("/") + 1); //name the dummy question
                if (getDumCatKey(question.category, questionbank) === -1) {
                    //if it doesn't already exist, store the category as a dummy question in the database
                    questionbank.push(question);
                }
                break;
            }
            case "description": {
                //console.log("question.type is 'description'");
                question.name = xmlQList[i].getElementsByTagName("text")[0].firstChild.nodeValue;
                question.question_text = xmlQList[i]
                    .getElementsByTagName("questiontext")[0]
                    .getElementsByTagName("text")[0].childNodes[0].nodeValue;
                questionbank.push(question); //store the imported question in the database
                break;
            }
            case "essay": {
                //console.log("question.type is 'essay'");
                question.name = xmlQList[i].getElementsByTagName("text")[0].firstChild.nodeValue;
                question.question_text = xmlQList[i]
                    .getElementsByTagName("questiontext")[0]
                    .getElementsByTagName("text")[0].childNodes[0].nodeValue;
                question.default_grade = xmlQList[i].getElementsByTagName("defaultgrade")[0].childNodes[0].nodeValue;
                question.penalty = xmlQList[i].getElementsByTagName("penalty")[0].childNodes[0].nodeValue;
                questionbank.push(question); //store the imported question in the database
                break;
            }
            case "truefalse": {
                console.log("question.type is 'truefalse'");
                question.name = xmlQList[i].getElementsByTagName("text")[0].firstChild.nodeValue;
                question.question_text = xmlQList[i]
                    .getElementsByTagName("questiontext")[0]
                    .getElementsByTagName("text")[0].childNodes[0].nodeValue;

                if (
                    xmlQList[i].getElementsByTagName("defaultgrade")[0] &&
                    xmlQList[i].getElementsByTagName("defaultgrade")[0].childNodes[0]
                ) {
                    question.default_grade =
                        xmlQList[i].getElementsByTagName("defaultgrade")[0].childNodes[0].nodeValue;
                } else {
                    //if the defaultgrade is empty, make it 1 
                    question.default_grade = 1;
                }

                if (
                    xmlQList[i].getElementsByTagName("penalty")[0] &&
                    xmlQList[i].getElementsByTagName("penalty")[0].childNodes[0]
                ) {
                    question.penalty = xmlQList[i].getElementsByTagName("penalty")[0].childNodes[0].nodeValue;
                } else {
                    //if the penalty is empty, make it 1
                    question.penalty = 1;
                }

                let choices = xmlQList[i].getElementsByTagName("answer");

                for (let choice_nr = 0; choice_nr < choices.length; choice_nr++) {
                    if (
                        choices[choice_nr].getElementsByTagName("text")[0] &&
                        choices[choice_nr].getElementsByTagName("text")[0].childNodes[0]
                    )
                        if (choices[choice_nr].getElementsByTagName("text")[0].childNodes[0].nodeValue === "") {
                            //if the choice contains no text, we won't import it
                            continue;
                        } else {
                            question.choices.push(
                                choices[choice_nr].getElementsByTagName("text")[0].childNodes[0].nodeValue,
                            );
                        }

                    if (choices[choice_nr].getAttribute("fraction")) {
                        question.value.push(choices[choice_nr].getAttribute("fraction"));
                    } else {
                        question.value.push(0);
                    }

                    if (
                        choices[choice_nr].getElementsByTagName("feedback")[0] &&
                        choices[choice_nr].getElementsByTagName("feedback")[0].childNodes[0]
                    ) {
                        question.feedback.push(
                            choices[choice_nr].getElementsByTagName("feedback")[0].childNodes[0].nodeValue,
                        );
                    }
                }
                questionbank.push(question); //store the imported question in the database
                break;
            }
            case "multichoice": {
                console.log("question.type is 'truefalse'");
                question.name = xmlQList[i].getElementsByTagName("text")[0].firstChild.nodeValue;
                question.question_text = xmlQList[i]
                    .getElementsByTagName("questiontext")[0]
                    .getElementsByTagName("text")[0].childNodes[0].nodeValue;
                if (xmlQList[i].getElementsByTagName("single")[0])
                    question.single_answer =
                        xmlQList[i].getElementsByTagName("single")[0].childNodes[0].nodeValue === "true";
                if (xmlQList[i].getElementsByTagName("shuffleanswers")[0])
                    question.shuffle_answers =
                        xmlQList[i].getElementsByTagName("shuffleanswers")[0].childNodes[0].nodeValue === "1";
                if (xmlQList[i].getElementsByTagName("answernumbering")[0])
                    question.numbering = Constants.answer_numbering.indexOf(
                        xmlQList[i].getElementsByTagName("answernumbering")[0].childNodes[0].nodeValue,
                    );
                if (
                    xmlQList[i].getElementsByTagName("defaultgrade")[0] &&
                    xmlQList[i].getElementsByTagName("defaultgrade")[0].childNodes[0]
                ) {
                    question.default_grade =
                        xmlQList[i].getElementsByTagName("defaultgrade")[0].childNodes[0].nodeValue;
                } else {
                    question.default_grade = 1;
                } //if the defaultgrade is empty, make it 1
                if (
                    xmlQList[i].getElementsByTagName("penalty")[0] &&
                    xmlQList[i].getElementsByTagName("penalty")[0].childNodes[0]
                ) {
                    question.penalty = xmlQList[i].getElementsByTagName("penalty")[0].childNodes[0].nodeValue;
                } else {
                    question.penalty = 0.33;
                } //if the defaultgrade is empty, make it 0.33

                let choices = xmlQList[i].getElementsByTagName("answer");
                for (let choice_nr = 0; choice_nr < choices.length; choice_nr++) {
                    if (
                        choices[choice_nr].getElementsByTagName("text")[0] &&
                        choices[choice_nr].getElementsByTagName("text")[0].childNodes[0]
                    )
                        if (choices[choice_nr].getElementsByTagName("text")[0].childNodes[0].nodeValue === "") {
                            //if the choice contains no text, we won't import it
                            continue;
                        } 
                        else {
                            question.choices.push(
                                choices[choice_nr].getElementsByTagName("text")[0].childNodes[0].nodeValue,
                            );
                        }

                    if (choices[choice_nr].getAttribute("fraction"))
                        question.value.push(choices[choice_nr].getAttribute("fraction"));
                    else question.value.push(0);

                    if (
                        choices[choice_nr].getElementsByTagName("feedback")[0] &&
                        choices[choice_nr].getElementsByTagName("feedback")[0].childNodes[0]
                    )
                        question.feedback.push(
                            choices[choice_nr].getElementsByTagName("feedback")[0].childNodes[0].nodeValue,
                        );
                }

                questionbank.push(question); //store the imported question in the database
                break;
            }

            default: {
                break;
            }
        } //end switch
    } //end for
}

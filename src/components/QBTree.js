import { faThermometerEmpty } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import WidgetTree from "./QuestionBankSection/CheckboxTree";

const QBTree = (props) => {

    const myFile = props.file;
    console.log(myFile);

    let nodes = [];

    let questionbank = [
        {
            "type": "category",
            "category": "top",
            "name": "Default question",
            "question_text": "This is your question text",
            "tags": [],
            "choices": [],
            "feedback": [],
            "value": [],
            "general_feedback": "",
            "default_grade": 1,
            "penalty": 0.33,
            "case_sensitive": false,
            "numbering": 0,
            "shuffle_answers": true,
            "single_answer": true,
            "tolerance": [],
            "unitgradingtype": 0,
            "unitpenalty": 0,
            "showunits": 0,
            "unitsleft": 0,
            "unitname": [],
            "multiplier": [],
            "subquestion_text": [],
            "subquestion_answer": [],
            "image_name": "",	//for dragdropmarker-type
            "image_data": "",
            "drag_no": [],
            "drag_text": [],
            "drag_noofdrags": [],
            "drop_no": [],
            "drop_shape": [],
            "drop_coords": [],
            "drop_choice": [],
            "issue": ""
        }
    ];

    console.log("1 questionbank length: " + questionbank.length);

    let question_categories = []; //use this to keep track of the categories
    console.log('14 question_categories.length: ' + question_categories.length);

    const new_file = () => {
        current_question = 0;
        questionbank.length = 0;
        var question = {
            "type": "category",
            "name": "top",
            "category": "top",
            "issue": ""
        };
        questionbank.push(question);
        //display_questionbank();
    }

    const get_dumcat_key = (cat) => {
        for (var k = 0; k < questionbank.length; k++) {
            if (questionbank[k].type == "category" && questionbank[k].category == cat) { return (k); }
        }
        return (-1);
    }

    const postLoadHousekeeping = (questionbank) => {
        console.log('10 questionbank.length: ' + questionbank.length);
        let numcats = 0;
        //go through all imported categories and, if needed, create dummy questions for the empty categories
        for (let i = 0; i < length; i++) {
            if (questionbank[i].type == "category") {
                numcats++;
                var cats = questionbank[i].category.split("/");   //split every category ("top/first/second") into categories ("top,first,second")
                var dum_cats = "";
                for (var k = 0; k < cats.length; k++) {
                    if (k == 0)
                        dum_cats += cats[k];
                    else
                        dum_cats += "/" + cats[k];   //check if there is already a dummy category for this one in the question bank
                    if (get_dumcat_key(dum_cats) == -1) //if the dummy category is not yet in the question bank, because it's empty, we'll create it
                    {
                        var q = { "name": "", "type": "category", "category": "" };
                        q.name = dum_cats.substring(dum_cats.lastIndexOf("/") + 1);
                        q.category = dum_cats;
                        questionbank.push(q);
                        console.log("Created missing empty question: " + dum_cats);
                    }
                }
            }
        }

        if (numcats == 0) {	//this can happen when you export a single question in Moodle and not the entire questionbank
            var q = { "name": "top", "type": "category", "category": "top" };
            questionbank.push(q);
            console.log("Created missing empty question: top");
        }
        return questionbank;
    }//end postLoadHousekeeping


    const loadFile = (questionbank, myFile) => {

        console.log('6 questionbank length: ' + questionbank.length);

        let current_category = 'top';


        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(myFile, "text/xml");

        questionbank.length = 0;
        const x = xmlDoc.getElementsByTagName("question");
        console.log('# Number of question tags: ' + x.length);

        for (let i = 0; i < x.length; i++) {
            let question = {
                key: { i },
                "type": "category",
                "choices": [],
                "feedback": [],
                "value": [],
                "tags": [],
                "tolerance": [],
                "multiplier": [],
                "unitname": [],
                "subquestion_text": [],
                "subquestion_answer": [],
                "image_name": "",	//for dragdropmarker-type
                "image_data": "",
                "drag_no": [],
                "drag_text": [],
                "drag_noofdrags": [],
                "drop_no": [],
                "drop_shape": [],
                "drop_coords": [],
                "drop_choice": [],
                "issue": ""
            };

            question.type = x[i].getAttribute('type');
            question.category = current_category;
            if (x[i].getElementsByTagName("tag"))	//if there are any question tags, read them
            {
                var t = x[i].getElementsByTagName("tag");
                for (var k = 0; k < t.length; k++) {
                    question.tags.push(t[k].getElementsByTagName('text')[0].childNodes[0].nodeValue);
                }
            }

            switch (question.type) {
                case "category": {
                    question.category = x[i].getElementsByTagName('text')[0].firstChild.nodeValue;  //read the full category path
                    console.log('20 question.category: ' + question.category);
                    current_category = question.category;   //store the current category, which will be assigned to all following questions
                    question.name = question.category.substring(question.category.lastIndexOf("/") + 1);  //name the dummy question (not really necessary though)
                    if (get_dumcat_key(question.category) == -1) {
                        console.log('21 question.category: ' + question.category);
                        questionbank.push(question);	//if it doesn't already exist, store the category as a dummy question in the database
                    }
                    break;
                }
                case "shortanswer":
                    {
                        question.name = x[i].getElementsByTagName('text')[0].firstChild.nodeValue;
                        question.question_text = x[i].getElementsByTagName('questiontext')[0].getElementsByTagName('text')[0].childNodes[0].nodeValue;
                        if (x[i].getElementsByTagName('usecase')[0])
                            question.case_sensitive = (x[i].getElementsByTagName('usecase')[0].childNodes[0].nodeValue == "1");
                        if (x[i].getElementsByTagName('defaultgrade')[0] && x[i].getElementsByTagName('defaultgrade')[0].childNodes[0]) { question.default_grade = x[i].getElementsByTagName('defaultgrade')[0].childNodes[0].nodeValue; } else { question.default_grade = 1; }	//if the defaultgrade is empty, make it 1
                        if (x[i].getElementsByTagName('penalty')[0] && x[i].getElementsByTagName('penalty')[0].childNodes[0]) { question.penalty = x[i].getElementsByTagName('penalty')[0].childNodes[0].nodeValue; } else { question.penalty = 0.33; }	//if the defaultgrade is empty, make it 0.33

                        var choices = x[i].getElementsByTagName('answer');
                        for (var choice_nr = 0; choice_nr < choices.length; choice_nr++) {
                            if (choices[choice_nr].getElementsByTagName('text')[0] && choices[choice_nr].getElementsByTagName('text')[0].childNodes[0])
                                if (choices[choice_nr].getElementsByTagName('text')[0].childNodes[0].nodeValue == "") { continue; }	//if the choice contains no text, we won't import it
                                else { question.choices.push(choices[choice_nr].getElementsByTagName('text')[0].childNodes[0].nodeValue); }

                            if (choices[choice_nr].getAttribute('fraction'))
                                question.value.push(choices[choice_nr].getAttribute('fraction'));
                            else question.value.push(0);

                            if (choices[choice_nr].getElementsByTagName('feedback')[0] && choices[choice_nr].getElementsByTagName('feedback')[0].childNodes[0])
                                question.feedback.push(choices[choice_nr].getElementsByTagName('feedback')[0].childNodes[0].nodeValue);
                        }

                        questionbank.push(question);	//store the imported question in the database	
                        break;
                    }
                case "multichoice":
                    {
                        question.name = x[i].getElementsByTagName('text')[0].firstChild.nodeValue;
                        question.question_text = x[i].getElementsByTagName('questiontext')[0].getElementsByTagName('text')[0].childNodes[0].nodeValue;
                        if (x[i].getElementsByTagName('single')[0])
                            question.single_answer = (x[i].getElementsByTagName('single')[0].childNodes[0].nodeValue == "true");
                        if (x[i].getElementsByTagName('shuffleanswers')[0])
                            question.shuffle_answers = (x[i].getElementsByTagName('shuffleanswers')[0].childNodes[0].nodeValue == "1");
                        if (x[i].getElementsByTagName('answernumbering')[0])
                            question.numbering = answer_numbering.indexOf(x[i].getElementsByTagName('answernumbering')[0].childNodes[0].nodeValue);
                        if (x[i].getElementsByTagName('defaultgrade')[0] && x[i].getElementsByTagName('defaultgrade')[0].childNodes[0]) { question.default_grade = x[i].getElementsByTagName('defaultgrade')[0].childNodes[0].nodeValue; } else { question.default_grade = 1; }	//if the defaultgrade is empty, make it 1
                        if (x[i].getElementsByTagName('penalty')[0] && x[i].getElementsByTagName('penalty')[0].childNodes[0]) { question.penalty = x[i].getElementsByTagName('penalty')[0].childNodes[0].nodeValue; } else { question.penalty = 0.33; }	//if the defaultgrade is empty, make it 0.33

                        var choices = x[i].getElementsByTagName('answer');
                        for (var choice_nr = 0; choice_nr < choices.length; choice_nr++) {
                            if (choices[choice_nr].getElementsByTagName('text')[0] && choices[choice_nr].getElementsByTagName('text')[0].childNodes[0])
                                if (choices[choice_nr].getElementsByTagName('text')[0].childNodes[0].nodeValue == "") { continue; }	//if the choice contains no text, we won't import it
                                else { question.choices.push(choices[choice_nr].getElementsByTagName('text')[0].childNodes[0].nodeValue); }

                            if (choices[choice_nr].getAttribute('fraction'))
                                question.value.push(choices[choice_nr].getAttribute('fraction'));
                            else question.value.push(0);

                            if (choices[choice_nr].getElementsByTagName('feedback')[0] && choices[choice_nr].getElementsByTagName('feedback')[0].childNodes[0])
                                question.feedback.push(choices[choice_nr].getElementsByTagName('feedback')[0].childNodes[0].nodeValue);
                        }

                        questionbank.push(question);	//store the imported question in the database		
                        break;
                    }
                case "truefalse":
                    {
                        question.name = x[i].getElementsByTagName('text')[0].firstChild.nodeValue;
                        question.question_text = x[i].getElementsByTagName('questiontext')[0].getElementsByTagName('text')[0].childNodes[0].nodeValue;
                        if (x[i].getElementsByTagName('defaultgrade')[0] && x[i].getElementsByTagName('defaultgrade')[0].childNodes[0]) { question.default_grade = x[i].getElementsByTagName('defaultgrade')[0].childNodes[0].nodeValue; } else { question.default_grade = 1; }	//if the defaultgrade is empty, make it 1
                        if (x[i].getElementsByTagName('penalty')[0] && x[i].getElementsByTagName('penalty')[0].childNodes[0]) { question.penalty = x[i].getElementsByTagName('penalty')[0].childNodes[0].nodeValue; } else { question.penalty = 1; }	//if the defaultgrade is empty, make it 1

                        var choices = x[i].getElementsByTagName('answer');
                        for (var choice_nr = 0; choice_nr < choices.length; choice_nr++) {
                            if (choices[choice_nr].getElementsByTagName('text')[0] && choices[choice_nr].getElementsByTagName('text')[0].childNodes[0])
                                if (choices[choice_nr].getElementsByTagName('text')[0].childNodes[0].nodeValue == "") { continue; }	//if the choice contains no text, we won't import it
                                else { question.choices.push(choices[choice_nr].getElementsByTagName('text')[0].childNodes[0].nodeValue); }

                            if (choices[choice_nr].getAttribute('fraction'))
                                question.value.push(choices[choice_nr].getAttribute('fraction'));
                            else question.value.push(0);

                            if (choices[choice_nr].getElementsByTagName('feedback')[0] && choices[choice_nr].getElementsByTagName('feedback')[0].childNodes[0])
                                question.feedback.push(choices[choice_nr].getElementsByTagName('feedback')[0].childNodes[0].nodeValue);
                        }

                        questionbank.push(question);	//store the imported question in the database		
                        break;
                    }
                case "ddwtos":	//the new "drag and drop into text"-questiontype
                    {
                        question.name = x[i].getElementsByTagName('text')[0].firstChild.nodeValue;
                        question.question_text = x[i].getElementsByTagName('questiontext')[0].getElementsByTagName('text')[0].childNodes[0].nodeValue;
                        if (x[i].getElementsByTagName('defaultgrade')[0] && x[i].getElementsByTagName('defaultgrade')[0].childNodes[0]) { question.default_grade = x[i].getElementsByTagName('defaultgrade')[0].childNodes[0].nodeValue; } else { question.default_grade = 1; }	//if the defaultgrade is empty, make it 1
                        if (x[i].getElementsByTagName('penalty')[0] && x[i].getElementsByTagName('penalty')[0].childNodes[0]) { question.penalty = x[i].getElementsByTagName('penalty')[0].childNodes[0].nodeValue; } else { question.penalty = 1; }	//if the defaultgrade is empty, make it 1
                        if (x[i].getElementsByTagName('shuffleanswers')[0])
                            question.shuffle_answers = (x[i].getElementsByTagName('shuffleanswers')[0].childNodes[0].nodeValue == "1");

                        var choices = x[i].getElementsByTagName('dragbox');
                        for (var choice_nr = 0; choice_nr < choices.length; choice_nr++) {
                            if (choices[choice_nr].getElementsByTagName('text')[0] && choices[choice_nr].getElementsByTagName('text')[0].childNodes[0])
                                if (choices[choice_nr].getElementsByTagName('text')[0].childNodes[0].nodeValue == "") { continue; }	//if the choice contains no text, we won't import it
                                else { question.choices.push(choices[choice_nr].getElementsByTagName('text')[0].childNodes[0].nodeValue); }

                            if (choices[choice_nr].getElementsByTagName('group')[0] && choices[choice_nr].getElementsByTagName('group')[0].childNodes[0])
                                question.value.push(choices[choice_nr].getElementsByTagName('group')[0].childNodes[0].nodeValue);				//we'll store the group number in the value-array, because we don't need it for this question type
                        }
                        questionbank.push(question);	//store the imported question in the database		
                        break;
                    }
                case "numerical":
                    {
                        question.name = x[i].getElementsByTagName('text')[0].firstChild.nodeValue;
                        question.question_text = x[i].getElementsByTagName('questiontext')[0].getElementsByTagName('text')[0].childNodes[0].nodeValue;

                        if (x[i].getElementsByTagName('unitgradingtype')[0])
                            question.unitgradingtype = (x[i].getElementsByTagName('unitgradingtype')[0].childNodes[0].nodeValue);

                        if (x[i].getElementsByTagName('unitpenalty')[0])
                            question.unitpenalty = (x[i].getElementsByTagName('unitpenalty')[0].childNodes[0].nodeValue);

                        if (x[i].getElementsByTagName('showunits')[0])
                            question.showunits = (x[i].getElementsByTagName('showunits')[0].childNodes[0].nodeValue);

                        if (x[i].getElementsByTagName('unitsleft')[0])
                            question.unitsleft = (x[i].getElementsByTagName('unitsleft')[0].childNodes[0].nodeValue);

                        if (x[i].getElementsByTagName('defaultgrade')[0] && x[i].getElementsByTagName('defaultgrade')[0].childNodes[0]) { question.default_grade = x[i].getElementsByTagName('defaultgrade')[0].childNodes[0].nodeValue; } else { question.default_grade = 1; }	//if the defaultgrade is empty, make it 1

                        if (x[i].getElementsByTagName('penalty')[0] && x[i].getElementsByTagName('penalty')[0].childNodes[0]) { question.penalty = x[i].getElementsByTagName('penalty')[0].childNodes[0].nodeValue; } else { question.penalty = 0.33; }	//if the defaultgrade is empty, make it 0.33

                        var choices = x[i].getElementsByTagName('answer');	//get all the answers
                        for (var choice_nr = 0; choice_nr < choices.length; choice_nr++) {
                            if (choices[choice_nr].getElementsByTagName('text')[0] && choices[choice_nr].getElementsByTagName('text')[0].childNodes[0])
                                if (choices[choice_nr].getElementsByTagName('text')[0].childNodes[0].nodeValue == "") { continue; }	//if the choice contains no text, we won't import it
                                else { question.choices.push(choices[choice_nr].getElementsByTagName('text')[0].childNodes[0].nodeValue); }

                            if (choices[choice_nr].getAttribute('fraction'))
                                question.value.push(choices[choice_nr].getAttribute('fraction'));
                            else question.value.push(0);

                            if (choices[choice_nr].getElementsByTagName('feedback')[0] && choices[choice_nr].getElementsByTagName('feedback')[0].childNodes[0])
                                question.feedback.push(choices[choice_nr].getElementsByTagName('feedback')[0].childNodes[0].nodeValue);

                            if (choices[choice_nr].getElementsByTagName('tolerance')[0] && choices[choice_nr].getElementsByTagName('tolerance')[0].childNodes[0])
                                question.tolerance.push(choices[choice_nr].getElementsByTagName('tolerance')[0].childNodes[0].nodeValue);
                            else question.tolerance.push(0);
                        }
                        var units = x[i].getElementsByTagName('unit');
                        for (var unit_nr = 0; unit_nr < units.length; unit_nr++) {
                            if (units[unit_nr].getElementsByTagName('multiplier')[0] && units[unit_nr].getElementsByTagName('multiplier')[0].childNodes[0])
                                question.multiplier.push(units[unit_nr].getElementsByTagName('multiplier')[0].childNodes[0].nodeValue);
                            if (units[unit_nr].getElementsByTagName('unit_name')[0] && units[unit_nr].getElementsByTagName('unit_name')[0].childNodes[0])
                                question.unitname.push(units[unit_nr].getElementsByTagName('unit_name')[0].childNodes[0].nodeValue);
                            console.log("Importing unit");
                        }

                        questionbank.push(question);	//store the imported question in the database	
                        break;
                    }
                case "matching":
                    {
                        question.name = x[i].getElementsByTagName('text')[0].firstChild.nodeValue;
                        question.question_text = x[i].getElementsByTagName('questiontext')[0].getElementsByTagName('text')[0].childNodes[0].nodeValue;
                        if (x[i].getElementsByTagName('defaultgrade')[0] && x[i].getElementsByTagName('defaultgrade')[0].childNodes[0]) { question.default_grade = x[i].getElementsByTagName('defaultgrade')[0].childNodes[0].nodeValue; } else { question.default_grade = 1; }	//if the defaultgrade is empty, make it 1
                        if (x[i].getElementsByTagName('penalty')[0] && x[i].getElementsByTagName('penalty')[0].childNodes[0]) { question.penalty = x[i].getElementsByTagName('penalty')[0].childNodes[0].nodeValue; } else { question.penalty = 0.33; }	//if the defaultgrade is empty, make it 0.33
                        if (x[i].getElementsByTagName('shuffleanswers')[0])
                            question.shuffle_answers = (x[i].getElementsByTagName('shuffleanswers')[0].childNodes[0].nodeValue == "true");	//for some reason this is true/false, not 1/0 like in multichoice questions
                        var subquestions = x[i].getElementsByTagName('subquestion');
                        for (var subquestion_nr = 0; subquestion_nr < subquestions.length; subquestion_nr++) {
                            if (subquestions[subquestion_nr].getElementsByTagName('text')[0] && subquestions[subquestion_nr].getElementsByTagName('text')[0].childNodes[0])
                                question.subquestion_text.push(strip_html(subquestions[subquestion_nr].getElementsByTagName('text')[0].childNodes[0].nodeValue, 1));
                            if (subquestions[subquestion_nr].getElementsByTagName('answer')[0] && subquestions[subquestion_nr].getElementsByTagName('answer')[0].childNodes[0])
                                question.subquestion_answer.push(strip_html(subquestions[subquestion_nr].getElementsByTagName('answer')[0].getElementsByTagName('text')[0].childNodes[0].nodeValue, 1));	//the format is <subquestion><text></text><answer><text></text></answer></subquestion>
                        }
                        questionbank.push(question);	//store the imported question in the database	
                        break;
                    }
                case "ddmarker":
                    {
                        question.name = x[i].getElementsByTagName('text')[0].firstChild.nodeValue;
                        question.question_text = x[i].getElementsByTagName('questiontext')[0].getElementsByTagName('text')[0].childNodes[0].nodeValue;
                        if (x[i].getElementsByTagName('defaultgrade')[0] && x[i].getElementsByTagName('defaultgrade')[0].childNodes[0]) { question.default_grade = x[i].getElementsByTagName('defaultgrade')[0].childNodes[0].nodeValue; } else { question.default_grade = 1; }	//if the defaultgrade is empty, make it 1
                        if (x[i].getElementsByTagName('penalty')[0] && x[i].getElementsByTagName('penalty')[0].childNodes[0]) { question.penalty = x[i].getElementsByTagName('penalty')[0].childNodes[0].nodeValue; } else { question.penalty = 0.33; }	//if the defaultgrade is empty, make it 0.33
                        if (x[i].getElementsByTagName('shuffleanswers')[0]) question.shuffle_answers = "true"; else question.shuffle_answers = "false";

                        question.image_name = x[i].getElementsByTagName('file')[0].getAttribute('name');
                        question.image_data = x[i].getElementsByTagName('file')[0].childNodes[0].nodeValue;

                        var drag = x[i].getElementsByTagName('drag');
                        for (var drag_nr = 0; drag_nr < drag.length; drag_nr++) {
                            if (drag[drag_nr].getElementsByTagName('no')[0] && drag[drag_nr].getElementsByTagName('no')[0].childNodes[0])	//get the "No"-value
                                question.drag_no.push(drag[drag_nr].getElementsByTagName('no')[0].childNodes[0].nodeValue);
                            if (drag[drag_nr].getElementsByTagName('text')[0] && drag[drag_nr].getElementsByTagName('text')[0].childNodes[0])
                                question.drag_text.push(strip_html(drag[drag_nr].getElementsByTagName('text')[0].childNodes[0].nodeValue, 1));	//get the text of this drag.
                            if (drag[drag_nr].getElementsByTagName('noofdrags')[0] && drag[drag_nr].getElementsByTagName('noofdrags')[0].childNodes[0])	//get the "Noofdrags"-value
                                question.drag_noofdrags.push(drag[drag_nr].getElementsByTagName('noofdrags')[0].childNodes[0].nodeValue);
                            if (drag[drag_nr].getElementsByTagName('infinite')[0]) question.drag_noofdrags[drag_nr] = 0;

                        }

                        var drop = x[i].getElementsByTagName('drop');
                        for (var drop_nr = 0; drop_nr < drop.length; drop_nr++) {
                            if (drop[drop_nr].getElementsByTagName('no')[0] && drop[drop_nr].getElementsByTagName('no')[0].childNodes[0])	//get the "No"-value
                                question.drop_no.push(drop[drop_nr].getElementsByTagName('no')[0].childNodes[0].nodeValue);
                            if (drop[drop_nr].getElementsByTagName('shape')[0] && drop[drop_nr].getElementsByTagName('shape')[0].childNodes[0])
                                question.drop_shape.push(strip_html(drop[drop_nr].getElementsByTagName('shape')[0].childNodes[0].nodeValue, 1));	//get the shape of this drop.
                            if (drop[drop_nr].getElementsByTagName('coords')[0] && drop[drop_nr].getElementsByTagName('coords')[0].childNodes[0])	//get the coordinates of this drop
                                question.drop_coords.push(drop[drop_nr].getElementsByTagName('coords')[0].childNodes[0].nodeValue);
                            if (drop[drop_nr].getElementsByTagName('choice')[0] && drop[drop_nr].getElementsByTagName('choice')[0].childNodes[0])	//get the "Choice"-value
                                question.drop_choice.push(parseInt(drop[drop_nr].getElementsByTagName('choice')[0].childNodes[0].nodeValue) - 1);	//Moodle starts counting these at 1, so let's subtract 1 to start at 0. It'll avoid confusion later on. When we save this question type, we'll add 1 again to make Moodle happy.
                        }
                        questionbank.push(question);	//store the imported question in the database	
                        break;
                    }
                default: {
                    break;
                }

            } //end switch
        } //end for
        console.log("2 questionbank length: " + questionbank.length);
        return questionbank;
    }//end loadfile

    // function find_issues(nr, questionbank) {
    //     if (nr < 0 || questionbank[nr].type == "category") return questionbank;
    //     questionbank[nr].issue = "";
    //     switch (questionbank[nr].type) {
    //         case "category": {
    //             break;
    //         }
    //         case "shortanswer": {
    //             if (questionbank[nr].choices.length == 0) questionbank[nr].issue += "No answers.\x0A";
    //             if (questionbank[nr].value.indexOf("100") == -1) questionbank[nr].issue += "Shortanswer question without a 100% correct answer.\x0A";
    //             break;
    //         }
    //         case "numerical": {
    //             if (questionbank[nr].choices.length == 0) questionbank[nr].issue += "No answers.\x0A";
    //             if (questionbank[nr].value.indexOf("100") == -1) questionbank[nr].issue += "Numerical question without a 100% correct answer.\x0A";
    //             break;
    //         }
    //         case "multichoice": {
    //             if (questionbank[nr].choices.length == 0) questionbank[nr].issue += "No answers.\x0A";
    //             if (questionbank[nr].choices.length < 2) questionbank[nr].issue += "Multiple choice question with fewer than 2 answers.\x0A";
    //             if (questionbank[nr].value.indexOf("100") == -1) questionbank[nr].issue += "Multiple choice question without a 100% correct answer.\x0A";
    //             break;
    //         }
    //         case "ddwtos": {
    //             if (questionbank[nr].choices.length == 0) questionbank[nr].issue += "No answers.\x0A";
    //             count = ddwtos_gap_count(questionbank[nr].question_text);
    //             if (count < 0) questionbank[nr].issue += 'Error in "Drag and Drop into Text"-question text.\x0A';
    //             if (count > questionbank[nr].choices.length) questionbank[nr].issue += '"Drag and Drop into Text"- question has ' + count + ' gaps, but there are only ' + questionbank[nr].choices.length + ' choices.\x0A';
    //             break;
    //         }
    //     }
    //     //If there is an issue in this question, add two red exclamation marks and add a description of the issue to the tooltip of the current node in the tree
    //     var node = $.ui.fancytree.getTree("#tree").getNodeByKey(nr);
    //     if (node == null) return;
    //     if (questionbank[nr].issue == "") { node.fromDict({ tooltip: questionbank[nr].question_text }); node.setTitle(questionbank[nr].name); }
    //     else { node.fromDict({ tooltip: questionbank[nr].issue }); node.setTitle('<span style="color: #FF0000">!! </span>' + questionbank[nr].name); }
    //     return questionbank;
    // }//end find_issues

    // function find_all_issues() {
    //     for (var i = questionbank.length - 1; i >= 0; i--) {
    //         find_issues(i, questionbank);
    //     }
    //     return questionbank;
    // }//end find_all_issues

    function strip_html(t, mode) {
        var repl = t;
        if (mode == 0) {
            for (var tag_nr = 0; tag_nr < del_tags.length; tag_nr++) { repl = repl.replaceAll(del_tags[tag_nr], ""); }
            return (repl);
        }
        if (mode == 1) {
            repl = repl.replace("<![CDATA[", "").replace("]]>", "");
            repl = repl.replace(/<[^>]*>?/gm, '');
            return (repl);
        }
        return (repl);
    }

    function update_question_categories() {
        question_categories.length = 0;
        console.log("3 questionbank length: " + questionbank.length)
        for (var i = 0; i < questionbank.length; i++) {
            console.log('7 questionbank[i].category: ' + questionbank[i].category);
            console.log('8 question_categories.length: ' + question_categories.length);

            if (question_categories.indexOf(questionbank[i].category) == -1) {
                question_categories.push(questionbank[i].category);
                console.log('9 question_categories.length: ' + question_categories.length);
                question_categories.forEach(cat => {
                    console.log('Category: ' + cat);
                });
            }

        }
        return question_categories;
    };

    //prepareTreeNodes(questionbank, nodes){

    // for (var i = 0; i < question_categories.length; i++) {
    //     var cats = question_categories[i].split("/");
    //     var dum_cat = "";
    //     var dum_cat_key = "";

    //     for (var c = 0; c < cats.length; c++) {
    //         if (dum_cat == "") {
    //             dum_cat = cats[c]; 
    //         } else dum_cat += "/" + cats[c];

    //         dum_cat_key = get_dumcat_key(dum_cat);

    //         if (dum_cat_key == -1) { 
    //             console.log("Category " + dum_cat + " not found."); 
    //             continue; 
    //         }	//this should never happen

    //         var already_existing_node = $.ui.fancytree.getTree("#tree").getNodeByKey(dum_cat_key);  //check if the key of this category already exists in the tree



    //         if (already_existing_node)	//if this category already exists in the tree
    //         {
    //             myNodes = already_existing_node;	//...climb the tree one level
    //         }
    //         else {
    //             myNodes = myNodes.addChildren({	//if the node doesn't exist, we add it
    //                 title: cats[c],
    //                 icon: "fancytree/img/category.png",
    //                 folder: true,
    //                 key: dum_cat_key
    //             });
    //             //and then we add all the questions from that category
    //             for (var q = 0; q < questionbank.length; q++) {
    //                 if (questionbank[q].category == myNodes.getPath() && questionbank[q].type != "category") {
    //                     icon = "fancytree/img/icon-" + questionbank[q].type + ".png";	//find the correct icon
    //                     if (questionbank[q].issue == "") {
    //                         txt = questionbank[q].name;
    //                         ttp = questionbank[q].question_text;
    //                     }
    //                     else {
    //                         txt = '<span style="color: #FF0000">!! </span>' + questionbank[q].name;
    //                         ttp = questionbank[q].issue;
    //                     }
    //                     var childNode = myNodes.addChildren({
    //                         title: txt,
    //                         tooltip: ttp,
    //                         icon: icon,
    //                         key: q.toString()
    //                     });
    //                 }
    //             }
    //         }
    //     }
    //}



    //}


    questionbank = loadFile(questionbank, myFile);
    console.log('4 questionbank length: ' + questionbank.length);
    questionbank = postLoadHousekeeping(questionbank);
    console.log('11 questionbank length: ' + questionbank.length);
    questionbank.forEach(question => {
        console.log('Name: ' + question.name);
        console.log('Type: ' + question.type);
        console.log('Category: ' + question.category);
    });
    question_categories = update_question_categories(questionbank);
    console.log('5 question_categories.length: ' + question_categories.length);
    console.log('Value of question_categories[0]: ' + question_categories[0]);

    //questionbank = find_all_issues(questionbank);
    //console.log('12 questionbank length: ' + questionbank.length);

    //needs to be clean by the time we get here.

    //this might work. Got it off stackoverflow: https://stackoverflow.com/questions/18017869/build-tree-array-from-flat-array-in-javascript?page=2&tab=trending#tab-top



    //convert questionbank to format needed by CheckboxTree
    //values are sort of hardcoded right now just to prove the flow.
    //need to identify parents somehow.
    let counter = 0;
    const testbank = questionbank.map(item => {
        const container = {};

        container.id = counter+1;
        container.value = item.name;
        container.label = item.name; //we can format this to fit nicely.
        if (counter === 0) {
            container.parent = 0;
        }
        else {
            container.parent = counter;
        }
        counter++;
        container.children = null;
        return container;
    });

    console.log("Testbank length: " + testbank.length);
    testbank.forEach(question => {
        console.log('Id: ' + question.id);
        console.log('Value: ' + question.value);
        console.log('Label: ' + question.label);
        console.log('Parent: ' + question.parent);
        console.log('Children: ' + question.children);
    });

    function listToTree(data, options) {
        options = options || {};
        var ID_KEY = options.idKey || 'id';
        var PARENT_KEY = options.parentKey || 'parent';
        var CHILDREN_KEY = options.childrenKey || 'children';
      
        var tree = [],
          childrenOf = {};
        var item, id, parentId;
      
        for (var i = 0, length = data.length; i < length; i++) {
          item = data[i];
          id = item[ID_KEY];
          parentId = item[PARENT_KEY] || 0;
          // every item may have children
          childrenOf[id] = childrenOf[id] || [];
          // init its children
          item[CHILDREN_KEY] = childrenOf[id];
          if (parentId != 0) {
            // init its parent's children object
            childrenOf[parentId] = childrenOf[parentId] || [];
            // push it into its parent's children object
            childrenOf[parentId].push(item);
          } else {
            tree.push(item);
          }
        };
      
        return tree;
      }

    
            
    const tree = listToTree(testbank);
   

    tree.forEach(element => {
        console.log("Tree element id: " + element.id);
        console.log("Tree element parent: " + element.parent);
        console.log("Tree element value", + element.value);
        element.children.forEach(child => {
            console.log("Tree child id: " + child.id);
            console.log("Tree child parent: " + child.parent);
            console.log("Tree child value", + child.value);
        })
    });
    console.log(tree)

    //const tree = toTree(testbank);
    //console.log('Tree length: ' + tree.);




    //console.log(questionbank);
    //let nodes1 = prepareTreeNodes(questionbank, nodes, question_categories);
    //console.log(nodes);




    return (
        <WidgetTree nodes={tree}/>
    );

};//end QBTree

export default QBTree;

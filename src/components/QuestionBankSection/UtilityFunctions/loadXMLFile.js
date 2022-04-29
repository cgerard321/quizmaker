import { defaultQuestion } from "./defaultQuestion";
import { getDumCatKey } from "./getDumCatKey";

export function loadXMLFile(questionbank, myFile) {

    let current_category = 'top';

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(myFile, "text/xml");

    const xmlQList = xmlDoc.getElementsByTagName("question");
    //console.log('# Number of xml questions: ' + xmlQList.length);

    for (let i = 0; i < xmlQList.length; i++) {
        //make a deep clone of defaultquestion by serializing it and then deserializing it
        const question = JSON.parse(JSON.stringify(defaultQuestion));

        question.type = xmlQList[i].getAttribute('type');
        question.category = current_category;

        //what are question tags?
        if (xmlQList[i].getElementsByTagName("tag").length != 0)	//if there are any question tags, read them
        {
            //console.log("Question has tags");
            var t = xmlQList[i].getElementsByTagName("tag");
            //console.log("number of question tags ", t.length);
            for (var k = 0; k < t.length; k++) {
                question.tags.push(t[k].getElementsByTagName('text')[0].childNodes[0].nodeValue);
                //console.log("question.tags: ")
            }
        }

        switch (question.type) {
            case "category": {
                //console.log("question.type is 'category'");
                question.category = xmlQList[i].getElementsByTagName('text')[0].firstChild.nodeValue;  //read the full category path
                current_category = question.category;   //store as the current category, which will be assigned to all following questions
                question.name = question.category.substring(question.category.lastIndexOf("/") + 1);  //name the dummy question (not really necessary though)
                if (getDumCatKey(question.category, questionbank) == -1) {
                    questionbank.push(question);	//if it doesn't already exist, store the category as a dummy question in the database
                }
                break;
            }
            case "description":
                {
                    //console.log("question.type is 'description'");
                    question.name = xmlQList[i].getElementsByTagName('text')[0].firstChild.nodeValue;
                    question.question_text = xmlQList[i].getElementsByTagName('questiontext')[0].getElementsByTagName('text')[0].childNodes[0].nodeValue;
                    questionbank.push(question);	//store the imported question in the database	
                    break;
                }
            default: {
                break;
            }

        } //end switch
    } //end for
};



import {download} from "./download.js";
import * as Constants from "../../../constants/questionBankConstants.js";

export function exportXMLFile(fileName, treeData) {

    if (treeData.length < 1) {
        return;
    }

    let current_file = ""; //see if there's a way to keep the file that was open as a default.

    if (fileName === "") {
        current_file = "default.xml"
    }

    else {
        current_file = fileName + ".xml";
    }
    let cat = "";
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n' + '<quiz>\n';

    let len = treeData.length;
    console.log("Saving " + len + " questions"); //see if there's a way to alert the user

    let counter = 0;

    for (let i = 0; i < len; i++) {
        let nr = i;
        let q = treeData[nr].data.question;
        if (q.type == "category") continue;
        counter++;
        if (q.category != cat) {
            xml += '<question type="category">\n<category>\n<text>' + q.category + '</text>\n</category>\n</question>';
            cat = q.category;
        }
        xml += '<question type="' + q.type + '">\n' +
            '<name>\n<text>' + q.name + '</text>\n</name>\n' +
            '<questiontext format="html">\n<text><';
        xml += '![CDATA[' + q.question_text + ']]';
        xml += '></text>\n</questiontext>\n' +
            '<generalfeedback format="html">\n' +
            '<text></text>\n</generalfeedback>\n';

        switch (q.type) {
            case "truefalse": {
                xml += '<defaultgrade>' + q.default_grade + '</defaultgrade>\n' +
                    '<penalty>' + q.penalty + '</penalty>\n' +
                    '<hidden> 0 </hidden>\n' +
                    '<correctfeedback format="html"><text></text></correctfeedback>\n' +
                    '<partiallycorrectfeedback format = "html"><text></text></partiallycorrectfeedback>\n' +
                    '<incorrectfeedback format = "html"><text></text></incorrectfeedback>\n' +
                    '<answer fraction = "' + q.choicesFull[0].value + '" format = "html">\n<text><![CDATA[' + q.choicesFull[0].text + ']]>\n</text>\n<feedback format = "html">\n<text><![CDATA[' + q.choicesFull[0].feedback + ']]></text>\n</feedback>\n</answer>\n' +
                    '<answer fraction = "' + q.choicesFull[1].value + '" format = "html">\n<text><![CDATA[' + q.choicesFull[1].text + ']]>\n</text>\n<feedback format = "html">\n<text><![CDATA[' + q.choicesFull[1].feedback + ']]></text>\n</feedback>\n</answer>\n';
                break;
                //check if true / false need to be hard-coded like in V1.0. 
            }

            case "multichoice": {
                xml += '<defaultgrade>' + q.default_grade + '</defaultgrade>\n' +
                    '<penalty>' + q.penalty + '</penalty>\n' +
                    '<hidden> 0 </hidden>\n' +
                    '<single>' + q.single_answer + '</single>\n' +
                    '<shuffleanswers>' + (q.shuffle_answers ? '1' : '0') + '</shuffleanswers>\n' +
                    '<answernumbering>' + Constants.answer_numbering[q.numbering] + '</answernumbering>\n' +
                    '<correctfeedback format="html"><text></text></correctfeedback>\n' +
                    '<partiallycorrectfeedback format = "html"><text></text></partiallycorrectfeedback>\n' +
                    '<incorrectfeedback format = "html"><text></text></incorrectfeedback>\n';
                for (var c = 0; c < q.choicesFull.length; c++) {
                    console.log("Content of ChoicesFull at position" + c);
                    console.log(q.choicesFull[c]);
                    xml += '<answer fraction = "' + q.choicesFull[c].value + '" format = "html">\n<text><![CDATA[' + q.choicesFull[c].text + ']]>\n</text>\n' +
                        '<feedback format = "html">\n<text><![CDATA[' + q.choicesFull[c].feedback + ']]></text>\n' +
                        '</feedback>\n</answer>\n';
                }
                break;
            }

            case "shortanswer": {
                xml += '<defaultgrade>' + q.default_grade + '</defaultgrade>\n' +
                    '<penalty>' + q.penalty + '</penalty>\n' +
                    '<hidden> 0 </hidden>\n'; '<usecase>' + q.case_sensitive + '</usecase>\n' +
                        '<correctfeedback format="html"><text></text></correctfeedback>\n' +
                        '<partiallycorrectfeedback format = "html"><text></text></partiallycorrectfeedback>\n' +
                        '<incorrectfeedback format = "html"><text></text></incorrectfeedback>\n';
                for (var c = 0; c < q.choicesFull.length; c++) {
                    xml += '<answer fraction = "' + q.choicesFull[c].value + '" format = "html">\n<text><![CDATA[' + q.choicesFull[c].text + ']]>\n</text>\n' +
                        '<feedback format = "html">\n<text ><![CDATA[' + q.choicesFull[c].feedback + ']]></text>\n' +
                        '</feedback>\n</answer>\n';
                }
                break;
            }

            case "essay": {
                xml += '<defaultgrade>' + q.default_grade + '</defaultgrade>\n' +
                    '<penalty>' + q.penalty + '</penalty>\n' +
                    '<hidden> 0 </hidden>\n<correctfeedback format="html"><text></text></correctfeedback>\n' +
                    '<partiallycorrectfeedback format = "html"><text></text></partiallycorrectfeedback>\n' +
                    '<incorrectfeedback format = "html"><text></text></incorrectfeedback>\n';
                break;
            }

            case "description": {
                break;

            }
        }

        if (q.tags[0] != "")
			{
			xml+="<tags>\n";
			for (var tagnr=0;tagnr<q.tags.length;tagnr++)
				{
				xml+="<tag><text>"+q.tags[tagnr]+"</text></tag>\n";
				}
			xml+="</tags>\n";
			}
		xml+='</question>\n';
    }

    xml += '</quiz>';
    download(xml, current_file, "text");
    //alert_box("Downloaded file contains " + counter + " questions");

}
export default function parseMoodleXML(file) {
    //const myFile = evt.target.result;

    const myFile = file;

    const parser = new DOMParser();

    const xmlDoc = parser.parseFromString(myFile, "text/xml");

    let currentCategory = 'top';
    let length = 0;

    const x = xmlDoc.getElementsByTagName("question");

    console.log(x);

    for (let i = 0; i < x.length; i++) {
        let question = {
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
                currentCategory = question.category;   //store the current category, which will be assigned to all following questions
                question.name = question.category.substring(question.category.lastIndexOf("/") + 1);  //name the dummy question (not really necessary though)
                if (get_dumcat_key(question.category) == -1) {
                    questionbank.push(question);	//if it doesn't already exist, store the category as a dummy question in the database
                }
                break;
            }
            default:
                break;
        }
    }

    postLoadHousekeeping();
    return 



    function get_dumcat_key(cat) {
        for (var k = 0; k < questionbank.length; k++) {
            if (questionbank[k].type == "category" && questionbank[k].category == cat) { return (k); }
        }
        return (-1);
    }

    function postLoadHousekeeping() {
        let numcats = 0;
        //go through all imported categories and, if needed, create dummy questions for the empty categories
        for (let i = 0; i < questionbank.length; i++) {
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
    }
}




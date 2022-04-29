import { getDumCatKey } from "./getDumCatKey";

export function postLoadCleanUp(questionbank) {

    let numcats = 0;

    for (var i = 0; i < questionbank.length; i++) {
        if (questionbank[i].type == "category") {
            numcats++;
            var cats = questionbank[i].category.split("/");   //split every category ("top/first/second") into categories ("top,first,second")
            var dum_cats = "";
            for (var k = 0; k < cats.length; k++) {
                if (k == 0)
                    dum_cats += cats[k];
                else
                    dum_cats += "/" + cats[k];   //check if there is already a dummy category for this one in the question bank
                if (getDumCatKey(dum_cats, questionbank) == -1) //if the dummy category is not yet in the question bank, because it's empty, we'll create it
                {
                    var q = { "name": "", "type": "category", "category": "" };
                    q.name = dum_cats.substring(dum_cats.lastIndexOf("/") + 1);
                    q.category = dum_cats;
                    questionbank.push(q);
                    //console.log("Created missing empty question: " + dum_cats);
                }
            }
        }
    }

    if (numcats == 0) {	//this can happen when you export a single question in Moodle and not the entire questionbank
        var q = { "name": "top", "type": "category", "category": "top" };
        questionbank.push(q);
        //console.log("Created missing empty question: top");
    }

}
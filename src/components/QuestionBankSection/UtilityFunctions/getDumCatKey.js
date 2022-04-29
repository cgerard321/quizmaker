export function getDumCatKey(cat, questionbank) {
    for (var k = 0; k < questionbank.length; k++) {
        if (questionbank[k].type === "category" && questionbank[k].category === cat) {
            return k;
        }
    }
    return -1;
}

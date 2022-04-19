export default function parseMoodleXML(evt) {
    const myFile = evt.target.result;

    const parser = new DOMParser();

    const xmlDoc = parser.parseFromString(myFile, "text/xml");
    const x = xmlDoc.getElementsByTagName("question");

    console.log(x);
}

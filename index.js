const axios = require("axios");
const fs = require("fs").promises;

const majors = [
  "Counseling Psychology",
  "Education",
  "Social Work",
  "Psychology",
  "Public Relations",
  "Human Resource Management",
  "Marketing",
  "Speech-Language Pathology",
  "Sociology",
  "Political Science",
];
let data = {};
async function crawlData() {
  try {
    for await (const major of majors) {
      const response = await axios.get(
        `https://www.topuniversities.com/program/endpoint?region=[4009,4008]&country=[PS,AE,BH,IQ,JO,SA,KW,OM,QA,SY,YE,LB,TN,LY,EG,SD,MA,DZ]&study_level=[2]&globalsearch=[${major}]&`
      );

      data = { ...data, [major]: response.data.data };
    }

    // Convert the response data to a JSON string
    const jsonData = JSON.stringify(data, null, 2);

    // Write the JSON data to a file
    await fs.writeFile("data.json", jsonData, "utf8");
    // console.log({ data });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

crawlData();

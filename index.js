const axios = require("axios");
const fs = require("fs").promises;

const majors = [
  "Accounting",
  "Actuarial Science",
  "Advertising",
  "Anthropology",
  "Apparel Design",
  "Architecture",
  "Art",
  "Athletic Training",
  "Biochemistry",
  "Biology",
  "Business Administration",
  "Business Information Technology",
  "Chemistry",
  "Child Life Specialist",
  "Communication Studies",
  "Computer Information Systems",
  "Construction Management",
  "Counseling Psychology",
  "Criminal Justice and Criminology",
  "Dance Performance",
  "Dietetics",
  "Earth Science",
  "Earth/Space Science",
  "Economics",
  "Economics (Business)",
  "Education",
  "Education (Elementary or Secondary)",
  "Education (Secondary)",
  "English",
  "Entrepreneurial Management",
  "Environmental Design",
  "Exercise Science",
  "Family Studies",
  "Fashion Merchandising",
  "Finance",
  "Food Management",
  "Geology",
  "Graphic Arts Management",
  "Health Education and Promotions",
  "Health Science",
  "History",
  "Hospitality Management",
  "Hospitality and Food Management",
  "Human Resource Management",
  "Industrial Technology",
  "Information Systems",
  "Interior Design",
  "International Business",
  "Journalism",
  "Landscape Architecture",
  "Legal Studies",
  "Logistics and Supply Chain Management",
  "Manufacturing Engineering Technology",
  "Marketing",
  "Mathematical Economics",
  "Mathematical Sciences",
  "Mechanical Engineering Technology",
  "Media",
  "Medical Technology",
  "Modern Languages",
  "Music",
  "Music Media Production and Industry",
  "Natural Resources and Environmental Management",
  "Nursing",
  "Philosophy",
  "Physical Education",
  "Physics",
  "Political Science",
  "Pre-Dental",
  "Pre-Law",
  "Pre-Medical",
  "Psychology",
  "Public Relations",
  "Religious Studies",
  "Residential Property Management",
  "Risk Management and Insurance",
  "Secondary Education",
  "Social Work",
  "Sociology",
  "Speech-Language Pathology",
  "Theatre",
  "Urban Planning and Development",
];
async function crawlData() {
  try {
    const pagerlimit = 25;
    let majorsResults = {};
    for await (const major of majors) {
      let majorResults = [];
      let page = 1;
      let total = 26;
      while (total > majorResults.length) {
        const { data } = await axios.get(
          `https://www.topuniversities.com/program/endpoint?region=[4009,4008]&country=[PS,AE,BH,IQ,JO,SA,KW,OM,QA,SY,YE,LB,TN,LY,EG,SD,MA,DZ]&study_level=[2]&globalsearch=[${major}]&page=${page}&pagerlimit=${pagerlimit}`
        );

        total = data.total_count;
        majorResults = [...majorResults, ...data.data];
        console.log(
          `major: ${major}, total: ${total}, currentTotal: ${majorResults.length} `
        );
        page++;
      }
      majorsResults = { ...majorsResults, [major]: majorResults };
    }
    //Convert the response data to a JSON string
    const jsonData = JSON.stringify(majorsResults, null, 2);

    // Write the JSON data to a file
    await fs.writeFile("data.json", jsonData, "utf8");
    // console.log({ data });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

crawlData();

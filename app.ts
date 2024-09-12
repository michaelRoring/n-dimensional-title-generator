import fs from "fs";

// List of templates
const templates = [
  "How ${serviceCategory} can optimize ${specificSolution} for ${industry}",
  "The role of ${serviceCategory} in streamlining ${specificSolution} for ${targetRole}",
  "Why ${serviceCategory} is essential for driving ${businessGoal} in ${industry}",
  "Best practices for ${serviceCategory} to implement ${specificSolution} for ${businessGoal}",
  "How ${serviceCategory} helps ${targetRole} achieve ${businessGoal}",
  "Top benefits of ${specificSolution} through ${serviceCategory} in ${industry}",
  "A complete guide to ${serviceCategory} for ${specificSolution} and its impact on ${targetRole}",
  "How ${specificSolution} from ${serviceCategory} supports ${businessGoal}",
  "How ${serviceCategory} powers ${businessGoal} in the ${industry} sector",
  "Why ${specificSolution} is key for ${targetRole} looking to drive ${businessGoal}",
  "How ${specificSolution} improves ${industry} operations through ${serviceCategory}",
  "Achieving ${businessGoal} with ${serviceCategory} and ${specificSolution}",
  "How ${serviceCategory} enhances ${specificSolution} for ${targetRole}",
  "The impact of ${specificSolution} on ${businessGoal} in the ${industry} landscape",
  "Why ${targetRole} should prioritize ${serviceCategory} for achieving ${businessGoal}",
  "The importance of ${specificSolution} for ${targetRole} in ${industry}",
  "How ${serviceCategory} accelerates ${businessGoal} with ${specificSolution}",
  "What ${targetRole} needs to know about leveraging ${serviceCategory} for ${specificSolution}",
  "The role of ${specificSolution} in supporting ${businessGoal} for ${industry}",
  "Key strategies for ${targetRole} to leverage ${serviceCategory} in ${industry}",
];

const variables: Record<string, string[]> = {
  serviceCategory: ["Martech Enablement", "Managed Services", "Consulting"],
  specificSolution: [
    "CMS Setup (Webflow)",
    "CDP Integration",
    "Data Pipeline Orchestration",
    "Data Visualization",
    "Growth Framework Implementation",
    "Martech Ecosystem Construction",
    "Execution Automation",
    "Grant Application Assistance",
  ],
  industry: [
    "Technology",
    "E-commerce",
    "Finance",
    "Healthcare",
    "Education",
    "Retail",
  ],
  targetRole: [
    "Digital Leader",
    "Marketing Leader",
    "Sales Leader",
    "Product Leader",
    "Growth Team Member",
  ],
  businessGoal: [
    "Hypergrowth",
    "ROI Improvement",
    "Top-line Growth",
    "Bottom-line Optimization",
    "Data-driven Decision Making",
    "Digital Transformation",
  ],
};

// Function to replace placeholders
function replacePlaceholders(
  template: string,
  values: Record<string, string>
): string {
  return template.replace(/\$\{(\w+)\}/g, (_, key) => values[key] || "");
}

// Recursive function to generate combinations dynamically
function generateCombinations(
  keys: string[],
  index: number,
  current: Record<string, string>,
  template: string,
  result: string[]
) {
  if (index === keys.length) {
    // When all variables are set, replace placeholders in the template
    result.push(replacePlaceholders(template, current));
    return;
  }

  const key = keys[index];
  const values = variables[key];

  if (values) {
    for (const value of values) {
      current[key] = value;
      generateCombinations(keys, index + 1, current, template, result);
    }
  }
}

const resultStrings: string[] = [];
const variableKeys = Object.keys(variables); // Extract the keys of the variables (serviceCategory, specificSolution, industry)

// Loop through each template
for (const template of templates) {
  generateCombinations(variableKeys, 0, {}, template, resultStrings);
}

// Write the result to output.json
fs.writeFileSync("./files/output.json", JSON.stringify(resultStrings, null, 2));

console.log("Output written to ./files/output.json");

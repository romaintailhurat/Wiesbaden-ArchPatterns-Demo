import clone from "lodash.clone";

/*
 Aggregates questionnaire to produce a summary.
 Initialized with starting values.
*/
let finalProduct = {
  totalNumberOfRespondents: 0,
  totalNumberOfChildren: 0,
  occupations: []
};

const isOccupationNotExisting = (occupation, finalProduct) => {
  let normalizedOccupation = occupation.toLowerCase();
  return !finalProduct.occupations.find(
    el => el.occupation === normalizedOccupation
  );
};

const process = questionnaire => {
  console.log("Processing questionnaire", questionnaire);
  // Update the product
  let newProduct = clone(finalProduct);
  newProduct.totalNumberOfRespondents = newProduct.totalNumberOfRespondents + 1;
  newProduct.totalNumberOfChildren =
    newProduct.totalNumberOfChildren + parseInt(questionnaire.children);
  if (isOccupationNotExisting(questionnaire.occupation, finalProduct)) {
    let normOccupation = questionnaire.occupation.toLowerCase();
    let newOccupation = { occupation: normOccupation, num: 1 };
    newProduct.occupations.push(newOccupation);
  } else {
    let normOccupation = questionnaire.occupation.toLowerCase();
    let entry = newProduct.occupations.find(
      el => el.occupation === normOccupation
    );
    entry.num += 1;
  }
  // Store
  finalProduct = newProduct;
  console.log("Update final product", newProduct);
  return newProduct;
};

export default process;

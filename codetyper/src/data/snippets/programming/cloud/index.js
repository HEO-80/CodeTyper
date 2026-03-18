// src/data/snippets/programming/cloud/index.js

import azure from "./azure/index.js";
import aws   from "./aws/index.js";
import exam  from "./exam/index.js";

export default {
  beginner:     [...azure.slice(0, 2), ...aws.slice(0, 2)],
  intermediate: [...azure.slice(2, 4), ...aws.slice(2, 4)],
  advanced:     [...azure.slice(4),    ...aws.slice(4), ...exam],
};
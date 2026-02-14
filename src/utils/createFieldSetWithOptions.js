/**
 * @typedef Config
 * @property {number} step
 * @property {number} value
 * @property {string} desc
 * @property {boolean} disabled
 */

import createFieldSet from "../components/createFieldSet";
import createInput from "../components/createInput";
import createLabel from "../components/createLabel";

/**
 *
 * @param {string} id
 * @param {*} options
 * @param {Config} config
 */
function createFieldSetWithOptions(id, options, config) {
  const fieldSet = createFieldSet(id);

  // Attach Label
  const label = createLabel(
    id,
    "fieldset",
    config?.desc ? `${id} - ${config.desc}` : id
  );
  document.getElementById("config").appendChild(label);

  // Attach Options
  const entries = Object.entries(options);

  // Hidden input to store the selected value (read by getConfig)
  const hiddenInput = document.createElement("input");
  hiddenInput.setAttribute("id", id);
  hiddenInput.setAttribute("type", "hidden");
  hiddenInput.setAttribute("value", `${config?.value || 0}`);

  const optionsKeys = Object.keys(options);

  if (optionsKeys.includes("TRUE") && optionsKeys.includes("FALSE")) {
    hiddenInput.setAttribute("data-type", "boolean");
  }

  if (config?.disabled) {
    hiddenInput.setAttribute("disabled", "disabled");
    fieldSet.style = "background-color: rgb(255 0 0 / 20%);";
  }

  // Create Descriptions
  const descriptions = document.createElement("div");
  descriptions.setAttribute("id", `${id}-descriptions`);

  // Attach Options Container
  const optionsContainer = document.createElement("div");
  optionsContainer.setAttribute("id", `${id}-options`);
  optionsContainer.setAttribute("class", "range-options");

  entries.forEach(([option, desc], i) => {
    // Append Description
    const optionElement = document.createElement("span");
    optionElement.innerText = `${desc}`;
    if (i === +`${config?.value || 0}`) {
      optionElement.style = "display: show;";
      hiddenInput.setAttribute("data-prev-value", `${i}`);
    } else {
      optionElement.style = "display: none;";
    }
    optionElement.setAttribute("id", `${id}-descriptions-${option}`);
    descriptions.appendChild(optionElement);

    // Append Option Button
    const optionBtn = document.createElement("div");
    optionBtn.setAttribute("id", `${id}-option-${option}`);
    optionBtn.innerText = `${option}`;
    if (i === +`${config?.value || 0}`) {
      optionBtn.setAttribute("class", "selected");
    }
    if (!config?.disabled) {
      optionBtn.onclick = () => {
        const previous = hiddenInput.getAttribute("data-prev-value") || 0;
        const keys = Object.keys(options);

        // Update description visibility
        const currentId = `${id}-descriptions-${keys[i]}`;
        const previousId = `${id}-descriptions-${keys[previous]}`;
        document.getElementById(currentId).style = "display: show;";
        document.getElementById(previousId).style = "display: none;";

        // Update selected button
        const previousOption = `${id}-option-${keys[previous]}`;
        document.getElementById(previousOption).removeAttribute("class");
        optionBtn.setAttribute("class", "selected");

        // Update hidden input value
        hiddenInput.setAttribute("value", `${i}`);
        hiddenInput.setAttribute("data-prev-value", `${i}`);
      };
    }
    optionsContainer.appendChild(optionBtn);
  });

  // Append Elements
  fieldSet.appendChild(hiddenInput);
  fieldSet.appendChild(optionsContainer);
  fieldSet.appendChild(descriptions);

  document.getElementById("config").appendChild(fieldSet);
}

export default createFieldSetWithOptions;

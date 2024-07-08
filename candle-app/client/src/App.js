import React from "react";
import { useState } from "react";
import "./App.css";
import "monday-ui-react-core/dist/main.css";
import axios from "axios";
import TextField from "monday-ui-react-core/dist/TextField";
import Flex from "monday-ui-react-core/dist/Flex";
import Dropdown from "monday-ui-react-core/dist/Dropdown";
import Button from "monday-ui-react-core/dist/Button";
import TextWithHighlight from "monday-ui-react-core/dist/TextWithHighlight";

const api = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 3000,
});

const createItem = async (boardId, groupId, itemName, columnValues) => {
  api
    .post("/create", {
      boardId,
      groupId,
      itemName,
      columnValues,
    })
    .catch(() => {
      console.error("Error creating Monday board item");
    });
};

const App = () => {
  const [firstName, setFirstName] = useState("");
  const [firstNameTouched, setFirstNameTouched] = useState(false);
  const [lastName, setLastName] = useState("");
  const [lastNameTouched, setLastNameTouched] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState(false);

  return (
    <div className="App">
      <Flex direction={Flex.directions.ROW} align={Flex.align.START} justify={Flex.align.START} gap={10} className="top-container">
        <TextField
          controlled
          title="First Name"
          type={TextField.types.TEXT}
          placeholder="Enter Customer First Name"
          onChange={(value) => {
            setFirstNameTouched(true);
            setFirstName(value);
          }}
          size={TextField.sizes.LARGE}
          autofocus
          value={firstName}
          validation={
            firstNameTouched && firstName.length < 1
              ? { status: firstNameTouched && firstName.length < 1 ? "error" : "success", text: firstNameTouched && firstName.length < 1 ? "Please enter first name" : "" }
              : {}
          }
        />
        <TextField
          controlled
          title="Last Name"
          type={TextField.types.TEXT}
          placeholder="Enter Customer Last Name"
          onChange={(value) => {
            setLastNameTouched(true);
            setLastName(value);
          }}
          size={TextField.sizes.LARGE}
          value={lastName}
          validation={
            lastNameTouched && lastName.length < 1
              ? { status: lastNameTouched && lastName.length < 1 ? "error" : "success", text: lastNameTouched && lastName.length < 1 ? "Please enter last name" : "" }
              : {}
          }
        />
        <TextField
          controlled
          title="Quantity"
          type={TextField.types.NUMBER}
          placeholder="Enter Quantity"
          onChange={(value) => {
            setQuantity(value);
          }}
          size={TextField.sizes.LARGE}
          value={quantity}
          validation={quantity < 1 ? { status: quantity < 1 ? "error" : "success", text: quantity < 1 ? "Please enter positive quantity" : "" } : {}}
        />
      </Flex>
      <Dropdown
        multi
        options={[
          { value: "smokey", label: "Smokey" },
          { value: "fruity", label: "Fruity" },
          { value: "fresh", label: "Fresh" },
          { value: "floral", label: "Floral" },
          { value: "herbaceous", label: "Herbaceous" },
          { value: "citrus", label: "Citrus" },
        ]}
        onChange={(option) => setSelectedOptions(option)}
        placeholder="Select 3 Fragrances"
        size={Dropdown.size.LARGE}
        maxMenuHeight={200}
        className="dropdown-menu"
        onMenuOpen={() => setIsMenuOpen(true)}
        onMenuClose={() => setIsMenuOpen(false)}
      />
      {error && <TextWithHighlight className="error-text" text="Please select exactly 3 fragrances" />}
      {isMenuOpen && <div style={{ height: 200 }}></div>}
      <Flex direction={Flex.directions.ROW} align={Flex.align.START} justify={Flex.align.START} className="button-container">
        <Button
          onClick={async () => {
            if (selectedOptions.length !== 3) {
              setError(true);
            } else {
              setError(false);
            }
            if (selectedOptions.length === 3 && firstName.length && lastName.length && quantity > 0) {
              const selectedValues = selectedOptions.map((item) => item.label);
              const fragranceString = selectedValues.join(", ");
              for (let i = 0; i < quantity; i++) {
                await createItem("6968825654", "new_group29179", `${firstName} ${lastName}`, JSON.stringify({ project_status: "Not Started", tags7__1: fragranceString }));
              }
            }
          }}
          size={Button.sizes.LARGE}
          className="button"
        >
          Start Order
        </Button>
        <div style={{ flex: 6 }}></div>
      </Flex>
    </div>
  );
};

export default App;

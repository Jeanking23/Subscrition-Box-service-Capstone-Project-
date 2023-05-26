import React from "react";
import useCustomForm from "./useCustomForm";

const Manager = () => {
  const initialValues = {
    // initial form values
    name: "",
    email: "",
    phone: "",
    address: "",
    city: ""
  };

  const onSubmit = (data) => {
    // handle form submission
    console.log(data);
  };

  const [formData, handleChange, handleSubmit, reset] = useCustomForm(
    initialValues,
    onSubmit
  ); 

  return (
    <div>
      <h1>Manager</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </label>
        <button onClick={reset}>Reset</button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Manager;

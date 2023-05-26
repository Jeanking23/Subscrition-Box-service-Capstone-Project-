import { useState } from "react";

const useCustomForm = (initialValues = {}, onSubmit) => {
    const [formData, setFormValues] = useState(initialValues);

    const handleChange = (e) => {
        e.persist();
        if (e.target.name === "isStudent") {
            setFormValues({...formData, [e.target.name]: e.target.checked });
        } else {
            setFormValues({...formData, [e.target.name]: e.target.value });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const rest = () => {
        setFormValues(initialValues);
    };

    return [formData, handleChange, handleSubmit, rest];
};

export default useCustomForm;
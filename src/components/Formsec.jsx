import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import 'bootstrap/dist/css/bootstrap.min.css';
export const Formsec = () => {

    const [inputdata, setInputdata] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        email: "",
        message: "",
    });
    const [formErrors, setFormErrors] = useState({
        name: "",
        lastname: "",
        email: "",
        message: "",
    });
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();


        const regex = {
            name: /^[A-zA-Z\s]+$/,
            lastname: /^[a-zA-Z\s]+$/,
            email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        };
        const errors = {};
        if (!regex.name.test(formData.name)) {
            errors.name = "Name is invalid.";
        }
        if (!regex.lastname.test(formData.lastname)) {
            errors.lastname = "LastName is invalid.";
        }
        if (!regex.email.test(formData.email)) {
            errors.email = "Email is invalid.";
        }
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            setShowSuccessPopup(true);

            function name() {
                if (Object.keys(errors).length === 0) {
                    document.body.classlist.toggle("overflow-hidden")

                }
            }
            emailjs
                .sendForm('service_fmfk5td', 'template_tvhmmwq', inputdata, {
                    publicKey: 'lh1RaY-0QWGVmTVNR',
                })
                .then(
                    () => {
                        console.log('SUCCESS!');
                    },
                    (errors) => {
                        console.log('FAILED...', errors.text);
                    },
                );
        }

    };
    const handlePopupClose = () => {
        setShowSuccessPopup(false);
        setFormData({
            name: "",
            lastname: "",
            email: "",
            message: "",
        });
        setFormErrors({
            name: "",
            lastname: "",
            email: "",
            message: "",
        });
    };

    return (

        <>
            <div className=' vh-100 d-flex flex-column align-items-center justify-content-center'>
                <form className="registration-form" ref={setInputdata} onSubmit={handleSubmit}>
                    <div className="d-flex flex-400-column gap-md-2 gap-lg-3 gap-3 mb-3 flex-sm-row form-gap w-100">
                        <div className="form-group position-relative d-flex flex-column">
                            <label htmlFor="name" className="color-black2 ff-exo mb-1 fs-sm">Name</label>
                            <input
                                required
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={formErrors.name ? "error" : ""}
                            />
                            {formErrors.name && (
                                <p className="error-message">{formErrors.name}</p>
                            )}
                        </div>
                        <div className="form-group d-flex flex-column position-relative">
                            <label htmlFor="name" className="color-black2 ff-exo mb-1 fs-sm">Last Name</label>
                            <input
                                required
                                type="text"
                                id="lastname"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                            // className={formErrors.name ? "error" : ""}
                            />
                            {formErrors.name && (
                                <p className="error-message color-black2">{formErrors.lastname}</p>
                            )}
                        </div>
                    </div>
                    <div className="form-group d-flex flex-column position-relative w-100">
                        <label htmlFor="email" className="color-black2 w-100 fs-sm mb-1 ff-exo">Email</label>
                        <input
                            required
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={formErrors.email ? "error" : ""}
                        />
                        {formErrors.email && (
                            <p className="error-message">{formErrors.email}</p>
                        )}
                    </div>
                    <div className=" d-flex flex-column">
                        <label className="mt-3 color-black2 mb-2" >Message</label>
                        <textarea type="text" value={formData.message} onChange={handleChange} name='message' id='message' required></textarea>
                    </div>
                    <div className="text-center mt-3 pt-2 text-md-start">
                        <button>send</button>
                    </div>
                </form>
                {showSuccessPopup && (
                    <div className="success-popup">
                        <p className="color-white">Form submitted successfully!</p>
                        <button onClick={handlePopupClose}>Close</button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Formsec
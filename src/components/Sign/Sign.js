import React from "react";
import {Link } from "react-router-dom";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function Sign({ name, title, onSubmit, buttonText, linkDescription, linkText, link}) {
    const { values, handleChange, errors, isValid, resetForm } =
        useFormAndValidation();

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(values.password, values.email, values.name);
    }

    React.useEffect(() => {
        resetForm(
            { email: "", password: "", name: "" },
            { email: "", password: "", name: "" },
            { email: true, password: true, name: true }
        );
    }, []);

    return (
        <main className="sign">
            <h2 className="sign__title">{title}</h2>
            <form
                className="sign__form"
                id={`sign-${name}-form`}
                name={`sign-${name}-form`}
                onSubmit={handleSubmit}
            >
                <fieldset className="sign__inputs">
                    {
                        name === "up" &&
                        <>
                            <p className="sign__input-name">Имя</p>
                            <input
                                type="text"
                                className={
                                    isValid.name
                                        ? "sign__input"
                                        : "sign__input sign__input_active"
                                }
                                id={`sign-${name}-name`}
                                name="name"
                                value={values.name ? values.name : ""}
                                required
                                minLength="2"
                                maxLength="30"
                                onChange={handleChange}
                            />
                            <span
                                className="sign__input-error"
                                id={`sign-${name}-email-input-error`}
                            >
                                {errors.name}
                            </span>
                        </>
                    }
                    <p className="sign__input-name">E-mail</p>
                    <input
                        type="email"
                        className={
                            isValid.email
                                ? "sign__input"
                                : "sign__input sign__input_active"
                        }
                        id={`sign-${name}-email`}
                        name="email"
                        value={values.email ? values.email : ""}
                        required
                        minLength="5"
                        maxLength="40"
                        onChange={handleChange}
                    />
                    <span
                        className="sign__input-error"
                        id={`sign-${name}-email-input-error`}
                    >
                        {errors.email}
                    </span>
                    <p className="sign__input-name">Пароль</p>
                    <input
                        type="password"
                        className={
                            isValid.password
                                ? "sign__input"
                                : "sign__input sign__input_active"
                        }
                        id={`sign-${name}-password`}
                        name="password"
                        value={values.password ? values.password : ""}
                        required
                        minLength="4"
                        onChange={handleChange}
                    />
                    <span
                        className="sign__input-error"
                        id={`sign-${name}-input-error`}
                    >
                        {errors.password}
                    </span>
                    <input
                        type="submit"
                        className={
                            name === "up"
                                ? "sign__save-button sign__save-button_closer"
                                : "sign__save-button"
                        }
                        id={`sign-${name}__save-button`}
                        value={buttonText}
                        disabled={
                            !(
                                isValid.email &&
                                isValid.password &&
                                values.email &&
                                values.password &&
                                (
                                    name === "up" 
                                    ? (isValid.name && values.name)
                                    : true
                                )
                            )
                        }
                    />
                </fieldset>
            </form>
            <div className="sign__link-container">
                <p className="sign__link-description">{linkDescription}</p>
                <Link to={link} className="sign__link">
                    {linkText}
                </Link>
            </div>           
        </main>
    );
}

export default Sign;

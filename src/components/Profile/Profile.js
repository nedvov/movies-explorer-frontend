import React from "react";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { patterns } from "../../consts/patterns"

function Profile({ onSubmit, buttonText, onButtonClick, isOnEdit, handleEdit, handleStopEdit, errorText, setErrorText, errorStatus, isRenderLoading }) {
    const { values, handleChange, errors, isValid, resetForm } =
        useFormAndValidation();

    const error = 
        errorText ? errorText :
        (isValid.name && isValid.email) ? "" :
        (isValid.name && !isValid.email) ? `Email: ${errors.email}` :
        (!isValid.name && isValid.email) ? `Name: ${errors.name}` :
        (!isValid.name && !isValid.email) && `Email: ${errors.email} и Name: ${errors.name}`;
 
    const currentUser = React.useContext(CurrentUserContext);

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(values.email, values.name);
    }

    React.useEffect(() => {
        resetForm(
            { email: currentUser.email, name: currentUser.name },
            { email: "", name: "" },
            { email: true, name: true }
        );
        isOnEdit && setErrorText("");
    }, [currentUser, isOnEdit]);

    React.useEffect(() => {
        isOnEdit && setErrorText("");
    }, [values]);

    React.useEffect(() => {
        !errorStatus && setErrorText("");
        handleStopEdit();
    }, []);

    return (
        <main className="profile">
            <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
            <form
                className="profile__form"
                id={`profile-form`}
                name={`profile-form`}
                onSubmit={handleSubmit}
            >
                <fieldset className="profile__inputs">
                    <div className="profile__input-container">
                        <p className="profile__input-name">Имя</p>
                        <input
                                type="text"
                                className={
                                    isValid.name
                                        ? "profile__input"
                                        : "profile__input profile__input_active"
                                }
                                id={`profile-name`}
                                name="name"
                                value={values.name ? values.name : ""}
                                required
                                minLength="2"
                                maxLength="30"
                                onChange={handleChange}
                                readOnly={(isOnEdit || !isRenderLoading) ? false : true}
                                pattern={patterns.namePattern}
                            />    
                    </div>
                    <div className="profile__input-container">
                        <p className="profile__input-name">E-mail</p>
                        <input
                            type="email"
                            className={
                                isValid.email
                                    ? "profile__input"
                                    : "profile__input profile__input_active"
                            }
                            id={`profile-email`}
                            name="email"
                            value={values.email ? values.email : ""}
                            required
                            minLength="5"
                            maxLength="40"
                            onChange={handleChange}
                            readOnly={isOnEdit ? false : true}
                        />    
                    </div>
                    <span className={errorStatus ? "profile__error profile__error_active" : "profile__error"}>{error}</span>
                    {
                        isOnEdit 
                        ?
                        <>
                            
                            <input
                            type="submit"
                            className="profile__save-button"
                            id={`profile__save-button`}
                            value={buttonText}
                            disabled={
                                !(
                                    isValid.email &&
                                    isValid.name &&
                                    values.email &&
                                    values.name &&
                                    !(values.name === currentUser.name &&
                                    values.email === currentUser.email)
                                )
                                ||
                                isRenderLoading
                            }
                            />
                            <button
                                type="button"
                                className="profile__text-button profile__text-button_active"
                                onClick={handleStopEdit}
                            >
                                Отмена
                            </button>
                        </>    
                        :
                        <>
                            <button
                                type="button"
                                className="profile__text-button"
                                onClick={handleEdit}
                            >
                                Редактировать
                            </button>
                            <button
                                type="button"
                                className="profile__text-button profile__text-button_active"
                                onClick={onButtonClick}
                            >
                                Выйти из аккаунта
                            </button>
                        </>                 
                    }                                        
                </fieldset>
            </form>          
        </main>
    );
}

export default Profile;

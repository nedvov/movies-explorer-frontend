import React from "react";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function Profile({ onSubmit, buttonText, onButtonClick }) {
    const [isOnEdit, setIsOnEdit] = React.useState(false);
    const { values, handleChange, errors, isValid, resetForm } =
        useFormAndValidation();

    const error = 
        (isValid.name && isValid.email) ? "" :
        (isValid.name && !isValid.email) ? `Email: ${errors.email}` :
        (!isValid.name && isValid.email) ? `Name: ${errors.name}` :
        (!isValid.name && !isValid.email) && `Email: ${errors.email} и Name: ${errors.name}`;
 
    function handleSubmit(e) {
        e.preventDefault();
        setIsOnEdit(false);
        onSubmit(values.email, values.name);
    }

    function handleEdit() {
        setIsOnEdit(true);
    }

    React.useEffect(() => {
        resetForm(
            { email: "", name: "" },
            { email: "", name: "" },
            { email: true, name: true }
        );
    }, []);

    return (
        <main className="profile">
            <h2 className="profile__title">Привет, Владимир!</h2>
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
                                value={values.name ? values.name : "Владимир"}
                                required
                                minLength="2"
                                maxLength="30"
                                onChange={handleChange}
                                readOnly={isOnEdit ? false : true}
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
                            value={values.email ? values.email : "mail@yandex.ru"}
                            required
                            minLength="5"
                            maxLength="40"
                            onChange={handleChange}
                            readOnly={isOnEdit ? false : true}
                        />    
                    </div>
                    {
                        isOnEdit 
                        ?
                        <>
                            <span className="profile__error">{error}</span>
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
                                    values.name
                                )
                            }
                            />
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

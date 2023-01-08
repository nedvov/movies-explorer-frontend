import React from "react";

function PopupWithForm({
    isOpened,
    onClose,
    text
}) {
    const popup = React.useRef();

    function closeByOuterClick(evt) {
        const withinBoundaries = evt.nativeEvent.path.includes(
            popup.current.children[0]
        );
        if (!withinBoundaries) {
            onClose();
        }
    }

    React.useEffect(() => {
        function closeByEscape(evt) {
            if (evt.key === "Escape") {
                onClose();
            }
        }

        if (isOpened) {
            document.addEventListener("keydown", closeByEscape);
            return () => {
                document.removeEventListener("keydown", closeByEscape);
            };
        }
    }, [isOpened]);

    return (
        <div
            ref={popup}
            className={isOpened ? "popup popup_opened" : "popup"}
            onClick={closeByOuterClick}
        >
            <div className="popup__container">
                <button
                    type="reset"
                    className="popup__close-button"
                    onClick={onClose}
                ></button>
                <h2 className="popup__title">Что-то пошло не так...</h2>
                <h2 className="popup__text">{text}</h2>
            </div>
        </div>
    );
}

export default PopupWithForm;

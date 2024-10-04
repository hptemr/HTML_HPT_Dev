export const regex = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-@$!%*?&#^()+=_<>,./;:'"|\`~])[A-Za-z\d-@$!%*?&#^()+=_<>,./;:'"|\`~]{8,16}$/,
    usPhoneNumber:/^\(\d{3}\) \d{3}-\d{4}$/,
    alphabetic: /^[a-zA-Z]*$/,
    onlyNumeric: /^[0-9]+$/,
    numericAndSpecialCharacter: /^[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,
    alphanumeric: /^[a-zA-Z0-9]*$/,
    numericWithDecimal:/^\d+(\.\d{2})?$/,
};
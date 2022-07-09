import { useNavigate } from "react-router-dom";
import styles from "./Button.module.css";

const Button = ({
    children,
    onClick,
    href,
    icon,
    disabled = false,
    loading = false,
    variant = "primary",
    ...rest
}) => {
    const navigate = useNavigate();

    return (
        <button
            className={`
                ${
                    variant === "primary"
                        ? styles.Button__primary
                        : styles.Button__secondary
                }
                ${disabled ? styles.Button__disabled : ""}
            `}
            onClick={() => {
                if (!disabled && !loading) {
                    if (href) navigate(href);
                    else onClick && onClick();
                }
            }}
            disabled={disabled}
            {...rest}
        >
            {children}
            {icon && <span>{icon}</span>}
        </button>
    );
};

export default Button;

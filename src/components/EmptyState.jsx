import Button from "./Button";

const EmptyState = ({ message = "Nothing to see here yet.", actionButton }) => {
    return (
        <div
            className="w-100 text-center d-flex flex-column align-items-center justify-content-center"
            style={{ minHeight: "200px" }}
        >
            {message}
            {actionButton && (
                <Button href={actionButton?.href} style={{ marginTop: "1rem" }}>
                    {actionButton?.label}
                </Button>
            )}
        </div>
    );
};

export default EmptyState;

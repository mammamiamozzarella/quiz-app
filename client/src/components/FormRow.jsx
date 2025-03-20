const FormRow = ({ type, name, labelText, defaultValue = "", onChange }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText}
      </label>
      {type === "textarea" ? (
        <textarea
          name={name}
          rows="4"
          className="form-input"
          defaultValue={defaultValue}
          required
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          className="form-input"
          defaultValue={defaultValue}
          onChange={onChange}
          required
        />
      )}
    </div>
  );
};

export default FormRow;

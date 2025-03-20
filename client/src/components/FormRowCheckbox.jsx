const FormRowCheckbox = ({ name, labelText, value = "", onChange }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText}
      </label>
      <input
        type="checkbox"
        id={name}
        name={name}
        className="form-input"
        value={value}
        checked={value}
        onChange={onChange}
      />
    </div>
  );
};

export default FormRowCheckbox;

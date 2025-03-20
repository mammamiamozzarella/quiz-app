const FormRowRadiobutton = ({ name, labelText, value = "", onChange }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText}
      </label>
      <input
        type="radio"
        id={name}
        name={name}
        className="form-input"
        checked={!!value}
        onChange={onChange}
      />
    </div>
  );
};

export default FormRowRadiobutton;

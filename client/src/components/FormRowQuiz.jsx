const FormRowQuiz = ({ type, name, labelText, value = "", onChange }) => {
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
          value={value}
          onChange={onChange}
          required
        />
      ) : type === "checkbox" ? (
        <input
          type={type}
          id={name}
          name={name}
          className="form-input"
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          className="form-input"
          value={value}
          onChange={onChange}
          required
        />
      )}
    </div>
  );
};

export default FormRowQuiz;

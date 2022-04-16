function CheckboxSection({ name, variables, setVariables, fetchData }) {
  const handleChange = (id) => {
    const newObj = variables.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          value: !item.value,
        };
      } else {
        return item;
      }
    });
    setVariables(newObj);
    fetchData(newObj);
  };

  return (
    <section className="checkbox-section">
      <h2>{name} Weather Variables</h2>
      <div className="checkboxes">
        {variables?.map(({ id, value, label }) => {
          return (
            <div key={id} className="checkbox-wrapper">
              <label>
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => handleChange(id)}
                />
                {label}
              </label>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default CheckboxSection;

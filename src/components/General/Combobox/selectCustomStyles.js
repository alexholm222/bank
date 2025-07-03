const customStyles = {
  control: (base, state) => ({
    ...base,
    width: '100%',
    backgroundColor: '#fff',
    borderColor: state.isFocused ? ' #002cfb' : '#e0e5f2',
    boxShadow: 'none',
    borderRadius: '4px',
    padding: '2px 4px',
    minHeight: '40px',
    '&:hover': {
      borderColor: ' #002cfb',
    },
  }),
  placeholder: (base) => ({
    ...base,
    color: '#98a0af',
    fontSize: '14px',
  }),
  singleValue: (base) => ({
    ...base,
    color: '#121922',
    fontSize: '14px',
  }),
  menu: (base) => ({
    ...base,
    borderRadius: '6px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    marginTop: '4px',
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? '#F8FAFD' : '#fff',
    color: '#121922',
    padding: '10px 12px',
    cursor: 'pointer',
    '&:active': {
      backgroundColor: '#e6f0ff',
    },
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: '#002CFB',
    padding: '4px',
    '&:hover': {
      color: '#2e6fd8',
    },
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
};

export default customStyles;

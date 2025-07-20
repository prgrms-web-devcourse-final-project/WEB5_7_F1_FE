import Select from "react-select";

const QuizSearchSelect = ({ options, value, onChange }) => {
    return (
        <Select
            options={options}
            value={value}
            onChange={onChange}
            placeholder="검색 타입"
            className="w-[140px]"
            styles={{
                control: (provided, state) => ({
                    ...provided,
                    height: '48px',
                    minHeight: '48px',
                    background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
                    border: state.isFocused ? '2px solid #ff1e1e' : '2px solid #e9ecef',
                    borderRadius: '12px',
                    boxShadow: state.isFocused
                        ? '0 0 0 3px rgba(255,30,30,0.1)'
                        : '0 2px 4px rgba(0,0,0,0.05)',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        borderColor: '#ff1e1e',
                        background: 'linear-gradient(145deg, #ffffff, #ffffff)',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                    }
                }),
                valueContainer: (provided) => ({
                    ...provided,
                    height: '44px',
                    padding: '0 16px',
                    display: 'flex',
                    alignItems: 'center'
                }),
                input: (provided) => ({
                    ...provided,
                    margin: '0',
                    padding: '0'
                }),
                indicatorsContainer: (provided) => ({
                    ...provided,
                    height: '44px',
                    padding: '0 12px'
                }),
                dropdownIndicator: (provided, state) => ({
                    ...provided,
                    color: state.isFocused ? '#ff1e1e' : '#6c757d',
                    padding: '0',
                    transition: 'all 0.2s ease',
                    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    '&:hover': {
                        color: '#ff1e1e'
                    }
                }),
                indicatorSeparator: () => ({
                    display: 'none'
                }),
                singleValue: (provided) => ({
                    ...provided,
                    color: '#2c3e50',
                    fontWeight: '600',
                    fontSize: '14px'
                }),
                placeholder: (provided) => ({
                    ...provided,
                    color: '#6c757d',
                    fontWeight: '500',
                    fontSize: '14px'
                }),
                option: (provided, state) => ({
                    ...provided,
                    padding: '16px 20px',
                    fontSize: '14px',
                    fontWeight: '500',
                    backgroundColor: state.isSelected
                        ? '#ff1e1e'
                        : state.isFocused
                            ? '#fff5f5'
                            : 'white',
                    color: state.isSelected
                        ? 'white'
                        : state.isFocused
                            ? '#ff1e1e'
                            : '#2c3e50',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    borderRadius: '0',
                    margin: '0',
                    '&:hover': {
                        backgroundColor: state.isSelected ? '#e10600' : '#fff5f5',
                        color: state.isSelected ? 'white' : '#ff1e1e'
                    }
                }),
                menu: (provided) => ({
                    ...provided,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                    border: '2px solid #ff1e1e',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    marginTop: '4px',
                    backgroundColor: 'white'
                }),
                menuList: (provided) => ({
                    ...provided,
                    padding: '0',
                    maxHeight: '200px',
                    borderRadius: '12px',
                    '&::-webkit-scrollbar': {
                        width: '6px'
                    },
                    '&::-webkit-scrollbar-track': {
                        background: '#f1f1f1',
                        borderRadius: '3px'
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#ff1e1e',
                        borderRadius: '3px'
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        background: '#e10600'
                    }
                })
            }}
        />
    );
}

export default QuizSearchSelect;
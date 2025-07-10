import React from 'react';

const styles = {
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    marginTop: '40px',
  },
  button: {
    background: '#ffffff',
    color: '#333',
    border: '1px solid #ddd',
    padding: '10px 15px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    minWidth: '40px',
  },
  activeButton: {
    background: 'linear-gradient(45deg, #dc3545, #c82333)',
    color: 'white',
    borderColor: '#dc3545',
  },
  disabledButton: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
};

const PaginationNavigator = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  const visibleRange = 5;
  let start = Math.max(1, currentPage - Math.floor(visibleRange / 2));
  let end = Math.min(totalPages, start + visibleRange - 1);

  if (end - start < visibleRange - 1) {
    start = Math.max(1, end - visibleRange + 1);
  }

  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }

  const getButtonStyle = (isActive, isDisabled) => {
    const base = { ...styles.button };
    if (isActive) Object.assign(base, styles.activeButton);
    if (isDisabled) Object.assign(base, styles.disabledButton);
    return base;
  };

  return (
    <div style={styles.pagination}>
      <button
        style={getButtonStyle(false, currentPage === 1)}
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        «
      </button>
      <button
        style={getButtonStyle(false, currentPage === 1)}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        ‹
      </button>
      {pageNumbers.map((page) => (
        <button
          key={page}
          style={getButtonStyle(currentPage === page, false)}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        style={getButtonStyle(false, currentPage === totalPages)}
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        ›
      </button>
      <button
        style={getButtonStyle(false, currentPage === totalPages)}
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        »
      </button>
    </div>
  );
};

export default PaginationNavigator;

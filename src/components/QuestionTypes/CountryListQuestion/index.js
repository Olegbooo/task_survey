import React, { useState, useMemo, useEffect, useRef } from 'react';
import { TextField, InputAdornment, Typography, Paper, ClickAwayListener, Portal } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import SearchIcon from '@material-ui/icons/Search';
import { hasFlag } from 'country-flag-icons';
import Flags from 'country-flag-icons/react/3x2';

const styles = (theme) => ({
  container: {
    position: 'relative',
    width: '100%',
  },
  textField: {
    width: '100%',
  },
  dropdown: {
    position: 'fixed',
    zIndex: 9999,
    maxHeight: '300px',
    overflowY: 'auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    minWidth: '300px',
  },
  menuItem: {
    padding: theme.spacing(1, 2),
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  flag: {
    width: 24,
    height: 16,
    marginRight: theme.spacing(1),
    borderRadius: 2,
  },
  countryName: {
    flex: 1,
  },
  selectedValue: {
    display: 'flex',
    alignItems: 'center',
  },
});

const CountryListQuestion = ({ onChange, countries, classes }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const inputRef = useRef(null);

  useEffect(() => {
    setFilteredCountries(countries);
  }, [countries]);

  const options = useMemo(() =>
    countries.map(country => ({ 
      value: country.name, 
      label: country.name, 
      code: country.code,
      flag: hasFlag(country.code) ? Flags[country.code] : null 
    }))
  , [countries]);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setIsOpen(true);
    
    if (term === '') {
      setFilteredCountries(countries);
      return;
    }

    const filtered = countries.filter(country => 
      country.name.toLowerCase().includes(term)
    );
    setFilteredCountries(filtered);
  };

  const handleCountrySelect = (countryName) => {
    onChange(countryName);
    setSearchTerm(countryName);
    setIsOpen(false);
  };

  const handleFocus = () => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
    setIsOpen(true);
  };

  const handleClickAway = () => {
    setIsOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className={classes.container}>
        <TextField
          ref={inputRef}
          className={classes.textField}
          variant="outlined"
          label="Select your country"
          value={searchTerm}
          onChange={handleSearch}
          onFocus={handleFocus}
          placeholder="Start typing to search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        {isOpen && filteredCountries.length > 0 && (
          <Portal>
            <Paper 
              className={classes.dropdown}
              style={{
                top: dropdownPosition.top,
                left: dropdownPosition.left,
              }}
            >
              {filteredCountries.map((country, index) => {
                const option = options.find(opt => opt.value === country.name);
                const FlagComponent = option && option.flag ? option.flag : null;
                return (
                  <div
                    key={index}
                    className={classes.menuItem}
                    onClick={() => handleCountrySelect(country.name)}
                  >
                    {FlagComponent && (
                      <FlagComponent className={classes.flag} />
                    )}
                    <Typography className={classes.countryName}>
                      {country.name}
                    </Typography>
                  </div>
                );
              })}
            </Paper>
          </Portal>
        )}
      </div>
    </ClickAwayListener>
  );
};

const mapStateToProps = (state) => ({
  countries: state.quiz.countries,
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(CountryListQuestion);

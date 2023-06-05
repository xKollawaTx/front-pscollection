import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const options = [
  { value: 'Action', label: 'Action' },
  { value: 'Adventure', label: 'Adventure' },
  { value: 'Family', label: 'Family' },
  { value: 'Fighting', label: 'Fighting' },
  { value: 'Horror', label: 'Horror' },
  { value: 'Indy', label: 'Indy' },
  { value: 'Platformer', label: 'Platformer' },
  { value: 'Role Playing Games', label: 'RPG' },
  { value: 'Shooter', label: 'Shooter' },
  { value: 'Simulation', label: 'Simulation' },
  { value: 'Sports', label: 'Sports' },
  { value: 'Strategy', label: 'Strategy' },
];

const GenreSelect = ({selectedGenres, setSelectedGenres }) => {
  const handleChange = (selectedOptions) => {
    setSelectedGenres(selectedOptions.map((option) => option.value));
  };

  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={options}
      theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          primary25: "#D9D9D9",
          primary: "black",
        },
      })}
      value={selectedGenres.map((genre) => ({ value: genre, label: genre }))}
      onChange={handleChange}
    />
  );
};

export default GenreSelect;

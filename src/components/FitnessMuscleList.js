import React from 'react'
import{ muscleGroups } from '../utils/muscleGroups';
import FitnessMuscleListItem from './FitnessMuscleListItem';
import { PropTypes } from 'prop-types';

function FitnessMusclesList({handleChangeMuscle,selectedMuscles}) {
  return ( 
    <ul className="equipmentList">
    {muscleGroups.map(({name}, index) => {
      //check if the eqiupment is part of selected equipment
      const isSelected = selectedMuscles.includes(name);
      return (
       <FitnessMuscleListItem key={`muscles-${index}`} name={name} handleChangeMuscle={handleChangeMuscle} isSelected={isSelected} index={index}  />
      );
    })}
  </ul>

  )
}
FitnessMusclesList.propTypes = {
  handleChangeMuscle: PropTypes.func.isRequired,
  selectedMuscles:PropTypes.array.isRequired
};
export default FitnessMusclesList
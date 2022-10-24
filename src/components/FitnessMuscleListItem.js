import React from 'react'
import { PropTypes } from 'prop-types';

function FitnessMuscleListItem({name, handleChangeMuscle, index, isSelected}) {
  return (
    <li className={isSelected ? 'activeButton':''} onClick={(e) => {
      console.log('click'+ name + isSelected, e)
      handleChangeMuscle(name)
      }}>
          <div className="muscleGroupListItem">
              <label className= 'muscleButton' htmlFor={`custom-checkbox-${index}` }>{name}</label>
            </div>

    </li>
  )
}
FitnessMuscleListItem.propTypes = {
  name:PropTypes.string,
  handleChangeMuscle: PropTypes.func,
  index:PropTypes.number,
  isSelected:PropTypes.bool
};
export default FitnessMuscleListItem
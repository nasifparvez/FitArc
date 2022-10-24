import React from 'react'
import { PropTypes } from 'prop-types';

function FitnessEquipmentListItem({name, handleChangeEquipment, index, isSelected}) {
  return (
    <li className={isSelected ? 'activeButton':''} onClick={(e) => {
      console.log('click'+ name + isSelected, e)
      handleChangeEquipment(name)
      }}>
 
          <div className="equipmentListItem">
              <label className= 'equipmentButton'htmlFor={`custom-checkbox-${index}` }>{name}</label>
            </div>

    </li>
  )
}
FitnessEquipmentListItem.propTypes = {
  name:PropTypes.string,
  handleChangeEquipment: PropTypes.func,
  index:PropTypes.number,
  isSelected:PropTypes.bool
};
export default FitnessEquipmentListItem
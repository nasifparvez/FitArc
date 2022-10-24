import React from 'react'
import{ equipment } from '../utils/equipment';
import FitnessEquipmentListItem from './FitnessEquipmentListItem';
import { PropTypes } from 'prop-types';

function FitnessEquipmentList({handleChangeEquipment,selectedEquipments}) {
  return ( 
    <ul className="equipmentList">
    {equipment.map(({name}, index) => {
      //check if the eqiupment is part of selected equipment
      const isSelected = selectedEquipments.includes(name);
      return (
       <FitnessEquipmentListItem key={`equipment-${index}`} name={name} handleChangeEquipment={handleChangeEquipment} isSelected={isSelected} index={index}  />
      );
    })}
  </ul>

  )
}
FitnessEquipmentList.propTypes = {
  handleChangeEquipment: PropTypes.func.isRequired,
  selectedEquipments:PropTypes.array.isRequired
};
export default FitnessEquipmentList
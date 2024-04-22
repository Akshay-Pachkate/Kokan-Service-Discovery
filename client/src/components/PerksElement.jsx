/* eslint-disable react/prop-types */

const PerksElement = ({perk, icon, onChange, name, checked, checkBox, perkNotAvai}) => {
  return (
    <label className={"flex gap-2 p-4 rounded-2xl border items-center " + perkNotAvai} >
        <input className={checkBox} name={name} checked={checked} onChange={onChange} type="checkbox" />
        {icon}
        <span >{perk}</span>
  </label>
  )
}

export default PerksElement
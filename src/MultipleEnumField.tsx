import * as React from 'react'
import { getCurrentValue } from './utils/getCurrentValue'
import { generateNewState } from './utils/generateNewState'

interface MultipleEnumFieldProps {
  schema: any
  profileData?: any
  parentFieldName: string
  isFieldRequired: boolean
  requiredProperties: string[]
  arrayData?: any[]
  arrayPath?: string
  onChildChange?: (newArray: any[]) => void
}

const MultipleEnumField = ({
  schema,
  profileData,
  parentFieldName,
  isFieldRequired,
  requiredProperties,
  arrayData,
  arrayPath,
  onChildChange
}: MultipleEnumFieldProps) => {
  const [inputValue, setInputValue] = React.useState(profileData || [])

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // Get the selected values
    const { options } = event.target
    const selectedValues = []
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value)
      }
    }

    // If the field is inherited from the parent, we need to update the parent.
    // Otherwise, we can just update the local state.
    if (arrayData && arrayPath) {
      const newArray = generateNewState(arrayData, arrayPath, selectedValues)
      onChildChange?.(newArray)
    } else {
      setInputValue(selectedValues)
    }
  }

  // If the field is inherited from the parent, we need to get the "value" from the parent.
  // Otherwise, we can just use the local state.
  return (
    <div>
      <legend className="jsrfg-title">
        {schema?.title}:
        {requiredProperties?.includes(parentFieldName) ? (
          <span className="jsrfg-required"> *</span>
        ) : (
          <></>
        )}
      </legend>
      <div className="jsrfg-enum-block">
        <select
          className="jsrfg-enum-select"
          aria-label={parentFieldName}
          name={parentFieldName + '[]'}
          required={isFieldRequired}
          value={
            arrayData && arrayPath
              ? getCurrentValue(arrayData, arrayPath)
              : inputValue
          }
          onChange={event => handleChange(event)}
          multiple={true}
        >
          {schema?.items?.enum?.map((item: any, index: any) => (
            <option value={item} key={item}>
              {schema?.items?.enumNames
                ? schema?.items?.enumNames?.[index]
                : item}
            </option>
          ))}
        </select>
        <div className="jsrfg-description">{schema?.description}</div>
      </div>
    </div>
  )
}

export default MultipleEnumField

import React from 'react'
import { getCurrentValue } from './utils/getCurrentValue'
import { generateNewState } from './utils/generateNewState'

interface TextFieldProps {
  schema: any
  profileData?: string
  parentFieldName: string
  isFieldRequired: boolean
  requiredProperties: string[]
  arrayData?: any
  arrayPath?: string
  onChildChange?: (newArray: any) => void
}

const TextField = ({
  schema,
  profileData,
  parentFieldName,
  isFieldRequired,
  requiredProperties,
  arrayData,
  arrayPath,
  onChildChange
}: TextFieldProps) => {
  const [inputValue, setInputValue] = React.useState(profileData || '')

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    // If the field is inherited from the parent, we need to update the parent.
    // Otherwise, we can just update the local state.
    if (arrayData && arrayPath) {
      const newArray = generateNewState(
        arrayData,
        arrayPath,
        event.target.value
      )
      onChildChange?.(newArray)
    } else {
      setInputValue(event.target.value)
    }
  }

  // If the field is inherited from the parent, we need to get the "value" from the parent.
  // Otherwise, we can just use the local state.
  return (
    <div>
      <legend className="jsrfg-title">
        {schema?.title}:
        {requiredProperties?.includes(
          parentFieldName.split('.').pop() || ''
        ) ? (
          <span className="jsrfg-required"> *</span>
        ) : (
          <></>
        )}
      </legend>
      <div className="jsrfg-enum-block">
        {schema?.enum ? (
          <select
            className="jsrfg-enum-select"
            aria-label={parentFieldName}
            name={parentFieldName}
            required={isFieldRequired}
            value={
              arrayData && arrayPath
                ? getCurrentValue(arrayData, arrayPath)
                : inputValue
            }
            onChange={event => handleChange(event)}
          >
            <option value="" key="0"></option>
            {schema?.enum?.map((item: any, index: any) => (
              <option value={item} key={item}>
                {schema?.enumNames ? schema?.enumNames?.[index] : item}
              </option>
            ))}
          </select>
        ) : (
          <input
            className="jsrfg-array-input"
            type={schema?.type === 'string' ? 'text' : 'number'}
            value={
              arrayData && arrayPath
                ? getCurrentValue(arrayData, arrayPath)
                : inputValue
            }
            name={parentFieldName}
            aria-label={parentFieldName}
            min={schema?.minimum}
            max={schema?.maximum}
            step={schema?.type === 'number' ? 'any' : undefined}
            minLength={schema?.minLength}
            maxLength={schema?.maxLength}
            pattern={schema?.pattern}
            required={isFieldRequired}
            onChange={event => handleChange(event)}
          />
        )}
        <div className="mt-2 text-xs">{schema?.description}</div>
      </div>
    </div>
  )
}

export default TextField

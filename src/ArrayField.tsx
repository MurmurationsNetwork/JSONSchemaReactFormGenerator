import React from 'react'
import RecursiveForm from './RecursiveForm'
import { constructState } from './utils/constructState'
import { generateNewState } from './utils/generateNewState'
import { getCurrentValue } from './utils/getCurrentValue'

interface ArrayFieldProps {
  schema: any
  profileData?: any[]
  parentFieldName: string
  isFieldRequired: boolean
  requiredProperties: string[]
  parentArrayData?: any[]
  parentArrayPath?: string
  parentOnChildChange?: (newArray: any[]) => void
}

const ArrayField = ({
  schema,
  profileData,
  parentFieldName,
  isFieldRequired,
  requiredProperties,
  parentArrayData,
  parentArrayPath,
  parentOnChildChange
}: ArrayFieldProps) => {
  // if the parent didn't provide profileData, we need to construct the state first
  const [arrayData, setArrayData] = React.useState(
    profileData || [constructState(schema?.items)]
  )

  React.useEffect(() => {
    if (parentArrayData && parentArrayPath) {
      const currentArray = getCurrentValue(parentArrayData, parentArrayPath)

      // If the current array is different from the parent array, update the state
      if (currentArray !== arrayData) {
        setArrayData(currentArray)
      }
    }
  }, [parentArrayData, parentArrayPath, arrayData])

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    event.preventDefault()
    const values = [...arrayData]
    values[index] = event.target.value
    setArrayData(values)

    // if we have a parent array, we need to update it
    if (parentArrayData && parentArrayPath) {
      updateParentArray(values)
    }
  }

  const handleAdd = (
    event: React.MouseEvent<HTMLButtonElement>,
    schema: any
  ) => {
    event.preventDefault()
    // use schema to construct the new state
    const defaultState = constructState(schema?.items)
    const values = [...arrayData, defaultState]
    setArrayData(values)

    // if we have a parent array, we need to update it
    if (parentArrayData && parentArrayPath) {
      updateParentArray(values)
    }
  }

  const handleRemove = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    event.preventDefault()
    const values = [...arrayData]
    values.splice(index, 1)
    setArrayData(values)

    // if we have a parent array, we need to update it
    if (parentArrayData && parentArrayPath) {
      updateParentArray(values)
    }
  }

  // If the child component changes, it will notify here to update the current array
  const handleChildChange = (newArrayData: any[]) => {
    setArrayData(newArrayData)
  }

  // For the array field that is nested in another array, we need to update the parent array
  const updateParentArray = (newChildArray: any[]) => {
    const newArray = generateNewState(
      parentArrayData ?? [],
      parentArrayPath ?? '',
      newChildArray
    )
    parentOnChildChange?.(newArray)
  }

  // If the children type is object, it will render the object border
  // If the children type is text or number, it will render a list of inputs
  // todo: if the children type is array, it will render a list of array fields
  // Otherwise, it will render nothing
  if (schema?.items?.type === 'object') {
    return (
      <fieldset className="jsrfg-object-block">
        <legend className="jsrfg-title">
          {schema?.title}
          {requiredProperties?.includes(parentFieldName) ? (
            <span className="jsrfg-required"> *</span>
          ) : (
            <></>
          )}
        </legend>
        <div className="jsrfg-description">{schema?.description}</div>
        {arrayData.map((value, index) => (
          <div key={parentFieldName + '[' + index + ']'}>
            <RecursiveForm
              schema={schema?.items}
              profileData={value}
              parentFieldName={parentFieldName + '[' + index + ']'}
              isFieldRequired={isFieldRequired}
              requiredProperties={requiredProperties}
              arrayData={arrayData}
              arrayPath={'[' + index + ']'}
              onChildChange={handleChildChange}
            />
            {index === 0 && isFieldRequired ? (
              <></>
            ) : (
              <button
                onClick={event => handleRemove(event, index)}
                className="jsrfg-remove-btn"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          onClick={event => handleAdd(event, schema)}
          className="jsrfg-add-btn"
        >
          Add
        </button>
      </fieldset>
    )
  } else if (
    schema?.items?.type === 'string' ||
    schema?.items?.type === 'number'
  ) {
    return (
      <fieldset className="jsrfg-object-block">
        <legend className="jsrfg-title">
          {schema?.title}
          {requiredProperties?.includes(parentFieldName) ? (
            <span className="jsrfg-required"> *</span>
          ) : (
            <></>
          )}
        </legend>
        <div className="jsrfg-description">{schema?.description}</div>
        {arrayData.map((value, index) => (
          <div key={index} className="jsrfg-array-block">
            <input
              type={schema?.items?.type === 'number' ? 'number' : 'text'}
              value={value}
              name={parentFieldName + '[' + index + ']'}
              aria-label={parentFieldName + '[' + index + ']'}
              onChange={event => handleChange(event, index)}
              className="jsrfg-array-input"
              required={isFieldRequired}
              min={schema?.minimum}
              max={schema?.maximum}
              minLength={schema?.minLength}
              maxLength={schema?.maxLength}
              pattern={schema?.pattern}
            />
            {index === 0 && isFieldRequired ? (
              <></>
            ) : (
              <button
                onClick={event => handleRemove(event, index)}
                className="jsrfg-remove-btn"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          onClick={event => handleAdd(event, schema)}
          className="jsrfg-add-btn"
        >
          Add
        </button>
      </fieldset>
    )
  } else {
    return <></>
  }
}

export default ArrayField

import React from 'react'
import RecursiveForm from './RecursiveForm'
import SchemaField from './SchemaField'

interface GenerateFormProps {
  schema: any
  profileData?: any
}

const GenerateForm = ({ schema, profileData }: GenerateFormProps) => {
  // The top level of schemas are always objects, if not, return nothing
  if (schema?.properties) {
    return Object.keys(schema?.properties)?.map(property => {
      // link_schemas is a special case, we want to render it as a hidden input
      if (property === 'linked_schemas') {
        return (
          <div key={property}>
            <SchemaField schema={schema} />
          </div>
        )
      } else {
        // if the property is an object with properties, we want to render the border with title and description
        return (
          <div key={property}>
            {schema?.properties?.[property]?.type === 'object' &&
            schema?.properties[property]?.properties ? (
              <fieldset className="jsrfg-object-block">
                <legend className="jsrfg-title">
                  {schema?.properties[property]?.title}
                  {schema?.required?.includes(property) ? (
                    <span className="jsrfg-required"> *</span>
                  ) : (
                    <></>
                  )}
                </legend>
                <div className="jsrfg-description">
                  {schema?.properties[property]?.description}
                </div>
                <RecursiveForm
                  schema={schema?.properties[property]}
                  profileData={profileData?.[property]}
                  parentFieldName={property}
                  isFieldRequired={!!schema?.required?.includes(property)}
                  requiredProperties={schema?.required ?? []}
                />
              </fieldset>
            ) : (
              <RecursiveForm
                schema={schema?.properties[property]}
                profileData={profileData?.[property]}
                parentFieldName={property}
                isFieldRequired={!!schema?.required?.includes(property)}
                requiredProperties={schema?.required ?? []}
              />
            )}
          </div>
        )
      }
    })
  } else {
    return <></>
  }
}

export default GenerateForm

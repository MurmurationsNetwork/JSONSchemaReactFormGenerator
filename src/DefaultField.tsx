import React from 'react'

interface DefaultFieldProps {
  schema: any
  parentFieldName: string
}

const DefaultField = ({ schema, parentFieldName }: DefaultFieldProps) => {
  return (
    <input
      type="hidden"
      defaultValue={schema.default}
      name={parentFieldName}
      aria-label={parentFieldName}
    />
  )
}

export default DefaultField

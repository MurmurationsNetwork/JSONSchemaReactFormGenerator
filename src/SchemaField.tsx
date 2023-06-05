import * as React from 'react'

interface SchemaFieldProps {
  schema: any
}

const SchemaField = ({ schema }: SchemaFieldProps) => {
  return (
    <input
      type="hidden"
      name="linked_schemas"
      key="linked_schemas"
      value={schema?.metadata?.schema}
    />
  )
}

export default SchemaField

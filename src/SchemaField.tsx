import React from 'react'

interface SchemaFieldProps {
  schema: any
}

export default function SchemaField({ schema }: SchemaFieldProps) {
  return (
    <input
      type="hidden"
      name="linked_schemas"
      key="linked_schemas"
      value={schema?.metadata?.schema}
    />
  )
}

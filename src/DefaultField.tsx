import React from 'react'

interface DefaultFieldProps {
  schema: any
  parentFieldName: string
}

export default function DefaultField({
  schema,
  parentFieldName
}: DefaultFieldProps) {
  return (
    <input
      type="hidden"
      defaultValue={schema.default}
      name={parentFieldName}
      aria-label={parentFieldName}
    />
  )
}

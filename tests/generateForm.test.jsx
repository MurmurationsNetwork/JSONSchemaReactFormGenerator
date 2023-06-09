import '@testing-library/jest-dom'
import React from 'react'
import { screen, render } from '@testing-library/react'

import { GenerateForm } from '../src'
import { schemaHeader, test_schema_1, test_schema_2 } from './test_schemas'

/**
 * @vitest-environment jsdom
 */
describe('GenerateForm mock-test schemas', () => {
  it('should return empty content if the schema with no properties', () => {
    const { container } = render(<GenerateForm schema={schemaHeader} />)

    expect(container).toBeEmptyDOMElement()
  })

  it('should render string and number input fields', () => {
    const { container } = render(<GenerateForm schema={test_schema_1} />)

    // Assert that the linked_schemas input exists
    expect(
      container.querySelector('input[name="linked_schemas"]')
    ).toBeInTheDocument()

    // Assert that the name input exists
    expect(container.querySelector('input[name="name"]')).toBeInTheDocument()

    const lat = container.querySelector('input[name="geolocation.lat"]')
    const lon = container.querySelector('input[name="geolocation.lon"]')

    // Assert that the lat and the lon inputs exist
    expect(lat).toBeInTheDocument()
    expect(lon).toBeInTheDocument()

    // Assert that the lat and the lon inputs are of type number
    expect(lat).toHaveAttribute('type', 'number')
    expect(lon).toHaveAttribute('type', 'number')

    // Assert that the lat and the lon inputs are required
    expect(lat).toBeRequired()
    expect(lon).toBeRequired()
  })

  it('should render input fields from object and add button for array', () => {
    const { container } = render(<GenerateForm schema={test_schema_2} />)

    // Assert that the linked_schemas input exists
    expect(
      container.querySelector('input[name="linked_schemas"]')
    ).toBeInTheDocument()

    // Assert that the name input exists
    expect(container.querySelector('input[name="name"]')).toBeInTheDocument()

    // Assert that the urls input exists and the length is 2
    expect(container.querySelectorAll('input[name^="urls[0]"]')).toHaveLength(2)

    // Assert that the urls[0].url has pattern attribute
    const urlInput = container.querySelector('input[name^="urls[0].url"]')
    expect(urlInput).toBeInTheDocument()
    expect(urlInput).toHaveAttribute('type', 'text')
    expect(urlInput).toHaveAttribute('pattern', '^https?://.*')

    // Assert that Add button exists
    const addButton = container.querySelector('.jsrfg-add-btn')
    expect(addButton).toBeInTheDocument()
  })
})

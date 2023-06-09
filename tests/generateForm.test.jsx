import '@testing-library/jest-dom'
import React from 'react'
import { screen, render } from '@testing-library/react'

import { GenerateForm } from '../src'
import {
  karte_von_morgen,
  schemaHeader,
  test_schema_1,
  test_schema_2,
  test_schema_3,
  test_schema_4,
  test_schema_5
} from './test_schemas'

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

  it('should render input fields from three layers objects', () => {
    const { container } = render(<GenerateForm schema={test_schema_3} />)

    // Assert that the linked_schemas input exists
    expect(
      container.querySelector('input[name="linked_schemas"]')
    ).toBeInTheDocument()

    // Assert that the person.name input exists and is required
    expect(
      container.querySelector('input[name="person.name"]')
    ).toBeInTheDocument()
    expect(container.querySelector('input[name="person.name"]')).toBeRequired()

    // Assert address.street input exists and is not required
    expect(
      container.querySelector('input[name="person.address.street"]')
    ).toBeInTheDocument()
    expect(
      container.querySelector('input[name="person.address.street"]')
    ).not.toBeRequired()

    // Assert address.location.locality input exists
    expect(
      container.querySelector('input[name="person.address.location.locality"]')
    ).toBeInTheDocument()

    // Assert address.location.region input exists
    expect(
      container.querySelector('input[name="person.address.location.region"]')
    ).toBeInTheDocument()

    // Assert address.location.country input exists and is required
    expect(
      container.querySelector('input[name="person.address.location.country"]')
    ).toBeInTheDocument()
  })

  it('should render single select input and multiple select input', () => {
    const { container } = render(<GenerateForm schema={test_schema_4} />)

    // Assert that the linked_schemas input exists
    expect(
      container.querySelector('input[name="linked_schemas"]')
    ).toBeInTheDocument()

    // Assert that single_choice input exists, is required and the length is 6(single select has empty select). Also, validate the second option is zero
    const singleChoice = container.querySelector('select[name="single_choice"]')
    expect(singleChoice).toBeInTheDocument()
    expect(singleChoice).toBeRequired()
    // Get the options of the select element
    const options = Array.from(singleChoice.querySelectorAll('option'))
    expect(options).toHaveLength(6)
    expect(options[1]).toHaveValue('zero')

    // Assert that multiple_choice input exists, is required and the length is 5 (multiple select doesn't have empty select). Also, validate the first option is one
    const multipleChoice = container.querySelector(
      'select[name="multiple_choice[]"]'
    )
    expect(multipleChoice).toBeInTheDocument()
    expect(multipleChoice).toBeRequired()
    // Get the options of the select element
    const multipleOptions = Array.from(
      multipleChoice.querySelectorAll('option')
    )
    expect(multipleOptions).toHaveLength(5)
    expect(multipleOptions[0]).toHaveValue('one')
  })

  it('should render single select input and multiple select input in the object', () => {
    const { container } = render(<GenerateForm schema={test_schema_5} />)

    // Assert that the linked_schemas input exists
    expect(
      container.querySelector('input[name="linked_schemas"]')
    ).toBeInTheDocument()

    // Assert that single_choice input exists and the length is 6(single select has empty select). Also, validate the second option is zero
    const singleChoice = container.querySelector(
      'select[name="wrapping_object.single_choice"]'
    )
    expect(singleChoice).toBeInTheDocument()
    // Get the options of the select element
    const options = Array.from(singleChoice.querySelectorAll('option'))
    expect(options).toHaveLength(6)
    expect(options[1]).toHaveValue('zero')

    // Assert that multiple_choice input exists and the length is 5 (multiple select doesn't have empty select). Also, validate the first option is one
    const multipleChoice = container.querySelector(
      'select[name="wrapping_object.multiple_choice[]"]'
    )
    expect(multipleChoice).toBeInTheDocument()
    // Get the options of the select element
    const multipleOptions = Array.from(
      multipleChoice.querySelectorAll('option')
    )
    expect(multipleOptions).toHaveLength(5)
    expect(multipleOptions[0]).toHaveValue('one')
  })
})

describe('GenerateForm real schema', () => {
  it('should render the fields in karte_von_morgen schema', () => {
    const { container } = render(<GenerateForm schema={karte_von_morgen} />)

    // Assert that the linked_schemas input exists
    expect(
      container.querySelector('input[name="linked_schemas"]')
    ).toBeInTheDocument()

    // Assert that the name input exists and is required
    const name = container.querySelector('input[name="name"]')
    expect(name).toBeInTheDocument()
    expect(name).toBeRequired()

    // Assert that the primary_url input exists, the maxLength is 2000 and is required
    const primaryUrl = container.querySelector('input[name="primary_url"]')
    expect(primaryUrl).toBeInTheDocument()
    expect(primaryUrl).toHaveAttribute('maxlength', '2000')
    expect(primaryUrl).toBeRequired()

    // Assert that the description input exists
    expect(
      container.querySelector('input[name="description"]')
    ).toBeInTheDocument()

    // Assert that the latitude input exists, type is number, min is -90 and max is 90
    const latitude = container.querySelector('input[name="latitude"]')
    expect(latitude).toBeInTheDocument()
    expect(latitude).toHaveAttribute('type', 'number')
    expect(latitude).toHaveAttribute('min', '-90')
    expect(latitude).toHaveAttribute('max', '90')

    // Assert that the longitude input exists, type is number, min is -180 and max is 180
    const longitude = container.querySelector('input[name="longitude"]')
    expect(longitude).toBeInTheDocument()
    expect(longitude).toHaveAttribute('type', 'number')
    expect(longitude).toHaveAttribute('min', '-180')
    expect(longitude).toHaveAttribute('max', '180')

    // Assert that the locality input exists
    expect(
      container.querySelector('input[name="locality"]')
    ).toBeInTheDocument()

    // Assert that the region input exists
    expect(container.querySelector('input[name="region"]')).toBeInTheDocument()

    // Assert that the country_name input exists
    expect(
      container.querySelector('input[name="country_name"]')
    ).toBeInTheDocument()

    // Assert that the email input exists
    expect(container.querySelector('input[name="email"]')).toBeInTheDocument()

    // Assert that the image input exists, maxlength is 2000 and pattern is ^https?://.*
    const image = container.querySelector('input[name="image"]')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('maxlength', '2000')
    expect(image).toHaveAttribute('pattern', '^https?://.*')

    // Assert that the kvm_category[0] input exists
    expect(
      container.querySelector('input[name="kvm_category[0]"]')
    ).toBeInTheDocument()

    // Assert that the tags[0] input exists
    expect(container.querySelector('input[name="tags[0]"]')).toBeInTheDocument()

    // Assert that add button and remove button exists
    expect(container.querySelector('.jsrfg-add-btn')).toBeInTheDocument()
    expect(container.querySelector('.jsrfg-remove-btn')).toBeInTheDocument()
  })
})

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { expect, vi } from 'vitest'
import { ValtioApp, ValtioRequest } from '../src'
import { BaseComponent } from '../src/base'

test('renders the BaseComponent', () => {
  render(<BaseComponent host="https://example.com" appID="1" />)

  const element = screen.getByTestId('valtio-iframe')

  expect(element).toBeInTheDocument()
  expect(element).toHaveAttribute('src', 'https://example.com/#embedded=true&appID=1&language=en')
})

test('renders the ValtioApp component', () => {
  render(<ValtioApp host="https://example.com" appID="1" />)

  const element = screen.getByTestId('valtio-iframe')

  expect(element).toBeInTheDocument()
  expect(element).toHaveAttribute('src', 'https://example.com/#embedded=true&appID=1&language=en')
})

test('renders the ValtioRequest component', () => {
  render(<ValtioRequest host="https://example.com" appID="1" />)

  const element = screen.getByTestId('valtio-iframe')

  expect(element).toBeInTheDocument()
  expect(element).toHaveAttribute('src', 'https://example.com/e/request#embedded=true&appID=1&language=en')
})

test('renders the ValtioApp.appID component property', () => {
  render(<ValtioApp host="https://example.com" appID="4bdd66c7-9b87-4044-aa00-e2982880e0df" />)

  const element = screen.getByTestId('valtio-iframe')

  expect(element).toBeInTheDocument()
  expect(element).toHaveAttribute(
    'src',
    'https://example.com/#embedded=true&appID=4bdd66c7-9b87-4044-aa00-e2982880e0df&language=en'
  )
})

test('fails on invalid ValtioApp.appID component property', () => {
  const consoleErrorFn = vi.spyOn(console, 'error').mockImplementation(() => {})
  expect(() => render(<ValtioApp host="https://example.com" appID={false} />)).toThrow(
    TypeError("'appID=false' is not valid application ID.")
  )
  consoleErrorFn.mockRestore()
})

test('fails on missing ValtioApp.appID component property', () => {
  const consoleErrorFn = vi.spyOn(console, 'error').mockImplementation(() => {})
  expect(() => render(<ValtioApp host="https://example.com" />)).toThrow(
    TypeError("'appID=undefined' is not valid application ID.")
  )
  consoleErrorFn.mockRestore()
})

test('renders the ValtioApp.language component property', () => {
  render(<ValtioApp host="https://example.com" appID="1" language="es" />)

  const element = screen.getByTestId('valtio-iframe')

  expect(element).toBeInTheDocument()
  expect(element).toHaveAttribute('src', 'https://example.com/#embedded=true&appID=1&language=es')
})

test('fails on invalid ValtioApp.language component property', () => {
  const consoleErrorFn = vi.spyOn(console, 'error').mockImplementation(() => {})
  expect(() => render(<ValtioApp host="https://example.com" appID="1" language="xx" />)).toThrow(
    TypeError("'language=xx' is not a supported language")
  )
  consoleErrorFn.mockRestore()
})

test('renders with ValtioApp.onExit component property', () => {
  render(<ValtioApp host="https://example.com" appID="1" onExit={() => {}} />)

  const element = screen.getByTestId('valtio-iframe')

  expect(element).toBeInTheDocument()
  expect(element).toHaveAttribute('src', 'https://example.com/#embedded=true&appID=1&language=en')
})

test('fails on invalid ValtioApp.onExit component property', () => {
  const consoleErrorFn = vi.spyOn(console, 'error').mockImplementation(() => {})
  expect(() => render(<ValtioApp host="https://example.com" appID="1" onExit={1} />)).toThrow(
    TypeError("'onExit=1' is not a valid callback function.")
  )
  consoleErrorFn.mockRestore()
})

test('renders with ValtioApp.onLoad component property', () => {
  render(<ValtioApp host="https://example.com" appID="1" onLoad={() => {}} />)

  const element = screen.getByTestId('valtio-iframe')

  expect(element).toBeInTheDocument()
  expect(element).toHaveAttribute('src', 'https://example.com/#embedded=true&appID=1&language=en')
})

test('fails on invalid ValtioApp.onLoad component property', () => {
  const consoleErrorFn = vi.spyOn(console, 'error').mockImplementation(() => {})
  expect(() => render(<ValtioApp host="https://example.com" appID="1" onLoad={1} />)).toThrow(
    TypeError("'onLoad=1' is not a valid callback function.")
  )
  consoleErrorFn.mockRestore()
})

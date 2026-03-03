import '@testing-library/jest-dom'
import 'whatwg-fetch'

const { TextEncoder, TextDecoder } = require('util')
Object.assign(global, { TextEncoder, TextDecoder })
if (typeof window !== 'undefined') {
    Object.assign(window, { TextEncoder, TextDecoder })
}

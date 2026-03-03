const fs = require('fs')

try {
    const content = fs.readFileSync('error.log', 'utf16le')
    console.log(content)
} catch (error) {
    try {
        const content2 = fs.readFileSync('error.log', 'utf8')
        console.log(content2)
    } catch (err) {
        console.error(err)
    }
}

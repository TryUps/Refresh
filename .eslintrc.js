module.exports = {
    extends: "standard",
    root: true,
    env: {
        browser: true,
        node: true
    },
    "rules": {
        "indent":  "off",
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
}
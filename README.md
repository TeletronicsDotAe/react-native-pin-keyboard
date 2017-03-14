# react-native-pin-keyboard
Pin entry component for react-native

You can modify following:
* Title (`prompt`)
* Number of digits (`pinLength`)
* Enable/disable Clear button (`clearVisible`)
* Enable/disable Delete button (`deleteVisible`)
* Give a method for handling when all digits have been entered (`onPinEntered(value)`)

Example:
`
    <Pin
        prompt="Enter passcode"
        pinLength={5}
        clearVisible={true}
        deleteVisible={true}
        onPinEntered={(value) => console.log(value)}
    />
`
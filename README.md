# react-native-pin-keyboard
Pin entry component for react-native

You can modify following:
* Title (`prompt`)
* Number of digits (`pinLength`)
* Enable/disable Clear button (`clearVisible`)
* Enable/disable Delete button (`deleteVisible`)
* Clear the entered pincode after the last digit is entered (`clearPinOnComplete`)
* Give a method for handling when all digits have been entered (`onPinEntered(value)`)

Example (using default values of the component):
`
    <Pin
        prompt="Enter passcode"
        pinLength={5}
        clearVisible={true}
        deleteVisible={true}
        clearPinOnComplete={true}
        onPinEntered={(value) => console.log(value)}
    />
`
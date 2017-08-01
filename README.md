# react-native-pin-keyboard
Pin entry component for react-native

You can set different options for the `Pin` component.

### Configuration ###

Required options:
* Pincode (`pinCode`) -  this is the value displayed and modified by the `Pin` component
* Callback method (`onPinEntered(value)`) - this is called for everytime the use touches the keyboard (except when a digit is pressed and the `pinLength` has been reached)

Optional options:
* Title (`prompt`) - The title shown above the entered pincode (default: "Enter passcode")
* Number of digits (`pinLength`) - The length of the key (default: 5)
* Enable/disable Clear button (`clearVisible`) - (default: true)
* Enable/disable Delete button (`deleteVisible`) - (default: true)

### Usage ###
The `pinCode` option is to be maintained by the parent component and it is the parent componts responsibility to implement the desired workflow.

Based on the `pinLength` the `Pin` component will limit the number of digits that can be entered - i.e. when the `pinLength` number of digits are entered you will not get any further updates on changes in the pin until you change the local pin code state of the parent container or the user press `Delete` or `Clear`.

Example (using default values of the component):
`
    <Pin
        prompt="Enter passcode"
        pinLength={5}
        clearVisible={true}
        deleteVisible={true}
        onPinEntered={(value) => this.setState(pinCode: value)}
        pinCode={this.state.pinCode}
    />
`
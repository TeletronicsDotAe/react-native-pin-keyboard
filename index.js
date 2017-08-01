import React, {Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pad: {
        flex: 1,
        justifyContent: 'center',
    },
    headerPad: {
        margin: 10,
    },
    keyPad: {
        margin: 10,
    },
    btn: {
        fontFamily: 'Helvetica Light',
        fontSize: 25,
        color: 'white',
    },
    clearBtn: {
        fontFamily: 'Helvetica Light',
        fontSize: 17,
        color: 'white',
    },
    header: {
        fontFamily: 'Helvetica Light',
        fontSize: 15,
        color: 'white',
        textAlign: 'center',
        margin: 10,
    },
    pin: {
        fontSize: 15,
        fontWeight: '500',
        color: 'white',
    },
    circle: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        borderRadius: 30,
        width: 60,
        height: 60,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    invisibleCircle: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        borderRadius: 30,
        width: 60,
        height: 60,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.0)',
    },
});

function makeDots(num) {
    let ret = '';
    while (num > 0) {
        ret += ' ○ ';
        num--;
    }
    return ret;
}

export default class Pin extends Component {
    defaultProps = {
        pinLength: 5,
        prompt: "Enter passcode",
        clearVisible: true,
        deleteVisible: true,
    }

    handlePress(num) {
        const pinLength = this.props.pinLength ? this.props.pinLength : this.defaultProps.pinLength;
        let pinCode = this.props.pinCode;

        if (pinCode.length < pinLength) {
            pinCode += String(num);

            this.doCallback(pinCode);
        }
    }

    doCallback(pincode) {
        this.props.onPinEntered(pincode);
    }

    doClear() {
        this.doCallback('');
    }

    doDelete() {
        const pinCode = this.props.pinCode;
        this.doCallback(pinCode.substr(0, pinCode.length - 1));
    }

    renderButton(num) {
        return (
            <TouchableOpacity onPress={()=> this.handlePress(num)} style={styles.circle}>
                <Text style={styles.btn}>{num}</Text>
            </TouchableOpacity>
        );
    }

    buildButton(isVisible, text, clickHandler) {
        if (isVisible) {
            return <TouchableOpacity style={styles.invisibleCircle} onPress={clickHandler}><Text style={styles.clearBtn}>{text}</Text></TouchableOpacity>;
        } else {
            return <TouchableOpacity style={styles.invisibleCircle} />;
        }
    }

    render() {
        // Extract props
        const pinCode = this.props.pinCode;
        const pinLength = this.props.pinLength ? this.props.pinLength : this.defaultProps.pinLength;
        const prompt = this.props.prompt ? this.props.prompt : this.defaultProps.prompt;
        const clearVisible = this.props.clearVisible ? this.props.clearVisible : this.defaultProps.clearVisible;
        const deleteVisible = this.props.deleteVisible ? this.props.deleteVisible : this.defaultProps.deleteVisible;

        // Format the pincode for display
        const marks = pinCode.replace(/./g, ' ● ');
        const dots = makeDots(pinLength - pinCode.length);

        // Build buttons
        const clearButton = this.buildButton(clearVisible, "Clear", () => this.doClear());
        const deleteButton = this.buildButton(deleteVisible, "Delete", () => this.doDelete());

        return (
            <View style={styles.pad} >
                <View style={styles.headerPad}>
                    <Text style={styles.header} >
                        {prompt}
                    </Text>

                    <View style={styles.row} >
                        <Text style={styles.pin} >{marks}{dots}</Text>
                    </View>
                </View>

                <View style={styles.keyPad}>
                    <View style={styles.row} >
                        {this.renderButton(1)}
                        {this.renderButton(2)}
                        {this.renderButton(3)}
                    </View>

                    <View style={styles.row} >
                        {this.renderButton(4)}
                        {this.renderButton(5)}
                        {this.renderButton(6)}
                    </View>

                    <View style={styles.row} >
                        {this.renderButton(7)}
                        {this.renderButton(8)}
                        {this.renderButton(9)}
                    </View>

                    <View style={styles.row} >
                        {clearButton}
                        {this.renderButton(0)}
                        {deleteButton}
                    </View>
                </View>
            </View>
        );
    }
}

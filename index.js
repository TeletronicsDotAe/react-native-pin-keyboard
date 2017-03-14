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
    state = {
        value: '', 
        pinLength: 5,
        clearVisible: true,
        deleteVisible: true,
        clearPinOnComplete: true,
        prompt: "Enter passcode",
    };

    constructor(props) {
        super(props);

        if (props.pinLength != undefined) {
            this.state.pinLength = props.pinLength;
        }
        if (props.clearVisible != undefined) {
            this.state.clearVisible = props.clearVisible;
        }
        if (props.deleteVisible != undefined) {
            this.state.deleteVisible = props.deleteVisible;
        }
        if (props.prompt != undefined) {
            this.state.prompt = props.prompt;
        }
        if (props.clearPinOnComplete != undefined) {
            this.state.clearPinOnComplete = props.clearPinOnComplete;
        }
    }

    handleClear() {
        this.setState({value: ''});
    }

    handlePress(num) {
        let {value} = this.state;
        if (value.length < this.state.pinLength) {
            value += String(num);

            this.setState({value});

            if (value.length == this.state.pinLength) {
                this.props.onPinEntered(value);

                if (this.state.clearPinOnComplete) {
                    this.handleClear();
                }
            }
        }
    }

    handleRemove() {
        const {value} = this.state;
        this.setState({value: value.substr(0, value.length - 1)});
    }

    renderButton(num) {
        return (<TouchableOpacity onPress={()=> this.handlePress(num)} style={styles.circle}><Text
                      style={styles.btn}>{num}
        </Text></TouchableOpacity>);
    }

    buildClearButton() {
        if (this.state.clearVisible) {
            return <TouchableOpacity style={styles.invisibleCircle} onPress={()=> this.handleClear()}><Text style={styles.clearBtn}>Clear</Text></TouchableOpacity>;
        } else {
            return <TouchableOpacity style={styles.invisibleCircle} />;
        }
    }

    buildDeleteButton() {
        if (this.state.deleteVisible) {
            return <TouchableOpacity style={styles.invisibleCircle} onPress={()=> this.handleRemove()}><Text style={styles.clearBtn}>Delete</Text></TouchableOpacity>;
        } else {
            return <TouchableOpacity style={styles.invisibleCircle} />;
        }
    }

    render() {
        const {value} = this.state;
        const marks = value.replace(/./g, ' ● ');
        const dots = makeDots(this.state.pinLength - value.length);
        const clearButton = this.buildClearButton();
        const deleteButton = this.buildDeleteButton();

        return (
            <View style={styles.pad} >
                <View style={styles.headerPad}>
                    <Text style={styles.header} >
                        {this.state.prompt}
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

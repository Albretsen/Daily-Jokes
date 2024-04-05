import { TextInput, TextInputProps, StyleSheet, StyleProp, TextStyle } from "react-native";
import { textStyles } from "./Text";
import { componentColors } from "../misc/Colors";

interface InputFieldProps extends TextInputProps {
    placeholderTextColor?: string;
    style?: StyleProp<TextStyle>;
}

export default function InputField(props: InputFieldProps) {
    const { placeholderTextColor = componentColors.text.placeholder, style, ...rest } = props;
    return (
        <TextInput
            style={[textStyles.text, { color: componentColors.text.contentBox }, styles.input, style]}
            placeholderTextColor={placeholderTextColor}
            multiline
            {...rest}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        textAlignVertical: "top",
        minHeight: 60,
    },
})
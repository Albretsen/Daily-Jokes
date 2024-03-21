import CircularButton, { VariantType } from "./CircularButton";
import { View, TouchableOpacity } from "react-native";
import Text from "../generalUI/Text";

interface RoundButtonWithLabelProps {
    label?: string;
    variant?: VariantType;
    onPress: () => void;
}

export default function RoundButtonWithLabel(props: RoundButtonWithLabelProps) {
    const { label, variant = "yes", onPress } = props;
    return (
        <TouchableOpacity onPress={onPress} style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
        }}>
            <CircularButton noPress variant={variant} />
            <Text>{label}</Text>
        </TouchableOpacity>
    )
}
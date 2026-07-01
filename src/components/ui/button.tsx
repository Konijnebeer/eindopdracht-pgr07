import { Pressable, Text, type PressableProps } from "react-native";

export type ButtonProps = PressableProps & {
  label: string;
};

export function Button({ label, ...props }: ButtonProps) {
  return (
    <Pressable
      className="items-center justify-center rounded-lg bg-primary px-4 py-3 active:opacity-80"
      {...props}
    >
      <Text className="text-base font-semibold text-primary-foreground">
        {label}
      </Text>
    </Pressable>
  );
}

import { Text as RNText, type TextProps } from 'react-native';

export function Text({ className, ...props }: TextProps) {
  return <RNText className={`text-base text-foreground ${className ?? ''}`} {...props} />;
}

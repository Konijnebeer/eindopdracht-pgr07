import { View as RNView, type ViewProps } from 'react-native';

export function View({ className, ...props }: ViewProps) {
  return <RNView className={`bg-background ${className ?? ''}`} {...props} />;
}

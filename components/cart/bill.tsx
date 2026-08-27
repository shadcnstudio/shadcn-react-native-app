import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { money } from '@/lib/menu';
import { View } from 'react-native';

type BillProps = {
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
};

function Line({ label, value, tone }: { label: string; value: number; tone?: 'muted' | 'credit' }) {
  return (
    <View className="flex-row items-center justify-between">
      <Text className={cn('text-sm', tone === 'muted' && 'text-muted-foreground')}>{label}</Text>
      <Text
        className={cn(
          'text-sm tabular-nums',
          tone === 'muted' && 'text-muted-foreground',
          tone === 'credit' && 'text-foreground'
        )}>
        {money(value)}
      </Text>
    </View>
  );
}

export function Bill({ subtotal, discount, tax, total }: BillProps) {
  return (
    <View className="gap-2">
      <Line label="Subtotal" value={subtotal} tone="muted" />
      {discount > 0 ? <Line label="Own cup" value={-discount} tone="credit" /> : null}
      <Line label="Tax" value={tax} tone="muted" />
      <Separator className="my-1" />
      <View className="flex-row items-center justify-between">
        <Text className="font-medium">Total</Text>
        <Text className="text-lg font-semibold tabular-nums">{money(total)}</Text>
      </View>
    </View>
  );
}

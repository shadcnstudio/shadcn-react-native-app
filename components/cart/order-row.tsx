import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { money, type CartItem } from '@/lib/menu';
import { MinusIcon, PlusIcon, Trash2Icon } from 'lucide-react-native';
import { View } from 'react-native';

type OrderRowProps = {
  item: CartItem;
  onChangeQty: (id: string, qty: number) => void;
};

export function OrderRow({ item, onChangeQty }: OrderRowProps) {
  const lastOne = item.qty <= 1;

  return (
    <View className="flex-row gap-3">
      <Avatar alt={item.name} className="size-14 rounded-2xl">
        <AvatarFallback className="bg-muted rounded-2xl">
          <Text className="text-2xl">{item.emoji}</Text>
        </AvatarFallback>
      </Avatar>

      <View className="flex-1 gap-2">
        <View className="flex-row items-start gap-3">
          <View className="flex-1 gap-1">
            <View className="flex-row items-center gap-2">
              <Text numberOfLines={1} className="shrink font-medium">
                {item.name}
              </Text>
              {item.size ? (
                <Badge variant="secondary">
                  <Text>{item.size}</Text>
                </Badge>
              ) : null}
            </View>
            <Text numberOfLines={1} variant="muted">
              {item.detail}
            </Text>
          </View>
          <Text className="text-sm font-medium tabular-nums">
            {money(item.unitPrice * item.qty)}
          </Text>
        </View>

        <View className="border-border flex-row items-center gap-1 self-start rounded-full border p-0.5">
          <Button
            size="icon"
            variant="ghost"
            hitSlop={8}
            className="size-7 rounded-full"
            accessibilityLabel={lastOne ? `Remove ${item.name}` : `One fewer ${item.name}`}
            onPress={() => onChangeQty(item.id, item.qty - 1)}>
            <Icon as={lastOne ? Trash2Icon : MinusIcon} className="size-4" />
          </Button>
          <Text className="w-5 text-center text-sm font-medium tabular-nums">{item.qty}</Text>
          <Button
            size="icon"
            variant="ghost"
            hitSlop={8}
            className="size-7 rounded-full"
            accessibilityLabel={`One more ${item.name}`}
            onPress={() => onChangeQty(item.id, item.qty + 1)}>
            <Icon as={PlusIcon} className="size-4" />
          </Button>
        </View>
      </View>
    </View>
  );
}

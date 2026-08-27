import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Text } from '@/components/ui/text';
import { PICKUP_TIMES } from '@/lib/menu';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type PickupCardProps = {
  pickupValue: string;
  onPickupValueChange: (value: string) => void;
  name: string;
  onNameChange: (value: string) => void;
  ownCup: boolean;
  onOwnCupChange: (value: boolean) => void;
};

export function PickupCard({
  pickupValue,
  onPickupValueChange,
  name,
  onNameChange,
  ownCup,
  onOwnCupChange,
}: PickupCardProps) {
  const insets = useSafeAreaInsets();
  // Look the label up from our own data. The Option handed back by onValueChange
  // does not carry a usable label on web. See the note below.
  const selected = PICKUP_TIMES.find((time) => time.value === pickupValue);
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 16,
    right: 16,
  };

  return (
    <View className="gap-5">
      <View className="gap-2">
        <Label nativeID="pickup-time">Pickup time</Label>
        <Select
          value={selected}
          onValueChange={(option) => {
            if (option) {
              onPickupValueChange(option.value);
            }
          }}>
          <SelectTrigger className="w-full" aria-labelledby="pickup-time">
            <SelectValue placeholder="Pick a time" />
          </SelectTrigger>
          <SelectContent insets={contentInsets} className="w-full">
            {PICKUP_TIMES.map((time) => (
              <SelectItem key={time.value} value={time.value} label={time.label} />
            ))}
          </SelectContent>
        </Select>
      </View>

      <View className="gap-2">
        <Label nativeID="order-name">Name for the order</Label>
        <Input
          aria-labelledby="order-name"
          value={name}
          onChangeText={onNameChange}
          placeholder="Who is picking it up?"
          autoCapitalize="words"
          autoComplete="name"
          returnKeyType="done"
        />
      </View>

      <View className="flex-row items-center justify-between gap-4">
        <View className="flex-1 gap-1">
          <Label nativeID="own-cup" onPress={() => onOwnCupChange(!ownCup)}>
            Bringing my own cup
          </Label>
          <Text variant="muted">Takes 25¢ off and saves a lid.</Text>
        </View>
        <Switch nativeID="own-cup" checked={ownCup} onCheckedChange={onOwnCupChange} />
      </View>
    </View>
  );
}

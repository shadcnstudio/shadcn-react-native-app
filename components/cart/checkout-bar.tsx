import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { money } from '@/lib/menu';
import * as Haptics from 'expo-haptics';
import { ArrowRightIcon } from 'lucide-react-native';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type CheckoutBarProps = {
  total: number;
  itemCount: number;
  pickupLabel: string;
  name: string;
  onConfirm: () => void;
};

export function CheckoutBar({ total, itemCount, pickupLabel, name, onConfirm }: CheckoutBarProps) {
  const insets = useSafeAreaInsets();
  const empty = itemCount === 0;

  function confirm() {
    // expo-haptics ships a web implementation that falls back to navigator.vibrate,
    // so this needs no platform guard.
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    onConfirm();
  }

  return (
    <View
      className="border-border bg-background flex-row items-center gap-4 border-t px-4 pt-3"
      style={{ paddingBottom: insets.bottom + 12 }}>
      <View className="flex-1">
        <Text variant="muted" className="text-xs">
          {empty ? 'Nothing in the cart' : `${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
        </Text>
        <Text className="text-xl font-semibold tabular-nums">{money(total)}</Text>
      </View>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="lg" disabled={empty}>
            <Text>Place order</Text>
            <Icon as={ArrowRightIcon} />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Send this to the counter?</AlertDialogTitle>
            <AlertDialogDescription>
              {`${money(total)} for ${name.trim() || 'pickup'}, ${pickupLabel.toLowerCase()}. We start making it right away, so it cannot be cancelled after this.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              <Text>Not yet</Text>
            </AlertDialogCancel>
            <AlertDialogAction onPress={confirm}>
              <Text>Send it</Text>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </View>
  );
}

import { Bill } from '@/components/cart/bill';
import { CheckoutBar } from '@/components/cart/checkout-bar';
import { OrderRow } from '@/components/cart/order-row';
import { PickupCard } from '@/components/cart/pickup-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { billFor, INITIAL_CART, PICKUP_TIMES, type CartItem } from '@/lib/menu';
import { Stack } from 'expo-router';
import { CircleCheckIcon, MoonStarIcon, SunIcon } from 'lucide-react-native';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Uniwind, useUniwind } from 'uniwind';

const SCREEN_OPTIONS = {
  title: 'Your order',
  headerRight: () => <ThemeToggle />,
};

export default function CartScreen() {
  const [items, setItems] = React.useState<CartItem[]>(INITIAL_CART);
  const [pickupValue, setPickupValue] = React.useState(PICKUP_TIMES[0].value);
  const [name, setName] = React.useState('');
  const [ownCup, setOwnCup] = React.useState(false);
  const [orderNumber, setOrderNumber] = React.useState<string | null>(null);

  const bill = billFor(items, ownCup);
  const itemCount = items.reduce((count, item) => count + item.qty, 0);
  const pickupLabel =
    PICKUP_TIMES.find((time) => time.value === pickupValue)?.label ?? PICKUP_TIMES[0].label;

  function changeQty(id: string, qty: number) {
    setItems((current) =>
      qty <= 0
        ? current.filter((item) => item.id !== id)
        : current.map((item) => (item.id === id ? { ...item, qty } : item))
    );
  }

  function placeOrder() {
    setOrderNumber(`A-${Math.floor(Math.random() * 90 + 10)}`);
  }

  function startOver() {
    setItems(INITIAL_CART);
    setOwnCup(false);
    setName('');
    setPickupValue(PICKUP_TIMES[0].value);
    setOrderNumber(null);
  }

  if (orderNumber) {
    return (
      <>
        <Stack.Screen options={{ ...SCREEN_OPTIONS, title: 'Order sent' }} />
        <View className="bg-background flex-1 items-center justify-center gap-6 p-8">
          <Icon as={CircleCheckIcon} className="text-primary size-16" />
          <View className="gap-2">
            <Text variant="h3" className="text-center">
              We are on it
            </Text>
            <Text variant="muted" className="text-center">
              {`Order ${orderNumber} for ${name.trim() || 'pickup'}. Come to the far end of the counter and look for your name on the cup.`}
            </Text>
          </View>
          <Button variant="outline" onPress={startOver}>
            <Text>Start another order</Text>
          </Button>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={SCREEN_OPTIONS} />
      <View className="bg-background flex-1">
        <ScrollView
          className="flex-1"
          contentContainerClassName="gap-4 p-4 pb-8"
          keyboardShouldPersistTaps="handled"
          automaticallyAdjustKeyboardInsets>
          <Card className="gap-3 py-4">
            <CardHeader className="px-4">
              <CardTitle>Fernwood Coffee</CardTitle>
              <CardDescription>112 Marine Drive, counter pickup</CardDescription>
            </CardHeader>
            <CardContent className="gap-4 px-4">
              {items.length === 0 ? (
                <Text variant="muted">Your cart is empty. Add something warm.</Text>
              ) : null}
              {items.map((item, index) => (
                <React.Fragment key={item.id}>
                  {index > 0 ? <Separator /> : null}
                  <OrderRow item={item} onChangeQty={changeQty} />
                </React.Fragment>
              ))}
            </CardContent>
          </Card>

          <Card className="gap-3 py-4">
            <CardHeader className="px-4">
              <CardTitle>Pickup</CardTitle>
            </CardHeader>
            <CardContent className="px-4">
              <PickupCard
                pickupValue={pickupValue}
                onPickupValueChange={setPickupValue}
                name={name}
                onNameChange={setName}
                ownCup={ownCup}
                onOwnCupChange={setOwnCup}
              />
            </CardContent>
          </Card>

          <Card className="gap-3 py-4">
            <CardHeader className="px-4">
              <CardTitle>Bill</CardTitle>
            </CardHeader>
            <CardContent className="px-4">
              <Bill {...bill} />
            </CardContent>
          </Card>
        </ScrollView>

        <CheckoutBar
          total={bill.total}
          itemCount={itemCount}
          pickupLabel={pickupLabel}
          name={name}
          onConfirm={placeOrder}
        />
      </View>
    </>
  );
}

const THEME_ICONS = {
  light: SunIcon,
  dark: MoonStarIcon,
};

function ThemeToggle() {
  const { theme } = useUniwind();

  return (
    <Button
      onPressIn={() => Uniwind.setTheme(theme === 'dark' ? 'light' : 'dark')}
      size="icon"
      variant="ghost"
      className="ios:size-9 web:mx-4 rounded-full"
      accessibilityLabel="Switch theme">
      <Icon as={THEME_ICONS[theme ?? 'light']} className="size-5" />
    </Button>
  );
}

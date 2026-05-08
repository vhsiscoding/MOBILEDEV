import 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ExpensesProvider } from '@/src/context/ExpensesContext';
export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ExpensesProvider>
        <Stack>
          <Stack.Screen name="index" options={{ title: 'Lista de Gastos' }} />
          <Stack.Screen name="add-expense" options={{ title: 'Adicionar Gasto' }} />
        </Stack>
      </ExpensesProvider>
    </GestureHandlerRootView>
  );
}
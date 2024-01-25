import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RecentExpenses from "./screens/RecentExpenses";
import AllExpenses from "./screens/AllExpenses";
import ManageExpense from "./screens/ManageExpense";
import { Colors } from "./constants/Colors";
import Icon from "./components/ui/Icon";
import IconButton from "./components/ui/IconButton";
import { ExpensesContext } from "./store/ExpensesContext";
import { StatusBar } from "expo-status-bar";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const ExpensesOverView = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: Colors.green,
        },
        headerTintColor: Colors.beige,
        tabBarStyle: { backgroundColor: Colors.green },
        tabBarActiveTintColor: Colors.beige,
        headerRight: ({ tintColor }) => {
          return (
            <IconButton
              name="add"
              size={28}
              color={tintColor}
              onPress={() => navigation.navigate("ManageExpenses")}
            />
          );
        },
      })}
    >
      <BottomTab.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          headerTitle: "Recent Expenses",
          tabBarIcon: ({ size, color }) => (
            <Icon name="time" size={size} color={color} />
          ),
          tabBarLabel: "Recent",
        }}
      />
      <BottomTab.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          headerTitle: "All Expenses",
          tabBarIcon: ({ size, color }) => (
            <Icon name="wallet" size={size} color={color} />
          ),
          tabBarLabel: "All Expenses",
        }}
      />
    </BottomTab.Navigator>
  );
};
const App = () => {
  return (
    <ExpensesContext>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.green },
            headerTintColor: Colors.beige,
          }}
        >
          <Stack.Screen
            name="ExpensesOverview"
            component={ExpensesOverView}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ManageExpenses"
            component={ManageExpense}
            options={{
              presentation: "modal",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ExpensesContext>
  );
};

export default App;

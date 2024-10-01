import {
  Text,
  View,
  Image,
  Button,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import * as SQLite from "expo-sqlite";
import { useEffect, useState, useCallback } from "react";
//notification
import * as Notifications from "expo-notifications";
// language
import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';


//notification
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

    // Set the key-value pairs for the different languages you want to support.
    const translations = {
      en: { welcome: 'Hello', name: 'Charlie' },
      ja: { welcome: 'こんにちは' },
    };
    
    const i18n = new I18n(translations);
    console.log(getLocales()[0].languageCode);
    
    // Set the locale once at the beginning of your app.
    i18n.locale = getLocales()[0].languageCode ?? 'en';
    
    // When a value is missing from a language it'll fall back to another language with the key present.
    i18n.enableFallback = true;
    // To see the fallback mechanism uncomment the line below to force the app to use the Japanese language.
    // i18n.locale = 'ja';

export default function Index() {
  const [state, setState] = useState({
    name: "",
    age: 0,
  });

  const handleName = (t: string) => {
    setState({ ...state, name: t });
  };

  const handleAge = (t: string) => {
    setState({ ...state, age: +t });
  };

  const createTwoButtonAlert = () =>
    Alert.alert("Alert Title", "My Alert Msg", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);


  


  useEffect(() => {



    (async () => {
      const db = await SQLite.openDatabaseAsync("car2");

      await db.runAsync(`
      CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, age INTEGER NOT NULL);
      `);

      await db.closeAsync();

      console.log("testttttt");


    })();
  }, []);

  const handlePress = useCallback(async () => {
    const db = await SQLite.openDatabaseAsync("car2");

    const result = await db.runAsync(
      "INSERT INTO people (name, age) VALUES (?, ?)",
      state.name,
      state.age
    );

    console.log(result);
    await db.closeAsync();
  }, [state]);

  const showTestNotification = useCallback(async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: "Here is the notification body",
        data: { data: "goes here", test: { test1: "more data" } },
      },
      trigger: null,
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Edit app/index.tsx to edit this screen. {i18n.t('welcome')}</Text>


      <Image
        style={styles.img}
        source={require("../assets/images/icon.png")}
      ></Image>

      <View style={styles.container1}>
        <Button title={"2-Button Alert"} onPress={createTwoButtonAlert} />
      </View>

      <TextInput
        value={state.name}
        onChangeText={handleName}
        style={styles.input}
        placeholder="name"
      />
      <TextInput
        keyboardType="numeric"
        value={state.age.toString()}
        onChangeText={handleAge}
        style={styles.input}
        placeholder="age"
      />
      <Button
        onPress={handlePress}
        title="OnPress"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Button
        onPress={showTestNotification}
        title="notification"
        color="#841584"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    height: "10%",
    width: "50%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "red",
  },

  img: {
    height: 50,
    width: 50,
  },
  container1: {
    justifyContent: "center",
    alignItems: "center",
  },
});

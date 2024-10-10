import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/header/Header";
import SectionTitle from "@/components/SectionTitle";
import { Colors } from "@/constants/Colors";

type Props = {
  name: string;
  arabic: string;
  transliteration: string;
  meaning: string;
  reference: string;
};

const DuaItem = ({ item, index }: ListRenderItemInfo<Props>) => {
  return (
    <View
      style={{
        borderWidth: 1,
        padding: 5,
        borderRadius: 5,
        backgroundColor: "#ffffff",
        marginBottom: 14,
        borderStyle: "dashed",
      }}
    >
      <Text
        style={[
          styles.text,
          {
            padding: 10,
            backgroundColor: "#7d7b7b40",
            fontWeight: "bold",
            color: Colors.darkSea,
          },
        ]}
      >
        {index + 1}. {item.name}
      </Text>
      <View
        style={{
          padding: 10,
        }}
      >
        <Text style={[styles.text]}>{item.transliteration}</Text>
        <Text style={[styles.text]}>{item.arabic}</Text>
        <Text style={[styles.text]}>{item.meaning}</Text>
      </View>
      <Text
        style={[
          styles.text,
          {
            paddingLeft: 10,
          },
        ]}
      >
        - {item.reference}
      </Text>
    </View>
  );
};

const Dua = (props: Props) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const data = require("@/assets/data/customApi.json");
      setData(data);
    })();
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <Header title={"Dua"} goBack />
      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 5,
          flex: 1,
        }}
      >
        <SectionTitle title={"Populer Dua's:"} />
        {data !== null ? (
          <FlatList
            style={{ flex: 1 }}
            data={data.dua_list}
            renderItem={DuaItem}
            keyExtractor={(item, index) => `${index}`}
          />
        ) : (
          <Text>Loading..</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Dua;

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
  },
});

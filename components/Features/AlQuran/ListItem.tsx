import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

// "number": 1,
// "name": "سُورَةُ ٱلْفَاتِحَةِ",
// "englishName": "Al-Faatiha",
// "englishNameTranslation": "The Opening",
// "numberOfAyahs": 7,
// "revelationType": "Meccan"

interface ListItemProps {
  id: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  juz_number: number;
  verse_mapping: object;
  onPress?: () => void;
}

const ListItem: React.FC<ListItemProps> = ({
  id,
  name,
  englishName,
  englishNameTranslation,
  juz_number,
  verse_mapping,
  onPress,
}) => {
  const [firstKey, setFirstKey] = useState<String | null>(null);
  const [lastKey, setLastKey] = useState<String | null>(null);

  useEffect(() => {
    if (verse_mapping) {
      const verseKeys = Object.keys(verse_mapping);
      setFirstKey(verseKeys[0]);
      setLastKey(verseKeys[verseKeys.length - 1]);
    }
  }, [verse_mapping]);

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.numberContainer}>
        <Text style={styles.number}>{id}</Text>
      </View>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{englishName}</Text>
        {name && (
          <>
            <Text style={styles.title}> | </Text>
            <Text style={styles.title}>{name}</Text>
          </>
        )}
        {juz_number && verse_mapping && (
          <>
            {/* <Text style={styles.title}>{juz_number}</Text> */}
            <Text style={styles.title}>{`Surah (${firstKey}-${lastKey})`}</Text>
          </>
        )}
      </View>

      <Ionicons
        onPress={() => console.log("bookmark")}
        name="bookmark-outline"
        size={24}
        color="white"
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.lightSea,
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    justifyContent: "space-between",
  },
  numberContainer: {
    width: 30,
    height: 30,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  number: {
    fontFamily: "MontserratBold",
    fontWeight: "bold",
    color: "white",
    fontSize: 12,
  },
  titleWrapper: {
    flexDirection: "row",
    justifyContent: "center",
  },
  title: {
    fontFamily: "MontserratMedium",
    fontWeight: "medium",
    color: "white",
    fontSize: 16,
  },
  icon: {
    // marginLeft: "auto",
  },
});

export default ListItem;

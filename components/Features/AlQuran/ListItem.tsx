import React, { useEffect, useRef, useState } from "react";
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
  surah_number?: number;
  name?: string;
  englishName?: string;
  englishNameTranslation?: string;
  juz_number?: number;
  verse_mapping?: string;
  onPress?: () => void;
  onBookmarkPress?: any;
  isBookmarked?: any;
}

const ListItem: React.FC<ListItemProps> = ({
  surah_number,
  name,
  englishName,
  englishNameTranslation,
  juz_number,
  verse_mapping,
  onPress,
  onBookmarkPress,
  isBookmarked,
}) => {
  // check bookmark -

  // step-1 : onload check if bookmark exitst - if exit make it red
  // step-2 : onbookmark press - make exit true
  const [exist, setExist] = useState<boolean>(false);
  const isBookmarkRef = useRef(isBookmarked);

  const handleBookmark = () => {
    onBookmarkPress();
    setExist(!exist);
    if (isBookmarkRef.current === 1) {
      isBookmarkRef.current = 0;
    } else {
      isBookmarkRef.current = 1;
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.numberContainer}>
        <Text style={styles.number}>{`${
          juz_number ? juz_number : surah_number
        }`}</Text>
      </View>
      <View style={styles.titleWrapper}>
        {name && <Text style={styles.title}>{englishName}</Text>}
        {name && <Text style={styles.title}>{name}</Text>}
        {juz_number && verse_mapping && (
          <>
            {/* <Text style={styles.title}>{juz_number}</Text> */}
            <Text style={styles.title}>{`Ayah (${verse_mapping})`}</Text>
          </>
        )}
      </View>

      <Ionicons
        onPress={handleBookmark}
        name="bookmark-outline"
        size={24}
        color={isBookmarkRef.current === 1 ? "red" : "white"}
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
    fontSize: 14,
  },
  titleWrapper: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
  title: {
    fontFamily: "MontserratMedium",
    fontWeight: "medium",
    color: "white",
    fontSize: 18,
  },
  icon: {
    // marginLeft: "auto",
    fontSize: 28,
  },
});

export default ListItem;

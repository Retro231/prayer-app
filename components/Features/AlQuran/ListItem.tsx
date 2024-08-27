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
  surah_number?: number;
  name?: string;
  englishName?: string;
  englishNameTranslation?: string;
  juz_number?: number;
  verse_mapping?: string;
  bookmarkTitle?: string;
  bookmarkList?: any;
  bookmarkId?: number;
  onPress?: () => void;
  onBookmarkPress?: any;
}

const ListItem: React.FC<ListItemProps> = ({
  surah_number,
  name,
  englishName,
  englishNameTranslation,
  juz_number,
  verse_mapping,
  bookmarkTitle,
  bookmarkList,
  bookmarkId,
  onPress,
  onBookmarkPress,
}) => {
  // check bookmark -

  // step-1 : onload check if bookmark exitst - if exit make it red
  // step-2 : onbookmark press - make exit true
  const [exist, setExist] = useState<boolean>(false);

  const handleBookmark = () => {
    onBookmarkPress();
    if (!exist) {
      setExist(true);
    }
    console.log(bookmarkList);
  };

  // if (juz_number) {
  //   const isFound = bookmarkList?.find(
  //     (data: any) => juz_number === data.data.juz_number
  //   );
  //   isFound && setExist(true);
  // } else {
  //   const isFound = bookmarkList?.find(
  //     (data: any) => surah_number === data.data.data_id
  //   );
  //   isFound && setExist(true);
  // }

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.numberContainer}>
        {!bookmarkId ? (
          <Text style={styles.number}>{`${
            juz_number ? juz_number : surah_number
          }`}</Text>
        ) : (
          <Text style={styles.number}>{bookmarkId}</Text>
        )}
      </View>
      <View style={styles.titleWrapper}>
        {bookmarkTitle && <Text style={styles.title}>{bookmarkTitle}</Text>}
        {name && <Text style={styles.title}>{englishName}</Text>}
        {name && <Text style={styles.title}>{name}</Text>}
        {juz_number && verse_mapping && (
          <>
            {/* <Text style={styles.title}>{juz_number}</Text> */}
            <Text style={styles.title}>{`Surah (${verse_mapping})`}</Text>
          </>
        )}
      </View>

      <Ionicons
        onPress={handleBookmark}
        name="bookmark-outline"
        size={24}
        color={exist ? "red" : "white"}
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

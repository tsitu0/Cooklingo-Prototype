import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Skill = {
  name: string;
  rating: number;
};

const skillIconUrlByName: Record<string, string> = {
  "Knife Skills":
    "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f52a.png",
  Sauteing:
    "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f373.png",
  Baking:
    "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f9c1.png",
  Plating:
    "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f37d.png",
};

const topSkills: Skill[] = [
  { name: "Knife Skills", rating: 4 },
  { name: "Sauteing", rating: 4 },
  { name: "Seasoning", rating: 5 },
  { name: "Heat Control", rating: 4 },
  { name: "Food Prep", rating: 4 },
];

const developingSkills: Skill[] = [
  { name: "Baking", rating: 4 },
  { name: "Plating", rating: 4 },
];

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <View style={styles.starRow}>
      {Array.from({ length: 5 }).map((_, index) => {
        const isFilled = index < rating;
        return (
          <Text
            key={`${index}-${isFilled ? "filled" : "empty"}`}
            style={[
              styles.star,
              { fontSize: size },
              isFilled ? styles.filledStar : styles.emptyStar,
            ]}
          >
            ★
          </Text>
        );
      })}
    </View>
  );
}

function SkillRow({ skill }: { skill: Skill }) {
  const iconUrl = skillIconUrlByName[skill.name];

  return (
    <View style={styles.skillRow}>
      <View style={styles.skillAvatar}>
        {iconUrl ? (
          <Image
            source={{ uri: iconUrl }}
            style={styles.skillAvatarImage}
            resizeMode="contain"
          />
        ) : null}
      </View>
      <View style={styles.skillTextGroup}>
        <Text style={styles.skillName}>{skill.name}</Text>
        <StarRating rating={skill.rating} />
      </View>
    </View>
  );
}

export default function SkillsPage() {
  const router = useRouter();
  const overallRating = 4;
  const [showMoreTopSkills, setShowMoreTopSkills] = useState(false);

  const chevronText = useMemo(
    () => (showMoreTopSkills ? "⌃" : "⌄"),
    [showMoreTopSkills],
  );

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} style={styles.iconButton}>
          <Text style={styles.iconText}>←</Text>
        </Pressable>
      </View>

      <View style={styles.hero}>
        <View style={styles.avatarBorder}>
          <View style={styles.avatar} />
        </View>
      </View>

      <View style={styles.overallRatingWrap}>
        <StarRating rating={overallRating} size={48} />
      </View>

      <View style={styles.sectionIntro}>
        <Text style={styles.sectionTitle}>Top Techniques</Text>
        <Text style={styles.sectionSubtitle}>
          Your strongest cooking skills right now.
        </Text>
      </View>

      <View style={styles.sectionBody}>
        {(showMoreTopSkills ? topSkills : topSkills.slice(0, 2)).map(
          (skill) => (
            <SkillRow key={skill.name} skill={skill} />
          ),
        )}
      </View>

      <View style={styles.chevronWrap}>
        <Pressable
          onPress={() => setShowMoreTopSkills((prev) => !prev)}
          style={styles.chevronButton}
        >
          <Text style={styles.chevron}>{chevronText}</Text>
        </Pressable>
      </View>

      <View style={styles.sectionIntro}>
        <Text style={styles.sectionTitle}>Developing Skills</Text>
        <Text style={styles.sectionSubtitle}>
          Keep practicing these to level up.
        </Text>
      </View>
      <View style={styles.sectionBody}>
        {developingSkills.map((skill) => (
          <SkillRow key={skill.name} skill={skill} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#eef2f5",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 36,
  },
  topBar: {
    flexDirection: "row",
    marginBottom: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#1f2937",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8fafc",
  },
  iconText: {
    fontSize: 20,
    color: "#111827",
    fontWeight: "600",
  },
  hero: {
    alignItems: "center",
    marginTop: 4,
    marginBottom: 16,
  },
  avatarBorder: {
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: "#d4af37",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 176,
    height: 176,
    borderRadius: 88,
    backgroundColor: "#020617",
  },
  overallRatingWrap: {
    alignItems: "center",
    marginBottom: 14,
  },
  starRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  star: {
    lineHeight: 20,
    fontWeight: "700",
  },
  filledStar: {
    color: "#d4af37",
  },
  emptyStar: {
    color: "#cfd8e3",
  },
  sectionIntro: {
    marginBottom: 10,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
  },
  sectionSubtitle: {
    marginTop: 2,
    fontSize: 13,
    color: "#6b7280",
  },
  sectionBody: {
    borderTopWidth: 4,
    borderColor: "#7b8088",
    paddingTop: 14,
    marginBottom: 8,
  },
  skillRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  skillAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: "#111827",
    backgroundColor: "#e7ecf1",
    marginRight: 14,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  skillAvatarImage: {
    width: 28,
    height: 28,
  },
  skillTextGroup: {
    flex: 1,
  },
  skillName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },
  chevronWrap: {
    alignItems: "center",
    marginVertical: 6,
  },
  chevronButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  chevron: {
    fontSize: 28,
    lineHeight: 28,
    color: "#111827",
  },
});

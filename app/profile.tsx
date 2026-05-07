import { useRouter } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const profilePhotoUrl =
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=512&q=80";

const friends = [
  {
    name: "Maya",
    photoUrl:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=256&q=80",
  },
  {
    name: "Leo",
    photoUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
  },
  {
    name: "Ava",
    photoUrl:
      "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=256&q=80",
  },
  {
    name: "Noah",
    photoUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80",
  },
  {
    name: "Ivy",
    photoUrl:
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=256&q=80",
  },
  {
    name: "Ethan",
    photoUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
  },
  {
    name: "Zoe",
    photoUrl:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80",
  },
  {
    name: "Kai",
    photoUrl:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=256&q=80",
  },
];

const favoritedRecipes = [
  {
    name: "Spicy Korean Tteokbokki",
    level: "Intermediate",
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Tteokbokki.JPG/1024px-Tteokbokki.JPG",
  },
  {
    name: "Classic Carbonara",
    level: "Intermediate",
    photoUrl:
      "https://images.unsplash.com/photo-1608756687911-aa1599ab3bd9?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Chicken Tikka Masala",
    level: "Intermediate",
    photoUrl:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80",
  },
];

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} style={styles.iconButton}>
          <Text style={styles.iconText}>←</Text>
        </Pressable>
      </View>

      <View style={styles.hero}>
        <Image
          source={{ uri: profilePhotoUrl }}
          style={styles.avatar}
          resizeMode="cover"
        />
        <View style={styles.onlineDot} />
      </View>

      <Text style={styles.name}>Hao Yi Wang</Text>
      <Text style={styles.handle}>@cooklingo_learner</Text>

      <View style={styles.skillRow}>
        <Pressable
          style={styles.skillPill}
          onPress={() => router.push("/skillspage")}
        >
          <Text style={styles.skillPillText}>Skill: ★★★★☆</Text>
        </Pressable>
        <View style={styles.roundBadge}>
          <Text style={styles.roundBadgeText}>4.0</Text>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Friends</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.friendsRow}
      >
        {friends.map((friend) => (
          <View key={friend.name} style={styles.friendItem}>
            <Image
              source={{ uri: friend.photoUrl }}
              style={styles.friendAvatar}
              resizeMode="cover"
            />
            <Text style={styles.friendName}>{friend.name}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Favorited Recipes</Text>
        <Pressable
          style={styles.sectionActionButton}
          onPress={() => router.push("/gallery")}
        >
          <Text style={styles.sectionActionButtonText}>Gallery</Text>
        </Pressable>
      </View>
      <View style={styles.recipeCards}>
        {favoritedRecipes.map((recipe) => (
          <View key={recipe.name} style={styles.recipeCard}>
            <Image
              source={{ uri: recipe.photoUrl }}
              style={styles.recipeImage}
              resizeMode="cover"
            />
            <Text style={styles.recipeName}>{recipe.name}</Text>
            <Text style={styles.recipeLevel}>{recipe.level}</Text>
          </View>
        ))}
      </View>

      <Pressable style={styles.historyButton}>
        <Text style={styles.historyButtonText}>Recipe History</Text>
      </Pressable>
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
    marginBottom: 14,
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
    alignSelf: "center",
    marginTop: 4,
    marginBottom: 12,
  },
  avatar: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#111827",
  },
  onlineDot: {
    position: "absolute",
    right: 10,
    bottom: 8,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#d1d5db",
    borderWidth: 2,
    borderColor: "#eef2f5",
  },
  name: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 2,
  },
  handle: {
    textAlign: "center",
    fontSize: 15,
    color: "#6b7280",
    marginBottom: 16,
  },
  skillRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginBottom: 22,
  },
  skillPill: {
    borderWidth: 1.5,
    borderColor: "#111827",
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: "#f8fafc",
  },
  skillPillText: {
    fontSize: 15,
    color: "#111827",
    fontWeight: "600",
  },
  roundBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8fafc",
  },
  roundBadgeText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionActionButton: {
    borderWidth: 1.5,
    borderColor: "#111827",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 5,
    backgroundColor: "#dbe3ea",
  },
  sectionActionButtonText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#111827",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  sectionMeta: {
    marginTop: 2,
    fontSize: 13,
    color: "#6b7280",
  },
  friendsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
    paddingRight: 8,
  },
  friendItem: {
    width: 84,
    minHeight: 110,
    alignItems: "center",
  },
  friendAvatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 1.5,
    borderColor: "#111827",
    backgroundColor: "#f8fafc",
    marginBottom: 10,
  },
  friendName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },
  recipeCards: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 22,
  },
  recipeCard: {
    width: "31%",
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#111827",
    padding: 8,
    backgroundColor: "#f8fafc",
    minHeight: 200,
  },
  recipeImage: {
    height: 148,
    borderRadius: 10,
    backgroundColor: "#dbe3ea",
    marginBottom: 12,
  },
  recipeName: {
    fontSize: 12,
    fontWeight: "700",
    color: "#111827",
  },
  recipeLevel: {
    marginTop: 2,
    fontSize: 11,
    color: "#6b7280",
  },
  historyButton: {
    alignSelf: "center",
    width: 212,
    height: 38,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#111827",
    backgroundColor: "#cdd6e0",
    alignItems: "center",
    justifyContent: "center",
  },
  historyButtonText: {
    color: "#111827",
    fontSize: 13,
    fontWeight: "700",
  },
});

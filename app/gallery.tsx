import { useRouter } from "expo-router";
import { Dimensions } from "react-native";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const ROW_WIDTH = Dimensions.get("window").width * 0.72;
const CARD_WIDTH = (ROW_WIDTH - 10) / 2;

type Technique = {
  name: string;
  difficulty: number;
};

type Recipe = {
  id: string;
  title: string;
  subtitle: string;
  photos: string[];
  techniques: Technique[];
};

const techniqueIconUrlByName: Record<string, string> = {
  "Knife Skills":
    "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f52a.png",
  "Heat Control":
    "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f525.png",
  Plating:
    "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f37d.png",
  Timing:
    "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/23f1.png",
  Seasoning:
    "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f9c2.png",
  "Sauce Emulsion":
    "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f944.png",
  Marinating:
    "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f9c4.png",
  Simmering:
    "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f35b.png",
  "Spice Bloom":
    "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f9c5.png",
  "Rice Prep":
    "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f35a.png",
  "Food Prep":
    "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f957.png",
  "Stir Frying":
    "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f373.png",
};

const recipes: Recipe[] = [
  {
    id: "sushi",
    title: "Salmon Sushi",
    subtitle: "Japanese • Sushi",
    photos: [
      "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=900&q=80",
    ],
    techniques: [
      { name: "Knife Skills", difficulty: 4 },
      { name: "Rice Prep", difficulty: 3 },
      { name: "Plating", difficulty: 2 },
    ],
  },
  {
    id: "carbonara",
    title: "Classic Carbonara",
    subtitle: "Italian • Pasta",
    photos: [
      "https://images.unsplash.com/photo-1608756687911-aa1599ab3bd9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1608756687911-aa1599ab3bd9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1608756687911-aa1599ab3bd9?auto=format&fit=crop&w=900&q=80",
    ],
    techniques: [
      { name: "Timing", difficulty: 4 },
      { name: "Sauce Emulsion", difficulty: 4 },
      { name: "Seasoning", difficulty: 3 },
    ],
  },
  {
    id: "tikka",
    title: "Chicken Tikka Masala",
    subtitle: "Indian • Curry",
    photos: [
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80",
    ],
    techniques: [
      { name: "Marinating", difficulty: 3 },
      { name: "Simmering", difficulty: 3 },
      { name: "Spice Bloom", difficulty: 4 },
    ],
  },
  {
    id: "stirfry",
    title: "Veggie Stir Fry",
    subtitle: "Chinese • Weeknight",
    photos: [
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
    ],
    techniques: [
      { name: "Stir Frying", difficulty: 3 },
      { name: "Food Prep", difficulty: 2 },
      { name: "Seasoning", difficulty: 2 },
    ],
  },
];

function getStars(difficulty: number) {
  const filled = "★".repeat(Math.max(0, Math.min(5, difficulty)));
  const empty = "☆".repeat(5 - Math.max(0, Math.min(5, difficulty)));
  return `${filled}${empty}`;
}

function GalleryCardRow({
  photos,
  techniques,
}: {
  photos: string[];
  techniques: Technique[];
}) {
  return (
    <>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardsRow}
      >
        {photos.map((uri, idx) => (
          <Image
            key={`${uri}-${idx}`}
            source={{ uri }}
            style={styles.cardImage}
            resizeMode="cover"
          />
        ))}
      </ScrollView>
      <View style={styles.techniqueMatrix}>
        <View style={styles.techniqueLabelColumn}>
          {techniques.map((technique) => (
            <Text key={technique.name} style={styles.techniqueLabel}>
              {technique.name}
            </Text>
          ))}
        </View>

        <View style={styles.techniqueCircleRow}>
          {techniques.map((technique, index) => (
            <View
              key={`${technique.name}-${index}`}
              style={[
                styles.techniqueDot,
                index === 1 ? styles.techniqueDotActive : undefined,
              ]}
            >
              {techniqueIconUrlByName[technique.name] ? (
                <Image
                  source={{ uri: techniqueIconUrlByName[technique.name] }}
                  style={styles.techniqueDotImage}
                  resizeMode="contain"
                />
              ) : null}
            </View>
          ))}
        </View>

        <View style={styles.techniqueStarColumn}>
          {techniques.map((technique) => (
            <Text key={`${technique.name}-stars`} style={styles.techniqueStars}>
              {getStars(technique.difficulty)}
            </Text>
          ))}
        </View>
      </View>
    </>
  );
}

export default function GalleryScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Pressable
        onPress={() => router.push("/profile")}
        style={styles.backButton}
      >
        <Text style={styles.backIcon}>←</Text>
      </Pressable>

      <View style={styles.headerLines}>
        <View style={styles.headerLineLong} />
        <Text style={styles.headerTitle}>Your Gallery</Text>
        <View style={styles.headerLineShort} />
      </View>
      <Pressable style={styles.addRecipeButton}>
        <Text style={styles.addRecipeButtonText}>+ Add Recipe</Text>
      </Pressable>

      <View style={styles.narrowColumn}>
        {recipes.map((recipe) => (
          <View key={recipe.id}>
            <View style={styles.sectionHeader}>
              <View style={styles.recipeHeaderText}>
                <Text style={styles.recipeTitle}>{recipe.title}</Text>
                <Text style={styles.recipeSubtitle}>{recipe.subtitle}</Text>
              </View>
              <Pressable style={styles.goToRecipeButton}>
                <Text style={styles.goToRecipeButtonText}>Go to recipe</Text>
              </Pressable>
            </View>
            <GalleryCardRow
              photos={recipe.photos}
              techniques={recipe.techniques}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#dde2e8",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 34,
  },
  narrowColumn: {
    width: "72%",
    alignSelf: "center",
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: "#111827",
    backgroundColor: "#f8fafc",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  backIcon: {
    fontSize: 22,
    fontWeight: "600",
    color: "#111827",
  },
  headerLines: {
    alignItems: "center",
    marginBottom: 24,
  },
  headerLineLong: {
    width: 224,
    height: 7,
    borderRadius: 999,
    backgroundColor: "#7b8088",
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 8,
  },
  headerLineShort: {
    width: 180,
    height: 7,
    borderRadius: 999,
    backgroundColor: "#7b8088",
  },
  addRecipeButton: {
    alignSelf: "center",
    minWidth: 132,
    height: 30,
    borderRadius: 999,
    borderWidth: 1.4,
    borderColor: "#111827",
    backgroundColor: "#cfd6df",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  addRecipeButtonText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#111827",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    marginTop: 10,
  },
  recipeHeaderText: {
    flex: 1,
    paddingRight: 12,
  },
  recipeTitle: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "800",
  },
  recipeSubtitle: {
    marginTop: 4,
    color: "#6b7280",
    fontSize: 12,
    fontWeight: "600",
  },
  goToRecipeButton: {
    minWidth: 102,
    height: 24,
    borderRadius: 999,
    borderWidth: 1.4,
    borderColor: "#111827",
    backgroundColor: "#cfd6df",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  goToRecipeButtonText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#111827",
  },
  cardsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
    paddingRight: 10,
  },
  cardImage: {
    width: CARD_WIDTH,
    height: 192,
    borderRadius: 30,
    borderWidth: 1.2,
    borderColor: "#aeb9c8",
  },
  techniqueMatrix: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 18,
  },
  techniqueLabelColumn: {
    gap: 8,
    width: 110,
  },
  techniqueCircleRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 2,
  },
  techniqueStarColumn: {
    gap: 8,
    width: 90,
  },
  techniqueDot: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1.2,
    borderColor: "#111827",
    backgroundColor: "#e7ecf2",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  techniqueDotActive: {
    backgroundColor: "#d6dde6",
  },
  techniqueDotImage: {
    width: 26,
    height: 26,
  },
  techniqueLabel: {
    color: "#111827",
    fontSize: 12,
    fontWeight: "600",
  },
  techniqueStars: {
    textAlign: "right",
    color: "#111827",
    fontSize: 12,
    letterSpacing: 0.4,
  },
});

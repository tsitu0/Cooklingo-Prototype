import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Skill {
  name: string;
  value: number | null; // null = N/A (unrated)
}

export interface Cook {
  initials: string;
  color: string;
}

export interface Recipe {
  title: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  time: string;
  servings: number;
  calories: number;
  author: {
    initials: string;
    name: string;
    postedAt: string;
  };
  likes: number;
  xp: number;
  skills: Skill[];
  cooks: Cook[];
}

// ─── Sample data ──────────────────────────────────────────────────────────────

export const SAMPLE_RECIPE: Recipe = {
  title: "Beef Wellington",
  difficulty: "Intermediate",
  time: "2h 30m",
  servings: 4,
  calories: 680,
  author: { initials: "JL", name: "Jamie Lee", postedAt: "2 days ago" },
  likes: 24,
  xp: 120,
  skills: [
    { name: "Knife work", value: 8 },
    { name: "Heat control", value: 9 },
    { name: "Timing", value: 7 },
    { name: "Pastry", value: null },
    { name: "Seasoning", value: 6 },
  ],
  cooks: [{ initials: "JL", color: "#b7e4c7" }],
};

// ─── Constants ────────────────────────────────────────────────────────────────

const DIFFICULTY_COLORS: Record<
  Recipe["difficulty"],
  { bg: string; text: string }
> = {
  Beginner: { bg: "#1b4332", text: "#d8f3dc" },
  Intermediate: { bg: "#2d6a4f", text: "#d8f3dc" },
  Advanced: { bg: "#081c15", text: "#74c69d" },
};

const SCREEN_WIDTH = Dimensions.get("window").width;
// 3 cols with 16px side padding and 8px gaps between
const COOK_SLOT_SIZE = (SCREEN_WIDTH - 32 - 16) / 3;

// ─── Sub-components ───────────────────────────────────────────────────────────

function SkillBar({ skill }: { skill: Skill }) {
  const pct = skill.value !== null ? skill.value / 10 : 0;

  return (
    <View style={styles.skillRow}>
      <Text style={styles.skillName}>{skill.name}</Text>
      <View style={styles.skillTrack}>
        <View style={[styles.skillFill, { flex: pct }]} />
        <View style={{ flex: 1 - pct }} />
      </View>
      <Text style={[styles.skillValue, skill.value === null && styles.skillNA]}>
        {skill.value !== null ? skill.value : "N/A"}
      </Text>
    </View>
  );
}

function MetaChip({ icon, label }: { icon: string; label: string }) {
  return (
    <View style={styles.metaChip}>
      <Text style={styles.metaIcon}>{icon}</Text>
      <Text style={styles.metaLabel}>{label}</Text>
    </View>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface RecipePageProps {
  recipe?: Recipe;
  onBack?: () => void;
  onStartCooking?: () => void;
  onAddCook?: () => void;
}

export default function RecipePage({
  recipe = SAMPLE_RECIPE,
  onBack,
  onStartCooking,
  onAddCook,
}: RecipePageProps) {
  const diffColors = DIFFICULTY_COLORS[recipe.difficulty];
  const emptyCookSlots = Math.max(0, 2 - recipe.cooks.length);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Hero ── */}
        <View style={styles.hero}>
          <LinearGradient
            colors={["#1b4332", "#40916c", "#74c69d"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.65)"]}
            style={[StyleSheet.absoluteFill, { top: "40%" }]}
          />

          <TouchableOpacity
            onPress={onBack}
            style={styles.backBtn}
            accessibilityLabel="Go back"
            accessibilityRole="button"
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>

          <View style={[styles.diffBadge, { backgroundColor: diffColors.bg }]}>
            <Text style={[styles.diffBadgeText, { color: diffColors.text }]}>
              {recipe.difficulty}
            </Text>
          </View>

          <View style={styles.heroBottom}>
            <Text style={styles.heroTitle}>{recipe.title}</Text>
            <View style={styles.metaRow}>
              <MetaChip icon="🕐" label={recipe.time} />
              <MetaChip icon="👥" label={`${recipe.servings} servings`} />
              <MetaChip icon="🔥" label={`${recipe.calories} kcal`} />
            </View>
          </View>
        </View>

        {/* ── Body ── */}
        <View style={styles.body}>

          {/* Author row */}
          <View style={styles.authorRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{recipe.author.initials}</Text>
            </View>
            <View style={styles.authorInfo}>
              <Text style={styles.authorName}>{recipe.author.name}</Text>
              <Text style={styles.authorSub}>
                posted their cook · {recipe.author.postedAt}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.likeBtn}
              accessibilityRole="button"
              accessibilityLabel={`Like, ${recipe.likes} likes`}
            >
              <Text style={styles.likeBtnText}>♡ {recipe.likes}</Text>
            </TouchableOpacity>
          </View>

          {/* Community cooks */}
          <Text style={styles.sectionLabel}>Community cooks</Text>
          <View style={styles.cooksGrid}>
            {recipe.cooks.map((cook, i) => (
              <View
                key={i}
                style={[
                  styles.cookSlot,
                  {
                    backgroundColor: cook.color,
                    width: COOK_SLOT_SIZE,
                    height: COOK_SLOT_SIZE,
                  },
                ]}
              >
                <Text style={styles.cookInitials}>{cook.initials}</Text>
              </View>
            ))}
            {Array.from({ length: emptyCookSlots }).map((_, i) => (
              <TouchableOpacity
                key={`empty-${i}`}
                onPress={onAddCook}
                style={[
                  styles.cookSlotEmpty,
                  { width: COOK_SLOT_SIZE, height: COOK_SLOT_SIZE },
                ]}
                accessibilityRole="button"
                accessibilityLabel="Add your cook photo"
              >
                <Text style={styles.cookSlotPlus}>+</Text>
                <Text style={styles.cookSlotAddText}>add yours</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Required skills */}
          <Text style={styles.sectionLabel}>Required skills</Text>
          <View style={styles.naNotice}>
            <Text style={styles.naNoticeIcon}>ℹ</Text>
            <Text style={styles.naNoticeText}>
              Difficulty ratings are community-driven and update after cooks
              submit their skill feedback. Skills show N/A until enough cooks
              rate them.
            </Text>
          </View>
          <View style={styles.skillsContainer}>
            {recipe.skills.map((skill) => (
              <SkillBar key={skill.name} skill={skill} />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* ── Sticky CTA ── */}
      <View style={styles.ctaContainer}>
        <TouchableOpacity
          onPress={onStartCooking}
          style={styles.startBtn}
          accessibilityRole="button"
          accessibilityLabel={`Start cooking ${recipe.title}, earn ${recipe.xp} XP`}
          activeOpacity={0.85}
        >
          <Text style={styles.startBtnText}>▶  Start cooking</Text>
          <View style={styles.xpPill}>
            <Text style={styles.xpPillText}>+{recipe.xp} XP</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
  },

  // Hero
  hero: {
    height: 220,
    overflow: "hidden",
  },
  backBtn: {
    position: "absolute",
    top: 16,
    left: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  backArrow: {
    color: "#fff",
    fontSize: 18,
  },
  diffBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    zIndex: 10,
  },
  diffBadgeText: {
    fontSize: 11,
    fontWeight: "500",
    letterSpacing: 0.4,
  },
  heroBottom: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
  },
  heroTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "500",
    marginBottom: 6,
    lineHeight: 26,
  },
  metaRow: {
    flexDirection: "row",
    gap: 12,
  },
  metaChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaIcon: {
    fontSize: 12,
  },
  metaLabel: {
    color: "rgba(255,255,255,0.78)",
    fontSize: 12,
  },

  // Body
  body: {
    padding: 16,
  },

  // Author
  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "#e5e7eb",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#d8f3dc",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#2d6a4f",
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
  },
  authorSub: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 1,
  },
  likeBtn: {
    borderWidth: 0.5,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  likeBtnText: {
    fontSize: 12,
    color: "#111827",
  },

  // Section label
  sectionLabel: {
    fontSize: 11,
    fontWeight: "500",
    letterSpacing: 0.8,
    color: "#9ca3af",
    textTransform: "uppercase",
    marginBottom: 10,
  },

  // Community cooks grid
  cooksGrid: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },
  cookSlot: {
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
  },
  cookInitials: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2d6a4f",
  },
  cookSlotEmpty: {
    borderRadius: 8,
    backgroundColor: "#f9fafb",
    borderWidth: 0.5,
    borderColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  cookSlotPlus: {
    fontSize: 20,
    color: "#9ca3af",
  },
  cookSlotAddText: {
    fontSize: 10,
    color: "#9ca3af",
  },

  // N/A notice
  naNotice: {
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  naNoticeIcon: {
    fontSize: 15,
    color: "#9ca3af",
    marginTop: 1,
  },
  naNoticeText: {
    flex: 1,
    fontSize: 12,
    color: "#6b7280",
    lineHeight: 18,
  },

  // Skills
  skillsContainer: {
    marginBottom: 8,
  },
  skillRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  skillName: {
    fontSize: 13,
    color: "#6b7280",
    width: 90,
  },
  skillTrack: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#f3f4f6",
    flexDirection: "row",
    overflow: "hidden",
  },
  skillFill: {
    height: "100%",
    backgroundColor: "#2d6a4f",
    borderRadius: 3,
  },
  skillValue: {
    fontSize: 12,
    fontWeight: "500",
    color: "#111827",
    width: 28,
    textAlign: "right",
  },
  skillNA: {
    color: "#9ca3af",
  },

  // CTA
  ctaContainer: {
    padding: 16,
    paddingBottom: 24,
    borderTopWidth: 0.5,
    borderTopColor: "#e5e7eb",
    backgroundColor: "#fff",
  },
  startBtn: {
    height: 48,
    borderRadius: 24,
    backgroundColor: "#2d6a4f",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  startBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
  },
  xpPill: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  xpPillText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
});
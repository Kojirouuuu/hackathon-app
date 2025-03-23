import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { fetchAuthSession } from "aws-amplify/auth";

export default function AuthInfoScreen() {
  const [authInfo, setAuthInfo] = useState<{
    identityId: string;
    tokens: any;
  } | null>(null);

  useEffect(() => {
    loadAuthSession();
  }, []);

  const loadAuthSession = async () => {
    try {
      const session = await fetchAuthSession();
      console.info("🔑 Auth session loaded:", session);
      if (session.identityId) {
        setAuthInfo({
          identityId: session.identityId,
          tokens: session.tokens,
        });
      } else {
        console.warn("⚠️ No identity ID found in session");
      }
    } catch (error) {
      console.error("❌ Error loading auth session:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>認証情報</Text>
      {authInfo ? (
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Identity ID:</Text>
          <Text style={styles.value}>{authInfo.identityId}</Text>

          <Text style={styles.label}>Access Token:</Text>
          <Text style={styles.value} numberOfLines={3}>
            {authInfo.tokens?.accessToken?.toString()}
          </Text>

          <Text style={styles.label}>ID Token:</Text>
          <Text style={styles.value} numberOfLines={3}>
            {authInfo.tokens?.idToken?.toString()}
          </Text>
        </View>
      ) : (
        <Text>認証情報を読み込み中...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  infoContainer: {
    gap: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  value: {
    fontSize: 10,
    color: "#666",
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 5,
  },
});

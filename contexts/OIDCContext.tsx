import React from "react";
import { AuthProvider } from "react-oidc-context";
import { Platform } from "react-native";
import awsconfig from "../src/aws-exports";

const getRedirectUri = () => {
  if (Platform.OS === "web") {
    // 完全なパスを含むリダイレクトURIを返す
    return `${window.location.origin}/--/app/(tabs)/`;
  }
  // モバイルの場合
  return "http://localhost:8081/exp://localhost:19000/--/app/(tabs)/";
};

export function OIDCProvider({ children }: { children: React.ReactNode }) {
  const region = awsconfig.aws_cognito_region;
  const userPoolId = awsconfig.aws_user_pools_id;
  const clientId = awsconfig.aws_user_pools_web_client_id;
  const domain = awsconfig.oauth?.domain;

  const oidcConfig = {
    authority: `https://${domain}`,
    client_id: clientId,
    redirect_uri: getRedirectUri(),
    scope: "openid profile email phone", // Cognitoの設定に合わせてscopeを追加
    loadUserInfo: true,
    onSigninCallback: () => {
      window.history.replaceState({}, document.title, window.location.pathname);
    },
    metadata: {
      issuer: `https://${domain}`,
      authorization_endpoint: `https://${domain}/oauth2/authorize`,
      token_endpoint: `https://${domain}/oauth2/token`,
      userinfo_endpoint: `https://${domain}/oauth2/userInfo`,
      end_session_endpoint: `https://${domain}/logout`,
      jwks_uri: `https://${domain}/.well-known/jwks.json`,
    },
  };

  console.log("OIDC Config:", {
    ...oidcConfig,
    redirect_uri: getRedirectUri(),
    platform: Platform.OS,
    origin: window.location.origin,
    pathname: window.location.pathname,
  });

  return <AuthProvider {...oidcConfig}>{children}</AuthProvider>;
}

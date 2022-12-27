export const NextAuthErrorMessage = (error: string) => {
  switch (error) {
    case "OAuthAccountNotLinked":
      return "To confirm your identity, sign in with the same account you used originally.";
    case "EmailCreateAccountNotPermitted":
      return "Email sign in is not enabled for this application.";
    case "EmailSigninNotPermitted":
      return "Email sign in is not enabled for this application.";
    case "CredentialsSigninNotPermitted":
      return "Sign in with username and password is not enabled for this application.";
    case "OAuthSigninNotPermitted":
      return "Sign in with this account is not enabled for this application.";
    case "OAuthCallbackUrlMismatch":
      return "The OAuth callback URL provided does not match the URL provided when configuring the OAuth provider.";
    case "OAuthClientAuthenticationFailed":
      return "OAuth client authentication failed.";
    case "OAuthAuthorizationUrlMissing":
      return "An OAuth authorization URL must be provided.";
    case "OAuthAuthorizationUrlInvalid":
      return "The OAuth authorization URL provided is invalid.";
    case "OAuthAccessTokenUrlMissing":
      return "An OAuth access token URL must be provided.";
    case "OAuthAccessTokenUrlInvalid":
      return "The OAuth access token URL provided is invalid.";
    case "OAuthProfileUrlMissing":
      return "An OAuth profile URL must be provided.";
    case "OAuthProfileUrlInvalid":
      return "The OAuth profile URL provided is invalid.";
    case "OAuthProfileUrlMissingFields":
      return "The OAuth profile URL provided is missing the {profile} field.";
    case "OAuthProfileIdMissing":
      return "The OAuth profile response did not provide an ID.";
    case "OAuthProfileEmailMissing":
      return "The OAuth profile response did not provide an email.";
    case "OAuthProfileNameMissing":
      return "The OAuth profile response did not provide a name.";
    default:
      return `An unexpected error occurred. ${error}`;
  }
};

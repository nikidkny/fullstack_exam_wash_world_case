export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  Profile: undefined;
  Homepage: undefined;
  ProfileHome: undefined;
  PersonalInfo: undefined;
  PaymentMethods: undefined;
  MembershipSettings: undefined;
  WashHistory: undefined;
  BillingHistory: undefined;
  WashFlowScreen: { locationId: number; locationName: string };
  WashDetailsScreen: { washId: number; washName: string; locationId: number };
};

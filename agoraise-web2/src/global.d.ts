/// <reference types="@solidjs/start/env" />
// Utils
type ExtractArrayElementType<T> = T extends (infer U)[] ? U : never;
// Specific
type ProjectType = {
  mainImage: string;
  logoImage: string;
  title: string;
  tags: string;
  mainDescription: string;
  type: string;
  socials: string;
  mainPaymentsDescription: string;
  sm: "Yes" | "No";
  socialsTitle: string;
  socialsDescription: string;
  paymentsTitle: string;
  paymentsDescription: string;
  milestones: {
    endDate: number;
    amount: number;
  }[];
};

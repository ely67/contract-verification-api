export interface ContractVerificationRequest {
  address: string;
  chainId: number;
}

export interface ContractMetadata {
  address: string;
  chainId: number;
  name?: string;
  compiler?: string;
  version?: string;
  optimization?: boolean;
  optimizationRuns?: number;
  constructorArguments?: string;
  sourceCode?: string;
  abi?: any[];
}

export enum VerificationStatus {
  VERIFIED = "verified",
  UNVERIFIED = "unverified",
  PARTIALLY_VERIFIED = "partially_verified",
  PENDING = "pending",
  ERROR = "error"
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: Date;
}

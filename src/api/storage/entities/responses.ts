export interface StorageResponse {
  success: boolean;
  data: {
    signedRequest: any;
    url: string;
  };
}

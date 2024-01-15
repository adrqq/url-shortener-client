import { ShortUrlModel } from "../../models/response/ShortUrlModel";

export interface RootState {
  app: '';
  isUserProfileModalOpen: boolean;
  isFindModalOpen: boolean;
  shortenedUrls: ShortUrlModel[];
  isTableLoading: boolean;
}

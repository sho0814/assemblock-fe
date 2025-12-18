// src/constants/profileImages.ts
import type { ProfileType } from "@types";

import Type1Image from "@assets/common/ProfileImg_color/Img1.svg";
import Type2Image from "@assets/common/ProfileImg_color/Img2.svg";
import Type3Image from "@assets/common/ProfileImg_color/Img3.svg";
import Type4Image from "@assets/common/ProfileImg_color/Img4.svg";
import Type5Image from "@assets/common/ProfileImg_color/Img5.svg";

export const PROFILE_TYPE_IMAGES: Record<ProfileType, string> = {
  Type_1: Type1Image,
  Type_2: Type2Image,
  Type_3: Type3Image,
  Type_4: Type4Image,
  Type_5: Type5Image,
};

export const getProfileImage = (type: ProfileType): string => {
  return PROFILE_TYPE_IMAGES[type];
};

// export const getProfileImage = (type?: ProfileType | null): string => {
//   // type이 없거나 매핑에 없으면 Type_1 기본값 반환
//   if (!type || !PROFILE_TYPE_IMAGES[type]) {
//     return PROFILE_TYPE_IMAGES.Type_1;
//   }
//   return PROFILE_TYPE_IMAGES[type];
// };

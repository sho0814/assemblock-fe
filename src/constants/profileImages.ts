// src/constants/profileImages.ts
import type { ProfileType } from "@types";

import Type1Image from "@assets/common/ProfileImg/Img1.svg";
import Type2Image from "@assets/common/ProfileImg/Img2.svg";
import Type3Image from "@assets/common/ProfileImg/Img3.svg";
import Type4Image from "@assets/common/ProfileImg/Img4.svg";
import Type5Image from "@assets/common/ProfileImg/Img5.svg";

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

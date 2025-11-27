import React from 'react';

export type ProfileData = {
  id: string;
  src: string;
  alt: string;
  colorMap?: {
    '#C2C1C3': string;
    '#F0EFF1': string;
  };
};

type ProfileActProps = {
  profile: ProfileData;
  isSelected?: boolean;
  size?: 'small' | 'medium' | 'large';
};

type ProfileSVGProps = {
  viewBox: string;
  children: React.ReactNode;
  width: string;
  height: string;
};

const ProfileSVG: React.FC<ProfileSVGProps> = ({ viewBox, children, width, height }) => (
  <svg
    viewBox={viewBox}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      width,
      height,
      pointerEvents: 'none',
      display: 'block',
    }}
  >
    {children}
  </svg>
);

export const ProfileAct: React.FC<ProfileActProps> = ({ 
  profile, 
  isSelected = false, 
  size = 'large' 
}) => {
  if (!profile.colorMap) {
    return null;
  }

  const bgColor = isSelected ? profile.colorMap['#C2C1C3'] : '#C2C1C3';
  const patternColor = isSelected ? profile.colorMap['#F0EFF1'] : '#F0EFF1';

  const sizeMap = {
    small: { width: '64px', height: '64px' },
    medium: { width: '96px', height: '96px' },
    large: { width: '130px', height: '130px' },
  };

  const dimensions = sizeMap[size];


  if (profile.id === 'img1') {
    return (
      <ProfileSVG viewBox="0 0 130 130" width={dimensions.width} height={dimensions.height}>
        <circle cx="64.8" cy="64.8" r="64.8" fill={bgColor} />
        <path d="M93.3319 30.4535C104.936 33.5311 111.849 45.433 108.772 57.0377C106.719 64.7787 100.739 70.4309 93.5405 72.4239C98.8052 77.7221 101.199 85.5949 99.1457 93.3357C96.068 104.94 84.1653 111.853 72.5606 108.775C64.8196 106.722 59.1673 100.743 57.1744 93.5441C51.8763 98.8063 44.0063 101.199 36.2673 99.1466C24.6625 96.069 17.7493 84.1661 20.8269 72.5612C22.8791 64.8225 28.856 59.1709 36.0516 57.1763C30.7901 51.8782 28.3989 44.0082 30.451 36.2697C33.5286 24.6649 45.4315 17.7517 57.0364 20.8293C64.7758 22.8818 70.4266 28.8602 72.4205 36.0568C77.7187 30.7927 85.5915 28.4008 93.3319 30.4535ZM66.8015 57.2494C64.1494 59.8845 60.8533 61.7996 57.2505 62.7981C59.8853 65.4508 61.7997 68.7483 62.7975 72.3516C65.4504 69.7167 68.7478 67.8014 72.3513 66.8037C69.7155 64.1508 67.7997 60.8534 66.8015 57.2494Z" fill={patternColor} />
      </ProfileSVG>
    );
  }

 
  if (profile.id === 'img2') {
    return (
      <ProfileSVG viewBox="0 0 130 130" width={dimensions.width} height={dimensions.height}>
        <circle cx="64.8" cy="64.8" r="64.8" fill={bgColor} />
        <path d="M43.5092 36.9089C46.1561 24.6615 60.9715 20.7086 69.3677 30.0096L106.99 71.6857C114.923 80.4735 111.131 94.6646 100.06 97.6185L50.5767 110.821C39.5058 113.775 29.1478 103.359 31.6487 91.7877L43.5092 36.9089Z" fill={patternColor} />
      </ProfileSVG>
    );
  }


  if (profile.id === 'img3') {
    return (
      <ProfileSVG viewBox="0 0 48 48" width={dimensions.width} height={dimensions.height}>
        <circle cx="24" cy="24" r="24" fill={bgColor} />
        <rect x="14.085" y="6.87793" width="27.9812" height="27.9812" rx="5" transform="rotate(14.9264 14.085 6.87793)" fill={patternColor} />
      </ProfileSVG>
    );
  }


  if (profile.id === 'img4') {
    return (
      <ProfileSVG viewBox="0 0 130 130" width={dimensions.width} height={dimensions.height}>
        <circle cx="64.8" cy="64.8" r="64.8" fill={bgColor} />
        <path d="M83.902 64.7998C94.4506 64.8001 103.002 73.3517 103.002 83.9004C103.002 94.449 94.4505 103.001 83.902 103.001H45.7008C35.152 103.001 26.6003 94.4492 26.6002 83.9004C26.6002 73.3516 35.152 64.7998 45.7008 64.7998C35.152 64.7998 26.6002 56.248 26.6002 45.6992C26.6004 35.1506 35.1521 26.5996 45.7008 26.5996H83.902C94.4505 26.5999 103.001 35.1507 103.002 45.6992C103.002 56.2479 94.4506 64.7995 83.902 64.7998Z" fill={patternColor} />
      </ProfileSVG>
    );
  }


  if (profile.id === 'img5') {
    return (
      <ProfileSVG viewBox="0 0 130 130" width={dimensions.width} height={dimensions.height}>
        <circle cx="64.8" cy="64.8" r="64.8" fill={bgColor} />
        <rect x="31.8002" y="31.7988" width="65.9997" height="65.9997" rx="32.9999" fill={patternColor} />
      </ProfileSVG>
    );
  }

  return null;
};


import { toast } from 'react-hot-toast'; // toast 사용 시

// 파일을 base64로 변환
export const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64 = reader.result as string;
            resolve(base64.split(',')[1]); // data:application/... 제거
        };
        reader.onerror = error => reject(error);
    });
};

// PDF 파일 검증 및 상태 업데이트
export const handlePdfFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>,
    setFileName: React.Dispatch<React.SetStateAction<string | null>>,
    maxSizeMB: number = 10 // 기본 10MB 제한
): boolean => {
    const file = e.target.files?.[0];

    if (!file) {
        setSelectedFile(null);
        setFileName(null);
        return false;
    }

    // 크기 검증
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
        toast.error(`파일 크기는 ${maxSizeMB}MB를 초과할 수 없습니다.`);
        return false;
    }

    // 타입 검증
    if (file.type !== 'application/pdf') {
        toast.error('PDF 파일만 업로드 가능합니다.');
        return false;
    }

    setSelectedFile(file);
    setFileName(file.name);
    return true;
};

// 컴포넌트에서 파일 리셋
export const resetFileState = (
    setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>,
    setFileName: React.Dispatch<React.SetStateAction<string | null>>,
    inputRef: React.RefObject<HTMLInputElement | null>
) => {
    setSelectedFile(null);
    setFileName(null);
    if (inputRef.current) {
        inputRef.current.value = '';
    }
};

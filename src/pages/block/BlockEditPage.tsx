// src/pages/block/BlockEditPage.tsx
import { useEffect, useRef, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useOverlay } from '@components/common/OverlayContext';
import CancelGuide from '@components/block/CancleGuide';
import SimpleHeader from '@components/shared/SimpleHeader';
import Dropdown from '@components/block/DropDown';
import {
    CATEGORY_IDEA, CATEGORY_TECH_DESIGN, CATEGORY_TECH_FRONT, CATEGORY_TECH_BACK,
    TOOLS_DESIGN, TOOLS_FRONT, TOOLS_BACK
} from '@constants';
import CommonButton from '@components/shared/CommonButton';
import { getBlockDetail, updateBlock } from '@api/blockId';
import { getCategoryLabel } from '@utils/getCategoryLabel';
import { convertToBase64, handlePdfFileChange, resetFileState } from '@utils/blockFileUtils';
import type { NewBlockData } from '@types';

import * as S from './BlockEditPage.styled';

type BlockPart = 'design' | 'frontend' | 'backend';

export function BlockEditPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const blockId = searchParams.get('id'); // ID 가져오기

    // BlockDetails의 state 복사
    const [isSkillState, setIsSkillState] = useState(false);                            // 타입
    const [blockTitle, setBlockTitle] = useState('');                                   // 제목
    const [selectedTechPart, setSelectedTechPart] = useState<BlockPart | null>(null);   // 기술 파트
    const [selectedCategory, setSelectedCategory] = useState<string>('');               // 카테고리
    const [selectedTools, setSelectedTools] = useState<string>('');                     // 사용 툴 및 언어
    const [onelineSummary, setOnelineSummary] = useState('');                           // 기존 프로젝트 한 줄 소개
    const [contributionRate, setContributionRate] = useState<number>(0);                // 기존 프로젝트 기여도
    const [selectedFile, setSelectedFile] = useState<File | null>(null);                // 기존 프로젝트 결과물 PDF 파일
    const [resultFileName, setResultFileName] = useState<string>('');                   // 업로드한 파일명
    const [isFormValid, setIsFormValid] = useState(false);
    const [improvementPoint, setImprovementPoint] = useState('');                      // 개선하고 싶은 점
    const [resultUrl, setResultUrl] = useState('');                                   // 결과물 URL
    
    // 초기 데이터 저장 (변경사항 감지용)
    const [initialData, setInitialData] = useState<{
        blockTitle: string;
        isSkillState: boolean;
        selectedTechPart: BlockPart | null;
        selectedCategory: string;
        selectedTools: string;
        onelineSummary: string;
        contributionRate: number;
        improvementPoint: string;
        resultUrl: string;
        resultFileName: string;
    } | null>(null);

    const { showOverlay, closeOverlay } = useOverlay();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    // 뒤로가기 버튼 클릭 시 취소 확인 모달 표시
    const handleBackClick = () => {
        showOverlay(
            <CancelGuide
                title="수정 취소 안내"
                description={
                    <>
                        수정을 취소하고 이전 화면으로 돌아갈까요?<br />
                        수정 내용은 저장되지 않아요!
                    </>
                }
                prevContent="이전으로"
                onPrevClick={() => {
                    closeOverlay();
                    navigate(-1);
                }}
            />
        );
    };

    // blockId가 있을 경우 데이터를 불러오는 로직
    useEffect(() => {
        const fetchBlockData = async () => {
            if (!blockId) return;
            
            const blockIdNum = parseInt(blockId, 10);
            if (isNaN(blockIdNum)) {
                console.error('유효하지 않은 blockId:', blockId);
                return;
            }
            try {
                const blockDetail = await getBlockDetail(blockIdNum);
                
                // 블록 타입 설정
                const isTechnology = blockDetail.blockType === 'TECHNOLOGY';
                setIsSkillState(isTechnology);
                
                // 블록 제목
                setBlockTitle(blockDetail.blockTitle || '');
                
                // 기술 파트 설정 (API는 대문자 문자열, 폼은 소문자)
                // techPart는 string | null 타입 (예: 'FRONTEND', 'BACKEND', 'DESIGN')
                if (blockDetail.techPart) {
                    const techPartUpper = blockDetail.techPart.toUpperCase();
                    if (techPartUpper === 'FRONTEND' || techPartUpper === 'FRONT_END') {
                        setSelectedTechPart('frontend');
                    } else if (techPartUpper === 'BACKEND' || techPartUpper === 'BACK_END') {
                        setSelectedTechPart('backend');
                    } else if (techPartUpper === 'DESIGN') {
                        setSelectedTechPart('design');
                    } else {
                        // 예상치 못한 값이면 null로 설정
                        console.warn('알 수 없는 techPart 값:', blockDetail.techPart);
                        setSelectedTechPart(null);
                    }
                } else {
                    setSelectedTechPart(null);
                }
                
                // 카테고리 설정 (API는 value 형식, 폼은 label 형식)
                const categoryLabel = getCategoryLabel(blockDetail.categoryName);
                setSelectedCategory(categoryLabel);
                
                // 사용 툴 및 언어
                setSelectedTools(blockDetail.toolsText || '');
                
                // 한 줄 소개
                setOnelineSummary(blockDetail.oneLineSummary || '');
                
                // 기여도 - 명시적으로 숫자 변환
                setContributionRate(Number(blockDetail.contributionScore) || 0);
                
                // 개선하고 싶은 점
                setImprovementPoint(blockDetail.improvementPoint || '');
                
                // 결과물 URL
                setResultUrl(blockDetail.resultUrl || '');
                
                // 결과물 파일명 설정
                // API에서 받은 resultFile이 base64 문자열이면 파일명을 추출할 수 없으므로
                // 별도로 파일명을 저장하지 않고, 새로 파일을 업로드하면 그 파일명을 사용
                // 기존 파일이 있으면 파일명을 표시하기 위해 resultFile에서 추출 시도
                if (blockDetail.resultFile && 
                    blockDetail.resultFile !== 'dummy-pdf-base64-string-for-testing' &&
                    blockDetail.resultFile.trim() !== '') {
                    // resultFile이 URL 형식이면 파일명 추출, base64면 빈 문자열
                    const isBase64 = !blockDetail.resultFile.startsWith('http');
                    if (!isBase64) {
                        const extractedName = blockDetail.resultFile.split('/').pop() || '';
                        setResultFileName(extractedName);
                    } else {
                        // base64인 경우 파일명을 알 수 없으므로 빈 문자열
                        setResultFileName('');
                    }
                } else {
                    setResultFileName('');
                }
                setSelectedFile(null); // 기존 파일은 File 객체로 복원할 수 없으므로 null
                
                // 기술 파트 값 저장 (초기 데이터용)
                // techPart는 string | null 타입이므로 동일한 로직 사용
                let techPartValue: BlockPart | null = null;
                if (blockDetail.techPart) {
                    const techPartUpper = blockDetail.techPart.toUpperCase();
                    if (techPartUpper === 'FRONTEND' || techPartUpper === 'FRONT_END') {
                        techPartValue = 'frontend';
                    } else if (techPartUpper === 'BACKEND' || techPartUpper === 'BACK_END') {
                        techPartValue = 'backend';
                    } else if (techPartUpper === 'DESIGN') {
                        techPartValue = 'design';
                    }
                }
                
                // 초기 데이터 저장 (변경사항 감지용) - contributionRate를 명시적으로 숫자로 저장
                setInitialData({
                    blockTitle: blockDetail.blockTitle || '',
                    isSkillState: isTechnology,
                    selectedTechPart: techPartValue,
                    selectedCategory: categoryLabel,
                    selectedTools: blockDetail.toolsText || '',
                    onelineSummary: blockDetail.oneLineSummary || '',
                    contributionRate: Number(blockDetail.contributionScore) || 0,
                    improvementPoint: blockDetail.improvementPoint || '',
                    resultUrl: blockDetail.resultUrl || '',
                    resultFileName: blockDetail.resultFile && 
                        blockDetail.resultFile !== 'dummy-pdf-base64-string-for-testing' &&
                        blockDetail.resultFile.trim() !== '' &&
                        !blockDetail.resultFile.startsWith('http')
                        ? blockDetail.resultFile.split('/').pop() || ''
                        : '',
                });
                
            } catch (error) {
                console.error('블록 정보를 가져오는 중 오류 발생:', error);
                alert('블록 정보를 불러오는데 실패했습니다.');
            }
        };

        fetchBlockData();
    }, [blockId]);

    // 필수 조건 검사 및 변경사항 감지
    useEffect(() => {
        const isBlockTitleValid = blockTitle.trim() !== '';
        // 기술 블록이면 기술 파트가 필수, 아이디어 블록이면 필수 아님
        const isPartsValid = isSkillState ? selectedTechPart !== null : true;
        const isCategoriesValid = selectedCategory.length > 0;
        const isToolsValid = isSkillState ? selectedTools.length > 0 : true;
        const isOnelineSummaryValid = onelineSummary.trim() !== '';
        
        // 디버깅: 폼 유효성 검사 상세
        console.log('폼 유효성 검사:', {
            isSkillState,
            selectedTechPart,
            isPartsValid,
            isBlockTitleValid,
            isCategoriesValid,
            isToolsValid,
            isOnelineSummaryValid,
        });

        const formValid = isBlockTitleValid && isPartsValid && isCategoriesValid && isToolsValid && isOnelineSummaryValid;
        
        // 변경사항이 있는지 확인
        let hasChanges = false;
        
        // blockId가 없으면 새 블록 생성이므로 항상 활성화 (폼 유효성만 체크)
        if (!blockId) {
            setIsFormValid(formValid);
            return;
        }
        
        // initialData가 아직 로드되지 않았으면 비활성화
        if (!initialData) {
            setIsFormValid(false);
            return;
        }
        
        // 초기 데이터와 비교하여 변경사항 확인 - contributionRate는 명시적으로 숫자 변환하여 비교
        hasChanges = 
            blockTitle !== initialData.blockTitle ||
            isSkillState !== initialData.isSkillState ||
            selectedTechPart !== initialData.selectedTechPart ||
            selectedCategory !== initialData.selectedCategory ||
            selectedTools !== initialData.selectedTools ||
            onelineSummary !== initialData.onelineSummary ||
            Number(contributionRate) !== Number(initialData.contributionRate) ||
            improvementPoint !== initialData.improvementPoint ||
            resultUrl !== initialData.resultUrl ||
            resultFileName !== initialData.resultFileName ||
            selectedFile !== null; // 새 파일이 업로드되었는지 확인
        
        // 디버깅: 변경사항 확인
        console.log('변경사항 체크:', {
            blockTitle: blockTitle !== initialData.blockTitle,
            contributionRate: Number(contributionRate) !== Number(initialData.contributionRate),
            contributionRate_current: contributionRate,
            contributionRate_current_type: typeof contributionRate,
            contributionRate_initial: initialData.contributionRate,
            contributionRate_initial_type: typeof initialData.contributionRate,
            hasChanges,
            formValid,
            isFormValid: formValid && hasChanges,
        });

        // 폼이 유효하고 변경사항이 있을 때만 활성화
        setIsFormValid(formValid && hasChanges);
        
        // 디버깅용 로그
        if (formValid && !hasChanges) {
            console.log('폼은 유효하지만 변경사항이 없음', {
                blockTitle: { current: blockTitle, initial: initialData.blockTitle },
                selectedCategory: { current: selectedCategory, initial: initialData.selectedCategory },
                selectedTools: { current: selectedTools, initial: initialData.selectedTools },
                contributionRate: { current: contributionRate, initial: initialData.contributionRate },
            });
        } else if (!formValid) {
            console.log('폼이 유효하지 않음', {
                isBlockTitleValid,
                isPartsValid,
                isCategoriesValid,
                isToolsValid,
                isOnelineSummaryValid,
            });
        } else {
            console.log('버튼 활성화됨!', { formValid, hasChanges });
        }
    }, [isSkillState, blockTitle, selectedTechPart, selectedCategory, selectedTools, onelineSummary, contributionRate, improvementPoint, resultUrl, resultFileName, selectedFile, initialData, blockId]);

    // selectedTechPart가 변경되면 selectedCategories, selectedTools 초기화
    // 단, initialData가 설정된 후에는 초기화하지 않음 (수정 모드에서는 유지)
    useEffect(() => {
        // initialData가 없으면 새 블록 생성 모드이므로 초기화
        // initialData가 있으면 수정 모드이므로 초기화하지 않음
        if (isSkillState && !initialData && selectedTechPart) {
            // 기술 파트가 변경되었을 때만 초기화 (새 블록 생성 시)
            setSelectedCategory('');
            setSelectedTools('');
        }
    }, [selectedTechPart, isSkillState, initialData]);

    // 블록 타입 변경
    const confirmSetIsSkillState = (newValue: boolean) => {
        setIsSkillState(newValue);
        setBlockTitle('');
        setSelectedTechPart(null);
        setSelectedCategory('');
        setOnelineSummary('');
        setSelectedTools('');
        setContributionRate(0);
        resetFileState(setSelectedFile, setResultFileName, fileInputRef);

        // State로 관리되지 않는 native input 리셋
        if (formRef.current) {
            formRef.current.reset();
        }

        closeOverlay();
    };

    // 오버레이 호출 함수
    const handleShowCancelGuide = (newValue: boolean) => {
        showOverlay(
            <CancelGuide
                title="블록 타입 변경 안내"
                description={
                    <>
                        블록 타입을 변경하면 작성 내역이 초기화 돼요<br />
                        정말 변경하시겠어요?
                    </>
                }
                prevContent="변경하기"
                onPrevClick={() => confirmSetIsSkillState(newValue)}
            />
        );
    };

    // 블록 타입, 블록 기술파트에 따라 카테고리 선택지 변경
    let categoryOptions = CATEGORY_IDEA;
    let toolsOptions = TOOLS_DESIGN;

    if (isSkillState) {
        if (selectedTechPart === 'design') categoryOptions = CATEGORY_TECH_DESIGN;
        else if (selectedTechPart === 'frontend') {
            categoryOptions = CATEGORY_TECH_FRONT;
            toolsOptions = TOOLS_FRONT;
        }
        else if (selectedTechPart === 'backend') {
            categoryOptions = CATEGORY_TECH_BACK;
            toolsOptions = TOOLS_BACK;
        }
    }

    // 폼 제출 관리 함수 (수정 로직)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("수정 폼 제출 이벤트 발생");

        if (!blockId) {
            alert('블록 ID가 없습니다.');
            return;
        }

        const blockIdNum = parseInt(blockId, 10);
        if (isNaN(blockIdNum)) {
            alert('유효하지 않은 블록 ID입니다.');
            return;
        }

        // techPart 변환 (소문자 -> 대문자)
        let techPartValue: 'FRONTEND' | 'BACKEND' | 'DESIGN' | null = null;
        if (selectedTechPart === 'frontend') {
            techPartValue = 'FRONTEND';
        } else if (selectedTechPart === 'backend') {
            techPartValue = 'BACKEND';
        } else if (selectedTechPart === 'design') {
            techPartValue = 'DESIGN';
        }

        // 파일이 선택되었으면 base64로 변환, 없으면 빈 문자열 사용
        // createBlock과 동일한 구조: blockData와 fileBase64를 별도로 전달
        let resultFileBase64 = "";
        if (selectedFile) {
            resultFileBase64 = await convertToBase64(selectedFile);
        }
        
        const blockData: NewBlockData = {
            blockType: (isSkillState ? 'TECHNOLOGY' : 'IDEA') as 'TECHNOLOGY' | 'IDEA',
            blockTitle: blockTitle.trim(),
            categoryName: selectedCategory, // label 형식 (updateBlock에서 value로 변환)
            techPart: techPartValue, // null 허용 (아이디어 블록일 때)
            contributionScore: Number(contributionRate),
            toolsText: selectedTools && selectedTools.trim() ? selectedTools.trim() : null, // null 허용
            oneLineSummary: onelineSummary.trim(),
            improvementPoint: improvementPoint && improvementPoint.trim() ? improvementPoint.trim() : '', // 빈 문자열 허용
            resultUrl: resultUrl && resultUrl.trim() ? resultUrl.trim() : '', // 빈 문자열 허용
            resultFileName: resultFileName || '', // 파일명
            resultFile: "", // createBlock과 동일하게 빈 문자열
        };
        
        // 데이터 검증
        if (!blockData.blockTitle || blockData.blockTitle.trim() === '') {
            alert('블록 제목을 입력해주세요.');
            return;
        }
        if (!blockData.categoryName || blockData.categoryName.trim() === '') {
            alert('카테고리를 선택해주세요.');
            return;
        }
        if (!blockData.oneLineSummary || blockData.oneLineSummary.trim() === '') {
            alert('한 줄 소개를 입력해주세요.');
            return;
        }
        if (isSkillState && !blockData.techPart) {
            alert('기술 파트를 선택해주세요.');
            return;
        }
        if (isSkillState && (!blockData.toolsText || blockData.toolsText.trim() === '')) {
            alert('사용 툴 및 언어를 선택해주세요.');
            return;
        }

        console.log('수정할 블록 데이터:', JSON.stringify(blockData, null, 2));
        console.log('블록 ID:', blockIdNum);

        try {
            // API 호출 - createBlock과 동일한 구조: blockData와 fileBase64를 별도로 전달
            console.log('updateBlock API 호출 시작...');
            await updateBlock(blockIdNum, blockData, resultFileBase64);
            console.log('블록 수정 API 호출 성공');

            console.log('블록 수정 성공');
            toast.success('블록이 성공적으로 수정되었습니다.');
            
            navigate(-1);
        } catch (error: any) {
            console.error('블록 수정 실패:', error);
            console.error('에러 전체 객체:', error);
            console.error('에러 응답:', error?.response);
            console.error('요청한 블록 데이터:', blockData);
            
            let errorMessage = '블록 수정에 실패했습니다.';
            const status = error?.response?.status;
            
            if (status === 403) {
                errorMessage = '수정 권한이 없습니다.';
            } else if (status === 404) {
                errorMessage = '블록을 찾을 수 없습니다.';
            } else if (status === 400) {
                const serverMessage = error?.response?.data?.message || error?.response?.data?.error;
                errorMessage = serverMessage || '요청 데이터가 올바르지 않습니다.';
                console.error('400 에러 - 요청 데이터 문제:', blockData);
                console.error('서버 응답:', error?.response?.data);
            } else if (status === 500) {
                errorMessage = '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
            } else if (error?.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error?.message) {
                errorMessage = `오류: ${error.message}`;
            }
            
            toast.error(errorMessage);
        }
    };

    const toggleTechPart = (part: BlockPart) => {
        setSelectedTechPart(prev => (prev === part ? null : part));
    };

    // 기여도 변경 함수 - 명시적으로 숫자 변환
    const changeRate = (delta: number) => {
        setContributionRate(prev => {
            const currentValue = Number(prev); // 명시적으로 숫자 변환
            const newValue = currentValue + delta;
            return newValue < 0 ? 0 : newValue > 100 ? 100 : newValue;
        });
    };

    const handleFileInputClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <>
            <SimpleHeader title="내 블록 수정" onBackClick={handleBackClick} />
            <S.Container>
                <S.Form ref={formRef} onSubmit={handleSubmit} encType="multipart/form-data">
                    <S.Row>
                        <S.Label>블록 타입<S.Dot /> </S.Label>
                        <input name="block_type" type="hidden" value={isSkillState ? "technology" : "idea"} />
                        <div>
                            <S.BlockTypeButton type="button" $selected={!isSkillState} onClick={() => handleShowCancelGuide(false)}>아이디어</S.BlockTypeButton>
                            <S.BlockTypeButton type="button" $selected={isSkillState} onClick={() => handleShowCancelGuide(true)}>기술</S.BlockTypeButton>
                        </div>
                        <S.Desc>블록 타입은 중복 선택할 수 없어요</S.Desc>
                    </S.Row>

                    <S.Row>
                        <S.Label>블록 이름<S.Dot /> </S.Label>
                        <S.Input name="block_title" type="text" placeholder="블록 이름" value={blockTitle} onChange={(e) => setBlockTitle(e.target.value)} />
                        <S.Desc>블록 이름은 최대 (N자)까지 입력할 수 있어요</S.Desc>
                    </S.Row>

                    {isSkillState && (
                        <S.Row>
                            <S.Label>기술 파트<S.Dot /> </S.Label>
                            <input name="tech_part" type="hidden" value={selectedTechPart ?? ''} />
                            <div>
                                <S.BlockTypeButton type="button" $selected={selectedTechPart === 'design'} onClick={() => toggleTechPart('design')}>디자인</S.BlockTypeButton>
                                <S.BlockTypeButton type="button" $selected={selectedTechPart === 'frontend'} onClick={() => toggleTechPart('frontend')}>프론트엔드</S.BlockTypeButton>
                                <S.BlockTypeButton type="button" $selected={selectedTechPart === 'backend'} onClick={() => toggleTechPart('backend')}>백엔드</S.BlockTypeButton>
                            </div>
                            <S.Desc>기술 파트는 중복 선택할 수 없어요</S.Desc>
                        </S.Row>
                    )}

                    <S.Row>
                        <S.Label>블록 카테고리<S.Dot /></S.Label>
                        <input name="category_name" type="hidden" value={selectedCategory} />
                        <Dropdown
                            content={
                                selectedCategory && selectedCategory.length > 0 ?
                                    selectedCategory : "카테고리를 선택해 주세요"
                            }
                            options={categoryOptions}
                            selected={selectedCategory}
                            onChange={(value: string) => setSelectedCategory(value)} />
                        <S.Desc>블록 카테고리는 중복 선택할 수 없어요</S.Desc>
                    </S.Row>

                    {isSkillState && (
                        <S.Row>
                            <S.Label>사용 툴 및 언어<S.Dot /></S.Label>
                            <input name="tools_text" type="hidden" value={selectedTools} />
                            <Dropdown
                                content={
                                    selectedTools && selectedTools.length > 0 ?
                                        selectedTools : "사용 툴 및 언어를 선택해 주세요"}
                                options={toolsOptions}
                                selected={selectedTools}
                                onChange={setSelectedTools}
                            />
                            <S.Desc>사용 툴 및 언어는 중복 선택할 수 없어요</S.Desc>
                        </S.Row>
                    )}

                    <S.Row>
                        <S.Label>기존 프로젝트 한 줄 소개<S.Dot /></S.Label>
                        <S.Input name="oneline_summary" type="text" placeholder="프로젝트를 자유롭게 소개해 주세요" value={onelineSummary} onChange={(e) => setOnelineSummary(e.target.value)} />
                        <S.Desc>해당 블록이 사용되었던 기존 프로젝트를 (N)자 이내로 소개해 주세요</S.Desc>
                    </S.Row>

                    <S.Row>
                        <S.Label>기존 프로젝트 기여도<S.Dot /></S.Label>
                        <S.NumberInputWrapper>
                            <S.ChangeButton type="button" onClick={() => changeRate(-10)}>-</S.ChangeButton>
                            <S.ValueBox
                                type="number"
                                name="contribution_score"
                                value={contributionRate}
                                readOnly
                            />
                            <S.ChangeButton type="button" onClick={() => changeRate(10)}>+</S.ChangeButton>
                        </S.NumberInputWrapper>
                        <S.Desc>기존 프로젝트에 대한 기여도를 0-100 사이에서 10단위로 선택해 주세요</S.Desc>
                    </S.Row>

                    <S.Row>
                        <S.Label>기존 프로젝트에서 개선하고 싶은 점</S.Label>
                        <S.Input 
                            name="improvements_point" 
                            type="text" 
                            placeholder="개선하고 싶은 점을 자유롭게 작성해 주세요" 
                            value={improvementPoint}
                            onChange={(e) => setImprovementPoint(e.target.value)}
                        />
                        <S.Desc>어셈블록에서 새로운 팀원들과 변경하거나 보완, 개선하고 싶은 부분이 있다면<br />
                            (N)자 내로 작성해 주세요</S.Desc>
                    </S.Row>

                    <S.Row>
                        <S.Label>기존 프로젝트 결과물 URL</S.Label>
                        <S.Input 
                            name="result_url" 
                            type="text" 
                            placeholder="URL" 
                            value={resultUrl}
                            onChange={(e) => setResultUrl(e.target.value)}
                        />
                        <S.Desc>기존 프로젝트의 산출물 및 결과물을 URL 형식으로 첨부해 주세요</S.Desc>
                    </S.Row>

                    <S.Row>
                        <S.Label>기존 프로젝트 결과물 PDF</S.Label>
                        <S.FileInputWrapper onClick={handleFileInputClick}>
                            {resultFileName ? (
                                <div>
                                    {resultFileName}
                                </div>
                            ) : (
                                <>
                                    이 곳을 눌러 파일을 업로드 하세요<br />
                                    <span style={{ fontSize: '12px', color: '#C2C1C3' }}>지원되는 형식: PDF</span>
                                </>
                            )}
                            <S.HiddenFileInput 
                                ref={fileInputRef}
                                name="result_file" 
                                type="file" 
                                accept="application/pdf" 
                                onChange={(e) => handlePdfFileChange(e, setSelectedFile, setResultFileName, 10)} 
                            />
                        </S.FileInputWrapper>
                        <S.Desc>프로젝트 결과물을 PDF 파일 형태로 첨부해 주세요</S.Desc>
                    </S.Row>

                    <S.ButtonWrapper>
                        <CommonButton
                            type="submit"
                            content="블록 수정하기"
                            disabled={!isFormValid}
                            width="335px"
                        />
                    </S.ButtonWrapper>
                </S.Form>
            </S.Container>
        </>
    );
}
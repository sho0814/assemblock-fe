// src/pages/block/BlockEditPage.tsx
import { useEffect, useRef, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useOverlay } from '@components/common/OverlayContext';
import CancelGuide from '@components/block/CancleGuide';
import SimpleHeader from '@components/shared/SimpleHeader';
import Dropdown from '@components/block/DropDown';
import {
    CATEGORY_IDEA, CATEGORY_TECH_DESIGN, CATEGORY_TECH_FRONT, CATEGORY_TECH_BACK
} from '@components/block/DropdownOptions';
import { TOOLS_DESIGN, TOOLS_FRONT, TOOLS_BACK } from '@constants/tools';
import CommonButton from '@components/shared/CommonButton';
import { getBlockDetail, updateBlock } from '@api/block';
import { uploadFile } from '@api/mypage/upload';
import type { NewBlockData, TechPart } from '@types';

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
    const [improvementPoint, setImprovementPoint] = useState<string>('');              // 개선하고 싶은 점
    const [resultUrl, setResultUrl] = useState<string>('');                          // 결과물 URL
    const [resultFile, setResultFile] = useState<File | null>(null);                   // 결과물 파일
    const [resultFileUrl, setResultFileUrl] = useState<string | null>(null);          // 업로드된 파일 URL
    const [fileName, setFileName] = useState<string | null>(null);                      // 기존 프로젝트 결과물 PDF
    const [isFormValid, setIsFormValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { showOverlay, closeOverlay } = useOverlay();

    const inputRef = useRef<HTMLInputElement>(null);
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
                console.error('유효하지 않은 blockId');
                return;
            }

            try {
                setIsLoading(true);
                const blockDetail = await getBlockDetail(blockIdNum);
                
                // API 응답을 state에 설정
                setIsSkillState(blockDetail.blockType === 'TECHNOLOGY');
                setBlockTitle(blockDetail.blockTitle);
                
                // techPart를 BlockPart 형식으로 변환
                const techPartMap: Record<string, BlockPart> = {
                    'DESIGN': 'design',
                    'FRONTEND': 'frontend',
                    'BACKEND': 'backend',
                    'Design': 'design',
                    'FrontEnd': 'frontend',
                    'BackEnd': 'backend',
                };
                setSelectedTechPart(blockDetail.techPart ? (techPartMap[blockDetail.techPart] || null) : null);
                
                setSelectedCategory(blockDetail.categoryName);
                setSelectedTools(blockDetail.toolsText || '');
                setOnelineSummary(blockDetail.oneLineSummary);
                setContributionRate(blockDetail.contributionScore);
                setImprovementPoint(blockDetail.improvementPoint || '');
                setResultUrl(blockDetail.resultUrl || '');
                setResultFileUrl(blockDetail.resultFile || null);
                
                // 파일명 추출 (URL에서)
                if (blockDetail.resultFile) {
                    const urlParts = blockDetail.resultFile.split('/');
                    const extractedFileName = urlParts[urlParts.length - 1];
                    setFileName(extractedFileName || null);
                }
            } catch (error) {
                console.error('Failed to fetch block detail:', error);
                // 에러 발생 시 기본값 유지
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlockData();
    }, [blockId]);

    // 필수 조건 검사
    useEffect(() => {
        const isBlockTitleValid = blockTitle.trim() !== '';
        const isPartsValid = isSkillState ? selectedTechPart !== null : false;
        const isCategoriesValid = selectedCategory.length > 0;
        const isToolsValid = isSkillState ? selectedTools.length > 0 : true;
        const isOnelineSummaryValid = onelineSummary.trim() !== '';

        setIsFormValid(isBlockTitleValid && isPartsValid && isCategoriesValid && isToolsValid && isOnelineSummaryValid);
    }, [isSkillState, blockTitle, selectedTechPart, selectedCategory, selectedTools, onelineSummary]);

    // selectedTechPart가 변경되면 selectedCategories, selectedTools 초기화
    useEffect(() => {
        if (isSkillState) {
            setSelectedCategory('');
            setSelectedTools('');
        }
    }, [selectedTechPart, isSkillState]);

    // 블록 타입 변경
    const confirmSetIsSkillState = (newValue: boolean) => {
        setIsSkillState(newValue);
        setBlockTitle('');
        setSelectedTechPart(null);
        setSelectedCategory('');
        setOnelineSummary('');
        setSelectedTools('');
        setContributionRate(0);
        setFileName(null);

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
        
        if (!blockId) {
            console.error('blockId가 없습니다.');
            return;
        }

        const blockIdNum = parseInt(blockId, 10);
        if (isNaN(blockIdNum)) {
            console.error('유효하지 않은 blockId');
            return;
        }

        try {
            setIsLoading(true);

            // 파일이 새로 선택된 경우 업로드
            let finalResultFileUrl = resultFileUrl || '';
            if (resultFile) {
                try {
                    const uploadResult = await uploadFile(resultFile);
                    finalResultFileUrl = uploadResult.fileUrl;
                } catch (uploadError) {
                    console.error('파일 업로드 실패:', uploadError);
                    alert('파일 업로드에 실패했습니다. 파일 없이 진행할까요?');
                    // 파일 업로드 실패해도 계속 진행
                }
            }

            // techPart를 API 형식으로 변환
            const techPartToApi: Record<BlockPart, TechPart> = {
                'design': 'DESIGN',
                'frontend': 'FRONTEND',
                'backend': 'BACKEND',
            };
            const apiTechPart: TechPart = selectedTechPart ? techPartToApi[selectedTechPart] : null;

            // NewBlockData 형식으로 변환
            const blockData: NewBlockData = {
                blockType: isSkillState ? 'TECHNOLOGY' : 'IDEA',
                blockTitle: blockTitle.trim(),
                categoryName: selectedCategory,
                techPart: apiTechPart,
                contributionScore: contributionRate,
                toolsText: isSkillState && selectedTools ? selectedTools : null,
                oneLineSummary: onelineSummary.trim(),
                improvementPoint: improvementPoint.trim(),
                resultUrl: resultUrl.trim() || '',
                resultFile: finalResultFileUrl,
            };

            // API 호출
            await updateBlock(blockIdNum, blockData);
            
            // 성공 시 상세 페이지로 이동
            navigate(`/Block/detail?id=${blockId}`);
        } catch (error) {
            console.error('블록 수정 실패:', error);
            alert('블록 수정에 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    const toggleTechPart = (part: BlockPart) => {
        setSelectedTechPart(prev => (prev === part ? null : part));
    };

    // 기여도 변경 함수
    const changeRate = (delta: number) => {
        setContributionRate(prev => {
            const newValue = prev + delta;
            return newValue < 0 ? 0 :
                newValue > 100 ? 100 : newValue;
        });
    };

    // 선택한 파일명 보여주는 함수
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.type === 'application/pdf') {
                setResultFile(file);
                setFileName(file.name);
                setResultFileUrl(null); // 새 파일 선택 시 기존 URL 초기화
            } else {
                alert('PDF 파일만 업로드 가능합니다.');
                setResultFile(null);
                setFileName(null);
            }
        } else {
            setResultFile(null);
            setFileName(null);
        }
    };

    const handleClick = () => {
        inputRef.current?.click();
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
                            name="improvement_point" 
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
                        <S.FileInputWrapper onClick={handleClick}>
                            {fileName ? (
                                <div>
                                    {fileName}
                                </div>
                            ) : (
                                <>
                                    이 곳을 눌러 파일을 업로드 하세요<br />
                                    <span style={{ fontSize: '12px', color: '#C2C1C3' }}>지원되는 형식: PDF</span>
                                </>
                            )}
                            <S.HiddenFileInput name="result_file" type="file" accept="application/pdf" onChange={handleFileChange} />
                        </S.FileInputWrapper>
                        <S.Desc>프로젝트 결과물을 PDF 파일 형태로 첨부해 주세요</S.Desc>
                    </S.Row>

                    <S.ButtonWrapper>
                        <CommonButton
                            type="submit"
                            content="블록 수정하기"
                            disabled={!isFormValid || isLoading}
                            width="335px"
                        />
                    </S.ButtonWrapper>
                </S.Form>
            </S.Container>
        </>
    );
}
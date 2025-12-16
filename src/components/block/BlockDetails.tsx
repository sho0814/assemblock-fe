// src/components/block/BlockDetails.tsx
import { useEffect, useState } from 'react';
import axios, { AxiosError } from "axios";
import toast from 'react-hot-toast';
import { useOverlay } from '@components/common/OverlayContext';
import { useBlocks } from '@hooks';
import type { BlockType, TechPart } from '@types';
import { getToolValuesFromLabels, getCategoryValuesFromLabels, getCategoryOptions } from '@utils';
import CommonButton from '@components/shared/CommonButton'
import CancelGuide from './CancleGuide.tsx';
import Dropdown from './DropDown';
import * as S from './BlockDetails.styled'

interface BlockDetailsProps {
    isTech: boolean;
}

export default function BlockDetails({ isTech }: BlockDetailsProps) {
    const [isTechType, setIsTechType] = useState<boolean>(isTech);
    const [blockType, setBlockType] = useState<BlockType>(isTechType ? "TECHNOLOGY" : "IDEA");  // 타입
    const [blockTitle, setBlockTitle] = useState('');                                           // 제목
    const [selectedTechPart, setSelectedTechPart] = useState<TechPart>(null);                   // 기술 파트
    const [selectedCategory, setSelectedCategory] = useState<string>('');                       // 카테고리
    const [selectedTools, setSelectedTools] = useState<string | null>(null);                    // 사용 툴 및 언어
    const [oneLineSummary, setOneLineSummary] = useState('');                                   // 기존 프로젝트 한 줄 소개
    const [contributionScore, setContributionScore] = useState<number>(0);                      // 기존 프로젝트 기여도
    const [improvementPoint, setImprovementPoint] = useState('');                               // 기존 프로젝트에서 개선하고 싶은 점
    const [resultUrl, setResultUrl] = useState('');                                             // 기존 프로젝트 결과물 URL
    const [fileName, setFileName] = useState<string | null>(null);                              // 업로드한 파일명
    const [isFormValid, setIsFormValid] = useState(false);

    const { showOverlay, closeOverlay } = useOverlay();
    const { loading, createNewBlock } = useBlocks();
    const { categoryOptions, toolsOptions } = getCategoryOptions(isTechType, selectedTechPart)

    const onSubmit = async () => {
        if (loading) return;

        const blockData = {
            blockType,
            blockTitle,
            techPart: selectedTechPart,
            categoryName: selectedCategory,
            toolsText: selectedTools,
            oneLineSummary,
            contributionScore,
            improvementPoint,
            resultUrl,
            resultFile: "dummy-pdf-base64-string-for-testing",
        };

        try {
            await createNewBlock(blockData);

            toast.success('블록 등록 완료!')
            closeOverlay();
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                const err = e as AxiosError<{ error?: string }>;

                if (err.response?.status === 400) {
                    const msg = err.response.data?.error || "요청이 올바르지 않습니다.";
                    toast.error(msg);
                } else {
                    console.error("Axios error:", err.message, err.response?.status);
                    toast.error("요청 처리 중 오류가 발생했습니다.");
                }
            } else {
                console.error("Unknown error:", e);
                toast.error("알 수 없는 오류가 발생했습니다.");
            }
        }
    }

    // 필수 조건 검사
    useEffect(() => {
        const isBlockTitleValid = blockTitle.trim().length > 0;
        const isPartsValid = isTechType ? selectedTechPart !== null : true;
        const isCategoriesValid = selectedCategory.length > 0;
        const isToolsValid = isTechType ? selectedTools !== null : true;
        const isOnelineSummaryValid = oneLineSummary.trim().length > 0;
        const isContributionRateValid = contributionScore > 0;

        setIsFormValid(isBlockTitleValid && isPartsValid && isCategoriesValid && isToolsValid && isOnelineSummaryValid && isContributionRateValid);

    }, [blockTitle, selectedTechPart, selectedCategory, selectedTools, oneLineSummary, contributionScore]);


    // 블록 타입 변경 이벤트 핸들러
    // IsSkillState가 바뀌면 모든 state 초기화 후 closeOverlay
    const confirmSetIsTechType = (newValue: boolean) => {
        setIsTechType(newValue);
        setBlockType(newValue ? 'TECHNOLOGY' : 'IDEA');

        setBlockTitle('');
        setSelectedTechPart(null);
        setSelectedCategory('');
        setOneLineSummary('');
        setSelectedTools(null);
        setContributionScore(0);
        setImprovementPoint('');
        setResultUrl('');
        closeOverlay();
    };


    // 오버레이 호출 함수
    const handleShowCancelGuide = (newValue: boolean) => {
        showOverlay(
            <CancelGuide
                title="작성 취소 안내"
                description={
                    <>
                        블록 타입을 변경하면 작성 내역이 초기화 돼요<br />
                        정말 변경하시겠어요?
                    </>
                }
                prevContent="변경하기"
                onPrevClick={() => confirmSetIsTechType(newValue)}
            />
        );
    };

    // selectedTechPart가 변경되면 selectedCategories 초기화
    useEffect(() => {
        setSelectedCategory('');
        setSelectedTools(null);
    }, [selectedTechPart]);

    // 기술 파트 토글 함수
    const toggleTechPart = (part: TechPart) => {
        setSelectedTechPart(prev => (prev === part ? null : part));
    };

    // 선택한 파일명 보여주는 함수
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type === 'application/pdf') {
            setFileName(file.name);
        } else {
            setFileName(null);
        }
    };

    return (
        <>
            <S.TextWrapper>
                <S.Dot />
                <S.Text>필수 작성 요소</S.Text>
            </S.TextWrapper>

            <S.Form>
                <S.Row>
                    <S.Label>블록 타입<S.Dot /> </S.Label>
                    <div>
                        <S.BlockTypeButton type="button" $selected={!isTechType} onClick={() => handleShowCancelGuide(false)}>아이디어</S.BlockTypeButton>
                        <S.BlockTypeButton type="button" $selected={isTechType} onClick={() => handleShowCancelGuide(true)}>기술</S.BlockTypeButton>
                    </div>
                    <S.Desc>블록 타입은 중복 선택할 수 없어요</S.Desc>
                </S.Row>

                <S.Row>
                    <S.Label>블록 이름<S.Dot /> </S.Label>
                    <S.Input name="blockTitle" type="text" placeholder="블록 이름" value={blockTitle} onChange={(e) => setBlockTitle(e.target.value)} />
                    <S.Desc>블록 이름은 최대 (N자)까지 입력할 수 있어요</S.Desc>
                </S.Row>

                {isTechType && (
                    <S.Row>
                        <S.Label>기술 파트<S.Dot /> </S.Label>
                        <div>
                            <S.BlockTypeButton type="button" $selected={selectedTechPart === 'DESIGN'} onClick={() => toggleTechPart('DESIGN')}>디자인</S.BlockTypeButton>
                            <S.BlockTypeButton type="button" $selected={selectedTechPart === 'FRONTEND'} onClick={() => toggleTechPart('FRONTEND')}>프론트엔드</S.BlockTypeButton>
                            <S.BlockTypeButton type="button" $selected={selectedTechPart === 'BACKEND'} onClick={() => toggleTechPart('BACKEND')}>백엔드</S.BlockTypeButton>
                        </div>
                        <S.Desc>기술 파트는 중복 선택할 수 없어요</S.Desc>
                    </S.Row>
                )}

                <S.Row>
                    <S.Label>블록 카테고리<S.Dot /></S.Label>
                    <Dropdown
                        content={
                            selectedCategory && selectedCategory.length > 0 ?
                                getCategoryValuesFromLabels(selectedCategory) : "카테고리를 선택해 주세요"
                        }
                        options={categoryOptions}
                        selected={selectedCategory}
                        onChange={(value: string) => setSelectedCategory(value)} />
                    <S.Desc>블록 카테고리는 중복 선택할 수 없어요</S.Desc>
                </S.Row>

                {isTechType && (
                    <S.Row>
                        <S.Label>사용 툴 및 언어<S.Dot /></S.Label>
                        <Dropdown
                            content={
                                selectedTools && selectedTools.length > 0 ?
                                    getToolValuesFromLabels(selectedTools) : "사용 툴 및 언어를 선택해 주세요"
                            }
                            options={toolsOptions}
                            selected={selectedTools ?? ''}
                            onChange={setSelectedTools}
                        />
                        <S.Desc>사용 툴 및 언어는 중복 선택할 수 없어요</S.Desc>
                    </S.Row>
                )}

                <S.Row>
                    <S.Label>기존 프로젝트 한 줄 소개<S.Dot /></S.Label>
                    <S.Input name="onelineSummary" type="text" placeholder="프로젝트를 자유롭게 소개해 주세요" value={oneLineSummary} onChange={(e) => setOneLineSummary(e.target.value)} />
                    <S.Desc>해당 블록이 사용되었던 기존 프로젝트를 (N)자 이내로 소개해 주세요</S.Desc>
                </S.Row>

                <S.Row>
                    <S.Label>기존 프로젝트 기여도<S.Dot /></S.Label>
                    <S.NumberInputWrapper>
                        <S.ChangeButton type="button" onClick={() => setContributionScore(prev => Math.max(0, prev - 10))}>-</S.ChangeButton>
                        <S.ValueBox
                            type="number"
                            name="contributionScore"
                            value={contributionScore}
                            readOnly
                        />
                        <S.ChangeButton type="button" onClick={() => setContributionScore(prev => Math.min(100, prev + 10))}>+</S.ChangeButton>
                    </S.NumberInputWrapper>
                    <S.Desc>기존 프로젝트에 대한 기여도를 0-100 사이에서 10단위로 선택해 주세요</S.Desc>
                </S.Row>

                <S.Row>
                    <S.Label>기존 프로젝트에서 개선하고 싶은 점</S.Label>
                    <S.Input name="improvementPoint" type="text" placeholder="개선하고 싶은 점을 자유롭게 작성해 주세요" value={improvementPoint} onChange={(e) => setImprovementPoint(e.target.value)} />
                    <S.Desc>어셈블록에서 새로운 팀원들과 변경하거나 보완, 개선하고 싶은 부분이 있다면<br />
                        (N)자 내로 작성해 주세요</S.Desc>
                </S.Row>

                <S.Row>
                    <S.Label>기존 프로젝트 결과물 URL</S.Label>
                    <S.Input name="resultUrl" type="text" placeholder="URL" value={resultUrl} onChange={(e) => setResultUrl(e.target.value)} />
                    <S.Desc>기존 프로젝트의 산출물 및 결과물을 URL 형식으로 첨부해 주세요</S.Desc>
                </S.Row>

                <S.Row>
                    <S.Label>기존 프로젝트 결과물 PDF</S.Label>
                    <S.FileInputWrapper onClick={() => { }}>
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
                        <S.HiddenFileInput name="resultFile" type="file" accept="application/pdf" onChange={handleFileChange} />
                    </S.FileInputWrapper>
                    <S.Desc>프로젝트 결과물을 PDF 파일 형태로 첨부해 주세요</S.Desc>
                </S.Row>

                <CommonButton content={"블록 등록하기"} disabled={!isFormValid} onClick={onSubmit} />
            </S.Form>
        </>
    )
}

// src/components/block/BlockDetails.tsx
import { useEffect, useRef, useState } from 'react';
import { useOverlay } from '@components/common/OverlayContext';
import CancelGuide from './CancleGuide.tsx';

import Dropdown from './DropDown';
import { CATEGORY_OPTIONS, TOOLS_OPTIONS } from './DropdownOptions.tsx';
import { logFormData, submitFormData } from '@utils/formSubmit';
import CommonButton from '@components/shared/CommonButton'
import { Dot } from './InformText.styled'

import * as S from './BlockDetails.styled'

interface BlockDetailsProps {
    isSkill?: boolean;
}

type BlockPart = 'design' | 'frontend' | 'backend';

export default function BlockDetails({ isSkill }: BlockDetailsProps) {

    const [isSkillState, setIsSkillState] = useState(isSkill);
    const [blockTitle, setBlockTitle] = useState('');
    const [selectedParts, setSelectedParts] = useState<BlockPart[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedTools, setSelectedTools] = useState<string[]>([]);
    const [onelineSummary, setOnelineSummary] = useState('');
    const [contributionRate, setContributionRate] = useState<number>(0);
    const [fileName, setFileName] = useState<string | null>(null);
    const [isFormValid, setIsFormValid] = useState(false);

    const { showOverlay, closeOverlay } = useOverlay();

    const inputRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);


    // 필수 조건 검사
    useEffect(() => {
        const isBlockTitleValid = blockTitle.trim() !== '';
        const isPartsValid = isSkillState ? selectedParts.length > 0 : true;
        const isCategoriesValid = selectedCategories.length > 0;
        const isToolsValid = isSkillState ? selectedTools.length > 0 : true;
        const isOnelineSummaryValid = onelineSummary.trim() !== '';

        setIsFormValid(isBlockTitleValid && isPartsValid && isCategoriesValid && isToolsValid && isOnelineSummaryValid);

    }, [isSkillState, blockTitle, selectedParts, selectedCategories, selectedTools, onelineSummary]);


    // 블록 타입 변경 이벤트 핸들러
    // IsSkillState가 바뀌면 모든 state, input 초기화 후 closeOverlay
    const confirmSetIsSkillState = (newValue: boolean) => {

        setIsSkillState(newValue);
        setSelectedParts([]);
        setSelectedCategories([]);
        setSelectedTools([]);
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
                title="작성 취소 안내"
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


    // 폼 제출 관리 함수
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("폼 제출 이벤트 발생");

        if (!formRef.current) {
            console.log("formRef.current is null");
            return;
        }

        logFormData(formRef.current);

        const response = await submitFormData(formRef.current, 'https://your-backend-url.com/submit');
        if (response.ok) {
            console.log('전송 성공');
        } else {
            console.error('전송 실패');
        }
    };

    const togglePart = (part: BlockPart) => {
        setSelectedParts(prev => {
            if (prev.includes(part)) {
                return prev.filter(p => p !== part);
            } else {
                return [...prev, part];
            }
        });
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
        if (file && file.type === 'application/pdf') {
            setFileName(file.name);
        } else {
            setFileName(null);
        }
    };

    const handleClick = () => {
        inputRef.current?.click();
    };

    console.log({ isSkillState });

    return (
        <S.Form ref={formRef} onSubmit={handleSubmit} encType="multipart/form-data">
            <S.Row>
                <S.Label>블록 타입<Dot /> </S.Label>
                <input name="block_type" type="hidden" value={isSkillState ? "TECHNOLOGY" : "IDEA"} />
                <div>
                    <S.BlockTypeButton type="button" $selected={!isSkillState} onClick={() => handleShowCancelGuide(false)}>아이디어</S.BlockTypeButton>
                    <S.BlockTypeButton type="button" $selected={isSkillState} onClick={() => handleShowCancelGuide(true)}>기술</S.BlockTypeButton>
                </div>
                <S.Desc>블록 타입은 중복 선택할 수 없어요</S.Desc>
            </S.Row>

            <S.Row>
                <S.Label>블록 이름<Dot /> </S.Label>
                <S.Input name="block_title" type="text" placeholder="블록 이름" value={blockTitle} onChange={(e) => setBlockTitle(e.target.value)} />
                <S.Desc>블록 이름은 최대 (N자)까지 입력할 수 있어요</S.Desc>
            </S.Row>

            {isSkillState && (
                <S.Row>
                    <S.Label>기술 파트<Dot /> </S.Label>
                    <input name="part" type="hidden" value={selectedParts.join(',')} />
                    <div>
                        <S.BlockTypeButton type="button" $selected={selectedParts.includes('design')} onClick={() => togglePart('design')}>디자인</S.BlockTypeButton>
                        <S.BlockTypeButton type="button" $selected={selectedParts.includes('frontend')} onClick={() => togglePart('frontend')}>프론트엔드</S.BlockTypeButton>
                        <S.BlockTypeButton type="button" $selected={selectedParts.includes('backend')} onClick={() => togglePart('backend')}>백엔드</S.BlockTypeButton>
                    </div>
                    <S.Desc>기술 파트는 중복 선택할 수 있어요</S.Desc>
                </S.Row>
            )}

            <S.Row>
                <S.Label>블록 카테고리<Dot /></S.Label>
                <input name="category" type="hidden" value={selectedCategories} />
                <Dropdown
                    content="카테고리를 선택해 주세요"
                    options={CATEGORY_OPTIONS}
                    selected={selectedCategories}
                    onChange={setSelectedCategories}
                />
                <S.Desc>블록 카테고리는 중복 선택할 수 있어요</S.Desc>
            </S.Row>

            {isSkillState && (
                <S.Row>
                    <S.Label>사용 툴 및 언어<Dot /></S.Label>
                    <input name="tools" type="hidden" value={selectedTools} />
                    <Dropdown
                        content="사용 툴 및 언어를 선택해 주세요"
                        options={TOOLS_OPTIONS}
                        selected={selectedTools}
                        onChange={setSelectedTools}
                    />
                    <S.Desc>사용 툴 및 언어는 중복 선택할 수 있어요</S.Desc>
                </S.Row>
            )}

            <S.Row>
                <S.Label>기존 프로젝트 한 줄 소개<Dot /></S.Label>
                <S.Input name="oneline_summary" type="text" placeholder="프로젝트를 자유롭게 소개해 주세요" value={onelineSummary} onChange={(e) => setOnelineSummary(e.target.value)} />
                <S.Desc>해당 블록이 사용되었던 기존 프로젝트를 (N)자 이내로 소개해 주세요</S.Desc>
            </S.Row>

            <S.Row>
                <S.Label>기존 프로젝트 기여도<Dot /></S.Label>
                <S.NumberInputWrapper>
                    <S.ChangeButton type="button" onClick={() => changeRate(-10)}>-</S.ChangeButton>
                    <S.ValueBox
                        type="number"
                        name="contributionRate"
                        value={contributionRate}
                        readOnly
                        style={{ width: '60px', textAlign: 'center' }}
                    />
                    <S.ChangeButton type="button" onClick={() => changeRate(10)}>+</S.ChangeButton>
                </S.NumberInputWrapper>
                <S.Desc>기존 프로젝트에 대한 기여도를 0-100 사이에서 10단위로 선택해 주세요</S.Desc>
            </S.Row>

            <S.Row>
                <S.Label>기존 프로젝트에서 개선하고 싶은 점</S.Label>
                <S.Input name="improvements_point" type="text" placeholder="개선하고 싶은 점을 자유롭게 작성해 주세요" />
                <S.Desc>어셈블록에서 새로운 팀원들과 변경하거나 보완, 개선하고 싶은 부분이 있다면<br />
                    (N)자 내로 작성해 주세요</S.Desc>
            </S.Row>

            <S.Row>
                <S.Label>기존 프로젝트 결과물 URL</S.Label>
                <S.Input name="result_url" type="text" placeholder="URL" />
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

            <CommonButton type="submit" content={"블록 등록하기"} disabled={!isFormValid} />
        </S.Form>
    )
}
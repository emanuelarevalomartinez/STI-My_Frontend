import { Button } from "../../../../../common/buttons/Button";
import { QuestionContainer, Radio } from "../../../../../common";
import { useStudentFirstForm2Controller } from "../../../controller";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../store/store";
import { setInitialStudentFormPage } from "../../../model";
import { SELECTION } from "../../../../../shared";

export function ItemStudentInitialForm2() {

  const dispatchStudent = useDispatch<AppDispatch>();

  const contentRef = useRef<HTMLDivElement>(null);
  const handleScrollUp = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  const {
    selectedOptions,
    currentPage,
    setCurrentPage,
    initialIndex,
    questionsCurrentPage,
    handleOptionChange,
    checkCurrentPageSelections,
    updateInitiaLearningStyle,
    isLastPage,
  } = useStudentFirstForm2Controller();

  const isNextButtonDisabled = !checkCurrentPageSelections();

  return (
    <>
      <div className="flex flex-col w-full h-full min-h-full">
        <div className="flex flex-col h-11/12 w-full gap-y-8 overflow-y-auto"
        ref={contentRef}
        >
          <form>
            {questionsCurrentPage.map((question, index) => {
              const globalIndex = initialIndex + index;
              return (
                <QuestionContainer
                  key={globalIndex}
                  number={globalIndex}
                  question={question.question}
                >
                  <Radio
                    handleOptionChange={(e) =>
                      handleOptionChange(e, globalIndex)
                    }
                    inputType={SELECTION.YES}
                    selectedOption={selectedOptions[globalIndex]}
                    name={`group_${globalIndex}`}
                    isYes={true}
                  >
                    SI
                  </Radio>
                  <Radio
                    handleOptionChange={(e) =>
                      handleOptionChange(e, globalIndex)
                    }
                    inputType={SELECTION.NOT}
                    selectedOption={selectedOptions[globalIndex]}
                    name={`group_${globalIndex}`}
                    isYes={false}
                  >
                    NO
                  </Radio>
                </QuestionContainer>
              );
            })}
          </form>
        </div>
        <div className="flex h-1/12 my-2 w-full place-content-end px-4 gap-x-4">
          <div>
            <Button
              onClick={() => {
                if(currentPage - 1 == 0){
                  dispatchStudent(setInitialStudentFormPage(0));
                } else {
                  setCurrentPage(currentPage - 1);
                }
              }}
            >
              Anterior
            </Button>
          </div>
          <div>
            {isLastPage ? (
              <>
                <Button
                  disabled={isNextButtonDisabled}
                  onClick={() => {
                     updateInitiaLearningStyle();
                  }}
                >
                  Finalizar
                </Button>
              </>
            ) : (
              <>
                <Button
                  disabled={isNextButtonDisabled}
                  onClick={() => {
                    setCurrentPage(currentPage + 1);
                    handleScrollUp();
                  }}
                >
                  Siguiente
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

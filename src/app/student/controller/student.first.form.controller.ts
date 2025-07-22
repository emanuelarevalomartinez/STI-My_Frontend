import { ChangeEvent, useState } from "react";
import {
  setIsStudentFirstTimeOnTheSistem,
  StudentModel,
} from "../model";
import { ELEMENTS_FOR_PAGE, LEARN_STYLE, LearnStyles, QuestionInterface, QUESTIONS, SELECTION } from "../../../shared";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";

interface UseStudentFirstForm2Controller {
  selectedOptions: SELECTION[];
  currentPage: number;
  setCurrentPage: (e: number) => void;
  initialIndex: number;
  questionsCurrentPage: QuestionInterface[];
  handleOptionChange: (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  checkCurrentPageSelections: () => boolean;
  updateInitiaLearningStyle: () => Promise<void>;
  isLastPage: boolean;
}

export const useStudentFirstForm2Controller =
  (): UseStudentFirstForm2Controller => {

    const dispatchStudentFirstForm = useDispatch<AppDispatch>();

    const questions = Object.values(QUESTIONS);
    const [selectedOptions, setSelectedOptions] = useState<SELECTION[]>(
      Array(questions.length).fill(SELECTION.ANY)
    );

    const [currentPage, setCurrentPage] = useState<number>(1);

    const initialIndex = (currentPage - 1) * ELEMENTS_FOR_PAGE;
    const endIndex = initialIndex + ELEMENTS_FOR_PAGE;
    const questionsCurrentPage = QUESTIONS.slice(initialIndex, endIndex);

    const isLastPage: boolean =
      currentPage === Math.ceil(QUESTIONS.length / ELEMENTS_FOR_PAGE);

    const handleOptionChange = (
      event: ChangeEvent<HTMLInputElement>,
      index: number
    ) => {
      const newSelectedOptions = [...selectedOptions];
      newSelectedOptions[index] = event.target.value as SELECTION;

      setSelectedOptions((prevSelectedOptions) => {
        const updatedSelections = [...prevSelectedOptions];
        updatedSelections[index] = event.target.value as SELECTION;
        return updatedSelections;
      });
    };

    const checkCurrentPageSelections = (): boolean => {
      const startIndex = initialIndex;
      const endIndex = initialIndex + questionsCurrentPage.length;

      for (let i = startIndex; i < endIndex; i++) {
        if (selectedOptions[i] === SELECTION.ANY) {
          return false;
        }
      }
      return true;
    };

    const updateInitiaLearningStyle = async (): Promise<void> => {
      const sumInputsYesSelected = sumInputsSelecteds(selectedOptions);
      const learningStylePorcent =
        updateStyleOfLearningInPOrcent(sumInputsYesSelected);
      const stundetLearnigStyleResponse =
        await StudentModel.setStudentLearnigStyle(learningStylePorcent);

      if (stundetLearnigStyleResponse.success) {
        dispatchStudentFirstForm(setIsStudentFirstTimeOnTheSistem(false));
        
      } else {
      }
    };

    const sumInputsSelecteds = (selections: SELECTION[]): LearnStyles => {
      let pragmaticPartSelected = 0;
      let teoricPartSelected = 0;
      let activePartSelected = 0;
      let reflexivePartSelected = 0;

      QUESTIONS.forEach(({ index, type }) => {
        if (selections[index] === SELECTION.YES) {
          switch (type) {
            case LEARN_STYLE.ACTIVE:
              activePartSelected += 1;
              break;
            case LEARN_STYLE.REFLEXIVE:
              reflexivePartSelected += 1;
              break;
            case LEARN_STYLE.TEORIC:
              teoricPartSelected += 1;
              break;
            case LEARN_STYLE.PRAGMATIC:
              pragmaticPartSelected += 1;
              break;
          }
        }
      });

      let learnigStyles: LearnStyles = {
        active: activePartSelected,
        teoric: teoricPartSelected,
        pragmatic: pragmaticPartSelected,
        reflexive: reflexivePartSelected,
      };
      return learnigStyles;
    };

    const updateStyleOfLearningInPOrcent = (
      learnStyles: LearnStyles
    ): string => {
      let active = Math.floor((learnStyles.active * 100) / QUESTIONS.length);
      let teoric = Math.floor((learnStyles.teoric * 100) / QUESTIONS.length);
      let pragmatic = Math.floor(
        (learnStyles.pragmatic * 100) / QUESTIONS.length
      );
      let reflexive = Math.floor(
        (learnStyles.reflexive * 100) / QUESTIONS.length
      );

      let totalRounded = active + teoric + pragmatic + reflexive;
      let difference = 100 - totalRounded;

      if (difference > 0) {
        active += difference;
      }
      const newLearningStyle = `${active.toString()},${reflexive.toString()},${pragmatic.toString()},${teoric.toString()}`;

      return newLearningStyle;
    };

    return {
      selectedOptions,
      currentPage,
      setCurrentPage,
      initialIndex,
      questionsCurrentPage,
      checkCurrentPageSelections,
      handleOptionChange,
      updateInitiaLearningStyle,
      isLastPage,
    };
  };

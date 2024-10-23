'use client';

import BaseButton from '@/components/BaseButton';
import BottomModal from '@/components/BottomModal';
import { ArrowSVG3 } from '@/icons/index';
import { JobCategorie } from '@/types/types';
import { useState } from 'react';

interface JobCategoryProps {
  jobCategories: JobCategorie[];
  onChange: (jobCategory: number) => void;
  initalValue?: JobCategorie;
}

function JobCategory({
  jobCategories,
  onChange,
  initalValue,
}: JobCategoryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedJobCategory, setSelectedJobCategory] = useState<
    JobCategorie | undefined
  >(initalValue);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleJobCategoryChange = (jobCategory: JobCategorie) => {
    setSelectedJobCategory(jobCategory);
    onChange(jobCategory.id);
    setIsOpen(false);
  };

  return (
    <>
      <BaseButton
        onClick={() => setIsOpen(true)}
        className={`${selectedJobCategory ? 'text-black' : 'text-gray-B80/55'} relative h-[3.375rem] w-full rounded-2xl border border-solid border-gray-B40 text-sm font-medium`}
      >
        {selectedJobCategory
          ? selectedJobCategory.engName
          : 'Select job category'}
        <ArrowSVG3 className="absolute -right-7 top-5 size-16 fill-gray-B40" />
      </BaseButton>
      {isOpen && (
        <BottomModal closeModal={handleCloseModal}>
          <div className="flex flex-col gap-[0.625rem]">
            <h1 className="mb-1 px-[1.625rem] text-lg font-bold text-blue-B50">
              Job category
            </h1>
            <p className="mb-3 px-[1.625rem]">Select only one</p>
            <ul className="mb-5 flex max-h-[55vh] flex-col gap-[0.625rem] overflow-y-auto px-[1.625rem] text-sm font-medium text-black">
              {jobCategories.map((jobCategory) => (
                <li
                  key={jobCategory.id}
                  className={`${selectedJobCategory?.id === jobCategory.id ? 'bg-yellow-primary font-semibold' : ''} rounded-2xl border border-solid border-gray-B40`}
                >
                  <BaseButton
                    className="flex h-[3.375rem] w-full items-center justify-center"
                    onClick={() => handleJobCategoryChange(jobCategory)}
                  >
                    {jobCategory.engName}
                  </BaseButton>
                </li>
              ))}
            </ul>
          </div>
        </BottomModal>
      )}
    </>
  );
}

export default JobCategory;

import { PropsWithChildren } from 'react';

const PageContainer: React.FC<PropsWithChildren> = (props) => {
  return (
    <div className='flex flex-col h-fit py-8 md:flex-row md:gap-8 md:flex-wrap md:justify-center items-center w-11/12 gap-4'>
      {props.children}
    </div>
  );
};

export default PageContainer;

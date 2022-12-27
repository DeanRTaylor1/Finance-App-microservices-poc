import { PropsWithChildren } from 'react';

const SquareContainer: React.FC<PropsWithChildren> = (props) => {
  return (
    <div className='z-10 bg-slate-100 w-fit h-fit border shadow-xl flex flex-col justify-between items-center rounded-md p-8 gap-2'>
      {props.children}
    </div>
  );
};

export default SquareContainer;

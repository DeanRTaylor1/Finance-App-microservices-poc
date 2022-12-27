import { XMarkIcon } from '@heroicons/react/24/solid';
import { PropsWithChildren } from 'react';

const StockContainer: React.FC<any> = (props) => {
  const { deleteHandler, code } = props;
  return (
    <div className='relative z-10 bg-slate-100 w-full h-fit md:h-h300 2xl:h-h500 2xl:w-2/4 border shadow-xl flex flex-col justify-between items-center rounded-md p-2'>
      <div
        onClick={() => deleteHandler(code)}
        className='absolute top-4 right-4 hover:opacity-75'
      >
        <XMarkIcon className='h-6 w-6' />
      </div>
      {props.children}
    </div>
  );
};

export default StockContainer;

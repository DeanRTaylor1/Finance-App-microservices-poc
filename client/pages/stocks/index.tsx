import { Fragment, useEffect, useState } from 'react';
import { CircleLoader } from 'react-spinners';
import Input from '../../Components/Form/Input';
import Router from 'next/router';
import SquareContainer from '../../Components/Fragments/Square-Container';
import PageContainer from '../../Components/Fragments/Page-Container';
import GetData from '../../Components/Charts/ChartData';
import StockContainer from '../../Components/Fragments/Stock-Container';

export default function Stocks({ currentUser }: any) {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [stocks, setStocks] = useState<any[] | null>(null);

  const [stockCode, setStockCode] = useState('');
  const [months, setMonths] = useState(0);

  const getStockCode = (e: React.FormEvent<HTMLInputElement>) => {
    setStockCode(e.currentTarget.value);
  };

  const getMonths = (e: React.FormEvent<HTMLInputElement>) => {
    setMonths(+e.currentTarget.value);
  };

  // [
  //   { code: 'VOO', months: 18 },
  //   { code: 'VWRL.AS', months: 12 },
  // ]

  useEffect(() => {
    if (!currentUser) {
      Router.push('/auth/signin');
    }
    setIsLoading(false);
  }, []);

  const addStockHandler = () => {
    if (!stocks) {
      setStocks([{ code: stockCode, months }]);
      setStockCode('');
      setMonths(0);
      return;
    }
    const temp = [...stocks, { code: stockCode, months }];
    setStocks(temp);
    setStockCode('');
    setMonths(0);
  };

  const deleteStockHandler = (stock: string) => {
    if (stocks!.length === 1) {
      setStocks(null);
    }
    const temp = stocks!.filter((stockObject) => {
      return stockObject.code !== stock;
    });
    setStocks(temp);
  };

  return (
    <Fragment>
      <PageContainer>
        {isLoading && (
          <div className='h-full w-full flex justify-center items-center'>
            <CircleLoader size={100} color='#60a5fa' />
          </div>
        )}
        {stocks &&
          stocks.map((stock) => {
            return (
              <StockContainer
                code={stock.code}
                deleteHandler={deleteStockHandler}
              >
                <GetData stock={stock.code} months={stock.months} />
              </StockContainer>
            );
          })}

        {!isLoading && (!stocks || stocks.length < 5) && (
          <SquareContainer>
            <Input
              name={'Stock Code:'}
              label={'stockcode'}
              type={'text'}
              placeholder={'Stock Code'}
              getInputs={getStockCode}
              value={stockCode}
            />
            <Input
              name={'Months'}
              label={'months'}
              type={'text'}
              placeholder={'Months of data'}
              getInputs={getMonths}
              value={months.toString()}
            />
            <button className='signInButton' onClick={addStockHandler}>
              Add Chart
            </button>
          </SquareContainer>
        )}
      </PageContainer>
    </Fragment>
  );
}

Stocks.getInitialProps = async (
  context: any,
  client: any,
  currentUser: any
) => {
  return currentUser;
};
